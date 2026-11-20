<?php
// Mantém o endereço antigo e direciona os visitantes para a página Sobre atual.
header('Location: sobre.php', true, 301);
exit;
