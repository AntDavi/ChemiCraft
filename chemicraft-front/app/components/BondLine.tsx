import React from 'react';

interface BondLineProps {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    type: 'single' | 'double' | 'triple';
}

const BondLine: React.FC<BondLineProps> = ({ x1, y1, x2, y2, type }) => {
    // Cálculo de deslocamento para linhas paralelas
    const getOffset = (index: number, total: number) => {
        const spacing = 6; // px entre linhas
        if (total === 1) return 0;
        if (total === 2) return index === 0 ? -spacing : spacing;
        if (total === 3) return index - 1 * spacing;
        return 0;
    };

    // Calcular ângulo da ligação
    const angle = Math.atan2(y2 - y1, x2 - x1);
    const sin = Math.sin(angle);
    const cos = Math.cos(angle);

    const lines = [];
    const total = type === 'single' ? 1 : type === 'double' ? 2 : 3;
    for (let i = 0; i < total; i++) {
        const offset = getOffset(i, total);
        lines.push(
            <line
                key={i}
                x1={x1 + offset * sin}
                y1={y1 - offset * cos}
                x2={x2 + offset * sin}
                y2={y2 - offset * cos}
                stroke="#374151"
                strokeWidth={2}
                strokeLinecap="round"
            />
        );
    }

    return <>{lines}</>;
};

export default BondLine;
