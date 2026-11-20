<!DOCTYPE html>
<!-- Estrutura da biblioteca; os módulos, aulas e progresso são montados por central-conhecimento.js. -->
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Apostila digital de Química para o ENEM: aulas, exercícios e revisão em 20 módulos.">
    <title>Central do Conhecimento | PlayCHEMISTRY ENEM</title>
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="stylesheet" href="assets/css/central-conhecimento.css">
</head>
<body>
    <header class="site-header">
        <div class="container header-inner">
            <a class="brand" href="index.php" aria-label="Voltar para a página inicial">
                <img class="logo-site" src="assets/images/logo/Logo neon de química PLAY CHEMISTRY (1).png" alt="Logo Play Chemistry">
                <div class="brand-copy"><span>PlayCHEMISTRY</span><small>ENEM</small></div>
            </a>
            <button class="menu-toggle" type="button" aria-label="Abrir menu" aria-controls="main-nav" aria-expanded="false">☰</button>
            <nav class="main-nav" id="main-nav" aria-label="Navegação principal">
                <a href="index.php">Início</a>
                <a href="central_conhecimento.php" class="active">Central do Conhecimento</a>
                <a href="laboratorio_3d.php">Laboratório 3D</a>
                <a href="periodiclab.php">PeriodicLab</a>
                <a href="leonardia.php">LeonardIA</a>
                <a href="resultado.php">Meu Desempenho</a>
                <a href="sobre.php">Sobre</a>
            </nav>
        </div>
    </header>

    <main class="page-shell knowledge-library" id="inicio">
        <section class="container knowledge-hero small-hero">
            <div class="hero-copy">
                <span class="badge">Apostila digital · ENEM</span>
                <h1>Central do Conhecimento</h1>
                <p>Uma biblioteca de Química organizada para estudar com método: compreenda a teoria, resolva questões e acompanhe seu progresso.</p>
                <div class="library-stats" aria-label="Resumo da biblioteca">
                    <span><strong id="module-count">20</strong> módulos</span>
                    <span><strong id="lesson-count">—</strong> aulas</span>
                    <span><strong id="overall-progress">0%</strong> concluído</span>
                </div>
            </div>
        </section>

        <section class="container library-toolbar" aria-label="Pesquisa e filtros">
            <label class="search-field" for="lesson-search">
                <span class="search-icon" aria-hidden="true"></span>
                <input id="lesson-search" type="search" placeholder="Pesquisar módulos e aulas..." autocomplete="off">
            </label>
            <label class="filter-field" for="subject-filter">
                <span>Assunto</span>
                <select id="subject-filter"><option value="all">Todos os assuntos</option></select>
            </label>
            <button class="library-filter-button" type="button" id="favorites-filter" aria-pressed="false">☆ Favoritas <span id="favorite-count">0</span></button>
            <button class="library-filter-button" type="button" id="home-button" hidden>← Todos os módulos</button>
        </section>
        <section class="container library-resume" id="resume-panel" hidden>
            <p>Continue seus estudos de onde parou.</p>
            <button class="library-filter-button" type="button" id="resume-lesson"></button>
        </section>

        <section class="container library-status" id="library-status" aria-live="polite" role="status"></section>
        <section class="container module-grid" id="module-grid" aria-label="Módulos de Química"></section>
        <section class="container lesson-layout" id="lesson-view" aria-label="Aula" hidden></section>
        <section class="container favorites-section" id="favorites-view" aria-label="Aulas favoritas" hidden></section>
    </main>

    <footer class="site-footer">
        <div class="container footer-grid">
            <div><h3>PlayCHEMISTRY ENEM</h3><p>Aprenda a teoria, pratique e avance na sua preparação para o ENEM.</p></div>
            <div><h4>Navegação</h4><ul><li><a href="index.php">Início</a></li><li><a href="central_conhecimento.php">Central do Conhecimento</a></li><li><a href="laboratorio_3d.php">Laboratório 3D</a></li></ul></div>
            <div><h4>Aprender e explorar</h4><ul><li>Teoria e exercícios</li><li>Aprendizagem ativa</li><li>Ciência no cotidiano</li></ul></div>
        </div>
        <div class="footer-bottom">© 2026 PlayCHEMISTRY ENEM · Desenvolvido pela equipe Playbas</div>
    </footer>
    <script src="assets/js/tema.js"></script>
    <script src="assets/js/central-conhecimento.js"></script>
</body>
</html>
