import { AtomSelector } from "./components/AtomSelector";
import { MoleculeCanvas } from "./components/MoleculeCanvas";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full bg-background">
      <header className="text-center py-6">
        <h2 className="text-2xl font-bold">Chemicraft</h2>
        <p className="text-base text-muted-foreground">Crie moléculas de forma simples e rápida.</p>
      </header>

      <div className="relative flex flex-col items-center justify-center w-full h-[calc(100vh-120px)] px-4 pb-24">
        <MoleculeCanvas />
      </div>

      <AtomSelector />
    </main>
  );
}
