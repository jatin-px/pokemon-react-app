# 🔴 Pokédex - Gotta Catch 'Em All

A sleek, fully responsive Pokédex application built with React. Search through the original 151 Pokémon by name or ID, view their stats, and explore their types in a beautifully styled, animated UI.

**🌟 Live Demo:** [View on Vercel](https://pokemon-react-app-eight-sigma.vercel.app/)

---

## ✨ Features

* **Real-time Search:** Instantly filter Pokémon by their name or Pokédex ID.
* **Debounced Inputs:** Search is optimized with debouncing to prevent excessive rendering and ensure smooth performance.
* **Rich UI & Animations:** Features ambient background blobs, hover scaling, CSS gradient type badges, and custom staggered entrance animations for the grid.
* **Fully Responsive:** Carefully calculated layout scaling ensuring it looks great on desktop, tablets, and even the smallest mobile screens (down to 320px).
* **Detailed Stats:** View official artwork, height, weight, abilities, and dynamic stat bars for HP, Attack, Defense, and Speed.

---

## 🛠️ Tech Stack

* **Frontend:** React (Vite)
* **Styling:** Custom CSS with CSS Variables & Clamp functions for fluid typography
* **Fonts:** Syne (Headings) & DM Mono (UI text)
* **Data Source:** [PokéAPI](https://pokeapi.co/)

---

## 🚀 Running Locally

To run this project on your local machine, follow these steps:

1. **Clone the repository**
   ```bash
   git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
   cd your-repo-name
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

* `App.jsx` - Main application logic, state management, and layout wrapper.
* `components/SearchBar.jsx` - Debounced search input UI.
* `components/PokemonGrid.jsx` - Staggered grid layout for search results.
* `components/PokemonCard.jsx` - Individual animated card displaying Pokémon data and stats.
* `components/Loader.jsx` - Custom spinning Pokéball loading state.
* `services/pokemonApi.js` - Data fetching logic from PokéAPI.
* `utils/typeColors.js` - Color mappings for Pokémon types.

---

*Data provided by PokéAPI. Built with React.*