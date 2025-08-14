import { AtomSelector } from "./components/AtomSelector";
import { MoleculeCanvas } from "./components/MoleculeCanvas";

export default function Home() {
  return (
    <main className="container mx-auto">
      <header>
        <h2>Chemicraft</h2>
        <p>Crie moléculas de forma simples e rápida.</p>
      </header>

      <section>
        <MoleculeCanvas />
        <AtomSelector />
      </section>
    </main>
  );
}
