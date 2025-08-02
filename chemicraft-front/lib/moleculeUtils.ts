// Tipos para representar átomos e moléculas no canvas
export interface Position {
    x: number;
    y: number;
}

export interface AtomInstance {
    id: string;
    symbol: string;
    position: Position;
    bonds: string[]; // IDs dos átomos conectados
}

export interface Bond {
    id: string;
    atom1Id: string;
    atom2Id: string;
    bondType: 'single' | 'double' | 'triple';
}

export interface Molecule {
    atoms: AtomInstance[];
    bonds: Bond[];
}

// Distância máxima para formar ligações automáticas (em pixels)
export const BOND_DISTANCE_THRESHOLD = 80;

// Função para calcular distância entre duas posições
export const calculateDistance = (pos1: Position, pos2: Position): number => {
    const dx = pos1.x - pos2.x;
    const dy = pos1.y - pos2.y;
    return Math.sqrt(dx * dx + dy * dy);
};

// Função para verificar se dois átomos estão próximos o suficiente para formar ligação
export const canFormBond = (atom1: AtomInstance, atom2: AtomInstance): boolean => {
    const distance = calculateDistance(atom1.position, atom2.position);
    return distance <= BOND_DISTANCE_THRESHOLD;
};

// Função para gerar ID único para átomos
export const generateAtomId = (): string => {
    return `atom_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Função para gerar ID único para ligações
export const generateBondId = (): string => {
    return `bond_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Função para calcular a fórmula molecular
export const calculateMolecularFormula = (atoms: AtomInstance[]): string => {
    const elementCount: Record<string, number> = {};

    // Contar átomos de cada elemento
    atoms.forEach(atom => {
        elementCount[atom.symbol] = (elementCount[atom.symbol] || 0) + 1;
    });

    // Construir fórmula seguindo ordem convencional (C, H, depois alfabética)
    let formula = '';
    const sortedElements = Object.keys(elementCount).sort((a, b) => {
        // Carbono primeiro
        if (a === 'C') return -1;
        if (b === 'C') return 1;
        // Hidrogênio segundo
        if (a === 'H') return -1;
        if (b === 'H') return 1;
        // Resto em ordem alfabética
        return a.localeCompare(b);
    });

    sortedElements.forEach(symbol => {
        const count = elementCount[symbol];
        formula += symbol;
        if (count > 1) {
            formula += count.toString().replace(/[0-9]/g, (digit) => {
                // Converter para subscrito Unicode
                const subscripts = '₀₁₂₃₄₅₆₇₈₉';
                return subscripts[parseInt(digit)];
            });
        }
    });

    return formula || '';
};

// Função para obter nome comum de moléculas conhecidas
export const getMoleculeName = (formula: string): string | null => {
    const knownMolecules: Record<string, string> = {
        'H₂O': 'Água',
        'CO₂': 'Dióxido de Carbono',
        'CH₄': 'Metano',
        'NH₃': 'Amônia',
        'H₂SO₄': 'Ácido Sulfúrico',
        'HCl': 'Ácido Clorídrico',
        'C₂H₆': 'Etano',
        'C₂H₄': 'Eteno',
        'C₂H₂': 'Etino',
        'H₂S': 'Sulfeto de Hidrogênio',
        'PH₃': 'Fosfina',
    };

    return knownMolecules[formula] || null;
};

// Função para encontrar átomo por ID
export const findAtomById = (atoms: AtomInstance[], id: string): AtomInstance | undefined => {
    return atoms.find(atom => atom.id === id);
};

// Função para remover átomo e suas ligações
export const removeAtom = (molecule: Molecule, atomId: string): Molecule => {
    const filteredAtoms = molecule.atoms.filter(atom => atom.id !== atomId);
    const filteredBonds = molecule.bonds.filter(
        bond => bond.atom1Id !== atomId && bond.atom2Id !== atomId
    );

    // Atualizar referencias de ligações nos átomos restantes
    const updatedAtoms = filteredAtoms.map(atom => ({
        ...atom,
        bonds: atom.bonds.filter(bondAtomId => bondAtomId !== atomId)
    }));

    return {
        atoms: updatedAtoms,
        bonds: filteredBonds
    };
};
