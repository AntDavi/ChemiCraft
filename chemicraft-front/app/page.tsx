import AtomSelector from "./components/AtomSelector";
import MoleculeCanvas from "./components/MoleculeCanvas";

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <header className="text-center p-8">
        <h1>Welcome to ChemiCraft</h1>
        <p>Your one-stop solution for all your chemical needs.</p>
      </header>
      <MoleculeCanvas />
      <AtomSelector />
    </main>
  );
}
