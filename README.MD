# PlayCHEMISTRY ENEM

## Integrantes

* Pedro Amorim
* Kaike Medeiros
* Henrique Rafael

---

## Tema do Projeto

* **Funções Orgânicas no ENEM**

O PlayCHEMISTRY ENEM é um sistema web educacional desenvolvido para auxiliar estudantes na revisão dos principais conteúdos de Química Orgânica cobrados no Exame Nacional do Ensino Médio (ENEM).

O sistema apresenta um questionário interativo com questões sobre funções orgânicas, permitindo ao usuário avaliar seus conhecimentos, acompanhar o tempo de realização e visualizar seu desempenho ao final da atividade.

---

## Tecnologias Utilizadas

* HTML5
* CSS3
* JavaScript
* PHP

---

## Estrutura de pastas

A estrutura do projeto foi organizada para separar recursos estáticos e páginas:

* `assets/css/` — estilos compartilhados do projeto
* `assets/js/` — scripts JavaScript (`tema.js` e `cronometro.js`)
* `assets/images/` — imagens, ícones e fotos utilizadas nas páginas
* `*.php` — páginas do sistema e lógica de cada etapa do questionário

Essa organização facilita manutenção, evita arquivos soltos na raiz e corrige os caminhos dos recursos em todas as páginas.

---

## Funcionalidades

* Página inicial com apresentação do conteúdo;
* Questionário com 10 questões;
* Correção automática das respostas;
* Barra de progresso;
* Cronômetro de realização;
* Modo escuro (Dark Mode);
* Exibição da pontuação final;
* Classificação de desempenho;
* Revisão dos principais grupos funcionais.
* Diagnóstico de aprendizagem com formulário PHP e recomendação de estudo.
* Página de apresentação dos desenvolvedores com fotos e contatos.
* PeriodicLab: tabela periódica interativa com 118 elementos, filtros, pesquisa e painel de informações.

## Nova funcionalidade: diagnóstico de aprendizagem

A página `formulario.php` permite que o estudante informe nome, e-mail, idade,
série escolar, conteúdo com maior dificuldade e horas disponíveis para estudar.
Os dados são enviados por `POST` e validados no PHP com `empty()`, `preg_match()`
e `filter_var()`. Depois da validação, `processar_formulario.php` classifica a
rotina de estudos e apresenta uma recomendação relacionada às Funções Orgânicas.

Para utilizar a funcionalidade, abra a página inicial e clique em **Fazer
diagnóstico de estudos**. Preencha todos os campos e selecione **Gerar
diagnóstico**.

## Página dos desenvolvedores

A página `desenvolvedores.php` apresenta os integrantes do projeto, suas fotos
e e-mails para contato. Ela pode ser acessada pelo link no rodapé da página
inicial.

## Configuração da LeonardIA

A LeonardIA aceita OpenAI, Gemini ou OpenRouter. Configure a chave somente no
servidor, nunca no JavaScript, em arquivos públicos ou no Git.

No XAMPP, as variáveis podem ser configuradas no `httpd.conf` do Apache:

```apache
SetEnv LEONARDIA_API_KEY "sua-chave"
SetEnv LEONARDIA_API_PROVIDER "openrouter"
SetEnv LEONARDIA_MODEL "openrouter/free"
```

Em hospedagens que não oferecem variáveis de ambiente, como alternativa,
crie `leonardia-secrets.php` **um nível acima da pasta pública do site**
(`htdocs` ou `public_html`). O arquivo deve retornar um array PHP:

```php
<?php
return [
    'LEONARDIA_API_KEY' => 'sua-chave',
    'LEONARDIA_API_PROVIDER' => 'openrouter',
    'LEONARDIA_MODEL' => 'openrouter/free',
];
```

O arquivo privado deve ficar fora da pasta pública e não deve ser enviado ao
repositório. As variáveis de ambiente, quando definidas, têm prioridade sobre
esse arquivo. `LEONARDIA_FALLBACK_MODEL` é opcional. Depois de alterar as
variáveis no Apache local, reinicie o Apache.

Na hospedagem, a IA também depende de o plano permitir requisições HTTPS de
saída via cURL ao provedor escolhido. Faça um teste após publicar; não inclua
a chave em páginas de diagnóstico públicas.

---

## Instruções de Uso

1. Instale um servidor local compatível com PHP, como XAMPP, WAMP ou Laragon.
2. Coloque a pasta do projeto dentro do diretório do servidor.
3. Inicie o serviço Apache.
4. Acesse o navegador e abra o projeto.
5. Na página inicial, clique em **Iniciar Simulado**.
6. Responda às questões apresentadas.
7. Acompanhe o cronômetro durante a realização do questionário.
8. Ao finalizar, consulte sua pontuação, percentual de acertos e tempo total de realização.
9. Utilize o quadro de revisão para reforçar os conceitos estudados.

---

## Objetivo Educacional

O objetivo do PlayCHEMISTRY ENEM é auxiliar estudantes na identificação e compreensão das principais funções orgânicas por meio de uma abordagem interativa, contribuindo para a preparação para o ENEM e demais vestibulares.

---

## Conteúdos Abordados

* Hidrocarbonetos
* Álcoois
* Aldeídos
* Cetonas
* Ácidos Carboxílicos
* Ésteres
* Éteres
* Aminas
* Amidas

Esses conteúdos representam alguns dos grupos funcionais mais frequentes em avaliações de Química Orgânica no ensino médio e em exames vestibulares.
