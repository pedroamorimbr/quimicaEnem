<?php
require_once __DIR__ . '/includes/bootstrap.php';
app_start_session();

if (app_database_configured() && empty($_SESSION['user_id'])) {
    header('Location: login.php?next=resultado_foco.php');
    exit;
}

// Evita que a página seja acessada sem concluir uma trilha.
if (!isset($_SESSION["resultado_foco"])) {
    header("Location: formulario.php");
    exit;
}

// Recupera os dados enviados pelo questionário personalizado.
$resultado = $_SESSION["resultado_foco"];
$pontuacao = (int) $resultado["pontuacao"];
$total = (int) $resultado["total"];
$foco = $resultado["foco"];

// Calcula a porcentagem de acertos da trilha.
$porcentagem = round(($pontuacao / $total) * 100);

// Define a cor, o título e a mensagem de acordo com o desempenho.
if ($porcentagem >= 70) {
    $classe = "boa";
    $titulo = "Você avançou bem";
    $mensagem = "Seu desempenho mostra uma boa compreensão deste conteúdo. Continue praticando para consolidar o conhecimento.";
} elseif ($porcentagem >= 50) {
    $classe = "media";
    $titulo = "Você está no caminho";
    $mensagem = "Você já domina parte do conteúdo. Revise os conceitos principais e tente a trilha novamente.";
} else {
    $classe = "ruim";
    $titulo = "Vamos revisar juntos";
    $mensagem = "Este conteúdo ainda precisa de atenção. Retorne ao material de revisão e refaça as questões.";
}

// Limpa o resultado já exibido, mas mantém o conteúdo para permitir uma nova tentativa.
unset($_SESSION["resultado_foco"]);
$_SESSION["foco"] = $foco;
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <link rel="icon" type="image/png" href="/assets/images/brand/logo-playchemistry.png">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resultado da trilha - PlayCHEMISTRY ENEM</title>
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
    <!-- Cabeçalho da página de resultado da trilha escolhida. -->
    <header class="topo">
        <h1>PlayCHEMISTRY ENEM</h1>
        <p>Resultado da trilha personalizada</p>
    </header>

    <main class="pagina">
        <section class="painel resultado resultado-foco <?php echo $classe; ?>">
            <span class="marca">Trilha concluída</span>
            <h2><?php echo htmlspecialchars($titulo, ENT_QUOTES, "UTF-8"); ?></h2>
            <p>Conteúdo praticado: <strong><?php echo htmlspecialchars($foco, ENT_QUOTES, "UTF-8"); ?></strong></p>

            <p>Você acertou <strong><?php echo $pontuacao; ?></strong> de <strong><?php echo $total; ?></strong> questões.</p>
            <p class="mensagem-resultado"><?php echo $mensagem; ?></p>

            <div class="acoes">
                <!-- Permite refazer a trilha ou escolher outro conteúdo. -->
                <a class="botao" href="questoes_foco.php">Refazer esta trilha</a>
                <a class="botao secundario" href="formulario.php">Escolher outra dificuldade</a>
            </div>
        </section>
    </main>
</body>
</html>
