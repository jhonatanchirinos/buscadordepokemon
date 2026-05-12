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
            className="border-2 rounded-lg px-4 py-2 w-52 shadow-sm bg-[#1A1A1A] border-slate-800 focus:outline-none "
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
            className="border-2 rounded-lg px-4 py-2 w-52 shadow-sm bg-[#1A1A1A] border-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-slate-400 disabled:opacity-60"
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
            className="bg-[#1e1e1e] hover:bg-[#2d2d2d] text-white px-4 py-2 rounded-lg disabled:opacity-50 cursor-pointer"
          >
            Buscar por tipo
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
          No se encontraron Pokémon de ese tipo
        </p>
      )}
      {isLoading && <p>Loading...</p>}

      {pokemonList.length > 0 && (
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4 sm:gap-6 w-full px-2 sm:px-5 pb-5">
          {pokemonList.map((p) => (
            <li
              key={p.name}
              className="w-full flex"
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
