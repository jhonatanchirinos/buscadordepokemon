import { useState } from "react";
import { usePokemonByType } from "../hooks/usePokemonByType";
import PokemonCard from "./PokemonCard";
import { Switch } from "@/components/ui/switch";

function SearchByType({ onSelectPokemon }) {
  const [primaryType, setPrimaryType] = useState("");
  const [secondaryType, setSecondaryType] = useState("");
  const [isShinyEnabled, setIsShinyEnabled] = useState(false);

  const { pokemonList, isLoading, hasError, search } = usePokemonByType();

  const handleSubmit = (e) => {
    e.preventDefault();
    search(primaryType, secondaryType);
  };

  return (
    <div className="flex flex-col gap-5 items-center w-auto sm:w-full">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-wrap gap-3 flex-col sm:flex-row justify-center items-center">
          <input
            value={primaryType}
            onChange={(e) => setPrimaryType(e.target.value)}
            placeholder="Tipo 1"
            className="border-3 border-gray-300 rounded-lg px-4 py-2 w-48 focus:outline-none focus:border-blue-500 shadow-sm"
          />
          <input
            value={secondaryType}
            onChange={(e) => setSecondaryType(e.target.value)}
            placeholder="Tipo 2"
            disabled={!primaryType.trim()}
            className="border-3 border-gray-300 rounded-lg px-4 py-2 w-48 focus:outline-none focus:border-blue-500 shadow-sm disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg disabled:opacity-50 cursor-pointer"
          >
            Buscar por tipo
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
          No se encontraron Pokémon de ese tipo
        </p>
      )}
      {isLoading && <p>Loading...</p>}

      {pokemonList.length > 0 && (
        <ul
          className="grid gap-4 p-10 pt-0 w-full"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
          }}
        >
          {pokemonList.map((p) => (
            <li
              key={p.name}
              className="w-52 cursor-pointer"
              onClick={() => onSelectPokemon({ ...p, isShiny: isShinyEnabled })}
            >
              <PokemonCard {...p} isShiny={isShinyEnabled} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchByType;
