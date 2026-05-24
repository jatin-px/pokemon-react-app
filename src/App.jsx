import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import PokemonDetails from "./components/PokemonDetails";

function App() {
  return (
    <div className="app-root min-h-screen text-white relative">
      {/* ── Shared Ambient Background ── */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
        <div className="blob blob-red" />
        <div className="blob blob-blue" />
        <div className="blob blob-yellow" />
      </div>
      <div className="dot-grid fixed inset-0 pointer-events-none z-0" aria-hidden="true" />

      {/* ── Routes ── */}
      <div className="relative z-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokemon/:name" element={<PokemonDetails />} />
        </Routes>
      </div>

      {/* ── Global Styles ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Mono:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
        html, body { overflow-x: hidden; margin: 0; padding: 0; }
        .app-root { background: #080d1a; font-family: 'DM Mono', monospace; }
        .dot-grid { opacity: 0.12; background-image: radial-gradient(circle, #334155 1px, transparent 1px); background-size: 24px 24px; }
        .blob { position: absolute; border-radius: 9999px; filter: blur(90px); opacity: 0.07; }
        .blob-red    { width:600px; height:600px; background:#ef4444; top:-150px; left:-150px; }
        .blob-blue   { width:500px; height:500px; background:#3b82f6; bottom:-100px; right:-100px; }
        .blob-yellow { width:400px; height:400px; background:#facc15; top:40%; left:50%; transform:translate(-50%,-50%); opacity:0.05; }
        .page-content { padding: 3rem 1.5rem; }
        .header-section { margin-bottom: 4rem; }
        .pokeball-wrap { margin-bottom: 1.5rem; }
        .pokeball-icon { width: 3.5rem; height: 3.5rem; }
        .pokeball-center { width: 1rem; height: 1rem; }
        .eyebrow { font-size: 0.75rem; letter-spacing: 0.4em; margin-bottom: 0.75rem; }
        .page-title { font-size: 5rem; margin-bottom: 1rem; }
        .subtitle { font-size: 0.875rem; max-width: 24rem; }
        .result-count { font-size: 0.75rem; margin-bottom: 1.5rem; }
        .not-found { padding: 6rem 0; }
        .not-found-emoji { font-size: 3rem; margin-bottom: 1rem; }
        .not-found-text { font-size: 0.875rem; }
        .footer { margin-top: 5rem; font-size: 0.75rem; padding-bottom: 2rem; }
        @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        
        @media (max-width: 768px) {
          .page-content { padding: 2.5rem 1.25rem; }
          .header-section { margin-bottom: 2.5rem; }
          .page-title { font-size: 4rem; }
        }
        @media (max-width: 640px) {
          .page-content { padding: 2rem 1rem; }
          .header-section { margin-bottom: 2rem; }
          .pokeball-wrap { margin-bottom: 0.875rem; }
          .pokeball-icon { width: 2.5rem; height: 2.5rem; }
          .pokeball-center { width: 0.65rem; height: 0.65rem; }
          .eyebrow { font-size: 0.6rem; letter-spacing: 0.2em; margin-bottom: 0.5rem; }
          .page-title { font-size: clamp(2.5rem, 12vw, 4rem); margin-bottom: 0.75rem; white-space: nowrap; }
          .subtitle { font-size: 0.7rem; max-width: 16rem; }
          .result-count { font-size: 0.65rem; margin-bottom: 1rem; }
          .footer { margin-top: 3rem; font-size: 0.65rem; }
          .not-found { padding: 4rem 0; }
          .not-found-emoji { font-size: 2.5rem; }
          .not-found-text { font-size: 0.75rem; }
        }
        @media (max-width: 360px) {
          .page-content { padding: 1.5rem 0.5rem; }
          .page-title { font-size: clamp(2rem, 12vw, 2.5rem); white-space: nowrap; }
          .eyebrow { font-size: 0.55rem; letter-spacing: 0.15em; }
          .subtitle { font-size: 0.65rem; max-width: 14rem; }
        }
      `}</style>
    </div>
  );
}

export default App;