// Dados básicos dos elementos químicos para o MVP
export interface AtomData {
  symbol: string;
  name: string;
  valence: number;
  color: string;
  atomicNumber: number;
}

// Elementos químicos básicos para o MVP
export const ATOMS: Record<string, AtomData> = {
  H: {
    symbol: 'H',
    name: 'Hidrogênio',
    valence: 1,
    color: '#FFFFFF',
    atomicNumber: 1,
  },
  C: {
    symbol: 'C',
    name: 'Carbono',
    valence: 4,
    color: '#909090',
    atomicNumber: 6,
  },
  N: {
    symbol: 'N',
    name: 'Nitrogênio',
    valence: 3,
    color: '#3050F8',
    atomicNumber: 7,
  },
  O: {
    symbol: 'O',
    name: 'Oxigênio',
    valence: 2,
    color: '#FF0D0D',
    atomicNumber: 8,
  },
  S: {
    symbol: 'S',
    name: 'Enxofre',
    valence: 2,
    color: '#FFFF30',
    atomicNumber: 16,
  },
  P: {
    symbol: 'P',
    name: 'Fósforo',
    valence: 3,
    color: '#FF8000',
    atomicNumber: 15,
  },
};

// Lista ordenada de elementos para exibição na interface
export const ATOM_LIST = ['H', 'C', 'N', 'O', 'S', 'P'];

// Função para obter dados de um átomo
export const getAtomData = (symbol: string): AtomData | undefined => {
  return ATOMS[symbol];
};

// Função para verificar se um símbolo é válido
export const isValidAtomSymbol = (symbol: string): boolean => {
  return symbol in ATOMS;
};
