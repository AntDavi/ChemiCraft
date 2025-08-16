
interface CounterCardProps {
    atoms: number;
    bonds: number;
    molecules: number;
}

export function CounterCard({ atoms, bonds, molecules }: CounterCardProps) {
    return (
        <div className="bg-background/90 border border-neutral-300 backdrop-blur px-4 py-2 rounded-lg shadow z-10 w-fit min-w-[120px] text-left">
            <ul className="text-xs text-muted-foreground space-y-0.5 font-normal">
                <li>Átomos: <span className="font-medium text-foreground">{atoms}</span></li>
                <li>Ligações: <span className="font-medium text-foreground">{bonds}</span></li>
                <li>Moléculas: <span className="font-medium text-foreground">{molecules}</span></li>
            </ul>
        </div>
    );
}
