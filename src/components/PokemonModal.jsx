const PokemonModal = ({ pokemon, isShiny, onClose }) => {
  if (!pokemon) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="flex flex-col items-center rounded-2xl bg-[#1e1e1e] border border-gray-700/50 shadow-2xl p-6 sm:p-8 w-[85vw] sm:w-auto sm:min-w-80 sm:max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full aspect-square flex items-center justify-center bg-slate-400 rounded-xl overflow-hidden mb-6 relative">
          <img
            src={isShiny ? pokemon.imageShiny : pokemon.image}
            alt={pokemon.name}
            className="w-full h-auto object-contain p-4 drop-shadow-lg"
            style={{ filter: "url(#outline)" }}
          />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-wider text-gray-200 text-center">
          {pokemon.name}
        </h2>
      </div>
    </div>
  );
};

export default PokemonModal;
