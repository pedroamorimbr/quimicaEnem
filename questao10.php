<!DOCTYPE html>
<!--
Arquivo: questao10.php
Descrição: Última questão do simulado; ao finalizar redireciona para `resultado.php`.
-->
<html lang="pt-br">
<head>
    
    <!-- Cabecalho padrao do questionario. -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Questao 10 - PlayCHEMISTRY ENEM</title>
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
    <!-- Cabecalho do site. -->
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

        // Dados da ultima questao.
        $questao = 10;
        $pontuacao = 0;

        // Recebe a pontuacao acumulada.
        if (isset($_GET["pontos"])) {
            $pontuacao = $_GET["pontos"];
        }

        // Resposta correta.
        $respostaCorreta = "a";
        $mensagem = "";
        $classe = "";

        // Corrige o formulario quando enviado.
        if (isset($_POST["validar"])) {
            $pontuacao = $_POST["pontos"];

            if (isset($_POST["resposta"])) {
                if ($_POST["resposta"] == $respostaCorreta) {
                    $pontuacao = $pontuacao + 1;
                    $mensagem = "Correto! Alcool, cetona e acido carboxilico sao exemplos de funcoes oxigenadas.";
                    $classe = "correto";
                } else {
                    $mensagem = "Incorreto. Alcool, cetona e acido carboxilico sao funcoes oxigenadas porque possuem oxigenio no grupo funcional. Hidrocarbonetos nao possuem oxigenio, e aminas sao nitrogenadas.";
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
                <div class="barra"><span style="width: 100%;"></span></div>
            </div>

            <div class="imagem-estudo">
             <img src="assets/images/oxigenadas_padrao.svg" alt="Funções Oxigenadas">
            </div>

            <div class="questao-numero">Questao 10</div>
            <p class="enunciado">Qual conjunto apresenta apenas funcoes organicas oxigenadas?</p>

            <?php if ($mensagem == "" || $classe == "alerta") { ?>
            <form method="POST" action="questao10.php">
                <input type="hidden" name="pontos" value="<?php echo $pontuacao; ?>">
                <div class="alternativas">
                    <label class="alternativa"><input type="radio" name="resposta" value="a"> a) Alcool, cetona e acido carboxilico</label>
                    <label class="alternativa"><input type="radio" name="resposta" value="b"> b) Amina, amida e hidrocarboneto</label>
                    <label class="alternativa"><input type="radio" name="resposta" value="c"> c) Hidrocarboneto, amina e aldeido</label>
                    <label class="alternativa"><input type="radio" name="resposta" value="d"> d) Amina, eter e hidrocarboneto</label>
                </div>

                <div class="quadro">
                    <strong>Dica:</strong> funcoes oxigenadas apresentam oxigenio no grupo funcional.
                </div>

                <div class="acoes">
                    <button class="botao" type="submit" name="validar">Validar resposta</button>
                </div>
            </form>
            <?php } ?>

            <!-- Na ultima questao, o botao leva para o resultado final. -->
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
                            window.location.href = "resultado.php?pontos=<?php echo $pontuacao; ?>";
                        }, 1500);
                    </script>
                <?php } ?>
                <?php if ($classe == "incorreto") { ?>
                    <div class="acoes">
                        <a class="botao secundario" href="resultado.php?pontos=<?php echo $pontuacao; ?>">Ver resultado</a>
                    </div>
                <?php } ?>
            <?php } ?>
        </section>
    </main>
    <script src="assets/js/cronometro.js"></script>
    <script src="assets/js/tema.js"></script>
</body>
</html>


