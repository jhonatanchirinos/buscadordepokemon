import { usePokemonColors } from "@/hooks/usePokemonColors";

const PokemonModal = ({ pokemon, isShiny, onClose }) => {
  if (!pokemon) return null;

  const { bgColor, imgBgColor } = usePokemonColors(pokemon.types);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="flex flex-col items-center rounded-2xl border-3 border-gray-700/50 shadow-2xl p-6 sm:p-8 w-[85vw] sm:w-auto sm:min-w-80 sm:max-w-md transition-colors duration-300"
        style={{ backgroundColor: bgColor }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="w-full aspect-square flex flex-row rounded-xl overflow-hidden mb-6 border-2 border-gray-700/50"
          style={{ backgroundColor: imgBgColor }}
        >
          <div className="flex-1 flex items-center justify-center p-0 sm:p-1 ml-10 sm:ml-2">
            <img
              src={isShiny ? pokemon.imageShiny : pokemon.image}
              alt={pokemon.name}
              className="w-full h-full object-contain drop-shadow-lg select-none"
              style={{ filter: "url(#outline)" }}
              draggable="false"
            />
          </div>
          <div className="w-10 sm:w-12 flex flex-col items-center pt-3 gap-1 ">
            {pokemon.types?.map((type) => (
              <img
                key={type}
                src={`/type-icons/${type}.svg`}
                alt={type}
                className="w-6 h-6 sm:w-8 sm:h-8 drop-shadow-md select-none"
                title={type}
                draggable="false"
              />
            ))}
          </div>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-wider text-white text-center [text-shadow:2px_2px_0_#000,-2px_-2px_0_#000,2px_-2px_0_#000,-2px_2px_0_#000,0_4px_8px_#000]">
          {pokemon.name}
        </h2>
      </div>
    </div>
  );
};

export default PokemonModal;
