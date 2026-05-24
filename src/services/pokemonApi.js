const BASE_URL = "https://pokeapi.co/api/v2";

// 1. Fetches a lightweight text list of ALL Pokémon names and URLs
export const fetchMasterRoster = async () => {
  const res = await fetch(`${BASE_URL}/pokemon?limit=10000`);
  const data = await res.json();
  return data.results;
};

// 2. Fetches a lightweight text list of Pokémon belonging to a specific type
export const fetchTypeRoster = async (type) => {
  if (!type) return null;
  const res = await fetch(`${BASE_URL}/type/${type}`);
  const data = await res.json();
  return data.pokemon.map((p) => p.pokemon);
};

// 3. Fetches the heavy details (images, stats) for a specific slice of 20 Pokémon
export const fetchPokemonBatch = async (pokemonArray) => {
  const detailedPokemon = await Promise.all(
    pokemonArray.map(async (pokemon) => {
      const response = await fetch(pokemon.url);
      return response.json();
    })
  );
  return detailedPokemon;
};

// 4. Fetches a single Pokémon's full details (Used by the PokemonDetails page)
export const searchPokemon = async (name) => {
  try {
    const res = await fetch(`${BASE_URL}/pokemon/${name.toLowerCase()}`);
    if (!res.ok) throw new Error("Pokemon not found");
    return await res.json();
  } catch (error) {
    throw error;
  }
};