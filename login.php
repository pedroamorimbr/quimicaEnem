<?php
require_once __DIR__ . '/includes/bootstrap.php';
app_start_session();

$next = app_safe_next(isset($_GET['next']) ? (string) $_GET['next'] : null);
if (app_current_user()) {
    header('Location: ' . $next);
    exit;
}

$erro = '';
$email = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $next = app_safe_next(isset($_POST['next']) ? (string) $_POST['next'] : null);
    $email = strtolower(trim((string) ($_POST['email'] ?? '')));
    $senha = (string) ($_POST['senha'] ?? '');

    if (!app_verify_csrf()) {
        $erro = 'A sessão do formulário expirou. Atualize a página e tente novamente.';
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL) || $senha === '') {
        $erro = 'Confira o e-mail e a senha.';
    } else {
        try {
            $statement = app_db()->prepare('SELECT id, password_hash FROM users WHERE email = :email');
            $statement->execute(['email' => $email]);
            $user = $statement->fetch();

            if (!$user || !password_verify($senha, $user['password_hash'])) {
                $erro = 'E-mail ou senha incorretos.';
            } else {
                if (password_needs_rehash($user['password_hash'], PASSWORD_DEFAULT)) {
                    app_db()->prepare('UPDATE users SET password_hash = :hash WHERE id = :id')
                        ->execute([
                            'hash' => password_hash($senha, PASSWORD_DEFAULT),
                            'id' => (int) $user['id'],
                        ]);
                }

                session_regenerate_id(true);
                $_SESSION['user_id'] = (int) $user['id'];
                header('Location: ' . $next);
                exit;
            }
        } catch (PDOException $exception) {
            error_log('Falha ao autenticar estudante: ' . $exception->getMessage());
            http_response_code(503);
            $erro = 'Não foi possível acessar a conta agora. Verifique a conexão com o banco e tente novamente.';
        } catch (RuntimeException $exception) {
            http_response_code(503);
            $erro = $exception->getMessage();
        }
    }
}
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Entrar | PlayCHEMISTRY ENEM</title>
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
    <header class="topo">
        <h1>PlayCHEMISTRY ENEM</h1>
        <p>Acesse sua conta de estudante</p>
    </header>
    <main class="pagina">
        <section class="painel formulario-painel">
            <h2>Entrar</h2>
            <p>Entre para continuar o simulado e consultar seu histórico.</p>
            <?php if ($erro !== '') { ?>
                <div class="feedback incorreto" role="alert"><?php echo app_escape($erro); ?></div>
            <?php } ?>
            <form method="POST" action="login.php" class="formulario">
                <input type="hidden" name="_csrf" value="<?php echo app_escape(app_csrf_token()); ?>">
                <input type="hidden" name="next" value="<?php echo app_escape($next); ?>">
                <div class="campo">
                    <label for="email">E-mail</label>
                    <input id="email" name="email" type="email" maxlength="254" autocomplete="email" required value="<?php echo app_escape($email); ?>">
                </div>
                <div class="campo">
                    <label for="senha">Senha</label>
                    <input id="senha" name="senha" type="password" autocomplete="current-password" required>
                </div>
                <div class="acoes">
                    <button class="botao" type="submit">Entrar</button>
                    <a class="botao secundario" href="cadastro.php?next=<?php echo rawurlencode($next); ?>">Criar conta</a>
                </div>
            </form>
        </section>
    </main>
    <script src="assets/js/tema.js"></script>
</body>
</html>
