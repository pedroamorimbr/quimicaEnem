<!DOCTYPE html>
<!--
Arquivo: questao5.php
Descrição: Questão 5 do simulado. Processa o formulário e atualiza a pontuação acumulada.
-->
<html lang="pt-br">
<head>
    <!-- Metadados da pagina e CSS externo. -->
    
    <!-- Cabecalho padrao do questionario. -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Questao 5 - PlayCHEMISTRY ENEM</title>
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

        // Dados da quinta questao.
        $questao = 5;
        $pontuacao = 0;

        // Recupera a pontuacao acumulada ate a questao 4.
        if (isset($_GET["pontos"])) {
            $pontuacao = $_GET["pontos"];
        }

        // Resposta correta da questao.
        $respostaCorreta = "b";
        $mensagem = "";
        $classe = "";

        // Valida o envio do formulario.
        if (isset($_POST["validar"])) {
            $pontuacao = $_POST["pontos"];

            if (isset($_POST["resposta"])) {
                if ($_POST["resposta"] == $respostaCorreta) {
                    $pontuacao = $pontuacao + 1;
                    $mensagem = "Correto! Aminas possuem nitrogenio ligado a cadeias carbonicas.";
                    $classe = "correto";
                } else {
                    $mensagem = "Incorreto. Aminas sao funcoes nitrogenadas em que o nitrogenio se liga a cadeias carbonicas. Ester, alcool e cetona sao funcoes com oxigenio.";
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
                <div class="barra"><span style="width: 50%;"></span></div>
            </div>

            <div class="imagem-estudo">
             <img src="assets/images/amina.svg" alt="Amina">
            </div>

            <div class="questao-numero">Questao 5</div>
            <p class="enunciado">Qual funcao organica e formada por compostos com nitrogenio ligado a cadeias carbonicas?</p>

            <!-- Formulario da quinta questao. -->
            <?php if ($mensagem == "" || $classe == "alerta") { ?>
            <form method="POST" action="questao5.php">
                <input type="hidden" name="pontos" value="<?php echo $pontuacao; ?>">
                <div class="alternativas">
                    <label class="alternativa"><input type="radio" name="resposta" value="a"> a) Ester</label>
                    <label class="alternativa"><input type="radio" name="resposta" value="b"> b) Amina</label>
                    <label class="alternativa"><input type="radio" name="resposta" value="c"> c) Alcool</label>
                    <label class="alternativa"><input type="radio" name="resposta" value="d"> d) Cetona</label>
                </div>

                <div class="quadro">
                    <strong>Dica:</strong> aminas sao compostos nitrogenados relacionados a substituicao de hidrogenios da amonia por cadeias carbonicas.
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
                            window.location.href = "questao6.php?pontos=<?php echo $pontuacao; ?>";
                        }, 1500);
                    </script>
                <?php } ?>
                <?php if ($classe == "incorreto") { ?>
                    <div class="acoes">
                        <a class="botao secundario" href="questao6.php?pontos=<?php echo $pontuacao; ?>">Proxima questao</a>
                    </div>
                <?php } ?>
            <?php } ?>
        </section>
    </main>
    <script src="assets/js/cronometro.js"></script>
    <script src="assets/js/tema.js"></script>
</body>
</html>


