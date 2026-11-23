<?php
require_once __DIR__ . '/includes/bootstrap.php';
app_start_session();

$usuario = app_database_configured() ? app_current_user() : null;
if (!$usuario) {
    header('Location: login.php?next=perfil.php', true, 302);
    exit;
}

$perfil = null;
try {
    $statement = app_db()->prepare(
        'SELECT age, grade, study_goal, weekly_study_hours
         FROM student_profiles
         WHERE user_id = :user_id'
    );
    $statement->execute(['user_id' => (int) $usuario['id']]);
    $perfil = $statement->fetch();
} catch (PDOException $exception) {
    error_log('Falha ao carregar perfil do estudante: ' . $exception->getMessage());
}

$partesNome = preg_split('/\s+/u', trim($usuario['name'])) ?: [];
$iniciais = '';
foreach (array_slice($partesNome, 0, 2) as $parte) {
    $letra = function_exists('mb_substr') ? mb_substr($parte, 0, 1) : substr($parte, 0, 1);
    $iniciais .= function_exists('mb_strtoupper') ? mb_strtoupper($letra) : strtoupper($letra);
}
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <link rel="icon" type="image/png" href="/assets/images/brand/logo-playchemistry.png">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Perfil - PlayCHEMISTRY ENEM</title>
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
    <header class="site-header">
        <div class="container header-inner">
            <a class="brand" href="index.php" aria-label="Voltar para a página inicial">
                <img class="logo-site" src="assets/images/brand/logo-playchemistry.png" alt="Logo Play Chemistry">
                <div class="brand-copy">
                    <span>PlayCHEMISTRY</span>
                    <small>ENEM</small>
                </div>
            </a>
            <button class="menu-toggle" type="button" aria-label="Abrir menu" aria-controls="main-nav" aria-expanded="false">☰</button>
            <nav class="main-nav" id="main-nav" aria-label="Navegação principal">
                <a href="index.php">Início</a>
                <a href="central_conhecimento.php">Central de Conhecimento</a>
                <a href="laboratorio_3d.php">Laboratório 3D</a>
                <a href="periodiclab.php">PeriodicLab</a>
                <a href="leonardia.php">LeonardIA</a>
                <a href="resultado.php">Meu Desempenho</a>
                <a href="sobre.php">Sobre</a>
                <a href="perfil.php" class="active" aria-current="page">Perfil</a>
            </nav>
        </div>
    </header>

    <main class="pagina perfil-pagina">
        <section class="painel perfil-painel">
            <header class="perfil-cabecalho">
                <div class="perfil-avatar" aria-hidden="true"><?php echo app_escape($iniciais); ?></div>
                <div>
                    <span class="marca">Minha conta</span>
                    <h2><?php echo app_escape($usuario['name']); ?></h2>
                    <p><?php echo app_escape($usuario['email']); ?></p>
                </div>
            </header>

            <div class="perfil-secao-titulo">
                <h3>Informações de estudo</h3>
                <?php if (!$perfil) { ?>
                    <a href="formulario.php">Completar diagnóstico</a>
                <?php } ?>
            </div>

            <div class="perfil-grid">
                <article class="perfil-card">
                    <span>Idade</span>
                    <strong><?php echo $perfil && $perfil['age'] !== null ? app_escape((string) $perfil['age']) . ' anos' : 'Não informado'; ?></strong>
                </article>
                <article class="perfil-card">
                    <span>Série</span>
                    <strong><?php echo $perfil && $perfil['grade'] !== null ? app_escape((string) $perfil['grade']) : 'Não informado'; ?></strong>
                </article>
                <article class="perfil-card perfil-card-larga">
                    <span>Objetivo de estudo</span>
                    <strong><?php echo $perfil && $perfil['study_goal'] !== null ? app_escape((string) $perfil['study_goal']) : 'Não informado'; ?></strong>
                </article>
                <article class="perfil-card perfil-card-larga">
                    <span>Tempo de estudo</span>
                    <strong><?php echo $perfil && $perfil['weekly_study_hours'] !== null ? app_escape((string) $perfil['weekly_study_hours']) . ' horas por semana' : 'Não informado'; ?></strong>
                </article>
            </div>

            <div class="perfil-acoes">
                <a class="botao secundario" href="formulario.php?refazer=1">Editar diagnóstico</a>
                <form method="POST" action="sair.php">
                    <input type="hidden" name="_csrf" value="<?php echo app_escape(app_csrf_token()); ?>">
                    <button class="botao" type="submit">Sair da conta</button>
                </form>
            </div>
        </section>
    </main>
    <script src="assets/js/tema.js"></script>
</body>
</html>
