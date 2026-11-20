<?php
require_once __DIR__ . '/includes/bootstrap.php';
app_start_session();

const TOTAL_QUESTOES = 10;
$usuario = null;
$historico = [];
$erroBanco = '';
$tentativaRealizada = false;
$pontuacao = 0;
$erros = 0;
$tempoRegistrado = 0;

try {
    if (app_database_configured() && !empty($_SESSION['user_id'])) {
        $usuario = app_current_user();

        $attemptId = (string) ($_SESSION['quiz_attempt_id'] ?? '');
        $score = filter_var($_SESSION['quiz_score'] ?? null, FILTER_VALIDATE_INT);
        $concluido = !empty($_SESSION['quiz_completed']);
        if ($concluido && preg_match('/^[a-f0-9]{32}$/', $attemptId) && $score !== false && $score >= 0 && $score <= TOTAL_QUESTOES) {
            $elapsedSeconds = min(86400, max(0, time() - (int) ($_SESSION['quiz_started_at'] ?? time())));
            $saveAttempt = app_db()->prepare(
                'INSERT IGNORE INTO quiz_attempts (user_id, attempt_key, score, total_questions, elapsed_seconds)
                 VALUES (:user_id, :attempt_key, :score, :total_questions, :elapsed_seconds)'
            );
            $saveAttempt->execute([
                'user_id' => (int) $usuario['id'],
                'attempt_key' => $attemptId,
                'score' => $score,
                'total_questions' => TOTAL_QUESTOES,
                'elapsed_seconds' => $elapsedSeconds,
            ]);
            unset(
                $_SESSION['quiz_attempt_id'],
                $_SESSION['quiz_started_at'],
                $_SESSION['quiz_score'],
                $_SESSION['quiz_answers'],
                $_SESSION['quiz_completed']
            );
        }

        if ($usuario) {
            $attempts = app_db()->prepare(
                'SELECT score, total_questions, elapsed_seconds, completed_at
                 FROM quiz_attempts WHERE user_id = :user_id
                 ORDER BY completed_at DESC, id DESC LIMIT 20'
            );
            $attempts->execute(['user_id' => (int) $usuario['id']]);
            $historico = $attempts->fetchAll();
            if ($historico) {
                $tentativaRealizada = true;
                $pontuacao = (int) $historico[0]['score'];
                $erros = (int) $historico[0]['total_questions'] - $pontuacao;
                $tempoRegistrado = (int) $historico[0]['elapsed_seconds'];
            }
        }
    }

    if (!app_database_configured() && !empty($_SESSION['quiz_completed'])) {
        $score = filter_var($_SESSION['quiz_score'] ?? null, FILTER_VALIDATE_INT);
        if ($score !== false && $score >= 0 && $score <= TOTAL_QUESTOES) {
            $tentativaRealizada = true;
            $pontuacao = $score;
            $erros = TOTAL_QUESTOES - $score;
            $tempoRegistrado = min(86400, max(0, time() - (int) ($_SESSION['quiz_started_at'] ?? time())));
        }
    }
} catch (PDOException $exception) {
    error_log('Falha ao carregar o desempenho do estudante: ' . $exception->getMessage());
    http_response_code(503);
    $erroBanco = 'Não foi possível carregar ou salvar seu desempenho. Tente novamente em alguns instantes.';
} catch (RuntimeException $exception) {
    http_response_code(503);
    $erroBanco = $exception->getMessage();
}

$porcentagem = $tentativaRealizada ? round(($pontuacao / TOTAL_QUESTOES) * 100) : 0;
$porcentagemErros = $tentativaRealizada ? round(($erros / TOTAL_QUESTOES) * 100) : 0;
$classificacao = 'Nenhum simulado concluído';
$mensagem = 'Conclua um simulado para acompanhar seu desempenho nesta página.';
$classeNota = 'media';
$corGrafico = '#f59e0b';

