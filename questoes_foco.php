<?php
require_once __DIR__ . '/includes/bootstrap.php';
app_start_session();

if (app_database_configured() && empty($_SESSION['user_id'])) {
    header('Location: login.php?next=questoes_foco.php');
    exit;
}

// Inicia a sessão para recuperar o conteúdo escolhido no diagnóstico
// e salvar o resultado da trilha personalizada.
// Impede que o questionário seja aberto sem passar pelo formulário.
if (!isset($_SESSION["foco"])) {
    header("Location: formulario.php");
    exit;
}

$foco = $_SESSION["foco"];

// Banco de questões separado por conteúdo. Cada questão possui enunciado,
// alternativas, índice da resposta correta e imagem de apoio.
$questoesPorFoco = [
    "Hidrocarbonetos" => [
        [
            "pergunta" => "Quais elementos aparecem exclusivamente nos hidrocarbonetos?",
            "opcoes" => ["Carbono e oxigênio", "Carbono e hidrogênio", "Hidrogênio e nitrogênio", "Oxigênio e nitrogênio"],
            "correta" => 1,
            "imagem" => "hidrocarboneto.svg",
            "alt" => "Estrutura de um hidrocarboneto"
        ],
        [
            "pergunta" => "Qual característica identifica um hidrocarboneto?",
            "opcoes" => ["Possui apenas ligações entre carbono e hidrogênio", "Possui sempre o grupo -OH", "Possui o grupo -COOH", "Possui nitrogênio na cadeia"],
            "correta" => 0,
            "imagem" => "hidrocarboneto.svg",
            "alt" => "Estrutura de um hidrocarboneto"
        ]
    ],
    "Funções oxigenadas" => [
        [
            "pergunta" => "Qual grupo funcional caracteriza os álcoois?",
            "opcoes" => ["-OH ligado a um carbono saturado", "-COOH", "-NH2", "-CHO"],
            "correta" => 0,
            "imagem" => "alcool.svg",
            "alt" => "Grupo funcional do álcool"
        ],
        [
            "pergunta" => "A estrutura R-COO-R representa principalmente qual função?",
            "opcoes" => ["Amina", "Éster", "Amida", "Hidrocarboneto"],
            "correta" => 1,
            "imagem" => "ester.svg",
            "alt" => "Grupo funcional do éster"
        ],
        [
            "pergunta" => "Qual função possui a carbonila entre duas cadeias carbônicas?",
            "opcoes" => ["Cetona", "Álcool", "Ácido carboxílico", "Éter"],
            "correta" => 0,
            "imagem" => "cetona.svg",
            "alt" => "Grupo funcional da cetona"
        ]
    ],
    "Funções nitrogenadas" => [
        [
            "pergunta" => "Qual função orgânica possui nitrogênio ligado a cadeias carbônicas?",
            "opcoes" => ["Amina", "Cetona", "Éter", "Éster"],
            "correta" => 0,
            "imagem" => "amina.svg",
            "alt" => "Grupo funcional da amina"
        ],
        [
            "pergunta" => "A estrutura simplificada R-CONH2 representa qual função?",
            "opcoes" => ["Amida", "Aldeído", "Amina", "Ácido carboxílico"],
            "correta" => 0,
            "imagem" => "amida.svg",
            "alt" => "Grupo funcional da amida"
        ]
    ]
];

if ($foco === "Ainda não sei") {
    // Oferece uma trilha inicial quando o usuário ainda não identificou
    // qual conteúdo apresenta maior dificuldade.
    $foco = "Funções oxigenadas";
}

// Seleciona somente as perguntas do conteúdo escolhido.
$questoes = $questoesPorFoco[$foco];
$erros = [];
$pontuacao = null;

