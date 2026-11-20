<?php
require_once __DIR__ . '/includes/bootstrap.php';
app_start_session();

// O logout aceita somente POST com token CSRF válido.
if ($_SERVER['REQUEST_METHOD'] !== 'POST' || !app_verify_csrf()) {
    http_response_code(400);
    exit('Solicitação inválida.');
}

// Remove os dados do servidor e expira o cookie no navegador.
$_SESSION = [];
session_destroy();

setcookie(session_name(), '', [
    'expires' => time() - 3600,
    'path' => '/',
    'secure' => (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off')
        || ($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '') === 'https',
    'httponly' => true,
    'samesite' => 'Lax',
]);

header('Location: index.php');
exit;
