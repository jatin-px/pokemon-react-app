const Loader = () => {
  return (
    <div className="flex flex-col justify-center items-center py-24 gap-6">
      {/* Pokéball spinner */}
      <div className="relative w-20 h-20 animate-spin" style={{ animationDuration: "1.2s" }}>
        {/* Top half */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-red-500 rounded-t-full border-4 border-gray-900" />
        {/* Bottom half */}
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-white rounded-b-full border-4 border-gray-900" />
        {/* Middle band */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-900 -translate-y-1/2" />
        {/* Center button */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-white border-4 border-gray-900 rounded-full z-10" />
      </div>
      <p
        className="text-sm font-semibold tracking-[0.3em] uppercase"
        style={{ color: "#a0aec0", fontFamily: "'DM Mono', monospace" }}
      >
        Catching Pokémon...
      </p>
    </div>
  );
};

export default Loader;