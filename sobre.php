<!DOCTYPE html>
<!-- Apresentação do projeto, da equipe e dos professores envolvidos. -->
<html lang="pt-br">
<head>
    <link rel="icon" type="image/png" href="/assets/images/brand/logo-playchemistry.png">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Conheça o projeto PlayCHEMISTRY ENEM, seus desenvolvedores e professores.">
    <title>Sobre - PlayCHEMISTRY ENEM</title>
    <link rel="stylesheet" href="assets/css/style.css?v=sobre-2">
</head>
<body>
    <header class="site-header">
        <div class="container header-inner">
            <a class="brand" href="index.php" aria-label="Voltar para a página inicial">
                <img class="logo-site" src="assets/images/brand/logo-playchemistry.png" alt="Logo Play Chemistry">
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
                <a href="resultado.php">Meu Desempenho</a>
                <a href="sobre.php" class="active" aria-current="page">Sobre</a>
                <a href="perfil.php">Perfil</a>
            </nav>
        </div>
    </header>

    <header class="topo">
        <span class="marca">PlayCHEMISTRY ENEM</span>
        <h1>Sobre</h1>
        <p>Conheça o projeto, quem o desenvolveu e os professores envolvidos</p>
    </header>

    <main class="pagina equipe-pagina">
        <section class="equipe-introducao">
            <span class="equipe-etiqueta">Ciência, educação e tecnologia</span>
            <h2>O PROJETO</h2>
            <p>
                O PlayCHEMISTRY ENEM é uma plataforma educacional criada por estudantes
                do Instituto Federal da Paraíba para apoiar o estudo de Química e a
                preparação para o ENEM com conteúdos e recursos interativos.
            </p>
        </section>

        <section class="equipe-grade" aria-label="Desenvolvedores do projeto">
            <article class="cartao-desenvolvedor">
                <div class="foto-desenvolvedor">
                    <img src="assets/images/team/pedro-amorim.jpeg" alt="Foto de Pedro Amorim da Silva Filho" loading="lazy">
                </div>
                <div class="dados-desenvolvedor">
                    <span class="desenvolvedor-numero">01 / EQUIPE</span>
                    <h2>Pedro Amorim da Silva Filho</h2>
                    <p class="desenvolvedor-instituicao">Instituto Federal da Paraíba</p>
                    <a href="mailto:Pedro.filho@academico.ifpb.edu.br">
                        Pedro.filho@academico.ifpb.edu.br
                    </a>
                </div>
            </article>

            <article class="cartao-desenvolvedor">
                <div class="foto-desenvolvedor">
                    <img src="assets/images/team/henrique-rafael.jpeg" alt="Foto de Henrique Rafael Costa de Lucena Filho" loading="lazy">
                </div>
                <div class="dados-desenvolvedor">
                    <span class="desenvolvedor-numero">02 / EQUIPE</span>
                    <h2>Henrique Rafael Costa de Lucena Filho</h2>
                    <p class="desenvolvedor-instituicao">Instituto Federal da Paraíba</p>
                    <a href="mailto:rafael.lucena@academico.ifpb.edu.br">
                        rafael.lucena@academico.ifpb.edu.br
                    </a>
                </div>
            </article>

            <article class="cartao-desenvolvedor">
                <div class="foto-desenvolvedor">
                    <img src="assets/images/team/kaike-medeiros.jpeg" alt="Foto de Kaike Cesar de Medeiros" loading="lazy">
                </div>
                <div class="dados-desenvolvedor">
                    <span class="desenvolvedor-numero">03 / EQUIPE</span>
                    <h2>Kaike Cesar de Medeiros</h2>
                    <p class="desenvolvedor-instituicao">Instituto Federal da Paraíba</p>
                    <a href="mailto:kaike.medeiros@academico.ifpb.edu.br">
                        kaike.medeiros@academico.ifpb.edu.br
                    </a>
                </div>
            </article>
        </section>

        <section class="equipe-introducao professores-introducao">
            <span class="equipe-etiqueta">Acompanhamento docente</span>
            <h2>PROFESSORES</h2>
            <p>Professores das disciplinas relacionadas ao desenvolvimento e ao conteúdo do projeto.</p>
        </section>

        <section class="equipe-grade professores-grade" aria-label="Professores do projeto">
            <article class="cartao-professor">
                <div class="foto-professor">
                    <img src="assets/images/team/felipe-ramos.png?v=2" alt="Felipe Ramos, professor de WEB II" loading="lazy">
                </div>
                <div class="dados-desenvolvedor">
                    <span class="desenvolvedor-numero">WEB II</span>
                    <h2>Felipe Ramos</h2>
                    <p class="desenvolvedor-instituicao">Professor da disciplina de WEB II</p>
                    <a href="mailto:felipe.ramos@ifpb.edu.br">felipe.ramos@ifpb.edu.br</a>
                </div>
            </article>

            <article class="cartao-professor">
                <div class="foto-professor">
                    <img src="assets/images/team/leonardo-lucio.png?v=2" alt="Leonardo Lucio, professor de Química" loading="lazy">
                </div>
                <div class="dados-desenvolvedor">
                    <span class="desenvolvedor-numero">QUÍMICA</span>
                    <h2>Leonardo Lucio</h2>
                    <p class="desenvolvedor-instituicao">Professor de Química</p>
                    <a href="mailto:leonardo.carvalho@ifpb.edu.br">leonardo.carvalho@ifpb.edu.br</a>
                </div>
            </article>
        </section>

        <div class="equipe-voltar">
            <a class="botao" href="index.php">Voltar ao início</a>
        </div>
    </main>

    <footer class="rodape">
        PLAYCHEMISTRY ENEM <strong>· SOBRE O PROJETO</strong>
    </footer>

    <script src="assets/js/tema.js"></script>
</body>
</html>
