import { useState } from "react";
import { usePokemonByType } from "../hooks/usePokemonByType";
import PokemonCard from "./PokemonCard";
import { Switch } from "@/components/ui/switch";
import { POKEMON_TYPES } from "@/constants/pokemonTypes";

function SearchByType({ onSelectPokemon }) {
  const [primaryType, setPrimaryType] = useState("");
  const [secondaryType, setSecondaryType] = useState("");
  const [isShinyEnabled, setIsShinyEnabled] = useState(false);

  const { pokemonList, isLoading, hasError, search } = usePokemonByType();

  const handleSubmit = (e) => {
    e.preventDefault();
    search(primaryType, secondaryType);
  };

  const handlePrimaryChange = (e) => {
    setPrimaryType(e.target.value);
  };

  return (
    <div className="flex flex-col gap-5 items-center w-auto sm:w-full">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-wrap gap-3 flex-col sm:flex-row justify-center items-center">
          <select
            value={primaryType}
            onChange={handlePrimaryChange}
            className="border-3 border-gray-300 rounded-lg px-4 py-2 w-52 focus:outline-none focus:border-blue-500 shadow-sm bg-[#1A1A1A]"
          >
            <option value="">Tipo 1</option>
            {POKEMON_TYPES.map((t) => (
              <option
                key={t.value}
                value={t.value}
                disabled={t.value === secondaryType}
              >
                {t.label}
              </option>
            ))}
          </select>

          <select
            value={secondaryType}
            onChange={(e) => setSecondaryType(e.target.value)}
            className="border-3 border-gray-300 rounded-lg px-4 py-2 w-52 focus:outline-none focus:border-blue-500 shadow-sm disabled:opacity-60 bg-[#1A1A1A]"
          >
            <option value="">Tipo 2</option>
            {POKEMON_TYPES.map((t) => (
              <option
                key={t.value}
                value={t.value}
                disabled={t.value === primaryType}
              >
                {t.label}
              </option>
            ))}
          </select>

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
        <ul className="grid gap-4 p-10 pt-0 w-full grid-cols-[repeat(auto-fill,minmax(100px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(160px,1fr))]">
          {pokemonList.map((p) => (
            <li
              key={p.name}
              className="sm:w-52 cursor-pointer"
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
