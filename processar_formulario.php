<?php
require_once __DIR__ . '/includes/bootstrap.php';
app_start_session();

if (app_database_configured() && empty($_SESSION['user_id'])) {
    header('Location: login.php?next=processar_formulario.php');
    exit;
}

if (!isset($_SESSION["diagnostico"])) {
    header("Location: formulario.php");
    exit;
}

$diagnostico = $_SESSION["diagnostico"];
$dificuldade = $diagnostico["dificuldade"];
$horas = $diagnostico["horas"];

// O processamento transforma as respostas em uma recomendação de estudo.
if ($horas >= 5) {
    $rotina = "Sua disponibilidade permite estudar com uma rotina completa.";
    $pontuacao = 3;
} elseif ($horas >= 3) {
    $rotina = "Sua disponibilidade permite uma rotina equilibrada de revisão.";
    $pontuacao = 2;
} else {
    $rotina = "Comece com revisões curtas e frequentes para aproveitar melhor o tempo.";
    $pontuacao = 1;
}

$recomendacoes = [
    "Estudar para o ENEM" => "Siga uma revisão guiada de funções orgânicas e pratique as 10 questões do simulado, com foco na interpretação de estruturas e grupos funcionais.",
    "Preparar para prova escolar" => "Revise os principais grupos funcionais e use o questionário completo para verificar quais conceitos precisam de mais atenção.",
    "Ainda não sei" => "Comece pelo quadro de grupos funcionais e depois responda ao questionário para descobrir quais conteúdos exigem mais atenção.",
    "Questionário completo" => "Responda às 10 questões para revisar todos os grupos funcionais estudados no projeto."
];

$recomendacao = $recomendacoes[$dificuldade] ?? $recomendacoes["Questionário completo"];
$classificacao = $pontuacao === 3 ? "Plano intensivo" : ($pontuacao === 2 ? "Plano regular" : "Plano inicial");
$questionarioCompleto = $dificuldade !== "Ainda não sei";
$focoExercicios = $questionarioCompleto ? "Questionário completo" : "Funções oxigenadas";
$destinoExercicios = $questionarioCompleto ? "questao1.php?novo=1" : "questoes_foco.php";
$_SESSION["foco"] = $focoExercicios;
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Seu diagnóstico - PlayCHEMISTRY ENEM</title>
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
    <header class="topo">
        <h1>PlayCHEMISTRY ENEM</h1>
        <p>Resultado do diagnóstico de aprendizagem</p>
    </header>

    <main class="pagina">
        <section class="painel resultado">
            <span class="marca">Diagnóstico concluído</span>
            <h2><?php echo htmlspecialchars($classificacao, ENT_QUOTES, "UTF-8"); ?></h2>
            <p>Olá, <strong><?php echo $diagnostico["nome"]; ?></strong>! Este é o seu plano inicial de revisão.</p>

            <div class="diagnostico-resumo">
                <div class="quadro">
                    <h3>Seu perfil</h3>
                    <p><strong>Série:</strong> <?php echo $diagnostico["serie"]; ?></p>
                    <p><strong>Conteúdo para revisar:</strong> <?php echo $dificuldade; ?></p>
                    <p><strong>Tempo semanal:</strong> <?php echo $horas; ?> hora(s)</p>
                </div>

                <div class="quadro">
                    <h3>Recomendação</h3>
                    <p><?php echo $recomendacao; ?></p>
                    <p><?php echo $rotina; ?></p>
                </div>
            </div>

            <div class="acoes">
                <a class="botao" href="<?php echo $destinoExercicios; ?>">
                    <?php echo $questionarioCompleto ? "Responder questionário completo" : "Fazer exercícios de " . htmlspecialchars($focoExercicios, ENT_QUOTES, "UTF-8"); ?>
                </a>
                <?php if (!$questionarioCompleto) { ?>
                    <a class="botao botao-completo" href="questao1.php?novo=1">Responder questionário completo</a>
                <?php } ?>
                <a class="botao secundario" href="index.php">Ir para o início</a>
                <a class="botao secundario" href="formulario.php?refazer=1">Refazer diagnóstico</a>
            </div>
        </section>
    </main>

    <script src="assets/js/tema.js"></script>
</body>
</html>
