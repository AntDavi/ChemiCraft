'use client'

import { Button } from "./ui/button";

export function ClearBtn() {
    const handleClick = () => {
        // Clear the canvas or perform any other action
    };

    return (
        <Button onClick={handleClick} className="absolute top-4 right-4 border-1 border-red-500 px-4 py-2 rounded bg-transparent text-red-500 hover:text-white hover:bg-red-500 transition-colors cursor-pointer">
            Limpar Canva
        </Button>
    );
}
