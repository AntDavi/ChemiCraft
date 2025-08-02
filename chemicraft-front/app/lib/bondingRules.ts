import { getAtomData } from './atomData';
import { AtomInstance, Bond } from './moleculeUtils';

// Tipo de ligação baseado na diferença de valência
export type BondType = 'single' | 'double' | 'triple';

// Função para verificar se dois átomos podem formar ligação baseado em valência
export const canAtomsBond = (atom1: AtomInstance, atom2: AtomInstance): boolean => {
  const atom1Data = getAtomData(atom1.symbol);
  const atom2Data = getAtomData(atom2.symbol);
  
  if (!atom1Data || !atom2Data) return false;
  
  // Verificar se ambos os átomos ainda têm valência disponível
  const atom1AvailableValence = atom1Data.valence - atom1.bonds.length;
  const atom2AvailableValence = atom2Data.valence - atom2.bonds.length;
  
  return atom1AvailableValence > 0 && atom2AvailableValence > 0;
};

// Função para determinar o tipo de ligação entre dois átomos
export const determineBondType = (atom1: AtomInstance, atom2: AtomInstance): BondType => {
  const atom1Data = getAtomData(atom1.symbol);
  const atom2Data = getAtomData(atom2.symbol);
  
  if (!atom1Data || !atom2Data) return 'single';
  
  const atom1AvailableValence = atom1Data.valence - atom1.bonds.length;
  const atom2AvailableValence = atom2Data.valence - atom2.bonds.length;
  
  // Determinar tipo de ligação baseado na valência disponível
  const minAvailableValence = Math.min(atom1AvailableValence, atom2AvailableValence);
  
  // Regras específicas para alguns elementos
  if (atom1.symbol === 'C' && atom2.symbol === 'C') {
    // Carbono-Carbono pode formar ligações duplas ou triplas
    if (minAvailableValence >= 3) return 'triple';
    if (minAvailableValence >= 2) return 'double';
  }
  
  if ((atom1.symbol === 'C' && atom2.symbol === 'O') || 
      (atom1.symbol === 'O' && atom2.symbol === 'C')) {
    // Carbono-Oxigênio pode formar ligação dupla
    if (minAvailableValence >= 2) return 'double';
  }
  
  if ((atom1.symbol === 'C' && atom2.symbol === 'N') || 
      (atom1.symbol === 'N' && atom2.symbol === 'C')) {
    // Carbono-Nitrogênio pode formar ligações duplas ou triplas
    if (minAvailableValence >= 3) return 'triple';
    if (minAvailableValence >= 2) return 'double';
  }
  
  // Por padrão, formar ligação simples
  return 'single';
};

// Função para obter o número de elétrons compartilhados baseado no tipo de ligação
export const getBondElectrons = (bondType: BondType): number => {
  switch (bondType) {
    case 'single': return 2;
    case 'double': return 4;
    case 'triple': return 6;
    default: return 2;
  }
};

// Função para verificar se um átomo atingiu sua valência máxima
export const isAtomSaturated = (atom: AtomInstance, bonds: Bond[]): boolean => {
  const atomData = getAtomData(atom.symbol);
  if (!atomData) return true;
  
  // Contar elétrons compartilhados em todas as ligações do átomo
  let totalSharedElectrons = 0;
  
  bonds.forEach(bond => {
    if (bond.atom1Id === atom.id || bond.atom2Id === atom.id) {
      totalSharedElectrons += getBondElectrons(bond.bondType);
    }
  });
  
  // Verificar se atingiu a valência máxima (2 elétrons por ligação simples)
  return totalSharedElectrons >= atomData.valence * 2;
};

// Função para verificar se uma molécula é estável (todos os átomos satisfazem regras básicas)
export const isMoleculeStable = (atoms: AtomInstance[], bonds: Bond[]): boolean => {
  // Verificar se hidrogênios têm no máximo 1 ligação
  const hydrogens = atoms.filter(atom => atom.symbol === 'H');
  for (const hydrogen of hydrogens) {
    const hydrogenBonds = bonds.filter(
      bond => bond.atom1Id === hydrogen.id || bond.atom2Id === hydrogen.id
    );
    if (hydrogenBonds.length > 1) return false;
  }
  
  // Verificar se outros átomos não excedem sua valência
  for (const atom of atoms) {
    if (atom.symbol !== 'H') {
      const atomBonds = bonds.filter(
        bond => bond.atom1Id === atom.id || bond.atom2Id === atom.id
      );
      
      let totalBondOrder = 0;
      atomBonds.forEach(bond => {
        switch (bond.bondType) {
          case 'single': totalBondOrder += 1; break;
          case 'double': totalBondOrder += 2; break;
          case 'triple': totalBondOrder += 3; break;
        }
      });
      
      const atomData = getAtomData(atom.symbol);
      if (atomData && totalBondOrder > atomData.valence) {
        return false;
      }
    }
  }
  
  return true;
};

// Regras especiais para formação de moléculas comuns
export const getMoleculeFormationRules = () => {
  return {
    // Água: H-O-H
    water: {
      formula: 'H₂O',
      atoms: ['H', 'H', 'O'],
      centralAtom: 'O'
    },
    // Metano: H-C-H com 4 hidrogênios
    methane: {
      formula: 'CH₄',
      atoms: ['C', 'H', 'H', 'H', 'H'],
      centralAtom: 'C'
    },
    // Amônia: H-N-H com 3 hidrogênios
    ammonia: {
      formula: 'NH₃',
      atoms: ['N', 'H', 'H', 'H'],
      centralAtom: 'N'
    }
  };
};
