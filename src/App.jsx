import { useState } from "react";
import SearchTabs from "./components/SearchTabs";
import PokemonModal from "./components/PokemonModal";

function App() {
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  return (
    <div className="flex flex-col items-center gap-8 p-10 pt-10 w-full">
      <h1 className="text-3xl md:text-5xl lg:text-6xl text-center font-pokemon text-yellow-400 [text-shadow:4px_4px_0_#2b6cb0,-2px_-2px_0_#2b6cb0,2px_-2px_0_#2b6cb0,-2px_2px_0_#2b6cb0,2px_2px_0_#2b6cb0] mb-2">
        Pokébuscador
      </h1>

      <SearchTabs onSelectPokemon={setSelectedPokemon} />

      <PokemonModal
        pokemon={selectedPokemon}
        isShiny={selectedPokemon?.isShiny}
        onClose={() => setSelectedPokemon(null)}
      />
    </div>
  );
}

export default App;
