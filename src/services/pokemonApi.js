const BASE_URL = "https://pokeapi.co/api/v2";

export const fetchPokemonList = async (limit = 20) => {
  const res = await fetch(`${BASE_URL}/pokemon?limit=${limit}`);
  const data = await res.json();

  const detailedPokemon = await Promise.all(
    data.results.map(async (pokemon) => {
      const response = await fetch(pokemon.url);
      return response.json();
    })
  );

  return detailedPokemon;
};

export const searchPokemon = async (name) => {
  try {
    const res = await fetch(`${BASE_URL}/pokemon/${name.toLowerCase()}`);

    if (!res.ok) {
      throw new Error("Pokemon not found");
    }

    return await res.json();
  } catch (error) {
    throw error;
  }
};