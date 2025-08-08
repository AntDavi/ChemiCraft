'use client';

import React from 'react';
import { Tooltip, TooltipTrigger, TooltipContent } from './ui/tooltip';

interface MoleculeNameDisplayProps {
    formula: string;
    atomCounts: Record<string, number>;
    className?: string;
}

const MoleculeNameDisplay: React.FC<MoleculeNameDisplayProps> = ({
    formula,
    atomCounts,
    className
}) => {
    // Se não há átomos, não renderiza nada
    if (!formula || Object.keys(atomCounts).length === 0) {
        return null;
    }

    // Converter números para subscrito
    const toSubscript = (num: number): string => {
        const subscripts = ['₀', '₁', '₂', '₃', '₄', '₅', '₆', '₇', '₈', '₉'];
        return num.toString().split('').map(digit => subscripts[parseInt(digit)]).join('');
    };

    // Construir fórmula formatada
    const buildFormattedFormula = (): string => {
        // Ordenar elementos: C primeiro, H segundo, depois alfabético
        const orderedSymbols = Object.keys(atomCounts).sort((a, b) => {
            if (a === 'C') return -1;
            if (b === 'C') return 1;
            if (a === 'H') return -1;
            if (b === 'H') return 1;
            return a.localeCompare(b);
        });

        return orderedSymbols
            .map(symbol => {
                const count = atomCounts[symbol];
                return count === 1 ? symbol : symbol + toSubscript(count);
            })
            .join('');
    };

    const formattedFormula = buildFormattedFormula();
    const totalAtoms = Object.values(atomCounts).reduce((sum, count) => sum + count, 0);

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <div className={`
          inline-flex items-center px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm
          cursor-help hover:bg-gray-50 transition-colors duration-200
          ${className}
        `}>
                    <div className="text-lg font-mono font-semibold text-gray-800">
                        {formattedFormula}
                    </div>
                    <div className="ml-2 text-xs text-gray-500">
                        {totalAtoms} átomo{totalAtoms > 1 ? 's' : ''}
                    </div>
                </div>
            </TooltipTrigger>
            <TooltipContent side="top" className="bg-gray-900 text-white border border-gray-700">
                <div className="text-center space-y-1">
                    <div className="font-semibold">Fórmula Molecular</div>
                    <div className="text-sm text-gray-300">
                        {Object.entries(atomCounts).map(([symbol, count]) => (
                            <div key={symbol}>
                                {symbol}: {count} átomo{count > 1 ? 's' : ''}
                            </div>
                        ))}
                    </div>
                    <div className="text-xs text-gray-400 border-t border-gray-600 pt-1">
                        Total: {totalAtoms} átomos
                    </div>
                </div>
            </TooltipContent>
        </Tooltip>
    );
};

export default MoleculeNameDisplay;
