<?php
require_once __DIR__ . '/includes/bootstrap.php';
app_start_session();

if (app_database_configured() && empty($_SESSION['user_id'])) {
    header('Location: login.php?next=' . rawurlencode(isset($_GET['novo']) ? 'questao1.php?novo=1' : 'questao1.php'));
    exit;
}

if (isset($_GET["novo"]) && $_GET["novo"] === "1") {
    $_SESSION["foco"] = "Questionário completo";
}

// O questionário só começa depois do diagnóstico de dificuldade.
if (!isset($_SESSION["foco"])) {
    header("Location: formulario.php");
    exit;
}

if (isset($_GET['novo']) || empty($_SESSION['quiz_attempt_id'])) {
    $_SESSION['quiz_attempt_id'] = bin2hex(random_bytes(16));
    $_SESSION['quiz_started_at'] = time();
    $_SESSION['quiz_score'] = 0;
    $_SESSION['quiz_answers'] = [];
    $_SESSION['quiz_completed'] = false;
}
?>
<!DOCTYPE html>
<!--
Arquivo: questao1.php
Descrição: Questão 1 do simulado. Contém enunciado, alternativas e validação via POST.
Contém: manipulação de pontuação, feedback e redirecionamento para `questao2.php`.
-->
<html lang="pt-br">
<head>
    <!-- Configuracoes basicas da pagina. -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Questao 1 - PlayCHEMISTRY ENEM</title>
   <link rel="stylesheet" href="assets/css/style.css">
    
</head>
<body>
    
    <!-- Cabecalho padrao do questionario. -->
    <header class="topo">
        <h1>PlayCHEMISTRY ENEM</h1>
        <p>Questionario sobre Funcoes Organicas</p>

        <div class="top-bar">
    <div id="cronometro">00:00</div>

        <button id="btnIniciar" type="button">
            ▶ Iniciar cronômetro
        </button>

</div>
    </header>

    
    <main class="pagina">
        <?php
        // Dados e processamento da questao 1.
        const TOTAL_QUESTOES = 10;
        $questao = 1;
        $pontuacao = (int) ($_SESSION['quiz_score'] ?? 0);
        $respostaCorreta = "b";
        $mensagem = "";
        $classe = "";
        $jaRespondida = array_key_exists($questao, $_SESSION['quiz_answers'] ?? []);

        if (isset($_POST["validar"])) {
            if (isset($_POST["resposta"])) {
                if ($jaRespondida) {
                    $_POST["resposta"] = $_SESSION['quiz_answers'][$questao];
                } else {
                    $_SESSION['quiz_answers'][$questao] = (string) $_POST["resposta"];
                }

                if ($_POST["resposta"] == $respostaCorreta) {
                    if (!$jaRespondida) {
                        $_SESSION['quiz_score'] = $pontuacao + 1;
                    }
                    $pontuacao = (int) ($_SESSION['quiz_score'] ?? 0);
                    $mensagem = "Correto! Hidrocarbonetos sao compostos formados apenas por carbono e hidrogenio.";
                    $classe = "correto";
                } else {
                    $mensagem = "Incorreto. Hidrocarbonetos sao formados somente por carbono e hidrogenio. Por isso, compostos com oxigenio, nitrogenio ou grupo -COOH pertencem a outras funcoes organicas.";
                    $classe = "incorreto";
                }
            } else {
                $mensagem = "Selecione uma alternativa antes de validar.";
                $classe = "alerta";
            }
        }
        ?>

        <section class="painel">
            <!-- Barra de progresso. -->
            <div class="progresso">
                <div class="progresso-texto">
                    <span>Questao <?php echo $questao; ?> de <?php echo TOTAL_QUESTOES; ?></span>
                    <span>Pontuacao: <?php echo $pontuacao; ?></span>
                </div>
                <div class="barra"><span style="width: 10%;"></span></div>
            </div>

            <!-- Imagem de apoio visual. -->
            <div class="imagem-estudo">
    <img src="assets/images/hidrocarboneto.svg" alt="Hidrocarboneto">
</div>

            <div class="questao-numero">Questao 1</div>
            <p class="enunciado">Qual alternativa descreve corretamente os hidrocarbonetos?</p>

            <!-- Formulario da questao. -->
            <?php if ($mensagem == "" || $classe == "alerta") { ?>
            <form method="POST" action="questao1.php">
                <div class="alternativas">
                    <label class="alternativa"><input type="radio" name="resposta" value="a"> a) Compostos que sempre possuem oxigenio no grupo funcional.</label>
                    <label class="alternativa"><input type="radio" name="resposta" value="b"> b) Compostos formados apenas por carbono e hidrogenio.</label>
                    <label class="alternativa"><input type="radio" name="resposta" value="c"> c) Compostos caracterizados pelo grupo -COOH.</label>
                    <label class="alternativa"><input type="radio" name="resposta" value="d"> d) Compostos que possuem nitrogenio ligado a cadeias carbonicas.</label>
                </div>

                <div class="quadro">
                    <strong>Dica:</strong> hidrocarbonetos nao possuem heteroatomos.
                </div>

                <div class="acoes">
                    <button class="botao" type="submit" name="validar">Validar resposta</button>
                </div>
            </form>
            <?php } ?>

            <!-- Feedback apos a validacao. -->
            <?php if ($mensagem != "") { ?>
                <div class="feedback <?php echo $classe; ?>"><?php echo $mensagem; ?></div>
                <?php if ($classe == "correto") { ?>
                    <script>
                        const feedbackCorreto = document.querySelector(".feedback.correto");
                        if (feedbackCorreto) {
                            feedbackCorreto.textContent = "Você acertou a questão!";
                            feedbackCorreto.setAttribute("aria-live", "polite");
                        }

                        setTimeout(() => {
                            window.location.href = "questao2.php?pontos=<?php echo $pontuacao; ?>";
                        }, 1500);
                    </script>
                <?php } ?>
                <?php if ($classe == "incorreto") { ?>
                    <div class="acoes">
                        <a class="botao secundario" href="questao2.php?pontos=<?php echo $pontuacao; ?>">Proxima questao</a>
                    </div>
                <?php } ?>
            <?php } ?>
        </section>
    </main>
    <script src="assets/js/cronometro.js"></script>
    <script src="assets/js/tema.js"></script>
</body>
</html>


