<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Explore modelos moleculares tridimensionais interativos e aprenda sobre sua geometria e ligações.">
    <title>Laboratório 3D | PlayCHEMISTRY ENEM</title>
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="stylesheet" href="assets/css/laboratorio-3d.css">
</head>
<body class="lab3d-page">
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
                <a href="laboratorio_3d.php" class="active">Laboratório 3D</a>
                <a href="periodiclab.php">PeriodicLab</a>
                <a href="leonardia.php">LeonardIA</a>
                <a href="resultado.php">Meu Desempenho</a>
                <a href="sobre.php">Sobre</a>
            </nav>
        </div>
    </header>

    <main class="page-shell">
        <section class="container simple-hero lab3d-hero">
            <div class="hero-copy">
                <span class="badge">Laboratório Molecular 3D</span>
                <h1>Explore moléculas em três dimensões.</h1>
                <p>Selecione uma estrutura, gire o modelo em qualquer direção e aproxime-se para observar átomos, ligações e geometria espacial.</p>
            </div>
        </section>

        <section class="container lab3d-workbench" aria-label="Explorador de estruturas químicas">
            <aside class="lab3d-library" aria-label="Catálogo de estruturas">
                <div class="lab3d-library-heading">
                    <span class="lab3d-eyebrow">CATÁLOGO MOLECULAR</span>
                    <h2>Estruturas</h2>
                </div>
                <label class="lab3d-field" for="model-search">
                    <span>Pesquisar estrutura</span>
                    <input id="model-search" type="search" placeholder="Ex.: água, álcool, isômero..." autocomplete="off">
                </label>
                <label class="lab3d-field" for="model-category">
                    <span>Classificação química</span>
                    <select id="model-category">
                        <option value="all">Todas as categorias</option>
                    </select>
                </label>
                <p class="lab3d-catalog-status" id="catalog-status" role="status" aria-live="polite"></p>
                <div class="lab3d-model-list" id="model-list" aria-label="Selecione uma estrutura"></div>
            </aside>

            <section class="lab3d-explorer" aria-label="Visualizador molecular">
                <header class="lab3d-model-heading">
                    <div>
                        <span class="lab3d-eyebrow" id="selected-category">ESTRUTURA MOLECULAR</span>
                        <h2 id="selected-name">Carregando modelo...</h2>
                        <p id="selected-formula" class="lab3d-formula"></p>
                    </div>
                    <span class="lab3d-render-badge"><i aria-hidden="true"></i> Modelo WebGL</span>
                </header>

                <div class="lab3d-stage" id="viewer-stage">
                    <canvas id="molecular-canvas" tabindex="0" aria-label="Modelo tridimensional interativo. Clique em um átomo para ver seus dados e conexões."></canvas>
                    <div class="lab3d-render-error" id="render-error" role="alert" hidden>
                        <strong>Não foi possível iniciar a renderização 3D.</strong>
                        <span id="render-error-message">Verifique se o navegador oferece suporte a WebGL.</span>
                    </div>
                    <div class="lab3d-stage-caption">
                        <span id="atom-count">—</span>
                        <span>arraste para orbitar · roda do mouse ou botões para zoom</span>
                    </div>
                </div>

                <div class="lab3d-controls" aria-label="Controles da visualização">
                    <div class="lab3d-zoom-controls">
                        <button class="lab3d-control" id="zoom-out" type="button" aria-label="Diminuir zoom">−</button>
                        <button class="lab3d-control" id="zoom-in" type="button" aria-label="Aumentar zoom">+</button>
                    </div>
                    <div class="lab3d-camera-controls">
                        <button class="lab3d-control lab3d-control-label" id="rotation-toggle" type="button" aria-pressed="true">Pausar rotação</button>
                        <button class="lab3d-control lab3d-control-label" id="camera-reset" type="button">Restaurar vista</button>
                    </div>
                </div>
                <div class="lab3d-view-options">
                    <label class="lab3d-field" for="render-style">
                        <span>Representação</span>
                        <select id="render-style">
                            <option value="ball-stick">Bolas e bastões</option>
                            <option value="stick">Bastões</option>
                            <option value="sphere">Esferas</option>
                        </select>
                    </label>
                    <label class="lab3d-field" for="atom-selector">
                        <span>Selecionar átomo</span>
                        <select id="atom-selector">
                            <option value="">Escolha um átomo ou toque nele no modelo</option>
                        </select>
                    </label>
                </div>

                <div class="lab3d-legend" aria-label="Legenda de elementos">
                    <span><i class="element-dot element-carbon" aria-hidden="true"></i> Carbono (C)</span>
                    <span><i class="element-dot element-hydrogen" aria-hidden="true"></i> Hidrogênio (H)</span>
                    <span><i class="element-dot element-oxygen" aria-hidden="true"></i> Oxigênio (O)</span>
                    <span><i class="element-dot element-nitrogen" aria-hidden="true"></i> Nitrogênio (N)</span>
                    <span><i class="element-dot element-fluorine" aria-hidden="true"></i> Flúor (F)</span>
                    <span><i class="element-dot element-chlorine" aria-hidden="true"></i> Cloro (Cl)</span>
                    <span><i class="element-dot element-sulfur" aria-hidden="true"></i> Enxofre (S)</span>
                    <span><i class="element-dot element-sodium" aria-hidden="true"></i> Sódio (Na)</span>
                    <span><i class="element-dot element-calcium" aria-hidden="true"></i> Cálcio (Ca)</span>
                    <span><i class="element-dot element-iron" aria-hidden="true"></i> Ferro (Fe)</span>
                    <span><i class="element-dot element-proton" aria-hidden="true"></i> Próton (p⁺)</span>
                    <span><i class="element-dot element-neutron" aria-hidden="true"></i> Nêutron (n⁰)</span>
                    <span><i class="element-dot element-electron" aria-hidden="true"></i> Elétron (e⁻)</span>
                </div>

                <dl class="lab3d-details">
                    <div><dt>Fórmula estrutural</dt><dd id="detail-structure">—</dd></div>
                    <div><dt>Massa molar</dt><dd id="detail-molar-mass">—</dd></div>
                    <div><dt>Classificação química</dt><dd id="detail-classification">—</dd></div>
                    <div><dt>Elementos presentes</dt><dd id="detail-elements">—</dd></div>
                    <div><dt>Quantidade de átomos</dt><dd id="detail-atom-total">—</dd></div>
                    <div><dt>Quantidade de ligações</dt><dd id="detail-bond-total">—</dd></div>
                    <div><dt>Tipos de ligações</dt><dd id="detail-bonds">—</dd></div>
                    <div><dt>Geometria</dt><dd id="detail-geometry">—</dd></div>
                    <div><dt>Polaridade</dt><dd id="detail-polarity">—</dd></div>
                    <div><dt>Características</dt><dd id="detail-properties">—</dd></div>
                    <div><dt>Aplicações</dt><dd id="detail-applications">—</dd></div>
                </dl>

                <section class="lab3d-chemistry-panels" aria-label="Análise da estrutura">
                    <div class="lab3d-atom-panel" aria-live="polite">
                        <h3>Átomo selecionado</h3>
                        <p id="selected-atom-title">Clique em um átomo no modelo ou selecione-o na lista.</p>
                        <ul id="selected-atom-connections"></ul>
                    </div>
                    <div class="lab3d-bond-panel">
                        <h3>Ligações químicas</h3>
                        <div class="lab3d-bond-table-wrap">
                            <table class="lab3d-bond-table">
                                <thead>
                                    <tr><th>Átomo 1</th><th>Átomo 2</th><th>Ligação</th></tr>
                                </thead>
                                <tbody id="bond-table-body"></tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </section>
        </section>

        <section class="container learning-cta">
            <div class="cta-panel lab-cta-panel">
                <div class="lab-cta-copy">
                    <span class="lab-cta-eyebrow">TEORIA + VISUALIZAÇÃO</span>
                    <h2>Conecte a estrutura ao conceito</h2>
                    <p>Use a Central do Conhecimento para estudar a teoria e volte ao laboratório para explorar a organização espacial das moléculas.</p>
                </div>
                <div class="cta-row lab-cta-actions">
                    <a class="botao lab-content-button" href="central_conhecimento.php">
                        <span class="lab-cta-icon" aria-hidden="true">⌕</span>
                        <span><strong>Ver conteúdos</strong><small>Estudar a teoria de Química</small></span>
                        <span class="lab-cta-arrow" aria-hidden="true">→</span>
                    </a>
                    <a class="botao lab-home-button" href="index.php">
                        <span class="lab-cta-icon" aria-hidden="true">⌂</span>
                        <span><strong>Voltar ao início</strong><small>Acesse todas as ferramentas</small></span>
                        <span class="lab-cta-arrow" aria-hidden="true">→</span>
                    </a>
                </div>
            </div>
        </section>
    </main>

    <footer class="site-footer">
        <div class="container footer-grid">
            <div>
                <h3>PlayCHEMISTRY ENEM</h3>
                <p>Exploração visual e prática de Química para estudantes do ensino médio e ENEM.</p>
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
                    <li>Ciência</li>
                    <li>Inovação</li>
                    <li>Educação</li>
                </ul>
            </div>
        </div>
        <div class="footer-bottom">© 2026 PlayCHEMISTRY ENEM · Desenvolvido pela equipe Playbas</div>
    </footer>

    <script src="assets/js/tema.js"></script>
    <script src="assets/js/laboratorio3d.js"></script>
</body>
</html>
