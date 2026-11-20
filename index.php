<?php
if (session_status() !== PHP_SESSION_ACTIVE) {
    session_start();
}

if (empty($_SESSION["diagnostico"])) {
    header("Location: formulario.php");
    exit;
}
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PlayCHEMISTRY ENEM</title>
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="stylesheet" href="assets/css/hero-molecule-animation.css">
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
                <a href="index.php" class="active">Início</a>
                <a href="central_conhecimento.php">Central de Conhecimento</a>
                <a href="laboratorio_3d.php">Laboratório 3D</a>
                <a href="periodiclab.php">PeriodicLab</a>
                <a href="leonardia.php">LeonardIA</a>
                <a href="resultado.php">Meu Desempenho</a>
                <a href="sobre.php">Sobre</a>
            </nav>

        </div>
    </header>

    <main class="page-shell">
        <section class="container hero-section">
            <div class="hero-copy">
                <span class="badge">Plataforma de química para o ENEM</span>
                <h1>Domine a Química. Prepare-se para o ENEM.</h1>
                <p>
                    Aprenda, pratique e evolua com uma plataforma que reúne conteúdos interativos,
                    inteligência artificial e ferramentas inovadoras para sua preparação.
                </p>

                <div class="cta-row">
                    <a class="botao" href="questao1.php">Começar a estudar</a>
                    <a class="botao botao-secundario" href="central_conhecimento.php">Explorar conteúdos</a>
                </div>

                <ul class="hero-metrics" aria-label="Estatísticas do projeto">
                    <li>
                        <strong>10</strong>
                        <span>questões</span>
                    </li>
                    <li>
                        <strong>6</strong>
                        <span>temas</span>
                    </li>
                    <li>
                        <strong>24/7</strong>
                        <span>estudo</span>
                    </li>
                </ul>
            </div>

            <div class="hero-visual" aria-label="Ilustração científica de formação química">
                <div class="orb orb-one"></div>
                <div class="orb orb-two"></div>
                <div class="molecule-panel">
                    <div class="molecule">
                        <span class="molecule-atom atom-a">C</span>
                        <span class="molecule-atom atom-b">H</span>
                        <span class="molecule-atom atom-c">O</span>
                        <span class="molecule-atom atom-d">N</span>
                    </div>
                    <div class="mini-card">
                        <span>Risco de acerto</span>
                        <strong>+87%</strong>
                    </div>
                </div>
            </div>
        </section>

        <section class="container feature-section">
            <div class="section-heading">
                <span class="eyebrow">Ferramentas</span>
                <h2>Recursos para evoluir no estudo</h2>
            </div>

            <div class="cards-grid">
                <article class="feature-card">
                    <div class="icon-box">📚</div>
                    <h3>Central de Conhecimento</h3>
                    <p>Biblioteca de conteúdos teóricos, resumos, exemplos e revisões práticas.</p>
                    <a href="central_conhecimento.php">Acessar</a>
                </article>

                <article class="feature-card">
                    <div class="icon-box">🧪</div>
                    <h3>Laboratório 3D</h3>
                    <p>Exploração visual de estruturas químicas em perspectiva tridimensional.</p>
                    <a href="laboratorio_3d.php">Explorar</a>
                </article>

                <article class="feature-card">
                    <div class="icon-box">🧬</div>
                    <h3>PeriodicLab</h3>
                    <p>Explore a tabela periódica completa, consulte elementos e entenda suas propriedades.</p>
                    <a href="periodiclab.php">Explorar</a>
                </article>

                <article class="feature-card">
                    <div class="icon-box">🤖</div>
                    <h3>LeonardIA</h3>
                    <p>Assistente inteligente para tirar dúvidas e reforçar conceitos de Química.</p>
                    <a href="leonardia.php">Conversar</a>
                </article>

                <article class="feature-card">
                    <div class="icon-box">⏱️</div>
                    <h3>Simulados ENEM</h3>
                    <p>Questões contextualizadas com cronômetro, correção e revisão imediata.</p>
                    <a href="questao1.php">Iniciar</a>
                </article>

                <article class="feature-card">
                    <div class="icon-box">📈</div>
                    <h3>Meu Desempenho</h3>
                    <p>Acompanhe sua evolução, percentual de acertos e progresso ao longo do estudo.</p>
                    <a href="resultado.php">Ver progresso</a>
                </article>
            </div>
        </section>

        <section class="container content-section">
            <div class="section-heading">
                <span class="eyebrow">Conteúdos</span>
                <h2>Temas em destaque</h2>
            </div>

            <div class="content-grid">
                <article class="topic-card">
                    <span class="topic-tag">ORGÂNICA</span>
                    <h3>Funções Orgânicas</h3>
                    <p>Identificação, fórmulas e propriedades de compostos orgânicos fundamentais.</p>
                    <a href="central_conhecimento.php">Ver resumo</a>
                </article>

                <article class="topic-card">
                    <span class="topic-tag">LIGAÇÕES</span>
                    <h3>Ligações Químicas</h3>
                    <p>Exploração da formação, polaridade e forças que ligam os átomos.</p>
                    <a href="central_conhecimento.php">Ver resumo</a>
                </article>

                <article class="topic-card">
                    <span class="topic-tag">MASSA</span>
                    <h3>Estequiometria</h3>
                    <p>Reações, proporções, volumes e relações de quantidade de matéria.</p>
                    <a href="central_conhecimento.php">Ver resumo</a>
                </article>

                <article class="topic-card">
                    <span class="topic-tag">ENERGIA</span>
                    <h3>Termoquímica</h3>
                    <p>Entalpia, calor, reações exotérmicas e endotérmicas e seus cálculos.</p>
                    <a href="central_conhecimento.php">Ver resumo</a>
                </article>

                <article class="topic-card">
                    <span class="topic-tag">ELETRÓLITO</span>
                    <h3>Eletroquímica</h3>
                    <p>Potenciais, pilhas, eletrólise e o papel das reações redox na prática.</p>
                    <a href="central_conhecimento.php">Ver resumo</a>
                </article>

                <article class="topic-card">
                    <span class="topic-tag">POLARIDADE</span>
                    <h3>Polaridade Molecular</h3>
                    <p>Compreensão de moléculas polares e apolares e suas propriedades.</p>
                    <a href="central_conhecimento.php">Ver resumo</a>
                </article>
            </div>
        </section>
    </main>

    <footer class="site-footer">
        <div class="container footer-grid">
            <div>
                <h3>PlayCHEMISTRY ENEM</h3>
                <p>Uma plataforma moderna para estudar Química com foco em ENEM, excelência e preparação profissional.</p>
            </div>
            <div>
                <h4>Navegação</h4>
                <ul>
                    <li><a href="index.php">Início</a></li>
                    <li><a href="central_conhecimento.php">Central de Conhecimento</a></li>
                    <li><a href="laboratorio_3d.php">Laboratório 3D</a></li>
                </ul>
            </div>
            <div>
                <h4>Playbas Chemicals</h4>
                <ul>
                    <li>Educação em ciência</li>
                    <li>Pesquisa e inovação</li>
                    <li>Desenvolvimento acadêmico</li>
                </ul>
            </div>
        </div>
        <div class="footer-bottom">© 2026 PlayCHEMISTRY ENEM · Desenvolvido pela equipe Playbas</div>
    </footer>

    <script src="assets/js/cronometro.js"></script>
    <script src="assets/js/tema.js"></script>
</body>
</html>
