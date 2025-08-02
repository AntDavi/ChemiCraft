/**
 * Regras de ligação química para o ChemiCraft
 * Contém lógica para formação de ligações, proximidade e validação molecular
 */

import { getAtomData } from './atomData';

export interface Bond {
    atom1Id: string;      // ID único do primeiro átomo
    atom2Id: string;      // ID único do segundo átomo
    atom1Symbol: string;  // Símbolo químico do primeiro átomo
    atom2Symbol: string;  // Símbolo químico do segundo átomo
    bondType: BondType;   // Tipo de ligação
    bondOrder: number;    // Ordem da ligação (1, 2, 3)
    length: number;       // Comprimento da ligação em pixels
}

export type BondType = 'covalent' | 'ionic' | 'metallic' | 'hydrogen';

export interface AtomInstance {
    id: string;           // ID único do átomo na molécula
    symbol: string;       // Símbolo químico
    x: number;           // Posição X no canvas
    y: number;           // Posição Y no canvas
    currentValence: number; // Valência atual (quantas ligações já tem)
    bonds: string[];     // IDs dos átomos ligados a este
}

/**
 * Raio de van der Waals aproximado para cálculo de proximidade
 * Usado para determinar quando átomos estão próximos o suficiente para ligação
 */
export const VAN_DER_WAALS_RADII: Record<string, number> = {
    H: 1.2,
    C: 1.7,
    N: 1.55,
    O: 1.52,
    F: 1.47,
    P: 1.8,
    S: 1.8,
    Cl: 1.75,
    Na: 2.27,
    Mg: 1.73,
    K: 2.75,
    Ca: 2.31,
};

/**
 * Comprimentos típicos de ligação em angstroms (convertidos para pixels)
 * Multiplicador: 1 angstrom = 50 pixels para visualização
 */
export const BOND_LENGTHS: Record<string, number> = {
    'H-H': 0.74 * 50,
    'H-C': 1.09 * 50,
    'H-N': 1.01 * 50,
    'H-O': 0.96 * 50,
    'H-F': 0.92 * 50,
    'C-C': 1.54 * 50,
    'C=C': 1.34 * 50,
    'C≡C': 1.20 * 50,
    'C-N': 1.47 * 50,
    'C=N': 1.29 * 50,
    'C≡N': 1.16 * 50,
    'C-O': 1.43 * 50,
    'C=O': 1.23 * 50,
    'N-N': 1.45 * 50,
    'N=N': 1.25 * 50,
    'N≡N': 1.10 * 50,
    'N-O': 1.36 * 50,
    'O-O': 1.48 * 50,
    'O=O': 1.21 * 50,
};

/**
 * Distância máxima para considerar dois átomos próximos o suficiente para ligação
 * Baseado na soma dos raios de van der Waals + margem
 */
export const BONDING_THRESHOLD_MULTIPLIER = 1.3;

/**
 * Função para obter o raio de van der Waals de um elemento
 */
export function getVanDerWaalsRadius(symbol: string): number {
    return VAN_DER_WAALS_RADII[symbol] || 1.5; // valor padrão
}

/**
 * Calcula a distância entre dois pontos
 */
