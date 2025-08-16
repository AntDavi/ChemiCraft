'use client'

import { Button } from "./ui/button";

interface ClearBtnProps {
    onClear: () => void;
}

export function ClearBtn({ onClear }: ClearBtnProps) {
    const handleClick = () => {
        // Confirmar antes de limpar
        const confirmed = window.confirm(
            "Tem certeza que deseja limpar todo o canvas? Esta ação não pode ser desfeita."
        );

        if (confirmed) {
            onClear();
        }
    };

    return (
        <Button onClick={handleClick} className="absolute top-4 right-4 border-1 border-red-500 px-4 py-2 rounded bg-transparent text-red-500 hover:text-white hover:bg-red-500 transition-colors cursor-pointer">
            Limpar Canvas
        </Button>
    );
}
