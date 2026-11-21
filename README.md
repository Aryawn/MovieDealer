# MovieDealer

An interactive movie discovery web application built with **React**, **JavaScript**, **HTML**, and **CSS**, styled as a casino poker table where movie recommendations are dealt like playing cards.

Developed by **Group 17 (Aryan & Sunayana)** for *Software Tools and Practices*.

## Features
- **Public Movie API Integration:** Fetches real-time movie titles, high-resolution posters, release years, runtimes, directors, and synopses via the public, keyless **iTunes Movie Search API** (with an automatic offline fallback deck).
- **Preference Filtering & Surprise Random Deal:** Filter by **Genre**, **Language**, **Mood**, or keyword, or deal a completely random hand to beat decision fatigue.
- **Animated Card-Dealing Sequence:** Cards fly onto the poker table with staggered CSS keyframe animations.
- **Discard & Redraw Mechanics:** Swap out any unwanted movie card to have the virtual dealer deal a replacement card from the shoe.
- **Customizable Table Felt:** Switch between *Classic Emerald*, *Royal Crimson*, *Midnight Blue*, and *High-Roller Noir* felt themes.
- **Detailed Movie Modal:** Click any card to inspect its rating, director, runtime, content advisory, and full synopsis.

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open in browser:**
   Visit the local URL shown in your terminal (typically `http://localhost:5173`).

## Acknowledgements
Portions of the API normalization utilities and CSS animation scaffolding were assisted by an LLM (Gemini) in accordance with Milestone 3 course guidelines.
