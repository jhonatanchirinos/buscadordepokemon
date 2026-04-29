const PokemonCard = ({ name, image, imageShiny, isShiny }) => {
  return (
    <div className="group flex flex-col items-center p-2 rounded-xl cursor-pointer">
      <p className="text-lg font-semibold uppercase text-center">{name}</p>
      <img
        src={isShiny ? imageShiny : image}
        alt={name}
        className="w-full h-auto transition-transform duration-300 group-hover:scale-110 p-3 "
      />
    </div>
  );
};

export default PokemonCard;
