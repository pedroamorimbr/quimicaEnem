<?php

// Centraliza acesso à configuração para aceitar variáveis do ambiente e do hosting.
function app_env(string $name): string
{
    static $localEnvLoaded = false;
    if (!$localEnvLoaded) {
        $localEnvLoaded = true;
        $envFile = dirname(__DIR__) . DIRECTORY_SEPARATOR . '.env';
        if (is_readable($envFile)) {
            $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
            if (is_array($lines)) {
                foreach ($lines as $line) {
                    $line = trim($line);
                    if ($line === '' || str_starts_with($line, '#')) {
                        continue;
                    }
                    $separator = strpos($line, '=');
                    if ($separator === false) {
                        continue;
                    }
                    $key = trim(substr($line, 0, $separator));
                    $value = trim(substr($line, $separator + 1));
                    if (strlen($value) >= 2) {
                        $first = $value[0];
                        $last = $value[strlen($value) - 1];
                        if (($first === '"' && $last === '"') || ($first === "'" && $last === "'")) {
                            $value = substr($value, 1, -1);
                        }
                    }
                    if ($key !== '' && getenv($key) === false) {
                        putenv($key . '=' . $value);
                        $_ENV[$key] = $value;
                    }
                }
            }
        }
    }

    $value = getenv($name);
    if ($value !== false && $value !== '') {
        return $value;
    }

    return isset($_ENV[$name]) ? (string) $_ENV[$name] : '';
}

// Mantém o modo sem banco disponível quando nenhuma configuração MySQL foi informada.
function app_database_configured(): bool
{
    if (app_env('DATABASE_URL') !== '' || app_env('MYSQL_PUBLIC_URL') !== '') {
        return true;
    }

    $host = app_env('DB_HOST') ?: app_env('MYSQLHOST');
    $name = app_env('DB_NAME') ?: app_env('MYSQLDATABASE');
    $user = app_env('DB_USER') ?: app_env('MYSQLUSER');
    $password = app_env('DB_PASSWORD') ?: app_env('MYSQLPASSWORD');

    return $host !== '' && $name !== '' && $user !== '' && $password !== '';
}

// Abre uma conexão PDO reutilizável e aceita URL completa ou parâmetros separados.
function app_db(): PDO
{
    static $connection = null;
    if ($connection instanceof PDO) {
        return $connection;
    }

    $databaseUrl = app_env('DATABASE_URL') ?: app_env('MYSQL_PUBLIC_URL');
    if ($databaseUrl !== '') {
        $parts = parse_url($databaseUrl);
        if (!is_array($parts)
            || !isset($parts['scheme'], $parts['host'], $parts['user'], $parts['pass'], $parts['path'])
            || !in_array(strtolower($parts['scheme']), ['mysql', 'mariadb'], true)) {
            throw new RuntimeException('A variável DATABASE_URL não contém uma URL MySQL válida.');
        }

        $host = $parts['host'];
        $port = (string) ($parts['port'] ?? 3306);
        $name = ltrim(rawurldecode($parts['path']), '/');
        $user = rawurldecode($parts['user']);
        $password = rawurldecode($parts['pass']);
    } else {
        $host = app_env('DB_HOST') ?: app_env('MYSQLHOST');
        $port = app_env('DB_PORT') ?: app_env('MYSQLPORT') ?: '3306';
        $name = app_env('DB_NAME') ?: app_env('MYSQLDATABASE');
        $user = app_env('DB_USER') ?: app_env('MYSQLUSER');
        $password = app_env('DB_PASSWORD') ?: app_env('MYSQLPASSWORD');
    }

    if ($host === '' || $name === '' || $user === '' || $password === '') {
        throw new RuntimeException('Configure as variáveis privadas do MySQL antes de acessar este recurso.');
    }

    $dsn = sprintf('mysql:host=%s;port=%s;dbname=%s;charset=utf8mb4', $host, $port, $name);
    $connection = new PDO($dsn, $user, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);

    return $connection;
}

// Persiste sessões no MySQL para que o estado do estudante sobreviva a execuções serverless.
final class AppDatabaseSessionHandler implements SessionHandlerInterface, SessionUpdateTimestampHandlerInterface
{
    public function open(string $path, string $name): bool
    {
        return true;
    }

    public function close(): bool
    {
        return true;
    }

    public function read(string $id): string|false
    {
        $statement = app_db()->prepare(
            'SELECT payload FROM app_sessions WHERE session_id = :id AND expires_at > UTC_TIMESTAMP()'
        );
        $statement->execute(['id' => $id]);
        $payload = $statement->fetchColumn();

        return $payload === false ? '' : (string) $payload;
    }

