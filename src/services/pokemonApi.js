const BASE_URL = "https://pokeapi.co/api/v2";

export const fetchPokemonByName = async (name, signal) => {
  const res = await fetch(`${BASE_URL}/pokemon/${name.trim().toLowerCase()}`, {
    signal,
  });
  if (!res.ok) throw new Error("Pokémon no encontrado");
  return res.json();
};

export const fetchPokemonByType = async (primaryType, secondaryType) => {
  const res = await fetch(
    `${BASE_URL}/type/${primaryType.trim().toLowerCase()}`,
  );
  if (!res.ok) throw Error(`Pokémon de tipo ${primaryType} no encontrado`);

  const data = await res.json();
  const list = data.pokemon;

  const detailed = await Promise.all(
    list.map(async (p) => {
      const res = await fetch(p.pokemon.url);
      const data = await res.json();

      return {
        name: data.name,
        image:
          data.sprites.other["home"].front_default ??
          data.sprites.front_default,
        imageShiny: data.sprites.other["home"].front_shiny,
        types: data.types.map((t) => t.type.name),
      };
    }),
  );

  const primary = primaryType.trim().toLowerCase();
  const secondary = secondaryType.trim().toLowerCase();

  return secondary
    ? detailed.filter(
        (p) => p.types.includes(primary) && p.types.includes(secondary),
      )
    : detailed.filter((p) => p.types.includes(primary));
};
