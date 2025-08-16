// app/lib/atoms.ts
export type AtomData = {
    symbol: string;
    name: string;
    atomicNumber: number;
    valences: number[];
    color: string;
};

export const mockAtoms: AtomData[] = [
    // Elementos mais básicos e essenciais
    { symbol: "H", name: "Hidrogênio", atomicNumber: 1, valences: [1], color: "#ffffff" },
    { symbol: "C", name: "Carbono", atomicNumber: 6, valences: [4], color: "#404040" },
    { symbol: "N", name: "Nitrogênio", atomicNumber: 7, valences: [3, 5], color: "#3050f8" },
    { symbol: "O", name: "Oxigênio", atomicNumber: 8, valences: [2], color: "#ff0d0d" },

    // Halogênios importantes
    { symbol: "F", name: "Flúor", atomicNumber: 9, valences: [1], color: "#90e050" },
    { symbol: "Cl", name: "Cloro", atomicNumber: 17, valences: [1, 3, 5, 7], color: "#1ff01f" },
    { symbol: "Br", name: "Bromo", atomicNumber: 35, valences: [1, 3, 5, 7], color: "#a62929" },

    // Metais alcalinos importantes
    { symbol: "Na", name: "Sódio", atomicNumber: 11, valences: [1], color: "#ab5cf2" },
    { symbol: "K", name: "Potássio", atomicNumber: 19, valences: [1], color: "#8f40d4" },

    // Metais alcalino-terrosos
    { symbol: "Mg", name: "Magnésio", atomicNumber: 12, valences: [2], color: "#8aff00" },
    { symbol: "Ca", name: "Cálcio", atomicNumber: 20, valences: [2], color: "#3dff00" },

    // Outros elementos importantes
    { symbol: "S", name: "Enxofre", atomicNumber: 16, valences: [2, 4, 6], color: "#ffff30" },
    { symbol: "P", name: "Fósforo", atomicNumber: 15, valences: [3, 5], color: "#ff8000" },
    { symbol: "Si", name: "Silício", atomicNumber: 14, valences: [4], color: "#f0c8a0" },
    { symbol: "Al", name: "Alumínio", atomicNumber: 13, valences: [3], color: "#bfa6a6" },
];
