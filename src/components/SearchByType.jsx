import { useState } from "react";
import { usePokemonByType } from "../hooks/usePokemonByType";
import PokemonCard from "./PokemonCard";
import { Switch } from "@/components/ui/switch";
import { POKEMON_TYPES } from "@/constants/pokemonTypes";

const TypeDropdown = ({ value, onChange, placeholder, disabledValue }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedType = POKEMON_TYPES.find((t) => t.value === value);

  return (
    <div
      className="relative w-52"
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setIsOpen(false);
      }}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full border-2 rounded-lg px-4 py-2 shadow-sm bg-[#1A1A1A] border-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-slate-400"
      >
        {selectedType ? (
          <div className="flex items-center gap-2">
            <img
              src={`/type-icons/${selectedType.value}.svg`}
              alt={selectedType.label}
              className="w-6 h-6 object-contain"
            />
            <span className="text-base">{selectedType.label}</span>
          </div>
        ) : (
          <span className="text-gray-400">{placeholder}</span>
        )}
        <span className="text-xs text-gray-500">{isOpen ? "▲" : "▼"}</span>
      </button>

      {isOpen && (
        <ul className="absolute z-10 w-full mt-1 bg-[#1A1A1A] border border-slate-700 rounded-lg shadow-lg max-h-60 overflow-y-auto custom-scrollbar">
          <li
            className="px-4 py-2 hover:bg-slate-800 cursor-pointer text-gray-400"
            onMouseDown={(e) => {
              e.preventDefault();
              onChange("");
              setIsOpen(false);
            }}
          >
            {placeholder}
          </li>
          {POKEMON_TYPES.map((t) => {
            const isDisabled = t.value === disabledValue;
            return (
              <li
                key={t.value}
                onMouseDown={(e) => {
                  e.preventDefault();
                  if (!isDisabled) {
                    onChange(t.value);
                    setIsOpen(false);
                  }
                }}
                className={`flex items-center gap-2 px-4 py-2 ${
                  isDisabled
                    ? "opacity-30 cursor-not-allowed"
                    : "hover:bg-slate-800 cursor-pointer"
                }`}
              >
                <img
                  src={`/type-icons/${t.value}.svg`}
                  alt={t.label}
                  className="w-6 h-6 object-contain"
                />
                <span className="text-base">{t.label}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

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
          <TypeDropdown
            value={primaryType}
            onChange={setPrimaryType}
            placeholder="Tipo 1"
            disabledValue={secondaryType}
          />

          <TypeDropdown
            value={secondaryType}
            onChange={setSecondaryType}
            placeholder="Tipo 2"
            disabledValue={primaryType}
          />

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
