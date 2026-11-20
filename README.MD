# PlayCHEMISTRY ENEM

<div align="center">

<img src="assets/images/logo/Logo%20neon%20de%20qu%C3%ADmica%20PLAY%20CHEMISTRY%20(1).png" alt="Logo do PlayCHEMISTRY ENEM" width="220">

### Aprenda, pratique e evolua em Química para o ENEM

[![PHP](https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white)](https://www.php.net/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=222222)](https://developer.mozilla.org/docs/Web/JavaScript)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/docs/Web/CSS)
[![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

</div>

---

## Sobre o projeto

O **PlayCHEMISTRY ENEM** é uma plataforma educacional desenvolvida para apoiar estudantes na preparação para o Exame Nacional do Ensino Médio.

O sistema combina teoria organizada, exercícios interativos, diagnóstico de aprendizagem, acompanhamento de desempenho e uma assistente virtual especializada em Química.

---

## Recursos da plataforma

| Recurso | Descricao |
| :--- | :--- |
| 📚 Central de Conhecimento | Apostila digital com módulos, aulas e revisões |
| 🧪 Laboratório 3D | Explora estruturas e representações tridimensionais |
| 🧬 PeriodicLab | Pesquisa e consulta dos 118 elementos da tabela periódica |
| 🤖 LeonardIA | Assistente de Inteligência Artificial para dúvidas de Química |
| ⏱️ Simulado ENEM | Questões com cronômetro, correção e revisão imediata |
| 📊 Meu Desempenho | Indicadores de acertos, pontuação e progresso |
| 👤 Conta do estudante | Login, diagnóstico salvo e histórico de simulados |
| 🌙 Tema escuro | Interface adaptada para leitura em ambientes com pouca luz |
| 🎯 Trilha personalizada | Conteúdos recomendados de acordo com a dificuldade identificada |

---

## LeonardIA

A LeonardIA conversa em português do Brasil e foi configurada para atuar exclusivamente como tutora de Química.

Ela pode explicar conceitos, orientar cálculos, apresentar etapas e ajudar no estudo dos principais conteúdos cobrados no ENEM.

<div align="center">

<img src="assets/images/leonardia-avatar.jpg" alt="Avatar da LeonardIA" width="160">

</div>

---

## Tecnologias

```text
HTML5       Estrutura das páginas
CSS3        Interface responsiva e tema visual
JavaScript  Interações e interface dinâmica
PHP         Regras de página e validação
```

---

## Estrutura do projeto

```text
quimicaEnem/
├── assets/
│   ├── css/              Estilos e responsividade
│   ├── images/           Logos, avatares e ilustrações
│   └── js/               Interações e dados de interface
├── cadastro.php          Cadastro de estudantes
├── login.php             Autenticação de estudantes
├── index.php             Página inicial
├── central_conhecimento.php
├── formulario.php        Diagnóstico do estudante
├── laboratorio_3d.php
├── leonardia.php         Chat e integração da IA
├── periodiclab.php       Tabela periodica interativa
├── questao1.php
├── ...
├── questao10.php
├── resultado.php
├── database/
│   └── schema.sql         Estrutura do banco MySQL
├── includes/
│   └── bootstrap.php      Conexão PDO e sessão persistente
├── vercel.json           Configuração de deploy
└── README.MD
```

---

## Executando localmente

### Requisitos

- XAMPP, Laragon ou outro servidor com PHP
- Navegador moderno

### Passo a passo

1. Instale e inicie o Apache.
2. Coloque o projeto em `C:\xampp\htdocs\`.
3. Abra o projeto no navegador:

```text
http://localhost/Amorim/index.php
```

4. Complete o diagnóstico inicial.
5. Explore os módulos, o PeriodicLab, o Laboratório 3D e a LeonardIA.

---

## Publicação na Vercel

O projeto inclui [vercel.json](vercel.json) para servir as páginas PHP e os recursos estáticos.

1. Importe `pedroamorimbr/quimicaEnem` na Vercel.
2. Use a raiz do repositorio como diretorio do projeto.
3. Selecione o framework apropriado ou mantenha as configurações padrão.
4. Crie um novo deploy.

### Banco MySQL no Railway

Contas, diagnósticos e histórico de até 20 simulados por estudante são
armazenados em MySQL. Como o sistema executa na Vercel, o banco precisa ser
externo; não salve dados no disco temporário das funções serverless.

1. Crie um serviço **MySQL** no Railway.
2. No cliente SQL do Railway, execute [`database/schema.sql`](database/schema.sql).
3. Use a URL pública de conexão do Railway (`MYSQL_PUBLIC_URL`) como valor de
   `DATABASE_URL` em **Vercel > Project > Settings > Environment Variables**.
   Se usar host e porta separados, confirme que são os endereços públicos do
   serviço, não os nomes internos `*.railway.internal`.
4. Selecione Production, Preview e Development e faça um novo deploy.
5. Abra o site, crie uma conta de estudante e complete o diagnóstico. Os
   simulados concluídos aparecerão em **Meu Desempenho**.

Não publique os valores reais das variáveis nem os salve no repositório.
O arquivo `.env.example` contém apenas nomes e valores de exemplo.

Recomendação de provedores:

| Opcao | Indicado para |
| :--- | :--- |
| Vercel | Testes, demos e implantação rápida |
| Railway | Aplicações PHP com necessidades de backend |
| Hostinger | Hospedagem tradicional brasileira em PHP |

---

## Conteúdos abordados

- Hidrocarbonetos
- Alcoois
- Aldeídos
- Cetonas
- Ácidos carboxílicos
- Ésteres
- Éteres
- Aminas
- Amidas
- Estequiometria
- Termoquímica
- Eletroquímica
- Polaridade molecular
- Tabela periodica

---

## Equipe

| Integrante | Funcao |
| :--- | :--- |
| Pedro Amorim | Desenvolvimento do projeto |
| Kaike Medeiros | Desenvolvimento do projeto |
| Henrique Rafael | Desenvolvimento do projeto |

---

## Repositorio

[![GitHub](https://img.shields.io/badge/GitHub-quimicaEnem-181717?style=for-the-badge&logo=github)](https://github.com/pedroamorimbr/quimicaEnem)

---

<div align="center">

**PlayCHEMISTRY ENEM**

Educacao em ciencia, pesquisa e inovacao.

Desenvolvido pela equipe Playbas

</div>
