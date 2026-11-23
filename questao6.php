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
Arquivo: questao6.php
Descrição: Questão 6 do simulado. Alternativas, validação e encaminhamento para a próxima questão.
-->
<html lang="pt-br">
<head>
    <link rel="icon" type="image/png" href="/assets/images/brand/logo-playchemistry.png">
    
    <!-- Cabecalho padrao do questionario. -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Questao 6 - PlayCHEMISTRY ENEM</title>
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
    <!-- Cabecalho do questionario. -->
    <header class="topo">
        <h1>PlayCHEMISTRY ENEM</h1>
        <p>Questionario sobre Funcoes Organicas</p>

          <div class="top-bar">
        <div id="cronometro">00:00</div>

    
    </header>

    <main class="pagina">
        <?php
        // Total de questoes do questionario.
        const TOTAL_QUESTOES = 10;

        // Dados da sexta questao.
        $questao = 6;
        $pontuacao = (int) ($_SESSION['quiz_score'] ?? 0);

        // Alternativa correta.
        $respostaCorreta = "c";
        $mensagem = "";
        $classe = "";
        $jaRespondida = array_key_exists($questao, $_SESSION['quiz_answers'] ?? []);

        // Corrige a resposta enviada pelo formulario.
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
                    $mensagem = "Correto! Cetonas possuem carbonila entre duas cadeias carbonicas.";
                    $classe = "correto";
                } else {
                    $mensagem = "Incorreto. Cetonas possuem o grupo carbonila, C=O, entre duas cadeias carbonicas. Aldeidos tambem possuem carbonila, mas ligada ao grupo -CHO.";
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
                <div class="barra"><span style="width: 60%;"></span></div>
            </div>

            <!-- Imagem de apoio visual. -->
           <div class="imagem-estudo">
         <img src="assets/images/chemistry/cetona.svg" alt="Cetona">
        </div>
            <div class="questao-numero">Questao 6</div>
            <p class="enunciado">Qual funcao organica possui o grupo carbonila entre duas cadeias carbonicas?</p>

            <!-- Formulario da questao. -->
            <?php if ($mensagem == "" || $classe == "alerta") { ?>
            <form method="POST" action="questao6.php">
                <input type="hidden" name="pontos" value="<?php echo $pontuacao; ?>">
                <div class="alternativas">
                    <label class="alternativa"><input type="radio" name="resposta" value="a"> a) Alcool</label>
                    <label class="alternativa"><input type="radio" name="resposta" value="b"> b) Aldeido</label>
                    <label class="alternativa"><input type="radio" name="resposta" value="c"> c) Cetona</label>
                    <label class="alternativa"><input type="radio" name="resposta" value="d"> d) Eter</label>
                </div>

                <div class="quadro">
                    <strong>Dica:</strong> na cetona, o grupo C=O aparece no meio da cadeia, entre carbonos.
                </div>

                <div class="acoes">
                    <button class="botao" type="submit" name="validar">Validar resposta</button>
                </div>
            </form>
            <?php } ?>

            <!-- Feedback e avanco para a proxima pagina. -->
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
                            window.location.href = "questao7.php?pontos=<?php echo $pontuacao; ?>";
                        }, 1500);
                    </script>
                <?php } ?>
                <?php if ($classe == "incorreto") { ?>
                    <div class="acoes">
                        <a class="botao secundario" href="questao7.php?pontos=<?php echo $pontuacao; ?>">Proxima questao</a>
                    </div>
                <?php } ?>
            <?php } ?>
        </section>
    </main>
    <script src="assets/js/cronometro.js"></script>
    <script src="assets/js/tema.js"></script>
</body>
</html>


