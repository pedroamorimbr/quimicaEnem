// Controla navegação móvel, preferências visuais e recursos de acessibilidade.
document.addEventListener('DOMContentLoaded', () => {

    // Abre e fecha a navegação móvel, incluindo teclado e links do menu.
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (menuToggle && mainNav) {
        const headerInner = menuToggle.closest('.header-inner');

        const fecharMenu = () => {
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.setAttribute('aria-label', 'Abrir menu');
            menuToggle.textContent = '☰';
            mainNav.classList.remove('is-open');
            if (headerInner) headerInner.classList.remove('menu-open');
        };

        menuToggle.addEventListener('click', () => {
            const aberto = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', String(!aberto));
            menuToggle.setAttribute('aria-label', aberto ? 'Abrir menu' : 'Fechar menu');
            menuToggle.textContent = aberto ? '☰' : '×';
            mainNav.classList.toggle('is-open', !aberto);
            if (headerInner) headerInner.classList.toggle('menu-open', !aberto);
        });

        mainNav.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', fecharMenu);
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') fecharMenu();
        });
    }

    // Inclina elementos interativos enquanto o ponteiro está sobre eles.
    const interativos = document.querySelectorAll(
        '.top-bar, .painel, .quadro, .acao-topo, .botao, .nota, .grafico-resultado, .grafico-circular, .imagem-estudo'
    );

    interativos.forEach((elemento) => {
        elemento.addEventListener('pointermove', (event) => {
            const rect = elemento.getBoundingClientRect();
            const eixoX = (event.clientX - rect.left) / rect.width - 0.5;
            const eixoY = (event.clientY - rect.top) / rect.height - 0.5;

            const rotacaoX = (eixoY * -10).toFixed(2);
            const rotacaoY = (eixoX * 10).toFixed(2);

            elemento.style.transform = `perspective(1000px) rotateX(${rotacaoX}deg) rotateY(${rotacaoY}deg) translateY(-3px)`;
        });

        elemento.addEventListener('pointerleave', () => {
            elemento.style.transform = '';
        });
    });

    document.querySelectorAll('.alternativa').forEach((alternativa) => {
        const input = alternativa.querySelector('input[type="radio"]');
        if (!input) return;

        const atualizarEstado = () => {
            alternativa.classList.toggle('is-selected', input.checked);
        };

        input.addEventListener('change', atualizarEstado);
        input.addEventListener('focus', () => alternativa.classList.add('is-focused'));
        input.addEventListener('blur', () => alternativa.classList.remove('is-focused'));
        atualizarEstado();
    });

    // Cria o painel de acessibilidade em páginas que carregam este script.
    const accessibilityWidget = document.createElement('div');
    accessibilityWidget.className = 'accessibility-widget';
    accessibilityWidget.innerHTML = `
        <section class="accessibility-panel" id="accessibility-panel" aria-labelledby="accessibility-title" hidden>
            <div class="accessibility-panel-heading">
                <h2 id="accessibility-title">Personalize sua leitura</h2>
                <button class="accessibility-close" type="button" aria-label="Fechar painel de acessibilidade">×</button>
            </div>
            <div class="accessibility-font-controls" aria-label="Tamanho do texto">
                <button type="button" data-font-step="-10" aria-label="Diminuir tamanho do texto">A-</button>
                <span id="accessibility-font-label" aria-live="polite">Texto padrão</span>
                <button type="button" data-font-step="10" aria-label="Aumentar tamanho do texto">A+</button>
                <button type="button" id="accessibility-font-reset">Padrão</button>
            </div>
            <button class="accessibility-wide-button" type="button" id="accessibility-theme">Tema escuro</button>
            <button class="accessibility-wide-button accessibility-contrast" type="button" id="accessibility-contrast" aria-pressed="false">Ativar alto contraste</button>
            <hr>
            <h3>Leitura em voz alta</h3>
            <div class="accessibility-speech-controls">
                <button type="button" id="accessibility-read">▶ Ler conteúdo</button>
                <button type="button" id="accessibility-stop" disabled>■ Parar</button>
            </div>
            <p class="accessibility-note">A leitura usa a voz disponível no seu navegador.</p>
            <p class="accessibility-status" role="status" aria-live="polite"></p>
        </section>
        <button class="accessibility-trigger" type="button" aria-controls="accessibility-panel" aria-expanded="false">
            <span aria-hidden="true">◉</span> Acessibilidade
        </button>
    `;
    document.body.appendChild(accessibilityWidget);

    const accessibilityTrigger = accessibilityWidget.querySelector('.accessibility-trigger');
    const accessibilityPanel = accessibilityWidget.querySelector('.accessibility-panel');
    const accessibilityClose = accessibilityWidget.querySelector('.accessibility-close');
    const fontLabel = accessibilityWidget.querySelector('#accessibility-font-label');
    const themeToggle = accessibilityWidget.querySelector('#accessibility-theme');
    const contrastToggle = accessibilityWidget.querySelector('#accessibility-contrast');
    const readButton = accessibilityWidget.querySelector('#accessibility-read');
    const stopButton = accessibilityWidget.querySelector('#accessibility-stop');
    const speechStatus = accessibilityWidget.querySelector('.accessibility-status');

    const fecharPainelAcessibilidade = () => {
        accessibilityPanel.hidden = true;
        accessibilityTrigger.setAttribute('aria-expanded', 'false');
        accessibilityTrigger.focus();
    };

    const alternarPainelAcessibilidade = () => {
        const aberto = !accessibilityPanel.hidden;
        accessibilityPanel.hidden = aberto;
        accessibilityTrigger.setAttribute('aria-expanded', String(!aberto));
        if (aberto) accessibilityTrigger.focus();
    };

    accessibilityTrigger.addEventListener('click', alternarPainelAcessibilidade);
    accessibilityClose.addEventListener('click', fecharPainelAcessibilidade);

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !accessibilityPanel.hidden) {
            fecharPainelAcessibilidade();
            accessibilityTrigger.focus();
        }
    });

    // Preferências são guardadas localmente para persistirem entre visitas.
    let fontScale = Number.parseInt(localStorage.getItem('accessibilityFontScale'), 10);
    if (!Number.isFinite(fontScale)) fontScale = 100;
    fontScale = Math.min(150, Math.max(80, fontScale));

    const atualizarFonte = (novoTamanho) => {
        fontScale = Math.min(150, Math.max(80, novoTamanho));
        document.documentElement.style.fontSize = `${fontScale}%`;
        fontLabel.textContent = fontScale === 100 ? 'Texto padrão' : `Texto ${fontScale}%`;
        localStorage.setItem('accessibilityFontScale', String(fontScale));
    };

    atualizarFonte(fontScale);

    accessibilityWidget.querySelectorAll('[data-font-step]').forEach((button) => {
        button.addEventListener('click', () => {
            atualizarFonte(fontScale + Number(button.dataset.fontStep));
        });
    });

    accessibilityWidget.querySelector('#accessibility-font-reset').addEventListener('click', () => {
        atualizarFonte(100);
    });

    const atualizarTema = (escuro) => {
        document.body.classList.toggle('dark-mode', escuro);
        localStorage.setItem('tema', escuro ? 'dark' : 'light');
        themeToggle.textContent = escuro ? '☀ Tema claro' : '◐ Tema escuro';
    };

    atualizarTema(localStorage.getItem('tema') === 'dark');
    themeToggle.addEventListener('click', () => {
        atualizarTema(!document.body.classList.contains('dark-mode'));
    });

    const atualizarAltoContraste = (ativo) => {
        document.body.classList.toggle('high-contrast', ativo);
        contrastToggle.setAttribute('aria-pressed', String(ativo));
        contrastToggle.textContent = ativo ? 'Desativar alto contraste' : 'Ativar alto contraste';
        localStorage.setItem('altoContraste', String(ativo));
    };

    atualizarAltoContraste(localStorage.getItem('altoContraste') === 'true');
    contrastToggle.addEventListener('click', () => {
        atualizarAltoContraste(!document.body.classList.contains('high-contrast'));
    });

    // A leitura usa a API de voz do navegador e informa quando ela não existe.
    const falaDisponivel = 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
    let leituraAtual = null;

    const atualizarEstadoLeitura = (lendo) => {
        readButton.disabled = lendo || !falaDisponivel;
        stopButton.disabled = !lendo || !falaDisponivel;
    };

    if (!falaDisponivel) {
        speechStatus.textContent = 'Leitura em voz alta indisponível neste navegador.';
        atualizarEstadoLeitura(false);
    } else {
        readButton.addEventListener('click', () => {
            const conteudo = document.querySelector('main');
            const texto = conteudo ? conteudo.innerText.trim() : '';

            if (!texto) {
                speechStatus.textContent = 'Não há conteúdo disponível para leitura nesta página.';
                return;
            }

            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(texto);
            utterance.lang = 'pt-BR';
            utterance.onstart = () => atualizarEstadoLeitura(true);
            utterance.onend = () => {
                if (leituraAtual !== utterance) return;
                leituraAtual = null;
                atualizarEstadoLeitura(false);
                speechStatus.textContent = 'Leitura concluída.';
            };
            utterance.onerror = () => {
                if (leituraAtual !== utterance) return;
                leituraAtual = null;
                atualizarEstadoLeitura(false);
                speechStatus.textContent = 'Não foi possível iniciar a leitura em voz alta.';
            };

            leituraAtual = utterance;
            speechStatus.textContent = '';
            atualizarEstadoLeitura(true);
            window.speechSynthesis.speak(utterance);
        });

        stopButton.addEventListener('click', () => {
            window.speechSynthesis.cancel();
            leituraAtual = null;
            atualizarEstadoLeitura(false);
            speechStatus.textContent = 'Leitura interrompida.';
        });
    }

});