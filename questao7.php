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
Arquivo: questao7.php
Descrição: Questão 7 do simulado — contém enunciado, alternativas, processamento e feedback.
-->
<html lang="pt-br">
<head>
    <!-- Cabecalho padrao do questionario. -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Questao 7 - PlayCHEMISTRY ENEM</title>
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
    <!-- Cabecalho comum do site. -->
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

        // Dados da setima questao.
        $questao = 7;
        $pontuacao = (int) ($_SESSION['quiz_score'] ?? 0);

        // Alternativa correta e mensagens.
        $respostaCorreta = "a";
        $mensagem = "";
        $classe = "";
        $jaRespondida = array_key_exists($questao, $_SESSION['quiz_answers'] ?? []);

        // Verifica se o usuario clicou em validar.
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
                    $mensagem = "Correto! Esteres apresentam o grupo R-COO-R.";
                    $classe = "correto";
                } else {
                    $mensagem = "Incorreto. Esteres apresentam o grupo -COO- entre partes carbonicas, sendo representados de forma geral por R-COO-R.";
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
                <div class="barra"><span style="width: 70%;"></span></div>
            </div>

           <div class="imagem-estudo">
         <img src="assets/images/ester.svg" alt="Éster">
        </div>

            <div class="questao-numero">Questao 7</div>
            <p class="enunciado">A estrutura geral R-COO-R representa principalmente qual funcao organica?</p>

            <!-- Formulario com alternativas. -->
            <?php if ($mensagem == "" || $classe == "alerta") { ?>
            <form method="POST" action="questao7.php">
                <input type="hidden" name="pontos" value="<?php echo $pontuacao; ?>">
                <div class="alternativas">
                    <label class="alternativa"><input type="radio" name="resposta" value="a"> a) Ester</label>
                    <label class="alternativa"><input type="radio" name="resposta" value="b"> b) Amina</label>
                    <label class="alternativa"><input type="radio" name="resposta" value="c"> c) Hidrocarboneto</label>
                    <label class="alternativa"><input type="radio" name="resposta" value="d"> d) Alcool</label>
                </div>

                <div class="quadro">
                    <strong>Dica:</strong> esteres sao derivados de acidos carboxilicos e possuem o grupo -COO-.
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
                            window.location.href = "questao8.php?pontos=<?php echo $pontuacao; ?>";
                        }, 1500);
                    </script>
                <?php } ?>
                <?php if ($classe == "incorreto") { ?>
                    <div class="acoes">
                        <a class="botao secundario" href="questao8.php?pontos=<?php echo $pontuacao; ?>">Proxima questao</a>
                    </div>
                <?php } ?>
            <?php } ?>
        </section>
</main>
<script src="assets/js/cronometro.js"></script>
    <script src="assets/js/tema.js"></script>
</body>
</html>


