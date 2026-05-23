import { useEffect, useState } from "react";
import PokemonCard from "./components/PokemonCard";
import SearchBar from "./components/SearchBar";
import Loader from "./components/Loader";
import { fetchPokemonList } from "./services/pokemonApi";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [allPokemon, setAllPokemon] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const loadPokemon = async () => {
    setLoading(true);

    try {
      const data = await fetchPokemonList(50);

      setAllPokemon(data);
      setPokemon(data);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadPokemon();
  }, []);

  useEffect(() => {
    if (allPokemon.length > 0) {
      handleSearch();
    }
  }, [search, allPokemon]);

  const handleSearch = () => {
    const query = search.trim().toLowerCase();

    if (!query) {
      setPokemon(allPokemon);
      return;
    }

    const filtered = allPokemon.filter((poke) => {
      const name = poke.name.toLowerCase();
      const id = String(poke.id);
      const paddedId = id.padStart(3, "0");

      return (
        name.includes(query) || id.includes(query) || paddedId.includes(query)
      );
    });

    setPokemon(filtered);
  };

  return (
    <div
      className="min-h-screen text-white"
      style={{
        background: "#080d1a",
        fontFamily: "'DM Mono', monospace",
      }}
    >
      {/* Ambient background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div
          className="absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-[0.07]"
          style={{ background: "#ef4444", top: "-150px", left: "-150px" }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-[0.07]"
          style={{ background: "#3b82f6", bottom: "-100px", right: "-100px" }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full blur-[100px] opacity-[0.05]"
          style={{
            background: "#facc15",
            top: "40%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        />
      </div>

      {/* Dot grid texture */}
      <div
        className="fixed inset-0 opacity-[0.15] pointer-events-none z-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, #334155 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative z-10 px-6 py-12 max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-16">
          {/* Pokéball icon */}
          <div className="flex justify-center mb-6">
            <div className="relative w-14 h-14">
              <div className="absolute top-0 left-0 w-full h-1/2 bg-red-500 rounded-t-full border-[3px] border-gray-800" />
              <div className="absolute bottom-0 left-0 w-full h-1/2 bg-white rounded-b-full border-[3px] border-gray-800" />
              <div className="absolute top-1/2 left-0 w-full h-[3px] bg-gray-800 -translate-y-1/2" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white border-[3px] border-gray-800 rounded-full z-10" />
            </div>
          </div>

          <p
            className="text-xs font-bold tracking-[0.4em] uppercase text-yellow-400 mb-3"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            Gotta Catch &apos;Em All
          </p>

          <h1
            className="text-6xl sm:text-7xl font-black leading-none mb-4"
            style={{
              fontFamily: "'Syne', sans-serif",
              background: "linear-gradient(135deg, #ffffff 30%, #facc15 70%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Pokédex
          </h1>

          <p className="text-gray-500 text-sm max-w-sm mx-auto">
            Explore {pokemon.length > 0 ? "the" : "your"} collection — search by
            name or Pokémon ID
          </p>
        </header>

        {/* Search */}
        <div className="max-w-2xl mx-auto">
          <SearchBar
            value={search}
            onChange={setSearch}
            onSearch={handleSearch}
          />
        </div>

        {/* Results count */}
        {!loading && pokemon.length > 0 && (
          <p
            className="text-xs text-gray-600 tracking-widest uppercase mb-6 text-center"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            Showing {pokemon.length} Pokémon
          </p>
        )}

        {/* Grid or loader */}
        {loading ? (
          <Loader />
        ) : pokemon.length === 0 ? (
          <div className="text-center py-24 text-gray-600">
            <p className="text-5xl mb-4">?</p>
            <p className="text-sm tracking-widest uppercase">
              No Pokémon found
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pokemon.map((poke, i) => (
              <div
                key={poke.id}
                style={{
                  animation: "fadeSlideUp 0.4s ease both",
                  animationDelay: `${i * 55}ms`,
                }}
              >
                <PokemonCard pokemon={poke} />
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <footer className="text-center mt-20 text-gray-700 text-xs tracking-widest uppercase">
          Data from PokéAPI · Built with React
        </footer>
      </div>

      {/* Global keyframe + font injection */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Mono:wght@400;500&display=swap');

        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default App;
