import { useState } from "react";
import { usePokemonByType } from "../hooks/usePokemonByType";
import PokemonCard from "./PokemonCard";
import TypeDropdown from "./TypeDropdown";
import { Switch } from "@/components/ui/switch";

const SearchByType = ({ onSelectPokemon }) => {
  const [primaryType, setPrimaryType] = useState("");
  const [secondaryType, setSecondaryType] = useState("");
  const [isShinyEnabled, setIsShinyEnabled] = useState(false);

  const { pokemonList, isLoading, hasError, search } = usePokemonByType();

  const handleSubmit = (e) => {
    e.preventDefault();
    search(primaryType, secondaryType);
  };

  return (
    <div className="flex flex-col gap-10 items-center w-full px-4 sm:px-0">
      <div className="bg-[#1a1a1a] p-5 sm:p-8 rounded-2xl flex flex-col gap-6 items-center shadow-lg w-full max-w-sm sm:max-w-2xl">
        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex gap-4 flex-col sm:flex-row justify-center items-center w-full">
            <TypeDropdown
              value={primaryType}
              onChange={setPrimaryType}
              placeholder="Tipo 1"
            />

            <TypeDropdown
              value={secondaryType}
              onChange={setSecondaryType}
              placeholder="Tipo 2"
            />

            <button
              type="submit"
              disabled={isLoading}
              className="bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white px-5 py-2.5 rounded-lg disabled:opacity-50 cursor-pointer font-medium w-full sm:w-auto transition-colors"
            >
              Buscar
            </button>
          </div>
        </form>

        <label className="flex items-center gap-3 font-semibold text-gray-200">
          <Switch
            checked={isShinyEnabled}
            onCheckedChange={setIsShinyEnabled}
            className="cursor-pointer data-[state=checked]:bg-green-500 scale-120"
          />
          ✨ Shiny
        </label>
      </div>

      {hasError && (
        <p className="text-red-500 italic">
          No se encontraron Pokémon de ese tipo
        </p>
      )}
      {isLoading && <p>Loading...</p>}

      {pokemonList.length > 0 && (
        <ul className="grid grid-cols-2 sm:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-3 sm:gap-6 w-full px-1 sm:px-5 pb-5">
          {pokemonList.map((p) => (
            <li key={p.name} className="w-full flex">
              <PokemonCard
                {...p}
                isShiny={isShinyEnabled}
                onClick={() =>
                  onSelectPokemon({ ...p, isShiny: isShinyEnabled })
                }
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchByType;