// Processa as respostas enviadas pelo formulário.
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Verifica se o usuário respondeu todas as questões e se os índices
    // recebidos correspondem a alternativas existentes.
    foreach ($questoes as $indice => $questao) {
        $resposta = filter_input(INPUT_POST, "resposta_" . $indice, FILTER_VALIDATE_INT);
        if ($resposta === false || $resposta === null || !array_key_exists($resposta, $questao["opcoes"])) {
            $erros[] = "Responda à questão " . ($indice + 1) . ".";
        }
    }

    if (empty($erros)) {
        // Soma um ponto para cada resposta igual ao gabarito da questão.
        $pontuacao = 0;
        foreach ($questoes as $indice => $questao) {
            $resposta = (int) $_POST["resposta_" . $indice];
            if ($resposta === $questao["correta"]) {
                $pontuacao++;
            }
        }

    // Guarda o desempenho na sessão para a página de resultado.
        $_SESSION["resultado_foco"] = [
            "foco" => $foco,
            "pontuacao" => $pontuacao,
            "total" => count($questoes)
        ];
        header("Location: resultado_foco.php");
        exit;
    }
}
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Exercícios de <?php echo htmlspecialchars($foco, ENT_QUOTES, "UTF-8"); ?></title>
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
    <!-- Cabeçalho com o nome da trilha e controles do tema e cronômetro. -->
    <header class="topo">
        <h1>PlayCHEMISTRY ENEM</h1>
        <p>Trilha focada: <?php echo htmlspecialchars($foco, ENT_QUOTES, "UTF-8"); ?></p>

        <div class="top-bar">
            <div id="cronometro">00:00</div>
            <button id="btnIniciar" type="button">▶ Iniciar cronômetro</button>
        </div>
    </header>

    <main class="pagina">
        <section class="painel foco-painel">
            <!-- Identificação visual da trilha escolhida no diagnóstico. -->
            <span class="marca">Trilha personalizada</span>
            <h2>Pratique somente <?php echo htmlspecialchars($foco, ENT_QUOTES, "UTF-8"); ?></h2>
            <p class="foco-introducao">Estas questões foram separadas a partir da dificuldade informada no diagnóstico.</p>

            <?php if (!empty($erros)) { ?>
                <!-- Mensagem exibida quando alguma questão ficou sem resposta. -->
                <div class="feedback incorreto">Escolha uma alternativa em cada questão antes de enviar.</div>
            <?php } ?>

            <!-- Formulário que reúne todas as questões do conteúdo selecionado. -->
            <form method="POST" action="questoes_foco.php" class="questoes-foco-form">
                <?php foreach ($questoes as $indice => $questao) { ?>
                                    <?php
                                        $imagemQuestao = $questao["imagem"];
                                        if (strpos($imagemQuestao, "assets/") !== 0) {
                                            $imagemQuestao = "assets/images/chemistry/" . $imagemQuestao;
                                        }
                                    ?>
                                    <!-- Cada fieldset representa uma questão independente. -->
                                    <fieldset class="questao-foco">
                                        <legend><?php echo ($indice + 1); ?> / <?php echo count($questoes); ?></legend>
                                        <!-- Imagem didática associada ao grupo funcional da questão. -->
                                        <div class="imagem-estudo imagem-questao-foco">
                                            <img src="<?php echo htmlspecialchars($imagemQuestao, ENT_QUOTES, "UTF-8"); ?>" alt="<?php echo htmlspecialchars($questao["alt"], ENT_QUOTES, "UTF-8"); ?>">
                                        </div>
                        <h3><?php echo htmlspecialchars($questao["pergunta"], ENT_QUOTES, "UTF-8"); ?></h3>
                        <div class="alternativas">
                            <!-- As alternativas são geradas automaticamente pelo array da questão. -->
                            <?php foreach ($questao["opcoes"] as $opcaoIndice => $opcao) { ?>
                                <label class="alternativa">
                                    <input type="radio" name="resposta_<?php echo $indice; ?>" value="<?php echo $opcaoIndice; ?>">
                                    <?php echo htmlspecialchars($opcao, ENT_QUOTES, "UTF-8"); ?>
                                </label>
                            <?php } ?>
                        </div>
                    </fieldset>
                <?php } ?>

                <!-- Ações finais da trilha. -->
                <div class="acoes">
                    <button class="botao" type="submit">Corrigir trilha</button>
                    <a class="botao secundario" href="formulario.php">Trocar conteúdo</a>
                </div>
            </form>
        </section>
    </main>

    <script src="assets/js/cronometro.js"></script>
    <script src="assets/js/tema.js"></script>
</body>
</html>
