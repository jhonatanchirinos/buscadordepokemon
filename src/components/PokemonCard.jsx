const PokemonCard = ({ name, image, imageShiny, isShiny }) => {
  return (
    <div className="group flex flex-col items-center p-3 sm:p-4 bg-[#1e1e1e] border border-gray-700/50 rounded-2xl shadow-sm hover:shadow-xl hover:border-blue-500/50 transition-all duration-300 transform hover:-translate-y-1 h-full cursor-pointer">
      <div className="w-full aspect-square flex items-center justify-center bg-gray-300 rounded-xl mb-3 overflow-hidden">
        <img
          src={isShiny ? imageShiny : image}
          alt={name}
          className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-110 p-2 sm:p-3"
        />
      </div>
      <p className="text-sm sm:text-base lg:text-lg font-bold uppercase tracking-wider text-gray-200 mt-auto text-center">
        {name}
      </p>
    </div>
  );
};

export default PokemonCard;
