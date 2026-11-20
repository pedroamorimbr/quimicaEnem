<?php
require_once __DIR__ . '/includes/bootstrap.php';
app_start_session();
if (app_database_configured() && empty($_SESSION['user_id'])) {
    header('Location: login.php?next=questao1.php%3Fnovo%3D1');
    exit;
}
if (empty($_SESSION['quiz_attempt_id'])) {
    header('Location: questao1.php?novo=1');
    exit;
}
?>
<!DOCTYPE html>
<!--
Arquivo: questao9.php
Descrição: Questão 9 do simulado. Contém lógica para verificar respostas e encaminhar ao final.
-->
<html lang="pt-br">
<head>
    <!-- Cabecalho padrao do questionario. -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Questao 9 - PlayCHEMISTRY ENEM</title>
    <link rel="stylesheet" href="assets/css/style.css">
    
</head>
<body>
    <!-- Cabecalho comum. -->
    <header class="topo">
        <h1>PlayCHEMISTRY ENEM</h1>
        <p>Questionario sobre Funcoes Organicas</p>

        <div class="top-bar">
        <div id="cronometro">00:00</div>

    </header>

    <main class="pagina">
        <?php
        // Total de perguntas do quiz.
        const TOTAL_QUESTOES = 10;

        // Dados da nona questao.
        $questao = 9;
        $pontuacao = (int) ($_SESSION['quiz_score'] ?? 0);

        // Alternativa correta.
        $respostaCorreta = "c";
        $mensagem = "";
        $classe = "";
        $jaRespondida = array_key_exists($questao, $_SESSION['quiz_answers'] ?? []);

        // Corrige a resposta marcada.
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
                    $mensagem = "Correto! Amidas possuem carbonila ligada a nitrogenio.";
                    $classe = "correto";
                } else {
                    $mensagem = "Incorreto. Amidas apresentam carbonila ligada a nitrogenio, como em R-CONH2. Por isso elas combinam caracteristicas de grupo carbonilado e funcao nitrogenada.";
                    $classe = "incorreto";
                }
            } else {
                $mensagem = "Selecione uma alternativa antes de validar.";
                $classe = "alerta";
            }
        }
        ?>

        <section class="painel">
            <div class="progresso">
                <div class="progresso-texto">
                    <span>Questao <?php echo $questao; ?> de <?php echo TOTAL_QUESTOES; ?></span>
                    <span>Pontuacao: <?php echo $pontuacao; ?></span>
                </div>
                <div class="barra"><span style="width: 90%;"></span></div>
            </div>

            <div class="imagem-estudo">
            <img src="assets/images/chemistry/amida.svg" alt="Amida">
            </div>

            <div class="questao-numero">Questao 9</div>
            <p class="enunciado">A funcao organica representada de forma simplificada por R-CONH2 e:</p>

            <?php if ($mensagem == "" || $classe == "alerta") { ?>
            <form method="POST" action="questao9.php">
                <input type="hidden" name="pontos" value="<?php echo $pontuacao; ?>">
                <div class="alternativas">
                    <label class="alternativa"><input type="radio" name="resposta" value="a"> a) Eter</label>
                    <label class="alternativa"><input type="radio" name="resposta" value="b"> b) Cetona</label>
                    <label class="alternativa"><input type="radio" name="resposta" value="c"> c) Amida</label>
                    <label class="alternativa"><input type="radio" name="resposta" value="d"> d) Hidrocarboneto</label>
                </div>

                <div class="quadro">
                    <strong>Dica:</strong> amidas apresentam carbonila e nitrogenio no mesmo grupo funcional.
                </div>

                <div class="acoes">
                    <button class="botao" type="submit" name="validar">Validar resposta</button>
                </div>
            </form>
            <?php } ?>

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
                            window.location.href = "questao10.php?pontos=<?php echo $pontuacao; ?>";
                        }, 1500);
                    </script>
                <?php } ?>
                <?php if ($classe == "incorreto") { ?>
                    <div class="acoes">
                        <a class="botao secundario" href="questao10.php?pontos=<?php echo $pontuacao; ?>">Proxima questao</a>
                    </div>
                <?php } ?>
            <?php } ?>
        </section>
    </main>
    <script src="assets/js/cronometro.js"></script>
    <script src="assets/js/tema.js"></script>
</body>
</html>


