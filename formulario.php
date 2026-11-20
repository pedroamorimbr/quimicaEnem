<?php
require_once __DIR__ . '/includes/bootstrap.php';
app_start_session();

$usuario = app_database_configured() ? app_current_user() : null;
if (app_database_configured() && !$usuario) {
    header('Location: login.php?next=formulario.php');
    exit;
}

// Página do formulário de diagnóstico sobre Funções Orgânicas.
$dados = [
    "nome" => $usuario['name'],
    "email" => $usuario['email'],
    "idade" => "",
    "serie" => "",
    "dificuldade" => "",
    "horas" => ""
];
$erros = [];

$modoRefazer = isset($_GET["refazer"]) && $_GET["refazer"] === "1" && isset($_SESSION["diagnostico"]);
if ($modoRefazer) {
    $diagnosticoSalvo = $_SESSION["diagnostico"];
    $dados = [
        "nome" => html_entity_decode($diagnosticoSalvo["nome"], ENT_QUOTES, "UTF-8"),
        "email" => html_entity_decode($diagnosticoSalvo["email"], ENT_QUOTES, "UTF-8"),
        "idade" => (string) $diagnosticoSalvo["idade"],
        "serie" => html_entity_decode($diagnosticoSalvo["serie"], ENT_QUOTES, "UTF-8"),
        "dificuldade" => html_entity_decode($diagnosticoSalvo["dificuldade"], ENT_QUOTES, "UTF-8"),
        "horas" => (string) $diagnosticoSalvo["horas"]
    ];
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    foreach ($dados as $campo => $valor) {
        $dados[$campo] = trim($_POST[$campo] ?? "");
    }

    // empty() identifica campos obrigatórios que não foram preenchidos.
    foreach ($dados as $campo => $valor) {
        if (empty($valor)) {
            $erros[$campo] = "Preencha este campo.";
        }
    }

    // preg_match() permite somente letras, espaços e caracteres acentuados no nome.
    if (!empty($dados["nome"]) && !preg_match("/^[\\p{L} ]{3,80}$/u", $dados["nome"])) {
        $erros["nome"] = "Digite um nome válido, usando apenas letras e espaços.";
    }

    // filter_var() valida o e-mail e os valores numéricos recebidos pelo formulário.
    $emailValido = filter_var($dados["email"], FILTER_VALIDATE_EMAIL);
    if (!empty($dados["email"]) && $emailValido === false) {
        $erros["email"] = "Digite um e-mail válido.";
    }

    // A validação do e-mail acontece diretamente dentro do filter_var.
    $idade = filter_var($dados["idade"], FILTER_VALIDATE_INT, [
        "options" => ["min_range" => 10, "max_range" => 100]
    ]);
    if (!empty($dados["idade"]) && ($idade === false || $idade < 10 || $idade > 100)) {
        $erros["idade"] = "Informe uma idade entre 10 e 100 anos.";
    }

    $horas = filter_var($dados["horas"], FILTER_VALIDATE_FLOAT);
    if (!empty($dados["horas"]) && ($horas === false || $horas < 1 || $horas > 40)) {
        $erros["horas"] = "Informe entre 1 e 40 horas semanais.";
    }

    $seriesValidas = ["1º ano", "2º ano", "3º ano", "Outro"];
    if (!empty($dados["serie"]) && !in_array($dados["serie"], $seriesValidas, true)) {
        $erros["serie"] = "Selecione uma série válida.";
    }

    $dificuldadesValidas = [
        "Estudar para o ENEM",
        "Preparar para prova escolar",
        "Ainda não sei",
        "Questionário completo"
    ];
    if (!empty($dados["dificuldade"]) && !in_array($dados["dificuldade"], $dificuldadesValidas, true)) {
        $erros["dificuldade"] = "Selecione uma dificuldade válida.";
    }

    if (empty($erros) && app_database_configured()) {
        try {
            $profileUpdate = app_db()->prepare(
                'INSERT INTO student_profiles (user_id, age, grade, study_goal, weekly_study_hours)
                 VALUES (:user_id, :age, :grade, :study_goal, :hours)
                 ON DUPLICATE KEY UPDATE age = VALUES(age), grade = VALUES(grade),
                     study_goal = VALUES(study_goal), weekly_study_hours = VALUES(weekly_study_hours)'
            );
            $profileUpdate->execute([
                'user_id' => (int) $_SESSION['user_id'],
                'age' => (int) $idade,
                'grade' => $dados['serie'],
                'study_goal' => $dados['dificuldade'],
                'hours' => (float) $horas,
            ]);
        } catch (PDOException $exception) {
            error_log('Falha ao salvar perfil de estudante: ' . $exception->getMessage());
            http_response_code(503);
            $erros['_global'] = 'Não foi possível salvar seu diagnóstico. Tente novamente mais tarde.';
        } catch (RuntimeException $exception) {
            http_response_code(503);
            $erros['_global'] = $exception->getMessage();
        }
    }

    if (empty($erros)) {
        $_SESSION["diagnostico"] = [
            "nome" => htmlspecialchars($dados["nome"], ENT_QUOTES, "UTF-8"),
            "email" => htmlspecialchars($dados["email"], ENT_QUOTES, "UTF-8"),
            "idade" => (int) $idade,
            "serie" => htmlspecialchars($dados["serie"], ENT_QUOTES, "UTF-8"),
            "dificuldade" => htmlspecialchars($dados["dificuldade"], ENT_QUOTES, "UTF-8"),
            "horas" => (float) $horas
        ];
        $_SESSION["foco"] = $dados["dificuldade"] === "Ainda não sei"
            ? "Funções oxigenadas"
            : "Questionário completo";
        header("Location: index.php");
        exit;
    }
}

