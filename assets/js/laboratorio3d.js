(() => {
    'use strict';

    const canvas = document.getElementById('molecular-canvas');
    const stage = document.getElementById('viewer-stage');
    const modelList = document.getElementById('model-list');
    const searchInput = document.getElementById('model-search');
    const categorySelect = document.getElementById('model-category');
    const catalogStatus = document.getElementById('catalog-status');
    const renderError = document.getElementById('render-error');
    const renderErrorMessage = document.getElementById('render-error-message');
    const rotationToggle = document.getElementById('rotation-toggle');
    const renderStyleSelect = document.getElementById('render-style');
    const atomSelector = document.getElementById('atom-selector');
    const selectedAtomTitle = document.getElementById('selected-atom-title');
    const selectedAtomConnections = document.getElementById('selected-atom-connections');
    const bondTableBody = document.getElementById('bond-table-body');

    if (!(canvas instanceof HTMLCanvasElement) || !stage || !modelList || !searchInput || !categorySelect || !catalogStatus || !rotationToggle ||
        !renderStyleSelect || !atomSelector || !selectedAtomTitle || !selectedAtomConnections || !bondTableBody) {
        console.error('Laboratório 3D: estrutura de interface incompleta.');
        return;
    }

    const vector = (x, y, z) => ({ x, y, z });
    const atom = (element, x, y, z) => ({ element, x, y, z });
    const valences = { C: 4, H: 1, O: 2, N: 3, F: 1, Cl: 1, Na: 1, S: 6, Ca: 2 };
    const elementNames = {
        H: 'Hidrogênio', C: 'Carbono', N: 'Nitrogênio', O: 'Oxigênio',
        F: 'Flúor', Cl: 'Cloro', S: 'Enxofre', Na: 'Sódio', Ca: 'Cálcio', Fe: 'Ferro'
    };
    const elementColors = {
        H: '#f2f7ff', C: '#718096', N: '#3478e5', O: '#ef4444',
        F: '#8bd450', Cl: '#49ad69', S: '#f2d423', Na: '#aa88ee', Ca: '#3dff00', Fe: '#d58a48',
        p: '#e34f4f', n: '#737d8c', e: '#42b8f0'
    };
    const atomRadii = {
        H: 0.16, C: 0.27, O: 0.23, N: 0.24, F: 0.22, Cl: 0.28, S: 0.3,
        Na: 0.29, Ca: 0.34, Fe: 0.31, p: 0.09, n: 0.09, e: 0.12
    };

    const add = (a, b) => vector(a.x + b.x, a.y + b.y, a.z + b.z);
    const scaleVector = (a, factor) => vector(a.x * factor, a.y * factor, a.z * factor);
    const subtract = (a, b) => vector(a.x - b.x, a.y - b.y, a.z - b.z);
    const dot = (a, b) => a.x * b.x + a.y * b.y + a.z * b.z;
    const cross = (a, b) => vector(
        a.y * b.z - a.z * b.y,
        a.z * b.x - a.x * b.z,
        a.x * b.y - a.y * b.x
    );
    const magnitude = a => Math.hypot(a.x, a.y, a.z);
    const normalize = a => {
        const length = magnitude(a);
        return length > 1e-8 ? scaleVector(a, 1 / length) : vector(0, 0, 1);
    };

    function perpendicular(axis) {
        const reference = Math.abs(axis.x) < 0.8 ? vector(1, 0, 0) : vector(0, 1, 0);
        return normalize(cross(axis, reference));
    }

    function aroundAxis(axis, count, cosine, azimuths = []) {
        const side = perpendicular(axis);
        const other = normalize(cross(axis, side));
        const sine = Math.sqrt(Math.max(0, 1 - cosine * cosine));
        return Array.from({ length: count }, (_, index) => {
            const angle = azimuths[index] ?? (2 * Math.PI * index / count);
            return normalize(add(
                scaleVector(axis, cosine),
                add(scaleVector(side, sine * Math.cos(angle)), scaleVector(other, sine * Math.sin(angle)))
            ));
        });
    }

    function hydrogenDirections(element, count, neighbors, hasDoubleBond, planar) {
        const sum = neighbors.reduce((total, direction) => add(total, direction), vector(0, 0, 0));
        if (element === 'O' && count === 1 && neighbors.length === 1) {
            return aroundAxis(neighbors[0], 1, Math.cos(104.5 * Math.PI / 180), [0]);
        }
        if (element === 'N' && count === 2 && neighbors.length === 1) {
            const angle = (planar ? 120 : 107) * Math.PI / 180;
            return aroundAxis(neighbors[0], 2, Math.cos(angle), planar ? [0, Math.PI] : [0, 2 * Math.PI / 3]);
        }
        if (element === 'C' && count === 1 && neighbors.length) {
            if (hasDoubleBond) return [normalize(scaleVector(sum, -1))];
            return [normalize(scaleVector(sum, -1))];
        }
        if (element === 'C' && count === 2 && neighbors.length === 2) {
            const axis = normalize(scaleVector(sum, -1));
            const side = perpendicular(axis);
            return [
                normalize(add(scaleVector(axis, 1 / Math.sqrt(3)), scaleVector(side, Math.sqrt(2 / 3)))),
                normalize(add(scaleVector(axis, 1 / Math.sqrt(3)), scaleVector(side, -Math.sqrt(2 / 3))))
            ];
        }
        if (element === 'C' && count === 3 && neighbors.length === 1) {
            return aroundAxis(scaleVector(neighbors[0], -1), 3, 1 / 3);
        }
        if (element === 'C' && count === 4 && !neighbors.length) {
            return [
                normalize(vector(1, 1, 1)), normalize(vector(1, -1, -1)),
                normalize(vector(-1, 1, -1)), normalize(vector(-1, -1, 1))
            ];
        }
        if (count === 1 && neighbors.length) return [normalize(scaleVector(sum, -1))];
        if (neighbors.length) return aroundAxis(scaleVector(normalize(sum), -1), count, 1 / 3);
        return aroundAxis(vector(0, 0, 1), count, 1 / 3);
    }

    function buildMolecule(sourceAtoms, sourceBonds, options = {}) {
        const atoms = sourceAtoms.map(item => ({ ...item }));
        const bonds = sourceBonds.map(bond => [...bond]);
        const neighbors = atoms.map(() => []);
        const usedValence = atoms.map(() => 0);
        bonds.forEach(([from, to, order]) => {
            if (!atoms[from] || !atoms[to]) throw new Error('Uma ligação aponta para um átomo inexistente.');
            neighbors[from].push(to);
            neighbors[to].push(from);
            usedValence[from] += order;
            usedValence[to] += order;
        });

        const originalCount = atoms.length;
        for (let index = 0; index < originalCount; index += 1) {
            const element = atoms[index].element;
            const target = valences[element];
            if (!target) continue;
            const missing = target - usedValence[index];
            if (missing < 0 || !Number.isInteger(missing)) {
                throw new Error(`Valência inválida no átomo ${element} do modelo.`);
            }
            if (!missing) continue;
            const directions = neighbors[index].map(neighbor => normalize(subtract(atoms[neighbor], atoms[index])));
            const doubleBond = bonds.some(([from, to, order]) =>
                order === 2 && (from === index || to === index)
            );
            const planar = options.planarNitrogens?.includes(index) || false;
            const length = element === 'O' ? 0.72 : element === 'N' ? 0.76 : 0.86;
            hydrogenDirections(element, missing, directions, doubleBond, planar).forEach(direction => {
                const hydrogenIndex = atoms.length;
                atoms.push(atom(
                    'H',
                    atoms[index].x + direction.x * length,
                    atoms[index].y + direction.y * length,
                    atoms[index].z + direction.z * length
                ));
                bonds.push([index, hydrogenIndex, 1]);
            });
        }
        return { atoms, bonds, shells: [] };
    }

    function rawModel(atoms, bonds = [], shells = []) {
        return { atoms: atoms.map(item => ({ ...item })), bonds: bonds.map(item => [...item]), shells };
    }

    function makeMolecule(data) {
        return {
            ...data,
            model: data.model || buildMolecule(data.atoms, data.bonds, { planarNitrogens: data.planarNitrogens || [] })
        };
    }

    const carbonRing = (radius, zOffset = 0) => Array.from({ length: 6 }, (_, index) => {
        const angle = 2 * Math.PI * index / 6;
        return atom('C', radius * Math.cos(angle), radius * Math.sin(angle), zOffset);
    });
    const carbonChair = radius => {
        const heights = [0.42, 0, -0.42, -0.42, 0, 0.42];
        return Array.from({ length: 6 }, (_, index) => {
            const angle = 2 * Math.PI * index / 6;
            return atom('C', radius * Math.cos(angle), radius * Math.sin(angle), heights[index]);
        });
    };

    const carbonBohrAtoms = (() => {
        const particles = [];
        for (let index = 0; index < 6; index += 1) {
            const phi = index * 2.39996;
            const z = -0.18 + index * 0.072;
            const radius = Math.sqrt(Math.max(0, 0.18 ** 2 - z ** 2));
            particles.push(atom('p', radius * Math.cos(phi), radius * Math.sin(phi), z));
            particles.push(atom('n', -radius * Math.cos(phi), -radius * Math.sin(phi), -z));
        }
        particles.push(atom('e', 0.82, 0, 0), atom('e', -0.82, 0, 0));
        [0, 1, 2, 3].forEach(index => {
            const angle = index * Math.PI / 2;
            particles.push(atom('e', 1.4 * Math.cos(angle), 1.4 * Math.sin(angle), 0));
        });
        return particles;
    })();

    const molecules = [
        {
            id: 'hydrogen-atom', name: 'Átomo de hidrogênio', formula: '¹H', structure: 'Modelo de Bohr didático: 1 próton no núcleo e 1 elétron na primeira camada.',
            category: 'Átomos', bondType: 'Não há ligação: átomo isolado.', geometry: 'Representação esférica com uma camada eletrônica.',
            properties: 'O hidrogênio mais comum (prótio) possui um próton e um elétron; seu núcleo não contém nêutrons.',
            applications: 'É o elemento mais abundante do Universo e integra a água e inúmeros compostos orgânicos.',
            modelType: 'atomic',
            model: rawModel([atom('p', 0, 0, 0), atom('e', 0.95, 0, 0)], [], [0.95])
        },
        {
            id: 'carbon-atom', name: 'Átomo de carbono', formula: '¹²C', structure: 'Modelo de Bohr didático: núcleo com 6 prótons e 6 nêutrons; 2 elétrons na camada K e 4 na camada L.',
            category: 'Átomos', bondType: 'Não há ligação: átomo isolado.', geometry: 'Duas camadas eletrônicas; distribuição 2, 4.',
            properties: 'A representação é esquemática e não está em escala. Orbitais reais não são trajetórias circulares fixas.',
            applications: 'O carbono forma o esqueleto de moléculas orgânicas e está presente em seres vivos, combustíveis e materiais.',
            modelType: 'atomic',
            model: rawModel(carbonBohrAtoms, [], [0.82, 1.4])
        },
        makeMolecule({
            id: 'iron-lattice', name: 'Ferro metálico (célula unitária)', formula: 'Fe', structure: 'Rede cúbica de corpo centrado (representação da célula unitária).',
            category: 'Ligações e redes', bondType: 'Ligação metálica com elétrons deslocalizados; os pontos representam posições atômicas, não bastões de ligação.',
            geometry: 'Cúbica de corpo centrado (CCC).', properties: 'Metais formam redes cristalinas. A ligação metálica é coletiva e não corresponde a moléculas discretas.',
            applications: 'Ferro e suas ligas são usados em estruturas, ferramentas, veículos e máquinas.',
            model: rawModel([
                atom('Fe', -1, -1, -1), atom('Fe', 1, -1, -1), atom('Fe', -1, 1, -1), atom('Fe', 1, 1, -1),
                atom('Fe', -1, -1, 1), atom('Fe', 1, -1, 1), atom('Fe', -1, 1, 1), atom('Fe', 1, 1, 1),
                atom('Fe', 0, 0, 0)
            ])
        }),
        makeMolecule({
            id: 'sodium-chloride', name: 'Cloreto de sódio (par iônico)', formula: 'NaCl', structure: 'Na⁺ ··· Cl⁻ (unidade representativa, não uma molécula isolada no cristal).',
            category: 'Ligações e redes', bondType: 'Iônica: atração eletrostática entre Na⁺ e Cl⁻.',
            geometry: 'A representação mostra um par de íons; o sólido real forma uma rede cristalina cúbica.',
            properties: 'O cristal é eletricamente neutro e cada íon interage com vários íons de carga oposta.',
            applications: 'O sal de cozinha é usado na alimentação e como matéria-prima industrial.',
            model: rawModel([atom('Na', -0.68, 0, 0), atom('Cl', 0.68, 0, 0)], [[0, 1, 0]])
        }),
        makeMolecule({
            id: 'calcium-carbonate', name: 'Carbonato de cálcio (unidade iônica)', formula: 'CaCO₃',
            structure: 'Ca²⁺ e CO₃²⁻; unidade esquemática de um sólido iônico, não uma molécula isolada.',
            category: 'Ligações e redes', bondType: 'Interações iônicas Ca²⁺···O²⁻ e ligações C—O equivalentes por ressonância.',
            geometry: 'Grupo carbonato trigonal plano; a calcita real forma uma rede cristalina.',
            properties: 'Sal pouco solúvel em água; o íon carbonato apresenta deslocalização eletrônica.',
            applications: 'Presente em calcário, mármore, conchas e materiais de construção.',
            model: rawModel([
                atom('Ca', 0, -2.35, 0), atom('C', 0, 0, 0),
                atom('O', 1.28, 0, 0), atom('O', -0.64, 1.11, 0), atom('O', -0.64, -1.11, 0)
            ], [[1, 2, 1.33], [1, 3, 1.33], [1, 4, 1.33], [0, 2, 0], [0, 3, 0], [0, 4, 0]])
        }),
        makeMolecule({
            id: 'water', name: 'Água', formula: 'H₂O', structure: 'H—O—H',
            category: 'Moléculas simples', bondType: 'Duas ligações covalentes polares O—H.',
            geometry: 'Angular; ângulo H—O—H aproximado de 104,5°.', properties: 'A geometria angular torna a molécula polar; entre moléculas de água formam-se ligações de hidrogênio.',
            applications: 'Solvente em sistemas biológicos e processos naturais; essencial ao transporte de substâncias e à regulação térmica.',
            model: buildMolecule([
                atom('O', 0, 0, 0), atom('H', -0.59, -0.45, 0), atom('H', 0.59, -0.45, 0)
            ], [[0, 1, 1], [0, 2, 1]])
        }),
        makeMolecule({
            id: 'carbon-dioxide', name: 'Dióxido de carbono', formula: 'CO₂', structure: 'O=C=O',
            category: 'Moléculas simples', bondType: 'Duas ligações covalentes duplas C=O polares.',
            geometry: 'Linear; 180°.', properties: 'Os dipolos das ligações se cancelam pela simetria, tornando a molécula apolar.',
            applications: 'Produto da respiração e da combustão; também é matéria-prima em processos industriais e está envolvido no ciclo do carbono.',
            model: buildMolecule([atom('O', -1.16, 0, 0), atom('C', 0, 0, 0), atom('O', 1.16, 0, 0)], [[0, 1, 2], [1, 2, 2]])
        }),
        makeMolecule({
            id: 'carbon-monoxide', name: 'Monóxido de carbono', formula: 'CO', structure: 'C≡O (estrutura de Lewis simplificada).',
            category: 'Moléculas simples', bondType: 'Ligação covalente de ordem aproximada 3, com contribuição coordenada.',
            geometry: 'Linear (molécula diatômica).', properties: 'Gás incolor e altamente tóxico; não possui cor ou odor que alertem sobre sua presença.',
            applications: 'Formado em combustões incompletas; detectores e ventilação adequada são importantes para prevenção de acidentes.',
            model: rawModel([atom('C', -0.58, 0, 0), atom('O', 0.58, 0, 0)], [[0, 1, 3]])
        }),
        makeMolecule({
            id: 'ozone', name: 'Ozônio', formula: 'O₃', structure: 'O—O—O; duas estruturas limite de ressonância.',
            category: 'Moléculas simples', bondType: 'Duas ligações O—O equivalentes, com ordem média aproximada 1,5.',
            geometry: 'Angular; ângulo O—O—O próximo de 117°.',
            properties: 'Molécula polar; na estratosfera absorve parte da radiação ultravioleta, mas ao nível do solo é poluente.',
            applications: 'Usado em processos de desinfecção e tratamento, sob controle técnico.',
            model: rawModel([
                atom('O', 0, 0, 0), atom('O', 1.12, 0.77, 0), atom('O', -1.12, 0.77, 0)
            ], [[0, 1, 1.5], [0, 2, 1.5]])
        }),
        makeMolecule({
            id: 'sulfur-dioxide', name: 'Dióxido de enxofre', formula: 'SO₂', structure: 'O—S—O; estruturas de ressonância.',
            category: 'Moléculas simples', bondType: 'Ligações S—O polares e equivalentes por ressonância.',
            geometry: 'Angular; ângulo O—S—O próximo de 119°.',
            properties: 'Gás irritante que pode formar ácidos na atmosfera e contribuir para a chuva ácida.',
            applications: 'Usado como conservante em aplicações controladas e produzido em processos industriais.',
            model: rawModel([
                atom('S', 0, 0, 0), atom('O', 1.05, 0.9, 0), atom('O', -1.05, 0.9, 0)
            ], [[0, 1, 1.5], [0, 2, 1.5]])
        }),
        makeMolecule({
            id: 'methane', name: 'Metano', formula: 'CH₄', structure: 'Carbono central ligado a quatro hidrogênios.',
            category: 'Moléculas simples', bondType: 'Quatro ligações covalentes simples C—H.',
            geometry: 'Tetraédrica; ângulos próximos de 109,5°.', properties: 'Molécula apolar e principal componente do gás natural.',
            applications: 'Combustível para geração de calor e energia; vazamentos contribuem para emissões de gases de efeito estufa.',
            model: buildMolecule([
                atom('C', 0, 0, 0), atom('H', 0.9, 0.9, 0.9), atom('H', -0.9, -0.9, 0.9),
                atom('H', -0.9, 0.9, -0.9), atom('H', 0.9, -0.9, -0.9)
            ], [[0, 1, 1], [0, 2, 1], [0, 3, 1], [0, 4, 1]])
        }),
        makeMolecule({
            id: 'ammonia', name: 'Amônia', formula: 'NH₃', structure: 'Nitrogênio central ligado a três hidrogênios.',
            category: 'Moléculas simples', bondType: 'Três ligações covalentes polares N—H.',
            geometry: 'Piramidal trigonal; o par não ligante ocupa uma região eletrônica.',
            properties: 'A geometria assimétrica produz molécula polar; em água, a amônia atua como base fraca.',
            applications: 'Produção de fertilizantes e produtos de limpeza; deve ser manuseada conforme as normas de segurança.',
            model: buildMolecule([
                atom('N', 0, 0, 0), atom('H', 0.94, 0, -0.33),
                atom('H', -0.47, 0.81, -0.33), atom('H', -0.47, -0.81, -0.33)
            ], [[0, 1, 1], [0, 2, 1], [0, 3, 1]])
        }),
        makeMolecule({
            id: 'oxygen', name: 'Gás oxigênio', formula: 'O₂', structure: 'O=O',
            category: 'Moléculas simples', bondType: 'Ligação covalente dupla O=O.',
            geometry: 'Linear (molécula diatômica).', properties: 'Molécula apolar formada por dois átomos do mesmo elemento.',
            applications: 'Participa da respiração celular, de combustões e de processos industriais.',
            model: buildMolecule([atom('O', -0.62, 0, 0), atom('O', 0.62, 0, 0)], [[0, 1, 2]])
        }),
        makeMolecule({
            id: 'nitrogen', name: 'Gás nitrogênio', formula: 'N₂', structure: 'N≡N',
            category: 'Moléculas simples', bondType: 'Ligação covalente tripla N≡N.',
            geometry: 'Linear (molécula diatômica).', properties: 'A ligação tripla é forte; o N₂ é pouco reativo em condições ambientes.',
            applications: 'Compõe a maior parte do ar atmosférico; é matéria-prima para a produção de amônia.',
            model: buildMolecule([atom('N', -0.68, 0, 0), atom('N', 0.68, 0, 0)], [[0, 1, 3]])
        }),
        makeMolecule({
            id: 'hydrogen-chloride', name: 'Cloreto de hidrogênio', formula: 'HCl', structure: 'H—Cl',
            category: 'Moléculas simples', bondType: 'Ligação covalente polar H—Cl.',
            geometry: 'Linear (molécula diatômica).', properties: 'Ao se dissolver em água, forma solução de ácido clorídrico.',
            applications: 'Ácido clorídrico é usado em processos industriais e existe em baixa concentração no suco gástrico.',
            model: buildMolecule([atom('H', -0.55, 0, 0), atom('Cl', 0.55, 0, 0)], [[0, 1, 1]])
        }),
        makeMolecule({
            id: 'ethane', name: 'Etano', formula: 'C₂H₆', structure: 'CH₃—CH₃',
            category: 'Hidrocarbonetos', bondType: 'Ligações covalentes simples; ligação C—C σ.',
            geometry: 'Cada carbono é aproximadamente tetraédrico; há rotação em torno da ligação C—C.',
            properties: 'Alcano de cadeia aberta e saturada; apolar e gasoso em condições ambientes.',
            applications: 'Componente do gás natural e matéria-prima para a produção de eteno.',
            model: buildMolecule([atom('C', -0.76, 0, 0), atom('C', 0.76, 0, 0)], [[0, 1, 1]])
        }),
        makeMolecule({
            id: 'propane', name: 'Propano', formula: 'C₃H₈', structure: 'CH₃—CH₂—CH₃',
            category: 'Hidrocarbonetos', bondType: 'Ligações covalentes simples C—C e C—H.',
            geometry: 'Carbonos aproximadamente tetraédricos; cadeia em conformação angular.',
            properties: 'Alcano apolar, gasoso em condições ambientes e facilmente liquefeito sob pressão.',
            applications: 'Componente do GLP usado em fogões e aquecimento.',
            model: buildMolecule([
                atom('C', -1.2, 0, 0), atom('C', 0, 0.55, 0.1), atom('C', 1.2, 0, 0)
            ], [[0, 1, 1], [1, 2, 1]])
        }),
        makeMolecule({
            id: 'butane', name: 'Butano', formula: 'C₄H₁₀', structure: 'CH₃—CH₂—CH₂—CH₃',
            category: 'Hidrocarbonetos', bondType: 'Ligações covalentes simples C—C e C—H.',
            geometry: 'Carbonos aproximadamente tetraédricos; cadeia flexível com rotação C—C.',
            properties: 'Alcano apolar, inflamável e componente do GLP.',
            applications: 'Combustível e propelente em produtos pressurizados adequados.',
            model: buildMolecule([
                atom('C', -1.8, 0, 0), atom('C', -0.6, 0.55, 0.1),
                atom('C', 0.6, 0.55, -0.1), atom('C', 1.8, 0, 0)
            ], [[0, 1, 1], [1, 2, 1], [2, 3, 1]])
        }),
        makeMolecule({
            id: 'ethene', name: 'Eteno', formula: 'C₂H₄', structure: 'CH₂=CH₂',
            category: 'Hidrocarbonetos', bondType: 'Ligação dupla C=C (uma σ e uma π) e ligações C—H.',
            geometry: 'Trigonal plana em cada carbono; molécula plana.',
            properties: 'Alceno apolar e insaturado; a ligação π permite reações de adição.',
            applications: 'Matéria-prima para fabricar polietileno e outros produtos químicos.',
            model: buildMolecule([
                atom('C', -0.7, 0, 0), atom('C', 0.7, 0, 0),
                atom('H', -1.15, 0.78, 0), atom('H', -1.15, -0.78, 0),
                atom('H', 1.15, 0.78, 0), atom('H', 1.15, -0.78, 0)
            ], [[0, 1, 2], [0, 2, 1], [0, 3, 1], [1, 4, 1], [1, 5, 1]])
        }),
        makeMolecule({
            id: 'propene', name: 'Propeno', formula: 'C₃H₆', structure: 'CH₂=CH—CH₃',
            category: 'Hidrocarbonetos', bondType: 'Ligação dupla C=C e ligações simples C—C/C—H.',
            geometry: 'Trigonal plana na região C=C; carbono do metil aproximadamente tetraédrico.',
            properties: 'Alceno apolar e inflamável; a ligação dupla permite reações de adição.',
            applications: 'Matéria-prima para produção de polipropileno.',
            model: buildMolecule([
                atom('C', -0.7, 0, 0), atom('C', 0.7, 0, 0), atom('C', 1.4, 1.21, 0),
                atom('H', -1.13, 0.75, 0), atom('H', -1.13, -0.75, 0), atom('H', 1.23, -0.91, 0),
                atom('H', 2.26, 1.21, 0), atom('H', 1.0, 2.0, 0), atom('H', 1.4, 1.21, 1)
            ], [
                [0, 1, 2], [1, 2, 1], [0, 3, 1], [0, 4, 1], [1, 5, 1],
                [2, 6, 1], [2, 7, 1], [2, 8, 1]
            ])
        }),
        makeMolecule({
            id: 'ethyne', name: 'Etino (acetileno)', formula: 'C₂H₂', structure: 'HC≡CH',
            category: 'Hidrocarbonetos', bondType: 'Ligação tripla C≡C (uma σ e duas π).',
            geometry: 'Linear em torno dos carbonos da ligação tripla.', properties: 'Alcino de cadeia aberta, com elevada insaturação.',
            applications: 'Usado como matéria-prima e em processos de soldagem com equipamentos próprios.',
            model: buildMolecule([
                atom('H', -1.7, 0, 0), atom('C', -0.85, 0, 0),
                atom('C', 0.85, 0, 0), atom('H', 1.7, 0, 0)
            ], [[0, 1, 1], [1, 2, 3], [2, 3, 1]])
        }),
        makeMolecule({
            id: 'benzene', name: 'Benzeno', formula: 'C₆H₆', structure: 'Anel aromático de seis carbonos (representação de Kekulé).',
            category: 'Hidrocarbonetos', bondType: 'Ligações covalentes C—C aromáticas e C—H.',
            geometry: 'Anel hexagonal plano; cada carbono é trigonal plano.',
            properties: 'A aromaticidade é descrita por elétrons π deslocalizados; as ligações C—C reais são equivalentes.',
            applications: 'Matéria-prima petroquímica; é tóxico e seu manuseio exige controle ocupacional rigoroso.',
            model: buildMolecule(
                carbonRing(1.45),
                Array.from({ length: 6 }, (_, index) => [index, (index + 1) % 6, index % 2 ? 1 : 2])
            )
        }),
        makeMolecule({
            id: 'cyclohexane', name: 'Ciclo-hexano', formula: 'C₆H₁₂', structure: 'Anel saturado com seis grupos CH₂.',
            category: 'Hidrocarbonetos', bondType: 'Ligações covalentes simples C—C e C—H.',
            geometry: 'Anel flexível; a conformação cadeira reduz tensões angulares.',
            properties: 'Cicloalcano apolar; a representação mostra uma conformação tridimensional aproximada.',
            applications: 'Solvente e matéria-prima para produção industrial de polímeros.',
            model: buildMolecule(
                carbonChair(1.35),
                Array.from({ length: 6 }, (_, index) => [index, (index + 1) % 6, 1])
            )
        }),
        makeMolecule({
            id: 'cis-but-2-ene', name: 'cis-but-2-eno', formula: 'C₄H₈', structure: 'CH₃ grupos do mesmo lado da ligação C=C.',
            category: 'Isomeria', bondType: 'Ligação dupla C=C e ligações simples C—C/C—H.',
            geometry: 'Plana na região da dupla; substituintes de referência no mesmo lado (Z/cis).',
            properties: 'A rotação limitada da ligação dupla permite isomeria geométrica.',
            applications: 'Exemplo didático para relacionar conectividade, disposição espacial e propriedades de isômeros.',
            model: buildMolecule([
                atom('C', -0.62, 0, 0), atom('C', 0.62, 0, 0),
                atom('C', -1.48, 0.84, 0), atom('C', 1.48, 0.84, 0)
            ], [[0, 1, 2], [0, 2, 1], [1, 3, 1]])
        }),
        makeMolecule({
            id: 'trans-but-2-ene', name: 'trans-but-2-eno', formula: 'C₄H₈', structure: 'CH₃ grupos em lados opostos da ligação C=C.',
            category: 'Isomeria', bondType: 'Ligação dupla C=C e ligações simples C—C/C—H.',
            geometry: 'Plana na região da dupla; substituintes de referência em lados opostos (E/trans).',
            properties: 'Tem a mesma fórmula e conectividade do cis-but-2-eno, mas diferente arranjo espacial.',
            applications: 'Comparar os isômeros ajuda a entender por que forma espacial pode modificar propriedades.',
            model: buildMolecule([
                atom('C', -0.62, 0, 0), atom('C', 0.62, 0, 0),
                atom('C', -1.48, 0.84, 0), atom('C', 1.48, -0.84, 0)
            ], [[0, 1, 2], [0, 2, 1], [1, 3, 1]])
        }),
        makeMolecule({
            id: 'methanol', name: 'Metanol', formula: 'CH₄O', structure: 'CH₃—OH',
            category: 'Funções orgânicas', bondType: 'Ligações covalentes C—O, O—H e C—H.',
            geometry: 'Carbono aproximadamente tetraédrico; oxigênio com geometria angular de pares eletrônicos.',
            properties: 'Álcool de cadeia curta; polar, miscível em água e tóxico por ingestão ou exposição indevida.',
            applications: 'Solvente e matéria-prima industrial; não deve ser consumido como bebida.',
            model: buildMolecule([atom('C', -0.55, 0, 0), atom('O', 0.75, 0.15, 0)], [[0, 1, 1]])
        }),
        makeMolecule({
            id: 'ethanol', name: 'Etanol', formula: 'C₂H₆O', structure: 'CH₃—CH₂—OH',
            category: 'Funções orgânicas', bondType: 'Ligações covalentes simples C—C, C—O, O—H e C—H.',
            geometry: 'Carbonos aproximadamente tetraédricos; grupo hidroxila angular.',
            properties: 'Álcool polar; a hidroxila forma ligações de hidrogênio com moléculas de água.',
            applications: 'Combustível, solvente e antisséptico em formulações adequadas; bebidas são apenas uma das aplicações.',
            model: buildMolecule([
                atom('C', -1, 0, 0), atom('C', 0.25, 0.45, 0), atom('O', 1.35, -0.1, 0.25)
            ], [[0, 1, 1], [1, 2, 1]])
        }),
        makeMolecule({
            id: 'propan-2-ol', name: 'Propan-2-ol (isopropanol)', formula: 'C₃H₈O', structure: '(CH₃)₂CH—OH',
            category: 'Funções orgânicas', bondType: 'Ligações covalentes simples; hidroxila de álcool secundário.',
            geometry: 'Carbonos tetraédricos; carbono ligado à hidroxila conecta-se a dois carbonos.',
            properties: 'Líquido volátil e inflamável; a volatilidade exige ventilação e cuidado com fontes de ignição.',
            applications: 'Solvente e componente de alguns produtos de limpeza e antissépticos.',
            model: buildMolecule([
                atom('C', -1.3, -0.3, 0), atom('C', 0, 0.35, 0), atom('C', 1.3, -0.3, 0),
                atom('O', 0, 1.55, 0)
            ], [[0, 1, 1], [1, 2, 1], [1, 3, 1]])
        }),
        makeMolecule({
            id: 'methanal', name: 'Metanal (formaldeído)', formula: 'CH₂O', structure: 'H₂C=O',
            category: 'Funções orgânicas', bondType: 'Carbonila C=O polar e ligações C—H.',
            geometry: 'Trigonal plana em torno do carbono da carbonila.',
            properties: 'Aldeído simples; formaldeído é tóxico e sua exposição requer controle rigoroso.',
            applications: 'Usado como matéria-prima em resinas e processos industriais controlados.',
            model: buildMolecule([
                atom('C', 0, 0, 0), atom('O', 0, 1.2, 0),
                atom('H', -1.04, -0.6, 0), atom('H', 1.04, -0.6, 0)
            ], [[0, 1, 2], [0, 2, 1], [0, 3, 1]])
        }),
        makeMolecule({
            id: 'ethanal', name: 'Etanal (acetaldeído)', formula: 'C₂H₄O', structure: 'CH₃—CHO',
            category: 'Funções orgânicas', bondType: 'Carbonila C=O e ligações covalentes C—C/C—H.',
            geometry: 'Trigonal plana no carbono da carbonila; carbono do metil tetraédrico.',
            properties: 'Aldeído de dois carbonos; o grupo carbonila é polar.',
            applications: 'Intermediário em sínteses e processos industriais.',
            model: buildMolecule([
                atom('C', -1.04, -0.6, 0), atom('C', 0, 0, 0), atom('O', 0, 1.2, 0)
            ], [[0, 1, 1], [1, 2, 2]])
        }),
        makeMolecule({
            id: 'propanone', name: 'Propanona (acetona)', formula: 'C₃H₆O', structure: 'CH₃—C(=O)—CH₃',
            category: 'Funções orgânicas', bondType: 'Carbonila C=O e ligações simples C—C.',
            geometry: 'Trigonal plana no carbono carbonílico; carbonos dos metis tetraédricos.',
            properties: 'Cetona polar, volátil e inflamável; solvente orgânico miscível em água.',
            applications: 'Solvente em laboratório e em alguns removedores, seguindo as instruções de uso.',
            model: buildMolecule([
                atom('C', -1.04, -0.6, 0), atom('C', 0, 0, 0),
                atom('C', 1.04, -0.6, 0), atom('O', 0, 1.2, 0)
            ], [[0, 1, 1], [1, 2, 1], [1, 3, 2]])
        }),
        makeMolecule({
            id: 'ethanoic-acid', name: 'Ácido etanoico (acético)', formula: 'C₂H₄O₂', structure: 'CH₃—C(=O)—OH',
            category: 'Funções orgânicas', bondType: 'Carboxila com C=O e C—O; ligações covalentes polares.',
            geometry: 'Trigonal plana em torno do carbono carboxílico.',
            properties: 'Ácido carboxílico fraco; a ionização em água é parcial.',
            applications: 'Principal componente ácido do vinagre culinário em concentração apropriada.',
            model: buildMolecule([
                atom('C', -1.04, -0.6, 0), atom('C', 0, 0, 0),
                atom('O', 0, 1.2, 0), atom('O', 1.04, -0.6, 0)
            ], [[0, 1, 1], [1, 2, 2], [1, 3, 1]])
        }),
        makeMolecule({
            id: 'glycerol', name: 'Glicerol', formula: 'C₃H₈O₃', structure: 'HO—CH₂—CH(OH)—CH₂—OH',
            category: 'Funções orgânicas', bondType: 'Álcool tri-hidroxilado; ligações covalentes C—C, C—O, O—H e C—H.',
            geometry: 'Carbonos aproximadamente tetraédricos; conformação espacial flexível.',
            properties: 'Triol polar e higroscópico; suas três hidroxilas favorecem ligações de hidrogênio.',
            applications: 'Umectante em cosméticos, alimentos e formulações farmacêuticas.',
            model: buildMolecule([
                atom('C', -1.15, 0, 0), atom('C', 0, 0.55, 0.1), atom('C', 1.15, 0, 0),
                atom('O', -1.65, -1.05, 0), atom('O', 0, 1.75, 0.1), atom('O', 1.65, -1.05, 0)
            ], [[0, 1, 1], [1, 2, 1], [0, 3, 1], [1, 4, 1], [2, 5, 1]])
        }),
        makeMolecule({
            id: 'citric-acid', name: 'Ácido cítrico', formula: 'C₆H₈O₇',
            structure: 'HOOC—CH₂—C(OH)(COOH)—CH₂—COOH',
            category: 'Funções orgânicas', bondType: 'Três grupos carboxila, um álcool e ligações covalentes.',
            geometry: 'Geometria tetraédrica aproximada nos carbonos saturados e trigonal plana nas carboxilas.',
            properties: 'Ácido orgânico triprótico; os grupos polares favorecem sua solubilidade em água.',
            applications: 'Presente em frutas cítricas e usado como acidulante e agente quelante em alimentos e limpeza.',
            model: buildMolecule([
                atom('C', 0, 0, 0), atom('C', -1.25, 0.55, 0.1), atom('C', -2.4, -0.1, 0),
                atom('C', 1.25, 0.55, -0.1), atom('C', 2.4, -0.1, 0), atom('C', 0, -1.4, 0),
                atom('O', 0, 1.38, 0), atom('O', -2.4, -1.32, 0), atom('O', -3.45, 0.48, 0),
                atom('O', 2.4, -1.32, 0), atom('O', 3.45, 0.48, 0),
                atom('O', 1, -2, 0), atom('O', -1, -2, 0)
            ], [
                [0, 1, 1], [1, 2, 1], [0, 3, 1], [3, 4, 1], [0, 5, 1], [0, 6, 1],
                [2, 7, 2], [2, 8, 1], [4, 9, 2], [4, 10, 1], [5, 11, 2], [5, 12, 1]
            ])
        }),
        makeMolecule({
            id: 'ethyl-acetate', name: 'Etanoato de etila', formula: 'C₄H₈O₂', structure: 'CH₃—C(=O)—O—CH₂—CH₃',
            category: 'Funções orgânicas', bondType: 'Éster; ligações covalentes e carbonila C=O.',
            geometry: 'Carbono carbonílico trigonal plano; restante da cadeia aproximadamente tetraédrico.',
            properties: 'Éster orgânico volátil; aroma, solubilidade e propriedades variam com a estrutura.',
            applications: 'Solvente em tintas, adesivos e processos de extração.',
            model: buildMolecule([
                atom('C', -1.04, -0.6, 0), atom('C', 0, 0, 0), atom('O', 0, 1.2, 0),
                atom('O', 1.04, -0.6, 0), atom('C', 1.84, 0.17, 0.2), atom('C', 2.73, -0.28, 0.7)
            ], [[0, 1, 1], [1, 2, 2], [1, 3, 1], [3, 4, 1], [4, 5, 1]])
        }),
        makeMolecule({
            id: 'dimethyl-ether', name: 'Dimetil éter (metoximetano)', formula: 'C₂H₆O', structure: 'CH₃—O—CH₃',
            category: 'Funções orgânicas', bondType: 'Ligações covalentes simples C—O—C.',
            geometry: 'Angular em torno do oxigênio; carbonos aproximadamente tetraédricos.',
            properties: 'Éter de fórmula igual à do etanol, mas conectividade e função diferentes.',
            applications: 'Propelente e matéria-prima em aplicações industriais controladas.',
            model: buildMolecule([
                atom('C', -1.03, -0.73, 0), atom('O', 0, 0, 0), atom('C', 1.03, -0.73, 0)
            ], [[0, 1, 1], [1, 2, 1]])
        }),
        makeMolecule({
            id: 'diethyl-ether', name: 'Éter etílico (etoxietano)', formula: 'C₄H₁₀O', structure: 'CH₃—CH₂—O—CH₂—CH₃',
            category: 'Funções orgânicas', bondType: 'Éter; ligações covalentes simples C—C e C—O.',
            geometry: 'Angular em torno do oxigênio; carbonos aproximadamente tetraédricos.',
            properties: 'Éter volátil e inflamável; forma vapores que exigem cuidado e ventilação.',
            applications: 'Solvente em laboratórios e processos industriais controlados.',
            model: buildMolecule([
                atom('C', -1.75, 0, 0), atom('C', -0.7, 0.55, 0), atom('O', 0.35, 0, 0.1),
                atom('C', 1.4, 0.55, 0), atom('C', 2.45, 0, 0)
            ], [[0, 1, 1], [1, 2, 1], [2, 3, 1], [3, 4, 1]])
        }),
        makeMolecule({
            id: 'methylamine', name: 'Metilamina', formula: 'CH₅N', structure: 'CH₃—NH₂',
            category: 'Funções orgânicas', bondType: 'Ligações covalentes simples C—N, N—H e C—H.',
            geometry: 'Nitrogênio aproximadamente piramidal; carbono tetraédrico.',
            properties: 'Amina primária; o par de elétrons não ligante contribui para seu caráter básico.',
            applications: 'Intermediário de síntese em processos industriais.',
            model: buildMolecule([atom('C', -0.7, -0.15, 0), atom('N', 0.65, 0.15, 0)], [[0, 1, 1]])
        }),
        makeMolecule({
            id: 'ethanamide', name: 'Etanamida (acetamida)', formula: 'C₂H₅NO', structure: 'CH₃—C(=O)—NH₂',
            category: 'Funções orgânicas', bondType: 'Amida; carbonila C=O e ligação C—N.',
            geometry: 'Região da amida aproximadamente plana devido à deslocalização eletrônica.',
            properties: 'A ressonância da amida reduz a basicidade do nitrogênio em relação a aminas.',
            applications: 'Intermediário químico em síntese orgânica.',
            planarNitrogens: [3],
            model: buildMolecule([
                atom('C', -1.04, -0.6, 0), atom('C', 0, 0, 0), atom('O', 0, 1.2, 0), atom('N', 1.04, -0.6, 0)
            ], [[0, 1, 1], [1, 2, 2], [1, 3, 1]], { planarNitrogens: [3] })
        }),
        makeMolecule({
            id: 'urea', name: 'Ureia', formula: 'CH₄N₂O', structure: 'H₂N—C(=O)—NH₂',
            category: 'Cotidiano e biologia', bondType: 'Amida; carbonila C=O e ligações C—N.',
            geometry: 'Estrutura aproximadamente plana ao redor do grupo carbonila.',
            properties: 'Composto nitrogenado polar; dissolução em água envolve interações intermoleculares.',
            applications: 'Produção de fertilizantes e presença no metabolismo de excreção de nitrogênio.',
            planarNitrogens: [2, 3],
            model: buildMolecule([
                atom('C', 0, 0, 0), atom('O', 0, 1.2, 0),
                atom('N', -1.04, -0.6, 0), atom('N', 1.04, -0.6, 0)
            ], [[0, 1, 2], [0, 2, 1], [0, 3, 1]], { planarNitrogens: [2, 3] })
        }),
        makeMolecule({
            id: 'glycine', name: 'Glicina', formula: 'C₂H₅NO₂', structure: 'H₂N—CH₂—COOH',
            category: 'Cotidiano e biologia', bondType: 'Amina e ácido carboxílico; ligações covalentes.',
            geometry: 'Carbonos tetraédricos e grupo carboxila aproximadamente plano.',
            properties: 'Aminoácido mais simples; em água pode predominar como íon dipolar (zwitteríon).',
            applications: 'Unidade estrutural de proteínas e composto utilizado em pesquisas bioquímicas.',
            model: buildMolecule([
                atom('N', -1.55, 0, 0), atom('C', -0.25, 0, 0), atom('C', 0.85, 0.65, 0),
                atom('O', 0.8, 1.86, 0), atom('O', 1.9, 0.05, 0)
            ], [[0, 1, 1], [1, 2, 1], [2, 3, 2], [2, 4, 1]])
        }),
        makeMolecule({
            id: 'glucose', name: 'Glicose (forma cíclica simplificada)', formula: 'C₆H₁₂O₆',
            structure: 'Anel de seis membros com um oxigênio, cinco grupos hidroxila e cadeia lateral CH₂OH.',
            category: 'Cotidiano e biologia', bondType: 'Ligações covalentes C—C, C—O, O—H e C—H.',
            geometry: 'Anel não plano; a conformação foi simplificada para evidenciar conectividade e profundidade.',
            properties: 'Monossacarídeo com várias hidroxilas; a molécula real apresenta conformações e estereoquímica específicas.',
            applications: 'Fonte de energia metabólica e unidade estrutural de carboidratos mais complexos.',
            model: (() => {
                const ring = Array.from({ length: 6 }, (_, index) => {
                    const angle = 2 * Math.PI * index / 6;
                    return atom(index === 0 ? 'O' : 'C', 1.25 * Math.cos(angle), 1.25 * Math.sin(angle), index % 2 ? 0.24 : -0.24);
                });
                const substituents = [
                    atom('O', 0.95, 1.75, -0.5), atom('O', -0.95, 1.75, 0.5),
                    atom('O', -1.8, 0.25, -0.45), atom('O', -1.0, -1.7, 0.45),
                    atom('C', 1.95, -1.2, -0.5), atom('O', 2.95, -0.85, -0.2)
                ];
                const base = [...ring, ...substituents];
                const links = [[0, 1, 1], [1, 2, 1], [2, 3, 1], [3, 4, 1], [4, 5, 1], [5, 0, 1],
                    [1, 6, 1], [2, 7, 1], [3, 8, 1], [4, 9, 1], [5, 10, 1], [10, 11, 1]];
                return buildMolecule(base, links);
            })()
        })
    ];

    const elementOrder = ['C', 'H', 'O', 'N', 'F', 'Cl', 'S', 'Na', 'Ca', 'Fe'];
    const elementClasses = {
        C: 'carbon', H: 'hydrogen', O: 'oxygen', N: 'nitrogen',
        F: 'fluorine', Cl: 'chlorine', S: 'sulfur', Na: 'sodium', Ca: 'calcium', Fe: 'iron',
        p: 'proton', n: 'neutron', e: 'electron'
    };
    const particleNames = { p: 'Próton', n: 'Nêutron', e: 'Elétron' };
    const displayFormula = formula => formula.replace(/([A-Z][a-z]?)([0-9]+)/g, '$1<sub>$2</sub>');

    function escapeHtml(value) {
        return String(value).replace(/[&<>"']/g, character => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
        })[character]);
    }

    function elementSummary(model) {
        const elements = [...new Set(model.atoms.map(item => item.element))];
        return elements
            .filter(element => elementNames[element] || particleNames[element])
            .sort((a, b) => {
                const indexA = elementOrder.indexOf(a);
                const indexB = elementOrder.indexOf(b);
                return (indexA === -1 ? elementOrder.length : indexA) - (indexB === -1 ? elementOrder.length : indexB);
            })
            .map(element => `<span class="lab3d-element-chip"><i class="element-dot element-${elementClasses[element]}" aria-hidden="true"></i>${escapeHtml(elementNames[element] || particleNames[element])} (${escapeHtml(element)})</span>`)
            .join('');
    }

    function formulaCounts(model) {
        return model.atoms.reduce((counts, item) => {
            if (elementNames[item.element]) counts[item.element] = (counts[item.element] || 0) + 1;
            return counts;
        }, {});
    }

    const validFormulaCounts = {
        'calcium-carbonate': { Ca: 1, C: 1, O: 3 }, 'water': { H: 2, O: 1 },
        'carbon-dioxide': { C: 1, O: 2 }, 'carbon-monoxide': { C: 1, O: 1 },
        ozone: { O: 3 }, 'sulfur-dioxide': { S: 1, O: 2 }, methane: { C: 1, H: 4 },
        ammonia: { H: 3, N: 1 }, oxygen: { O: 2 }, nitrogen: { N: 2 }, 'hydrogen-chloride': { H: 1, Cl: 1 },
        ethane: { C: 2, H: 6 }, propane: { C: 3, H: 8 }, butane: { C: 4, H: 10 },
        ethene: { C: 2, H: 4 }, propene: { C: 3, H: 6 }, ethyne: { C: 2, H: 2 },
        benzene: { C: 6, H: 6 }, cyclohexane: { C: 6, H: 12 }, 'cis-but-2-ene': { C: 4, H: 8 },
        'trans-but-2-ene': { C: 4, H: 8 }, methanol: { C: 1, H: 4, O: 1 }, ethanol: { C: 2, H: 6, O: 1 },
        'propan-2-ol': { C: 3, H: 8, O: 1 }, glycerol: { C: 3, H: 8, O: 3 },
        'citric-acid': { C: 6, H: 8, O: 7 }, methanal: { C: 1, H: 2, O: 1 },
        ethanal: { C: 2, H: 4, O: 1 }, propanone: { C: 3, H: 6, O: 1 },
        'ethanoic-acid': { C: 2, H: 4, O: 2 }, 'ethyl-acetate': { C: 4, H: 8, O: 2 },
        'dimethyl-ether': { C: 2, H: 6, O: 1 }, 'diethyl-ether': { C: 4, H: 10, O: 1 },
        methylamine: { C: 1, H: 5, N: 1 },
        ethanamide: { C: 2, H: 5, N: 1, O: 1 }, urea: { C: 1, H: 4, N: 2, O: 1 },
        glycine: { C: 2, H: 5, N: 1, O: 2 }, glucose: { C: 6, H: 12, O: 6 }
    };

    const chemicalMetadata = {
        'hydrogen-atom': { classification: 'Átomo isolado', polarity: 'Não aplicável' },
        'carbon-atom': { classification: 'Átomo isolado', polarity: 'Não aplicável' },
        'iron-lattice': { classification: 'Sólido metálico', polarity: 'Não se aplica a uma rede metálica' },
        'sodium-chloride': { classification: 'Composto iônico', polarity: 'Não se classifica como molécula polar ou apolar' },
        'calcium-carbonate': { classification: 'Sal inorgânico (rede cristalina)', polarity: 'Não se classifica como molécula polar ou apolar' },
        water: { classification: 'Substância inorgânica · óxido', polarity: 'Polar' },
        'carbon-dioxide': { classification: 'Substância inorgânica · óxido', polarity: 'Apolar' },
        'carbon-monoxide': { classification: 'Substância inorgânica · óxido', polarity: 'Polar' },
        ozone: { classification: 'Substância simples · alótropo do oxigênio', polarity: 'Polar' },
        'sulfur-dioxide': { classification: 'Substância inorgânica · óxido', polarity: 'Polar' },
        methane: { classification: 'Hidrocarboneto · alcano', polarity: 'Apolar' },
        ammonia: { classification: 'Substância inorgânica · hidreto', polarity: 'Polar' },
        oxygen: { classification: 'Substância simples · ametal', polarity: 'Apolar' },
        nitrogen: { classification: 'Substância simples · ametal', polarity: 'Apolar' },
        'hydrogen-chloride': { classification: 'Substância inorgânica · haleto de hidrogênio', polarity: 'Polar' },
        ethane: { classification: 'Hidrocarboneto · alcano', polarity: 'Apolar' },
        propane: { classification: 'Hidrocarboneto · alcano', polarity: 'Apolar' },
        butane: { classification: 'Hidrocarboneto · alcano', polarity: 'Apolar' },
        ethene: { classification: 'Hidrocarboneto · alceno', polarity: 'Apolar' },
        propene: { classification: 'Hidrocarboneto · alceno', polarity: 'Apolar' },
        ethyne: { classification: 'Hidrocarboneto · alcino', polarity: 'Apolar' },
        benzene: { classification: 'Hidrocarboneto aromático', polarity: 'Apolar' },
        cyclohexane: { classification: 'Hidrocarboneto · cicloalcano', polarity: 'Apolar' },
        'cis-but-2-ene': { classification: 'Hidrocarboneto · alceno (cis)', polarity: 'Polaridade baixa' },
        'trans-but-2-ene': { classification: 'Hidrocarboneto · alceno (trans)', polarity: 'Apolar' },
        methanol: { classification: 'Função orgânica · álcool', polarity: 'Polar' },
        ethanol: { classification: 'Função orgânica · álcool', polarity: 'Polar' },
        'propan-2-ol': { classification: 'Função orgânica · álcool', polarity: 'Polar' },
        glycerol: { classification: 'Função orgânica · triol', polarity: 'Polar' },
        methanal: { classification: 'Função orgânica · aldeído', polarity: 'Polar' },
        ethanal: { classification: 'Função orgânica · aldeído', polarity: 'Polar' },
        propanone: { classification: 'Função orgânica · cetona', polarity: 'Polar' },
        'ethanoic-acid': { classification: 'Função orgânica · ácido carboxílico', polarity: 'Polar' },
        'citric-acid': { classification: 'Função orgânica · ácido carboxílico', polarity: 'Polar' },
        'ethyl-acetate': { classification: 'Função orgânica · éster', polarity: 'Polar' },
        'dimethyl-ether': { classification: 'Função orgânica · éter', polarity: 'Polar' },
        'diethyl-ether': { classification: 'Função orgânica · éter', polarity: 'Polar' },
        methylamine: { classification: 'Função orgânica · amina', polarity: 'Polar' },
        ethanamide: { classification: 'Função orgânica · amida', polarity: 'Polar' },
        urea: { classification: 'Função orgânica · diamida', polarity: 'Polar' },
        glycine: { classification: 'Aminoácido', polarity: 'Polar; pode estar na forma zwitteriônica em água' },
        glucose: { classification: 'Carboidrato · monossacarídeo', polarity: 'Polar' }
    };

    const atomicMasses = {
        H: 1.008, C: 12.011, N: 14.007, O: 15.999, F: 18.998, Cl: 35.45,
        S: 32.06, Na: 22.990, Ca: 40.078, Fe: 55.845
    };
    const formulaSubscripts = { '₀': '0', '₁': '1', '₂': '2', '₃': '3', '₄': '4', '₅': '5', '₆': '6', '₇': '7', '₈': '8', '₉': '9' };
    const formulaSuperscripts = { '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9' };

    function classificationFor(item) {
        return chemicalMetadata[item.id]?.classification || item.category;
    }

    function polarityFor(item) {
        return chemicalMetadata[item.id]?.polarity || 'Não informada';
    }

    function molarMassFor(item) {
        const isotope = item.formula.match(/^([⁰¹²³⁴⁵⁶⁷⁸⁹]+)([A-Z][a-z]?)$/);
        if (isotope) {
            const massNumber = Number([...isotope[1]].map(digit => formulaSuperscripts[digit]).join(''));
            return Number.isFinite(massNumber) ? `${massNumber.toFixed(2).replace('.', ',')} g/mol` : '—';
        }

        const formula = item.formula
            .replace(/[⁺⁻].*$/, '')
            .replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]+$/, '')
            .replace(/^[⁰¹²³⁴⁵⁶⁷⁸⁹]+(?=[A-Z])/, '')
            .replace(/[₀₁₂₃₄₅₆₇₈₉]/g, digit => formulaSubscripts[digit]);
        const matches = [...formula.matchAll(/([A-Z][a-z]?)(\d*)/g)];
        if (!matches.length || matches.map(match => match[0]).join('') !== formula) return '—';
        const mass = matches.reduce((total, match) => {
            const atomicMass = atomicMasses[match[1]];
            return atomicMass ? total + atomicMass * Number(match[2] || 1) : NaN;
        }, 0);
        return Number.isFinite(mass) ? `${mass.toFixed(2).replace('.', ',')} g/mol` : '—';
    }

    function bondOrderInfo(order) {
        if (order === 0) return { label: 'Iônica', symbol: '···' };
        if (order === 1) return { label: 'Simples', symbol: '—' };
        if (order === 2) return { label: 'Dupla', symbol: '=' };
        if (order === 3) return { label: 'Tripla', symbol: '≡' };
        return { label: `Ressonante (ordem média ${String(order).replace('.', ',')})`, symbol: '≈' };
    }

    function bondSummary(model) {
        if (!model.bonds.length) return 'Não há ligações discretas nesta representação de átomo ou rede.';
        const totals = new Map();
        model.bonds.forEach(([, , order]) => {
            const { label } = bondOrderInfo(order);
            totals.set(label, (totals.get(label) || 0) + 1);
        });
        return [...totals].map(([label, total]) => `${label}: ${total}`).join(' · ');
    }

    molecules.forEach(item => {
        const expected = validFormulaCounts[item.id];
        if (!expected) return;
        const actual = formulaCounts(item.model);
        if (Object.keys({ ...expected, ...actual }).some(element =>
            (expected[element] || 0) !== (actual[element] || 0)
        )) {
            throw new Error(`A fórmula do modelo ${item.name} não corresponde à fórmula informada.`);
        }
    });

    let activeModel = null;
    let gl = null;
    let program = null;
    let sphereMesh = null;
    let cylinderMesh = null;
    let orbitBuffer = null;
    let animationFrame = 0;
    let previousFrame = 0;
    let autoRotate = true;
    let dragging = false;
    let pointerMoved = false;
    let panDrag = false;
    let previousPointer = null;
    let pointerStart = null;
    let selectedAtomIndex = null;
    let renderStyle = 'ball-stick';
    const camera = { yaw: -0.25, pitch: 0.35, panX: 0, panY: 0, distance: 6, fitDistance: 6 };

    const vertexShaderSource = `
        attribute vec3 aPosition;
        attribute vec3 aNormal;
        uniform mat4 uModelView;
        uniform mat4 uProjection;
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
            vec4 position = uModelView * vec4(aPosition, 1.0);
            vPosition = position.xyz;
            vNormal = mat3(uModelView) * aNormal;
            gl_Position = uProjection * position;
        }
    `;
    const fragmentShaderSource = `
        precision mediump float;
        uniform vec3 uColor;
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
            vec3 normal = normalize(vNormal);
            vec3 lightDirection = normalize(vec3(-0.45, 0.75, 0.85));
            float diffuse = max(dot(normal, lightDirection), 0.0);
            vec3 viewDirection = normalize(-vPosition);
            vec3 reflected = reflect(-lightDirection, normal);
            float specular = pow(max(dot(viewDirection, reflected), 0.0), 24.0);
            vec3 color = uColor * (0.32 + 0.68 * diffuse) + vec3(0.28 * specular);
            gl_FragColor = vec4(color, 1.0);
        }
    `;

    function failRender(message) {
        if (renderError) renderError.hidden = false;
        if (renderErrorMessage) renderErrorMessage.textContent = message;
        const badge = document.querySelector('.lab3d-render-badge');
        if (badge) badge.innerHTML = '<i aria-hidden="true"></i> Renderização indisponível';
    }

    function compileShader(type, source) {
        const shader = gl.createShader(type);
        if (!shader) throw new Error('O navegador não conseguiu criar um shader WebGL.');
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            const message = gl.getShaderInfoLog(shader) || 'Erro desconhecido ao compilar o shader.';
            gl.deleteShader(shader);
            throw new Error(message);
        }
        return shader;
    }

    function createProgram() {
        const vertex = compileShader(gl.VERTEX_SHADER, vertexShaderSource);
        const fragment = compileShader(gl.FRAGMENT_SHADER, fragmentShaderSource);
        const shaderProgram = gl.createProgram();
        if (!shaderProgram) throw new Error('O navegador não conseguiu criar o programa WebGL.');
        gl.attachShader(shaderProgram, vertex);
        gl.attachShader(shaderProgram, fragment);
        gl.linkProgram(shaderProgram);
        gl.deleteShader(vertex);
        gl.deleteShader(fragment);
        if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
            const message = gl.getProgramInfoLog(shaderProgram) || 'Erro desconhecido ao vincular o programa WebGL.';
            gl.deleteProgram(shaderProgram);
            throw new Error(message);
        }
        return shaderProgram;
    }

    function createMesh(vertices) {
        const positionData = [];
        const normalData = [];
        for (let index = 0; index < vertices.length; index += 6) {
            positionData.push(vertices[index], vertices[index + 1], vertices[index + 2]);
            normalData.push(vertices[index + 3], vertices[index + 4], vertices[index + 5]);
        }
        const buffer = gl.createBuffer();
        if (!buffer) throw new Error('O navegador não conseguiu reservar memória para a malha 3D.');
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        return { buffer, count: vertices.length / 6 };
    }

    function triangle(vertices, a, b, c, normalA, normalB = normalA, normalC = normalA) {
        vertices.push(
            a[0], a[1], a[2], normalA[0], normalA[1], normalA[2],
            b[0], b[1], b[2], normalB[0], normalB[1], normalB[2],
            c[0], c[1], c[2], normalC[0], normalC[1], normalC[2]
        );
    }

    function buildSphere() {
        const vertices = [];
        const latitudeSteps = 18;
        const longitudeSteps = 28;
        for (let latitude = 0; latitude < latitudeSteps; latitude += 1) {
            const theta0 = latitude * Math.PI / latitudeSteps;
            const theta1 = (latitude + 1) * Math.PI / latitudeSteps;
            for (let longitude = 0; longitude < longitudeSteps; longitude += 1) {
                const phi0 = longitude * 2 * Math.PI / longitudeSteps;
                const phi1 = (longitude + 1) * 2 * Math.PI / longitudeSteps;
                const point = (theta, phi) => [
                    Math.sin(theta) * Math.cos(phi),
                    Math.cos(theta),
                    Math.sin(theta) * Math.sin(phi)
                ];
                const a = point(theta0, phi0);
                const b = point(theta1, phi0);
                const c = point(theta1, phi1);
                const d = point(theta0, phi1);
                triangle(vertices, a, b, c, a, b, c);
                triangle(vertices, a, c, d, a, c, d);
            }
        }
        return createMesh(vertices);
    }

    function buildCylinder() {
        const vertices = [];
        const steps = 18;
        for (let index = 0; index < steps; index += 1) {
            const a0 = index * 2 * Math.PI / steps;
            const a1 = (index + 1) * 2 * Math.PI / steps;
            const n0 = [Math.cos(a0), 0, Math.sin(a0)];
            const n1 = [Math.cos(a1), 0, Math.sin(a1)];
            const bottom0 = [n0[0], -0.5, n0[2]];
            const bottom1 = [n1[0], -0.5, n1[2]];
            const top0 = [n0[0], 0.5, n0[2]];
            const top1 = [n1[0], 0.5, n1[2]];
            triangle(vertices, bottom0, top0, top1, n0, n0, n1);
            triangle(vertices, bottom0, top1, bottom1, n0, n1, n1);
            triangle(vertices, [0, 0.5, 0], top1, top0, [0, 1, 0]);
            triangle(vertices, [0, -0.5, 0], bottom0, bottom1, [0, -1, 0]);
        }
        return createMesh(vertices);
    }

    function identity() {
        return new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
    }

    function multiply(a, b) {
        const result = new Float32Array(16);
        for (let column = 0; column < 4; column += 1) {
            for (let row = 0; row < 4; row += 1) {
                result[column * 4 + row] =
                    a[row] * b[column * 4] +
                    a[4 + row] * b[column * 4 + 1] +
                    a[8 + row] * b[column * 4 + 2] +
                    a[12 + row] * b[column * 4 + 3];
            }
        }
        return result;
    }

    function translation(x, y, z) {
        const result = identity();
        result[12] = x; result[13] = y; result[14] = z;
        return result;
    }

    function scaling(x, y, z) {
        const result = identity();
        result[0] = x; result[5] = y; result[10] = z;
        return result;
    }

    function rotationX(angle) {
        const c = Math.cos(angle); const s = Math.sin(angle);
        return new Float32Array([1, 0, 0, 0, 0, c, s, 0, 0, -s, c, 0, 0, 0, 0, 1]);
    }

    function rotationY(angle) {
        const c = Math.cos(angle); const s = Math.sin(angle);
        return new Float32Array([c, 0, -s, 0, 0, 1, 0, 0, s, 0, c, 0, 0, 0, 0, 1]);
    }

    function perspective(fov, aspect, near, far) {
        const f = 1 / Math.tan(fov / 2);
        const range = 1 / (near - far);
        return new Float32Array([
            f / aspect, 0, 0, 0,
            0, f, 0, 0,
            0, 0, (far + near) * range, -1,
            0, 0, 2 * far * near * range, 0
        ]);
    }

    function modelMatrix(position, radius, parent, basis = null) {
        let result = multiply(parent, translation(position.x, position.y, position.z));
        if (basis) result = multiply(result, basis);
        return multiply(result, scaling(radius, radius, radius));
    }

    function setColor(color) {
        const hex = color.replace('#', '');
        return [
            parseInt(hex.slice(0, 2), 16) / 255,
            parseInt(hex.slice(2, 4), 16) / 255,
            parseInt(hex.slice(4, 6), 16) / 255
        ];
    }

    function drawMesh(mesh, modelView, color) {
        gl.bindBuffer(gl.ARRAY_BUFFER, mesh.buffer);
        gl.vertexAttribPointer(program.position, 3, gl.FLOAT, false, 24, 0);
        gl.vertexAttribPointer(program.normal, 3, gl.FLOAT, false, 24, 12);
        gl.uniformMatrix4fv(program.modelView, false, modelView);
        gl.uniform3fv(program.color, setColor(color));
        gl.drawArrays(gl.TRIANGLES, 0, mesh.count);
    }

    function cylinderBasis(direction) {
        const reference = Math.abs(direction.y) > 0.94 ? vector(1, 0, 0) : vector(0, 1, 0);
        const right = normalize(cross(reference, direction));
        const forward = normalize(cross(right, direction));
        return new Float32Array([
            right.x, right.y, right.z, 0,
            direction.x, direction.y, direction.z, 0,
            forward.x, forward.y, forward.z, 0,
            0, 0, 0, 1
        ]);
    }

    function drawBond(start, end, order, parent, ionic = false, highlighted = false) {
        const delta = subtract(end, start);
        const length = magnitude(delta);
        if (length < 0.001) return;
        const direction = normalize(delta);
        const basis = cylinderBasis(direction);
        const center = scaleVector(add(start, end), 0.5);
        if (ionic) {
            const segmentCount = 5;
            for (let index = 0; index < segmentCount; index += 1) {
                const t = (index + 0.5) / segmentCount;
                const midpoint = add(start, scaleVector(delta, t));
                const segmentLength = length / (segmentCount * 1.7);
                const placement = multiply(parent, translation(midpoint.x, midpoint.y, midpoint.z));
                const transform = multiply(multiply(placement, basis), scaling(0.045, segmentLength, 0.045));
                drawMesh(cylinderMesh, transform, highlighted ? '#ffe66d' : '#c2b5ee');
            }
            return;
        }

        const offsets = order >= 2.5 ? [-0.12, 0, 0.12] : order >= 1.75 ? [-0.08, 0.08] : [0];
        const offsetAxis = normalize(cross(direction, vector(0, 1, 0)));
        const stableOffset = magnitude(offsetAxis) < 0.01 ? vector(1, 0, 0) : offsetAxis;
        const radius = renderStyle === 'stick' ? 0.085 : order > 1 ? 0.047 : 0.06;
        offsets.forEach(offset => {
            const bondCenter = add(center, scaleVector(stableOffset, offset));
            const placement = multiply(parent, translation(bondCenter.x, bondCenter.y, bondCenter.z));
            const transform = multiply(multiply(placement, basis), scaling(radius, length, radius));
            drawMesh(cylinderMesh, transform, highlighted ? '#ffe66d' : '#c4d2df');
        });
    }

    function drawOrbit(parent, radius) {
        const vertices = [];
        const segments = 72;
        for (let index = 0; index < segments; index += 1) {
            const angle = 2 * Math.PI * index / segments;
            vertices.push(radius * Math.cos(angle), radius * Math.sin(angle), 0);
        }
        gl.bindBuffer(gl.ARRAY_BUFFER, orbitBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);
        gl.vertexAttribPointer(program.position, 3, gl.FLOAT, false, 12, 0);
        gl.disableVertexAttribArray(program.normal);
        gl.vertexAttrib3f(program.normal, 0, 0, 1);
        gl.uniformMatrix4fv(program.modelView, false, parent);
        gl.uniform3fv(program.color, setColor('#6fb8d7'));
        gl.drawArrays(gl.LINE_LOOP, 0, segments);
        gl.enableVertexAttribArray(program.normal);
    }

    function moleculeCenter(atoms) {
        const bounds = atoms.reduce((result, current) => ({
            minX: Math.min(result.minX, current.x), maxX: Math.max(result.maxX, current.x),
            minY: Math.min(result.minY, current.y), maxY: Math.max(result.maxY, current.y),
            minZ: Math.min(result.minZ, current.z), maxZ: Math.max(result.maxZ, current.z)
        }), { minX: Infinity, maxX: -Infinity, minY: Infinity, maxY: -Infinity, minZ: Infinity, maxZ: -Infinity });
        const center = vector(
            (bounds.minX + bounds.maxX) / 2,
            (bounds.minY + bounds.maxY) / 2,
            (bounds.minZ + bounds.maxZ) / 2
        );
        const extent = Math.max(bounds.maxX - bounds.minX, bounds.maxY - bounds.minY, bounds.maxZ - bounds.minZ, 1);
        return { center, extent: extent / 2 };
    }

    function cameraMatrixForModel() {
        return multiply(
            multiply(
                multiply(translation(camera.panX, camera.panY, -camera.distance), rotationX(camera.pitch)),
                rotationY(camera.yaw)
            ),
            translation(-activeModel.center.x, -activeModel.center.y, -activeModel.center.z)
        );
    }

    function transformPoint(matrix, x, y, z) {
        return [
            matrix[0] * x + matrix[4] * y + matrix[8] * z + matrix[12],
            matrix[1] * x + matrix[5] * y + matrix[9] * z + matrix[13],
            matrix[2] * x + matrix[6] * y + matrix[10] * z + matrix[14],
            matrix[3] * x + matrix[7] * y + matrix[11] * z + matrix[15]
        ];
    }

    function pickAtom(clientX, clientY) {
        if (!activeModel) return null;
        const bounds = canvas.getBoundingClientRect();
        const pointerX = clientX - bounds.left;
        const pointerY = clientY - bounds.top;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const pickState = {
            cameraMatrix: cameraMatrixForModel(),
            projection: perspective(Math.PI / 4, width / Math.max(height, 1), 0.1, 100),
            width,
            height
        };
        const radiusScale = renderStyle === 'sphere' ? 1.7 : renderStyle === 'stick' ? 0.65 : 1;
        let closest = null;

        activeModel.atoms.forEach((current, index) => {
            const view = transformPoint(pickState.cameraMatrix, current.x, current.y, current.z);
            const clip = transformPoint(pickState.projection, view[0], view[1], view[2]);
            if (clip[3] <= 0) return;
            const x = (clip[0] / clip[3] + 1) * pickState.width / 2;
            const y = (1 - clip[1] / clip[3]) * pickState.height / 2;
            const viewDepth = Math.max(0.1, -view[2]);
            const radius = (atomRadii[current.element] || 0.24) * radiusScale;
            const projectedRadius = radius * pickState.height / (2 * viewDepth * Math.tan(Math.PI / 8));
            const distance = Math.hypot(pointerX - x, pointerY - y);
            if (distance > Math.max(14, projectedRadius + 8)) return;
            const depth = clip[2] / clip[3];
            if (!closest || depth < closest.depth - 0.015 ||
                (Math.abs(depth - closest.depth) <= 0.015 && distance < closest.distance)) {
                closest = { index, depth, distance };
            }
        });
        return closest ? closest.index : null;
    }

    function atomSymbol(element) {
        return ({ p: 'p⁺', n: 'n⁰', e: 'e⁻' })[element] || element;
    }

    function atomName(element) {
        return elementNames[element] || particleNames[element] || element;
    }

    function atomLabel(model, index) {
        const element = model.atoms[index].element;
        return `${atomName(element)} (${atomSymbol(element)}${index + 1})`;
    }

    function renderBondTable(model) {
        if (!model.bonds.length) {
            bondTableBody.innerHTML = '<tr><td class="lab3d-bond-empty" colspan="3">Esta representação não possui pares de ligação molecular discretos.</td></tr>';
            return;
        }

        bondTableBody.innerHTML = model.bonds.map(([from, to, order]) => {
            const info = bondOrderInfo(order);
            const selected = selectedAtomIndex === from || selectedAtomIndex === to;
            const notation = `${atomSymbol(model.atoms[from].element)}${from + 1} ${info.symbol} ${atomSymbol(model.atoms[to].element)}${to + 1}`;
            return `<tr${selected ? ' class="is-connected"' : ''}>
                <td>${escapeHtml(atomLabel(model, from))}</td>
                <td>${escapeHtml(atomLabel(model, to))}</td>
                <td>${escapeHtml(notation)} · ${escapeHtml(info.label)}</td>
            </tr>`;
        }).join('');
    }

    function updateSelectedAtom(index) {
        selectedAtomIndex = Number.isInteger(index) && index >= 0 && activeModel.atoms[index] ? index : null;
        atomSelector.value = selectedAtomIndex === null ? '' : String(selectedAtomIndex);
        renderBondTable(activeModel);

        if (selectedAtomIndex === null) {
            selectedAtomTitle.textContent = 'Clique em um átomo no modelo ou selecione-o na lista.';
            selectedAtomConnections.innerHTML = '';
            return;
        }

        const selected = activeModel.atoms[selectedAtomIndex];
        selectedAtomTitle.textContent = `${atomName(selected.element)} (${atomSymbol(selected.element)}) · átomo ${selectedAtomIndex + 1}`;
        const connections = activeModel.bonds
            .filter(([from, to]) => from === selectedAtomIndex || to === selectedAtomIndex)
            .map(([from, to, order]) => {
                const neighbor = from === selectedAtomIndex ? to : from;
                const info = bondOrderInfo(order);
                return `<li>Ligado a <strong>${escapeHtml(atomLabel(activeModel, neighbor))}</strong> — ${escapeHtml(info.label)} (${escapeHtml(info.symbol)}).</li>`;
            });
        selectedAtomConnections.innerHTML = connections.length
            ? connections.join('')
            : '<li>Não há ligações discretas associadas a esta partícula nesta representação.</li>';
    }

    function populateAtomSelector(model) {
        atomSelector.innerHTML = '<option value="">Escolha um átomo ou toque nele no modelo</option>' +
            model.atoms.map((current, index) =>
                `<option value="${index}">${escapeHtml(atomName(current.element))} (${escapeHtml(atomSymbol(current.element))}) · ${index + 1}</option>`
            ).join('');
    }

    function renderFrame(timestamp) {
        if (!gl || !program || !activeModel) return;
        if (autoRotate && previousFrame) camera.yaw += Math.min(timestamp - previousFrame, 50) * 0.00065;
        previousFrame = timestamp;

        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const pixelWidth = Math.max(1, Math.round(width * dpr));
        const pixelHeight = Math.max(1, Math.round(height * dpr));
        if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
            canvas.width = pixelWidth;
            canvas.height = pixelHeight;
        }
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.useProgram(program.handle);
        gl.enableVertexAttribArray(program.position);
        gl.enableVertexAttribArray(program.normal);

        const projection = perspective(Math.PI / 4, width / Math.max(height, 1), 0.1, 100);
        gl.uniformMatrix4fv(program.projection, false, projection);
        const cameraMatrix = cameraMatrixForModel();

        activeModel.shells.forEach(radius => drawOrbit(cameraMatrix, radius));
        if (renderStyle !== 'sphere') {
            activeModel.bonds.forEach(([from, to, order]) => {
                const ionic = order === 0;
                const highlighted = selectedAtomIndex === from || selectedAtomIndex === to;
                drawBond(activeModel.atoms[from], activeModel.atoms[to], order, cameraMatrix, ionic, highlighted);
            });
        }
        activeModel.atoms.forEach((current, index) => {
            const color = elementColors[current.element];
            if (!color) return;
            const baseRadius = atomRadii[current.element] || 0.24;
            const radius = baseRadius * (renderStyle === 'sphere' ? 1.7 : renderStyle === 'stick' ? 0.65 : 1);
            if (selectedAtomIndex === index) {
                drawMesh(sphereMesh, modelMatrix(current, radius * 1.55, cameraMatrix), '#ffe66d');
            }
            drawMesh(sphereMesh, modelMatrix(current, radius, cameraMatrix), color);
        });

        animationFrame = window.requestAnimationFrame(renderFrame);
    }

    function setSelectedModel(item) {
        activeModel = {
            id: item.id,
            ...item.model,
            center: moleculeCenter(item.model.atoms).center
        };
        selectedAtomIndex = null;
        populateAtomSelector(activeModel);
        const bounds = moleculeCenter(item.model.atoms);
        camera.fitDistance = Math.max(3, bounds.extent * 3.5 + 2.2);
        camera.distance = camera.fitDistance;
        camera.yaw = -0.25;
        camera.pitch = 0.35;
        camera.panX = 0;
        camera.panY = 0;

        document.getElementById('selected-category').textContent = classificationFor(item).toLocaleUpperCase('pt-BR');
        document.getElementById('selected-name').textContent = item.name;
        document.getElementById('selected-formula').innerHTML = displayFormula(escapeHtml(item.formula));
        document.getElementById('detail-structure').textContent = item.structure;
        const elementDetails = elementSummary(item.model);
        document.getElementById('detail-elements').innerHTML = item.modelType === 'atomic'
            ? `${elementDetails}<span class="lab3d-particle-summary">${item.id === 'hydrogen-atom' ? '1 próton (p⁺), 0 nêutrons e 1 elétron (e⁻).' : '6 prótons (p⁺), 6 nêutrons (n⁰) e 6 elétrons (e⁻).'}</span>`
            : elementDetails;
        document.getElementById('detail-molar-mass').textContent = molarMassFor(item);
        document.getElementById('detail-classification').textContent = classificationFor(item);
        document.getElementById('detail-atom-total').textContent = `${item.model.atoms.length} ${item.modelType === 'atomic' ? 'partículas subatômicas' : 'átomos/íons'}`;
        document.getElementById('detail-bond-total').textContent = String(item.model.bonds.length);
        document.getElementById('detail-bonds').textContent = bondSummary(item.model);
        document.getElementById('detail-geometry').textContent = item.geometry;
        document.getElementById('detail-polarity').textContent = polarityFor(item);
        document.getElementById('detail-properties').textContent = item.properties;
        document.getElementById('detail-applications').textContent = item.applications;
        updateSelectedAtom(null);
        const particleLabel = item.modelType === 'atomic'
            ? `${item.model.atoms.length} partículas subatômicas`
            : `${item.model.atoms.length} ${item.model.atoms.length === 1 ? 'átomo ou íon' : 'átomos e íons'}`;
        document.getElementById('atom-count').textContent = `${particleLabel} · perspectiva e profundidade reais`;
        modelList.querySelectorAll('.lab3d-model-button').forEach(button => {
            button.setAttribute('aria-pressed', String(button.dataset.modelId === item.id));
        });
        if (renderError) renderError.hidden = true;
        previousFrame = 0;
    }

    function renderCatalog() {
        const query = searchInput.value.trim().toLocaleLowerCase('pt-BR');
        const category = categorySelect.value;
        const visible = molecules.filter(item => {
            const classification = classificationFor(item);
            const matchesCategory = category === 'all' || classification === category;
            const text = `${item.name} ${item.formula} ${classification} ${item.structure}`.toLocaleLowerCase('pt-BR');
            return matchesCategory && (!query || text.includes(query));
        });
        modelList.innerHTML = visible.map(item => `<button class="lab3d-model-button" type="button" data-model-id="${item.id}" aria-pressed="${activeModel && activeModel.id === item.id}">
            <span class="lab3d-model-name">${escapeHtml(item.name)}</span>
            <span class="lab3d-model-meta">${escapeHtml(item.formula)} · ${escapeHtml(classificationFor(item))}</span>
        </button>`).join('');
        catalogStatus.textContent = `${visible.length} ${visible.length === 1 ? 'estrutura encontrada' : 'estruturas encontradas'}.`;
        if (!visible.length) {
            modelList.innerHTML = '<p class="lab3d-catalog-status">Nenhuma estrutura corresponde à pesquisa.</p>';
        }
    }

    function initializeWebGL() {
        try {
            gl = canvas.getContext('webgl', { alpha: true, antialias: true, depth: true, powerPreference: 'low-power' }) ||
                canvas.getContext('experimental-webgl', { alpha: true, antialias: true, depth: true });
            if (!gl) {
                failRender('Este navegador ou dispositivo não disponibiliza WebGL. Tente usar um navegador atualizado com aceleração gráfica habilitada.');
                return false;
            }
            const handle = createProgram();
            program = {
                handle,
                position: gl.getAttribLocation(handle, 'aPosition'),
                normal: gl.getAttribLocation(handle, 'aNormal'),
                modelView: gl.getUniformLocation(handle, 'uModelView'),
                projection: gl.getUniformLocation(handle, 'uProjection'),
                color: gl.getUniformLocation(handle, 'uColor')
            };
            sphereMesh = buildSphere();
            cylinderMesh = buildCylinder();
            orbitBuffer = gl.createBuffer();
            if (!orbitBuffer) throw new Error('Não foi possível reservar a malha das órbitas.');
            gl.enable(gl.DEPTH_TEST);
            gl.depthFunc(gl.LEQUAL);
            gl.enable(gl.BLEND);
            gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
            return true;
        } catch (error) {
            console.error('Laboratório 3D: falha ao inicializar o WebGL.', error);
            failRender(error.message || 'Falha ao inicializar o renderizador WebGL.');
            return false;
        }
    }

    const categories = [...new Set(molecules.map(classificationFor))];
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categorySelect.append(option);
    });

    renderCatalog();
    const firstMolecule = molecules.find(item => item.id === 'water') || molecules[0];
    if (initializeWebGL()) {
        setSelectedModel(firstMolecule);
        renderCatalog();
        animationFrame = window.requestAnimationFrame(renderFrame);
    } else {
        document.getElementById('selected-name').textContent = 'Visualização 3D indisponível';
    }

    modelList.addEventListener('click', event => {
        const button = event.target.closest('button[data-model-id]');
        if (!button) return;
        const selected = molecules.find(item => item.id === button.dataset.modelId);
        if (!selected) {
            console.error('Laboratório 3D: estrutura solicitada não encontrada.');
            return;
        }
        setSelectedModel(selected);
    });

    searchInput.addEventListener('input', renderCatalog);
    categorySelect.addEventListener('change', renderCatalog);
    renderStyleSelect.addEventListener('change', () => {
        renderStyle = renderStyleSelect.value;
    });
    atomSelector.addEventListener('change', () => {
        if (atomSelector.value === '') {
            updateSelectedAtom(null);
            return;
        }
        updateSelectedAtom(Number(atomSelector.value));
    });

    rotationToggle.addEventListener('click', () => {
        autoRotate = !autoRotate;
        rotationToggle.textContent = autoRotate ? 'Pausar rotação' : 'Ativar rotação';
        rotationToggle.setAttribute('aria-pressed', String(autoRotate));
    });
    document.getElementById('camera-reset').addEventListener('click', () => {
        camera.yaw = -0.25;
        camera.pitch = 0.35;
        camera.panX = 0;
        camera.panY = 0;
        camera.distance = camera.fitDistance;
        autoRotate = true;
        rotationToggle.textContent = 'Pausar rotação';
        rotationToggle.setAttribute('aria-pressed', 'true');
    });
    document.getElementById('zoom-in').addEventListener('click', () => {
        camera.distance = Math.max(camera.fitDistance * 0.35, camera.distance * 0.82);
    });
    document.getElementById('zoom-out').addEventListener('click', () => {
        camera.distance = Math.min(camera.fitDistance * 3.5, camera.distance * 1.22);
    });

    canvas.addEventListener('pointerdown', event => {
        if (event.button !== 0 && event.button !== 2) return;
        dragging = true;
        pointerMoved = false;
        panDrag = event.button === 2 || event.shiftKey;
        pointerStart = { x: event.clientX, y: event.clientY };
        previousPointer = { x: event.clientX, y: event.clientY };
        canvas.classList.add('is-dragging');
        canvas.setPointerCapture(event.pointerId);
    });
    canvas.addEventListener('pointermove', event => {
        if (!dragging || !previousPointer) return;
        const dx = event.clientX - previousPointer.x;
        const dy = event.clientY - previousPointer.y;
        if (pointerStart && Math.hypot(event.clientX - pointerStart.x, event.clientY - pointerStart.y) > 5) {
            pointerMoved = true;
        }
        if (panDrag) {
            const unitsPerPixel = camera.distance / Math.max(canvas.clientHeight, 1);
            camera.panX += dx * unitsPerPixel;
            camera.panY -= dy * unitsPerPixel;
        } else {
            camera.yaw += dx * 0.009;
            camera.pitch = Math.max(-Math.PI * 0.48, Math.min(Math.PI * 0.48, camera.pitch + dy * 0.009));
        }
        previousPointer = { x: event.clientX, y: event.clientY };
    });
    const stopDragging = (event, selectAtom) => {
        if (selectAtom && event.button === 0 && !pointerMoved) {
            const index = pickAtom(event.clientX, event.clientY);
            if (index !== null) updateSelectedAtom(index);
        }
        dragging = false;
        pointerMoved = false;
        pointerStart = null;
        previousPointer = null;
        canvas.classList.remove('is-dragging');
    };
    canvas.addEventListener('pointerup', event => stopDragging(event, true));
    canvas.addEventListener('pointercancel', event => stopDragging(event, false));
    canvas.addEventListener('contextmenu', event => event.preventDefault());
    canvas.addEventListener('wheel', event => {
        event.preventDefault();
        camera.distance = Math.max(
            camera.fitDistance * 0.35,
            Math.min(camera.fitDistance * 3.5, camera.distance * Math.exp(event.deltaY * 0.001))
        );
    }, { passive: false });
    canvas.addEventListener('keydown', event => {
        const step = 0.12;
        if (event.key === 'ArrowLeft') camera.yaw -= step;
        else if (event.key === 'ArrowRight') camera.yaw += step;
        else if (event.key === 'ArrowUp') camera.pitch = Math.max(-Math.PI * 0.48, camera.pitch - step);
        else if (event.key === 'ArrowDown') camera.pitch = Math.min(Math.PI * 0.48, camera.pitch + step);
        else if (event.key === '+' || event.key === '=') camera.distance = Math.max(camera.fitDistance * 0.35, camera.distance * 0.85);
        else if (event.key === '-') camera.distance = Math.min(camera.fitDistance * 3.5, camera.distance * 1.15);
        else if (event.key === 'Home') document.getElementById('camera-reset').click();
        else return;
        event.preventDefault();
    });

    window.addEventListener('beforeunload', () => {
        window.cancelAnimationFrame(animationFrame);
    }, { once: true });
})();
