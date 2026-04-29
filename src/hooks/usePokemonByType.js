import { useState } from "react";
import { fetchPokemonByType } from "@/services/pokemonApi";

export const usePokemonByType = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const search = async (primaryType, secondaryType) => {
    if (!primaryType.trim()) return;
    try {
      setIsLoading(true);
      setHasError(false);
      const data = await fetchPokemonByType(primaryType, secondaryType);
      setPokemonList(data);
    } catch {
      setHasError(true);
      setPokemonList([]);
    } finally {
      setIsLoading(false);
    }
  };

  return { pokemonList, isLoading, hasError, search };
};
