<!DOCTYPE html>
<!--
Arquivo: resultado.php
Descrição: Página que exibe o resultado final do simulado, porcentagem e classificação.
Contém: cálculo de porcentagem, mensagem de feedback e exibição do tempo final.
-->
<html lang="pt-br">
<head>
    <!-- Configurações da página -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resultado - PlayCHEMISTRY ENEM</title>

    <link rel="stylesheet" href="assets/css/style.css">

    <!-- Tema escuro -->
    <script src="assets/js/tema.js" defer></script>
</head>
<body>

    <!-- Barra superior -->
    <div class="top-bar">
        <div id="cronometro">00:00</div>
    </div>

    <!-- Cabeçalho -->
    <header class="topo">
        <h1>PlayCHEMISTRY ENEM</h1>
        <p>Resultado final do questionário</p>
    </header>

    <main class="pagina">

        <?php

        // Quantidade total de questões
        const TOTAL_QUESTOES = 10;

        // Só considera o resultado concluído quando a pontuação foi enviada.
        $tentativaRealizada = isset($_GET["pontos"])
            && is_scalar($_GET["pontos"])
            && filter_var($_GET["pontos"], FILTER_VALIDATE_INT) !== false;
        $pontuacao = $tentativaRealizada
            ? max(0, min(TOTAL_QUESTOES, (int) $_GET["pontos"]))
            : 0;
        $erros = $tentativaRealizada ? TOTAL_QUESTOES - $pontuacao : 0;

        // Calcula o percentual de acertos
        $porcentagem = round(($pontuacao / TOTAL_QUESTOES) * 100);
        $porcentagemErros = $tentativaRealizada
            ? round(($erros / TOTAL_QUESTOES) * 100)
            : 0;

        $classificacao = "";
        $mensagem = "";
        $classeNota = ""; // Armazenará a classe de cor ('ruim', 'media' ou 'boa')
        $corGrafico = "#10b981";

        if (!$tentativaRealizada) {
            $classificacao = "Questionário não iniciado";
            $mensagem = "Responda ao questionário para visualizar seus acertos e erros.";
            $classeNota = "media";
            $corGrafico = "#f59e0b";
        } else switch ($pontuacao) {

            case 10:
            case 9:
                $classificacao = "Pronto para o ENEM";
                $mensagem = "Excelente! Você reconheceu muito bem as funções orgânicas cobradas no questionário.";
                $classeNota = "boa";
                $corGrafico = "#10b981";
                break;

            case 8:
            case 7:
                $classificacao = "Muito bom";
                $mensagem = "Você está indo muito bem. Revise os grupos funcionais para alcançar o desempenho máximo.";
                $classeNota = "boa";
                $corGrafico = "#10b981";
                break;

            case 6:
            case 5:
                $classificacao = "Intermediário";
                $mensagem = "Você já possui uma boa base, mas ainda precisa revisar algumas funções orgânicas.";
                $classeNota = "media";
                $corGrafico = "#f59e0b";
                break;

            default:
                $classificacao = "Em revisão";
                $mensagem = "Retome o conteúdo de funções orgânicas e tente novamente para fixar melhor os conceitos.";
                $classeNota = "ruim";
                $corGrafico = "#ef4444";
                break;
        }

        ?>

        <section class="painel resultado <?php echo $classeNota; ?>">

            <span class="marca">Funções Orgânicas</span>

            <h2><?php echo $classificacao; ?></h2>

            <?php if ($tentativaRealizada) { ?>
                <div class="nota <?php echo $classeNota; ?>">
                    <?php echo $porcentagem; ?>%
                </div>

                <p>
                    Você acertou
                    <strong><?php echo $pontuacao; ?></strong>
                    de
                    <strong><?php echo TOTAL_QUESTOES; ?></strong>
                    questões.
                </p>
            <?php } else { ?>
                <p>Você ainda não respondeu ao questionário. Nenhum erro foi contabilizado.</p>
            <?php } ?>

            <p>
                Tempo de realização:
                <strong id="tempoFinal">00:00</strong>
            </p>

            <p><?php echo $mensagem; ?></p>

            <?php if ($tentativaRealizada) { ?>
            <div class="grafico-resultado" aria-label="Gráfico de aproveitamento">
                <div class="grafico-circular animacao-grafico" style="--valor: <?php echo $porcentagem; ?>; --cor: <?php echo $corGrafico; ?>;">
                    <div class="grafico-conteudo">
                        <span class="grafico-valor"><?php echo $porcentagem; ?>%</span>
                        <small>Aproveitamento</small>
                    </div>
                </div>

                <div class="lista-grafico">
                    <div class="item-metrica">
                        <div class="cabecalho-metrica">
                            <span>Acertos</span>
                            <strong><?php echo $pontuacao; ?>/<?php echo TOTAL_QUESTOES; ?></strong>
                        </div>
                        <div class="barra-base">
                            <span class="barra-preenchida" style="width: <?php echo $porcentagem; ?>%; background: <?php echo $corGrafico; ?>;"></span>
                        </div>
                    </div>

                    <div class="item-metrica">
                        <div class="cabecalho-metrica">
                            <span>Erros</span>
                            <strong><?php echo $erros; ?>/<?php echo TOTAL_QUESTOES; ?></strong>
                        </div>
                        <div class="barra-base">
                            <span class="barra-preenchida erro" style="width: <?php echo $porcentagemErros; ?>%;"></span>
                        </div>
                    </div>
                </div>
            </div>
            <?php } ?>

            <!-- Imagem de revisão -->
            <div class="imagem-estudo">
                <img
                    src="assets/images/grupos-funcionais.svg"
                    alt="Quadro com grupos funcionais orgânicos"
                >
            </div>

            <p class="legenda">
                Use o quadro para revisar rapidamente os principais grupos funcionais.
            </p>

            <!-- Resumo -->
            <div class="quadro">
                <h3>Resumo do conteúdo</h3>

                <p>
                    As funções orgânicas agrupam compostos com propriedades semelhantes,
                    definidas pelo grupo funcional presente na molécula.
                    Entre elas estão hidrocarbonetos, álcoois, aldeídos,
                    cetonas, ácidos carboxílicos, ésteres, éteres,
                    aminas e amidas.
                </p>
            </div>

            <!-- Ações -->
            <div class="acoes resultado-acoes">
                <a class="botao secundario" href="index.php">
                    Voltar ao início
                </a>

            </div>

        </section>

    </main>

    <!-- Tempo final -->
    <script>

        const segundos =
            parseInt(localStorage.getItem('tempoSimulado')) || 0;

        const minutos =
            String(Math.floor(segundos / 60))
            .padStart(2, '0');

        const seg =
            String(segundos % 60)
            .padStart(2, '0');

        const tempoFinal = `${minutos}:${seg}`;

        document.getElementById('tempoFinal').textContent =
            tempoFinal;

        document.getElementById('cronometro').textContent =
            tempoFinal;

        const graficoCircular = document.querySelector('.grafico-circular');

        if (graficoCircular) {
            const valorMeta = Number(graficoCircular.style.getPropertyValue('--valor')) || 0;
            const corMeta = graficoCircular.style.getPropertyValue('--cor') || '#10b981';

            graficoCircular.style.setProperty('--valor', '0');
            graficoCircular.style.background = `conic-gradient(${corMeta} 0%, rgba(148, 163, 184, 0.18) 0%)`;

            requestAnimationFrame(() => {
                graficoCircular.style.setProperty('--valor', String(valorMeta));
                graficoCircular.style.background = `conic-gradient(${corMeta} ${valorMeta * 3.6}deg, rgba(148, 163, 184, 0.18) 0deg)`;
                graficoCircular.classList.add('ativo');
            });
        }

        // Limpa os dados para a próxima tentativa
        localStorage.removeItem('simuladoIniciado');
        localStorage.removeItem('tempoSimulado');
                    
    </script>

</body>
</html>