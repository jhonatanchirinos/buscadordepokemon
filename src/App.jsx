import { useState } from "react";
import SearchByName from "./components/SearchByName";
import SearchByType from "./components/SearchByType";
import PokemonModal from "./components/PokemonModal";

function App() {
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  return (
    <div className="flex flex-col items-center gap-10 p-10 pt-10 ">
      <h1 className="text-7xl text-center">Pokémon App</h1>

      <SearchByName onSelectPokemon={setSelectedPokemon} />
      <SearchByType onSelectPokemon={setSelectedPokemon} />

      <PokemonModal
        pokemon={selectedPokemon}
        isShiny={selectedPokemon?.isShiny}
        onClose={() => setSelectedPokemon(null)}
      />
    </div>
  );
}

export default App;
