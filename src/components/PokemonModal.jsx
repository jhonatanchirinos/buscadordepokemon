const PokemonModal = ({ pokemon, isShiny, onClose }) => {
  if (!pokemon) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/60"
      onClick={onClose}
    >
      <div
        className="flex flex-col items-center gap-4 rounded-xl bg-gray-800 p-6 sm:p-10 w-[80vw] sm:w-auto sm:min-w-64 sm:max-w-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold uppercase text-center">
          {pokemon.name}
        </h2>
        <img
          src={isShiny ? pokemon.imageShiny : pokemon.image}
          alt={pokemon.name}
          className="w-full h-auto"
        />
      </div>
    </div>
  );
};

export default PokemonModal;