if ($tentativaRealizada) {
    if ($pontuacao >= 9) {
        $classificacao = 'Pronto para o ENEM';
        $mensagem = 'Excelente! Você reconheceu muito bem as funções orgânicas cobradas no questionário.';
        $classeNota = 'boa';
        $corGrafico = '#10b981';
    } elseif ($pontuacao >= 7) {
        $classificacao = 'Muito bom';
        $mensagem = 'Você está indo muito bem. Revise os grupos funcionais para alcançar o desempenho máximo.';
        $classeNota = 'boa';
        $corGrafico = '#10b981';
    } elseif ($pontuacao >= 5) {
        $classificacao = 'Intermediário';
        $mensagem = 'Você já possui uma boa base, mas ainda precisa revisar algumas funções orgânicas.';
        $classeNota = 'media';
    } else {
        $classificacao = 'Em revisão';
        $mensagem = 'Retome o conteúdo de funções orgânicas e tente novamente para fixar melhor os conceitos.';
        $classeNota = 'ruim';
        $corGrafico = '#ef4444';
    }
}
?>
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

    <header class="site-header">
        <div class="container header-inner">
            <a class="brand" href="index.php" aria-label="Voltar para a página inicial">
                <img class="logo-site" src="assets/images/logo/Logo neon de química PLAY CHEMISTRY (1).png" alt="Logo Play Chemistry">
                <div class="brand-copy">
                    <span>PlayCHEMISTRY</span>
                    <small>ENEM</small>
                </div>
            </a>
            <button class="menu-toggle" type="button" aria-label="Abrir menu" aria-controls="main-nav" aria-expanded="false">☰</button>
            <nav class="main-nav" id="main-nav" aria-label="Navegação principal">
                <a href="index.php">Início</a>
                <a href="central_conhecimento.php">Central de Conhecimento</a>
                <a href="laboratorio_3d.php">Laboratório 3D</a>
                <a href="periodiclab.php">PeriodicLab</a>
                <a href="leonardia.php">LeonardIA</a>
                <a href="resultado.php" class="active" aria-current="page">Meu Desempenho</a>
                <a href="sobre.php">Sobre</a>
            </nav>
        </div>
    </header>

    <main class="pagina">

        <section class="painel resultado <?php echo $classeNota; ?>">

            <span class="marca">Funções Orgânicas</span>

            <h2><?php echo $classificacao; ?></h2>

            <?php if ($usuario) { ?>
                <p>Conta: <strong><?php echo app_escape($usuario['name']); ?></strong></p>
                <form method="POST" action="sair.php" class="acoes">
                    <input type="hidden" name="_csrf" value="<?php echo app_escape(app_csrf_token()); ?>">
                    <button class="botao secundario" type="submit">Sair da conta</button>
                </form>
            <?php } ?>

            <?php if ($erroBanco !== '') { ?>
                <div class="feedback incorreto" role="alert"><?php echo app_escape($erroBanco); ?></div>
            <?php } ?>

            <?php if (!$usuario && app_database_configured()) { ?>
                <p>Entre na sua conta para salvar e consultar seu histórico de simulados.</p>
                <div class="acoes">
                    <a class="botao" href="login.php?next=resultado.php">Entrar</a>
                    <a class="botao secundario" href="cadastro.php?next=resultado.php">Criar conta</a>
                </div>
            <?php } ?>

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
                <p>Você ainda não concluiu um simulado.</p>
            <?php } ?>

            <?php if (!app_database_configured()) { ?>
                <p class="legenda">O histórico entre visitas será ativado quando o banco MySQL for conectado.</p>
            <?php } ?>

            <p>
                Tempo de realização:
                <strong id="tempoFinal" data-seconds="<?php echo $tempoRegistrado; ?>">00:00</strong>
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

            <?php if ($usuario && $historico) { ?>
                <div class="quadro">
                    <h3>Histórico de simulados</h3>
                    <div class="lista-grafico">
                        <?php foreach ($historico as $tentativa) { ?>
                            <?php $percentualTentativa = round(((int) $tentativa['score'] / (int) $tentativa['total_questions']) * 100); ?>
                            <p>
                                <strong><?php echo $percentualTentativa; ?>%</strong>
                                — <?php echo (int) $tentativa['score']; ?>/<?php echo (int) $tentativa['total_questions']; ?> acertos
                                — <?php echo app_escape(date('d/m/Y H:i', strtotime($tentativa['completed_at']))); ?>
                            </p>
                        <?php } ?>
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
                <a class="botao" href="questao1.php?novo=1">
                    Fazer novo simulado
                </a>
                <a class="botao secundario" href="central_conhecimento.php">
                    Revisar conteúdos
                </a>

            </div>

        </section>

    </main>

    <!-- Tempo final -->
    <script>

        const tempoSalvo = document.getElementById('tempoFinal');
        const segundos = tempoSalvo ? Number(tempoSalvo.dataset.seconds) || 0 : 0;

        const minutos =
            String(Math.floor(segundos / 60))
            .padStart(2, '0');

        const seg =
            String(segundos % 60)
            .padStart(2, '0');

        const tempoFinal = `${minutos}:${seg}`;

        const tempoFinalElement = document.getElementById('tempoFinal');
        if (tempoFinalElement && <?php echo $tentativaRealizada ? 'true' : 'false'; ?>) {
            tempoFinalElement.textContent = tempoFinal;
        }

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

        // Limpa os dados para a próxima tentativa.
        localStorage.removeItem('simuladoIniciado');
        localStorage.removeItem('tempoSimulado');
                    
    </script>

</body>
</html>