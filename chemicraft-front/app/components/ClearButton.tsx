'use client';

import React, { useState } from 'react';
import { Button } from './ui/button';
import { Tooltip, TooltipTrigger, TooltipContent } from './ui/tooltip';
import { Trash2, AlertTriangle } from 'lucide-react';

interface ClearButtonProps {
    onClear: () => void;
    disabled?: boolean;
    className?: string;
}

const ClearButton: React.FC<ClearButtonProps> = ({
    onClear,
    disabled = false,
    className
}) => {
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleClick = () => {
        if (showConfirmation) {
            // Confirmar e limpar
            onClear();
            setShowConfirmation(false);
        } else {
            // Mostrar confirmação
            setShowConfirmation(true);
            // Auto-hide confirmation after 3 seconds
            setTimeout(() => setShowConfirmation(false), 3000);
        }
    };

    const handleCancel = (e: React.MouseEvent) => {
        e.stopPropagation();
        setShowConfirmation(false);
    };

    if (showConfirmation) {
        return (
            <div className={`flex items-center gap-2 ${className}`}>
                <div className="flex items-center gap-2 px-3 py-2 bg-red-50 border border-red-200 rounded-lg">
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                    <span className="text-sm text-red-700">Limpar tudo?</span>
                </div>
                <Button
                    onClick={handleClick}
                    variant="destructive"
                    size="sm"
                    className="px-3"
                >
                    Confirmar
                </Button>
                <Button
                    onClick={handleCancel}
                    variant="outline"
                    size="sm"
                    className="px-3"
                >
                    Cancelar
                </Button>
            </div>
        );
    }

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    onClick={handleClick}
                    variant="outline"
                    size="sm"
                    disabled={disabled}
                    className={`flex items-center gap-2 hover:bg-red-50 hover:border-red-200 hover:text-red-700 ${className}`}
                >
                    <Trash2 className="w-4 h-4" />
                    Limpar Tudo
                </Button>
            </TooltipTrigger>
            <TooltipContent side="top">
                <div className="text-center">
                    <div className="font-semibold">Limpar Canvas</div>
                    <div className="text-xs text-gray-300">
                        Remove todos os átomos e ligações
                    </div>
                </div>
            </TooltipContent>
        </Tooltip>
    );
};

export default ClearButton;
