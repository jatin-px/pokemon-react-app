import { typeColors, typeSolid } from "../utils/typeColors";
import { Link } from "react-router-dom";

const PokemonCard = ({ pokemon }) => {
  const mainType = pokemon.types[0].type.name;
  const gradient = typeColors[mainType] || "from-gray-500 to-gray-700";
  const solid = typeSolid[mainType] || "#718096";

  const statMax = { hp: 255, attack: 190, defense: 230, speed: 200 };
  const keyStats = pokemon.stats.slice(0, 4);

  // NEW: Function to play the audio
  const playCry = (e) => {
    e.stopPropagation();
    if (pokemon.cries && pokemon.cries.latest) {
      const audio = new Audio(pokemon.cries.latest);
      audio.volume = 0.5;
      audio.play();
    }
  };

  return (
    <Link
      to={`/pokemon/${pokemon.name}`}
      className="relative rounded-3xl overflow-hidden shadow-2xl block
        transform transition-all duration-500 hover:scale-[1.03] hover:-translate-y-1
        group"
      style={{ background: "linear-gradient(145deg, #1a1f35, #111827)", textDecoration: "none" }}
    >
      <div className={`h-1.5 w-full bg-gradient-to-r ${gradient}`} />

      <div
        className="absolute -top-8 -right-8 w-40 h-40 rounded-full opacity-[0.06] border-[14px] pointer-events-none"
        style={{ borderColor: solid }}
      />
      <div
        className="absolute -top-8 -right-8 w-40 h-40 rounded-full opacity-[0.04] pointer-events-none"
        style={{ background: solid }}
      />

      <div className="p-5">
        <div className="flex justify-between items-start mb-1 gap-2">
          <div className="min-w-0">
            {/* NEW: The ID and the Play Button are now grouped together here */}
            <div className="flex items-center gap-2 mb-0.5">
              <p
                className="text-xs font-bold tracking-[0.2em] uppercase"
                style={{ color: solid, fontFamily: "'DM Mono', monospace" }}
              >
                #{String(pokemon.id).padStart(3, "0")}
              </p>
              <button 
                onClick={playCry}
                className="opacity-50 hover:opacity-100 transition-opacity cursor-pointer"
                title="Play Cry"
                style={{ color: solid }}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zM18.584 5.106a.75.75 0 011.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 11-1.06-1.06 8.25 8.25 0 000-11.668.75.75 0 010-1.06z"/>
                  <path d="M15.932 7.757a.75.75 0 011.061 0 6 6 0 010 8.486.75.75 0 01-1.06-1.061 4.5 4.5 0 000-6.364.75.75 0 010-1.06z"/>
                </svg>
              </button>
            </div>
            <h2
              className="text-2xl font-black capitalize text-white leading-tight"
              style={{
                fontFamily: "'Syne', sans-serif",
                letterSpacing: "-0.01em",
              }}
            >
              {pokemon.name}
            </h2>
          </div>

          <div className="flex flex-col gap-1.5 items-end shrink-0">
            {pokemon.types.map((typeObj) => (
              <span
                key={typeObj.type.name}
                className="px-3 py-0.5 rounded-full text-xs font-bold capitalize text-white"
                style={{
                  background: typeSolid[typeObj.type.name] || "#718096",
                  fontFamily: "'DM Mono', monospace",
                  letterSpacing: "0.08em",
                }}
              >
                {typeObj.type.name}
              </span>
            ))}
          </div>
        </div>

        <div
          className="relative flex justify-center items-center my-3 rounded-2xl py-2"
          style={{ background: "rgba(255,255,255,0.03)" }}
        >
          <div
            className="absolute w-36 h-36 rounded-full blur-2xl opacity-30 pointer-events-none"
            style={{ background: solid }}
          />
          <img
            src={
              pokemon.sprites.other["official-artwork"].front_default ||
              pokemon.sprites.front_default
            }
            alt={pokemon.name}
            className="pokemon-img relative w-44 h-44 object-contain drop-shadow-2xl
              group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
        </div>

        <div
          className="flex justify-around text-center py-3 mb-4 rounded-2xl"
          style={{ background: "rgba(255,255,255,0.04)" }}
        >
          <div className="min-w-0 flex-1 px-1">
            <p
              className="text-xs text-gray-500 uppercase tracking-widest mb-0.5"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              Height
            </p>
            <p className="text-white font-bold text-sm">
              {(pokemon.height / 10).toFixed(1)}m
            </p>
          </div>
          <div className="w-px bg-white/10 self-stretch" />
          <div className="min-w-0 flex-1 px-1">
            <p
              className="text-xs text-gray-500 uppercase tracking-widest mb-0.5"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              Weight
            </p>
            <p className="text-white font-bold text-sm">
              {(pokemon.weight / 10).toFixed(1)}kg
            </p>
          </div>
          <div className="w-px bg-white/10 self-stretch" />
          <div className="min-w-0 flex-1 px-1">
            <p
              className="text-xs text-gray-500 uppercase tracking-widest mb-0.5"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              Abilities
            </p>
            <p className="text-white font-bold text-sm capitalize truncate">
              {pokemon.abilities[0].ability.name}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          {keyStats.map((statObj) => {
            const name = statObj.stat.name
              .replace("special-attack", "sp.atk")
              .replace("special-defense", "sp.def");
            const val = statObj.base_stat;
            const max = statMax[statObj.stat.name] || 255;
            const pct = Math.round((val / max) * 100);
            return (
              <div key={statObj.stat.name} className="flex items-center gap-3">
                <span
                  className="w-14 text-right text-xs font-bold capitalize text-gray-500 shrink-0"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  {name}
                </span>
                <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${pct}%`,
                      background: `linear-gradient(90deg, ${solid}99, ${solid})`,
                    }}
                  />
                </div>
                <span
                  className="w-8 text-xs font-bold text-gray-400 shrink-0 text-right"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  {val}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </Link>
  );
};

export default PokemonCard;