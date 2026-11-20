<?php

$projectRoot = realpath(dirname(__DIR__)) ?: dirname(__DIR__);
$requestPath = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/';
$requestPath = urldecode($requestPath);
$requestPath = ltrim($requestPath, '/');

if ($requestPath === '' || str_ends_with($requestPath, '/')) {
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

if (!$withinProject) {
    http_response_code(404);
    echo 'Página não encontrada.';
    exit;
}

chdir(dirname($candidate));
$_SERVER['SCRIPT_NAME'] = '/' . str_replace(DIRECTORY_SEPARATOR, '/', $requestedFile);
require $candidate;
