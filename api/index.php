<?php

// Despacha as rotas da Vercel para os arquivos PHP existentes no diretório do projeto.
$projectRoot = realpath(dirname(__DIR__)) ?: dirname(__DIR__);
$requestPath = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/';
$requestPath = urldecode($requestPath);
$requestPath = ltrim($requestPath, '/');

if ($requestPath === '') {
    // A entrada do domínio começa pelo diagnóstico; links internos para index.php não mudam.
    header('Location: /formulario.php', true, 302);
    exit;
}

if (str_ends_with($requestPath, '/')) {
    $requestedFile = 'index.php';
} else {
    $requestedFile = pathinfo($requestPath, PATHINFO_EXTENSION) === ''
        ? $requestPath . '.php'
        : $requestPath;
}

$candidate = realpath($projectRoot . DIRECTORY_SEPARATOR . str_replace('/', DIRECTORY_SEPARATOR, $requestedFile));
$withinProject = $candidate !== false
    && strpos($candidate, $projectRoot . DIRECTORY_SEPARATOR) === 0
    && is_file($candidate)
    && strtolower(pathinfo($candidate, PATHINFO_EXTENSION)) === 'php';

// Não permite executar caminhos inexistentes ou arquivos fora da raiz do projeto.
if (!$withinProject) {
    http_response_code(404);
    echo 'Página não encontrada.';
    exit;
}

chdir(dirname($candidate));
$_SERVER['SCRIPT_NAME'] = '/' . str_replace(DIRECTORY_SEPARATOR, '/', $requestedFile);
require $candidate;