    public function validateId(string $id): bool
    {
        $statement = app_db()->prepare(
            'SELECT 1 FROM app_sessions WHERE session_id = :id AND expires_at > UTC_TIMESTAMP()'
        );
        $statement->execute(['id' => $id]);
        return $statement->fetchColumn() !== false;
    }

    public function updateTimestamp(string $id, string $data): bool
    {
        $expiresAt = gmdate('Y-m-d H:i:s', time() + (int) ini_get('session.gc_maxlifetime'));
        $statement = app_db()->prepare(
            'UPDATE app_sessions SET expires_at = :expires_at WHERE session_id = :id'
        );
        $statement->execute(['expires_at' => $expiresAt, 'id' => $id]);

        return $statement->rowCount() > 0 || $this->write($id, $data);
    }

    public function write(string $id, string $data): bool
    {
        $expiresAt = gmdate('Y-m-d H:i:s', time() + (int) ini_get('session.gc_maxlifetime'));
        $statement = app_db()->prepare(
            'INSERT INTO app_sessions (session_id, payload, expires_at)
             VALUES (:id, :payload, :expires_at)
             ON DUPLICATE KEY UPDATE payload = VALUES(payload), expires_at = VALUES(expires_at)'
        );
        $statement->execute([
            'id' => $id,
            'payload' => $data,
            'expires_at' => $expiresAt,
        ]);

        return true;
    }

    public function destroy(string $id): bool
    {
        $statement = app_db()->prepare('DELETE FROM app_sessions WHERE session_id = :id');
        $statement->execute(['id' => $id]);
        return true;
    }

    public function gc(int $max_lifetime): int|false
    {
        $statement = app_db()->prepare('DELETE FROM app_sessions WHERE expires_at <= UTC_TIMESTAMP()');
        $statement->execute();
        return $statement->rowCount();
    }
}

// Configura o cookie da sessão e seleciona o armazenamento em banco quando disponível.
function app_start_session(): void
{
    if (session_status() === PHP_SESSION_ACTIVE) {
        return;
    }

    session_name('playchemistry_session');
    ini_set('session.gc_maxlifetime', (string) (60 * 60 * 24 * 14));
    ini_set('session.use_strict_mode', '1');
    ini_set('session.use_only_cookies', '1');
    ini_set('session.use_trans_sid', '0');
    $secureCookie = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off')
        || ($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '') === 'https';
    session_set_cookie_params([
        'lifetime' => 60 * 60 * 24 * 14,
        'path' => '/',
        'secure' => $secureCookie,
        'httponly' => true,
        'samesite' => 'Lax',
    ]);

    if (app_database_configured()) {
        session_set_save_handler(new AppDatabaseSessionHandler(), true);
    }

    try {
        session_start();
    } catch (PDOException $exception) {
        error_log('Falha ao iniciar sessão do estudante: ' . $exception->getMessage());
        http_response_code(503);
        exit('Não foi possível abrir a sessão no banco. Confira as credenciais e execute database/schema.sql.');
    } catch (RuntimeException $exception) {
        error_log('Configuração inválida da sessão do estudante: ' . $exception->getMessage());
        http_response_code(503);
        exit('A configuração do banco de dados está inválida. Confira as variáveis privadas da aplicação.');
    }
}

// Gera e valida tokens de formulário para bloquear envios sem a sessão correspondente.
function app_csrf_token(): string
{
    if (empty($_SESSION['_csrf'])) {
        $_SESSION['_csrf'] = bin2hex(random_bytes(32));
    }

    return $_SESSION['_csrf'];
}

function app_verify_csrf(): bool
{
    $token = $_POST['_csrf'] ?? '';
    return is_string($token)
        && isset($_SESSION['_csrf'])
        && hash_equals($_SESSION['_csrf'], $token);
}

// Resolve o usuário autenticado a partir do identificador guardado na sessão.
function app_current_user(): ?array
{
    if (empty($_SESSION['user_id'])) {
        return null;
    }

    $statement = app_db()->prepare('SELECT id, name, email FROM users WHERE id = :id');
    $statement->execute(['id' => (int) $_SESSION['user_id']]);
    $user = $statement->fetch();

    if (!$user) {
        unset($_SESSION['user_id']);
        return null;
    }

    return $user;
}

// Permite redirecionamentos apenas para páginas locais com nomes aceitos pelo projeto.
function app_safe_next(?string $next): string
{
    if ($next !== null && preg_match('/^[a-zA-Z0-9_-]+\.php(?:\?[a-zA-Z0-9_=&%-]*)?$/D', $next)) {
        return $next;
    }

    return 'index.php';
}

// Escapa texto antes de inseri-lo no HTML.
function app_escape(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
}
