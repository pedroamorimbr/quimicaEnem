// Monta estruturas moleculares didáticas e desenha sua projeção interativa em Canvas 2D.
(() => {
    const viewer = document.getElementById('moleculeViewer');
    const canvas = document.getElementById('moleculeCanvas');
    const title = document.getElementById('viewerTitle');
    const closeButton = viewer?.querySelector('.viewer-close');
    const rotationToggle = document.getElementById('rotationToggle');
    const rotationReset = document.getElementById('rotationReset');

    if (!viewer || !(canvas instanceof HTMLCanvasElement) || !closeButton || !rotationToggle || !rotationReset) {
        return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error('Não foi possível iniciar o visualizador 3D: Canvas 2D indisponível.');
        return;
    }

    // Vetores 3D e funções de geometria usados para posicionar átomos e ligações.
    const atom = (element, x, y, z) => ({ element, x, y, z });
    const valences = { C: 4, N: 3, O: 2, H: 1 };
    const add = (a, b) => ({ x: a.x + b.x, y: a.y + b.y, z: a.z + b.z });
    const multiply = (vector, scalar) => ({ x: vector.x * scalar, y: vector.y * scalar, z: vector.z * scalar });
    const dot = (a, b) => a.x * b.x + a.y * b.y + a.z * b.z;
    const magnitude = vector => Math.hypot(vector.x, vector.y, vector.z);
    const normalize = vector => {
        const length = magnitude(vector);
        return length < 1e-8 ? { x: 0, y: 0, z: 1 } : multiply(vector, 1 / length);
    };
    const perpendicular = axis => {
        const reference = Math.abs(axis.x) < 0.8 ? { x: 1, y: 0, z: 0 } : { x: 0, y: 1, z: 0 };
        return normalize({
            x: axis.y * reference.z - axis.z * reference.y,
            y: axis.z * reference.x - axis.x * reference.z,
            z: axis.x * reference.y - axis.y * reference.x
        });
    };
    const aroundAxis = (axis, count, cosine, azimuths = [], preferredSide = null) => {
        const side = preferredSide || perpendicular(axis);
        const otherSide = normalize({
            x: axis.y * side.z - axis.z * side.y,
            y: axis.z * side.x - axis.x * side.z,
            z: axis.x * side.y - axis.y * side.x
        });
        const sine = Math.sqrt(Math.max(0, 1 - cosine * cosine));
        return Array.from({ length: count }, (_, index) => {
            const azimuth = azimuths[index] ?? (2 * Math.PI * index / count);
            return normalize(add(
                multiply(axis, cosine),
                add(multiply(side, sine * Math.cos(azimuth)), multiply(otherSide, sine * Math.sin(azimuth)))
            ));
        });
    };

    // Completa os hidrogênios ausentes aproximando a geometria molecular do modelo.
    function hydrogenDirections(element, count, neighbors, hasDoubleBond, planarNitrogen, planarSide) {
        const sum = neighbors.reduce((total, direction) => add(total, direction), { x: 0, y: 0, z: 0 });

        if (element === 'O' && count === 1 && neighbors.length === 1) {
            return aroundAxis(neighbors[0], 1, Math.cos(104.5 * Math.PI / 180), [0], planarSide);
        }

        if (element === 'N' && count === 2 && neighbors.length === 1) {
            const angle = (planarNitrogen ? 120 : 107) * Math.PI / 180;
            const azimuths = planarNitrogen ? [0, Math.PI] : [0, 2 * Math.PI / 3];
            return aroundAxis(neighbors[0], 2, Math.cos(angle), azimuths, planarNitrogen ? planarSide : null);
        }

        if (element === 'N' && count === 1 && neighbors.length === 2 && !planarNitrogen) {
            const bisector = normalize(add(neighbors[0], neighbors[1]));
            const normal = normalize({
                x: neighbors[0].y * neighbors[1].z - neighbors[0].z * neighbors[1].y,
                y: neighbors[0].z * neighbors[1].x - neighbors[0].x * neighbors[1].z,
                z: neighbors[0].x * neighbors[1].y - neighbors[0].y * neighbors[1].x
            });
            const targetCosine = Math.cos(107 * Math.PI / 180);
            const bisectorCosine = dot(bisector, neighbors[0]);
            const axialComponent = targetCosine / bisectorCosine;
            if (Math.abs(axialComponent) < 1) {
                return [normalize(add(
                    multiply(bisector, axialComponent),
                    multiply(normal, Math.sqrt(1 - axialComponent * axialComponent))
                ))];
            }
        }

        if (hasDoubleBond) {
            if (count === 2 && neighbors.length === 1) {
                const side = planarSide || perpendicular(neighbors[0]);
                return [
                    normalize(add(multiply(neighbors[0], -0.5), multiply(side, Math.sqrt(3) / 2))),
                    normalize(add(multiply(neighbors[0], -0.5), multiply(side, -Math.sqrt(3) / 2)))
                ];
            }
            if (count === 1 && neighbors.length) return [normalize(multiply(sum, -1))];
        }

        if (element === 'C') {
            if (count === 1 && neighbors.length) return [normalize(multiply(sum, -1))];
            if (count === 2 && neighbors.length === 2) {
                const axis = normalize(multiply(sum, -1));
                const side = perpendicular(axis);
                return [
                    normalize(add(multiply(axis, 1 / Math.sqrt(3)), multiply(side, Math.sqrt(2 / 3)))),
                    normalize(add(multiply(axis, 1 / Math.sqrt(3)), multiply(side, -Math.sqrt(2 / 3))))
                ];
            }
            if (count === 3 && neighbors.length === 1) {
                return aroundAxis(multiply(neighbors[0], -1), 3, 1 / 3, [0, 2 * Math.PI / 3, 4 * Math.PI / 3]);
            }
            if (count === 4 && neighbors.length === 0) {
                return [
                    normalize({ x: 1, y: 1, z: 1 }), normalize({ x: 1, y: -1, z: -1 }),
                    normalize({ x: -1, y: 1, z: -1 }), normalize({ x: -1, y: -1, z: 1 })
                ];
            }
        }

        if (neighbors.length) {
            return aroundAxis(multiply(normalize(sum), -1), count, 1 / 3);
        }
        return aroundAxis({ x: 0, y: 0, z: 1 }, count, 1 / 3);
    }

    function planarPerpendicular(index, atoms, neighbors) {
        const heavyNeighbors = neighbors[index].filter(neighborIndex => atoms[neighborIndex].element !== 'H');
        if (!heavyNeighbors.length) return null;

        const first = normalize({
            x: atoms[heavyNeighbors[0]].x - atoms[index].x,
            y: atoms[heavyNeighbors[0]].y - atoms[index].y,
            z: atoms[heavyNeighbors[0]].z - atoms[index].z
        });
        let secondIndex = heavyNeighbors[1];
        if (secondIndex === undefined) {
            const adjacent = neighbors[heavyNeighbors[0]].find(neighborIndex =>
                neighborIndex !== index && atoms[neighborIndex].element !== 'H'
            );
            secondIndex = adjacent;
        }
        if (secondIndex === undefined) return null;

        const second = normalize({
            x: atoms[secondIndex].x - atoms[index].x,
            y: atoms[secondIndex].y - atoms[index].y,
            z: atoms[secondIndex].z - atoms[index].z
        });
        const rawNormal = {
            x: first.y * second.z - first.z * second.y,
            y: first.z * second.x - first.x * second.z,
            z: first.x * second.y - first.y * second.x
        };
        if (magnitude(rawNormal) < 1e-8) return null;
        const normal = normalize(rawNormal);
        const side = normalize({
            x: normal.y * first.z - normal.z * first.y,
            y: normal.z * first.x - normal.x * first.z,
            z: normal.x * first.y - normal.y * first.x
        });
        return side;
    }

    // Calcula valências, adiciona hidrogênios e prepara as ligações do modelo.
    function model(sourceAtoms, sourceBonds, planarNitrogens = []) {
        const atoms = sourceAtoms.map(item => ({ ...item }));
        const bonds = sourceBonds.map(bond => [...bond]);
        const neighbors = atoms.map(() => []);
        const usedValence = atoms.map(() => 0);

        bonds.forEach(([from, to, order]) => {
            neighbors[from].push(to);
            neighbors[to].push(from);
            usedValence[from] += order;
            usedValence[to] += order;
        });

        const originalAtomCount = atoms.length;
        for (let index = 0; index < originalAtomCount; index += 1) {
            const element = atoms[index].element;
            if (element === 'H') continue;
            const targetValence = valences[element];
            if (!targetValence) throw new Error(`Elemento sem valência definida no modelo: ${element}`);

            const missingHydrogens = targetValence - usedValence[index];
            if (missingHydrogens < 0 || !Number.isInteger(missingHydrogens)) {
                throw new Error(`Valência inválida no átomo ${element} do modelo molecular.`);
            }
            if (!missingHydrogens) continue;

            const directions = neighbors[index].map(neighborIndex => normalize({
                x: atoms[neighborIndex].x - atoms[index].x,
                y: atoms[neighborIndex].y - atoms[index].y,
                z: atoms[neighborIndex].z - atoms[index].z
            }));
            const hasDoubleBond = bonds.some(([from, to, order]) =>
                order === 2 && (from === index || to === index)
            );
            const planarSide = planarPerpendicular(index, atoms, neighbors);
            const hydrogenVectors = hydrogenDirections(
                element,
                missingHydrogens,
                directions,
                hasDoubleBond,
                planarNitrogens.includes(index),
                planarSide
            );
            const bondLength = element === 'O' ? 0.72 : element === 'N' ? 0.76 : 0.86;

            hydrogenVectors.forEach(direction => {
                const hydrogenIndex = atoms.length;
                atoms.push(atom(
                    'H',
                    atoms[index].x + direction.x * bondLength,
                    atoms[index].y + direction.y * bondLength,
                    atoms[index].z + direction.z * bondLength
                ));
                bonds.push([index, hydrogenIndex, 1]);
            });
        }

        return { atoms, bonds };
    }
    const models = {
        methane: model([
            atom('C', 0, 0, 0), atom('H', 0.9, 0.9, 0.9), atom('H', -0.9, -0.9, 0.9),
            atom('H', -0.9, 0.9, -0.9), atom('H', 0.9, -0.9, -0.9)
        ], [[0, 1, 1], [0, 2, 1], [0, 3, 1], [0, 4, 1]]),
        ethene: model([
            atom('C', -0.7, 0, 0), atom('C', 0.7, 0, 0),
            atom('H', -1.15, 0.779, 0), atom('H', -1.15, -0.779, 0),
            atom('H', 1.15, 0.779, 0), atom('H', 1.15, -0.779, 0)
        ], [[0, 1, 2], [0, 2, 1], [0, 3, 1], [1, 4, 1], [1, 5, 1]]),
        ethyne: model([
            atom('H', -1.7, 0, 0), atom('C', -0.85, 0, 0), atom('C', 0.85, 0, 0), atom('H', 1.7, 0, 0)
        ], [[0, 1, 1], [1, 2, 3], [2, 3, 1]]),
        butadiene: model([
            atom('C', -1.5, 0, 0), atom('C', -0.5, 0, 0), atom('C', 0, 0.866, 0), atom('C', 1, 0.866, 0)
        ], [[0, 1, 2], [1, 2, 1], [2, 3, 2]]),
        cyclohexane: model(
            Array.from({ length: 6 }, (_, index) => {
                const angle = (Math.PI * 2 * index) / 6;
                return atom('C', Math.cos(angle) * 1.5, Math.sin(angle) * 1.5, index % 2 ? 0.265 : -0.265);
            }),
            Array.from({ length: 6 }, (_, index) => [index, (index + 1) % 6, 1])
        ),
        benzene: model(
            Array.from({ length: 6 }, (_, index) => {
                const angle = (Math.PI * 2 * index) / 6;
                return atom('C', Math.cos(angle) * 1.5, Math.sin(angle) * 1.5, 0);
            }),
            Array.from({ length: 6 }, (_, index) => [index, (index + 1) % 6, index % 2 ? 1 : 2])
        ),
        methanol: model([atom('C', -0.55, 0, 0), atom('O', 0.75, 0.15, 0)], [[0, 1, 1]]),
        ethanol: model([atom('C', -1, 0, 0), atom('C', 0.25, 0.45, 0), atom('O', 1.35, -0.1, 0.25)], [[0, 1, 1], [1, 2, 1]]),
        methanal: model([
            atom('C', 0, 0, 0), atom('O', 0, 1.2, 0),
            atom('H', -1.04, -0.6, 0), atom('H', 1.04, -0.6, 0)
        ], [[0, 1, 2], [0, 2, 1], [0, 3, 1]]),
        ethanal: model([atom('C', -1.04, -0.6, 0), atom('C', 0, 0, 0), atom('O', 0, 1.2, 0)], [[0, 1, 1], [1, 2, 2]]),
        propanone: model([
            atom('C', -1.04, -0.6, 0), atom('C', 0, 0, 0), atom('C', 1.04, -0.6, 0), atom('O', 0, 1.2, 0)
        ], [[0, 1, 1], [1, 2, 1], [1, 3, 2]]),
        butanone: model([
            atom('C', -1.04, -0.6, 0), atom('C', 0, 0, 0), atom('C', 1.04, -0.6, 0),
            atom('C', 1.99, 0.22, 0.55), atom('O', 0, 1.2, 0)
        ], [[0, 1, 1], [1, 2, 1], [2, 3, 1], [1, 4, 2]]),
        methanoic: model([atom('C', 0, 0, 0), atom('O', 0, 1.2, 0), atom('O', -1.04, -0.6, 0)], [[0, 1, 2], [0, 2, 1]]),
        ethanoic: model([
            atom('C', -1.04, -0.6, 0), atom('C', 0, 0, 0), atom('O', 0, 1.2, 0), atom('O', 1.04, -0.6, 0)
        ], [[0, 1, 1], [1, 2, 2], [1, 3, 1]]),
        ethylAcetate: model([
            atom('C', -1.04, -0.6, 0), atom('C', 0, 0, 0), atom('O', 0, 1.2, 0),
            atom('O', 1.04, -0.6, 0), atom('C', 1.84, 0.17, 0.2), atom('C', 2.73, -0.28, 0.7)
        ], [[0, 1, 1], [1, 2, 2], [1, 3, 1], [3, 4, 1], [4, 5, 1]]),
        dimethylEther: model([
            atom('C', -1.03, -0.73, 0), atom('O', 0, 0, 0), atom('C', 1.03, -0.73, 0)
        ], [[0, 1, 1], [1, 2, 1]]),
        diethylEther: model([
            atom('C', -1.84, -0.14, 0.45), atom('C', -1.03, -0.73, 0), atom('O', 0, 0, 0),
            atom('C', 1.03, -0.73, 0), atom('C', 1.84, -0.14, -0.45)
        ], [[0, 1, 1], [1, 2, 1], [2, 3, 1], [3, 4, 1]]),
        methylamine: model([atom('C', -0.7, -0.15, 0), atom('N', 0.65, 0.15, 0)], [[0, 1, 1]]),
        dimethylamine: model([
            atom('C', -1.119, -0.755, 0), atom('N', 0, 0, 0), atom('C', 1.119, -0.755, 0)
        ], [[0, 1, 1], [1, 2, 1]]),
        trimethylamine: model([
            atom('N', 0, 0, 0), atom('C', 0.75, 0.75, 0.75),
            atom('C', 0.75, -0.75, -0.75), atom('C', -0.75, 0.75, -0.75)
        ], [[0, 1, 1], [0, 2, 1], [0, 3, 1]]),
        methanamide: model([atom('C', 0, 0, 0), atom('O', 0, 1.2, 0), atom('N', -1.04, -0.6, 0)], [[0, 1, 2], [0, 2, 1]], [2]),
        ethanamide: model([
            atom('C', -1.04, -0.6, 0), atom('C', 0, 0, 0), atom('O', 0, 1.2, 0), atom('N', 1.04, -0.6, 0)
        ], [[0, 1, 1], [1, 2, 2], [1, 3, 1]], [3])
    };

    const expectedFormulas = {
        methane: { C: 1, H: 4 }, ethene: { C: 2, H: 4 }, ethyne: { C: 2, H: 2 },
        butadiene: { C: 4, H: 6 }, cyclohexane: { C: 6, H: 12 }, benzene: { C: 6, H: 6 },
        methanol: { C: 1, H: 4, O: 1 }, ethanol: { C: 2, H: 6, O: 1 },
        methanal: { C: 1, H: 2, O: 1 }, ethanal: { C: 2, H: 4, O: 1 },
        propanone: { C: 3, H: 6, O: 1 }, butanone: { C: 4, H: 8, O: 1 },
        methanoic: { C: 1, H: 2, O: 2 }, ethanoic: { C: 2, H: 4, O: 2 },
        ethylAcetate: { C: 4, H: 8, O: 2 }, dimethylEther: { C: 2, H: 6, O: 1 },
        diethylEther: { C: 4, H: 10, O: 1 }, methylamine: { C: 1, H: 5, N: 1 },
        dimethylamine: { C: 2, H: 7, N: 1 }, trimethylamine: { C: 3, H: 9, N: 1 },
        methanamide: { C: 1, H: 3, N: 1, O: 1 }, ethanamide: { C: 2, H: 5, N: 1, O: 1 }
    };

    Object.entries(models).forEach(([name, molecule]) => {
        const formula = molecule.atoms.reduce((counts, currentAtom) => {
            counts[currentAtom.element] = (counts[currentAtom.element] || 0) + 1;
            return counts;
        }, {});
        const expected = expectedFormulas[name];
        if (!expected || Object.keys({ ...formula, ...expected }).some(element =>
            (formula[element] || 0) !== (expected[element] || 0)
        )) {
            throw new Error(`Fórmula molecular incompatível com o modelo 3D: ${name}`);
        }
    });

    // Relaciona as legendas do conteúdo da página às estruturas desenhadas abaixo.
    const captionToModel = [
        ['metano · ch4', 'methane'], ['eteno · c2h4', 'ethene'], ['etino · c2h2', 'ethyne'],
        ['buta-1,3-dieno', 'butadiene'], ['ciclo-hexano', 'cyclohexane'], ['benzeno', 'benzene'],
        ['metanol', 'methanol'], ['etanol', 'ethanol'], ['metanal', 'methanal'], ['etanal', 'ethanal'],
        ['propanona', 'propanone'], ['butan-2-ona', 'butanone'], ['ácido metanoico', 'methanoic'],
        ['ácido etanoico', 'ethanoic'], ['etanoato de etila', 'ethylAcetate'],
        ['metoximetano', 'dimethylEther'], ['etoxietano', 'diethylEther'],
        ['metilamina', 'methylamine'], ['dimetilamina', 'dimethylamine'], ['trimetilamina', 'trimethylamine'],
        ['metanamida', 'methanamide'], ['etanamida', 'ethanamide']
    ];

    let activeModel = null;
    let rotation = { x: -0.25, y: 0.55 };
    let autoRotate = true;
    let dragging = false;
    let previousPointer = null;
    let frameId = 0;
    let lastFrameTime = 0;

    const colors = {
        C: ['#f8fbff', '#64748b'],
        O: ['#ff9b54', '#e11d48'],
        N: ['#9bc7ff', '#2563eb'],
        H: ['#ffffff', '#dbeafe']
    };

    // Converte coordenadas 3D para a tela e redesenha o modelo no Canvas.
    function resizeCanvas() {
        const bounds = canvas.getBoundingClientRect();
        if (!bounds.width || !bounds.height) return;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.round(bounds.width * dpr);
        canvas.height = Math.round(bounds.height * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        draw();
    }

    function project(point, scale, centerX, centerY) {
        const cosY = Math.cos(rotation.y);
        const sinY = Math.sin(rotation.y);
        const cosX = Math.cos(rotation.x);
        const sinX = Math.sin(rotation.x);
        const x = point.x * cosY - point.z * sinY;
        const z1 = point.x * sinY + point.z * cosY;
        const y = point.y * cosX - z1 * sinX;
        const z = point.y * sinX + z1 * cosX;
        const perspective = 4.5 / (4.5 + z * 0.16);
        return { x: centerX + x * scale * perspective, y: centerY + y * scale * perspective, z, perspective };
    }

    function drawBond(start, end, order, startElement, endElement) {
        const dx = end.x - start.x;
        const dy = end.y - start.y;
        const length = Math.hypot(dx, dy) || 1;
        const offsetX = (-dy / length) * 3.2;
        const offsetY = (dx / length) * 3.2;
        const [startColor] = colors[startElement] || colors.C;
        const [, endColor] = colors[endElement] || colors.C;
        const gradient = ctx.createLinearGradient(start.x, start.y, end.x, end.y);
        gradient.addColorStop(0, startColor);
        gradient.addColorStop(1, endColor);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = Math.max(2.5, 4.5 * Math.min(start.perspective, end.perspective));
        ctx.lineCap = 'round';

        const lines = order === 3 ? [-1, 0, 1] : order === 2 ? [-0.65, 0.65] : [0];
        lines.forEach(offset => {
            ctx.beginPath();
            ctx.moveTo(start.x + offsetX * offset, start.y + offsetY * offset);
            ctx.lineTo(end.x + offsetX * offset, end.y + offsetY * offset);
            ctx.stroke();
        });
    }

    function draw() {
        if (!ctx || !activeModel) return;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        ctx.clearRect(0, 0, width, height);

        const centerX = width / 2;
        const centerY = height / 2;
        const bounds = activeModel.atoms.reduce((result, currentAtom) => ({
            minX: Math.min(result.minX, currentAtom.x),
            maxX: Math.max(result.maxX, currentAtom.x),
            minY: Math.min(result.minY, currentAtom.y),
            maxY: Math.max(result.maxY, currentAtom.y),
            minZ: Math.min(result.minZ, currentAtom.z),
            maxZ: Math.max(result.maxZ, currentAtom.z)
        }), {
            minX: Infinity, maxX: -Infinity, minY: Infinity, maxY: -Infinity, minZ: Infinity, maxZ: -Infinity
        });
        const moleculeCenter = {
            x: (bounds.minX + bounds.maxX) / 2,
            y: (bounds.minY + bounds.maxY) / 2,
            z: (bounds.minZ + bounds.maxZ) / 2
        };
        const extent = Math.max(
            bounds.maxX - bounds.minX,
            bounds.maxY - bounds.minY,
            bounds.maxZ - bounds.minZ,
            1
        ) / 2;
        const scale = Math.min(width, height) * 0.38 / extent;
        const points = activeModel.atoms.map(point => project({
            ...point,
            x: point.x - moleculeCenter.x,
            y: point.y - moleculeCenter.y,
            z: point.z - moleculeCenter.z
        }, scale, centerX, centerY));

        activeModel.bonds.forEach(([from, to, order]) => {
            drawBond(points[from], points[to], order, activeModel.atoms[from].element, activeModel.atoms[to].element);
        });

        points.map((point, index) => ({ ...point, atom: activeModel.atoms[index] }))
            .sort((a, b) => a.z - b.z)
            .forEach(({ x, y, perspective, atom: currentAtom }) => {
                const radius = (currentAtom.element === 'H' ? 8 : 13) * perspective;
                const [light, dark] = colors[currentAtom.element] || colors.C;
                const gradient = ctx.createRadialGradient(x - radius * 0.35, y - radius * 0.4, 1, x, y, radius);
                gradient.addColorStop(0, light);
                gradient.addColorStop(1, dark);
                ctx.beginPath();
                ctx.arc(x, y, radius, 0, Math.PI * 2);
                ctx.shadowColor = light;
                ctx.shadowBlur = 12 * perspective;
                ctx.fillStyle = gradient;
                ctx.fill();
                ctx.shadowBlur = 0;
                ctx.strokeStyle = currentAtom.element === 'H' ? '#526174' : '#ffffff';
                ctx.lineWidth = currentAtom.element === 'H' ? 1.5 : 2;
                ctx.stroke();
                ctx.fillStyle = currentAtom.element === 'H' ? '#26364a' : '#fff';
                ctx.font = `700 ${Math.max(10, radius * 0.9)}px system-ui, sans-serif`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(currentAtom.element, x, y);
            });
    }

    // Mantém a rotação automática enquanto o diálogo do visualizador estiver aberto.
    function animate(timestamp) {
        if (!viewer.open) return;
        if (autoRotate && !dragging && lastFrameTime) {
            rotation.y += Math.min(timestamp - lastFrameTime, 50) * 0.00035;
        }
        lastFrameTime = timestamp;
        draw();
        frameId = window.requestAnimationFrame(animate);
    }

    // Liga cada estrutura da página ao modelo correspondente e aos controles do diálogo.
    document.querySelectorAll('.structure-sample').forEach(sample => {
        sample.querySelectorAll('.functional-group').forEach(group => {
            const groupText = group.textContent || '';
            if (groupText.includes('O')) {
                group.classList.add('oxygen-group');
            } else if (groupText.includes('N')) {
                group.classList.add('nitrogen-group');
            }
        });

        const caption = sample.querySelector('figcaption')?.textContent?.toLocaleLowerCase('pt-BR') || '';
        const match = captionToModel.find(([fragment]) => caption.includes(fragment));
        if (!match || !models[match[1]]) {
            console.error('Modelo 3D não encontrado para a estrutura:', caption);
            return;
        }

        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'structure-view-button';
        button.textContent = 'Visualizar em 3D ↗';
        button.setAttribute('aria-label', `Visualizar em 3D: ${sample.querySelector('figcaption').textContent.trim()}`);
        sample.append(button);
        button.addEventListener('click', () => {
            activeModel = models[match[1]];
            rotation = { x: -0.25, y: 0.55 };
            title.textContent = sample.querySelector('figcaption').textContent.trim();
            rotationToggle.textContent = autoRotate ? 'Pausar rotação' : 'Ativar rotação 360°';
            viewer.showModal();
            window.cancelAnimationFrame(frameId);
            lastFrameTime = 0;
            resizeCanvas();
            frameId = window.requestAnimationFrame(animate);
        });
    });

    closeButton.addEventListener('click', () => viewer.close());
    viewer.addEventListener('click', event => {
        if (event.target === viewer) viewer.close();
    });
    viewer.addEventListener('close', () => {
        window.cancelAnimationFrame(frameId);
        canvas.classList.remove('is-dragging');
    });
    rotationToggle.addEventListener('click', () => {
        autoRotate = !autoRotate;
        rotationToggle.textContent = autoRotate ? 'Pausar rotação' : 'Ativar rotação 360°';
    });
    rotationReset.addEventListener('click', () => {
        rotation = { x: -0.25, y: 0.55 };
        autoRotate = true;
        rotationToggle.textContent = 'Pausar rotação';
        draw();
    });

    canvas.addEventListener('pointerdown', event => {
        dragging = true;
        previousPointer = { x: event.clientX, y: event.clientY };
        canvas.classList.add('is-dragging');
        canvas.setPointerCapture(event.pointerId);
    });
    canvas.addEventListener('pointermove', event => {
        if (!dragging || !previousPointer) return;
        rotation.y += (event.clientX - previousPointer.x) * 0.012;
        rotation.x += (event.clientY - previousPointer.y) * 0.012;
        rotation.x = Math.max(-Math.PI, Math.min(Math.PI, rotation.x));
        previousPointer = { x: event.clientX, y: event.clientY };
        draw();
    });
    const stopDragging = () => {
        dragging = false;
        previousPointer = null;
        canvas.classList.remove('is-dragging');
    };
    canvas.addEventListener('pointerup', stopDragging);
    canvas.addEventListener('pointercancel', stopDragging);
    window.addEventListener('resize', () => {
        if (viewer.open) resizeCanvas();
    });
})();
