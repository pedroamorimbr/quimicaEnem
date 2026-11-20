const PERIODIC_ELEMENTS = [
    { atomicNumber: 1, symbol: 'H', name: 'Hidrogênio', mass: '1.008', family: 'Não metal', category: 'nonmetals', group: 1, period: 1, row: 1, col: 1, state: 'Gasoso', valence: '1', electronicConfiguration: '1s¹', electronegativity: '2,20', atomicRadius: '53 pm', ionizationEnergy: '1312 kJ/mol', characteristics: 'Elemento mais leve e com uma estrutura atômica simples.', occurrence: 'Presente na água, compostos orgânicos e em estrelas.', applications: 'Produção de amônia, combustíveis e materiais industriais.', curiosities: 'É o principal combustível no interior do Sol.', colorClass: 'nonmetals' },
    { atomicNumber: 2, symbol: 'He', name: 'Hélio', mass: '4.0026', family: 'Gás nobre', category: 'noble-gases', group: 18, period: 1, row: 1, col: 18, state: 'Gasoso', valence: '2', electronicConfiguration: '1s²', electronegativity: '—', atomicRadius: '31 pm', ionizationEnergy: '2372 kJ/mol', characteristics: 'Gás inerte por possuir camada de valência completa.', occurrence: 'Encontrado em jazidas de gás natural e em estrelas.', applications: 'Resfriamento criogênico e uso em laser e gases de proteção.', curiosities: 'Foi identificado pela análise espectral do Sol.', colorClass: 'noble-gases' },
    { atomicNumber: 3, symbol: 'Li', name: 'Lítio', mass: '6.94', family: 'Metal alcalino', category: 'alkali-metals', group: 1, period: 2, row: 2, col: 1, state: 'Sólido', valence: '1', electronicConfiguration: '[He]2s¹', electronegativity: '0,98', atomicRadius: '167 pm', ionizationEnergy: '520 kJ/mol', characteristics: 'Metal leve e muito reativo em contato com água.', occurrence: 'Presente em minerais e salmouras.', applications: 'Baterias recarregáveis, medicamentos e ligas ultraleves.', curiosities: 'É encontrado em águas minerais e em alguns medicamentos.', colorClass: 'alkali-metals' },
    { atomicNumber: 4, symbol: 'Be', name: 'Berílio', mass: '9.0122', family: 'Metal alcalino-terroso', category: 'alkaline-earth', group: 2, period: 2, row: 2, col: 2, state: 'Sólido', valence: '2', electronicConfiguration: '[He]2s²', electronegativity: '1,57', atomicRadius: '112 pm', ionizationEnergy: '899 kJ/mol', characteristics: 'Metal duro e leve, com baixa densidade.', occurrence: 'Presente em minerais como berilo e crisoberilo.', applications: 'Ligas leves e componentes aeroespaciais.', curiosities: 'É tóxico em formas solúveis, por isso exige cuidado.', colorClass: 'alkaline-earth' },
    { atomicNumber: 5, symbol: 'B', name: 'Boro', mass: '10.81', family: 'Semimetal', category: 'metalloids', group: 13, period: 2, row: 2, col: 13, state: 'Sólido', valence: '3', electronicConfiguration: '[He]2s²2p¹', electronegativity: '2,04', atomicRadius: '87 pm', ionizationEnergy: '801 kJ/mol', characteristics: 'Elemento com propriedades intermediárias entre metal e não metal.', occurrence: 'Encontrado em boratos e minerais da crosta terrestre.', applications: 'Vidros, detergentes e materiais semicondutores.', curiosities: 'O ácido bórico é usado em antissépticos e pesticidas.', colorClass: 'metalloids' },
    { atomicNumber: 6, symbol: 'C', name: 'Carbono', mass: '12.011', family: 'Não metal', category: 'nonmetals', group: 14, period: 2, row: 2, col: 14, state: 'Sólido', valence: '4', electronicConfiguration: '[He]2s²2p²', electronegativity: '2,55', atomicRadius: '70 pm', ionizationEnergy: '1086 kJ/mol', characteristics: 'Base da química orgânica e da vida.', occurrence: 'Presente em combustíveis, minerais e organismos vivos.', applications: 'Aço, plásticos, grafite e nanotubos.', curiosities: 'O diamante e o grafite possuem a mesma composição química.', colorClass: 'nonmetals' },
    { atomicNumber: 7, symbol: 'N', name: 'Nitrogênio', mass: '14.007', family: 'Não metal', category: 'nonmetals', group: 15, period: 2, row: 2, col: 15, state: 'Gasoso', valence: '3', electronicConfiguration: '[He]2s²2p³', electronegativity: '3,04', atomicRadius: '65 pm', ionizationEnergy: '1402 kJ/mol', characteristics: 'Componente principal do ar atmosférico.', occurrence: 'Presente na atmosfera e em biomoléculas.', applications: 'Fertilizantes, explosivos e indústria química.', curiosities: 'O nitrogênio é usado para preservar alimentos.', colorClass: 'nonmetals' },
    { atomicNumber: 8, symbol: 'O', name: 'Oxigênio', mass: '15.999', family: 'Não metal', category: 'nonmetals', group: 16, period: 2, row: 2, col: 16, state: 'Gasoso', valence: '2', electronicConfiguration: '[He]2s²2p⁴', electronegativity: '3,44', atomicRadius: '60 pm', ionizationEnergy: '1314 kJ/mol', characteristics: 'Elemento essencial para respiração e combustão.', occurrence: 'Mais abundante na crosta terrestre e na atmosfera.', applications: 'Oxidação, produção de aço e uso hospitalar.', curiosities: 'A maior parte do oxigênio do ar vem da fotossíntese.', colorClass: 'nonmetals' },
    { atomicNumber: 9, symbol: 'F', name: 'Flúor', mass: '18.998', family: 'Halogênio', category: 'halogens', group: 17, period: 2, row: 2, col: 17, state: 'Gasoso', valence: '1', electronicConfiguration: '[He]2s²2p⁵', electronegativity: '3,98', atomicRadius: '57 pm', ionizationEnergy: '1681 kJ/mol', characteristics: 'O elemento mais eletronegativo da tabela.', occurrence: 'Presente em minerais e fluoretos.', applications: 'Dentifrícios, refrigeração e processos químicos.', curiosities: 'É muito reativo e raramente encontrado livre na natureza.', colorClass: 'halogens' },
    { atomicNumber: 10, symbol: 'Ne', name: 'Neônio', mass: '20.180', family: 'Gás nobre', category: 'noble-gases', group: 18, period: 2, row: 2, col: 18, state: 'Gasoso', valence: '8', electronicConfiguration: '[He]2s²2p⁶', electronegativity: '—', atomicRadius: '38 pm', ionizationEnergy: '2081 kJ/mol', characteristics: 'Gás nobre com camada de valência preenchida.', occurrence: 'Presente em pequenas quantidades na atmosfera.', applications: 'Luzes de neon, sinalização e lasers.', curiosities: 'Emite luz laranja quando eletrizado.', colorClass: 'noble-gases' },
    { atomicNumber: 11, symbol: 'Na', name: 'Sódio', mass: '22.990', family: 'Metal alcalino', category: 'alkali-metals', group: 1, period: 3, row: 3, col: 1, state: 'Sólido', valence: '1', electronicConfiguration: '[Ne]3s¹', electronegativity: '0,93', atomicRadius: '190 pm', ionizationEnergy: '496 kJ/mol', characteristics: 'Muito reativo, reage rapidamente com água.', occurrence: 'Presente em minerais e no oceano.', applications: 'Lâmpadas de sódio e produtos químicos.', curiosities: 'É um dos eletrólitos mais importantes para o organismo.', colorClass: 'alkali-metals' },
    { atomicNumber: 12, symbol: 'Mg', name: 'Magnésio', mass: '24.305', family: 'Metal alcalino-terroso', category: 'alkaline-earth', group: 2, period: 3, row: 3, col: 2, state: 'Sólido', valence: '2', electronicConfiguration: '[Ne]3s²', electronegativity: '1,31', atomicRadius: '145 pm', ionizationEnergy: '738 kJ/mol', characteristics: 'Metal leve, muito útil em ligas e reações bioquímicas.', occurrence: 'Encontrado em rochas e em clorofila.', applications: 'Ligas leves e produção de metalurgia.', curiosities: 'É essencial para a atividade biológica das plantas.', colorClass: 'alkaline-earth' },
    { atomicNumber: 13, symbol: 'Al', name: 'Alumínio', mass: '26.982', family: 'Outros metais', category: 'post-transition', group: 13, period: 3, row: 3, col: 13, state: 'Sólido', valence: '3', electronicConfiguration: '[Ne]3s²3p¹', electronegativity: '1,61', atomicRadius: '143 pm', ionizationEnergy: '578 kJ/mol', characteristics: 'Metal leve, resistente e muito utilizado na indústria.', occurrence: 'Presente em bauxita.', applications: 'Embalagens, veículos, móveis e estruturas.', curiosities: 'É o metal mais abundante da crosta terrestre.', colorClass: 'post-transition' },
    { atomicNumber: 14, symbol: 'Si', name: 'Silício', mass: '28.085', family: 'Semimetal', category: 'metalloids', group: 14, period: 3, row: 3, col: 14, state: 'Sólido', valence: '4', electronicConfiguration: '[Ne]3s²3p²', electronegativity: '1,90', atomicRadius: '111 pm', ionizationEnergy: '787 kJ/mol', characteristics: 'Essencial para a eletrônica e a química dos materiais.', occurrence: 'Muito abundante na areia e nos minerais de silicato.', applications: 'Semicondutores, vidro e computadores.', curiosities: 'É o segundo elemento mais abundante na crosta terrestre.', colorClass: 'metalloids' },
    { atomicNumber: 15, symbol: 'P', name: 'Fósforo', mass: '30.974', family: 'Não metal', category: 'nonmetals', group: 15, period: 3, row: 3, col: 15, state: 'Sólido', valence: '3', electronicConfiguration: '[Ne]3s²3p³', electronegativity: '2,19', atomicRadius: '98 pm', ionizationEnergy: '1012 kJ/mol', characteristics: 'Importante para bioquímica e fertilizantes.', occurrence: 'Presente em fosfatos minerais e ossos.', applications: 'Agricultura, explosivos e produtos químicos.', curiosities: 'Existem várias formas alotrópicas, como o fósforo branco e vermelho.', colorClass: 'nonmetals' },
    { atomicNumber: 16, symbol: 'S', name: 'Enxofre', mass: '32.06', family: 'Não metal', category: 'nonmetals', group: 16, period: 3, row: 3, col: 16, state: 'Sólido', valence: '2', electronicConfiguration: '[Ne]3s²3p⁴', electronegativity: '2,58', atomicRadius: '88 pm', ionizationEnergy: '1000 kJ/mol', characteristics: 'Elemento com aplicações em química e síntese orgânica.', occurrence: 'Encontrado em vulcões, minerais e proteínas.', applications: 'Fertilizantes, produtos de limpeza e vulcanização.', curiosities: 'Contribui para o cheiro característico de ovos podres.', colorClass: 'nonmetals' },
    { atomicNumber: 17, symbol: 'Cl', name: 'Cloro', mass: '35.45', family: 'Halogênio', category: 'halogens', group: 17, period: 3, row: 3, col: 17, state: 'Gasoso', valence: '1', electronicConfiguration: '[Ne]3s²3p⁵', electronegativity: '3,16', atomicRadius: '79 pm', ionizationEnergy: '1251 kJ/mol', characteristics: 'Halogênio muito reativo e de grande aplicação química.', occurrence: 'No mar, em cloretos e sales naturais.', applications: 'Desinfecção, indústria química e produção de PVC.', curiosities: 'É usado para desinfetar piscinas e água potável.', colorClass: 'halogens' },
    { atomicNumber: 18, symbol: 'Ar', name: 'Argônio', mass: '39.95', family: 'Gás nobre', category: 'noble-gases', group: 18, period: 3, row: 3, col: 18, state: 'Gasoso', valence: '8', electronicConfiguration: '[Ne]3s²3p⁶', electronegativity: '—', atomicRadius: '71 pm', ionizationEnergy: '1521 kJ/mol', characteristics: 'Gás nobre altamente estável e pouco reativo.', occurrence: 'Presente em pequena proporção na atmosfera.', applications: 'Iluminação, soldagem e atmosfera inerte.', curiosities: 'Seu nome vem do grego “inativo”.', colorClass: 'noble-gases' },
    { atomicNumber: 19, symbol: 'K', name: 'Potássio', mass: '39.098', family: 'Metal alcalino', category: 'alkali-metals', group: 1, period: 4, row: 4, col: 1, state: 'Sólido', valence: '1', electronicConfiguration: '[Ar]4s¹', electronegativity: '0,82', atomicRadius: '243 pm', ionizationEnergy: '419 kJ/mol', characteristics: 'Muito reativo e importante para processos biológicos.', occurrence: 'Presente em minerais e no corpo humano.', applications: 'Fertilizantes e baterias de íon de potássio.', curiosities: 'É um eletrólito vital para o funcionamento celular.', colorClass: 'alkali-metals' },
    { atomicNumber: 20, symbol: 'Ca', name: 'Cálcio', mass: '40.078', family: 'Metal alcalino-terroso', category: 'alkaline-earth', group: 2, period: 4, row: 4, col: 2, state: 'Sólido', valence: '2', electronicConfiguration: '[Ar]4s²', electronegativity: '1,00', atomicRadius: '194 pm', ionizationEnergy: '590 kJ/mol', characteristics: 'Metal essencial para ossos, dentes e contrações musculares.', occurrence: 'Muito encontrado em calcário e rochas.', applications: 'Cimento, construção e bioquímica.', curiosities: 'É um dos principais elementos da concha e dos ossos.', colorClass: 'alkaline-earth' },
    { atomicNumber: 21, symbol: 'Sc', name: 'Escândio', mass: '44.956', family: 'Metal de transição', category: 'transition-metals', group: 3, period: 4, row: 4, col: 3, state: 'Sólido', valence: '3', electronicConfiguration: '[Ar]3d¹4s²', electronegativity: '1,36', atomicRadius: '184 pm', ionizationEnergy: '633 kJ/mol', characteristics: 'Metal de transição pouco abundante e muito leve.', occurrence: 'Encontrado em minérios e alguns solos.', applications: 'Ligas metálicas e iluminação especial.', curiosities: 'Seu nome é inspirado pela Escandinávia.', colorClass: 'transition-metals' },
    { atomicNumber: 22, symbol: 'Ti', name: 'Titânio', mass: '47.867', family: 'Metal de transição', category: 'transition-metals', group: 4, period: 4, row: 4, col: 4, state: 'Sólido', valence: '4', electronicConfiguration: '[Ar]3d²4s²', electronegativity: '1,54', atomicRadius: '176 pm', ionizationEnergy: '659 kJ/mol', characteristics: 'Muito resistente e leve.', occurrence: 'Presente em rutilo e ilmenita.', applications: 'Aeronáutica, implantes médicos e indústria.', curiosities: 'É resistente à corrosão e tem alta dureza.', colorClass: 'transition-metals' },
    { atomicNumber: 23, symbol: 'V', name: 'Vanádio', mass: '50.942', family: 'Metal de transição', category: 'transition-metals', group: 5, period: 4, row: 4, col: 5, state: 'Sólido', valence: '5', electronicConfiguration: '[Ar]3d³4s²', electronegativity: '1,63', atomicRadius: '134 pm', ionizationEnergy: '651 kJ/mol', characteristics: 'Metal duro e muito usado em ligas resistentes.', occurrence: 'Encontrado em minérios de vanadita.', applications: 'Aços especiais e ligas industriais.', curiosities: 'O vanádio melhora a resistência de ligas metálicas.', colorClass: 'transition-metals' },
    { atomicNumber: 24, symbol: 'Cr', name: 'Crômio', mass: '51.996', family: 'Metal de transição', category: 'transition-metals', group: 6, period: 4, row: 4, col: 6, state: 'Sólido', valence: '6', electronicConfiguration: '[Ar]3d⁵4s¹', electronegativity: '1,66', atomicRadius: '128 pm', ionizationEnergy: '653 kJ/mol', characteristics: 'Metal brilhante e muito endurecedor.', occurrence: 'Presente em cromita.', applications: 'Aço inoxidável, revestimentos e pigmentos.', curiosities: 'A coloração de pedras preciosas pode ser alterada por cromo.', colorClass: 'transition-metals' },
    { atomicNumber: 25, symbol: 'Mn', name: 'Manganês', mass: '54.938', family: 'Metal de transição', category: 'transition-metals', group: 7, period: 4, row: 4, col: 7, state: 'Sólido', valence: '7', electronicConfiguration: '[Ar]3d⁵4s²', electronegativity: '1,55', atomicRadius: '127 pm', ionizationEnergy: '717 kJ/mol', characteristics: 'Essencial para a produção de aço.', occurrence: 'Encontrado em diversos minerais.', applications: 'Aço, baterias e pigmentos.', curiosities: 'É importante na atividade de enzimas e no ciclo biológico.', colorClass: 'transition-metals' },
    { atomicNumber: 26, symbol: 'Fe', name: 'Ferro', mass: '55.845', family: 'Metal de transição', category: 'transition-metals', group: 8, period: 4, row: 4, col: 8, state: 'Sólido', valence: '2', electronicConfiguration: '[Ar]3d⁶4s²', electronegativity: '1,83', atomicRadius: '126 pm', ionizationEnergy: '763 kJ/mol', characteristics: 'Metal essencial e muito usado na construção civil.', occurrence: 'Muito abundante em minerais e roteiros geológicos.', applications: 'Estruturas metálicas, aço e maquinaria.', curiosities: 'Seu núcleo interno da Terra influencia o campo magnético.', colorClass: 'transition-metals' },
    { atomicNumber: 27, symbol: 'Co', name: 'Cobalto', mass: '58.933', family: 'Metal de transição', category: 'transition-metals', group: 9, period: 4, row: 4, col: 9, state: 'Sólido', valence: '3', electronicConfiguration: '[Ar]3d⁷4s²', electronegativity: '1,88', atomicRadius: '125 pm', ionizationEnergy: '758 kJ/mol', characteristics: 'Metal com forte resistência à corrosão.', occurrence: 'Presente em minérios e meteoritos.', applications: 'Ligas, ímãs e baterias.', curiosities: 'É usado em tintas para produção de azul distintas.', colorClass: 'transition-metals' },
    { atomicNumber: 28, symbol: 'Ni', name: 'Níquel', mass: '58.693', family: 'Metal de transição', category: 'transition-metals', group: 10, period: 4, row: 4, col: 10, state: 'Sólido', valence: '2', electronicConfiguration: '[Ar]3d⁸4s²', electronegativity: '1,91', atomicRadius: '124 pm', ionizationEnergy: '737 kJ/mol', characteristics: 'Metal dúctil, resistente e com boa condutividade.', occurrence: 'Encontrado em sulfetos e lateritas.', applications: 'Aço inoxidável, moedas e baterias.', curiosities: 'É usado em células de hidrogênio e ligas especiais.', colorClass: 'transition-metals' },
    { atomicNumber: 29, symbol: 'Cu', name: 'Cobre', mass: '63.546', family: 'Metal de transição', category: 'transition-metals', group: 11, period: 4, row: 4, col: 11, state: 'Sólido', valence: '2', electronicConfiguration: '[Ar]3d¹⁰4s¹', electronegativity: '1,90', atomicRadius: '128 pm', ionizationEnergy: '745 kJ/mol', characteristics: 'Excelente condutor elétrico e térmico.', occurrence: 'Presente em sulfetos e minerais oxidados.', applications: 'Fios elétricos, encanamentos e ligas.', curiosities: 'Seu tom avermelhado é muito reconhecível.', colorClass: 'transition-metals' },
    { atomicNumber: 30, symbol: 'Zn', name: 'Zinco', mass: '65.38', family: 'Metal de transição', category: 'transition-metals', group: 12, period: 4, row: 4, col: 12, state: 'Sólido', valence: '2', electronicConfiguration: '[Ar]3d¹⁰4s²', electronegativity: '1,65', atomicRadius: '134 pm', ionizationEnergy: '906 kJ/mol', characteristics: 'Metal usado em galvanização e ligas.', occurrence: 'Encontrado em minérios como esfalerita.', applications: 'Galvanização, ligas e produtos farmacêuticos.', curiosities: 'O zinco é essencial para a função imunológica.', colorClass: 'transition-metals' },
    { atomicNumber: 31, symbol: 'Ga', name: 'Gálio', mass: '69.723', family: 'Outros metais', category: 'post-transition', group: 13, period: 4, row: 4, col: 13, state: 'Sólido', valence: '3', electronicConfiguration: '[Ar]3d¹⁰4s²4p¹', electronegativity: '1,81', atomicRadius: '135 pm', ionizationEnergy: '579 kJ/mol', characteristics: 'Metal baixo ponto de fusão e usado em semicondutores.', occurrence: 'Muito raro, encontrado em minérios de alumínio.', applications: 'Semicondutores e materiais de alta tecnologia.', curiosities: 'Pode derreter com a temperatura da mão.', colorClass: 'post-transition' },
    { atomicNumber: 32, symbol: 'Ge', name: 'Germânio', mass: '72.630', family: 'Semimetal', category: 'metalloids', group: 14, period: 4, row: 4, col: 14, state: 'Sólido', valence: '4', electronicConfiguration: '[Ar]3d¹⁰4s²4p²', electronegativity: '2,01', atomicRadius: '122 pm', ionizationEnergy: '762 kJ/mol', characteristics: 'Semicondutor de grande importância eletrônica.', occurrence: 'Encontrado em pequenas quantidades em minérios.', applications: 'Transistores, fibras ópticas e semicondutores.', curiosities: 'Foi descoberto em 1886 e gota de temperatura baixa.', colorClass: 'metalloids' },
    { atomicNumber: 33, symbol: 'As', name: 'Arsênio', mass: '74.922', family: 'Semimetal', category: 'metalloids', group: 15, period: 4, row: 4, col: 15, state: 'Sólido', valence: '3', electronicConfiguration: '[Ar]3d¹⁰4s²4p³', electronegativity: '2,18', atomicRadius: '120 pm', ionizationEnergy: '947 kJ/mol', characteristics: 'Pode apresentar comportamento metálico e não metálico.', occurrence: 'Encontrado em sulfetos e minério de arsênio.', applications: 'Agricultura, semicondutores e ligas.', curiosities: 'Em altas doses é altamente tóxico.', colorClass: 'metalloids' },
    { atomicNumber: 34, symbol: 'Se', name: 'Selênio', mass: '78.971', family: 'Não metal', category: 'nonmetals', group: 16, period: 4, row: 4, col: 16, state: 'Sólido', valence: '2', electronicConfiguration: '[Ar]3d¹⁰4s²4p⁴', electronegativity: '2,55', atomicRadius: '116 pm', ionizationEnergy: '941 kJ/mol', characteristics: 'Elemento essencial em pequenas quantidades para organismos.', occurrence: 'Presente em minerais e em rochas vulcânicas.', applications: 'Fotocélulas, vidro e química analítica.', curiosities: 'O selênio pode parecer vermelho ou cinza, conforme a forma.', colorClass: 'nonmetals' },
    { atomicNumber: 35, symbol: 'Br', name: 'Bromo', mass: '79.904', family: 'Halogênio', category: 'halogens', group: 17, period: 4, row: 4, col: 17, state: 'Líquido', valence: '1', electronicConfiguration: '[Ar]3d¹⁰4s²4p⁵', electronegativity: '2,96', atomicRadius: '94 pm', ionizationEnergy: '1140 kJ/mol', characteristics: 'Único halogênio líquido em condições normais.', occurrence: 'Imprescindível em águas marítimas e salmoura.', applications: 'Produtos químicos, retardadores de chama e desinfecção.', curiosities: 'Emite vapores de coloração avermelhada e irritante.', colorClass: 'halogens' },
    { atomicNumber: 36, symbol: 'Kr', name: 'Criptônio', mass: '83.798', family: 'Gás nobre', category: 'noble-gases', group: 18, period: 4, row: 4, col: 18, state: 'Gasoso', valence: '8', electronicConfiguration: '[Ar]3d¹⁰4s²4p⁶', electronegativity: '—', atomicRadius: '88 pm', ionizationEnergy: '1351 kJ/mol', characteristics: 'Gás nobre de baixa reatividade.', occurrence: 'Encontrado em baixa concentração na atmosfera.', applications: 'Lâmpadas e iluminação de alta intensidade.', curiosities: 'Produz luminosidade verde em lâmpadas fluorescentes.', colorClass: 'noble-gases' },
    { atomicNumber: 37, symbol: 'Rb', name: 'Rubídio', mass: '85.468', family: 'Metal alcalino', category: 'alkali-metals', group: 1, period: 5, row: 5, col: 1, state: 'Sólido', valence: '1', electronicConfiguration: '[Kr]5s¹', electronegativity: '0,82', atomicRadius: '248 pm', ionizationEnergy: '403 kJ/mol', characteristics: 'Metal muito reativo, semelhante ao sódio e ao potássio.', occurrence: 'Presente em alguns minerais e em silvinita.', applications: 'Pesquisa científica e células atômicas.', curiosities: 'Foi identificado por espectroscopia em 1861.', colorClass: 'alkali-metals' },
    { atomicNumber: 38, symbol: 'Sr', name: 'Estrôncio', mass: '87.62', family: 'Metal alcalino-terroso', category: 'alkaline-earth', group: 2, period: 5, row: 5, col: 2, state: 'Sólido', valence: '2', electronicConfiguration: '[Kr]5s²', electronegativity: '0,95', atomicRadius: '219 pm', ionizationEnergy: '549 kJ/mol', characteristics: 'Metala alcalino-terroso usado em fogos artificiais.', occurrence: 'Presentes em minerais e rochas.', applications: 'Fogos, cerâmica e alguns materiais radioativos.', curiosities: 'É responsável por tons vermelhos em fogos.', colorClass: 'alkaline-earth' },
    { atomicNumber: 39, symbol: 'Y', name: 'Ítrio', mass: '88.906', family: 'Metal de transição', category: 'transition-metals', group: 3, period: 5, row: 5, col: 3, state: 'Sólido', valence: '3', electronicConfiguration: '[Kr]4d¹5s²', electronegativity: '1,22', atomicRadius: '212 pm', ionizationEnergy: '600 kJ/mol', characteristics: 'Metal de transição usado em materiais cerâmicos e lasers.', occurrence: 'Encontrado em minérios de terras raras.', applications: 'Lentes e ligas metálicas.', curiosities: 'É usado em leds e películas de alta tecnologia.', colorClass: 'transition-metals' },
    { atomicNumber: 40, symbol: 'Zr', name: 'Zircônio', mass: '91.224', family: 'Metal de transição', category: 'transition-metals', group: 4, period: 5, row: 5, col: 4, state: 'Sólido', valence: '4', electronicConfiguration: '[Kr]4d²5s²', electronegativity: '1,33', atomicRadius: '206 pm', ionizationEnergy: '640 kJ/mol', characteristics: 'Resistente ao calor e à corrosão.', occurrence: 'Encontrado em zircão e baddeleyita.', applications: 'Reatores nucleares e cerâmica avançada.', curiosities: 'É usado em materiais refratários.', colorClass: 'transition-metals' },
    { atomicNumber: 41, symbol: 'Nb', name: 'Nióbio', mass: '92.906', family: 'Metal de transição', category: 'transition-metals', group: 5, period: 5, row: 5, col: 5, state: 'Sólido', valence: '5', electronicConfiguration: '[Kr]4d⁴5s¹', electronegativity: '1,60', atomicRadius: '198 pm', ionizationEnergy: '652 kJ/mol', characteristics: 'Metal usado em ligas resistentes e de alta temperatura.', occurrence: 'Presente em columbita-tantalita.', applications: 'Aço, superligas e grandes estruturas.', curiosities: 'Aplicações em alta temperatura e materiais aeronáuticos.', colorClass: 'transition-metals' },
    { atomicNumber: 42, symbol: 'Mo', name: 'Molibdênio', mass: '95.95', family: 'Metal de transição', category: 'transition-metals', group: 6, period: 5, row: 5, col: 6, state: 'Sólido', valence: '6', electronicConfiguration: '[Kr]4d⁵5s¹', electronegativity: '2,16', atomicRadius: '190 pm', ionizationEnergy: '684 kJ/mol', characteristics: 'Alta resistência à temperatura e ao desgaste.', occurrence: 'Encontrado em molibdenita.', applications: 'Aços, catalisadores e lubrificantes.', curiosities: 'É essencial para enzimas que participam do metabolismo do nitrogênio.', colorClass: 'transition-metals' },
    { atomicNumber: 43, symbol: 'Tc', name: 'Tecnécio', mass: '[98]', family: 'Metal de transição', category: 'transition-metals', group: 7, period: 5, row: 5, col: 7, state: 'Sólido', valence: '7', electronicConfiguration: '[Kr]4d⁵5s²', electronegativity: '1,9', atomicRadius: '183 pm', ionizationEnergy: '702 kJ/mol', characteristics: 'Elemento sintético, radioativo e importante em medicina nuclear.', occurrence: 'Produzido artificialmente em reatores nucleares.', applications: 'Diagnóstico por imagem e terapia oncológica.', curiosities: 'É o primeiro elemento artificial produzido em laboratório.', colorClass: 'transition-metals' },
    { atomicNumber: 44, symbol: 'Ru', name: 'Rutênio', mass: '101.07', family: 'Metal de transição', category: 'transition-metals', group: 8, period: 5, row: 5, col: 8, state: 'Sólido', valence: '3', electronicConfiguration: '[Kr]4d⁷5s¹', electronegativity: '2,2', atomicRadius: '178 pm', ionizationEnergy: '711 kJ/mol', characteristics: 'Metal duro e resistente.', occurrence: 'Presente em minérios de platina.', applications: 'Catalisadores, contatos elétricos e eletrônica.', curiosities: 'É usado em ligas resistentes ao calor.', colorClass: 'transition-metals' },
    { atomicNumber: 45, symbol: 'Rh', name: 'Ródio', mass: '102.91', family: 'Metal de transição', category: 'transition-metals', group: 9, period: 5, row: 5, col: 9, state: 'Sólido', valence: '3', electronicConfiguration: '[Kr]4d⁸5s¹', electronegativity: '2,28', atomicRadius: '173 pm', ionizationEnergy: '719 kJ/mol', characteristics: 'Muito resistente à corrosão e ao calor.', occurrence: 'Encontrado em ligas de platina.', applications: 'Catalisadores automotivos e materiais de alta tecnologia.', curiosities: 'É um dos metais mais caros do mundo.', colorClass: 'transition-metals' },
    { atomicNumber: 46, symbol: 'Pd', name: 'Paládio', mass: '106.42', family: 'Metal de transição', category: 'transition-metals', group: 10, period: 5, row: 5, col: 10, state: 'Sólido', valence: '2', electronicConfiguration: '[Kr]4d¹⁰', electronegativity: '2,20', atomicRadius: '169 pm', ionizationEnergy: '804 kJ/mol', characteristics: 'Excelente capacidade de adsorver gases.', occurrence: 'Presente em minérios de platina.', applications: 'Catalisadores e dispositivos eletrônicos.', curiosities: 'É utilizado em sensores e tecnologias de conversão.', colorClass: 'transition-metals' },
    { atomicNumber: 47, symbol: 'Ag', name: 'Prata', mass: '107.87', family: 'Metal de transição', category: 'transition-metals', group: 11, period: 5, row: 5, col: 11, state: 'Sólido', valence: '1', electronicConfiguration: '[Kr]4d¹⁰5s¹', electronegativity: '1,93', atomicRadius: '144 pm', ionizationEnergy: '731 kJ/mol', characteristics: 'Excelente condutora de calor e eletricidade.', occurrence: 'Presente em pratas nativas e minérios.', applications: 'Joias, contatos elétricos e espelhos.', curiosities: 'Tem a maior condutividade elétrica entre os metais.', colorClass: 'transition-metals' },
    { atomicNumber: 48, symbol: 'Cd', name: 'Cádmio', mass: '112.41', family: 'Metal de transição', category: 'transition-metals', group: 12, period: 5, row: 5, col: 12, state: 'Sólido', valence: '2', electronicConfiguration: '[Kr]4d¹⁰5s²', electronegativity: '1,69', atomicRadius: '149 pm', ionizationEnergy: '868 kJ/mol', characteristics: 'Metal tóxico e com aplicação em baterias.', occurrence: 'Encontrado em alguns minerais de zinco.', applications: 'Baterias e pigmentos.', curiosities: 'É considerado um metal tóxico e ambientalmente preocupante.', colorClass: 'transition-metals' },
    { atomicNumber: 49, symbol: 'In', name: 'Índio', mass: '114.82', family: 'Outros metais', category: 'post-transition', group: 13, period: 5, row: 5, col: 13, state: 'Sólido', valence: '3', electronicConfiguration: '[Kr]4d¹⁰5s²5p¹', electronegativity: '1,78', atomicRadius: '167 pm', ionizationEnergy: '558 kJ/mol', characteristics: 'Metal usado em telas de cristal líquido e semicondutores.', occurrence: 'Encontrado em minérios de zinco e estanho.', applications: 'Telas sensíveis ao toque e circuitos eletrônicos.', curiosities: 'Pode fundir-se em temperaturas relativamente baixas.', colorClass: 'post-transition' },
    { atomicNumber: 50, symbol: 'Sn', name: 'Estanho', mass: '118.71', family: 'Outros metais', category: 'post-transition', group: 14, period: 5, row: 5, col: 14, state: 'Sólido', valence: '4', electronicConfiguration: '[Kr]4d¹⁰5s²5p²', electronegativity: '1,96', atomicRadius: '145 pm', ionizationEnergy: '708 kJ/mol', characteristics: 'Metal maleável e resistente à corrosão.', occurrence: 'Encontrado em minério de cassiterita.', applications: 'Latas, soldas e revestimentos.', curiosities: 'A liga de estanho com chumbo forma solda.', colorClass: 'post-transition' },
    { atomicNumber: 51, symbol: 'Sb', name: 'Antimônio', mass: '121.76', family: 'Semimetal', category: 'metalloids', group: 15, period: 5, row: 5, col: 15, state: 'Sólido', valence: '3', electronicConfiguration: '[Kr]4d¹⁰5s²5p³', electronegativity: '2,05', atomicRadius: '133 pm', ionizationEnergy: '834 kJ/mol', characteristics: 'Metaloide conhecido por baixa condutividade elétrica.', occurrence: 'Presente em minérios sulfetados.', applications: 'Fogo de artifício e materiais resistentes.', curiosities: 'É usado em ligas de chumbo para reforço mecânico.', colorClass: 'metalloids' },
    { atomicNumber: 52, symbol: 'Te', name: 'Telúrio', mass: '127.60', family: 'Semimetal', category: 'metalloids', group: 16, period: 5, row: 5, col: 16, state: 'Sólido', valence: '2', electronicConfiguration: '[Kr]4d¹⁰5s²5p⁴', electronegativity: '2,10', atomicRadius: '123 pm', ionizationEnergy: '869 kJ/mol', characteristics: 'Metaloide com propriedades semicondutoras.', occurrence: 'Encontrado em minérios de cobre e chumbo.', applications: 'Semicondutores, vidro e pigmentos.', curiosities: 'Seu nome lembra a Terra (tellus em latim).', colorClass: 'metalloids' },
    { atomicNumber: 53, symbol: 'I', name: 'Iodo', mass: '126.90', family: 'Halogênio', category: 'halogens', group: 17, period: 5, row: 5, col: 17, state: 'Sólido', valence: '1', electronicConfiguration: '[Kr]4d¹⁰5s²5p⁵', electronegativity: '2,66', atomicRadius: '115 pm', ionizationEnergy: '1008 kJ/mol', characteristics: 'Halogênio sólido e essencial para a saúde.', occurrence: 'Presente em algas marinhas e em águas salgadas.', applications: 'Desinfecção, medicamentos e química analítica.', curiosities: 'É essencial para a produção de hormônios tireoidianos.', colorClass: 'halogens' },
    { atomicNumber: 54, symbol: 'Xe', name: 'Xenônio', mass: '131.29', family: 'Gás nobre', category: 'noble-gases', group: 18, period: 5, row: 5, col: 18, state: 'Gasoso', valence: '8', electronicConfiguration: '[Kr]4d¹⁰5s²5p⁶', electronegativity: '—', atomicRadius: '108 pm', ionizationEnergy: '1170 kJ/mol', characteristics: 'Gás nobre com alguns compostos estáveis em condições especiais.', occurrence: 'Presente em pequenas concentrações na atmosfera.', applications: 'Lâmpadas de flash e fontes de iluminação.', curiosities: 'Pode formar compostos com flúor em laboratório.', colorClass: 'noble-gases' },
    { atomicNumber: 55, symbol: 'Cs', name: 'Césio', mass: '132.91', family: 'Metal alcalino', category: 'alkali-metals', group: 1, period: 6, row: 6, col: 1, state: 'Sólido', valence: '1', electronicConfiguration: '[Xe]6s¹', electronegativity: '0,79', atomicRadius: '265 pm', ionizationEnergy: '376 kJ/mol', characteristics: 'Metal alcalino extremamente reativo e sensível à luz.', occurrence: 'Presente em minerais e salmouras.', applications: 'Relógios atômicos e instrumentos de medição.', curiosities: 'Seu nome vem do latim caesius, “azul-celeste”.', colorClass: 'alkali-metals' },
    { atomicNumber: 56, symbol: 'Ba', name: 'Bário', mass: '137.33', family: 'Metal alcalino-terroso', category: 'alkaline-earth', group: 2, period: 6, row: 6, col: 2, state: 'Sólido', valence: '2', electronicConfiguration: '[Xe]6s²', electronegativity: '0,89', atomicRadius: '222 pm', ionizationEnergy: '503 kJ/mol', characteristics: 'Metal pesado usado em alguns materiais de alta densidade.', occurrence: 'Encontrado em minerais e rochas.', applications: 'Pinturas, óxidos e materiais inflamáveis.', curiosities: 'Os sais de bário são usados para exames radiológicos.', colorClass: 'alkaline-earth' },
    { atomicNumber: 57, symbol: 'La', name: 'Lantânio', mass: '138.91', family: 'Lantanídeo', category: 'lanthanides', group: 3, period: 6, row: 6, col: 3, state: 'Sólido', valence: '3', electronicConfiguration: '[Xe]5d¹6s²', electronegativity: '1,10', atomicRadius: '212 pm', ionizationEnergy: '538 kJ/mol', characteristics: 'Elemento de transição interna classificado como lantanídeo.', occurrence: 'Presente em terras raras e monazita.', applications: 'Lentes, baterias e materiais de alta tecnologia.', curiosities: 'É um elemento-chave em muito material óptico.', colorClass: 'lanthanides' },
    { atomicNumber: 58, symbol: 'Ce', name: 'Cério', mass: '140.12', family: 'Lantanídeo', category: 'lanthanides', group: 3, period: 6, row: 8, col: 4, state: 'Sólido', valence: '3', electronicConfiguration: '[Xe]4f¹5d¹6s²', electronegativity: '1,12', atomicRadius: '181 pm', ionizationEnergy: '534 kJ/mol', characteristics: 'Lantanídeo muito usado em catalisadores.', occurrence: 'Presente em minerais de terras raras.', applications: 'Catalisadores, vidros e cerâmicas.', curiosities: 'É usado em óculos de solda por bloquear raios UV.', colorClass: 'lanthanides' },
    { atomicNumber: 59, symbol: 'Pr', name: 'Praseodímio', mass: '140.91', family: 'Lantanídeo', category: 'lanthanides', group: 3, period: 6, row: 8, col: 5, state: 'Sólido', valence: '3', electronicConfiguration: '[Xe]4f³6s²', electronegativity: '1,13', atomicRadius: '182 pm', ionizationEnergy: '527 kJ/mol', characteristics: 'Elemento usado em ligas magnéticas e materiais ópticos.', occurrence: 'Encontrado em terras raras.', applications: 'Lentes e ímãs fortes.', curiosities: 'Possui coloração verde na maioria de seus compostos.', colorClass: 'lanthanides' },
    { atomicNumber: 60, symbol: 'Nd', name: 'Neodímio', mass: '144.24', family: 'Lantanídeo', category: 'lanthanides', group: 3, period: 6, row: 8, col: 6, state: 'Sólido', valence: '3', electronicConfiguration: '[Xe]4f⁴6s²', electronegativity: '1,14', atomicRadius: '181 pm', ionizationEnergy: '533 kJ/mol', characteristics: 'Elemento muito usado em ímãs permanentes.', occurrence: 'Presente em minérios de terras raras.', applications: 'Ímãs, alto-falantes e motores.', curiosities: 'É um dos componentes de ímãs fortes.', colorClass: 'lanthanides' },
    { atomicNumber: 61, symbol: 'Pm', name: 'Promécio', mass: '[145]', family: 'Lantanídeo', category: 'lanthanides', group: 3, period: 6, row: 8, col: 7, state: 'Sólido', valence: '3', electronicConfiguration: '[Xe]4f⁵6s²', electronegativity: '1,13', atomicRadius: '183 pm', ionizationEnergy: '540 kJ/mol', characteristics: 'Elemento radioativo de uso específico.', occurrence: 'Produzido artificialmente.', applications: 'Luzes de baixa energia e pesquisa.', curiosities: 'Não é encontrado naturalmente em grande quantidade.', colorClass: 'lanthanides' },
    { atomicNumber: 62, symbol: 'Sm', name: 'Samário', mass: '150.36', family: 'Lantanídeo', category: 'lanthanides', group: 3, period: 6, row: 8, col: 8, state: 'Sólido', valence: '3', electronicConfiguration: '[Xe]4f⁶6s²', electronegativity: '1,17', atomicRadius: '180 pm', ionizationEnergy: '543 kJ/mol', characteristics: 'Componente de ímãs especiais e materiais de alta tecnologia.', occurrence: 'Presente em minerais de terras raras.', applications: 'Ímãs de alta performance e lasers.', curiosities: 'É usado em sensores e instrumentos especiais.', colorClass: 'lanthanides' },
    { atomicNumber: 63, symbol: 'Eu', name: 'Európio', mass: '151.96', family: 'Lantanídeo', category: 'lanthanides', group: 3, period: 6, row: 8, col: 9, state: 'Sólido', valence: '3', electronicConfiguration: '[Xe]4f⁷6s²', electronegativity: '1,20', atomicRadius: '180 pm', ionizationEnergy: '547 kJ/mol', characteristics: 'Elemento muito usado em telas e iluminação de alta eficiência.', occurrence: 'Presente em minerais de terras raras.', applications: 'Todos os tipos de telas e laser.', curiosities: 'É usado em dispositivos fluorescentes e fósforos.', colorClass: 'lanthanides' },
    { atomicNumber: 64, symbol: 'Gd', name: 'Gadolínio', mass: '157.25', family: 'Lantanídeo', category: 'lanthanides', group: 3, period: 6, row: 8, col: 10, state: 'Sólido', valence: '3', electronicConfiguration: '[Xe]4f⁷5d¹6s²', electronegativity: '1,20', atomicRadius: '180 pm', ionizationEnergy: '593 kJ/mol', characteristics: 'Metal usado em contrastes de ressonância magnética.', occurrence: 'Presente em terras raras.', applications: 'Imagens médicas e materiais magnéticos.', curiosities: 'Possui propriedades magnéticas únicas.', colorClass: 'lanthanides' },
    { atomicNumber: 65, symbol: 'Tb', name: 'Térbio', mass: '158.93', family: 'Lantanídeo', category: 'lanthanides', group: 3, period: 6, row: 8, col: 11, state: 'Sólido', valence: '3', electronicConfiguration: '[Xe]4f⁹6s²', electronegativity: '1,20', atomicRadius: '177 pm', ionizationEnergy: '565 kJ/mol', characteristics: 'Elemento usado em dispositivos de exibição e laser.', occurrence: 'Encontrado em minerais de terras raras.', applications: 'Tela de computador e materiais de alta tecnologia.', curiosities: 'É importante para a emissão de luz verde em telas.', colorClass: 'lanthanides' },
    { atomicNumber: 66, symbol: 'Dy', name: 'Disprósio', mass: '162.50', family: 'Lantanídeo', category: 'lanthanides', group: 3, period: 6, row: 8, col: 12, state: 'Sólido', valence: '3', electronicConfiguration: '[Xe]4f¹⁰6s²', electronegativity: '1,22', atomicRadius: '178 pm', ionizationEnergy: '573 kJ/mol', characteristics: 'Usado em ímãs e cerâmicas avançadas.', occurrence: 'Presente em minerais de terras raras.', applications: 'Ímãs de alto desempenho.', curiosities: 'Possui propriedades magnéticas muito fortes.', colorClass: 'lanthanides' },
    { atomicNumber: 67, symbol: 'Ho', name: 'Holmio', mass: '164.93', family: 'Lantanídeo', category: 'lanthanides', group: 3, period: 6, row: 8, col: 13, state: 'Sólido', valence: '3', electronicConfiguration: '[Xe]4f¹¹6s²', electronegativity: '1,23', atomicRadius: '176 pm', ionizationEnergy: '581 kJ/mol', characteristics: 'Usado em lasers de alta potência.', occurrence: 'Encontrado em minérios de terras raras.', applications: 'Laser, dispositivos magnéticos e nuclear.', curiosities: 'É importante em isolamento magnético.', colorClass: 'lanthanides' },
    { atomicNumber: 68, symbol: 'Er', name: 'Erbium', mass: '167.26', family: 'Lantanídeo', category: 'lanthanides', group: 3, period: 6, row: 8, col: 14, state: 'Sólido', valence: '3', electronicConfiguration: '[Xe]4f¹²6s²', electronegativity: '1,24', atomicRadius: '176 pm', ionizationEnergy: '589 kJ/mol', characteristics: 'Elemento com excelente desempenho em lasers de fibra.', occurrence: 'Presente em terras raras.', applications: 'Lasers e fibra óptica.', curiosities: 'Produz uma cor rosa em alguns materiais.', colorClass: 'lanthanides' },
    { atomicNumber: 69, symbol: 'Tm', name: 'Túlio', mass: '168.93', family: 'Lantanídeo', category: 'lanthanides', group: 3, period: 6, row: 8, col: 15, state: 'Sólido', valence: '3', electronicConfiguration: '[Xe]4f¹³6s²', electronegativity: '1,25', atomicRadius: '175 pm', ionizationEnergy: '597 kJ/mol', characteristics: 'Elemento raro, usado em pesquisas e lasers.', occurrence: 'Encontrado em minérios de terras raras.', applications: 'Laser e tecnologia de precisão.', curiosities: 'É usado em dispositivos de alta sensibilidade.', colorClass: 'lanthanides' },
    { atomicNumber: 70, symbol: 'Yb', name: 'Itérbio', mass: '173.05', family: 'Lantanídeo', category: 'lanthanides', group: 3, period: 6, row: 8, col: 16, state: 'Sólido', valence: '3', electronicConfiguration: '[Xe]4f¹⁴6s²', electronegativity: '1,10', atomicRadius: '174 pm', ionizationEnergy: '603 kJ/mol', characteristics: 'Lantanídeo usado em materiais eletrônicos e ópticos.', occurrence: 'Encontrado em minerais de terras raras.', applications: 'Fibras ópticas e lasers.', curiosities: 'É usado em certos tipos de materiais superconductores.', colorClass: 'lanthanides' },
    { atomicNumber: 71, symbol: 'Lu', name: 'Lutécio', mass: '174.97', family: 'Lantanídeo', category: 'lanthanides', group: 3, period: 6, row: 8, col: 17, state: 'Sólido', valence: '3', electronicConfiguration: '[Xe]4f¹⁴5d¹6s²', electronegativity: '1,27', atomicRadius: '173 pm', ionizationEnergy: '523 kJ/mol', characteristics: 'Lantanídeo final do período com aplicações de alta tecnologia.', occurrence: 'Encontrado em minerais de terras raras.', applications: 'Pesquisas científicas e materiais avançados.', curiosities: 'É usado em materiais de alta densidade e reações de precisão.', colorClass: 'lanthanides' },
    { atomicNumber: 72, symbol: 'Hf', name: 'Háfnio', mass: '178.49', family: 'Metal de transição', category: 'transition-metals', group: 4, period: 6, row: 6, col: 4, state: 'Sólido', valence: '4', electronicConfiguration: '[Xe]4f¹⁴5d²6s²', electronegativity: '1,30', atomicRadius: '159 pm', ionizationEnergy: '659 kJ/mol', characteristics: 'Metal de alta resistência e elevado ponto de fusão.', occurrence: 'Encontrado em zircônio e minérios associados.', applications: 'Reatores nucleares e materiais refratários.', curiosities: 'É muito resistente ao calor.', colorClass: 'transition-metals' },
    { atomicNumber: 73, symbol: 'Ta', name: 'Tântalo', mass: '180.95', family: 'Metal de transição', category: 'transition-metals', group: 5, period: 6, row: 6, col: 5, state: 'Sólido', valence: '5', electronicConfiguration: '[Xe]4f¹⁴5d³6s²', electronegativity: '1,50', atomicRadius: '146 pm', ionizationEnergy: '761 kJ/mol', characteristics: 'Metal muito resistente e altamente estável.', occurrence: 'Presente em minerais e rochas.', applications: 'Eletrônica e materiais de alta temperatura.', curiosities: 'O nome vem da figura mitológica Tântalo.', colorClass: 'transition-metals' },
    { atomicNumber: 74, symbol: 'W', name: 'Tungstênio', mass: '183.84', family: 'Metal de transição', category: 'transition-metals', group: 6, period: 6, row: 6, col: 6, state: 'Sólido', valence: '6', electronicConfiguration: '[Xe]4f¹⁴5d⁴6s²', electronegativity: '2,36', atomicRadius: '139 pm', ionizationEnergy: '770 kJ/mol', characteristics: 'Possui o maior ponto de fusão entre os metais.', occurrence: 'Encontrado em volframita e scheelita.', applications: 'Filamentos, ferramentas de corte e ligas.', curiosities: 'Seu alto ponto de fusão permite uso em filamentos de lâmpadas.', colorClass: 'transition-metals' },
    { atomicNumber: 75, symbol: 'Re', name: 'Rênio', mass: '186.21', family: 'Metal de transição', category: 'transition-metals', group: 7, period: 6, row: 6, col: 7, state: 'Sólido', valence: '7', electronicConfiguration: '[Xe]4f¹⁴5d⁵6s²', electronegativity: '1,90', atomicRadius: '137 pm', ionizationEnergy: '760 kJ/mol', characteristics: 'Metal raro e muito resistente ao calor.', occurrence: 'Encontra-se em minérios raros.', applications: 'Aço e materiais de alta temperatura.', curiosities: 'É usado em motores de foguetes e turbinas.', colorClass: 'transition-metals' },
    { atomicNumber: 76, symbol: 'Os', name: 'Ósmio', mass: '190.23', family: 'Metal de transição', category: 'transition-metals', group: 8, period: 6, row: 6, col: 8, state: 'Sólido', valence: '4', electronicConfiguration: '[Xe]4f¹⁴5d⁶6s²', electronegativity: '2,20', atomicRadius: '134 pm', ionizationEnergy: '840 kJ/mol', characteristics: 'Um dos metais de maior densidade.', occurrence: 'Presente em minérios de platina.', applications: 'Pontas de caneta e materiais de alta densidade.', curiosities: 'Uma das ligas mais densas da natureza.', colorClass: 'transition-metals' },
    { atomicNumber: 77, symbol: 'Ir', name: 'Irídio', mass: '192.22', family: 'Metal de transição', category: 'transition-metals', group: 9, period: 6, row: 6, col: 9, state: 'Sólido', valence: '4', electronicConfiguration: '[Xe]4f¹⁴5d⁷6s²', electronegativity: '2,20', atomicRadius: '136 pm', ionizationEnergy: '880 kJ/mol', characteristics: 'Metal muito resistente ao calor e corrosão.', occurrence: 'Encontrado em minérios de platina.', applications: 'Ligas resistentes e instrumentos de precisão.', curiosities: 'É muito difícil de corroer em condições normais.', colorClass: 'transition-metals' },
    { atomicNumber: 78, symbol: 'Pt', name: 'Platina', mass: '195.08', family: 'Metal de transição', category: 'transition-metals', group: 10, period: 6, row: 6, col: 10, state: 'Sólido', valence: '2', electronicConfiguration: '[Xe]4f¹⁴5d⁹6s¹', electronegativity: '2,28', atomicRadius: '139 pm', ionizationEnergy: '870 kJ/mol', characteristics: 'Metal nobre, brilhante e resistente à corrosão.', occurrence: 'Presente em depósitos de platina.', applications: 'Catalisadores, joias e eletrônica.', curiosities: 'Muito usada em conversores catalíticos automotivos.', colorClass: 'transition-metals' },
    { atomicNumber: 79, symbol: 'Au', name: 'Ouro', mass: '196.97', family: 'Metal de transição', category: 'transition-metals', group: 11, period: 6, row: 6, col: 11, state: 'Sólido', valence: '3', electronicConfiguration: '[Xe]4f¹⁴5d¹⁰6s¹', electronegativity: '2,54', atomicRadius: '144 pm', ionizationEnergy: '890 kJ/mol', characteristics: 'Metal precioso, brilhante e altamente maleável.', occurrence: 'Presente em veios mineralizados e aluviões.', applications: 'Joias, eletrônica e finanças.', curiosities: 'É altamente resistente à corrosão e à oxidação.', colorClass: 'transition-metals' },
    { atomicNumber: 80, symbol: 'Hg', name: 'Mercúrio', mass: '200.59', family: 'Metal de transição', category: 'transition-metals', group: 12, period: 6, row: 6, col: 12, state: 'Líquido', valence: '2', electronicConfiguration: '[Xe]4f¹⁴5d¹⁰6s²', electronegativity: '2,00', atomicRadius: '155 pm', ionizationEnergy: '1007 kJ/mol', characteristics: 'Único metal líquido em temperatura ambiente.', occurrence: 'Presente em minérios e em depósitos naturais.', applications: 'Termômetros, instrumentos e processos industriais.', curiosities: 'É tóxico, exigindo cuidado na manipulação e descarte.', colorClass: 'transition-metals' },
    { atomicNumber: 81, symbol: 'Tl', name: 'Tálio', mass: '204.38', family: 'Outros metais', category: 'post-transition', group: 13, period: 6, row: 6, col: 13, state: 'Sólido', valence: '3', electronicConfiguration: '[Xe]4f¹⁴5d¹⁰6s²6p¹', electronegativity: '1,62', atomicRadius: '190 pm', ionizationEnergy: '589 kJ/mol', characteristics: 'Metal pesado, extremamente tóxico.', occurrence: 'Presente em minérios de zinco e chumbo.', applications: 'Eletrônica e semicondutores especiais.', curiosities: 'Seu uso é restrito por ser altamente tóxico.', colorClass: 'post-transition' },
    { atomicNumber: 82, symbol: 'Pb', name: 'Chumbo', mass: '207.2', family: 'Outros metais', category: 'post-transition', group: 14, period: 6, row: 6, col: 14, state: 'Sólido', valence: '2', electronicConfiguration: '[Xe]4f¹⁴5d¹⁰6s²6p²', electronegativity: '2,33', atomicRadius: '175 pm', ionizationEnergy: '716 kJ/mol', characteristics: 'Metal denso e maleável, muito usado historicamente.', occurrence: 'Presente em minérios de galena.', applications: 'Baterias, blindagens e radioproteção.', curiosities: 'É tóxico e seu uso foi reduzido em várias aplicações.', colorClass: 'post-transition' },
    { atomicNumber: 83, symbol: 'Bi', name: 'Bismuto', mass: '208.98', family: 'Semimetal', category: 'metalloids', group: 15, period: 6, row: 6, col: 15, state: 'Sólido', valence: '3', electronicConfiguration: '[Xe]4f¹⁴5d¹⁰6s²6p³', electronegativity: '2,02', atomicRadius: '155 pm', ionizationEnergy: '703 kJ/mol', characteristics: 'Metal pesado, pouco reativo e com baixa toxicidade relativa.', occurrence: 'Encontrado em minérios e em concentrações pequenas.', applications: 'Ligas, medicamentos e materiais especiais.', curiosities: 'É utilizado em alguns medicamentos para o trato digestivo.', colorClass: 'metalloids' },
    { atomicNumber: 84, symbol: 'Po', name: 'Polônio', mass: '[209]', family: 'Semimetal', category: 'metalloids', group: 16, period: 6, row: 6, col: 16, state: 'Sólido', valence: '2', electronicConfiguration: '[Xe]4f¹⁴5d¹⁰6s²6p⁴', electronegativity: '2,00', atomicRadius: '167 pm', ionizationEnergy: '812 kJ/mol', characteristics: 'Elemento radioativo, extremamente perigoso em alta concentração.', occurrence: 'Produzido em processos radioativos.', applications: 'Pesquisas nucleares e instrumentação especial.', curiosities: 'É produzido como subproduto da cadeia do urânio.', colorClass: 'metalloids' },
    { atomicNumber: 85, symbol: 'At', name: 'Astato', mass: '[210]', family: 'Halogênio', category: 'halogens', group: 17, period: 6, row: 6, col: 17, state: 'Sólido', valence: '1', electronicConfiguration: '[Xe]4f¹⁴5d¹⁰6s²6p⁵', electronegativity: '2,20', atomicRadius: '145 pm', ionizationEnergy: '890 kJ/mol', characteristics: 'Halogênio raro e radioativo.', occurrence: 'Formado por decomposição de elementos pesados.', applications: 'Pesquisa nuclear e terapia específica.', curiosities: 'É extremamente raro na natureza.', colorClass: 'halogens' },
    { atomicNumber: 86, symbol: 'Rn', name: 'Radônio', mass: '[222]', family: 'Gás nobre', category: 'noble-gases', group: 18, period: 6, row: 6, col: 18, state: 'Gasoso', valence: '8', electronicConfiguration: '[Xe]4f¹⁴5d¹⁰6s²6p⁶', electronegativity: '—', atomicRadius: '120 pm', ionizationEnergy: '1037 kJ/mol', characteristics: 'Gás radioativo, pouco estável e perigoso.', occurrence: 'Produzido por decaimento do rádio.', applications: 'Avaliação geológica e pesquisa.', curiosities: 'Seu nome deriva do “rádio” e é considerado radioativo.', colorClass: 'noble-gases' },
    { atomicNumber: 87, symbol: 'Fr', name: 'Frâncio', mass: '[223]', family: 'Metal alcalino', category: 'alkali-metals', group: 1, period: 7, row: 7, col: 1, state: 'Sólido', valence: '1', electronicConfiguration: '[Rn]7s¹', electronegativity: '0,70', atomicRadius: '260 pm', ionizationEnergy: '380 kJ/mol', characteristics: 'Metal radioativo extremamente raro e muito reativo.', occurrence: 'Produzido por decaimento natural do actínio.', applications: 'Pesquisa científica e química básica.', curiosities: 'É o menos estável dos metais alcalinos.', colorClass: 'alkali-metals' },
    { atomicNumber: 88, symbol: 'Ra', name: 'Rádio', mass: '[226]', family: 'Metal alcalino-terroso', category: 'alkaline-earth', group: 2, period: 7, row: 7, col: 2, state: 'Sólido', valence: '2', electronicConfiguration: '[Rn]7s²', electronegativity: '0,9', atomicRadius: '233 pm', ionizationEnergy: '509 kJ/mol', characteristics: 'Metal radioativo encontrado em minerais uraníferos.', occurrence: 'Produzido por decaimento do urânio.', applications: 'Pesquisa nuclear e medicina.', curiosities: 'Foi usado em iluminações antigas.', colorClass: 'alkaline-earth' },
    { atomicNumber: 89, symbol: 'Ac', name: 'Actínio', mass: '[227]', family: 'Actinídeo', category: 'actinides', group: 3, period: 7, row: 7, col: 3, state: 'Sólido', valence: '3', electronicConfiguration: '[Rn]6d¹7s²', electronegativity: '1,10', atomicRadius: '215 pm', ionizationEnergy: '499 kJ/mol', characteristics: 'Elemento radioativo do bloco f.', occurrence: 'Encontrado em urânio e em minerais radioativos.', applications: 'Pesquisa nuclear e aplicações especiais.', curiosities: 'É o primeiro elemento do bloco dos actinídeos.', colorClass: 'actinides' },
    { atomicNumber: 90, symbol: 'Th', name: 'Tório', mass: '232.04', family: 'Actinídeo', category: 'actinides', group: 3, period: 7, row: 9, col: 4, state: 'Sólido', valence: '4', electronicConfiguration: '[Rn]6d²7s²', electronegativity: '1,30', atomicRadius: '180 pm', ionizationEnergy: '587 kJ/mol', characteristics: 'Elemento radioativo com potencial em energia nuclear.', occurrence: 'Presente em monazita e bastnasita.', applications: 'Energia nuclear e materiais especiais.', curiosities: 'É muito mais abundante que o urânio em algumas rochas.', colorClass: 'actinides' },
    { atomicNumber: 91, symbol: 'Pa', name: 'Protactínio', mass: '231.04', family: 'Actinídeo', category: 'actinides', group: 3, period: 7, row: 9, col: 5, state: 'Sólido', valence: '5', electronicConfiguration: '[Rn]5f²6d¹7s²', electronegativity: '1,50', atomicRadius: '163 pm', ionizationEnergy: '568 kJ/mol', characteristics: 'Elemento radioativo e pouco estável.', occurrence: 'Formado por decaimento do urânio.', applications: 'Pesquisas nucleares e química dos elementos pesados.', curiosities: 'Foi criado como parte de estudos sobre radioatividade.', colorClass: 'actinides' },
    { atomicNumber: 92, symbol: 'U', name: 'Urânio', mass: '238.03', family: 'Actinídeo', category: 'actinides', group: 3, period: 7, row: 9, col: 6, state: 'Sólido', valence: '6', electronicConfiguration: '[Rn]5f³6d¹7s²', electronegativity: '1,38', atomicRadius: '156 pm', ionizationEnergy: '598 kJ/mol', characteristics: 'Elemento radioativo de extrema importância nuclear.', occurrence: 'Presente em minerais como uraninita.', applications: 'Energia nuclear e armamento histórico.', curiosities: 'É usado em reatores nucleares para fissão controlada.', colorClass: 'actinides' },
    { atomicNumber: 93, symbol: 'Np', name: 'Neptúnio', mass: '[237]', family: 'Actinídeo', category: 'actinides', group: 3, period: 7, row: 9, col: 7, state: 'Sólido', valence: '5', electronicConfiguration: '[Rn]5f⁴6d¹7s²', electronegativity: '1,36', atomicRadius: '155 pm', ionizationEnergy: '600 kJ/mol', characteristics: 'Elemento sintético e radioativo.', occurrence: 'Produzido em reatores nucleares.', applications: 'Pesquisa nucleares e materiais especiais.', curiosities: 'Foi nomeado em homenagem a Netuno.', colorClass: 'actinides' },
    { atomicNumber: 94, symbol: 'Pu', name: 'Plutônio', mass: '[244]', family: 'Actinídeo', category: 'actinides', group: 3, period: 7, row: 9, col: 8, state: 'Sólido', valence: '4', electronicConfiguration: '[Rn]5f⁶7s²', electronegativity: '1,28', atomicRadius: '159 pm', ionizationEnergy: '584 kJ/mol', characteristics: 'Elemento radioativo e combustível nuclear.', occurrence: 'Produzido artificialmente em reatores.', applications: 'Energia e armas nucleares históricas.', curiosities: 'É um dos actinídeos mais conhecidos em contextos militares.', colorClass: 'actinides' },
    { atomicNumber: 95, symbol: 'Am', name: 'Amerício', mass: '[243]', family: 'Actinídeo', category: 'actinides', group: 3, period: 7, row: 9, col: 9, state: 'Sólido', valence: '3', electronicConfiguration: '[Rn]5f⁷7s²', electronegativity: '1,30', atomicRadius: '180 pm', ionizationEnergy: '578 kJ/mol', characteristics: 'Elemento sintético usado em fontes emissoras de energia.', occurrence: 'Produzido artificialmente.', applications: 'Detectores de fumaça e energia portátil.', curiosities: 'É utilizado em detectores de fumaça e as fontes de ionização.', colorClass: 'actinides' },
    { atomicNumber: 96, symbol: 'Cm', name: 'Cúrio', mass: '[247]', family: 'Actinídeo', category: 'actinides', group: 3, period: 7, row: 9, col: 10, state: 'Sólido', valence: '3', electronicConfiguration: '[Rn]5f⁷6d¹7s²', electronegativity: '1,30', atomicRadius: '169 pm', ionizationEnergy: '581 kJ/mol', characteristics: 'Elemento radioativo com aplicações em fontes térmicas.', occurrence: 'Produzido artificialmente.', applications: 'Fontes de energia e pesquisa nuclear.', curiosities: 'É usado em geradores termoelétricos.', colorClass: 'actinides' },
    { atomicNumber: 97, symbol: 'Bk', name: 'Berquélio', mass: '[247]', family: 'Actinídeo', category: 'actinides', group: 3, period: 7, row: 9, col: 11, state: 'Sólido', valence: '3', electronicConfiguration: '[Rn]5f⁹7s²', electronegativity: '1,30', atomicRadius: '170 pm', ionizationEnergy: '601 kJ/mol', characteristics: 'Elemento sintético e radioativo.', occurrence: 'Produzido artificialmente.', applications: 'Pesquisa teórica e química avançada.', curiosities: 'Foi nomeado em homenagem a Berkelium.', colorClass: 'actinides' },
    { atomicNumber: 98, symbol: 'Cf', name: 'Califórnio', mass: '[251]', family: 'Actinídeo', category: 'actinides', group: 3, period: 7, row: 9, col: 12, state: 'Sólido', valence: '3', electronicConfiguration: '[Rn]5f¹⁰7s²', electronegativity: '1,30', atomicRadius: '169 pm', ionizationEnergy: '608 kJ/mol', characteristics: 'Elemento radioativo de uso técnico e científico.', occurrence: 'Produzido artificialmente.', applications: 'Pesquisa, medicina e análise industrial.', curiosities: 'É conhecido por sua intensa radiação.', colorClass: 'actinides' },
    { atomicNumber: 99, symbol: 'Es', name: 'Einstênio', mass: '[252]', family: 'Actinídeo', category: 'actinides', group: 3, period: 7, row: 9, col: 13, state: 'Sólido', valence: '3', electronicConfiguration: '[Rn]5f¹¹7s²', electronegativity: '1,30', atomicRadius: '168 pm', ionizationEnergy: '619 kJ/mol', characteristics: 'Elemento sintético e altamente radioativo.', occurrence: 'Produzido artificialmente.', applications: 'Pesquisa e análise de materiais.', curiosities: 'É um elemento raro e difícil de produzir.', colorClass: 'actinides' },
    { atomicNumber: 100, symbol: 'Fm', name: 'Férmio', mass: '[257]', family: 'Actinídeo', category: 'actinides', group: 3, period: 7, row: 9, col: 14, state: 'Sólido', valence: '3', electronicConfiguration: '[Rn]5f¹²7s²', electronegativity: '1,30', atomicRadius: '167 pm', ionizationEnergy: '627 kJ/mol', characteristics: 'Elemento sintético e radioativo.', occurrence: 'Produzido em reatores.', applications: 'Pesquisa nuclear.', curiosities: 'Seu nome foi dado em homenagem a Enrico Fermi.', colorClass: 'actinides' },
    { atomicNumber: 101, symbol: 'Md', name: 'Mendelévio', mass: '[258]', family: 'Actinídeo', category: 'actinides', group: 3, period: 7, row: 9, col: 15, state: 'Sólido', valence: '3', electronicConfiguration: '[Rn]5f¹³7s²', electronegativity: '1,30', atomicRadius: '166 pm', ionizationEnergy: '635 kJ/mol', characteristics: 'Elemento sintético e pouco estudado.', occurrence: 'Produzido artificialmente.', applications: 'Pesquisa na química dos elementos pesados.', curiosities: 'É um dos elementos mais raros do mundo.', colorClass: 'actinides' },
    { atomicNumber: 102, symbol: 'No', name: 'Nobélio', mass: '[259]', family: 'Actinídeo', category: 'actinides', group: 3, period: 7, row: 9, col: 16, state: 'Sólido', valence: '2', electronicConfiguration: '[Rn]5f¹⁴7s²', electronegativity: '1,30', atomicRadius: '165 pm', ionizationEnergy: '642 kJ/mol', characteristics: 'Elemento sintético produzido em laboratório.', occurrence: 'Produzido artificialmente.', applications: 'Pesquisa nuclear e química experimental.', curiosities: 'Seu nome honra Alfred Nobel.', colorClass: 'actinides' },
    { atomicNumber: 103, symbol: 'Lr', name: 'Lawrêncio', mass: '[266]', family: 'Actinídeo', category: 'actinides', group: 3, period: 7, row: 9, col: 17, state: 'Sólido', valence: '3', electronicConfiguration: '[Rn]5f¹⁴7s²7p¹', electronegativity: '1,30', atomicRadius: '161 pm', ionizationEnergy: '470 kJ/mol', characteristics: 'Elemento sintético de transição interna.', occurrence: 'Produzido artificialmente.', applications: 'Pesquisa teórica e nuclear.', curiosities: 'É o último elemento do bloco dos actinídeos.', colorClass: 'actinides' },
    { atomicNumber: 104, symbol: 'Rf', name: 'Rutherfórdio', mass: '[267]', family: 'Metal de transição', category: 'transition-metals', group: 4, period: 7, row: 7, col: 4, state: 'Sólido', valence: '4', electronicConfiguration: '[Rn]5f¹⁴6d²7s²', electronegativity: '—', atomicRadius: '—', ionizationEnergy: '—', characteristics: 'Elemento sintético e pouco estudado.', occurrence: 'Produzido artificialmente.', applications: 'Pesquisa nuclear e química experimental.', curiosities: 'Foi nomeado em homenagem a Ernest Rutherford.', colorClass: 'transition-metals' },
    { atomicNumber: 105, symbol: 'Db', name: 'Dúbnio', mass: '[268]', family: 'Metal de transição', category: 'transition-metals', group: 5, period: 7, row: 7, col: 5, state: 'Sólido', valence: '5', electronicConfiguration: '[Rn]5f¹⁴6d³7s²', electronegativity: '—', atomicRadius: '—', ionizationEnergy: '—', characteristics: 'Elemento sintético altamente instável.', occurrence: 'Produzido artificialmente.', applications: 'Química experimental.', curiosities: 'O nome foi inspirado em Dubna, cidade russa.', colorClass: 'transition-metals' },
    { atomicNumber: 106, symbol: 'Sg', name: 'Seabórgio', mass: '[269]', family: 'Metal de transição', category: 'transition-metals', group: 6, period: 7, row: 7, col: 6, state: 'Sólido', valence: '6', electronicConfiguration: '[Rn]5f¹⁴6d⁴7s²', electronegativity: '—', atomicRadius: '—', ionizationEnergy: '—', characteristics: 'Elemento sintético e radioativo.', occurrence: 'Produzido em aceleradores.', applications: 'Pesquisa nuclear e física de materiais.', curiosities: 'Foi nomeado para Seaborg, físico nuclear.', colorClass: 'transition-metals' },
    { atomicNumber: 107, symbol: 'Bh', name: 'Bóhrio', mass: '[270]', family: 'Metal de transição', category: 'transition-metals', group: 7, period: 7, row: 7, col: 7, state: 'Sólido', valence: '7', electronicConfiguration: '[Rn]5f¹⁴6d⁵7s²', electronegativity: '—', atomicRadius: '—', ionizationEnergy: '—', characteristics: 'Elemento sintético e radioativo.', occurrence: 'Produzido artificialmente.', applications: 'Pesquisa experimental.', curiosities: 'Recebeu seu nome em homenagem a Niels Bohr.', colorClass: 'transition-metals' },
    { atomicNumber: 108, symbol: 'Hs', name: 'Hássio', mass: '[277]', family: 'Metal de transição', category: 'transition-metals', group: 8, period: 7, row: 7, col: 8, state: 'Sólido', valence: '8', electronicConfiguration: '[Rn]5f¹⁴6d⁶7s²', electronegativity: '—', atomicRadius: '—', ionizationEnergy: '—', characteristics: 'Elemento sintético e extremamente instável.', occurrence: 'Produzido artificialmente.', applications: 'Pesquisa em física nuclear.', curiosities: 'Seu nome vem do estado de Hesse, Alemanha.', colorClass: 'transition-metals' },
    { atomicNumber: 109, symbol: 'Mt', name: 'Meitnério', mass: '[278]', family: 'Metal de transição', category: 'transition-metals', group: 9, period: 7, row: 7, col: 9, state: 'Sólido', valence: '9', electronicConfiguration: '[Rn]5f¹⁴6d⁷7s²', electronegativity: '—', atomicRadius: '—', ionizationEnergy: '—', characteristics: 'Elemento altamente instável e sintético.', occurrence: 'Produzido artificialmente.', applications: 'Física e química experimental.', curiosities: 'Foi nomeado em homenagem a Lise Meitner.', colorClass: 'transition-metals' },
    { atomicNumber: 110, symbol: 'Ds', name: 'Darmstádio', mass: '[281]', family: 'Metal de transição', category: 'transition-metals', group: 10, period: 7, row: 7, col: 10, state: 'Sólido', valence: '10', electronicConfiguration: '[Rn]5f¹⁴6d⁸7s²', electronegativity: '—', atomicRadius: '—', ionizationEnergy: '—', characteristics: 'Elemento sintético com curta vida útil.', occurrence: 'Produzido artificialmente.', applications: 'Pesquisa nuclear e física de matéria.', curiosities: 'Seu nome homenageia Darmstadt, na Alemanha.', colorClass: 'transition-metals' },
    { atomicNumber: 111, symbol: 'Rg', name: 'Roentgênio', mass: '[282]', family: 'Metal de transição', category: 'transition-metals', group: 11, period: 7, row: 7, col: 11, state: 'Sólido', valence: '1', electronicConfiguration: '[Rn]5f¹⁴6d¹⁰7s¹', electronegativity: '—', atomicRadius: '—', ionizationEnergy: '—', characteristics: 'Elemento sintético e extremamente instável.', occurrence: 'Produzido artificialmente.', applications: 'Física nuclear e química experimental.', curiosities: 'É nomeado em homenagem a Wilhelm Röntgen.', colorClass: 'transition-metals' },
    { atomicNumber: 112, symbol: 'Cn', name: 'Copernício', mass: '[285]', family: 'Metal de transição', category: 'transition-metals', group: 12, period: 7, row: 7, col: 12, state: 'Sólido', valence: '2', electronicConfiguration: '[Rn]5f¹⁴6d¹⁰7s²', electronegativity: '—', atomicRadius: '—', ionizationEnergy: '—', characteristics: 'Elemento sintético de curto período de vida.', occurrence: 'Produzido em aceleradores.', applications: 'Pesquisas elementares.', curiosities: 'Foi nomeado em homenagem a Nicolau Copérnico.', colorClass: 'transition-metals' },
    { atomicNumber: 113, symbol: 'Nh', name: 'Nihônio', mass: '[286]', family: 'Outros metais', category: 'post-transition', group: 13, period: 7, row: 7, col: 13, state: 'Sólido', valence: '3', electronicConfiguration: '[Rn]5f¹⁴6d¹⁰7s²7p¹', electronegativity: '—', atomicRadius: '—', ionizationEnergy: '—', characteristics: 'Elemento sintético de existência limitada.', occurrence: 'Produzido artificialmente.', applications: 'Pesquisa de superelementos.', curiosities: 'Seu nome representa o Japão.', colorClass: 'post-transition' },
    { atomicNumber: 114, symbol: 'Fl', name: 'Fleróvio', mass: '[290]', family: 'Outros metais', category: 'post-transition', group: 14, period: 7, row: 7, col: 14, state: 'Sólido', valence: '2', electronicConfiguration: '[Rn]5f¹⁴6d¹⁰7s²7p²', electronegativity: '—', atomicRadius: '—', ionizationEnergy: '—', characteristics: 'Elemento sintético, experimental e pouco estável.', occurrence: 'Produzido artificialmente.', applications: 'Busca de propriedades nucleares.', curiosities: 'Seu nome se refere ao estado fluminense do Brasil.', colorClass: 'post-transition' },
    { atomicNumber: 115, symbol: 'Mc', name: 'Moscóvio', mass: '[290]', family: 'Outros metais (classificação prevista)', category: 'post-transition', group: 15, period: 7, row: 7, col: 15, state: 'Desconhecido (predito)', valence: 'Variável; dados experimentais limitados', electronicConfiguration: '[Rn]5f¹⁴6d¹⁰7s²7p³', electronegativity: '—', atomicRadius: '—', ionizationEnergy: '—', characteristics: 'Elemento superpesado, sintético e radioativo; propriedades químicas pouco caracterizadas.', occurrence: 'Produzido artificialmente em quantidades muito pequenas.', applications: 'Pesquisa experimental em química nuclear.', curiosities: 'Seu nome homenageia a região de Moscou.', colorClass: 'post-transition' },
    { atomicNumber: 116, symbol: 'Lv', name: 'Livermório', mass: '[293]', family: 'Outros metais (classificação prevista)', category: 'post-transition', group: 16, period: 7, row: 7, col: 16, state: 'Desconhecido (predito)', valence: 'Variável; dados experimentais limitados', electronicConfiguration: '[Rn]5f¹⁴6d¹⁰7s²7p⁴', electronegativity: '—', atomicRadius: '—', ionizationEnergy: '—', characteristics: 'Elemento sintético e radioativo; propriedades químicas pouco caracterizadas.', occurrence: 'Produzido artificialmente em quantidades muito pequenas.', applications: 'Estudos experimentais de elementos superpesados.', curiosities: 'Recebeu nome em homenagem ao Laboratório Nacional Lawrence Livermore.', colorClass: 'post-transition' },
    { atomicNumber: 117, symbol: 'Ts', name: 'Tennesso', mass: '[294]', family: 'Halogênio (classificação prevista)', category: 'halogens', group: 17, period: 7, row: 7, col: 17, state: 'Desconhecido (predito)', valence: 'Variável; dados experimentais limitados', electronicConfiguration: '[Rn]5f¹⁴6d¹⁰7s²7p⁵', electronegativity: '—', atomicRadius: '—', ionizationEnergy: '—', characteristics: 'Elemento sintético e radioativo; comportamento químico ainda pouco conhecido.', occurrence: 'Produzido artificialmente em quantidades muito pequenas.', applications: 'Pesquisa experimental.', curiosities: 'Foi nomeado em homenagem ao estado do Tennessee.', colorClass: 'halogens' },
    { atomicNumber: 118, symbol: 'Og', name: 'Oganessônio', mass: '[294]', family: 'Gás nobre (classificação prevista)', category: 'noble-gases', group: 18, period: 7, row: 7, col: 18, state: 'Desconhecido (predito)', valence: 'Variável; dados experimentais limitados', electronicConfiguration: '[Rn]5f¹⁴6d¹⁰7s²7p⁶', electronegativity: '—', atomicRadius: '—', ionizationEnergy: '—', characteristics: 'Elemento superpesado, sintético e radioativo; sua química não foi caracterizada em escala macroscópica.', occurrence: 'Produzido artificialmente átomo a átomo.', applications: 'Pesquisa de elementos superpesados e física nuclear.', curiosities: 'Foi nomeado em homenagem ao cientista Yuri Oganessian.', colorClass: 'noble-gases' }
];

