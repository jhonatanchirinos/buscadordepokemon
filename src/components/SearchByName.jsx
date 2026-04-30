import { useState } from "react";
import { usePokemonByName } from "../hooks/usePokemonByName";
import PokemonCard from "./PokemonCard";
import { Switch } from "@/components/ui/switch";

function SearchByName({ onSelectPokemon }) {
  const [nameInput, setNameInput] = useState("");
  const [isShinyEnabled, setIsShinyEnabled] = useState(false);

  const { pokemon, isLoading, hasError, search } = usePokemonByName();

  const handleSubmit = (e) => {
    e.preventDefault();
    search(nameInput);
  };

  const handleSelect = () => {
    onSelectPokemon({
      name: pokemon.name,
      image: pokemon.sprites.other["home"].front_default,
      imageShiny: pokemon.sprites.other["home"].front_shiny,
      isShiny: isShinyEnabled,
    });
  };

  return (
    <div className="flex flex-col gap-5 items-center">
      <form onSubmit={handleSubmit}>
        <div className="flex gap-3 flex-wrap flex-col sm:flex-row justify-center items-center">
          <input
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            placeholder="Nombre del Pokémon"
            className="border-3 border-gray-300 rounded-lg px-4 py-2 text-base focus:outline-none  focus:border-blue-500 shadow-sm w-48"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg disabled:opacity-50 cursor-pointer"
          >
            Buscar por nombre
          </button>
        </div>
      </form>

      <label className="flex items-center gap-3 font-semibold">
        <Switch
          checked={isShinyEnabled}
          onCheckedChange={setIsShinyEnabled}
          className="cursor-pointer data-[state=checked]:bg-blue-500 scale-120"
        />
        ✨ Shiny
      </label>

      {hasError && (
        <p className="text-red-500 italic">
          No se encontró ningún Pokémon con ese nombre
        </p>
      )}
      {isLoading && <p>Loading...</p>}

      {pokemon && (
        <div className="w-52 cursor-pointer" onClick={handleSelect}>
          <PokemonCard
            name={pokemon.name}
            image={pokemon.sprites.other["home"].front_default}
            imageShiny={pokemon.sprites.other["home"].front_shiny}
            isShiny={isShinyEnabled}
          />
        </div>
      )}
    </div>
  );
}

export default SearchByName;
