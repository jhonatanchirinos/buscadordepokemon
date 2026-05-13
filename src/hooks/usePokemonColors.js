import { TYPE_COLORS } from "@/constants/pokemonTypes";

export const usePokemonColors = (types) => {
  const primaryType = types?.[0] || "normal";
  const bgColor = TYPE_COLORS[primaryType] || "#1e1e1e";
  const imgBgColor = "#f3f4f6"; // Equivalente a bg-gray-100 de Tailwind

  return { bgColor, imgBgColor };
};
