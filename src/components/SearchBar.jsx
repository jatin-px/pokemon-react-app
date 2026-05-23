const SearchBar = ({ value, onChange, onSearch }) => {
  const handleKey = (e) => {
    if (e.key === "Enter") onSearch();
  };

  return (
    <div className="flex gap-3 mb-12">
      <div className="relative flex-1">
        {/* Search icon */}
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none"
          style={{ color: "#4b5563" }}
          fill="none" stroke="currentColor" strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" strokeLinecap="round" />
        </svg>

        <input
          type="text"
          placeholder="Search by name or ID…"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKey}
          className="w-full pl-12 pr-4 py-4 rounded-2xl text-white text-sm
            outline-none transition-all duration-200
            placeholder-gray-600 border border-transparent
            focus:border-yellow-400/40"
          style={{
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(12px)",
            fontFamily: "'DM Mono', monospace",
          }}
        />
      </div>

      <button
        onClick={onSearch}
        className="relative overflow-hidden px-7 py-4 rounded-2xl font-black
          text-black text-sm tracking-wider uppercase
          transition-all duration-200 hover:scale-105 active:scale-95
          shadow-lg hover:shadow-yellow-400/30"
        style={{
          background: "linear-gradient(135deg, #facc15, #fbbf24)",
          fontFamily: "'Syne', sans-serif",
          letterSpacing: "0.08em",
        }}
      >
        {/* Shine effect */}
        <span
          className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
          style={{ background: "linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)" }}
        />
        Search
      </button>
    </div>
  );
};

export default SearchBar;