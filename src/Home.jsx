import { useState, useEffect, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import PokemonGrid from "./components/PokemonGrid";
import SearchBar from "./components/SearchBar";
import Loader from "./components/Loader";
import { fetchPokemonPage } from "./services/pokemonApi";
import { typeSolid } from "./utils/typeColors";

function Home() {
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const observerTarget = useRef(null); // The invisible tripwire

  // React Query's Infinite Scroll magic
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useInfiniteQuery({
    queryKey: ["pokemonList"],
    queryFn: fetchPokemonPage,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextOffset,
  });

  // Flatten the array of pages into a single continuous list of Pokémon
  const allPokemon = data ? data.pages.flatMap(page => page.results) : [];

  // Filter based on what is currently loaded
  const filteredPokemon = allPokemon.filter((poke) => {
    const matchesSearch = poke.name.toLowerCase().includes(search.trim().toLowerCase()) || 
                          String(poke.id).includes(search.trim());
    const matchesType = selectedType ? poke.types.some(t => t.type.name === selectedType) : true;
    
    return matchesSearch && matchesType;
  });

  const availableTypes = Object.keys(typeSolid);

  // The Intersection Observer (Triggers fetchNextPage when you scroll to the bottom)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) observer.observe(observerTarget.current);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="page-content relative z-10 max-w-6xl mx-auto">
      <header className="header-section text-center">
        <div className="pokeball-wrap flex justify-center">
          <div className="pokeball-icon relative">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-red-500 rounded-t-full border-[3px] border-gray-800" />
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-white rounded-b-full border-[3px] border-gray-800" />
            <div className="absolute top-1/2 left-0 w-full h-[3px] bg-gray-800 -translate-y-1/2" />
            <div className="pokeball-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border-[3px] border-gray-800 rounded-full z-10" />
          </div>
        </div>

        <p className="eyebrow font-bold uppercase text-yellow-400" style={{ fontFamily: "'DM Mono', monospace" }}>
          Gotta Catch &apos;Em All
        </p>

        <h1
          className="page-title font-black"
          style={{
            fontFamily: "'Syne', sans-serif",
            background: "linear-gradient(135deg, #ffffff 30%, #facc15 70%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
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

      <div className="search-wrap max-w-2xl mx-auto mb-6">
        <SearchBar value={search} onChange={setSearch} />
      </div>

      {!isLoading && allPokemon.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 mb-8 max-w-3xl mx-auto px-4">
          {availableTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(selectedType === type ? "" : type)}
              className={`px-3 py-1 rounded-full text-xs font-bold capitalize transition-all duration-300 ${
                selectedType === type ? 'scale-110 shadow-lg text-white' : 'text-white/60 hover:text-white hover:scale-105'
              }`}
              style={{
                background: selectedType === type || !selectedType ? typeSolid[type] : '#1f2937',
                fontFamily: "'DM Mono', monospace",
                letterSpacing: "0.08em",
              }}
            >
              {type}
            </button>
          ))}
        </div>
      )}

      {isLoading && !allPokemon.length ? (
        <Loader />
      ) : filteredPokemon.length === 0 ? (
        <div className="not-found text-center text-gray-600">
           <div className="not-found-emoji flex justify-center">
            <svg viewBox="0 0 120 120" width="120" height="120" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="60" cy="114" rx="28" ry="5" fill="#000" opacity="0.2"/>
              <circle cx="60" cy="60" r="52" fill="#1e293b" stroke="#334155" strokeWidth="3"/>
              <path d="M 10 60 A 50 50 0 0 1 110 60 Z" fill="#7f1d1d" opacity="0.85"/>
              <path d="M 10 60 A 50 50 0 0 0 110 60 Z" fill="#0f172a"/>
              <line x1="10" y1="60" x2="110" y2="60" stroke="#334155" strokeWidth="5"/>
              <circle cx="60" cy="60" r="13" fill="#0f172a" stroke="#475569" strokeWidth="4"/>
              <circle cx="60" cy="60" r="6" fill="#1e293b"/>
              <path d="M 57 18 L 52 38 L 61 44 L 55 60" stroke="#f87171" strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.6"/>
              <path d="M 76 22 L 71 40 L 79 46" stroke="#f87171" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.4"/>
              <path d="M 40 72 L 46 85 L 38 92" stroke="#f87171" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.3"/>
              <circle cx="54.5" cy="59" r="2" fill="#64748b"/>
              <circle cx="65.5" cy="59" r="2" fill="#64748b"/>
              <path d="M 53 65 Q 60 61.5 67 65" stroke="#64748b" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
            </svg>
          </div>
          <p className="not-found-text tracking-widest uppercase mt-4">
            No Pokémon found matching your filters
          </p>
        </div>
      ) : (
        <>
          <PokemonGrid pokemon={filteredPokemon} />
          
          {/* This empty div is the invisible tripwire at the bottom of the grid */}
          <div ref={observerTarget} className="h-20 w-full flex items-center justify-center mt-8">
            {isFetchingNextPage && (
               <div className="flex gap-2 items-center text-gray-500 uppercase tracking-widest text-xs" style={{ fontFamily: "'DM Mono', monospace" }}>
                 <div className="w-3 h-3 rounded-full bg-red-500 animate-ping"></div>
                 Loading more...
               </div>
            )}
          </div>
        </>
      )}

      <footer className="footer text-center text-gray-700 tracking-widest uppercase mt-12">
        Data from PokéAPI · Built with React
      </footer>
    </div>
  );
}

export default Home;