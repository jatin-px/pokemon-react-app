import PokemonCard from "./PokemonCard";

const PokemonGrid = ({ pokemon }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {pokemon.map((poke, i) => (
        <div
          key={poke.id}
          className="animate-fade-in-up"
          style={{ animationDelay: `${i * 60}ms`, animationFillMode: "both" }}
        >
          <PokemonCard pokemon={poke} />
        </div>
      ))}
    </div>
  );
};

export default PokemonGrid;