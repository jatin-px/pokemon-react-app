import { useEffect, useState, useRef } from "react";
import PokemonCard from "./components/PokemonCard";
import PokemonGrid from "./components/PokemonGrid";
import SearchBar from "./components/SearchBar";
import Loader from "./components/Loader";
import { fetchPokemonList, searchPokemon } from "./services/pokemonApi";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const debounceRef = useRef(null);
  const defaultListRef = useRef([]);

  const loadPokemon = async () => {
    setLoading(true);
    setNotFound(false);
    try {
      const data = await fetchPokemonList(151);
      defaultListRef.current = data;
      setPokemon(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadPokemon();
    return () => clearTimeout(debounceRef.current);
  }, []);

  const runSearch = async (query) => {
    const q = query.trim().toLowerCase();

    if (!q) {
      setPokemon(defaultListRef.current);
      setNotFound(false);
      return;
    }

    const filtered = defaultListRef.current.filter(
      (poke) =>
        poke.name.toLowerCase().includes(q) || String(poke.id).includes(q),
    );

    setPokemon(filtered);
    setNotFound(filtered.length === 0);
  };

  const handleChange = (val) => {
    setSearch(val);
    clearTimeout(debounceRef.current);
    if (!val.trim()) {
      setNotFound(false);
      setPokemon(defaultListRef.current);
      return;
    }
    const handleChange = (val) => {
      setSearch(val);
      runSearch(val);
    };
    debounceRef.current = setTimeout(() => runSearch(val), 500);
  };

  return (
    <>
      {/*
        Font link in <head> is the correct way — avoids @import-in-style-tag
        timing issues in production. Add this to your index.html <head>:
        <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
        The style block below also loads it as a fallback.
      */}
      <div className="app-root min-h-screen text-white">
        {/* ── Ambient blobs ── */}
        <div
          className="fixed inset-0 overflow-hidden pointer-events-none z-0"
          aria-hidden="true"
        >
          <div className="blob blob-red" />
          <div className="blob blob-blue" />
          <div className="blob blob-yellow" />
        </div>

        {/* ── Dot grid ── */}
        <div
          className="dot-grid fixed inset-0 pointer-events-none z-0"
          aria-hidden="true"
        />

        {/* ── Page content ── */}
        <div className="page-content relative z-10 max-w-6xl mx-auto">
          {/* ── Header ── */}
          <header className="header-section text-center">
            {/* Pokéball icon */}
            <div className="pokeball-wrap flex justify-center">
              <div className="pokeball-icon relative">
                <div className="absolute top-0 left-0 w-full h-1/2 bg-red-500 rounded-t-full border-[3px] border-gray-800" />
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-white rounded-b-full border-[3px] border-gray-800" />
                <div className="absolute top-1/2 left-0 w-full h-[3px] bg-gray-800 -translate-y-1/2" />
                <div className="pokeball-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border-[3px] border-gray-800 rounded-full z-10" />
              </div>
            </div>

            <p
              className="eyebrow font-bold uppercase text-yellow-400"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              Gotta Catch &apos;Em All
            </p>

            {/* Title — NO inline fontSize so CSS media queries control it cleanly */}
            <h1
              className="page-title font-black"
              style={{
                fontFamily: "'Syne', sans-serif",
                background: "linear-gradient(135deg, #ffffff 30%, #facc15 70%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                /* paddingBottom prevents descender clip on Safari/iOS */
                paddingBottom: "0.08em",
                display: "block",
                lineHeight: 1,
              }}
            >
              Pokédex
            </h1>

            <p className="subtitle text-gray-500 mx-auto">
              Search by name or ID — results update as you type
            </p>
          </header>

          {/* ── Search ── */}
          <div className="search-wrap max-w-2xl mx-auto">
            <SearchBar value={search} onChange={handleChange} />
          </div>

          {/* ── Result count ── */}
          {!loading && pokemon.length > 0 && (
            <p
              className="result-count text-gray-600 tracking-widest uppercase text-center"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              {search.trim()
                ? `1 result for "${search.trim()}"`
                : `Showing ${pokemon.length} Pokémon`}
            </p>
          )}

          {/* ── Grid / states ── */}
          {loading ? (
            <Loader />
          ) : notFound ? (
            <div className="not-found text-center text-gray-600">
              <div className="not-found-emoji flex justify-center">
                <svg
                  viewBox="0 0 120 120"
                  width="120"
                  height="120"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Shadow */}
                  <ellipse
                    cx="60"
                    cy="114"
                    rx="28"
                    ry="5"
                    fill="#000"
                    opacity="0.2"
                  />
                  {/* Cracked Pokéball outer ring */}
                  <circle
                    cx="60"
                    cy="60"
                    r="52"
                    fill="#1e293b"
                    stroke="#334155"
                    strokeWidth="3"
                  />
                  {/* Top half — faded red */}
                  <path
                    d="M 10 60 A 50 50 0 0 1 110 60 Z"
                    fill="#7f1d1d"
                    opacity="0.85"
                  />
                  {/* Bottom half — dark slate */}
                  <path d="M 10 60 A 50 50 0 0 0 110 60 Z" fill="#0f172a" />
                  {/* Middle band */}
                  <line
                    x1="10"
                    y1="60"
                    x2="110"
                    y2="60"
                    stroke="#334155"
                    strokeWidth="5"
                  />
                  {/* Center button ring */}
                  <circle
                    cx="60"
                    cy="60"
                    r="13"
                    fill="#0f172a"
                    stroke="#475569"
                    strokeWidth="4"
                  />
                  {/* Center button inner */}
                  <circle cx="60" cy="60" r="6" fill="#1e293b" />
                  {/* Crack lines — red glow feel */}
                  <path
                    d="M 57 18 L 52 38 L 61 44 L 55 60"
                    stroke="#f87171"
                    strokeWidth="1.8"
                    fill="none"
                    strokeLinecap="round"
                    opacity="0.6"
                  />
                  <path
                    d="M 76 22 L 71 40 L 79 46"
                    stroke="#f87171"
                    strokeWidth="1.2"
                    fill="none"
                    strokeLinecap="round"
                    opacity="0.4"
                  />
                  <path
                    d="M 40 72 L 46 85 L 38 92"
                    stroke="#f87171"
                    strokeWidth="1"
                    fill="none"
                    strokeLinecap="round"
                    opacity="0.3"
                  />
                  {/* Sad eyes */}
                  <circle cx="54.5" cy="59" r="2" fill="#64748b" />
                  <circle cx="65.5" cy="59" r="2" fill="#64748b" />
                  {/* Sad mouth */}
                  <path
                    d="M 53 65 Q 60 61.5 67 65"
                    stroke="#64748b"
                    strokeWidth="1.8"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <p className="not-found-text tracking-widest uppercase mt-4">
                No Pokémon found for &ldquo;{search}&rdquo;
              </p>
            </div>
          ) : (
            <PokemonGrid pokemon={pokemon} />
          )}

          <footer className="footer text-center text-gray-700 tracking-widest uppercase">
            Data from PokéAPI · Built with React
          </footer>
        </div>

        <style>{`
          /* ─────────────────────────────────────────
             FONT LOAD (fallback if not in index.html)
          ───────────────────────────────────────── */
          @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Mono:wght@400;500&display=swap');

          /* ─────────────────────────────────────────
             RESET
          ───────────────────────────────────────── */
          *, *::before, *::after {
            box-sizing: border-box;
            -webkit-tap-highlight-color: transparent;
          }
          html, body { overflow-x: hidden; margin: 0; padding: 0; }

          /* ─────────────────────────────────────────
             BACKGROUND
          ───────────────────────────────────────── */
          .app-root {
            background: #080d1a;
            font-family: 'DM Mono', monospace;
          }
          .dot-grid {
            opacity: 0.12;
            background-image: radial-gradient(circle, #334155 1px, transparent 1px);
            background-size: 24px 24px;
          }
          .blob {
            position: absolute;
            border-radius: 9999px;
            filter: blur(90px);
            opacity: 0.07;
          }
          .blob-red    { width:600px; height:600px; background:#ef4444; top:-150px; left:-150px; }
          .blob-blue   { width:500px; height:500px; background:#3b82f6; bottom:-100px; right:-100px; }
          .blob-yellow { width:400px; height:400px; background:#facc15;
                         top:40%; left:50%; transform:translate(-50%,-50%); opacity:0.05; }

          /* ─────────────────────────────────────────
             PAGE LAYOUT — desktop base
          ───────────────────────────────────────── */
          .page-content { padding: 3rem 1.5rem; }

          /* ─────────────────────────────────────────
             HEADER — desktop base
          ───────────────────────────────────────── */
          .header-section   { margin-bottom: 4rem; }
          .pokeball-wrap     { margin-bottom: 1.5rem; }
          .pokeball-icon     { width: 3.5rem; height: 3.5rem; }
          .pokeball-center   { width: 1rem; height: 1rem; }
          .eyebrow           { font-size: 0.75rem; letter-spacing: 0.4em; margin-bottom: 0.75rem; }
          .page-title        { font-size: 5rem; margin-bottom: 1rem; }
          .subtitle          { font-size: 0.875rem; max-width: 24rem; }

          /* ─────────────────────────────────────────
             SEARCH + RESULTS
          ───────────────────────────────────────── */
          .search-wrap  { }
          .result-count { font-size: 0.75rem; margin-bottom: 1.5rem; }

          /* ─────────────────────────────────────────
             STATES
          ───────────────────────────────────────── */
          .not-found           { padding: 6rem 0; }
          .not-found-emoji     { font-size: 3rem; margin-bottom: 1rem; }
          .not-found-text      { font-size: 0.875rem; }

          /* ─────────────────────────────────────────
             FOOTER
          ───────────────────────────────────────── */
          .footer { margin-top: 5rem; font-size: 0.75rem; padding-bottom: 2rem; }

          /* ─────────────────────────────────────────
             ANIMATION
          ───────────────────────────────────────── */
          @keyframes fadeSlideUp {
            from { opacity: 0; transform: translateY(20px); }
            to   { opacity: 1; transform: translateY(0); }
          }

          /* ═════════════════════════════════════════
             TABLET  ≤ 768px
          ═════════════════════════════════════════ */
          @media (max-width: 768px) {
            .page-content   { padding: 2.5rem 1.25rem; }
            .header-section { margin-bottom: 2.5rem; }
            .page-title     { font-size: 4rem; }
          }

          /* ═════════════════════════════════════════
             MOBILE  ≤ 640px
          ═════════════════════════════════════════ */
          @media (max-width: 640px) {
            .page-content   { padding: 2rem 1rem; }
            .header-section { margin-bottom: 2rem; }

            .pokeball-wrap   { margin-bottom: 0.875rem; }
            .pokeball-icon   { width: 2.5rem; height: 2.5rem; }
            .pokeball-center { width: 0.65rem; height: 0.65rem; }

            .eyebrow  { font-size: 0.6rem; letter-spacing: 0.2em; margin-bottom: 0.5rem; }

            /* Smoothed out the vw scaling for Mobile M and L. 
              At 375px, font is ~45px. At 425px, font is ~51px. 
              Added nowrap to explicitly prevent line breaks.
            */
            .page-title { 
              font-size: clamp(2.5rem, 12vw, 4rem); 
              margin-bottom: 0.75rem; 
              white-space: nowrap;
            }

            .subtitle     { font-size: 0.7rem; max-width: 16rem; }
            .result-count { font-size: 0.65rem; margin-bottom: 1rem; }
            .footer       { margin-top: 3rem; font-size: 0.65rem; }

            .not-found       { padding: 4rem 0; }
            .not-found-emoji { font-size: 2.5rem; }
            .not-found-text  { font-size: 0.75rem; }
          }

          /* ═════════════════════════════════════════
            VERY SMALL  ≤ 360px  (Galaxy S8, iPhone SE, etc.)
          ═════════════════════════════════════════ */
          @media (max-width: 360px) {
            .page-content { padding: 1.5rem 0.5rem; }
            
            /* Lowered the clamp slightly to accommodate the wide 'Syne' font */
            .page-title { 
              font-size: clamp(2rem, 12vw, 2.5rem); 
              white-space: nowrap; 
            }
            
            .eyebrow      { font-size: 0.55rem; letter-spacing: 0.15em; }
            .subtitle     { font-size: 0.65rem; max-width: 14rem; }
          }
        `}</style>
      </div>
    </>
  );
}

export default App;
