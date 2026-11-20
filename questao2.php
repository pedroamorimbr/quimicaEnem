<!DOCTYPE html>
<!--
Arquivo: questao2.php
Descrição: Questão 2 do simulado. Processa respostas via POST e mantém pontuação por GET/POST.
Contém: lógica de validação e navegação para `questao3.php`.
-->
<html lang="pt-br">
<head>
    <!-- Configuracoes basicas da pagina. -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Questao 2 - PlayCHEMISTRY ENEM</title>
    <link rel="stylesheet" href="assets/css/style.css">
    
</head>
<body>
    
    <!-- Cabecalho padrao do questionario. -->
    <header class="topo">
        <h1>PlayCHEMISTRY ENEM</h1>
        <p>Questionario sobre Funcoes Organicas</p>~

  <div class="top-bar">
          <div class="top-bar">
        <div id="cronometro">00:00</div>

    
    </header>

    <main class="pagina">
        <?php
        // Dados e processamento da questao 2.
        const TOTAL_QUESTOES = 10;
        $questao = 2;
        $pontuacao = 0;
        $respostaCorreta = "c";
        $mensagem = "";
        $classe = "";

        if (isset($_GET["pontos"])) {
            $pontuacao = $_GET["pontos"];
        }

        if (isset($_POST["validar"])) {
            $pontuacao = $_POST["pontos"];
            if (isset($_POST["resposta"])) {
                if ($_POST["resposta"] == $respostaCorreta) {
                    $pontuacao = $pontuacao + 1;
                    $mensagem = "Correto! Alcoois apresentam o grupo hidroxila, representado por -OH.";
                    $classe = "correto";
                } else {
                    $mensagem = "Incorreto. O grupo funcional dos alcoois e a hidroxila, representada por -OH. Ja -CHO indica aldeido, -COOH indica acido carboxilico e -NH2 aparece em aminas.";
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
                <div class="barra"><span style="width: 20%;"></span></div>
            </div>

            <!-- Imagem de apoio visual. -->
           <div class="imagem-estudo">
        <img src="assets/images/alcool.svg" alt="Álcool">
        </div>

            <div class="questao-numero">Questao 2</div>
            <p class="enunciado">Qual grupo funcional caracteriza os alcoois?</p>

            <!-- Formulario da questao. -->
            <?php if ($mensagem == "" || $classe == "alerta") { ?>
            <form method="POST" action="questao2.php">
                <input type="hidden" name="pontos" value="<?php echo $pontuacao; ?>">
                <div class="alternativas">
                    <label class="alternativa"><input type="radio" name="resposta" value="a"> a) -CHO</label>
                    <label class="alternativa"><input type="radio" name="resposta" value="b"> b) -COOH</label>
                    <label class="alternativa"><input type="radio" name="resposta" value="c"> c) -OH</label>
                    <label class="alternativa"><input type="radio" name="resposta" value="d"> d) -NH2</label>
                </div>

                <div class="quadro">
                    <strong>Dica:</strong> o grupo hidroxila e representado por -OH.
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
                            window.location.href = "questao3.php?pontos=<?php echo $pontuacao; ?>";
                        }, 1500);
                    </script>
                <?php } ?>
                <?php if ($classe == "incorreto") { ?>
                    <div class="acoes">
                        <a class="botao secundario" href="questao3.php?pontos=<?php echo $pontuacao; ?>">Proxima questao</a>
                    </div>
                <?php } ?>
            <?php } ?>
        </section>
    </main>
    <script src="assets/js/cronometro.js"></script>
    <script src="assets/js/tema.js"></script>
</body>

</html>


