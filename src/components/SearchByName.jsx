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
    <div className="flex flex-col gap-10 items-center w-full px-4 sm:px-0">
      <div className="bg-[#1a1a1a] p-5 sm:p-8 rounded-2xl flex flex-col gap-6 items-center shadow-lg w-full max-w-sm sm:max-w-md">
        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex gap-4 flex-col sm:flex-row justify-center items-center w-full">
            <div className="relative w-full sm:w-52 rounded-lg">
              <input
                id="searchName"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder=" "
                autoComplete="off"
                className="peer border-2 rounded-lg px-4 py-3 text-base bg-transparent border-slate-700 focus:outline-none shadow-sm w-full relative z-10 [&:-webkit-autofill]:[-webkit-box-shadow:0_0_0px_1000px_#1a1a1a_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:white]"
              />
              <label
                htmlFor="searchName"
                className={`absolute left-3 px-1 transition-all duration-200 pointer-events-none z-20 ${
                  nameInput
                    ? "top-0 -translate-y-1/2 text-base text-gray-400 bg-[#1a1a1a]"
                    : "top-1/2 -translate-y-1/2 text-base text-gray-400 bg-transparent"
                } peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-base peer-focus:bg-[#1a1a1a]`}
              >
                Nombre del Pokémon
              </label>
            </div>
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
          No se encontró ningún Pokémon con ese nombre
        </p>
      )}
      {isLoading && <p>Loading...</p>}

      {pokemon && (
        <div className="w-50 sm:w-60">
          <PokemonCard
            name={pokemon.name}
            image={pokemon.sprites.other["home"].front_default}
            imageShiny={pokemon.sprites.other["home"].front_shiny}
            isShiny={isShinyEnabled}
            types={pokemon.types.map((t) => t.type.name)}
            onClick={handleSelect}
          />
        </div>
      )}
    </div>
  );
}

export default SearchByName;
