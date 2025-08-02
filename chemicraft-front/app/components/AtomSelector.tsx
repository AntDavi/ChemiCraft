"use client";

import React from 'react';
import { Dock, DockIcon } from './ui/dock';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { ATOM_LIST, getAtomData, type AtomData } from '@/lib/atomData';
import { cn } from '@/libs/utils';
import Atom from './Atom';

interface AtomSelectorProps {
    onAtomSelect?: (atomSymbol: string) => void;
    className?: string;
}

interface AtomIconProps {
    atomData: AtomData;
    onSelect?: (symbol: string) => void;
}

const AtomIcon: React.FC<AtomIconProps> = ({ atomData, onSelect }) => {
    const handleClick = () => {
        onSelect?.(atomData.symbol);
    };

    const handleDragStart = (e: React.DragEvent) => {
        e.dataTransfer.setData('atom-symbol', atomData.symbol);
        e.dataTransfer.effectAllowed = 'copy';
    };

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <DockIcon className="p-0">
                    <Atom
                        atomData={atomData}
                        size={45}
                        draggable
                        onClick={handleClick}
                        onDragStart={handleDragStart}
                        className="border-gray-300 dark:border-gray-600"
                    />
                </DockIcon>
            </TooltipTrigger>
            <TooltipContent side="top" className="bg-gray-900 text-white border border-gray-700">
                <div className="text-center space-y-1">
                    <div className="font-semibold text-sm">{atomData.name}</div>
                    <div className="text-xs opacity-90">
                        <div>Símbolo: {atomData.symbol}</div>
                        <div>Número Atômico: {atomData.atomicNumber}</div>
                        <div>Valência: {atomData.valence}</div>
                    </div>
                </div>
            </TooltipContent>
        </Tooltip>
    );
};

const AtomSelector: React.FC<AtomSelectorProps> = ({
    onAtomSelect,
    className
}) => {
    return (
        <div className={cn("flex justify-center w-full", className)}>
            <Dock
                iconSize={50}
                iconMagnification={70}
                iconDistance={120}
                direction="middle"
                className="bg-white/20 dark:bg-black/20 backdrop-blur-md border border-white/30 dark:border-black/30"
            >
                {ATOM_LIST.map((atomSymbol) => {
                    const atomData = getAtomData(atomSymbol);
                    if (!atomData) return null;

                    return (
                        <AtomIcon
                            key={atomSymbol}
                            atomData={atomData}
                            onSelect={onAtomSelect}
                        />
                    );
                })}
            </Dock>
        </div>
    );
};

export default AtomSelector;