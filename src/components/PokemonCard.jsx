import { usePokemonColors } from "@/hooks/usePokemonColors";

const PokemonCard = ({ name, image, imageShiny, isShiny, types }) => {
  const { bgColor, imgBgColor } = usePokemonColors(types);

  return (
    <div
      className="group flex flex-col items-center p-3 sm:p-4 border-3 border-gray-700/50 rounded-2xl shadow-sm hover:shadow-xl  transition-all duration-300 transform hover:-translate-y-1 h-full cursor-pointer"
      style={{ backgroundColor: bgColor }}
    >
      <div
        className="w-full aspect-square flex flex-row rounded-xl mb-3 overflow-hidden border-2 border-gray-700/50"
        style={{ backgroundColor: imgBgColor }}
      >
        <div className="flex-1 flex items-center justify-center p-0 sm:p-1 ml-2 sm:ml-2">
          <img
            src={isShiny ? imageShiny : image}
            alt={name}
            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
            style={{ filter: "url(#outline)" }}
          />
        </div>
        <div className="w-6 sm:w-8 flex flex-col items-center pt-1.5 sm:pt-2 gap-1">
          {types?.map((type) => (
            <img
              key={type}
              src={`/type-icons/${type}.svg`}
              alt={type}
              className="w-4 h-4 sm:w-5 sm:h-6 drop-shadow-md"
              title={type}
            />
          ))}
        </div>
      </div>
      <p className="text-sm sm:text-base lg:text-lg font-bold uppercase tracking-wider text-white mt-auto text-center [text-shadow:1px_1px_0_#000,-1px_-1px_0_#000,1px_-1px_0_#000,-1px_1px_0_#000,0_2px_4px_#000]">
        {name}
      </p>
    </div>
  );
};
export default PokemonCard;
