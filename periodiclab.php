<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PERIODICLAB | PlayCHEMISTRY ENEM</title>
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body class="periodic-page">
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
                <a href="periodiclab.php" class="active">PeriodicLab</a>
                <a href="leonardia.php">LeonardIA</a>
                <a href="resultado.php">Meu Desempenho</a>
                <a href="sobre.php">Sobre</a>
            </nav>

        </div>
    </header>

    <main class="page-shell">
        <section class="container periodic-hero">
            <div class="periodic-intro">
                <span class="badge">PERIODICLAB</span>
                <h1>Explore os elementos da Química</h1>
                <p>
                    Descubra os 118 elementos químicos, conheça suas propriedades e explore as características
                    que formam a matéria e sustentam os fenômenos da Química.
                </p>
            </div>
        </section>

        <section class="container periodic-tools">
            <div class="tool-row">
                <label class="search-box" for="elementSearch">
                    <span>Buscar elemento</span>
                    <input id="elementSearch" type="search" placeholder="Nome, símbolo ou número atômico..." autocomplete="off" />
                </label>

                <label class="filter-box" for="categoryFilter">
                    <span>Filtrar por classe</span>
                    <select id="categoryFilter">
                        <option value="all">Todos</option>
                        <option value="alkali-metals">Metais alcalinos</option>
                        <option value="alkaline-earth">Metais alcalino-terrosos</option>
                        <option value="transition-metals">Metais de transição</option>
                        <option value="post-transition">Outros metais</option>
                        <option value="metalloids">Semimetais</option>
                        <option value="nonmetals">Não metais</option>
                        <option value="halogens">Halogênios</option>
                        <option value="noble-gases">Gases nobres</option>
                        <option value="lanthanides">Lantanídeos</option>
                        <option value="actinides">Actinídeos</option>
                    </select>
                </label>

                <button id="clearFilters" class="botao botao-secundario" type="button">Limpar filtros</button>
            </div>

            <div class="legend-row" id="periodicLegend" aria-label="Filtrar por família química"></div>
            <div class="table-status" id="resultsStatus">118 elementos visualizados</div>
            <p class="mass-note">Massas atômicas em u. Para elementos sem massa atômica padrão, os colchetes indicam o número de massa de um isótopo de vida longa conhecido.</p>
        </section>

        <section class="container periodic-layout">
            <div class="periodic-table-panel">
                <div class="periodic-table-scroll" tabindex="0" aria-label="Tabela periódica completa; deslize horizontalmente em telas pequenas">
                    <div class="periodic-group-labels" id="periodicGroups" aria-hidden="true"></div>
                    <div class="periodic-grid" id="periodicGrid" aria-live="polite"></div>
                </div>
            </div>
            <p class="table-footnote">Os grupos são numerados de 1 a 18. Lantanídeos e actinídeos aparecem em linhas separadas, marcadas 6* e 7*.</p>
        </section>

        <div class="element-drawer-backdrop" id="elementDrawerBackdrop" aria-hidden="true"></div>
        <aside class="element-drawer" id="elementInfo" role="dialog" aria-modal="true" aria-labelledby="elementInfoTitle" aria-hidden="true"></aside>

        <section class="container trend-box" aria-labelledby="trendTitle">
            <div class="section-heading">
                <span class="eyebrow">Propriedades periódicas</span>
                <h2 id="trendTitle">Entenda as tendências da tabela</h2>
                <p>Selecione uma propriedade para ver a tendência geral. Há exceções e valores experimentais variam conforme a fonte.</p>
            </div>
            <div class="trend-tabs" role="group" aria-label="Selecionar propriedade periódica">
                <button class="trend-tab is-active" type="button" data-trend="radius" aria-pressed="true">Raio atômico</button>
                <button class="trend-tab" type="button" data-trend="electronegativity" aria-pressed="false">Eletronegatividade</button>
                <button class="trend-tab" type="button" data-trend="ionization" aria-pressed="false">Energia de ionização</button>
                <button class="trend-tab" type="button" data-trend="affinity" aria-pressed="false">Afinidade eletrônica</button>
            </div>
            <div class="trend-explanation" id="trendExplanation" aria-live="polite"></div>
            <div class="trend-direction" id="trendDirection" aria-hidden="true"></div>
            <p class="periodic-sources">
                Referências para consulta:
                <a href="https://iupac.org/what-we-do/periodic-table-of-elements/" target="_blank" rel="noopener noreferrer">Tabela periódica da IUPAC</a>
                e
                <a href="https://physics.nist.gov/PhysRefData/ASD/" target="_blank" rel="noopener noreferrer">NIST Atomic Spectra Database</a>.
            </p>
        </section>

        <section class="container learning-box">
            <div class="section-heading">
                <span class="eyebrow">Aprendizado</span>
                <h2>Aprenda com a Tabela Periódica</h2>
            </div>

            <div class="learning-grid">
                <article class="info-card">
                    <h3>Organização da tabela</h3>
                    <p>Os elementos são dispostos em ordem crescente de número atômico, formando grupos e períodos.</p>
                </article>
                <article class="info-card">
                    <h3>Grupos e períodos</h3>
                    <p>Grupos indicam colunas com propriedades semelhantes; períodos representam camadas eletrônicas.</p>
                </article>
                <article class="info-card">
                    <h3>Famílias químicas</h3>
                    <p>Elementos da mesma família tendem a apresentar configurações de valência semelhantes. Os grupos 1, 2, 17 e 18 reúnem famílias importantes para o ENEM.</p>
                </article>
                <article class="info-card">
                    <h3>Distribuição eletrônica</h3>
                    <p>O número atômico identifica a quantidade de prótons e, no átomo neutro, também de elétrons. A configuração mostra como eles ocupam níveis e subníveis.</p>
                </article>
                <article class="info-card">
                    <h3>Propriedades periódicas</h3>
                    <p>Raio, eletronegatividade, energia de ionização e afinidade eletrônica apresentam tendências gerais, com exceções que dependem da configuração eletrônica.</p>
                </article>
            </div>
        </section>

        <section class="container challenge-box">
            <div class="section-heading">
                <span class="eyebrow">Desafios</span>
                <h2>Desafie seus conhecimentos</h2>
            </div>

            <div class="challenge-card">
                <div class="challenge-score" id="challengeScore" aria-live="polite">Pontuação: 0 acertos</div>
                <p id="challengePrompt" class="challenge-question"></p>
                <div id="challengeOptions" class="challenge-options"></div>
                <div id="challengeFeedback" class="challenge-feedback" aria-live="polite"></div>
                <div class="challenge-actions">
                    <button id="resetChallenge" class="botao botao-secundario" type="button">Reiniciar pontuação</button>
                    <button id="nextChallenge" class="botao" type="button">Novo desafio</button>
                </div>
            </div>
        </section>
    </main>

    <footer class="site-footer">
        <div class="container footer-grid">
            <div>
                <h3>PlayCHEMISTRY ENEM</h3>
                <p>Uma plataforma moderna para estudar Química com foco em ENEM, clareza e inovação educacional.</p>
            </div>
            <div>
                <h4>Navegação</h4>
                <ul>
                    <li><a href="index.php">Início</a></li>
                    <li><a href="central_conhecimento.php">Central</a></li>
                    <li><a href="leonardia.php">LeonardIA</a></li>
                </ul>
            </div>
            <div>
                <h4>Playbas Chemicals</h4>
                <ul>
                    <li>Pesquisa científica</li>
                    <li>Ensino de Química</li>
                    <li>Preparação para ENEM</li>
                </ul>
            </div>
        </div>
        <div class="footer-bottom">© 2026 PlayCHEMISTRY ENEM · Desenvolvido pela equipe Playbas</div>
    </footer>

    <script src="assets/js/periodiclab.js"></script>
    <script src="assets/js/tema.js"></script>
</body>
</html>
