import { TYPE_COLORS } from "@/constants/pokemonTypes";

const PokemonCard = ({ name, image, imageShiny, isShiny, types }) => {
  const primaryType = types?.[0] || "normal";
  const bgColor = TYPE_COLORS[primaryType] || "#5061E1";

  return (
    <div 
      className="group flex flex-col items-center p-3 sm:p-4 border border-gray-700/50 rounded-2xl shadow-sm hover:shadow-xl hover:border-blue-500/50 transition-all duration-300 transform hover:-translate-y-1 h-full cursor-pointer"
      style={{ backgroundColor: bgColor }}
    >
      <div className="w-full aspect-square flex items-center justify-center bg-gray-100 rounded-xl mb-3 overflow-hidden">
        <img
          src={isShiny ? imageShiny : image}
          alt={name}
          className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-110 p-2 sm:p-3"
          style={{ filter: "url(#outline)" }}
        />
      </div>
      <p className="text-sm sm:text-base lg:text-lg font-bold uppercase tracking-wider text-white mt-auto text-center">
        {name}
      </p>
    </div>
  );
};
export default PokemonCard;
