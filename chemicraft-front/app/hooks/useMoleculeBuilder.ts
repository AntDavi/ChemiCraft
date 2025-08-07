'use client';

import { useState, useCallback } from 'react';
import { type AtomData } from '@/lib/atomData';

// Tipos para o estado da molécula
export interface AtomInstance {
    id: string;
    atomData: AtomData;
    position: { x: number; y: number };
    availableValence: number; // Valência disponível para novas ligações
}

export interface Bond {
    id: string;
    atom1Id: string;
    atom2Id: string;
    type: 'single' | 'double' | 'triple';
}

export interface MoleculeFormula {
    formula: string;
    atomCounts: Record<string, number>;
}

interface MoleculeBuilderState {
    atoms: AtomInstance[];
    bonds: Bond[];
    selectedAtomId: string | null;
}

export const useMoleculeBuilder = () => {
    const [state, setState] = useState<MoleculeBuilderState>({
        atoms: [],
        bonds: [],
        selectedAtomId: null,
    });

    // Adicionar um átomo ao canvas
    const addAtom = useCallback((atomData: AtomData, position: { x: number; y: number }) => {
        const newAtom: AtomInstance = {
            id: `atom_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            atomData,
            position,
            availableValence: atomData.valence,
        };

        setState(prev => ({
            ...prev,
            atoms: [...prev.atoms, newAtom],
        }));

        return newAtom.id;
    }, []);

    // Remover um átomo (e suas ligações)
    const removeAtom = useCallback((atomId: string) => {
        setState(prev => ({
            ...prev,
            atoms: prev.atoms.filter(atom => atom.id !== atomId),
            bonds: prev.bonds.filter(bond => bond.atom1Id !== atomId && bond.atom2Id !== atomId),
            selectedAtomId: prev.selectedAtomId === atomId ? null : prev.selectedAtomId,
        }));
    }, []);

    // Mover um átomo para nova posição
    const moveAtom = useCallback((atomId: string, newPosition: { x: number; y: number }) => {
        setState(prev => ({
            ...prev,
            atoms: prev.atoms.map(atom =>
                atom.id === atomId ? { ...atom, position: newPosition } : atom
            ),
        }));
    }, []);

    // Selecionar um átomo
    const selectAtom = useCallback((atomId: string | null) => {
        setState(prev => ({
            ...prev,
            selectedAtomId: atomId,
        }));
    }, []);

    // Criar ligação entre dois átomos
    const createBond = useCallback((atom1Id: string, atom2Id: string, bondType: 'single' | 'double' | 'triple' = 'single') => {
        // Verificar se os átomos existem
        const atom1 = state.atoms.find(atom => atom.id === atom1Id);
        const atom2 = state.atoms.find(atom => atom.id === atom2Id);

        if (!atom1 || !atom2) {
            console.warn('Um ou ambos os átomos não foram encontrados');
            return false;
        }

        // Verificar se já existe uma ligação entre esses átomos
        const existingBond = state.bonds.find(bond =>
            (bond.atom1Id === atom1Id && bond.atom2Id === atom2Id) ||
            (bond.atom1Id === atom2Id && bond.atom2Id === atom1Id)
        );

        if (existingBond) {
            console.warn('Já existe uma ligação entre esses átomos');
            return false;
        }

        // Verificar valência disponível
        const bondStrength = bondType === 'single' ? 1 : bondType === 'double' ? 2 : 3;

        if (atom1.availableValence < bondStrength || atom2.availableValence < bondStrength) {
            console.warn('Valência insuficiente para criar a ligação');
            return false;
        }

        // Criar a ligação
        const newBond: Bond = {
            id: `bond_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            atom1Id,
            atom2Id,
            type: bondType,
        };

        setState(prev => ({
            ...prev,
            bonds: [...prev.bonds, newBond],
            atoms: prev.atoms.map(atom => {
                if (atom.id === atom1Id || atom.id === atom2Id) {
                    return {
                        ...atom,
                        availableValence: atom.availableValence - bondStrength,
                    };
                }
                return atom;
            }),
        }));

        return true;
    }, [state.atoms, state.bonds]);

    // Remover ligação
    const removeBond = useCallback((bondId: string) => {
        const bond = state.bonds.find(b => b.id === bondId);
        if (!bond) return;

        const bondStrength = bond.type === 'single' ? 1 : bond.type === 'double' ? 2 : 3;

        setState(prev => ({
            ...prev,
            bonds: prev.bonds.filter(b => b.id !== bondId),
            atoms: prev.atoms.map(atom => {
                if (atom.id === bond.atom1Id || atom.id === bond.atom2Id) {
                    return {
                        ...atom,
                        availableValence: atom.availableValence + bondStrength,
                    };
                }
                return atom;
            }),
        }));
    }, [state.bonds]);

    // Calcular fórmula molecular
    const calculateMolecularFormula = useCallback((): MoleculeFormula => {
        const atomCounts: Record<string, number> = {};

        // Contar átomos por símbolo
        state.atoms.forEach(atom => {
            const symbol = atom.atomData.symbol;
            atomCounts[symbol] = (atomCounts[symbol] || 0) + 1;
        });

        // Gerar fórmula (ordenar por convenção: C, H, depois alfabético)
        const orderedSymbols = Object.keys(atomCounts).sort((a, b) => {
            if (a === 'C') return -1;
            if (b === 'C') return 1;
            if (a === 'H') return -1;
            if (b === 'H') return 1;
            return a.localeCompare(b);
        });

        const formula = orderedSymbols
            .map(symbol => {
                const count = atomCounts[symbol];
                return count === 1 ? symbol : `${symbol}${count}`;
            })
            .join('');

        return { formula, atomCounts };
    }, [state.atoms]);

    // Limpar toda a estrutura molecular
    const clearMolecule = useCallback(() => {
        setState({
            atoms: [],
            bonds: [],
            selectedAtomId: null,
        });
    }, []);

    // Verificar se dois átomos estão próximos o suficiente para ligação
    const areAtomsClose = useCallback((atom1Id: string, atom2Id: string, threshold: number = 100): boolean => {
        const atom1 = state.atoms.find(atom => atom.id === atom1Id);
        const atom2 = state.atoms.find(atom => atom.id === atom2Id);

        if (!atom1 || !atom2) return false;

        const distance = Math.sqrt(
            Math.pow(atom2.position.x - atom1.position.x, 2) +
            Math.pow(atom2.position.y - atom1.position.y, 2)
        );

        return distance <= threshold;
    }, [state.atoms]);

    // Encontrar átomos próximos a uma posição
    const findNearbyAtoms = useCallback((position: { x: number; y: number }, threshold: number = 100): AtomInstance[] => {
        return state.atoms.filter(atom => {
            const distance = Math.sqrt(
                Math.pow(atom.position.x - position.x, 2) +
                Math.pow(atom.position.y - position.y, 2)
            );
            return distance <= threshold;
        });
    }, [state.atoms]);

    return {
        // Estado
        atoms: state.atoms,
        bonds: state.bonds,
        selectedAtomId: state.selectedAtomId,

        // Funções de manipulação
        addAtom,
        removeAtom,
        moveAtom,
        selectAtom,
        createBond,
        removeBond,
        clearMolecule,

        // Funções utilitárias
        calculateMolecularFormula,
        areAtomsClose,
        findNearbyAtoms,
    };
};
