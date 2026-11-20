<!DOCTYPE html>
<!--
Arquivo: questao8.php
Descrição: Questão 8 do simulado. Exibe alternativas e validação; atualiza pontuação para a próxima página.
-->
<html lang="pt-br">
<head>

    <!-- Cabecalho padrao do questionario. -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Questao 8 - PlayCHEMISTRY ENEM</title>
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
        // Total de questoes.
        const TOTAL_QUESTOES = 10;

        // Dados da oitava questao.
        $questao = 8;
        $pontuacao = 0;

        // Pontuacao acumulada recebida pela URL.
        if (isset($_GET["pontos"])) {
            $pontuacao = $_GET["pontos"];
        }

        // Resposta correta.
        $respostaCorreta = "d";
        $mensagem = "";
        $classe = "";

        // Processamento do formulario.
        if (isset($_POST["validar"])) {
            $pontuacao = $_POST["pontos"];

            if (isset($_POST["resposta"])) {
                if ($_POST["resposta"] == $respostaCorreta) {
                    $pontuacao = $pontuacao + 1;
                    $mensagem = "Correto! Eteres possuem oxigenio entre duas cadeias carbonicas.";
                    $classe = "correto";
                } else {
                    $mensagem = "Incorreto. Eteres possuem um oxigenio entre duas cadeias carbonicas, na forma R-O-R. Isso os diferencia de aldeidos, amidas e acidos carboxilicos.";
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
                <div class="barra"><span style="width: 80%;"></span></div>
            </div>

            <div class="imagem-estudo">
            <img src="assets/images/eter.svg" alt="Éter">
            </div>
            <div class="questao-numero">Questao 8</div>
            <p class="enunciado">Qual funcao organica apresenta um atomo de oxigenio ligado a duas cadeias carbonicas?</p>

            <?php if ($mensagem == "" || $classe == "alerta") { ?>
            <form method="POST" action="questao8.php">
                <input type="hidden" name="pontos" value="<?php echo $pontuacao; ?>">
                <div class="alternativas">
                    <label class="alternativa"><input type="radio" name="resposta" value="a"> a) Aldeido</label>
                    <label class="alternativa"><input type="radio" name="resposta" value="b"> b) Amida</label>
                    <label class="alternativa"><input type="radio" name="resposta" value="c"> c) Acido carboxilico</label>
                    <label class="alternativa"><input type="radio" name="resposta" value="d"> d) Eter</label>
                </div>

                <div class="quadro">
                    <strong>Dica:</strong> a representacao geral dos eteres e R-O-R.
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
                            window.location.href = "questao9.php?pontos=<?php echo $pontuacao; ?>";
                        }, 1500);
                    </script>
                <?php } ?>
                <?php if ($classe == "incorreto") { ?>
                    <div class="acoes">
                        <a class="botao secundario" href="questao9.php?pontos=<?php echo $pontuacao; ?>">Proxima questao</a>
                    </div>
                <?php } ?>
            <?php } ?>
        </section>
    </main>
    <script src="assets/js/cronometro.js"></script>
    <script src="assets/js/tema.js"></script>
</body>
</html>


