"use client";

import React from 'react';
import { type AtomData } from '@/lib/atomData';
import { cn } from '@/libs/utils';

export interface AtomProps {
    atomData: AtomData;
    size?: number;
    className?: string;
    onClick?: () => void;
    onDragStart?: (e: React.DragEvent) => void;
    draggable?: boolean;
    style?: React.CSSProperties;
    children?: React.ReactNode;
}

const Atom: React.FC<AtomProps> = ({
    atomData,
    size = 40,
    className,
    onClick,
    onDragStart,
    draggable = false,
    style,
    children,
}) => {
    const handleClick = () => {
        onClick?.();
    };

    const handleDragStart = (e: React.DragEvent) => {
        if (onDragStart) {
            onDragStart(e);
        } else if (draggable) {
            // Comportamento padrão de drag
            e.dataTransfer.setData('atom-symbol', atomData.symbol);
            e.dataTransfer.effectAllowed = 'copy';
        }
    };

    // Determinar cor do texto baseado na cor de fundo
    const getTextColor = (backgroundColor: string): string => {
        // Cores claras que precisam de texto escuro
        const lightColors = ['#FFFFFF', '#FFFF30'];
        return lightColors.includes(backgroundColor) ? '#000000' : '#FFFFFF';
    };

    // Determinar cor da borda
    const getBorderColor = (backgroundColor: string): string => {
        return backgroundColor === '#FFFFFF' ? '#000000' : backgroundColor;
    };

    const atomStyle: React.CSSProperties = {
        width: size,
        height: size,
        backgroundColor: atomData.color,
        borderColor: getBorderColor(atomData.color),
        color: getTextColor(atomData.color),
        minWidth: size,
        minHeight: size,
        maxWidth: size,
        maxHeight: size,
        ...style,
    };

    return (
        <div
            className={cn(
                "flex items-center justify-center border-2 cursor-pointer",
                "transition-all duration-200 select-none font-bold",
                "hover:scale-110 active:scale-95",
                className
            )}
            style={{
                ...atomStyle,
                borderRadius: '50%',
                aspectRatio: '1 / 1',
            }}
            onClick={handleClick}
            onDragStart={handleDragStart}
            draggable={draggable}
            title={`${atomData.name} (${atomData.symbol})`}
        >
            <span
                className="text-sm font-bold"
                style={{
                    fontSize: `${Math.max(10, size * 0.3)}px`,
                }}
            >
                {atomData.symbol}
            </span>
            {children}
        </div>
    );
};

export default Atom;