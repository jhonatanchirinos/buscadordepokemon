import { usePokemonColors } from "@/hooks/usePokemonColors";

const PokemonCard = ({ name, image, imageShiny, isShiny, types }) => {
  const { bgColor, imgBgColor } = usePokemonColors(types);

  return (
    <div
      className="group flex flex-col items-center p-3 sm:p-4 border-3 border-gray-700/50 rounded-2xl shadow-sm hover:shadow-xl  transition-all duration-300 transform hover:-translate-y-1 h-full cursor-pointer"
      style={{ backgroundColor: bgColor }}
    >
      <div
        className="w-full aspect-square flex items-center justify-center rounded-xl mb-3 overflow-hidden border-2 border-gray-700/50"
        style={{ backgroundColor: imgBgColor }}
      >
        <img
          src={isShiny ? imageShiny : image}
          alt={name}
          className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-110 p-2 sm:p-3"
          style={{ filter: "url(#outline)" }}
        />
      </div>
      <p className="text-sm sm:text-base lg:text-lg font-bold uppercase tracking-wider text-white mt-auto text-center [text-shadow:1px_1px_0_#000,-1px_-1px_0_#000,1px_-1px_0_#000,-1px_1px_0_#000,0_2px_4px_#000]">
        {name}
      </p>
    </div>
  );
};
export default PokemonCard;
