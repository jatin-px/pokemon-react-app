import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { searchPokemon } from "../services/pokemonApi";
import { typeSolid } from "../utils/typeColors";
import Loader from "./Loader";

const PokemonDetails = () => {
  const { name } = useParams();

  const { data: pokemon, isLoading, isError } = useQuery({
    queryKey: ["pokemon", name],
    queryFn: () => searchPokemon(name),
  });

  if (isLoading) return <div className="page-content min-h-screen flex items-center justify-center"><Loader /></div>;
  if (isError || !pokemon) return <div className="page-content text-center mt-20 text-xl text-white">Pokémon not found.</div>;

  const mainType = pokemon.types[0].type.name;
  const solid = typeSolid[mainType] || "#718096";

  // Maximum values for all 6 stats to calculate the progress bar widths
  const statMax = { hp: 255, attack: 190, defense: 230, "special-attack": 194, "special-defense": 230, speed: 200 };

  return (
    <div className="page-content max-w-4xl mx-auto min-h-screen pb-20">
      <Link 
        to="/" 
        className="inline-flex items-center gap-2 mb-8 text-gray-400 hover:text-white transition-colors"
        style={{ fontFamily: "'DM Mono', monospace" }}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Pokédex
      </Link>

      <div className="text-center mb-10 md:mb-12">
        <p className="text-lg md:text-xl font-bold tracking-[0.2em] mb-2" style={{ color: solid, fontFamily: "'DM Mono', monospace" }}>
          #{String(pokemon.id).padStart(3, "0")}
        </p>
        
        {/* Adjusted clamp to 2rem to ensure it fits mobile screens without needing word-break */}
        <h1 
          className="font-black capitalize text-white mb-6" 
          style={{ 
            fontFamily: "'Syne', sans-serif",
            fontSize: "clamp(2rem, 10vw, 4.5rem)",
            lineHeight: 1.1,
          }}
        >
          {pokemon.name.replace("-", " ")}
        </h1>
        
        <div className="flex flex-wrap justify-center gap-3 px-2">
          {pokemon.types.map((typeObj) => (
            <span
              key={typeObj.type.name}
              className="px-5 py-1.5 md:px-6 md:py-2 rounded-full text-xs md:text-sm font-bold capitalize text-white shadow-lg"
              style={{ background: typeSolid[typeObj.type.name] || "#718096", fontFamily: "'DM Mono', monospace", letterSpacing: "0.1em" }}
            >
              {typeObj.type.name}
            </span>
          ))}
        </div>
      </div>

      <div className="relative flex justify-center items-center py-8 md:py-10 mb-12 rounded-3xl mx-2 sm:mx-0" style={{ background: "rgba(255,255,255,0.03)" }}>
        <div className="absolute w-52 h-52 sm:w-64 sm:h-64 md:w-96 md:h-96 rounded-full blur-3xl opacity-30 pointer-events-none" style={{ background: solid }} />
        <img
          src={pokemon.sprites.other["official-artwork"].front_default || pokemon.sprites.front_default}
          alt={pokemon.name}
          className="relative w-52 h-52 sm:w-64 sm:h-64 md:w-96 md:h-96 object-contain drop-shadow-2xl animate-pulse-slow"
        />
      </div>

      {/* ── NEW: Detailed Info Section ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
        
        {/* Left Column: Physical & Abilities */}
        <div className="flex flex-col gap-6">
          <h3 className="text-xl font-bold border-b border-white/10 pb-2" style={{ fontFamily: "'Syne', sans-serif" }}>
            Training Info
          </h3>

          <div className="flex justify-around text-center py-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)" }}>
            <div className="flex-1 px-2">
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-1" style={{ fontFamily: "'DM Mono', monospace" }}>Height</p>
              <p className="text-white font-bold text-lg">{(pokemon.height / 10).toFixed(1)}m</p>
            </div>
            <div className="w-px bg-white/10 self-stretch" />
            <div className="flex-1 px-2">
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-1" style={{ fontFamily: "'DM Mono', monospace" }}>Weight</p>
              <p className="text-white font-bold text-lg">{(pokemon.weight / 10).toFixed(1)}kg</p>
            </div>
          </div>

          <div className="py-5 px-6 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)" }}>
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-4" style={{ fontFamily: "'DM Mono', monospace" }}>Abilities</p>
            <div className="flex flex-wrap gap-3">
              {pokemon.abilities.map((abilityObj) => (
                <span 
                  key={abilityObj.ability.name} 
                  className="capitalize text-white font-bold bg-white/5 px-4 py-2 rounded-xl text-sm border border-white/5"
                >
                  {abilityObj.ability.name.replace("-", " ")}
                  {abilityObj.is_hidden && <span className="ml-2 text-xs text-gray-400 font-normal">(Hidden)</span>}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Base Stats */}
        <div className="flex flex-col gap-6">
          <h3 className="text-xl font-bold border-b border-white/10 pb-2" style={{ fontFamily: "'Syne', sans-serif" }}>
            Base Stats
          </h3>

          <div className="py-5 px-6 rounded-2xl flex flex-col gap-4" style={{ background: "rgba(255,255,255,0.04)" }}>
            {pokemon.stats.map((statObj) => {
              const name = statObj.stat.name.replace("special-attack", "sp.atk").replace("special-defense", "sp.def");
              const val = statObj.base_stat;
              const max = statMax[statObj.stat.name] || 255;
              const pct = Math.round((val / max) * 100);

              return (
                <div key={statObj.stat.name} className="flex items-center gap-4">
                  <span 
                    className="w-14 text-right text-xs font-bold capitalize text-gray-500 shrink-0" 
                    style={{ fontFamily: "'DM Mono', monospace" }}
                  >
                    {name}
                  </span>
                  <div className="flex-1 h-2.5 rounded-full bg-white/5 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: `${pct}%`,
                        background: `linear-gradient(90deg, ${solid}99, ${solid})`,
                      }}
                    />
                  </div>
                  <span 
                    className="w-8 text-sm font-bold text-gray-300 shrink-0 text-right" 
                    style={{ fontFamily: "'DM Mono', monospace" }}
                  >
                    {val}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default PokemonDetails;