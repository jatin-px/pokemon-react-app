const BASE_URL = "https://pokeapi.co/api/v2";

// NEW: Paginated fetch function that React Query will use
export const fetchPokemonPage = async ({ pageParam = 0 }) => {
  const limit = 20; // Load 20 at a time
  const res = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${pageParam}`);
  const data = await res.json();

  const detailedPokemon = await Promise.all(
    data.results.map(async (pokemon) => {
      const response = await fetch(pokemon.url);
      return response.json();
    })
  );

  // Return the data PLUS the math for the next page
  return {
    results: detailedPokemon,
    nextOffset: data.next ? pageParam + limit : undefined,
  };
};

// Existing search function remains unchanged
export const searchPokemon = async (name) => {
  try {
    const res = await fetch(`${BASE_URL}/pokemon/${name.toLowerCase()}`);
    if (!res.ok) throw new Error("Pokemon not found");
    return await res.json();
  } catch (error) {
    throw error;
  }
};