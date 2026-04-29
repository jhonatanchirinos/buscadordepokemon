import { useState } from "react";
import { fetchPokemonByName } from "@/services/pokemonApi";

export const usePokemonByName = () => {
  const [pokemon, setPokemon] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const search = async (name) => {
    if (!name.trim()) return;
    try {
      setIsLoading(true);
      setHasError(false);
      const data = await fetchPokemonByName(name);
      setPokemon(data);
    } catch {
      setHasError(true);
      setPokemon(null);
    } finally {
      setIsLoading(false);
    }
  };

  return { pokemon, isLoading, hasError, search };
};
