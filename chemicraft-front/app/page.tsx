import AtomSelector from "./components/AtomSelector";
import MoleculeCanvas from "./components/MoleculeCanvas";

export default function Home() {
  return (
    <main className="">
      <header className="text-center p-8">
        <h1>Welcome to ChemiCraft</h1>
        <p>Your one-stop solution for all your chemical needs.</p>
      </header>
      <AtomSelector />
      <MoleculeCanvas />
    </main>
  );
}
