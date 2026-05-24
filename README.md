# 🔴 Pokédex - Gotta Catch 'Em All

A highly performant, fully responsive Pokédex application built with React and Vite. Search through Pokémon by name or ID, explore dynamic type filtering, and dive into in-depth stats on dedicated, beautifully animated pages.

**🌟 Live Demo:** [View on Vercel](https://pokemon-react-app-eight-sigma.vercel.app/)

---

## ✨ Features

* **Infinite Pagination:** Automatically fetches and loads new Pokémon seamlessly as you scroll to the bottom of the grid.
* **Lightning-Fast Caching:** Powered by TanStack (React) Query, API requests are intelligently cached, meaning previously searched Pokémon or visited pages load instantly with zero wait time.
* **Multi-Page Architecture:** Utilizes React Router to provide dedicated, full-page views for individual Pokémon.
* **Advanced Filtering:** Instantly filter the currently loaded Pokémon by name, Pokédex ID, or elemental type.
* **Immersive Details:** View height, weight, hidden abilities, and animated progress bars for all 6 base stats.
* **Audio Integration:** Click to play official Pokémon cries directly from the API.
* **Fully Responsive:** Fluid typography (`clamp()`) and careful layout scaling ensure a perfect experience from 4K desktop monitors down to tiny 320px mobile screens.

---

## 🛠️ Tech Stack

* **Frontend:** React (Vite)
* **Routing:** React Router v6
* **State & Data Caching:** TanStack Query (React Query)
* **Styling:** Custom CSS with CSS Variables & Fluid Typography
* **Fonts:** Syne (Headings) & DM Mono (UI text)
* **Data Source:** [PokéAPI](https://pokeapi.co/)

---

## 🚀 Running Locally

To run this project on your local machine, follow these steps:

1. **Clone the repository**
   ```bash
   git clone [https://github.com/your-username/pokemon-react-app.git](https://github.com/your-username/pokemon-react-app.git)
   cd pokemon-react-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the port provided in your terminal).

---

## 📂 Project Structure

* `App.jsx` - Root layout and routing configuration.
* `Home.jsx` - Main grid view with infinite scrolling and filtering logic.
* `components/PokemonDetails.jsx` - Dedicated dynamic route for individual Pokémon stats.
* `components/SearchBar.jsx` - Search input UI.
* `components/PokemonGrid.jsx` - Staggered grid layout for search results.
* `components/PokemonCard.jsx` - Individual animated card displaying summary data.
* `components/Loader.jsx` - Custom spinning Pokéball loading state.
* `services/pokemonApi.js` - Paginated data fetching logic from PokéAPI.
* `utils/typeColors.js` - Color mappings for Pokémon types.

---

*Data provided by PokéAPI. Built with React.*