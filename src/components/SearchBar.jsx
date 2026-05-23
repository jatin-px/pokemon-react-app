const SearchBar = ({ value, onChange }) => {
  return (
    <div className="relative w-full mb-12">
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
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="none"
        spellCheck="false"
        className="w-full pl-12 pr-10 py-4 rounded-2xl text-white text-sm
          outline-none transition-all duration-200
          placeholder-gray-600 border border-transparent
          focus:border-yellow-400/40"
        style={{
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(12px)",
          fontFamily: "'DM Mono', monospace",
        }}
      />

      {/* Clear × — only when there's text */}
      {value && (
        <button
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 -translate-y-1/2
            w-7 h-7 flex items-center justify-center rounded-full
            transition-all duration-150 hover:bg-white/10 active:scale-90"
          style={{ color: "#6b7280" }}
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default SearchBar;