function valor(string $campo, array $dados): string
{
    return htmlspecialchars($dados[$campo] ?? "", ENT_QUOTES, "UTF-8");
}

function erro(string $campo, array $erros): string
{
    return isset($erros[$campo]) ? '<small class="erro-campo">' . htmlspecialchars($erros[$campo], ENT_QUOTES, "UTF-8") . '</small>' : "";
}
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Diagnóstico - PlayCHEMISTRY ENEM</title>
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
    <header class="topo">
        <h1>PlayCHEMISTRY ENEM</h1>
        <p>Diagnóstico de aprendizagem em Funções Orgânicas</p>
    </header>

    <main class="pagina">
        <section class="painel formulario-painel">
            <span class="marca">Nova funcionalidade</span>
            <h2>Descubra o que revisar</h2>
            <p>Preencha os dados abaixo para receber uma recomendação de estudo personalizada.</p>

            <?php if (!empty($erros)) { ?>
                <div class="feedback incorreto" role="alert">
                    <?php echo isset($erros['_global']) ? app_escape($erros['_global']) : 'Corrija os campos indicados antes de continuar.'; ?>
                </div>
            <?php } ?>

            <form method="POST" action="formulario.php" class="formulario">
                <div class="campo">
                    <label for="nome">Nome completo</label>
                    <input type="text" id="nome" name="nome" value="<?php echo valor("nome", $dados); ?>">
                    <?php echo erro("nome", $erros); ?>
                </div>

                <div class="campo">
                    <label for="email">E-mail</label>
                    <input type="text" id="email" name="email" value="<?php echo valor("email", $dados); ?>">
                    <?php echo erro("email", $erros); ?>
                </div>

                <div class="campo-duplo">
                    <div class="campo">
                        <label for="idade">Idade</label>
                        <input type="text" id="idade" name="idade" value="<?php echo valor("idade", $dados); ?>">
                        <?php echo erro("idade", $erros); ?>
                    </div>

                    <div class="campo">
                        <label for="serie">Série escolar</label>
                        <select id="serie" name="serie">
                            <option value="">Selecione</option>
                            <?php foreach (["1º ano", "2º ano", "3º ano", "Outro"] as $opcao) { ?>
                                <option value="<?php echo $opcao; ?>" <?php echo $dados["serie"] === $opcao ? "selected" : ""; ?>><?php echo $opcao; ?></option>
                            <?php } ?>
                        </select>
                        <?php echo erro("serie", $erros); ?>
                    </div>
                </div>

                <div class="campo">
                    <label for="dificuldade">Qual é seu objetivo de estudo?</label>
                    <select id="dificuldade" name="dificuldade">
                        <option value="">Selecione seu objetivo</option>
                        <?php foreach ([
                            "Estudar para o ENEM",
                            "Preparar para prova escolar",
                            "Ainda não sei",
                            "Questionário completo"
                        ] as $opcao) { ?>
                            <option value="<?php echo $opcao; ?>" <?php echo $dados["dificuldade"] === $opcao ? "selected" : ""; ?>><?php echo $opcao; ?></option>
                        <?php } ?>
                    </select>
                    <?php echo erro("dificuldade", $erros); ?>
                </div>

                <div class="campo">
                    <label for="horas">Horas disponíveis para estudar por semana</label>
                    <input type="text" id="horas" name="horas" value="<?php echo valor("horas", $dados); ?>">
                    <?php echo erro("horas", $erros); ?>
                </div>

                <div class="acoes">
                    <button class="botao" type="submit">Gerar diagnóstico</button>
                        <a class="botao secundario" href="index.php">Voltar ao início</a>
                </div>
            </form>
        </section>
    </main>

    <script src="assets/js/tema.js"></script>
</body>
</html>
