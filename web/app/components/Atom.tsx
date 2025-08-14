import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

interface AtomProps {
    symbol: string;
    color: string;
    name: string;
}

export const Atom = ({ symbol, color, name }: AtomProps) => {
    return (
        <Tooltip>
            <TooltipTrigger
                className="w-8 h-8 p-3 border border-gray-400 rounded-full flex items-center justify-center cursor-grab hover:scale-110 transition-transform"
                style={{ backgroundColor: color }}
            >
                <span className="text-xs font-bold select-none">{symbol}</span>
            </TooltipTrigger>
            <TooltipContent>
                {name}
            </TooltipContent>
        </Tooltip>
    )
}