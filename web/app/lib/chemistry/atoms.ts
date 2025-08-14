// app/lib/atoms.ts
export type AtomData = {
    symbol: string;
    name: string;
    atomicNumber: number;
    valences: number[];
    color: string;
};

export const mockAtoms: AtomData[] = [
    { symbol: "H", name: "Hidrogênio", atomicNumber: 1, valences: [1], color: "#ffcc00" },
    { symbol: "O", name: "Oxigênio", atomicNumber: 8, valences: [2], color: "#99ff99" },
    { symbol: "C", name: "Carbono", atomicNumber: 6, valences: [4], color: "#d9d9d9" },
    { symbol: "N", name: "Nitrogênio", atomicNumber: 7, valences: [3, 5], color: "#ffff99" },
    { symbol: "Cl", name: "Cloro", atomicNumber: 17, valences: [1, 3, 5, 7], color: "#66ff66" },
    { symbol: "Ne", name: "Neônio", atomicNumber: 10, valences: [0], color: "#ff99ff" },
    { symbol: "Ar", name: "Argônio", atomicNumber: 18, valences: [0], color: "#80ffff" }
];
