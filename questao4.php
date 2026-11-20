<!DOCTYPE html>
<!--
Arquivo: questao4.php
Descrição: Questão 4 do simulado. Contém validação de alternativa e controle de pontuação.
-->
<html lang="pt-br">
<head>
    <!-- Configuracoes basicas da pagina. -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Questao 4 - PlayCHEMISTRY ENEM</title>
   <link rel="stylesheet" href="assets/css/style.css">
    
</head>
<body>
    
    <!-- Cabecalho padrao do questionario. -->
    <header class="topo">
        <h1>PlayCHEMISTRY ENEM</h1>
        <p>Questionario sobre Funcoes Organicas</p>

       <div class="top-bar">
        <div id="cronometro">00:00</div>
      
    </header>

    <main class="pagina">
        <?php
        // Dados e processamento da questao 4.
        const TOTAL_QUESTOES = 10;
        $questao = 4;
        $pontuacao = 0;
        $respostaCorreta = "d";
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
                    $mensagem = "Correto! Acidos carboxilicos sao caracterizados pelo grupo -COOH.";
                    $classe = "correto";
                } else {
                    $mensagem = "Incorreto. O grupo -COOH e chamado carboxila e identifica os acidos carboxilicos. Eter, cetona e amina possuem outros grupos funcionais.";
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
                <div class="barra"><span style="width: 40%;"></span></div>
            </div>

            <!-- Imagem de apoio visual. -->
            <div class="imagem-estudo">
            <img src="assets/images/acido-carboxilico.svg" alt="Ácido Carboxílico">
            </div>

            <div class="questao-numero">Questao 4</div>
            <p class="enunciado">A funcao organica que possui o grupo carboxila, representado por -COOH, e:</p>

            <!-- Formulario da questao. -->
            <?php if ($mensagem == "" || $classe == "alerta") { ?>
            <form method="POST" action="questao4.php">
                <input type="hidden" name="pontos" value="<?php echo $pontuacao; ?>">
                <div class="alternativas">
                    <label class="alternativa"><input type="radio" name="resposta" value="a"> a) Eter</label>
                    <label class="alternativa"><input type="radio" name="resposta" value="b"> b) Cetona</label>
                    <label class="alternativa"><input type="radio" name="resposta" value="c"> c) Amina</label>
                    <label class="alternativa"><input type="radio" name="resposta" value="d"> d) Acido carboxilico</label>
                </div>

                <div class="quadro">
                    <strong>Dica:</strong> acidos carboxilicos possuem o grupo -COOH.
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
                            window.location.href = "questao5.php?pontos=<?php echo $pontuacao; ?>";
                        }, 1500);
                    </script>
                <?php } ?>
                <?php if ($classe == "incorreto") { ?>
                    <div class="acoes">
                        <a class="botao secundario" href="questao5.php?pontos=<?php echo $pontuacao; ?>">Proxima questao</a>
                    </div>
                <?php } ?>
            <?php } ?>
        </section>
</main>
<script src="assets/js/cronometro.js"></script>
    <script src="assets/js/tema.js"></script>
</body>
</html>


