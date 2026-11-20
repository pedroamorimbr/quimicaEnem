// Mantém o tempo do simulado no navegador para continuar a contagem entre páginas.
document.addEventListener('DOMContentLoaded', () => {

    const cronometro = document.getElementById('cronometro');
    const btnIniciar = document.getElementById('btnIniciar');

    let segundos =
        parseInt(localStorage.getItem('tempoSimulado')) || 0;

    let iniciado =
        localStorage.getItem('simuladoIniciado') === 'true';

    let intervalo = null;

    // Atualiza o cronômetro na tela
    function atualizarCronometro() {

        segundos++;

        localStorage.setItem(
            'tempoSimulado',
            segundos
        );

        const minutos = String(
            Math.floor(segundos / 60)
        ).padStart(2, '0');

        const seg = String(
            segundos % 60
        ).padStart(2, '0');

        if (cronometro) {
            cronometro.textContent =
                `${minutos}:${seg}`;
        }
    }

    // Mostra o tempo salvo ao abrir a página
    function exibirTempoAtual() {

        const minutos = String(
            Math.floor(segundos / 60)
        ).padStart(2, '0');

        const seg = String(
            segundos % 60
        ).padStart(2, '0');

        if (cronometro) {
            cronometro.textContent =
                `${minutos}:${seg}`;
        }
    }

    exibirTempoAtual();

    // Continua a contagem nas próximas páginas
    if (iniciado) {

        intervalo = setInterval(
            atualizarCronometro,
            1000
        );

        if (btnIniciar) {
            btnIniciar.textContent =
                '⏳ Simulado em andamento';

            btnIniciar.disabled = true;
        }
    }

    // Inicia o simulado
    if (btnIniciar) {

        btnIniciar.addEventListener('click', () => {

            if (iniciado) return;

            // Zera qualquer tentativa anterior
            localStorage.removeItem('tempoSimulado');

            segundos = 0;

            localStorage.setItem(
                'simuladoIniciado',
                'true'
            );

            localStorage.setItem(
                'tempoSimulado',
                '0'
            );

            iniciado = true;

            exibirTempoAtual();

            intervalo = setInterval(
                atualizarCronometro,
                1000
            );

            btnIniciar.textContent =
                '⏳ Simulado em andamento';

            btnIniciar.disabled = true;
        });

    }

});