PERIODIC_ELEMENTS.filter(element => element.atomicNumber >= 104).forEach(element => {
    element.state = 'Desconhecido experimentalmente';
    element.electronegativity = '—';
    element.atomicRadius = '—';
    element.ionizationEnergy = '—';
    element.characteristics = `Elemento sintético e radioativo. A família indicada é prevista a partir da posição no grupo ${element.group}; suas propriedades químicas ainda não foram caracterizadas de forma suficiente.`;
    element.occurrence = 'Produzido artificialmente em quantidades extremamente pequenas.';
    element.applications = 'Pesquisa em física nuclear; não há aplicações cotidianas estabelecidas.';
});

const familyMeta = {
    all: { label: 'Todos', className: 'all' },
    'alkali-metals': { label: 'Metais alcalinos', className: 'alkali-metals' },
    'alkaline-earth': { label: 'Metais alcalino-terrosos', className: 'alkaline-earth' },
    'transition-metals': { label: 'Metais de transição', className: 'transition-metals' },
    'post-transition': { label: 'Outros metais', className: 'post-transition' },
    metalloids: { label: 'Semimetais', className: 'metalloids' },
    nonmetals: { label: 'Não metais', className: 'nonmetals' },
    halogens: { label: 'Halogênios', className: 'halogens' },
    'noble-gases': { label: 'Gases nobres', className: 'noble-gases' },
    lanthanides: { label: 'Lantanídeos', className: 'lanthanides' },
    actinides: { label: 'Actinídeos', className: 'actinides' }
};

