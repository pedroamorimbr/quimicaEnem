<?php
require_once __DIR__ . '/includes/bootstrap.php';
app_start_session();

if (app_current_user()) {
    header('Location: index.php');
    exit;
}

$next = app_safe_next(isset($_GET['next']) ? (string) $_GET['next'] : null);
$erro = '';
$nome = '';
$email = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $next = app_safe_next(isset($_POST['next']) ? (string) $_POST['next'] : null);
    $nome = trim((string) ($_POST['nome'] ?? ''));
    $email = strtolower(trim((string) ($_POST['email'] ?? '')));
    $senha = (string) ($_POST['senha'] ?? '');
    $confirmacao = (string) ($_POST['confirmacao'] ?? '');

    if (!app_verify_csrf()) {
        $erro = 'A sessão do formulário expirou. Atualize a página e tente novamente.';
    } elseif (!preg_match('/^[\p{L} ]{3,80}$/u', $nome)) {
        $erro = 'Informe um nome válido com 3 a 80 caracteres.';
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $erro = 'Informe um e-mail válido.';
    } elseif (strlen($senha) < 10 || strlen($senha) > 200) {
        $erro = 'A senha deve ter entre 10 e 200 caracteres.';
    } elseif ($senha !== $confirmacao) {
        $erro = 'As senhas não conferem.';
    } else {
        try {
            $database = app_db();
            $database->beginTransaction();
            $statement = $database->prepare(
                'INSERT INTO users (name, email, password_hash) VALUES (:name, :email, :password_hash)'
            );
            $statement->execute([
                'name' => $nome,
                'email' => $email,
                'password_hash' => password_hash($senha, PASSWORD_DEFAULT),
            ]);
            $userId = (int) $database->lastInsertId();
            $database->prepare('INSERT INTO student_profiles (user_id) VALUES (:user_id)')
                ->execute(['user_id' => $userId]);
            $database->commit();

            session_regenerate_id(true);
            $_SESSION['user_id'] = $userId;
            header('Location: formulario.php');
            exit;
        } catch (PDOException $exception) {
            if (isset($database) && $database->inTransaction()) {
                $database->rollBack();
            }

            if ($exception->getCode() === '23000') {
                $erro = 'Já existe uma conta cadastrada com esse e-mail.';
            } else {
                error_log('Falha ao criar conta: ' . $exception->getMessage());
                http_response_code(503);
                $erro = 'Não foi possível criar a conta agora. Verifique a conexão com o banco e tente novamente.';
            }
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
    <title>Criar conta | PlayCHEMISTRY ENEM</title>
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
    <header class="topo">
        <h1>PlayCHEMISTRY ENEM</h1>
        <p>Crie sua conta de estudante</p>
    </header>
    <main class="pagina">
        <section class="painel formulario-painel">
            <h2>Criar conta</h2>
            <p>Entre para salvar seus diagnósticos e acompanhar seu desempenho.</p>
            <?php if ($erro !== '') { ?>
                <div class="feedback incorreto" role="alert"><?php echo app_escape($erro); ?></div>
            <?php } ?>
            <form method="POST" action="cadastro.php" class="formulario">
                <input type="hidden" name="_csrf" value="<?php echo app_escape(app_csrf_token()); ?>">
                <input type="hidden" name="next" value="<?php echo app_escape($next); ?>">
                <div class="campo">
                    <label for="nome">Nome</label>
                    <input id="nome" name="nome" type="text" maxlength="80" autocomplete="name" required value="<?php echo app_escape($nome); ?>">
                </div>
                <div class="campo">
                    <label for="email">E-mail</label>
                    <input id="email" name="email" type="email" maxlength="254" autocomplete="email" required value="<?php echo app_escape($email); ?>">
                </div>
                <div class="campo">
                    <label for="senha">Senha (mínimo 10 caracteres)</label>
                    <input id="senha" name="senha" type="password" minlength="10" maxlength="200" autocomplete="new-password" required>
                </div>
                <div class="campo">
                    <label for="confirmacao">Confirme a senha</label>
                    <input id="confirmacao" name="confirmacao" type="password" minlength="10" maxlength="200" autocomplete="new-password" required>
                </div>
                <div class="acoes">
                    <button class="botao" type="submit">Criar conta</button>
                    <a class="botao secundario" href="login.php?next=<?php echo rawurlencode($next); ?>">Já tenho conta</a>
                </div>
            </form>
        </section>
    </main>
    <script src="assets/js/tema.js"></script>
</body>
</html>
