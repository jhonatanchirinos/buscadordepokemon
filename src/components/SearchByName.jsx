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
      types: pokemon.types.map((t) => t.type.name),
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
            className="border-2 rounded-lg px-4 py-2 text-base bg-[#1e1e1e] border-slate-800 focus:outline-none shadow-sm w-52"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-[#1e1e1e] hover:bg-[#2d2d2d] text-white px-4 py-2 rounded-lg disabled:opacity-50 cursor-pointer"
          >
            Buscar por nombre
          </button>
        </div>
      </form>

      <label className="flex items-center gap-3 font-semibold">
        <Switch
          checked={isShinyEnabled}
          onCheckedChange={setIsShinyEnabled}
          className="cursor-pointer data-[state=checked]:bg-[#1e1e1e] scale-120"
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
        <div className="w-50 sm:w-60" onClick={handleSelect}>
          <PokemonCard
            name={pokemon.name}
            image={pokemon.sprites.other["home"].front_default}
            imageShiny={pokemon.sprites.other["home"].front_shiny}
            isShiny={isShinyEnabled}
            types={pokemon.types.map((t) => t.type.name)}
          />
        </div>
      )}
    </div>
  );
}

export default SearchByName;
