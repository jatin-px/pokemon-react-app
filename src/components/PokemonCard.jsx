import { typeColors, typeSolid } from "../utils/typeColors";

const PokemonCard = ({ pokemon }) => {
  const mainType = pokemon.types[0].type.name;
  const gradient = typeColors[mainType] || "from-gray-500 to-gray-700";
  const solid = typeSolid[mainType] || "#718096";

  const statMax = { hp: 255, attack: 190, defense: 230, speed: 200 };
  const keyStats = pokemon.stats.slice(0, 4);

  return (
    <div
      className="relative rounded-3xl overflow-hidden shadow-2xl
        transform transition-all duration-500 hover:scale-[1.03] hover:-translate-y-1
        cursor-pointer group"
      style={{ background: "linear-gradient(145deg, #1a1f35, #111827)" }}
    >
      {/* Gradient accent top strip */}
      <div className={`h-1.5 w-full bg-gradient-to-r ${gradient}`} />

      {/* Pokéball watermark */}
      <div
        className="absolute -top-8 -right-8 w-40 h-40 rounded-full opacity-[0.06] border-[14px] pointer-events-none"
        style={{ borderColor: solid }}
      />
      <div
        className="absolute -top-8 -right-8 w-40 h-40 rounded-full opacity-[0.04] pointer-events-none"
        style={{ background: solid }}
      />

      <div className="p-5">
        {/* Header row */}
        <div className="flex justify-between items-start mb-1 gap-2">
          <div className="min-w-0">
            <p
              className="text-xs font-bold tracking-[0.2em] uppercase mb-0.5"
              style={{ color: solid, fontFamily: "'DM Mono', monospace" }}
            >
              #{String(pokemon.id).padStart(3, "0")}
            </p>
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

          {/* Type badges */}
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

        {/* Pokémon image */}
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

        {/* Info row */}
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

        {/* Stat bars */}
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
    </div>
  );
};

export default PokemonCard;
