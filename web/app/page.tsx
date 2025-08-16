import { AtomSelector } from "./_components/AtomSelector";
import { ClearBtn } from "./_components/ClearBtn";
import { MoleculeCanvas } from "./_components/MoleculeCanvas";

import { CounterCard } from "./_components/CounterCard";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full bg-background">


      <header className="fixed top-0 left-0 w-full flex flex-col items-start p-4 z-20 gap-2">
        <div className="w-full flex items-center justify-between">
          <div className="bbg-background/90 border border-neutral-300 backdrop-blur px-4 py-2 rounded-lg shadow z-10 w-fit min-w-[120px] text-left">
            <h2 className="text-2xl font-bold">Chemicraft</h2>
            <p className="text-base text-muted-foreground">Crie moléculas de forma simples e rápida.</p>
          </div>
          <ClearBtn />
        </div>
        <CounterCard atoms={6} bonds={5} molecules={2} />
      </header>

      <div className="relative flex flex-col items-center justify-center">
        <MoleculeCanvas />
        <AtomSelector />
      </div>

    </main>
  );
}
