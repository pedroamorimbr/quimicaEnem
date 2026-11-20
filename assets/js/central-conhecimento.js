// Biblioteca didática: define o conteúdo das aulas e renderiza a navegação no navegador.
(() => {
    'use strict';

    // Cada módulo fornece conteúdo compartilhado pelas aulas listadas em topics.
    const modules = [
        {
            title: 'Química Geral', description: 'Matéria, propriedades, estados físicos e transformações observáveis.',
            topics: ['Matéria e suas propriedades', 'Estados físicos da matéria', 'Mudanças de estado físico', 'Fenômenos físicos e químicos', 'Densidade'],
            notes: ['Propriedades extensivas dependem da quantidade de matéria (como massa e volume); propriedades intensivas não, como densidade e temperatura de ebulição em dada pressão.', 'No sólido, partículas vibram em posições próximas; no líquido, deslizam umas sobre as outras; no gás, ficam muito afastadas e ocupam o recipiente.', 'Durante uma mudança de estado de substância pura, a temperatura permanece constante quando a pressão também é constante, pois a energia altera interações entre partículas.', 'Mudança de forma, dissolução ou mudança de fase podem ser físicas; combustão e oxidação formam espécies químicas diferentes e são químicas.', 'A densidade é uma propriedade intensiva para uma substância em condições definidas. A temperatura pode alterá-la por expansão ou contração do material.'],
            intro: 'A Química investiga a composição, as propriedades e as transformações da matéria. Reconhecer o que muda e o que permanece em um processo é o primeiro passo para interpretar fenômenos naturais e situações do cotidiano.',
            theory: 'Matéria é tudo que possui massa e ocupa espaço. Propriedades gerais, como massa e volume, são comuns a diferentes materiais; propriedades específicas, como densidade e temperaturas de fusão e ebulição, ajudam a identificá-los. A matéria pode apresentar-se nos estados sólido, líquido ou gasoso, conforme a organização e a mobilidade de suas partículas. Aquecer ou resfriar pode alterar o estado sem mudar a identidade química da substância.',
            concepts: ['Fusão: sólido → líquido; solidificação: líquido → sólido.', 'Vaporização: líquido → gás (evaporação, ebulição ou calefação); condensação: gás → líquido.', 'Sublimação: sólido → gás; deposição ou ressublimação: gás → sólido.', 'Fenômeno físico não forma novas substâncias; fenômeno químico altera a composição e forma produtos diferentes.'],
            formula: 'd = m / V  ·  d: densidade; m: massa; V: volume. Unidades frequentes: g/cm³, g/mL e kg/m³.',
            example: 'Um objeto de 120 g ocupa 40 cm³. Divida massa por volume: d = 120 / 40 = 3 g/cm³. Para comparar materiais, use unidades compatíveis; para identificar a flutuação em um líquido, compare as densidades, considerando também a miscibilidade e o equilíbrio do sistema.',
            application: 'A densidade explica por que camadas de óleo ficam sobre a água e auxilia no controle de qualidade de combustíveis e bebidas. A evaporação do suor retira energia da pele; a condensação aparece nas gotículas do lado externo de um copo gelado.',
            enem: 'O exame costuma apresentar mudanças de estado, gráficos de aquecimento ou separação de materiais. Observe se a composição muda: derreter gelo é físico; queimar papel é químico. Em problemas de densidade, converta unidades antes de substituir na fórmula.',
            summary: 'Estado físico depende da organização e energia das partículas. Mudança de estado é transformação física. Formação de novas substâncias caracteriza transformação química. Densidade relaciona massa e volume.',
            question: 'Uma amostra tem massa de 90 g e volume de 30 cm³. Qual é sua densidade?',
            choices: ['0,33 g/cm³', '3 g/cm³', '60 g/cm³', '120 g/cm³'], answer: 1,
            explanation: 'Aplica-se d = m/V: 90 g ÷ 30 cm³ = 3 g/cm³.'
        },
        {
            title: 'Estrutura Atômica', description: 'Partículas subatômicas, espécies atômicas e evolução dos modelos.',
            topics: ['Conceito de átomo', 'Prótons, nêutrons e elétrons', 'Número atômico e número de massa', 'Íons', 'Isótopos, isóbaros e isótonos', 'Modelos atômicos', 'Distribuição eletrônica'],
            notes: ['O átomo é a menor unidade de um elemento que mantém sua identidade química; sua descrição moderna inclui núcleo e nuvem eletrônica.', 'Prótons positivos e nêutrons neutros compõem quase toda a massa nuclear; elétrons negativos ocupam orbitais ao redor do núcleo.', 'Z é o número de prótons e define o elemento; A é o total de prótons e nêutrons de um nuclídeo.', 'Íons surgem pela transferência de elétrons: perda produz cátion, ganho produz ânion. Reações químicas usuais não mudam o núcleo.', 'Compare dois nuclídeos calculando N=A−Z: mesmo Z indica isótopos, mesmo A isóbaros, mesmo N isótonos.', 'Cada modelo atômico explica evidências disponíveis em seu tempo; modelos posteriores incorporam ou corrigem aspectos anteriores.', 'Elétrons preenchem orbitais de energia crescente; a camada de valência ajuda a explicar ligações e reatividade.'],
            intro: 'A identidade de um elemento é determinada pelo número de prótons de seus átomos. A estrutura eletrônica, por sua vez, ajuda a explicar a formação de íons, as ligações e muitas propriedades químicas.',
            theory: 'O núcleo concentra prótons, de carga positiva, e nêutrons, sem carga; elétrons, de carga negativa, ocupam regiões ao redor do núcleo. O número atômico Z é o número de prótons. O número de massa A corresponde a prótons mais nêutrons: A = Z + N. Em um átomo neutro, o total de elétrons é igual a Z. Perder elétrons forma cátion; ganhar elétrons forma ânion.',
            concepts: ['Isótopos: mesmo Z e diferentes A; diferem no número de nêutrons.', 'Isóbaros: mesmo A e diferentes Z. Isótonos: mesmo número de nêutrons.', 'Dalton descreveu átomos como partículas; Thomson identificou elétrons; Rutherford propôs núcleo pequeno e positivo; Bohr introduziu níveis de energia quantizados.', 'Na distribuição por subníveis, preenche-se a menor energia disponível (ordem de energia de Linus Pauling), respeitando a capacidade dos subníveis e o princípio da exclusão de Pauli.'],
            formula: 'A = Z + N  ·  N = A − Z. Carga do íon = prótons − elétrons.',
            example: 'Para ²³₁₁Na⁺, Z = 11, A = 23 e N = 23 − 11 = 12. A carga +1 indica que o sódio perdeu um elétron: possui 10 elétrons. A soma de prótons e nêutrons, não dos elétrons, determina A.',
            application: 'A composição isotópica é usada em datação e em diagnósticos; íons são essenciais em impulsos nervosos e no funcionamento de baterias. A configuração eletrônica ajuda a prever quais íons tendem a se formar.',
            enem: 'Questões podem fornecer notação nuclear e pedir partículas, carga ou relação entre espécies. Identifique Z, A e carga separadamente; em íons, ajuste apenas o número de elétrons, não o de prótons.',
            summary: 'Z identifica o elemento; A = prótons + nêutrons. Átomo neutro tem p = e. Cátion perde elétrons e ânion ganha. Isótopos têm mesmo Z; isóbaros, mesmo A; isótonos, mesmo N.',
            question: 'Um átomo neutro de número atômico 17 ganha um elétron. Qual é a carga do íon formado?',
            choices: ['+1', '−1', '+17', '0'], answer: 1,
            explanation: 'Ao ganhar um elétron, a espécie fica com um elétron a mais que prótons e adquire carga −1.'
        },
        {
            title: 'Tabela Periódica', description: 'Organização dos elementos e tendências das propriedades periódicas.',
            topics: ['Organização da tabela periódica', 'Períodos e famílias', 'Classificação dos elementos', 'Propriedades periódicas', 'Raio atômico', 'Eletronegatividade', 'Energia de ionização', 'Afinidade eletrônica'],
            notes: ['A ordenação moderna por número atômico revela periodicidade: propriedades se repetem porque configurações de valência também apresentam padrões.', 'Elementos do mesmo período ocupam o mesmo número de camadas principais; uma família reúne padrões de elétrons de valência semelhantes.', 'Metais tendem a conduzir e formar cátions; ametais tendem a formar ligações covalentes ou ânions; metaloides têm propriedades intermediárias.', 'Propriedades periódicas são tendências explicadas por carga nuclear efetiva, distância dos elétrons e blindagem; há exceções experimentais.', 'Raio covalente e iônico depende da definição e da espécie: ao formar cátion, o átomo geralmente diminui; ao formar ânion, geralmente aumenta.', 'Eletronegatividade mede a atração por elétrons compartilhados em uma ligação; não é uma carga formal nem uma energia de átomo isolado.', 'Energia de ionização é a energia necessária para retirar elétron de espécie gasosa; remover elétrons sucessivos exige energia crescente.', 'Afinidade eletrônica descreve a mudança energética ao adicionar elétron a espécie gasosa; sinal e magnitude variam entre elementos.'],
            intro: 'A tabela periódica organiza os elementos por número atômico crescente e revela padrões relacionados à configuração eletrônica. A posição de um elemento permite antecipar propriedades e comportamentos químicos.',
            theory: 'As linhas são períodos e indicam o nível principal mais externo ocupado no estado fundamental; as colunas ou famílias reúnem elementos com configurações de valência semelhantes. Metais predominam à esquerda e no centro; ametais, à direita; gases nobres ocupam o grupo 18. Hidrogênio tem posição singular. Elementos de uma família frequentemente apresentam reatividade semelhante.',
            concepts: ['Ao descer um grupo, em geral aumenta o número de camadas e o raio atômico.', 'Ao longo de um período, a carga nuclear efetiva tende a aumentar e o raio tende a diminuir.', 'Eletronegatividade e energia de ionização geralmente crescem da esquerda para a direita e de baixo para cima; o flúor é o elemento mais eletronegativo.', 'Afinidade eletrônica descreve a variação de energia associada à captura de elétron; convenções de sinal e exceções importam, portanto não trate toda tendência como regra sem exceções.'],
            formula: 'Sem fórmula única: compare posição, número de camadas e atração nuclear efetiva. Tendências periódicas admitem exceções.',
            example: 'Na e K pertencem ao grupo 1. O K está abaixo do Na, tem uma camada ocupada a mais e maior raio. O elétron de valência fica, em média, mais distante do núcleo, o que ajuda a explicar a maior facilidade de ionização dos metais alcalinos mais pesados.',
            application: 'A escolha de elementos para ligas, semicondutores, fertilizantes e baterias depende de suas propriedades periódicas e da posição na tabela.',
            enem: 'A prova pode fornecer uma tabela simplificada e pedir comparações de raio, eletronegatividade ou reatividade. Declare a tendência e o motivo (camadas ou atração nuclear), sem confundir tamanho do átomo com facilidade de perder elétron.',
            summary: 'A tabela é ordenada por Z. Períodos são linhas e famílias são colunas. Raio cresce, em geral, para baixo e à esquerda; eletronegatividade e energia de ionização crescem para cima e à direita.',
            question: 'Em qual direção o raio atômico geralmente aumenta na tabela periódica?',
            choices: ['Para cima e para a direita', 'Para baixo e para a esquerda', 'Somente para a direita', 'Não apresenta tendência'], answer: 1,
            explanation: 'Descendo um grupo são acrescentadas camadas; indo à esquerda em um período, diminui a atração nuclear efetiva sobre os elétrons de valência. Ambos favorecem maior raio.'
        },
        {
            title: 'Ligações Químicas', description: 'Ligação, geometria, polaridade e interações entre partículas.',
            topics: ['Regra do octeto', 'Ligação iônica', 'Ligação covalente', 'Ligação metálica', 'Geometria molecular', 'Polaridade das ligações', 'Polaridade molecular', 'Forças intermoleculares'],
            notes: ['O octeto é uma heurística para elementos representativos, não uma lei universal: há espécies com octeto incompleto, expandido ou número ímpar de elétrons.', 'A ligação iônica é uma atração entre cargas em uma rede cristalina; a fórmula representa a proporção mínima de íons, não uma molécula discreta.', 'Ligação covalente envolve compartilhamento de pares eletrônicos; pode ser simples, dupla ou tripla e apresentar polaridade.', 'Elétrons de valência deslocalizados explicam condutividade elétrica, brilho e deformabilidade de muitos metais.', 'Pares ligantes e não ligantes repelem-se; a geometria depende de suas posições e pode ser linear, angular, trigonal plana ou tetraédrica, entre outras.', 'A diferença de eletronegatividade desloca densidade eletrônica e cria dipolo de ligação; não existe fronteira universal rígida entre tipos de ligação.', 'Some vetorialmente os dipolos das ligações considerando a geometria: simetria pode cancelar dipolos mesmo quando as ligações são polares.', 'Forças de dispersão existem em todas as partículas; dipolo-dipolo ocorre entre espécies polares e ligação de hidrogênio é uma interação especialmente intensa em sistemas apropriados.'],
            intro: 'As ligações químicas correspondem a interações que estabilizam átomos em substâncias. A composição, a distribuição de cargas e a forma da molécula influenciam propriedades como solubilidade e temperaturas de ebulição.',
            theory: 'A regra do octeto é um modelo útil para muitos elementos representativos: a transferência ou o compartilhamento de elétrons pode levar a configurações de valência estáveis, mas há exceções. Em sólidos iônicos, cátions e ânions formam redes; na ligação covalente, átomos compartilham pares de elétrons; nos metais, elétrons deslocalizados ajudam a explicar condução e maleabilidade.',
            concepts: ['Ligação iônica: atração eletrostática entre íons; não forma moléculas isoladas no cristal.', 'Ligação covalente polar ocorre quando há distribuição desigual do par eletrônico; apolar, quando a distribuição é aproximadamente simétrica.', 'A geometria depende das regiões de densidade eletrônica ao redor do átomo central. A polaridade molecular é a soma vetorial dos dipolos, não apenas a polaridade de cada ligação.', 'Forças intermoleculares incluem dispersão de London, dipolo-dipolo e ligação de hidrogênio (quando H ligado a F, O ou N interage com par eletrônico de outra espécie).'],
            formula: 'Interações mais intensas costumam elevar a temperatura de ebulição entre substâncias de massas e formas comparáveis. Não é uma igualdade universal.',
            example: 'A ligação O—H é polar. Na água, a geometria angular impede o cancelamento dos dipolos, tornando a molécula polar. Já em CO₂, as ligações C=O são polares, mas a geometria linear simétrica cancela os dipolos e a molécula é apolar.',
            application: 'A polaridade ajuda a prever miscibilidade: água dissolve muitas espécies iônicas ou polares, enquanto solventes apolares tendem a dissolver gorduras. Interações também explicam ebulição e propriedades de materiais.',
            enem: 'Questões exploram solubilidade, ponto de ebulição e condução elétrica. Distinga ligação (intramolecular) de força intermolecular e analise geometria e simetria antes de classificar uma molécula.',
            summary: 'A ligação estabiliza átomos; tipo de ligação não é o mesmo que força intermolecular. Polaridade molecular depende dos dipolos e da geometria. Atrações entre moléculas afetam propriedades macroscópicas.',
            question: 'Por que a molécula de CO₂ é apolar, apesar das ligações C=O serem polares?',
            choices: ['Porque carbono e oxigênio têm a mesma eletronegatividade', 'Porque sua geometria linear e simétrica cancela os dipolos', 'Porque não apresenta ligações covalentes', 'Porque seus elétrons são transferidos completamente'], answer: 1,
            explanation: 'Os dipolos das duas ligações C=O têm mesma intensidade e sentidos opostos em uma molécula linear, cancelando-se.'
        },
        {
            title: 'Misturas e Separação', description: 'Sistemas materiais, fases e métodos de separação.',
            topics: ['Substâncias puras e misturas', 'Sistemas homogêneos e heterogêneos', 'Fases e componentes', 'Filtração', 'Decantação', 'Destilação', 'Centrifugação', 'Separação magnética', 'Tratamento de água'],
            notes: ['Substância pura tem composição definida; mistura pode variar sua composição. Substâncias simples e compostas são ambas substâncias puras.', 'Homogeneidade é observada na escala do sistema descrito: uma fase uniforme é homogênea; interfaces distinguem fases em sistema heterogêneo.', 'Uma fase é uma região uniforme; componentes são as substâncias. Gelo e água líquida formam duas fases do mesmo componente.', 'Filtração separa sólido suspenso de fluido; não retém soluto que atravessa o filtro dissolvido.', 'Decantação requer diferença de densidade e tempo para formar fases; emulsões estáveis podem exigir outras operações.', 'Destilação vaporiza e condensa componentes; a fracionada usa coluna para repetidos equilíbrios vapor-líquido.', 'A centrifugação intensifica a sedimentação de partículas ou fases de densidades distintas por movimento rotacional.', 'Um ímã separa materiais ferromagnéticos ou magneticamente atraídos do restante; nem todo metal é atraído por ímã.', 'O tratamento convencional remove partículas e microrganismos em etapas; a água tratada ainda precisa atender padrões de potabilidade.'],
            intro: 'Separar uma mistura significa aproveitar diferenças de propriedades físicas de seus componentes, sem necessariamente transformar quimicamente as substâncias. A escolha do método depende da composição e do estado físico do sistema.',
            theory: 'Substância pura tem composição química definida; uma mistura reúne duas ou mais substâncias. Sistema homogêneo apresenta uma fase visível; heterogêneo apresenta duas ou mais. Fase é cada porção visualmente uniforme; componente é cada substância química. Água e gelo são um componente em duas fases, enquanto água com sal dissolvido é, em condições usuais, um componente a mais em uma fase líquida.',
            concepts: ['Filtração retém sólido não dissolvido em meio poroso.', 'Decantação usa diferença de densidade e ação da gravidade; funil de separação permite separar líquidos imiscíveis.', 'Destilação simples separa sólido dissolvido de líquido ou líquidos com ebulições bem diferentes; fracionada é adequada a líquidos miscíveis com diferentes faixas de ebulição.', 'Centrifugação acelera a separação de fases por rotação; separação magnética usa atração por ímã. No tratamento de água, etapas podem incluir coagulação, floculação, decantação, filtração e desinfecção.'],
            formula: 'A escolha é qualitativa: identifique estado físico, solubilidade, densidade, magnetismo e volatilidade dos componentes.',
            example: 'Para separar areia e sal: adicione água para dissolver o sal, filtre para reter a areia e evapore ou destile a solução para recuperar o sal (e, na destilação, também a água). A sequência usa solubilidade e tamanho de partículas.',
            application: 'Tratamento de água, reciclagem de materiais, produção de sal e refino do petróleo empregam operações de separação em escala industrial.',
            enem: 'A prova descreve uma mistura e pede uma sequência de operações. Relacione cada etapa à propriedade explorada e confira se o componente que se quer recuperar permanece no filtrado, no resíduo ou no vapor.',
            summary: 'Fase é porção uniforme; componente é substância. Filtração separa sólido insolúvel; decantação separa fases por densidade; destilação explora volatilidade e ebulição.',
            question: 'Qual método é mais apropriado para separar areia de água?',
            choices: ['Destilação fracionada', 'Filtração', 'Separação magnética', 'Cromatografia gasosa'], answer: 1,
            explanation: 'A areia não se dissolve na água e suas partículas podem ser retidas por um filtro.'
        },
        {
            title: 'Química Inorgânica', description: 'Ácidos, bases, sais, óxidos e conceitos de pH.',
            topics: ['Funções inorgânicas', 'Ácidos', 'Bases', 'Sais', 'Óxidos', 'Nomenclatura', 'Indicadores ácido-base', 'Escala de pH', 'Neutralização'],
            notes: ['Funções inorgânicas agrupam compostos por composição e comportamento; classificações são modelos e dependem da teoria adotada.', 'Em água, Arrhenius classifica como ácido a espécie que aumenta H₃O⁺; força ácida e concentração são propriedades diferentes.', 'Base de Arrhenius aumenta OH⁻ em água; bases de Brønsted aceitam prótons, inclusive sem conter OH⁻ na fórmula.', 'Sais são compostos iônicos constituídos por cátions e ânions; sua solução pode ser neutra, ácida ou básica por hidrólise.', 'Óxido é composto binário com oxigênio, salvo exceções; caráter ácido ou básico é inferido pela reação, não apenas pelo nome.', 'Nomenclatura sistemática exige identificar composição e número de oxidação quando variável; prefira nomear a fórmula efetivamente dada.', 'Indicadores são ácidos ou bases fracos cujas formas têm cores diferentes; cada indicador tem faixa de viragem própria.', 'pH é logaritmo decimal negativo da atividade de H₃O⁺; a aproximação por concentração vale para soluções diluídas.', 'Neutralização não implica sempre pH final igual a 7: depende das forças relativas, proporções e condições da solução.'],
            intro: 'Classificar substâncias inorgânicas ajuda a prever propriedades e reações. A linguagem de funções químicas organiza compostos com comportamentos semelhantes, sem substituir a análise da composição e das condições da reação.',
            theory: 'Na definição de Arrhenius, ácido libera H⁺ em água e base libera OH⁻. Essa definição é útil em solução aquosa; modelos mais amplos, como Brønsted–Lowry, tratam ácido como doador de próton e base como receptor. Sais são compostos iônicos que podem resultar de neutralização; óxidos são compostos binários do oxigênio com outro elemento, com exceções importantes.',
            concepts: ['HCl é ácido clorídrico; NaOH é hidróxido de sódio; NaCl é cloreto de sódio.', 'Óxidos podem ser ácidos, básicos, anfóteros ou neutros conforme o comportamento químico.', 'Indicadores mudam de cor em determinadas faixas de pH; a cor depende do indicador e não fornece, por si só, um valor exato.', 'Em solução aquosa diluída a 25 °C, pH = −log[H₃O⁺]; pH menor que 7 é ácido, igual a 7 neutro e maior que 7 básico, nessas condições.'],
            formula: 'Ácido + base → sal + água (esquema de neutralização). Em HCl + NaOH → NaCl + H₂O, a proporção é 1:1.',
            example: 'Na neutralização de H₂SO₄ por NaOH, o ácido fornece dois H⁺ por fórmula. O balanceamento é H₂SO₄ + 2 NaOH → Na₂SO₄ + 2 H₂O; são necessários dois mols de base para cada mol de ácido neste caso.',
            application: 'Antiácidos reduzem a acidez estomacal por neutralização; a correção de pH em solos e o controle de efluentes também dependem de reações ácido-base.',
            enem: 'Interprete rótulos, indicadores, reações e escala de pH. Em neutralização, balanceie a equação antes de inferir proporções. A escala é logarítmica: diferença de uma unidade corresponde a fator dez na concentração de H₃O⁺.',
            summary: 'Ácidos e bases podem ser definidos por modelos diferentes. Neutralização forma, em geral, água e sal. pH quantifica acidez em solução e sua escala é logarítmica.',
            question: 'Na reação HCl + NaOH → NaCl + H₂O, quantos mols de NaOH neutralizam 1 mol de HCl?',
            choices: ['0,5 mol', '1 mol', '2 mol', '3 mol'], answer: 1,
            explanation: 'A equação já está balanceada com coeficientes 1:1:1:1; a proporção HCl:NaOH é de um para um.'
        },
        {
            title: 'Reações Químicas e Estequiometria', description: 'Equações, conservação da matéria e relações quantitativas.',
            topics: ['Reações químicas', 'Classificação das reações', 'Balanceamento', 'Leis ponderais', 'Mol', 'Massa molar', 'Número de Avogadro', 'Cálculos estequiométricos', 'Reagente limitante', 'Pureza e rendimento'],
            notes: ['Evidências como gás, precipitado ou mudança de cor podem indicar reação, mas devem ser interpretadas no contexto.', 'Classificações descrevem padrões; uma reação pode caber em mais de uma categoria, como combustão e oxirredução.', 'Coeficientes balanceiam átomos e carga; alterar índices mudaria a identidade das substâncias.', 'A conservação de massa vale em sistema fechado; proporções fixas definem a composição de um composto puro.', 'Mol conta entidades especificadas — átomos, moléculas, íons ou outras — e requer que a entidade esteja definida.', 'Massa molar é a massa por quantidade de matéria; seu valor numérico relaciona unidades u e g/mol para a espécie.', 'A constante de Avogadro vale aproximadamente 6,022×10²³ entidades por mol.', 'A proporção estequiométrica vem dos coeficientes da equação balanceada, não da razão de massas dos coeficientes.', 'O limitante é determinado comparando quantidade disponível com coeficiente estequiométrico; o menor número de mols nem sempre limita.', 'Pureza corrige a quantidade efetiva de reagente; rendimento compara produto obtido com o máximo teórico.'],
            intro: 'A estequiometria traduz uma equação química balanceada em relações quantitativas entre reagentes e produtos. Sua base é a conservação dos átomos, não uma comparação direta entre massas sem considerar as proporções molares.',
            theory: 'Em uma reação, rearranjam-se átomos: eles não são criados nem destruídos na transformação química comum. A equação balanceada conserva cada elemento e a carga. O mol é a unidade de quantidade de matéria; um mol contém 6,022 × 10²³ entidades. A massa molar, em g/mol, permite converter massa em quantidade de matéria.',
            concepts: ['Síntese, decomposição, simples troca e dupla troca são classificações usuais; combustão e neutralização são outros padrões importantes.', 'Balancear significa ajustar coeficientes inteiros, sem alterar índices das fórmulas.', 'Reagente limitante é consumido primeiro e limita a quantidade teórica de produto; os demais podem ficar em excesso.', 'Pureza compara a massa da substância desejada à massa da amostra; rendimento compara produto real ao teórico.'],
            formula: 'n = m/M; N = n·Nₐ; rendimento (%) = (quantidade real / quantidade teórica)·100; pureza (%) = (massa pura / massa da amostra)·100.',
            example: 'Na reação 2 H₂ + O₂ → 2 H₂O, 2 mol de H₂ reagem com 1 mol de O₂ para formar 2 mol de água. Se houver 3 mol de H₂ e 1 mol de O₂, o O₂ é limitante: consome 2 mol de H₂ e forma 2 mol de H₂O.',
            application: 'Indústrias calculam proporções de matérias-primas para reduzir custos, resíduos e riscos. Emissões e consumo de combustíveis também podem ser estimados a partir de equações balanceadas.',
            enem: 'Organize dados em mol antes de comparar proporções. Balanceie, identifique o limitante e só então converta para massa ou volume. Diferencie resultado teórico, pureza da amostra e rendimento experimental.',
            summary: 'Balanceamento conserva átomos e carga. Coeficientes expressam proporções em mol. n = m/M. O limitante determina o máximo de produto; rendimento compara real com teórico.',
            question: 'Quantos mols de água são formados quando 4 mol de H₂ reagem completamente com O₂ em excesso?',
            choices: ['1 mol', '2 mol', '4 mol', '8 mol'], answer: 2,
            explanation: 'Na equação 2 H₂ + O₂ → 2 H₂O, H₂ e H₂O têm proporção molar 1:1; 4 mol de H₂ formam 4 mol de água.'
        },
        {
            title: 'Soluções e Concentração', description: 'Solubilidade, preparo, concentração e mistura de soluções.',
            topics: ['Soluto e solvente', 'Classificação das soluções', 'Solubilidade', 'Curvas de solubilidade', 'Concentração comum', 'Concentração molar', 'Título e porcentagem', 'Diluição', 'Mistura de soluções'],
            notes: ['Soluto é a espécie dispersa e solvente o meio; em misturas de líquidos, a classificação não depende só de qual componente está em maior massa.', 'Solução insaturada está abaixo do limite de equilíbrio; saturada está no limite, e excesso pode coexistir como corpo de fundo.', 'Solubilidade é quantidade máxima dissolvida em certas condições, não a velocidade com que o soluto dissolve.', 'Curva de solubilidade mostra como o limite muda com temperatura; cada substância tem curva própria.', 'Concentração comum divide massa de soluto pelo volume final da solução, frequentemente expressa em g/L.', 'Molaridade é mol de soluto por litro de solução; a temperatura pode afetar o volume e, portanto, a concentração.', 'Título relaciona quantidade de soluto à massa ou ao volume da solução, conforme convenção explicitada; porcentagem precisa indicar base.', 'Na diluição sem perda, n de soluto se conserva; o aumento de volume reduz a concentração.', 'Na mistura, some quantidade de soluto por componente antes de dividir pelo volume final; reações ou contrações de volume podem alterar o modelo.'],
            intro: 'Solução é uma mistura homogênea. Expressar quantitativamente sua composição permite comparar amostras, preparar reagentes e interpretar processos ambientais, biológicos e industriais.',
            theory: 'Solvente é o componente que dissolve; soluto é o que se dispersa em escala molecular ou iônica. Uma solução insaturada contém menos soluto que o limite de solubilidade, a saturada está no limite, e a supersaturada contém excesso em condição metaestável. Solubilidade depende da natureza das substâncias e, geralmente, da temperatura; pressão afeta principalmente gases.',
            concepts: ['Concentração comum usa massa de soluto por volume de solução.', 'Concentração molar expressa quantidade de soluto por volume de solução, em mol/L.', 'Título em massa é a razão entre massa de soluto e massa da solução; porcentagem é o título multiplicado por 100.', 'Diluir adiciona solvente: a quantidade de soluto permanece constante. Em mistura, só se somam volumes quando a aproximação é válida e as condições permitem.'],
            formula: 'C = mₛ/V; c = n/V; título = mₛ/mₛₒₗᵤçãₒ; na diluição: C₁V₁ = C₂V₂ (mesmo soluto, sem perda).',
            example: 'Para preparar 500 mL de solução 0,20 mol/L, são necessários n = cV = 0,20 × 0,500 = 0,10 mol. Converta o volume para litros antes de usar mol/L; depois, multiplique por M para obter a massa a pesar.',
            application: 'Rótulos de bebidas, medicamentos e produtos de limpeza informam concentrações. Salinidade e concentração de poluentes são parâmetros importantes no controle ambiental.',
            enem: 'Leia o que está no numerador e no denominador da concentração. Verifique se o volume é da solução, não apenas do solvente. Em diluição, a concentração diminui enquanto a quantidade de soluto se conserva.',
            summary: 'Solução é homogênea. Concentração comum: g/L; molaridade: mol/L. Solubilidade indica limite de dissolução. Diluir conserva quantidade de soluto.',
            question: 'Uma solução 2,0 mol/L é diluída de 100 mL para 500 mL. Qual é a concentração final?',
            choices: ['0,40 mol/L', '1,0 mol/L', '2,5 mol/L', '10 mol/L'], answer: 0,
            explanation: 'C₁V₁ = C₂V₂. Logo, C₂ = (2,0 × 100)/500 = 0,40 mol/L.'
        },
        {
            title: 'Termoquímica', description: 'Calor, entalpia, transformações energéticas e combustíveis.',
            topics: ['Conceitos de calor e energia', 'Reações exotérmicas', 'Reações endotérmicas', 'Entalpia', 'Variação de entalpia', 'Lei de Hess', 'Energia de ligação', 'Combustíveis'],
            notes: ['Calor é energia em trânsito devido a diferença de temperatura; um corpo não “contém calor”, mas possui energia interna.', 'Exotérmica significa calor saindo do sistema na convenção adotada; não significa necessariamente que o entorno fique quente em qualquer condição.', 'Endotérmica absorve calor pelo sistema; o processo pode ocorrer se houver fonte de energia e condições adequadas.', 'Entalpia é função de estado, útil em processos a pressão constante; não é sinônimo de temperatura ou calor armazenado.', 'ΔH depende dos estados inicial e final e da quantidade de matéria representada na equação.', 'A Lei de Hess decorre de entalpia ser função de estado; reverta e multiplique equações mantendo os sinais e fatores de ΔH.', 'Energias de ligação tabuladas são médias; estimativa por ligação rompida menos formada não substitui entalpias experimentais.', 'Compare combustíveis por energia útil, quantidade, eficiência e produtos de combustão, além da origem e impacto ambiental.'],
            intro: 'A termoquímica estuda a energia térmica envolvida em transformações. É preciso distinguir calor, que é energia transferida por diferença de temperatura, de temperatura e de energia interna.',
            theory: 'Em pressão constante, a variação de entalpia ΔH corresponde ao calor trocado pelo sistema. Reação exotérmica transfere energia para a vizinhança e apresenta ΔH < 0; endotérmica absorve energia e apresenta ΔH > 0. Entalpia é função de estado: depende dos estados inicial e final, não do caminho.',
            concepts: ['Na equação termoquímica, ΔH é associado à reação como escrita; inverter a reação inverte o sinal de ΔH.', 'Multiplicar uma equação por um fator multiplica ΔH pelo mesmo fator.', 'A Lei de Hess permite somar equações para obter uma reação-alvo; somam-se também as entalpias.', 'Quebrar ligações requer energia e formar ligações libera energia. Aproximadamente, ΔH = Σ energias de ligações rompidas − Σ energias formadas.'],
            formula: 'q = m·c·ΔT (calor sensível); ΔH = Hprodutos − Hreagentes. Use unidades compatíveis e indique o sistema considerado.',
            example: 'Se a combustão de 1 mol de combustível libera 890 kJ, escreve-se ΔH = −890 kJ/mol. Para 2 mol nas mesmas condições, a energia liberada é 1 780 kJ. O sinal negativo indica diminuição da entalpia do sistema.',
            application: 'Combustíveis convertem energia química em calor e trabalho. O balanço energético compara poder calorífico, eficiência e emissões, não apenas o calor produzido.',
            enem: 'Atenção ao sinal de ΔH, à quantidade de matéria e à inversão de equações em Hess. Em calorimetria, identifique quem recebe e quem perde calor; em sistema isolado, o calor trocado se conserva com sinais opostos.',
            summary: 'Exotérmica: libera calor, ΔH negativo. Endotérmica: absorve calor, ΔH positivo. Hess soma equações e entalpias. q = mcΔT descreve aquecimento sem mudança de fase.',
            question: 'Uma reação exotérmica, segundo a convenção termoquímica, apresenta:',
            choices: ['ΔH positivo', 'ΔH negativo', 'ΔH sempre igual a zero', 'aumento obrigatório da massa'], answer: 1,
            explanation: 'Na reação exotérmica o sistema transfere calor para a vizinhança; os produtos têm entalpia menor e ΔH < 0.'
        },
        {
            title: 'Cinética Química', description: 'Velocidade das reações, colisões e fatores que alteram a rapidez.',
            topics: ['Velocidade das reações', 'Teoria das colisões', 'Energia de ativação', 'Temperatura', 'Concentração', 'Superfície de contato', 'Catalisadores'],
            notes: ['Velocidade mede mudança de concentração por tempo; a velocidade instantânea corresponde à inclinação local do gráfico concentração-tempo.', 'Nem toda colisão leva a reação: a orientação e a energia disponível importam para formar o estado de transição.', 'Energia de ativação é a barreira energética entre reagentes e estado de transição; não é a variação total de entalpia.', 'Temperatura aumenta a fração de moléculas com energia acima da barreira, elevando a velocidade em muitos sistemas.', 'A lei de velocidade e a ordem em cada reagente são determinadas experimentalmente, não deduzidas automaticamente dos coeficientes globais.', 'Partículas sólidas menores expõem mais área por massa, ampliando a interface disponível para contato com reagentes.', 'Catalisador participa do mecanismo e é regenerado globalmente; não muda a energia dos estados inicial/final nem o equilíbrio.'],
            intro: 'A cinética explica quão rapidamente os reagentes se transformam e como controlar essa rapidez. Uma reação termodinamicamente possível pode ser lenta se poucas colisões tiverem energia e orientação adequadas.',
            theory: 'A velocidade média pode ser acompanhada pela variação da concentração de reagentes ou produtos em certo intervalo. Na teoria das colisões, são efetivas as colisões com energia suficiente para superar a energia de ativação e orientação favorável. A rapidez depende do mecanismo e das condições, portanto não se deduz apenas da equação global.',
            concepts: ['Elevar a temperatura aumenta a energia cinética e a fração de colisões com energia suficiente.', 'Aumentar a concentração de reagentes, em geral, eleva a frequência de colisões; a relação quantitativa depende da lei de velocidade experimental.', 'Maior superfície exposta de um sólido aumenta o contato e pode acelerar a reação.', 'Catalisador oferece caminho alternativo de menor energia de ativação; acelera os sentidos direto e inverso sem ser consumido globalmente, não altera a constante de equilíbrio.'],
            formula: 'v média = variação de concentração / variação de tempo. O sinal é ajustado para expressar velocidade positiva no consumo de reagentes.',
            example: 'Um comprimido efervescente triturado reage mais rapidamente que um comprimido inteiro, em condições iguais, porque a trituração aumenta a área de contato com a água. A quantidade total de reagente não muda apenas por triturar.',
            application: 'Refrigeração reduz a velocidade de deterioração de alimentos; catalisadores automotivos aceleram reações de conversão de poluentes; triturar reagentes sólidos pode acelerar processos industriais.',
            enem: 'Compare experimentos em que apenas um fator varia. Identifique o mecanismo (mais colisões eficazes, menor energia de ativação ou maior área) e não confunda velocidade com rendimento final ou posição de equilíbrio.',
            summary: 'Reação exige colisões eficazes. Temperatura, concentração e superfície podem aumentar velocidade. Catalisador diminui a energia de ativação e não desloca o equilíbrio.',
            question: 'Qual é o efeito de um catalisador sobre a energia de ativação?',
            choices: ['Eleva a energia dos produtos', 'Reduz a energia de ativação por outro caminho reacional', 'Altera o valor da constante de equilíbrio', 'Aumenta a massa total dos reagentes'], answer: 1,
            explanation: 'O catalisador oferece um mecanismo alternativo com menor energia de ativação e não muda a entalpia global nem a constante de equilíbrio.'
        },
        {
            title: 'Equilíbrio Químico', description: 'Reversibilidade, constantes e resposta a perturbações.',
            topics: ['Reações reversíveis', 'Equilíbrio dinâmico', 'Constante de equilíbrio', 'Princípio de Le Chatelier', 'Influência da concentração', 'Influência da temperatura', 'Influência da pressão', 'Equilíbrio iônico'],
            notes: ['Reação reversível pode avançar e retroceder; a seta dupla indica que ambos os sentidos são considerados.', 'No equilíbrio dinâmico, as duas velocidades são iguais e as concentrações macroscópicas ficam constantes.', 'A constante K é calculada com atividades de equilíbrio; a forma escolar por concentrações aproxima soluções diluídas.', 'Le Chatelier prevê a tendência qualitativa após perturbação, mas não calcula sozinho a nova composição.', 'Mudar concentração desloca a composição, mas não altera K se a temperatura permanecer igual.', 'A temperatura muda K; favorece o sentido que absorve calor ao aquecer e o que libera calor ao resfriar.', 'Pressão afeta principalmente equilíbrios gasosos; conte espécies gasosas, não sólidos ou líquidos.', 'Equilíbrio iônico inclui ionização de ácidos e bases fracos e solubilidade; pH e efeito do íon comum ajudam a analisá-lo.'],
            intro: 'Em reações reversíveis, reagentes formam produtos e produtos também podem regenerar reagentes. O equilíbrio é dinâmico: as velocidades direta e inversa se igualam, embora as concentrações não precisem ser iguais.',
            theory: 'Para aA + bB ⇌ cC + dD, a expressão idealizada Kc = [C]^c[D]^d/[A]^a[B]^b é escrita com concentrações de equilíbrio; sólidos puros e líquidos puros não entram. K informa a composição de equilíbrio em determinada temperatura, não a velocidade de reação. Para gases, Kp pode ser expresso em pressões parciais.',
            concepts: ['Adicionar reagente ou retirar produto tende a favorecer o sentido que consome a perturbação.', 'A temperatura altera K: aquecer favorece o sentido endotérmico; resfriar favorece o exotérmico.', 'Alterações de pressão/volume afetam equilíbrios gasosos quando os lados têm diferentes quantidades de matéria gasosa.', 'Catalisador acelera o alcance do equilíbrio, mas não altera sua composição. Equilíbrios iônicos incluem ionização, dissociação, hidrólise e efeito do íon comum.'],
            formula: 'Para aA + bB ⇌ cC + dD: Kc = [C]^c[D]^d / ([A]^a[B]^b). Os expoentes são coeficientes estequiométricos.',
            example: 'Em N₂(g) + 3 H₂(g) ⇌ 2 NH₃(g), diminuir o volume favorece o lado com menos mols gasosos: o lado dos produtos (2 contra 4), a temperatura constante. O valor de K não muda porque a temperatura não mudou.',
            application: 'A síntese de amônia e o equilíbrio do CO₂ dissolvido nos oceanos são exemplos de sistemas em que condições externas influenciam a composição de equilíbrio.',
            enem: 'Identifique a perturbação e conte mols gasosos em cada lado antes de aplicar Le Chatelier. Se houver mudança de temperatura, diga também se o sentido favorecido é endotérmico ou exotérmico.',
            summary: 'Equilíbrio é dinâmico e tem velocidades direta e inversa iguais. K depende da temperatura. Perturbações favorecem o sentido que tende a reduzi-las.',
            question: 'Em um equilíbrio gasoso, reduzir o volume do recipiente favorece, em geral, o lado com:',
            choices: ['maior número de mols gasosos', 'menor número de mols gasosos', 'maior quantidade de sólidos', 'maior constante de equilíbrio'], answer: 1,
            explanation: 'A compressão favorece o lado que reduz a pressão, normalmente aquele com menor número de mols na fase gasosa. A regra não se aplica se os números forem iguais.'
        },
        {
            title: 'Eletroquímica', description: 'Transferência de elétrons, pilhas, eletrólise e corrosão.',
            topics: ['Oxidação e redução', 'Número de oxidação', 'Agentes oxidantes e redutores', 'Pilhas', 'Potencial elétrico', 'Baterias', 'Eletrólise', 'Corrosão'],
            notes: ['Oxidação e redução ocorrem acopladas: elétrons perdidos por uma espécie são recebidos por outra.', 'NOX é uma carga formal útil para acompanhar elétrons; em substância simples é zero e em íon monoatômico iguala a carga.', 'Oxidante provoca oxidação alheia e se reduz; redutor provoca redução alheia e se oxida.', 'Pilha converte energia livre de reação espontânea em trabalho elétrico por separação de semirreações.', 'Diferença de potencial depende dos materiais, concentrações e temperatura; potencial padrão vale apenas para condições de referência.', 'Bateria é conjunto de uma ou mais células eletroquímicas; baterias recarregáveis têm reações reversíveis nas condições apropriadas.', 'Eletrólise usa corrente externa; produtos dependem dos íons, eletrodos, solvente e potenciais competitivos.', 'Corrosão é deterioração eletroquímica; umidade, oxigênio, sais e contato entre metais podem acelerar o processo.'],
            intro: 'A eletroquímica relaciona reações de oxirredução e energia elétrica. Em pilhas, uma reação espontânea fornece corrente; na eletrólise, uma fonte elétrica força uma transformação não espontânea.',
            theory: 'Oxidação é perda de elétrons e aumento do número de oxidação; redução é ganho de elétrons e diminuição do NOX. Os processos ocorrem simultaneamente. O agente redutor doa elétrons e se oxida; o oxidante recebe elétrons e se reduz. Em uma pilha, oxidação ocorre no ânodo e redução no cátodo.',
            concepts: ['Em pilha galvânica, elétrons percorrem o circuito externo do ânodo para o cátodo.', 'A ponte salina mantém a neutralidade elétrica por migração de íons; não transporta elétrons pelo circuito externo.', 'Potencial padrão de redução permite comparar tendência de redução; E°cel = E°cátodo − E°ânodo conforme potenciais de redução.', 'Eletrólise ígnea ocorre em composto fundido; aquosa envolve também espécies da água. Corrosão é oxidação indesejada e pode ser reduzida por revestimento ou proteção catódica.'],
            formula: 'E°cel = E°red(cátodo) − E°red(ânodo). Para a reação global espontânea, E°cel > 0 em condições padrão.',
            example: 'Na pilha Zn|Zn²⁺||Cu²⁺|Cu, o Zn é oxidado no ânodo e libera elétrons; Cu²⁺ é reduzido no cátodo e deposita cobre metálico. A corrente convencional no circuito externo tem sentido oposto ao fluxo de elétrons.',
            application: 'Pilhas e baterias convertem energia química em elétrica; galvanização e proteção catódica retardam a corrosão de estruturas metálicas.',
            enem: 'Marque em qual eletrodo ocorre cada semirreação, conte elétrons e identifique o sentido de seu fluxo. Não confunda ânodo/cátodo (processo) com sinal do eletrodo, que varia entre pilha e eletrólise.',
            summary: 'Oxidação perde elétrons; redução ganha. Ânodo oxida e cátodo reduz. Pilhas geram corrente; eletrólise consome energia elétrica para promover reação.',
            question: 'Em uma pilha em funcionamento espontâneo, onde ocorre a oxidação?',
            choices: ['No cátodo', 'No ânodo', 'Na ponte salina exclusivamente', 'Nos dois eletrodos simultaneamente'], answer: 1,
            explanation: 'A oxidação ocorre sempre no ânodo; em uma pilha, esse eletrodo é a fonte dos elétrons do circuito externo.'
        },
        {
            title: 'Radioatividade', description: 'Emissões nucleares, decaimento, meia-vida e aplicações.',
            topics: ['Conceito de radioatividade', 'Radiações alfa, beta e gama', 'Decaimento radioativo', 'Meia-vida', 'Fissão nuclear', 'Fusão nuclear', 'Aplicações da radioatividade'],
            notes: ['Núcleos instáveis decaem espontaneamente; a taxa de uma amostra grande é estatística e não prevê quando um núcleo específico decairá.', 'Alfa é núcleo de hélio, beta menos é elétron emitido no decaimento e gama é fóton de alta energia; penetração e blindagem diferem.', 'Cada emissão transforma o nuclídeo; balancear A e Z identifica o núcleo-filho e a partícula emitida.', 'Meia-vida é característica do radionuclídeo e não depende da massa inicial em condições usuais.', 'Fissão divide núcleos pesados e pode sustentar reação em cadeia; reatores controlam nêutrons e calor.', 'Fusão une núcleos leves, requer condições extremas para superar repulsão elétrica e alimenta estrelas.', 'Aplicações médicas e industriais dependem de atividade, meia-vida, dose, blindagem e descarte seguro.'],
            intro: 'Radioatividade é a transformação espontânea de núcleos instáveis, acompanhada de emissão de partículas ou radiação. Processos nucleares alteram o núcleo e liberam energia muito maior por evento que reações químicas comuns.',
            theory: 'Na emissão alfa, o núcleo perde 2 prótons e 2 nêutrons (A diminui 4, Z diminui 2). Na emissão beta menos, um nêutron converte-se em próton, com emissão de elétron (A constante, Z aumenta 1). Radiação gama é eletromagnética e não altera A nem Z. O balanço nuclear conserva número de massa e número atômico.',
            concepts: ['Meia-vida é o tempo para que metade dos núcleos radioativos de uma amostra decaia, ou para a atividade cair à metade.', 'Após n meias-vidas, resta N = N₀(1/2)^n, sob o modelo de decaimento exponencial.', 'Fissão divide núcleos pesados; fusão une núcleos leves. Ambas podem liberar energia e exigem controle e condições específicas.', 'Uso médico, esterilização e datação requerem seleção de isótopos, dose e proteção radiológica.'],
            formula: 'N = N₀·(1/2)^(t/t½). N é a quantidade de núcleos não decaídos, N₀ a inicial e t½ a meia-vida.',
            example: 'Uma amostra de 80 mg tem meia-vida de 5 dias. Após 15 dias transcorreram três meias-vidas: 80 → 40 → 20 → 10 mg permanecem sem decair.',
            application: 'Radioisótopos são usados em diagnósticos por imagem e radioterapia, em controle industrial e em datação. A aplicação exige avaliar atividade, energia emitida e tempo de exposição.',
            enem: 'Em equações nucleares, conserve A e Z separadamente. Em meia-vida, conte intervalos completos ou use a potência; a massa restante não é reduzida por uma quantidade fixa em cada intervalo.',
            summary: 'Alfa: A−4, Z−2. Beta menos: A constante, Z+1. Gama: A e Z constantes. Cada meia-vida reduz à metade a quantidade de núcleos não decaídos.',
            question: 'Uma amostra de 64 g tem meia-vida de 2 anos. Quanto resta após 6 anos?',
            choices: ['32 g', '16 g', '8 g', '2 g'], answer: 2,
            explanation: 'Seis anos correspondem a três meias-vidas: 64 × (1/2)³ = 8 g.'
        },
        {
            title: 'Química Orgânica', description: 'Carbono, cadeias, hidrocarbonetos, nomenclatura e materiais.',
            topics: ['Introdução à Química Orgânica', 'Propriedades do carbono', 'Cadeias carbônicas', 'Classificação das cadeias', 'Fórmulas orgânicas', 'Hidrocarbonetos', 'Nomenclatura orgânica', 'Petróleo e derivados', 'Polímeros'],
            notes: ['Compostos orgânicos abrangem ampla variedade de moléculas de carbono; CO, CO₂, carbonatos e alguns outros são tradicionalmente estudados em Química Inorgânica.', 'Tetravalência, catenação e ligações múltiplas do carbono geram cadeias lineares, ramificadas e cíclicas.', 'A cadeia é o encadeamento de carbonos; heteroátomo pode estar inserido na cadeia ou ligado como substituinte.', 'Classifique cada critério separadamente: aberta/fechada, normal/ramificada, saturada/insaturada e homogênea/heterogênea.', 'Fórmula molecular conta átomos; fórmula estrutural explicita ligações; a esquelética omite carbonos e hidrogênios ligados a carbono.', 'A família de hidrocarboneto depende de ciclos, aromaticidade e tipos e posições de ligações C—C.', 'A nomenclatura comunica estrutura por cadeia principal, numeração, insaturações e substituintes com localizadores.', 'Destilação do petróleo separa frações por faixas de ebulição, mas não converte necessariamente uma substância em outra.', 'Polímeros podem ser naturais ou sintéticos; monômeros e mecanismo de polimerização determinam estrutura e propriedades.'],
            intro: 'A Química Orgânica estuda principalmente compostos de carbono. A capacidade de formar ligações covalentes estáveis consigo mesmo e com outros elementos permite grande diversidade de cadeias e estruturas.',
            theory: 'O carbono é tetravalente e pode formar ligações simples, duplas ou triplas, cadeias abertas ou cíclicas e estruturas ramificadas. Cadeias são classificadas, entre outros critérios, como abertas ou fechadas, normais ou ramificadas, saturadas ou insaturadas, homogêneas ou heterogêneas. A classificação considera a cadeia principal, não apenas qualquer ligação presente na molécula.',
            concepts: ['Fórmula molecular indica a quantidade de cada elemento; estrutural mostra conectividade; condensada resume grupos; esquelética representa o esqueleto carbônico.', 'Hidrocarbonetos contêm apenas C e H: alcanos, alcenos, alcinos, alcadienos e aromáticos.', 'Na nomenclatura, seleciona-se a cadeia principal apropriada, numera-se para dar os menores localizadores e identifica-se insaturações e ramificações conforme as regras.', 'Petróleo é mistura de hidrocarbonetos separada principalmente por destilação fracionada; craqueamento transforma frações. Polímeros são macromoléculas formadas por unidades repetitivas.'],
            formula: 'Para hidrocarboneto acíclico saturado com uma cadeia: CₙH₂ₙ₊₂. A fórmula não se aplica indistintamente a ciclos, insaturações ou aromáticos.',
            example: 'No CH₃—CH=CH—CH₃, a cadeia tem quatro carbonos e uma dupla entre os carbonos 2 e 3: but-2-eno. A dupla torna a cadeia insaturada. A fórmula molecular é C₄H₈, compatível com alceno acíclico com uma dupla.',
            application: 'Combustíveis, plásticos, fibras e fármacos contêm compostos orgânicos. A origem fóssil de muitas matérias-primas torna relevantes reciclagem, eficiência e alternativas renováveis.',
            enem: 'Leia representações orgânicas contando vértices e extremidades como carbonos na fórmula esquelética. Relacione propriedades de frações do petróleo a tamanho de cadeia e volatilidade; considere impactos de extração e descarte.',
            summary: 'Carbono é tetravalente e forma cadeias variadas. Classifique a cadeia por critérios distintos. Hidrocarbonetos têm apenas C e H; petróleo é mistura, polímero é macromolécula.',
            question: 'Qual é a característica de um hidrocarboneto?',
            choices: ['Contém apenas carbono e hidrogênio', 'Contém obrigatoriamente oxigênio', 'É sempre um polímero', 'Possui somente ligações iônicas'], answer: 0,
            explanation: 'Hidrocarbonetos são compostos orgânicos formados exclusivamente por átomos de carbono e hidrogênio.'
        },
        {
            title: 'Funções Orgânicas', description: 'Grupos funcionais e propriedades das principais famílias orgânicas.',
            topics: ['Álcoois', 'Fenóis', 'Aldeídos', 'Cetonas', 'Ácidos carboxílicos', 'Ésteres', 'Éteres', 'Aminas', 'Amidas', 'Haletos orgânicos', 'Identificação dos grupos funcionais'],
            notes: ['Álcool possui —OH em carbono saturado; a hidroxila favorece ligação de hidrogênio, mas a solubilidade também depende do tamanho da cadeia.', 'Fenol tem —OH diretamente ligado ao anel aromático; sua acidez difere da de álcoois alifáticos.', 'Aldeído tem carbonila terminal com pelo menos um H ligado ao carbono carbonílico.', 'Cetona apresenta carbonila entre dois carbonos; aldeído e cetona não são distinguidos apenas pela fórmula molecular.', 'Carboxila combina C=O e O—H no mesmo carbono e pode doar próton em água.', 'Éster apresenta C(=O)—O entre grupos; pode ser formado por esterificação e hidrolisado.', 'Éter tem oxigênio entre dois grupos carbônicos e não contém carbonila no grupo funcional.', 'Amina tem nitrogênio ligado a carbono sem ligação direta a carbonila; pode atuar como base.', 'Amida tem nitrogênio diretamente ligado ao carbono carbonílico; a ressonância influencia sua basicidade.', 'Haletos orgânicos possuem halogênio ligado a carbono; suas reações dependem da estrutura e do grupo de saída.', 'Identifique primeiro carbonila, hidroxila e heteroátomos; examine quem está ligado a eles antes de nomear a função.'],
            intro: 'Grupos funcionais são conjuntos de átomos que conferem padrões de propriedades e reatividade a compostos orgânicos. Para classificar uma estrutura, observe conectividade e posição do grupo, não apenas os elementos presentes.',
            theory: 'Álcool tem hidroxila ligada a carbono saturado; fenol tem hidroxila ligada diretamente a anel aromático. Aldeído tem carbonila terminal ligada a H; cetona tem carbonila entre carbonos. Ácido carboxílico apresenta —COOH; éster, —COO— entre grupos orgânicos; éter, R—O—R. A presença de oxigênio, isoladamente, não distingue essas funções.',
            concepts: ['Amina deriva formalmente da amônia, com carbono ligado ao nitrogênio; amida tem nitrogênio ligado diretamente ao carbono de uma carbonila.', 'Haleto orgânico apresenta ligação C—F, C—Cl, C—Br ou C—I.', 'Reconheça a carbonila C=O e então verifique os átomos ligados ao carbono carbonílico.', 'Propriedades físicas dependem do grupo funcional, da massa, da forma e das interações intermoleculares; uma função não determina sozinha toda a solubilidade ou toxicidade.'],
            formula: 'Pistas estruturais: R—OH (álcool); Ar—OH (fenol); R—CHO (aldeído); R—CO—R′ (cetona); R—COOH (ácido); R—COO—R′ (éster); R—O—R′ (éter).',
            example: 'CH₃COOCH₂CH₃ contém o padrão R—COO—R′: é um éster. Já CH₃OCH₃ contém oxigênio entre carbonos sem carbonila: é um éter. Identificar a carbonila primeiro evita a confusão.',
            application: 'Ésteres aparecem em aromas e fragrâncias; ácidos carboxílicos em alimentos; álcoois em solventes e combustíveis; amidas em proteínas e polímeros. Aplicação não substitui identificação da estrutura.',
            enem: 'Em textos e fórmulas, encontre o grupo característico e relacione-o ao uso ou à reação. A distinção recorrente é álcool/fenol e amina/amida, além de aldeído/cetona e éster/éter.',
            summary: 'A função depende da conectividade. Procure a carbonila e seus vizinhos; diferencie álcool de fenol pela ligação da hidroxila e amina de amida pela carbonila.',
            question: 'Qual grupo caracteriza um éster?',
            choices: ['R—O—R′, sem carbonila', 'R—COO—R′', 'R—NH₂', 'R—CHO'], answer: 1,
            explanation: 'Éster apresenta o grupo R—C(=O)—O—R′; a carbonila o diferencia de um éter.'
        },
        {
            title: 'Isomeria', description: 'Compostos de mesma fórmula molecular com estruturas ou arranjos distintos.',
            topics: ['Conceito de isomeria', 'Isomeria de cadeia', 'Isomeria de posição', 'Isomeria de função', 'Metameria', 'Tautomeria', 'Isomeria geométrica', 'Isomeria óptica'],
            notes: ['A fórmula molecular igual é necessária, mas a diferença estrutural ou espacial precisa ser demonstrada.', 'Isômeros de cadeia diferem no esqueleto carbônico, como cadeia normal e ramificada.', 'Isômeros de posição diferem no local de insaturação, substituinte ou grupo funcional mantendo a função.', 'Isômeros funcionais têm mesma fórmula e funções diferentes, como álcool e éter em C₂H₆O.', 'Metameria (compensação) varia a distribuição de grupos carbônicos ao redor de heteroátomo na cadeia.', 'Tautômeros interconvertem por migração de H e deslocamento de ligação dupla; são formas em equilíbrio.', 'Isomeria geométrica exige rotação restringida e dois substituintes distintos em cada extremidade relevante da dupla.', 'Isomeria óptica decorre de quiralidade; enantiômeros desviam luz polarizada em sentidos opostos em condições comparáveis.'],
            intro: 'Isômeros compartilham fórmula molecular, mas diferem na conectividade dos átomos ou na disposição espacial. Essa diferença pode alterar propriedades físicas, químicas e efeitos biológicos.',
            theory: 'Na isomeria plana ou constitucional, a conectividade muda: cadeia, posição, função, compensação (metameria) e tautomeria são relações usuais. Na estereoisomeria, a conectividade é igual, mas a disposição espacial difere. Reconhecer a fórmula molecular comum é condição inicial para comparar estruturas como isômeros.',
            concepts: ['Isomeria de cadeia: esqueletos carbônicos distintos; posição: localização diferente de insaturação, substituinte ou função.', 'Isomeria de função: funções distintas para a mesma fórmula; metameria: distribuição diferente de carbonos em torno de heteroátomo.', 'Tautomeria é equilíbrio entre formas estruturais, frequentemente ceto-enólica.', 'Isomeria geométrica exige restrição à rotação e substituintes adequados em cada carbono da dupla; isomeria óptica está associada a quiralidade e enantiômeros não superponíveis.'],
            formula: 'Não há fórmula geral que determine a isomeria; verifique fórmula molecular, conectividade, restrição de rotação e simetria.',
            example: 'Butano e 2-metilpropano têm fórmula C₄H₁₀, mas esqueletos diferentes: são isômeros de cadeia. Etanol e metoximetano têm fórmula C₂H₆O e funções álcool e éter: são isômeros de função.',
            application: 'Isômeros podem ter aromas, propriedades e efeitos farmacológicos diferentes. A forma espacial de moléculas é decisiva em interações biológicas e no desenvolvimento de medicamentos.',
            enem: 'Compare as fórmulas antes de classificar. Para cis/trans ou E/Z, examine os grupos ligados aos carbonos da dupla; para quiralidade, avalie a estrutura espacial, não apenas a fórmula molecular.',
            summary: 'Isômeros têm mesma fórmula molecular. Isomeria constitucional altera conectividade; estereoisomeria altera arranjo espacial. Requisitos estruturais determinam se há isomeria geométrica ou óptica.',
            question: 'Etanol e metoximetano têm a mesma fórmula molecular, mas funções diferentes. Qual relação há entre eles?',
            choices: ['Isomeria de cadeia', 'Isomeria de função', 'Isomeria óptica', 'Não são isômeros'], answer: 1,
            explanation: 'Ambos têm fórmula C₂H₆O; um é álcool e o outro é éter, portanto são isômeros de função.'
        },
        {
            title: 'Reações Orgânicas', description: 'Transformações características de compostos orgânicos.',
            topics: ['Adição', 'Substituição', 'Eliminação', 'Oxidação', 'Redução', 'Esterificação', 'Hidrólise', 'Saponificação', 'Combustão'],
            notes: ['Adição a ligação π de alceno ou alcino aumenta o número de ligações σ e reduz a insaturação.', 'Substituição troca átomo ou grupo por outro; mecanismos e condições definem seletividade e produto.', 'Eliminação remove grupos de carbonos vizinhos e pode formar dupla ligação; regra e produto dependem do substrato.', 'Oxidação orgânica frequentemente aumenta ligações C—O ou reduz ligações C—H; o produto depende da função e do agente.', 'Redução frequentemente aumenta ligações C—H ou diminui C—O; hidrogenação é um exemplo para ligações múltiplas.', 'Esterificação forma éster e água a partir de ácido carboxílico e álcool, usualmente em equilíbrio.', 'Hidrólise rompe ligações com participação de água; catálise ácida ou básica altera condições e produtos.', 'Saponificação transforma éster em condições básicas, formando carboxilato e álcool; em gorduras, produz sabão.', 'Combustão completa requer oxigênio suficiente; combustão incompleta pode gerar monóxido de carbono, tóxico, ou fuligem.'],
            intro: 'As reações orgânicas modificam ligações e grupos funcionais. Reconhecer o que entra, sai ou muda de estado de oxidação permite prever produtos e conectar processos industriais e biológicos.',
            theory: 'Na adição, átomos ou grupos se incorporam a uma ligação múltipla, reduzindo sua insaturação. Na substituição, um grupo é trocado por outro. Na eliminação, grupos saem e geralmente se forma insaturação. Oxidação e redução orgânicas são identificadas por mudanças de ligações com heteroátomos e hidrogênio, sem reduzir o conceito a uma única regra.',
            concepts: ['Esterificação de Fischer: ácido carboxílico + álcool ⇌ éster + água, frequentemente catalisada por ácido.', 'Hidrólise quebra ligação pela ação da água; em ésteres, pode produzir ácido e álcool.', 'Saponificação é hidrólise básica de ésteres, como triglicerídeos, que pode formar glicerol e sais de ácidos graxos.', 'Combustão completa de composto orgânico com oxigênio forma CO₂ e H₂O; combustão incompleta pode produzir CO e/ou carbono.'],
            formula: 'Ácido carboxílico + álcool ⇌ éster + água. Para balancear, conserve cada elemento; condições de reação influenciam o equilíbrio e os produtos.',
            example: 'Ácido etanoico + etanol ⇌ etanoato de etila + água. A reação forma um éster e pode ser deslocada pela remoção de água ou pelo uso de excesso de reagente, conforme Le Chatelier.',
            application: 'Esterificação produz aromas, solventes e matérias-primas; saponificação está na fabricação tradicional de sabão; combustão fornece energia, mas pode emitir poluentes.',
            enem: 'Compare reagentes e produtos para classificar o tipo de reação. Em esterificação, procure —COO—; em hidrólise, observe a quebra com água; em combustão, avalie disponibilidade de oxigênio e produtos.',
            summary: 'Adição reduz insaturação; eliminação frequentemente a cria; substituição troca grupos. Esterificação forma éster; hidrólise usa água; saponificação é hidrólise básica de éster.',
            question: 'A reação entre um ácido carboxílico e um álcool pode produzir:',
            choices: ['Éster e água', 'Alceno e oxigênio', 'Amina e gás nitrogênio', 'Somente CO₂'], answer: 0,
            explanation: 'Na esterificação, o ácido carboxílico e o álcool formam éster e água, em equilíbrio nas condições usuais.'
        },
        {
            title: 'Química Ambiental', description: 'Poluentes, ciclos, tratamento e estratégias de sustentabilidade.',
            topics: ['Poluição atmosférica', 'Efeito estufa', 'Aquecimento global', 'Chuva ácida', 'Camada de ozônio', 'Poluição hídrica', 'Eutrofização', 'Tratamento de água e esgoto', 'Poluição do solo', 'Reciclagem', 'Sustentabilidade', 'Química verde'],
            notes: ['Poluentes atmosféricos podem ser primários, emitidos diretamente, ou secundários, formados por reações no ar.', 'Gases de efeito estufa absorvem e emitem infravermelho; o efeito natural é essencial, enquanto sua intensificação altera o balanço energético.', 'Aquecimento global é a elevação da temperatura média associada ao desequilíbrio energético, com causas e impactos múltiplos.', 'SOₓ e NOₓ podem originar ácidos na atmosfera; deposição ácida afeta águas, solos, vegetação e materiais.', 'Ozônio estratosférico absorve radiação UV; sua destruição por catalisadores halogenados é fenômeno distinto da mudança climática.', 'Poluição hídrica pode envolver patógenos, nutrientes, matéria orgânica e substâncias tóxicas, com impactos diferentes.', 'Excesso de nitrogênio ou fósforo pode desencadear florações e queda de oxigênio dissolvido em corpos d’água.', 'Água potável e esgoto exigem tratamentos diferentes; processos e padrões variam conforme qualidade da água e destino.', 'Contaminantes do solo podem persistir, volatilizar ou migrar para águas; avaliação depende de mobilidade e exposição.', 'Reciclagem recupera materiais, mas prevenção, reuso e redução de consumo também evitam impactos e uso de recursos.', 'Sustentabilidade considera dimensões ambientais, sociais e econômicas no longo prazo e ao longo do ciclo de vida.', 'Química verde projeta produtos e processos que reduzem perigos, resíduos e consumo de energia desde a origem.'],
            intro: 'A Química Ambiental investiga substâncias no ar, na água e no solo, suas transformações e seus efeitos. A análise depende de fonte, concentração, persistência, exposição e contexto ecológico.',
            theory: 'O efeito estufa natural retém parte da radiação infravermelha e mantém a Terra habitável; o aumento antrópico de gases de efeito estufa intensifica o aquecimento global. Chuva ácida relaciona-se sobretudo à emissão de SOₓ e NOₓ, que originam ácidos na atmosfera. A destruição do ozônio estratosférico por compostos halogenados é diferente do aquecimento global.',
            concepts: ['Eutrofização: excesso de nutrientes favorece crescimento de algas; decomposição da biomassa pode reduzir oxigênio dissolvido e afetar organismos.', 'Tratamento convencional de água pode incluir coagulação, floculação, decantação, filtração e desinfecção; esgoto requer etapas para remover sólidos e matéria orgânica antes do lançamento ou reúso.', 'Poluição do solo envolve contaminantes, lixiviação e risco de transferência para águas e cadeias alimentares.', 'Química verde busca prevenir resíduos, reduzir perigos e melhorar eficiência ao longo do ciclo de vida; reciclagem é uma estratégia, não a única solução.'],
            formula: 'Avaliação ambiental compara concentração e limite regulatório, exposição e risco; concentração não é sinônimo automático de risco sem considerar dose e via de exposição.',
            example: 'Um aporte de fertilizantes a um lago pode elevar a concentração de nutrientes. O aumento de algas reduz a transparência; quando a biomassa morre, sua decomposição consome oxigênio dissolvido, podendo causar hipóxia.',
            application: 'Saneamento, controle de emissões, tratamento de resíduos, reciclagem e escolha de processos de menor impacto protegem ecossistemas e saúde pública.',
            enem: 'Questões ambientais costumam integrar gráficos, ciclos e propostas de intervenção. Diferencie efeito estufa de buraco na camada de ozônio e relacione a fonte do poluente à transformação e ao efeito observado.',
            summary: 'Associe fonte → transformação → efeito. Efeito estufa não é o mesmo que destruição do ozônio. Eutrofização decorre de excesso de nutrientes; prevenção e tratamento devem considerar todo o ciclo.',
            question: 'Uma consequência frequente da eutrofização é:',
            choices: ['Aumento permanente do oxigênio dissolvido', 'Redução do oxigênio dissolvido após decomposição de biomassa', 'Eliminação de todos os nutrientes do lago', 'Formação direta de ozônio estratosférico'], answer: 1,
            explanation: 'O crescimento de algas é seguido por decomposição microbiana, que consome oxigênio e pode causar hipóxia.'
        },
        {
            title: 'Química no Cotidiano', description: 'Composição, uso responsável e química de produtos e materiais.',
            topics: ['Química dos alimentos', 'Medicamentos', 'Produtos de limpeza', 'Sabões e detergentes', 'Cosméticos', 'Combustíveis', 'Fertilizantes', 'Materiais e metais'],
            notes: ['Carboidratos, lipídios e proteínas têm estruturas e papéis energéticos ou estruturais distintos; conservação envolve reações e atividade de água.', 'Princípio ativo produz efeito terapêutico; dose, intervalo e interação devem seguir orientação profissional e bula.', 'Ácidos, bases, oxidantes e amônia podem reagir perigosamente; nunca misture produtos sem indicação explícita do fabricante.', 'Tensoativos reduzem tensão interfacial e dispersam gordura; sabões podem formar precipitado com íons Ca²⁺ e Mg²⁺ da água dura.', 'Emulsões, filtros UV e conservantes são formulados para estabilidade e uso seguro; composição e modo de aplicação importam.', 'Combustível libera energia por oxidação; o balanço depende da composição e da combustão completa ou incompleta.', 'Nitrogênio, fósforo e potássio são nutrientes essenciais; dose excessiva pode causar eutrofização e desequilíbrio ambiental.', 'Ligas metálicas combinam elementos para alterar propriedades; corrosão, reciclagem e processamento afetam durabilidade e impacto.'],
            intro: 'Produtos cotidianos são misturas ou materiais projetados para cumprir funções específicas. Conhecer composição, concentração e propriedades ajuda a usá-los com segurança e a avaliar impactos e alegações.',
            theory: 'Alimentos contêm água, carboidratos, lipídios, proteínas, vitaminas e sais minerais; o processamento altera textura, conservação e composição. Medicamentos têm princípio ativo e excipientes, e dose e via de administração são determinantes. Produtos de limpeza podem conter surfactantes, ácidos, bases, oxidantes e solventes: misturá-los sem orientação pode gerar gases tóxicos ou reações perigosas.',
            concepts: ['Sabões e detergentes são tensoativos: uma parte interage com água e outra com substâncias apolares; sua ação facilita a remoção de gordura.', 'Cosméticos combinam ingredientes com funções distintas; pH e formulação influenciam estabilidade e compatibilidade.', 'Combustíveis armazenam energia química; octanagem mede resistência à detonação em motores, não energia por litro.', 'Fertilizantes fornecem nutrientes, como N, P e K; uso excessivo pode contaminar água. Metais e ligas apresentam propriedades que dependem de composição e processamento.'],
            formula: 'Dose, concentração e massa não são intercambiáveis: confira sempre a unidade do rótulo e siga as instruções oficiais do produto ou medicamento.',
            example: 'Sabão remove gordura porque suas moléculas formam agregados: regiões apolares interagem com a gordura e regiões polares permanecem em contato com a água. A agitação ajuda a dispersar a sujeira para o enxágue.',
            application: 'Ler rótulos, respeitar doses, ventilar ambientes e não misturar produtos de limpeza são aplicações diretas da Química para saúde e segurança.',
            enem: 'O ENEM contextualiza conceitos em rótulos, materiais e processos. Interprete unidades e composição; avalie benefício, risco e descarte. Não presuma que “natural” signifique seguro ou que “químico” signifique nocivo.',
            summary: 'Produtos têm componentes e funções diferentes. Tensoativos auxiliam a remover gorduras. Dose e concentração importam. Segurança, rótulo e descarte adequado são parte da interpretação química.',
            question: 'Por que sabões e detergentes ajudam a remover gordura com água?',
            choices: ['Porque transformam toda gordura em metal', 'Porque têm regiões com afinidade por água e por substâncias apolares', 'Porque a água se torna apolar', 'Porque eliminam a necessidade de enxágue'], answer: 1,
            explanation: 'A estrutura anfifílica dos tensoativos interage com a gordura e com a água, dispersando-a para remoção.'
        },
        {
            title: 'Revisão ENEM', description: 'Consolidação de conceitos, estratégias e questões contextualizadas.',
            topics: ['Fórmulas essenciais', 'Revisão de funções orgânicas', 'Revisão de estequiometria', 'Mapas mentais', 'Resumos', 'Questões contextualizadas', 'Questões de provas anteriores', 'Simulados de Química'],
            notes: ['Agrupe fórmulas por fenômeno e unidades: concentração, calor, densidade, equilíbrio e quantidade de matéria.', 'Treine reconhecimento estrutural de funções e justifique a classificação pelos átomos ligados ao grupo funcional.', 'Parta da equação balanceada, converta dados para mol e só então calcule produto ou reagente.', 'Um mapa útil mostra relações causais e hierarquia, com exemplos e condições de aplicação.', 'Um resumo de qualidade prioriza definições, relações, limites do modelo e erros recorrentes.', 'Em contexto, separe informação narrativa dos dados químicos e identifique o princípio testado antes de operar.', 'Ao estudar provas anteriores, registre o assunto e a habilidade exigida, não memorize somente o gabarito.', 'Simulados ajudam a praticar tempo e recuperação; a revisão posterior dos erros é parte essencial do estudo.'],
            intro: 'Uma revisão eficiente recupera conceitos e treina a aplicação em contextos novos. Mais importante que decorar uma lista é reconhecer quando um modelo se aplica, quais dados são relevantes e se o resultado faz sentido.',
            theory: 'Reúna relações quantitativas essenciais: densidade d=m/V; quantidade de matéria n=m/M; concentração molar c=n/V; diluição C₁V₁=C₂V₂; calor sensível q=mcΔT; meia-vida N=N₀(1/2)^(t/t½); equilíbrio K escrito a partir da equação balanceada. Acompanhe sempre unidades, condições e hipóteses.',
            concepts: ['Em orgânica, identifique grupo funcional pela conectividade; em estequiometria, balanceie antes de calcular.', 'Mapas mentais devem mostrar relações entre conceitos e exemplos, não apenas palavras soltas.', 'Questões contextualizadas exigem separar o cenário do princípio químico e conferir se as unidades e a conclusão respondem ao que foi perguntado.', 'Após cada simulado, classifique erros: conceito, leitura, unidade, cálculo ou gestão do tempo. Refaça a questão sem consultar a resolução.'],
            formula: 'Estratégia de cálculo: dados e unidades → equação química balanceada ou modelo → substituição → unidade final → verificação de ordem de grandeza.',
            example: 'Uma solução contém 5,0 g de soluto em 250 mL de solução. C = m/V = 5,0/0,250 = 20 g/L. A conversão de mL para L antes da divisão evita erro de fator mil.',
            application: 'Revisar erros recorrentes, resolver provas anteriores com tempo controlado e alternar temas reduz a dependência de memorização e fortalece transferência de aprendizagem.',
            enem: 'Leia comando, unidades, tabelas e gráficos antes de calcular. Elimine alternativas incompatíveis com conservação, sinal, escala ou unidade. Em provas anteriores, confira o contexto e o ano, pois a formulação pode variar.',
            summary: 'Revise conceitos e relações, pratique recuperação ativa e analise erros. Balanceie equações, use unidades coerentes e valide se a resposta é plausível.',
            question: 'Qual é a melhor primeira etapa em um cálculo estequiométrico?',
            choices: ['Escolher uma alternativa ao acaso', 'Balancear a equação e relacionar as quantidades em mol', 'Somar diretamente as massas dos reagentes', 'Ignorar as unidades para ganhar tempo'], answer: 1,
            explanation: 'A equação balanceada fornece as proporções molares que fundamentam a conversão entre reagentes e produtos.'
        }
    ];

    // O progresso e as preferências desta biblioteca ficam no armazenamento local.
    const storageKey = 'playChemistryKnowledgeV1';
    const state = { completed: [], favorites: [], scores: [], lastLesson: '', expanded: '', favoritesOnly: false, persistenceError: false };
    const byId = new Map();
    const lessonOrder = [];

    modules.forEach((module, moduleIndex) => {
        module.id = `m${String(moduleIndex + 1).padStart(2, '0')}`;
        module.topics.forEach((topic, topicIndex) => {
            const lesson = { id: `${module.id}-a${String(topicIndex + 1).padStart(2, '0')}`, topic, module, moduleIndex, topicIndex };
            byId.set(lesson.id, lesson);
            lessonOrder.push(lesson);
        });
    });

    const elements = {
        moduleGrid: document.getElementById('module-grid'),
        lessonView: document.getElementById('lesson-view'),
        favoritesView: document.getElementById('favorites-view'),
        search: document.getElementById('lesson-search'),
        filter: document.getElementById('subject-filter'),
        favoriteButton: document.getElementById('favorites-filter'),
        favoriteCount: document.getElementById('favorite-count'),
        homeButton: document.getElementById('home-button'),
        status: document.getElementById('library-status'),
        lessonCount: document.getElementById('lesson-count'),
        progress: document.getElementById('overall-progress'),
        resumePanel: document.getElementById('resume-panel'),
        resumeButton: document.getElementById('resume-lesson')
    };

    function showStorageError() {
        state.persistenceError = true;
        elements.status.textContent = 'Não foi possível salvar seu progresso neste navegador. As alterações desta sessão ainda funcionam.';
    }

    // Restaura apenas identificadores de aulas que ainda existem no catálogo.
    function loadState() {
        try {
            const saved = JSON.parse(localStorage.getItem(storageKey) || '{}');
            if (saved && typeof saved === 'object') {
                state.completed = Array.isArray(saved.completed) ? saved.completed.filter(id => byId.has(id)) : [];
                state.favorites = Array.isArray(saved.favorites) ? saved.favorites.filter(id => byId.has(id)) : [];
                state.scores = Array.isArray(saved.scores) ? saved.scores.filter(item => item && byId.has(item.id) && Number.isInteger(item.answer) && Number.isFinite(item.at)) : [];
                state.lastLesson = byId.has(saved.lastLesson) ? saved.lastLesson : '';
            }
        } catch (error) {
            showStorageError();
        }
    }

    function saveState() {
        try {
            localStorage.setItem(storageKey, JSON.stringify({
                completed: state.completed,
                favorites: state.favorites,
                scores: state.scores.slice(-100),
                lastLesson: state.lastLesson
            }));
        } catch (error) {
            showStorageError();
        }
    }

    function escapeHtml(value) {
        return String(value).replace(/[&<>"']/g, character => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
        })[character]);
    }

    function isDone(id) { return state.completed.includes(id); }
    function isFavorite(id) { return state.favorites.includes(id); }
    function progressFor(module) {
        const lessons = lessonOrder.filter(lesson => lesson.module === module);
        return lessons.length ? Math.round(lessons.filter(lesson => isDone(lesson.id)).length / lessons.length * 100) : 0;
    }

    function updateSummary() {
        document.getElementById('module-count').textContent = String(modules.length);
        elements.lessonCount.textContent = String(lessonOrder.length);
        document.getElementById('favorite-count').textContent = String(state.favorites.length);
        elements.progress.textContent = `${Math.round(state.completed.length / lessonOrder.length * 100)}%`;
        elements.favoriteButton.setAttribute('aria-pressed', String(state.favoritesOnly));
        elements.resumePanel.hidden = !state.lastLesson || elements.lessonView.hidden === false || elements.favoritesView.hidden === false;
        if (state.lastLesson) {
            const last = byId.get(state.lastLesson);
            if (last) elements.resumeButton.textContent = `Continuar: ${last.topic} →`;
        }
    }

    function matches(lesson, query) {
        if (state.favoritesOnly && !isFavorite(lesson.id)) return false;
        if (elements.filter.value !== 'all' && lesson.module.id !== elements.filter.value) return false;
        const text = `${lesson.topic} ${lesson.module.title} ${lesson.module.description}`.toLocaleLowerCase('pt-BR');
        return !query || text.includes(query);
    }

    // As três telas usam o mesmo estado: módulos, aula aberta e favoritos.
    function renderModules() {
        const query = elements.search.value.trim().toLocaleLowerCase('pt-BR');
        const visibleModules = modules.filter(module => lessonOrder.some(lesson => lesson.module === module && matches(lesson, query)));
        elements.moduleGrid.hidden = false;
        elements.lessonView.hidden = true;
        elements.favoritesView.hidden = true;
        elements.homeButton.hidden = true;
        elements.moduleGrid.innerHTML = visibleModules.map(module => {
            const topics = lessonOrder.filter(lesson => lesson.module === module && matches(lesson, query));
            const percent = progressFor(module);
            const expanded = state.expanded === module.id || Boolean(query) || elements.filter.value !== 'all' || state.favoritesOnly;
            return `<article class="module-card">
                <div class="module-card-top">
                    <span class="module-number">MÓDULO ${module.id.slice(1)}</span>
                    <span class="lesson-count">${topics.length} ${topics.length === 1 ? 'aula' : 'aulas'}${query || state.favoritesOnly ? ' nesta busca' : ''}</span>
                </div>
                <button class="module-open" type="button" data-expand="${module.id}" aria-expanded="${expanded}">
                    <span class="module-card-copy"><h2>${escapeHtml(module.title)}</h2><p>${escapeHtml(module.description)}</p></span>
                </button>
                <div class="progress-track" role="progressbar" aria-label="Progresso em ${escapeHtml(module.title)}" aria-valuenow="${percent}" aria-valuemin="0" aria-valuemax="100"><div class="progress-fill" style="width:${percent}%"></div></div>
                <div class="module-card-footer"><span class="module-progress-label">${percent}% concluído</span><button class="module-favorite" type="button" data-module="${module.id}" aria-label="${expanded ? 'Recolher aulas' : 'Expandir aulas'}">${expanded ? '⌃' : '⌄'}</button></div>
                ${expanded ? `<div class="lesson-list"><p class="lesson-list-heading">Aulas do módulo</p>${topics.map(lesson => `<button class="lesson-link ${isDone(lesson.id) ? 'is-complete' : ''}" type="button" data-lesson="${lesson.id}"><span class="lesson-check" aria-hidden="true">${isDone(lesson.id) ? '✓' : ''}</span><span>${escapeHtml(lesson.topic)}</span>${isFavorite(lesson.id) ? '<span aria-label="Favorita">★</span>' : ''}</button>`).join('')}</div>` : ''}
            </article>`;
        }).join('');

        if (!visibleModules.length) {
            const message = state.favoritesOnly
                ? 'Nenhuma aula favorita corresponde à pesquisa e aos filtros. Marque uma aula com ☆ para encontrá-la aqui.'
                : 'Nenhuma aula encontrada. Tente outro termo ou assunto.';
            elements.moduleGrid.innerHTML = `<div class="empty-state">${message}</div>`;
        }
        elements.status.textContent = `${state.favoritesOnly ? 'Exibindo aulas favoritas; use a busca e o filtro para refinar.' : 'Selecione um módulo para ver suas aulas. Seu progresso fica salvo neste navegador.'}${state.persistenceError ? ' Não foi possível salvar alterações neste navegador.' : ''}`;
        updateSummary();
    }

    // Monta a aula selecionada e mantém a URL sincronizada com o histórico do navegador.
    function renderLesson(id, updateHistory = true) {
        const lesson = byId.get(id);
        if (!lesson) {
            renderModules();
            return;
        }
        state.lastLesson = id;
        saveState();
        const module = lesson.module;
        const previous = lessonOrder[lessonOrder.indexOf(lesson) - 1];
        const next = lessonOrder[lessonOrder.indexOf(lesson) + 1];
        const done = isDone(id);
        const favorite = isFavorite(id);
        elements.moduleGrid.hidden = true;
        elements.favoritesView.hidden = true;
        elements.lessonView.hidden = false;
        elements.homeButton.hidden = false;
        elements.status.textContent = `Módulo ${String(lesson.moduleIndex + 1).padStart(2, '0')} · ${lesson.topic}${state.persistenceError ? ' · Não foi possível salvar alterações neste navegador.' : ''}`;
        elements.lessonView.innerHTML = `<article class="lesson-panel">
            <nav class="breadcrumb" aria-label="Caminho da aula"><button type="button" data-home>Central do Conhecimento</button><span>›</span><span>Módulo ${String(lesson.moduleIndex + 1).padStart(2, '0')} — ${escapeHtml(module.title)}</span></nav>
            <header class="lesson-heading"><div><span class="module-number">AULA ${String(lesson.topicIndex + 1).padStart(2, '0')} · MÓDULO ${String(lesson.moduleIndex + 1).padStart(2, '0')}</span><h1>${escapeHtml(lesson.topic)}</h1><p>${escapeHtml(module.title)} · ${escapeHtml(module.description)}</p></div><div class="lesson-tools"><button class="lesson-action" type="button" data-favorite="${id}" aria-pressed="${favorite}">${favorite ? '★ Remover dos favoritos' : '☆ Adicionar aos favoritos'}</button><button class="lesson-action" type="button" data-complete="${id}" aria-pressed="${done}">${done ? '✓ Concluída' : 'Marcar como concluída'}</button></div></header>
            <div class="lesson-content">
                <h2>Introdução</h2><p>${escapeHtml(module.intro)}</p>
                <h2>Objetivos de aprendizagem</h2><ul class="learning-objectives"><li>Explicar os conceitos centrais de ${escapeHtml(lesson.topic.toLocaleLowerCase('pt-BR'))}.</li><li>Relacionar a teoria de ${escapeHtml(module.title.toLocaleLowerCase('pt-BR'))} a situações cotidianas e a problemas contextualizados.</li><li>Justificar sua resposta com conceitos e unidades adequados, quando houver cálculo.</li></ul>
                <h2>Explicação teórica</h2><p>${escapeHtml(module.theory)}</p>
                <div class="lesson-callout"><strong>Conceito-chave — ${escapeHtml(lesson.topic)}:</strong> ${escapeHtml(module.notes[lesson.topicIndex])}</div>
                <h2>Conceitos e classificações</h2><ul>${module.concepts.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
                <h2>Fórmulas e variáveis</h2><div class="formula-box">${escapeHtml(module.formula)}</div><p>Antes de substituir valores, defina cada grandeza, converta as unidades para um sistema compatível e indique as condições assumidas. Uma fórmula é um modelo: use-a somente quando as hipóteses do problema forem satisfeitas.</p>
                <h2>Exemplo resolvido passo a passo</h2><ol><li><strong>Leia o que se pede:</strong> identifique a grandeza ou a conclusão desejada.</li><li><strong>Selecione o modelo:</strong> use o conceito e a relação adequada ao problema.</li><li><strong>Resolva e interprete:</strong> ${escapeHtml(module.example)}</li><li><strong>Confira:</strong> verifique unidade, sinal, conservação e plausibilidade do resultado.</li></ol>
                <h2>Aplicações no cotidiano</h2><p>${escapeHtml(module.application)}</p>
                <h2>Como pode aparecer no ENEM</h2><p>${escapeHtml(module.enem)}</p>
                <div class="lesson-summary"><h2>Resumo para revisão</h2><p>${escapeHtml(module.summary)}</p></div>
                <section class="exercise-box" aria-labelledby="exercise-title"><div class="exercise-heading"><h2 id="exercise-title">Exercício de fixação</h2><span class="lesson-count">Responda e confira a explicação</span></div><form data-quiz="${id}"><fieldset><legend>${escapeHtml(module.question)}</legend>${module.choices.map((choice, index) => `<label class="answer-option"><input type="radio" name="answer" value="${index}" required><span>${escapeHtml(choice)}</span></label>`).join('')}</fieldset><button class="lesson-action" type="submit">Conferir resposta</button></form><div class="answer-feedback" role="status" aria-live="polite" hidden></div></section>
                <div class="lesson-navigation"><button class="lesson-action" type="button" data-lesson="${previous ? previous.id : ''}" ${previous ? '' : 'disabled'}>← Aula anterior</button><span class="lesson-count">${lessonOrder.indexOf(lesson) + 1} de ${lessonOrder.length}</span><button class="lesson-action" type="button" data-lesson="${next ? next.id : ''}" ${next ? '' : 'disabled'}>Próxima aula →</button></div>
            </div>
        </article>`;
        if (updateHistory) {
            const url = new URL(window.location.href);
            url.searchParams.set('aula', id);
            history.pushState({ lesson: id }, '', url);
        }
        updateSummary();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function renderFavorites() {
        state.favoritesOnly = true;
        renderModules();
        elements.moduleGrid.hidden = true;
        elements.lessonView.hidden = true;
        elements.favoritesView.hidden = false;
        elements.homeButton.hidden = false;
        const favorites = state.favorites.map(id => byId.get(id)).filter(Boolean);
        elements.favoritesView.innerHTML = `<section class="favorites-panel"><h2>Suas aulas favoritas</h2><p class="lesson-count">Uma lista pessoal para retomar assuntos importantes.</p>${favorites.length ? `<div class="lesson-list">${favorites.map(lesson => `<div class="favorite-row"><button class="lesson-link ${isDone(lesson.id) ? 'is-complete' : ''}" type="button" data-lesson="${lesson.id}"><span class="lesson-check">${isDone(lesson.id) ? '✓' : '☆'}</span><span>${escapeHtml(lesson.topic)} <small>· ${escapeHtml(lesson.module.title)}</small></span></button><button class="favorite-remove" type="button" data-remove-favorite="${lesson.id}" aria-label="Remover ${escapeHtml(lesson.topic)} dos favoritos">Remover</button></div>`).join('')}</div>` : '<div class="empty-state">Você ainda não favoritou aulas. Abra uma aula e selecione “Adicionar aos favoritos”.</div>'}</section>`;
        elements.status.textContent = `${favorites.length} ${favorites.length === 1 ? 'aula favorita' : 'aulas favoritas'}.${state.persistenceError ? ' Não foi possível salvar alterações neste navegador.' : ''}`;
        updateSummary();
    }

    function toggleItem(list, id) {
        const index = list.indexOf(id);
        if (index >= 0) list.splice(index, 1);
        else list.push(id);
    }

    modules.forEach((module, index) => {
        const option = document.createElement('option');
        option.value = module.id;
        option.textContent = `Módulo ${String(index + 1).padStart(2, '0')} · ${module.title}`;
        elements.filter.append(option);
    });

    loadState();
    renderModules();
    const initialLesson = new URLSearchParams(window.location.search).get('aula');
    if (initialLesson && byId.has(initialLesson)) renderLesson(initialLesson, false);

    elements.search.addEventListener('input', renderModules);
    elements.filter.addEventListener('change', renderModules);
    elements.favoriteButton.addEventListener('click', () => {
        if (state.favoritesOnly) {
            state.favoritesOnly = false;
            renderModules();
        } else {
            renderFavorites();
        }
    });
    elements.homeButton.addEventListener('click', () => {
        state.favoritesOnly = false;
        const url = new URL(window.location.href);
        url.searchParams.delete('aula');
        history.pushState({}, '', url);
        renderModules();
    });
    elements.resumeButton.addEventListener('click', () => {
        if (byId.has(state.lastLesson)) renderLesson(state.lastLesson);
    });
    window.addEventListener('popstate', () => {
        const id = new URLSearchParams(window.location.search).get('aula');
        if (id && byId.has(id)) renderLesson(id, false);
        else renderModules();
    });

    // Trata ações dos cartões e aulas por delegação, inclusive após nova renderização.
    document.addEventListener('click', event => {
        const button = event.target.closest('button');
        if (!button) return;
        if (button.hasAttribute('data-home')) {
            state.favoritesOnly = false;
            renderModules();
        } else if (button.dataset.lesson && byId.has(button.dataset.lesson)) {
            renderLesson(button.dataset.lesson);
        } else if (button.dataset.complete) {
            toggleItem(state.completed, button.dataset.complete);
            saveState();
            renderLesson(button.dataset.complete, false);
        } else if (button.dataset.favorite) {
            toggleItem(state.favorites, button.dataset.favorite);
            saveState();
            renderLesson(button.dataset.favorite, false);
        } else if (button.dataset.removeFavorite) {
            toggleItem(state.favorites, button.dataset.removeFavorite);
            saveState();
            renderFavorites();
        } else if (button.dataset.expand) {
            state.expanded = state.expanded === button.dataset.expand ? '' : button.dataset.expand;
            renderModules();
        } else if (button.dataset.module) {
            state.expanded = state.expanded === button.dataset.module ? '' : button.dataset.module;
            renderModules();
        }
    });

    // Corrige o exercício da aula e registra o resultado no progresso local.
    document.addEventListener('submit', event => {
        const form = event.target.closest('form[data-quiz]');
        if (!form) return;
        event.preventDefault();
        const lesson = byId.get(form.dataset.quiz);
        const selected = form.querySelector('input[name="answer"]:checked');
        const feedback = form.parentElement.querySelector('.answer-feedback');
        if (!selected || !lesson) {
            feedback.hidden = false;
            feedback.className = 'answer-feedback is-incorrect';
            feedback.textContent = 'Selecione uma alternativa antes de conferir.';
            return;
        }
        const answer = Number(selected.value);
        const correct = answer === lesson.module.answer;
        state.scores.push({ id: lesson.id, answer, correct, at: Date.now() });
        state.scores = state.scores.slice(-100);
        saveState();
        feedback.hidden = false;
        feedback.className = `answer-feedback ${correct ? 'is-correct' : 'is-incorrect'}`;
        feedback.innerHTML = `<strong>${correct ? 'Resposta correta.' : 'Resposta incorreta.'}</strong> ${escapeHtml(lesson.module.explanation)} <span>Desempenho salvo: ${state.scores.filter(item => item.correct).length} acertos em ${state.scores.length} tentativas recentes.</span>`;
    });
})();