export function calculateDistance(x1: number, y1: number, x2: number, y2: number): number {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

/**
 * Verifica se dois átomos estão próximos o suficiente para formar ligação
 */
export function areAtomsNearEnough(atom1: AtomInstance, atom2: AtomInstance): boolean {
    const distance = calculateDistance(atom1.x, atom1.y, atom2.x, atom2.y);
    const radius1 = getVanDerWaalsRadius(atom1.symbol);
    const radius2 = getVanDerWaalsRadius(atom2.symbol);
    const threshold = (radius1 + radius2) * BONDING_THRESHOLD_MULTIPLIER;

    return distance <= threshold;
}

/**
 * Função para verificar se dois átomos podem formar ligação
 * Baseado em eletronegatividade, valência disponível e proximidade
 */
export function canFormBond(atom1: AtomInstance, atom2: AtomInstance): boolean {
    const data1 = getAtomData(atom1.symbol);
    const data2 = getAtomData(atom2.symbol);

    if (!data1 || !data2) return false;

    // Verifica se os átomos já estão ligados
    if (atom1.bonds.includes(atom2.id) || atom2.bonds.includes(atom1.id)) {
        return false;
    }

    // Verifica se ainda têm valência disponível
    if (atom1.currentValence >= data1.valence[0] || atom2.currentValence >= data2.valence[0]) {
        return false;
    }

    // Verifica proximidade
    if (!areAtomsNearEnough(atom1, atom2)) {
        return false;
    }

    // Diferença de eletronegatividade não deve ser muito alta
    const electronegativityDiff = Math.abs(data1.electronegativity - data2.electronegativity);

    // Aceita ligações covalentes (diff < 1.7) e iônicas (diff >= 1.7)
    return electronegativityDiff < 3.0;
}

/**
 * Função para determinar o tipo de ligação entre dois átomos
 */
export function getBondType(atom1Symbol: string, atom2Symbol: string): BondType {
    const data1 = getAtomData(atom1Symbol);
    const data2 = getAtomData(atom2Symbol);

    if (!data1 || !data2) return 'covalent';

    const electronegativityDiff = Math.abs(data1.electronegativity - data2.electronegativity);

    // Ligação de hidrogênio (casos especiais)
    if ((atom1Symbol === 'H' && ['N', 'O', 'F'].includes(atom2Symbol)) ||
        (atom2Symbol === 'H' && ['N', 'O', 'F'].includes(atom1Symbol))) {
        if (electronegativityDiff > 0.9) return 'hydrogen';
    }

    // Ligação metálica (metal + metal)
    const isMetal1 = data1.group <= 2 || (data1.group >= 3 && data1.group <= 12);
    const isMetal2 = data2.group <= 2 || (data2.group >= 3 && data2.group <= 12);
    if (isMetal1 && isMetal2) return 'metallic';

    // Ligação iônica vs covalente
    if (electronegativityDiff < 0.5) return 'covalent'; // Covalente apolar
    if (electronegativityDiff < 1.7) return 'covalent'; // Covalente polar
    return 'ionic'; // Ligação iônica
}

/**
 * Determina a ordem de ligação possível entre dois átomos
 * Baseado nas valências e eletronegatividades
 */
export function determineBondOrder(atom1Symbol: string, atom2Symbol: string, currentBonds: number = 0): number {
    const data1 = getAtomData(atom1Symbol);
    const data2 = getAtomData(atom2Symbol);

    if (!data1 || !data2) return 1;

    // Casos especiais para ligações múltiplas
    const pair = [atom1Symbol, atom2Symbol].sort().join('-');

    // Ligações triplas comuns
    if (['C-C', 'C-N', 'N-N'].includes(pair)) {
        const maxValence1 = Math.max(...data1.valence);
        const maxValence2 = Math.max(...data2.valence);

        if (maxValence1 >= 3 && maxValence2 >= 3 && currentBonds === 0) {
            return 3; // Ligação tripla possível
        }
    }

    // Ligações duplas comuns
    if (['C-C', 'C-N', 'C-O', 'N-N', 'N-O', 'O-O'].includes(pair)) {
        const maxValence1 = Math.max(...data1.valence);
        const maxValence2 = Math.max(...data2.valence);

        if (maxValence1 >= 2 && maxValence2 >= 2 && currentBonds <= 1) {
            return 2; // Ligação dupla possível
        }
    }

    return 1; // Ligação simples (padrão)
}

/**
 * Obtém o comprimento ideal de ligação entre dois átomos
 */
export function getBondLength(atom1Symbol: string, atom2Symbol: string, bondOrder: number = 1): number {
    const pair = [atom1Symbol, atom2Symbol].sort().join(bondOrder === 2 ? '=' : bondOrder === 3 ? '≡' : '-');

    if (BOND_LENGTHS[pair]) {
        return BOND_LENGTHS[pair];
    }

    // Cálculo aproximado baseado nos raios atômicos
    const data1 = getAtomData(atom1Symbol);
    const data2 = getAtomData(atom2Symbol);

    if (data1 && data2) {
        const baseLength = (data1.radius + data2.radius) * 40; // Conversão para pixels

        // Ajuste baseado na ordem de ligação
        switch (bondOrder) {
            case 2: return baseLength * 0.85; // Ligação dupla é ~15% menor
            case 3: return baseLength * 0.75; // Ligação tripla é ~25% menor
            default: return baseLength;
        }
    }

    return 80; // Comprimento padrão em pixels
}

/**
 * Verifica se uma molécula está quimicamente estável
 * Baseado no octeto e valências satisfeitas
 */
export function isMoleculeStable(atoms: AtomInstance[]): boolean {
    for (const atom of atoms) {
        const atomData = getAtomData(atom.symbol);
        if (!atomData) continue;

        // Hidrogênio precisa de apenas 1 ligação
        if (atom.symbol === 'H') {
            if (atom.currentValence !== 1) return false;
            continue;
        }

        // Outros átomos devem satisfazer sua valência
        const validValences = atomData.valence;
        if (!validValences.includes(atom.currentValence)) {
            return false;
        }
    }

    return true;
}

/**
 * Calcula o ângulo entre três átomos (para geometria molecular)
 */
export function calculateBondAngle(center: AtomInstance, atom1: AtomInstance, atom2: AtomInstance): number {
    const vector1 = { x: atom1.x - center.x, y: atom1.y - center.y };
    const vector2 = { x: atom2.x - center.x, y: atom2.y - center.y };

    const dot = vector1.x * vector2.x + vector1.y * vector2.y;
    const mag1 = Math.sqrt(vector1.x * vector1.x + vector1.y * vector1.y);
    const mag2 = Math.sqrt(vector2.x * vector2.x + vector2.y * vector2.y);

    const cosAngle = dot / (mag1 * mag2);
    return Math.acos(Math.max(-1, Math.min(1, cosAngle))) * (180 / Math.PI);
}

/**
 * Sugere posições ideais para novos átomos baseado na geometria molecular
 */
export function suggestAtomPosition(
    centerAtom: AtomInstance,
    connectedAtoms: AtomInstance[],
    newAtomSymbol: string
): { x: number; y: number } {
    const bondLength = getBondLength(centerAtom.symbol, newAtomSymbol);
    const numConnections = connectedAtoms.length;

    // Calcula posição baseada na geometria molecular
    const angleIncrement = (2 * Math.PI) / (numConnections + 1);
    const baseAngle = numConnections > 0 ?
        Math.atan2(connectedAtoms[0].y - centerAtom.y, connectedAtoms[0].x - centerAtom.x) : 0;

    const newAngle = baseAngle + angleIncrement;

    return {
        x: centerAtom.x + bondLength * Math.cos(newAngle),
        y: centerAtom.y + bondLength * Math.sin(newAngle)
    };
}
