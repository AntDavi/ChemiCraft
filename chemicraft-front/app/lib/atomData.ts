/**
 * Dados dos elementos químicos para o ChemiCraft
 * Contém informações básicas sobre os elementos mais comuns em química orgânica e inorgânica
 */

export interface AtomData {
    symbol: string;           // Símbolo químico (ex: H, C, O)
    name: string;            // Nome do elemento
    atomicNumber: number;    // Número atômico
    valence: number[];       // Valências possíveis (mais comum primeiro)
    color: string;           // Cor para representação visual (hex)
    radius: number;          // Raio atômico relativo (para renderização)
    electronegativity: number; // Eletronegatividade (escala Pauling)
    group: number;           // Grupo na tabela periódica
    period: number;          // Período na tabela periódica
}

/**
 * Tabela periódica simplificada com elementos essenciais
 * Foco em elementos comuns em moléculas orgânicas e inorgânicas básicas
 */
export const ATOMS: Record<string, AtomData> = {
    // Hidrogênio - sempre forma 1 ligação
    H: {
        symbol: 'H',
        name: 'Hidrogênio',
        atomicNumber: 1,
        valence: [1],
        color: '#FFFFFF',
        radius: 0.6,
        electronegativity: 2.20,
        group: 1,
        period: 1,
    },

    // Carbono - base da química orgânica
    C: {
        symbol: 'C',
        name: 'Carbono',
        atomicNumber: 6,
        valence: [4],
        color: '#404040',
        radius: 1.0,
        electronegativity: 2.55,
        group: 14,
        period: 2,
    },

    // Nitrogênio - comum em aminoácidos e proteínas
    N: {
        symbol: 'N',
        name: 'Nitrogênio',
        atomicNumber: 7,
        valence: [3, 5],
        color: '#3050F8',
        radius: 0.9,
        electronegativity: 3.04,
        group: 15,
        period: 2,
    },

    // Oxigênio - essencial para água e compostos orgânicos
    O: {
        symbol: 'O',
        name: 'Oxigênio',
        atomicNumber: 8,
        valence: [2],
        color: '#FF0D0D',
        radius: 0.8,
        electronegativity: 3.44,
        group: 16,
        period: 2,
    },

    // Flúor - halogênio mais eletronegativo
    F: {
        symbol: 'F',
        name: 'Flúor',
        atomicNumber: 9,
        valence: [1],
        color: '#90E050',
        radius: 0.7,
        electronegativity: 3.98,
        group: 17,
        period: 2,
    },

    // Fósforo - importante em ATP e DNA
    P: {
        symbol: 'P',
        name: 'Fósforo',
        atomicNumber: 15,
        valence: [3, 5],
        color: '#FF8000',
        radius: 1.2,
        electronegativity: 2.19,
        group: 15,
        period: 3,
    },

    // Enxofre - comum em aminoácidos e proteínas
    S: {
        symbol: 'S',
        name: 'Enxofre',
        atomicNumber: 16,
        valence: [2, 4, 6],
        color: '#FFFF30',
        radius: 1.1,
        electronegativity: 2.58,
        group: 16,
        period: 3,
    },

    // Cloro - halogênio comum
    Cl: {
        symbol: 'Cl',
        name: 'Cloro',
        atomicNumber: 17,
        valence: [1, 3, 5, 7],
        color: '#1FF01F',
        radius: 1.0,
        electronegativity: 3.16,
        group: 17,
        period: 3,
    },

    // Sódio - metal alcalino comum
    Na: {
        symbol: 'Na',
        name: 'Sódio',
        atomicNumber: 11,
        valence: [1],
        color: '#AB5CF2',
        radius: 1.5,
        electronegativity: 0.93,
        group: 1,
        period: 3,
    },

    // Magnésio - metal alcalino-terroso
    Mg: {
        symbol: 'Mg',
        name: 'Magnésio',
        atomicNumber: 12,
        valence: [2],
        color: '#8AFF00',
        radius: 1.4,
        electronegativity: 1.31,
        group: 2,
        period: 3,
    },

    // Potássio - metal alcalino
    K: {
        symbol: 'K',
        name: 'Potássio',
        atomicNumber: 19,
        valence: [1],
        color: '#8F40D4',
        radius: 1.8,
        electronegativity: 0.82,
        group: 1,
        period: 4,
    },

    // Cálcio - metal alcalino-terroso importante
    Ca: {
        symbol: 'Ca',
        name: 'Cálcio',
        atomicNumber: 20,
        valence: [2],
        color: '#3DFF00',
        radius: 1.6,
        electronegativity: 1.00,
        group: 2,
        period: 4,
    },
};

/**
 * Lista de elementos organizados por frequência de uso em química básica
 * Útil para ordenar a interface do AtomSelector
 */
export const COMMON_ELEMENTS = ['H', 'C', 'N', 'O', 'P', 'S', 'Cl', 'F'];
export const METALLIC_ELEMENTS = ['Na', 'Mg', 'K', 'Ca'];
export const ALL_ELEMENTS = [...COMMON_ELEMENTS, ...METALLIC_ELEMENTS];

/**
 * Cores categorizadas por tipo de elemento
 */
export const ELEMENT_COLORS = {
    nonmetal: ['#FFFFFF', '#404040', '#3050F8', '#FF0D0D', '#90E050', '#FF8000', '#FFFF30', '#1FF01F'],
    metal: ['#AB5CF2', '#8AFF00', '#8F40D4', '#3DFF00'],
    noble: ['#FFAA70'], // Para gases nobres (futuro)
};

/**
 * Função utilitária para obter dados de um átomo
 */
export function getAtomData(symbol: string): AtomData | null {
    return ATOMS[symbol] || null;
}

/**
 * Função para obter a valência mais comum de um elemento
 */
export function getCommonValence(symbol: string): number {
    const atom = getAtomData(symbol);
    return atom ? atom.valence[0] : 0;
}