const state = {
    query: '',
    filter: 'all',
    selected: 1,
    trend: 'radius'
};

document.addEventListener('DOMContentLoaded', () => {
    const periodicGrid = document.getElementById('periodicGrid');
    const periodicGroups = document.getElementById('periodicGroups');
    const infoPanel = document.getElementById('elementInfo');
    const drawerBackdrop = document.getElementById('elementDrawerBackdrop');
    const searchInput = document.getElementById('elementSearch');
    const filterSelect = document.getElementById('categoryFilter');
    const clearBtn = document.getElementById('clearFilters');
    const statusText = document.getElementById('resultsStatus');
    const challengePrompt = document.getElementById('challengePrompt');
    const challengeOptions = document.getElementById('challengeOptions');
    const challengeFeedback = document.getElementById('challengeFeedback');
    const nextChallengeBtn = document.getElementById('nextChallenge');
    const resetChallengeBtn = document.getElementById('resetChallenge');
    const challengeScore = document.getElementById('challengeScore');
    const trendExplanation = document.getElementById('trendExplanation');
    const trendDirection = document.getElementById('trendDirection');
    const trendTabs = document.querySelectorAll('.trend-tab');

    const challenges = [
        {
            prompt: 'Qual elemento possui o símbolo Na?',
            options: ['Nitrônio', 'Sódio', 'Neônio', 'Níquel', 'Nitrogênio'],
            answer: 'Sódio',
            explanation: 'O sódio possui símbolo Na, derivado do latim natrium.'
        },
        {
            prompt: 'Qual família química inclui o flúor, o cloro e o bromo?',
            options: ['Metais alcalinos', 'Halogênios', 'Gases nobres', 'Lantanídeos', 'Semimetais'],
            answer: 'Halogênios',
            explanation: 'Os halogênios estão no grupo 17 e são muito reativos.'
        },
        {
            prompt: 'Qual é o número atômico do oxigênio?',
            options: ['6', '7', '8', '9', '10'],
            answer: '8',
            explanation: 'O oxigênio possui 8 prótons em seu núcleo, portanto Z = 8.'
        },
        {
            prompt: 'Em qual período o carbono está localizado?',
            options: ['1', '2', '3', '4', '5'],
            answer: '2',
            explanation: 'O carbono está no segundo período da tabela periódica.'
        },
        {
            prompt: 'Qual grupo contém elementos como hélio, neônio e argônio?',
            options: ['Grupo 1', 'Grupo 14', 'Grupo 17', 'Grupo 18', 'Grupo 3'],
            answer: 'Grupo 18',
            explanation: 'Os gases nobres ficam no grupo 18 e possuem camada de valência completa.'
        },
        {
            prompt: 'Qual é o símbolo químico do potássio?',
            options: ['P', 'Po', 'K', 'Pt', 'Pa'],
            answer: 'K',
            explanation: 'O símbolo K deriva do nome latino kalium.'
        },
        {
            prompt: 'Em qual grupo estão os metais alcalino-terrosos?',
            options: ['Grupo 1', 'Grupo 2', 'Grupo 16', 'Grupo 17', 'Grupo 18'],
            answer: 'Grupo 2',
            explanation: 'Berílio, magnésio e cálcio são exemplos do grupo 2.'
        },
        {
            prompt: 'Qual elemento está no período 3 e no grupo 17?',
            options: ['Flúor', 'Cloro', 'Bromo', 'Enxofre', 'Argônio'],
            answer: 'Cloro',
            explanation: 'O cloro (Cl) ocupa o grupo 17 e o período 3.'
        },
        {
            prompt: 'Qual é o número atômico do ferro (Fe)?',
            options: ['24', '25', '26', '27', '28'],
            answer: '26',
            explanation: 'O ferro possui 26 prótons; seu número atômico é 26.'
        },
        {
            prompt: 'Em geral, como varia o raio atômico ao descer em um grupo?',
            options: ['Aumenta', 'Diminui', 'Permanece sempre igual', 'Torna-se zero', 'Não há tendência'],
            answer: 'Aumenta',
            explanation: 'Novos níveis eletrônicos são adicionados ao descer no grupo, aumentando geralmente o tamanho do átomo.'
        },
        {
            prompt: 'Qual elemento é um semimetal do grupo 14 e período 3?',
            options: ['Carbono', 'Silício', 'Germânio', 'Alumínio', 'Fósforo'],
            answer: 'Silício',
            explanation: 'O silício (Si) está no grupo 14, período 3, e é classificado como semimetal.'
        }
    ];

    let challengeIndex = 0;
    let score = 0;
    let answeredQuestions = 0;
    let lastFocusedElement = null;

    const trendInfo = {
        radius: {
            title: 'Raio atômico',
            text: 'Em geral, o raio aumenta ao descer um grupo (novas camadas eletrônicas) e para a esquerda ao longo de um período. Os valores do painel são raios covalentes aproximados e podem variar entre fontes.',
            direction: 'Tendência geral: aumenta para baixo e para a esquerda (↙).'
        },
        electronegativity: {
            title: 'Eletronegatividade',
            text: 'Em geral, a atração por elétrons em uma ligação aumenta para cima e para a direita. O flúor apresenta o maior valor na escala de Pauling. Não há valor de eletronegatividade definido para vários gases nobres e elementos superpesados.',
            direction: 'Tendência geral: aumenta para cima e para a direita (↗).'
        },
        ionization: {
            title: 'Energia de ionização',
            text: 'É a energia necessária para retirar um elétron de um átomo gasoso isolado. Em geral, aumenta para cima e para a direita; subníveis e configurações eletrônicas produzem exceções.',
            direction: 'Tendência geral: aumenta para cima e para a direita (↗).'
        },
        affinity: {
            title: 'Afinidade eletrônica',
            text: 'Refere-se à variação de energia associada à captura de um elétron por um átomo gasoso. A tendência não é uniforme: muitos halogênios liberam energia, enquanto gases nobres e vários outros elementos têm dados pouco comparáveis. Valores dependem da convenção e não são estimados aqui.',
            direction: 'Comparação qualitativa: tendência complexa; destaque típico nos halogênios.'
        }
    };

    if (PERIODIC_ELEMENTS.length !== 118 || PERIODIC_ELEMENTS.some((element, index) =>
        element.atomicNumber !== index + 1 ||
        element.group < 1 || element.group > 18 ||
        element.period < 1 || element.period > 7 ||
        element.col < 1 || element.col > 18 ||
        element.row < 1 || element.row > 9
    )) {
        console.error('A base da PERIODICLAB precisa conter 118 elementos com números e posições válidos.');
    }

    const getActiveElement = () => PERIODIC_ELEMENTS.find((element) => element.atomicNumber === state.selected) || PERIODIC_ELEMENTS[0];

    const renderLegend = () => {
        const legend = document.getElementById('periodicLegend');
        legend.innerHTML = Object.entries(familyMeta)
            .filter(([key]) => key !== 'all')
            .map(([key, meta]) => `
                <button type="button" class="legend-item ${meta.className} ${state.filter === key ? 'is-selected' : ''}" data-category="${key}" aria-pressed="${state.filter === key}">
                    <span class="legend-swatch ${meta.className}"></span>
                    ${meta.label}
                </button>
            `)
            .join('');
        legend.querySelectorAll('.legend-item').forEach(button => {
            button.addEventListener('click', () => {
                state.filter = state.filter === button.dataset.category ? 'all' : button.dataset.category;
                filterSelect.value = state.filter;
                renderLegend();
                renderTable();
            });
        });
    };

    const renderTrend = () => {
        const selectedTrend = trendInfo[state.trend];
        trendExplanation.innerHTML = `<strong>${selectedTrend.title}:</strong> ${selectedTrend.text} <span>As faixas na tabela são uma representação qualitativa, não valores experimentais.</span>`;
        trendDirection.textContent = selectedTrend.direction;
        trendTabs.forEach(button => {
            const isActive = button.dataset.trend === state.trend;
            button.classList.toggle('is-active', isActive);
            button.setAttribute('aria-pressed', String(isActive));
        });
        periodicGrid.dataset.trend = state.trend;
    };

    const buildQuestion = () => {
        const current = challenges[challengeIndex];
        if (!current) return;

        challengePrompt.textContent = current.prompt;
        challengeOptions.innerHTML = current.options
            .map((option) => `<button class="challenge-option" type="button">${option}</button>`)
            .join('');

        challengeFeedback.textContent = '';
        challengeFeedback.className = 'challenge-feedback';
        challengeScore.textContent = `Pontuação: ${score} acerto${score === 1 ? '' : 's'} em ${answeredQuestions} ${answeredQuestions === 1 ? 'questão' : 'questões'}`;

        challengeOptions.querySelectorAll('.challenge-option').forEach((button) => {
            button.addEventListener('click', () => {
                const isCorrect = button.textContent === current.answer;
                score += isCorrect ? 1 : 0;
                answeredQuestions += 1;
                challengeScore.textContent = `Pontuação: ${score} acerto${score === 1 ? '' : 's'} em ${answeredQuestions} ${answeredQuestions === 1 ? 'questão' : 'questões'}`;

                challengeOptions.querySelectorAll('.challenge-option').forEach((item) => {
                    item.disabled = true;
                    item.classList.toggle('correct', item.textContent === current.answer);
                    item.classList.toggle('wrong', item.textContent !== current.answer && item === button);
                });

                challengeFeedback.classList.add(isCorrect ? 'positive' : 'negative');
                challengeFeedback.textContent = isCorrect
                    ? `Você acertou a questão! ${current.explanation}`
                    : `Resposta correta: ${current.answer}. ${current.explanation}`;
            });
        });
    };

    const closeElementDrawer = () => {
        infoPanel.classList.remove('is-open');
        infoPanel.setAttribute('aria-hidden', 'true');
        drawerBackdrop.classList.remove('is-visible');
        drawerBackdrop.setAttribute('aria-hidden', 'true');
        if (lastFocusedElement instanceof HTMLElement && lastFocusedElement.isConnected) {
            lastFocusedElement.focus();
        }
        lastFocusedElement = null;
    };

    const openElementDrawer = (element) => {
        if (!infoPanel.classList.contains('is-open')) {
            lastFocusedElement = document.activeElement;
        }
        infoPanel.innerHTML = `
            <button class="drawer-close" type="button" aria-label="Fechar detalhes">×</button>
            <div class="info-header">
                <div>
                    <span class="element-badge ${element.category}">${element.family}</span>
                    <h3 id="elementInfoTitle">${element.name}</h3>
                </div>
                <div class="info-symbol">${element.symbol}</div>
            </div>

            <div class="info-grid">
                <div><span>Número atômico</span><strong>${element.atomicNumber}</strong></div>
                <div><span>${element.mass.startsWith('[') ? 'Número de massa do isótopo' : 'Massa atômica (u)'}</span><strong>${element.mass}</strong></div>
                <div><span>Grupo</span><strong>${element.group}</strong></div>
                <div><span>Período</span><strong>${element.period}</strong></div>
            </div>

            <div class="info-section">
                <h4>Propriedades</h4>
                <ul>
                    <li><strong>${element.atomicNumber >= 104 ? 'Configuração eletrônica prevista' : 'Distribuição eletrônica'}:</strong> ${element.electronicConfiguration}</li>
                    <li><strong>Estado físico:</strong> ${element.state}</li>
                    <li><strong>Eletronegatividade:</strong> ${element.electronegativity}</li>
                    <li><strong>Raio covalente aproximado (pm):</strong> ${element.atomicRadius}</li>
                    <li><strong>Primeira energia de ionização (kJ/mol):</strong> ${element.ionizationEnergy}</li>
                    <li><strong>Elétrons de valência:</strong> ${getValenceDescription(element)}</li>
                </ul>
            </div>

            <div class="info-section">
                <h4>Informações complementares</h4>
                <ul>
                    <li><strong>Características:</strong> ${element.characteristics}</li>
                    <li><strong>Ocorrência:</strong> ${element.occurrence}</li>
                    <li><strong>Aplicações:</strong> ${element.applications}</li>
                    <li><strong>Curiosidade:</strong> ${element.curiosities}</li>
                </ul>
            </div>

            <p class="element-data-note">${element.atomicNumber >= 104
                ? 'Este elemento é produzido átomo a átomo. A classificação por família e a configuração eletrônica são previsões; várias propriedades ainda não foram medidas experimentalmente.'
                : 'Valores de propriedades podem variar conforme a fonte, o estado químico e o método experimental. “—” indica dado não estabelecido ou não disponível.'}</p>

            <button id="askLeonardAI" class="botao" type="button">Perguntar ao LeonardIA</button>
        `;

        const closeButton = infoPanel.querySelector('.drawer-close');
        const currentAskBtn = document.getElementById('askLeonardAI');

        if (closeButton) {
            closeButton.addEventListener('click', closeElementDrawer);
        }

        if (currentAskBtn) {
            currentAskBtn.addEventListener('click', () => {
                const target = `leonardia.php?element=${encodeURIComponent(element.name)}&symbol=${encodeURIComponent(element.symbol)}`;
                window.location.href = target;
            });
        }

        infoPanel.classList.add('is-open');
        infoPanel.setAttribute('aria-hidden', 'false');
        drawerBackdrop.classList.add('is-visible');
        drawerBackdrop.setAttribute('aria-hidden', 'false');
        closeButton?.focus();
    };

    const getValenceDescription = element => {
        if (element.category === 'transition-metals' || element.category === 'lanthanides' || element.category === 'actinides') {
            return 'Variável; subníveis d ou f também podem participar das ligações.';
        }
        if (element.group === 18 && element.atomicNumber === 2) return '2';
        if (element.group === 18) return '8';
        if (element.group === 1) return '1';
        if (element.group === 2) return '2';
        if (element.group >= 13 && element.group <= 17) return String(element.group - 10);
        return element.valence || 'Não estabelecido';
    };

    const renderGroupLabels = () => {
        periodicGroups.innerHTML = `
            <span class="periodic-label-spacer" aria-hidden="true"></span>
            ${Array.from({ length: 18 }, (_, index) => `<span class="periodic-group-number">${index + 1}</span>`).join('')}
        `;
    };

    const renderTable = () => {
        const filtered = PERIODIC_ELEMENTS.filter((element) => {
            const matchesFilter = state.filter === 'all' || element.category === state.filter;
            const search = state.query.trim().toLocaleLowerCase('pt-BR').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
            const elementName = element.name.toLocaleLowerCase('pt-BR').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
            const matchesSearch = !search ||
                elementName.includes(search) ||
                element.symbol.toLowerCase().includes(search) ||
                String(element.atomicNumber).includes(search);
            return matchesFilter && matchesSearch;
        });

        if (filtered.length === 0) {
            periodicGrid.innerHTML = '<div class="no-results">Nenhum elemento encontrado. Tente outro nome ou filtro.</div>';
            infoPanel.innerHTML = `
                <div class="empty-info">
                    <h3>Nenhum elemento encontrado</h3>
                    <p>Refine sua pesquisa ou limpe os filtros para visualizar a tabela completa.</p>
                </div>
            `;
            closeElementDrawer();
            statusText.textContent = 'Sem resultados';
            return;
        }

        const selectedNumbers = new Set(filtered.map((item) => item.atomicNumber));
        if (!selectedNumbers.has(state.selected)) {
            state.selected = filtered[0].atomicNumber;
        }

        periodicGrid.innerHTML = filtered
            .map((element) => `
                <button
                    type="button"
                    class="element-cell category-${element.category} ${state.selected === element.atomicNumber ? 'active' : ''}"
                    style="grid-column: ${element.col + 1}; grid-row: ${element.row};"
                    data-number="${element.atomicNumber}"
                    data-trend-level="${getTrendLevel(element)}"
                    aria-label="Elemento ${element.name}, símbolo ${element.symbol}, número atômico ${element.atomicNumber}, massa ${element.mass}"
                    title="${element.name} · ${element.symbol} · Z=${element.atomicNumber} · massa ${element.mass}"
                >
                    <span class="atomic-number">${element.atomicNumber}</span>
                    <strong>${element.symbol}</strong>
                    <small>${element.name}</small>
                    <small class="element-mass">${element.mass}</small>
                </button>
            `)
            .join('');
        periodicGrid.insertAdjacentHTML('afterbegin', Array.from({ length: 9 }, (_, index) => {
            const label = index < 7 ? String(index + 1) : `${index - 1}*`;
            return `<span class="periodic-row-number" style="grid-column: 1; grid-row: ${index + 1};" aria-hidden="true">${label}</span>`;
        }).join(''));

        statusText.textContent = `${filtered.length} elementos visualizados`;
        const selectedElement = filtered.find((element) => element.atomicNumber === state.selected) || filtered[0];

        if (infoPanel.classList.contains('is-open')) {
            openElementDrawer(selectedElement);
        }

        return selectedElement;
    };

    const getTrendLevel = element => {
        if (state.trend === 'affinity') return element.category === 'halogens' ? 'high' : 'neutral';
        const horizontal = state.trend === 'radius' ? (18 - element.group) / 17 : (element.group - 1) / 17;
        const vertical = state.trend === 'radius' ? (element.period - 1) / 6 : (7 - element.period) / 6;
        const tendency = (horizontal + vertical) / 2;
        return tendency >= 0.66 ? 'high' : tendency >= 0.34 ? 'medium' : 'low';
    };

    periodicGrid.addEventListener('click', (event) => {
        const target = event.target.closest('.element-cell');
        if (!target) return;

        const selectedNumber = Number(target.dataset.number);
        state.selected = selectedNumber;
        const selectedElement = PERIODIC_ELEMENTS.find((item) => item.atomicNumber === selectedNumber);
        if (selectedElement) {
            renderTable();
            openElementDrawer(selectedElement);
        }
    });

    searchInput.addEventListener('input', (event) => {
        state.query = event.target.value;
        renderTable();
    });

    filterSelect.addEventListener('change', (event) => {
        state.filter = event.target.value;
        renderLegend();
        renderTable();
    });

    clearBtn.addEventListener('click', () => {
        state.query = '';
        state.filter = 'all';
        searchInput.value = '';
        filterSelect.value = 'all';
        renderLegend();
        renderTable();
    });

    trendTabs.forEach(button => {
        button.addEventListener('click', () => {
            state.trend = button.dataset.trend;
            renderTrend();
            renderTable();
        });
    });

    nextChallengeBtn.addEventListener('click', () => {
        challengeIndex = (challengeIndex + 1) % challenges.length;
        buildQuestion();
    });

    resetChallengeBtn.addEventListener('click', () => {
        challengeIndex = 0;
        score = 0;
        answeredQuestions = 0;
        buildQuestion();
    });

    drawerBackdrop.addEventListener('click', closeElementDrawer);
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeElementDrawer();
            return;
        }
        if (event.key === 'Tab' && infoPanel.classList.contains('is-open')) {
            const focusable = [...infoPanel.querySelectorAll('button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')];
            if (!focusable.length) return;
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        }
    });

    renderLegend();
    renderGroupLabels();
    renderTrend();
    renderTable();
    buildQuestion();
});
