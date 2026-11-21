import React, { useState, useEffect, useCallback } from 'react';
import { Sparkles, Layers, Palette } from 'lucide-react';
import { fetchMoviesFromApi } from './services/movieApi';
import FilterPanel from './components/FilterPanel';
import MovieCard from './components/MovieCard';
import MovieModal from './components/MovieModal';
import './styles/table.css';

const FELT_THEMES = [
  { id: 'emerald', name: 'Classic Emerald', color: '#166534' },
  { id: 'crimson', name: 'Royal Crimson', color: '#881337' },
  { id: 'royal', name: 'Midnight Blue', color: '#1e3a8a' },
  { id: 'obsidian', name: 'High-Roller Noir', color: '#27272a' },
];

export default function App() {
  const [feltTheme, setFeltTheme] = useState('emerald');
  const [handSize, setHandSize] = useState(5);
  const [filters, setFilters] = useState({
    genre: 'all',
    language: 'all',
    mood: 'all',
    searchQuery: '',
  });

  const [shoeDeck, setShoeDeck] = useState([]);
  const [dealtHand, setDealtHand] = useState([]);
  const [discardingIds, setDiscardingIds] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [apiSource, setApiSource] = useState('Live iTunes Movie API');
  const [dealerMessage, setDealerMessage] = useState(
    'Welcome to the table! Set your preferences or hit Random Deal.'
  );
  const [dealBatchId, setDealBatchId] = useState(0);

  const dealNewHand = useCallback(
    async (isRandom = false) => {
      setLoading(true);
      setDealerMessage(
        isRandom
          ? 'Shuffling the entire shoe for a surprise hand...'
          : 'Dealing a fresh hand tailored to your table preferences...'
      );

      const { movies, source } = await fetchMoviesFromApi({
        ...filters,
        isRandom,
      });

      setApiSource(source);
      const initialHand = movies.slice(0, handSize);
      const remainingShoe = movies.slice(handSize);

      setDealtHand(initialHand);
      setShoeDeck(remainingShoe);
      setDealBatchId((prev) => prev + 1);
      setLoading(false);
      setDealerMessage(
        initialHand.length > 0
          ? `Dealt ${initialHand.length} movies. Click any card for synopsis or Swap to redraw!`
          : 'No matching cards found—try broadening your filters.'
      );
    },
    [filters, handSize]
  );

  useEffect(() => {
    dealNewHand(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleDiscardCard = async (movieId) => {
    if (discardingIds.includes(movieId)) return;
    setDiscardingIds((prev) => [...prev, movieId]);

    setTimeout(async () => {
      let currentShoe = [...shoeDeck];

      if (currentShoe.length === 0) {
        const { movies } = await fetchMoviesFromApi({ ...filters, isRandom: true });
        const existingIds = new Set(dealtHand.map((m) => m.id));
        currentShoe = movies.filter((m) => !existingIds.has(m.id));
      }

      const replacement = currentShoe.shift();
      setShoeDeck(currentShoe);

      setDealtHand((prevHand) =>
        prevHand.map((card) => (card.id === movieId && replacement ? replacement : card))
      );
      setDiscardingIds((prev) => prev.filter((id) => id !== movieId));
      setDealerMessage(
        replacement
          ? `Swapped out your discard and dealt "${replacement.title}".`
          : 'Shoe is empty—hit Deal to shuffle a fresh deck!'
      );
    }, 300);
  };

  return (
    <div className="app-shell" data-felt={feltTheme}>
      <header className="top-bar">
        <div className="brand">
          <div className="brand-chip">MD</div>
          <div>
            <h1>MovieDealer</h1>
            <span>Interactive Casino-Table Movie Discovery</span>
          </div>
        </div>

        <div className="felt-controls" role="group" aria-label="Customize Table Felt">
          <label>
            <Palette size={15} color="#fbbf24" />
            Table Felt:
          </label>
          {FELT_THEMES.map((theme) => (
            <button
              key={theme.id}
              type="button"
              className={`felt-swatch ${feltTheme === theme.id ? 'active' : ''}`}
              style={{ backgroundColor: theme.color }}
              title={theme.name}
              aria-label={`Select ${theme.name} felt`}
              onClick={() => setFeltTheme(theme.id)}
            />
          ))}
        </div>
      </header>

      <main className="main-stage">
        <FilterPanel
          filters={filters}
          onFilterChange={handleFilterChange}
          onDealFiltered={() => dealNewHand(false)}
          onDealRandom={() => dealNewHand(true)}
          handSize={handSize}
          onHandSizeChange={setHandSize}
          loading={loading}
        />

        <section className="poker-table-rail" aria-label="Poker Table">
          <div className="poker-table-felt">
            <div className="dealer-station">
              <div className="dealer-badge">
                <div className="dealer-avatar">
                  <Sparkles size={16} />
                </div>
                <span className="dealer-speech">{dealerMessage}</span>
              </div>
              <div className="deck-shoe">
                <Layers size={14} />
                <span>
                  Shoe: {shoeDeck.length} cards remaining • Source: {apiSource}
                </span>
              </div>
            </div>

            <div className="dealt-hand-area" key={dealBatchId}>
              {dealtHand.map((movie, idx) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  index={idx}
                  isDiscarding={discardingIds.includes(movie.id)}
                  onSelect={setSelectedMovie}
                  onDiscard={handleDiscardCard}
                />
              ))}
            </div>

            <div
              style={{
                textAlign: 'center',
                fontSize: '0.75rem',
                color: 'rgba(254, 243, 199, 0.55)',
                marginTop: '1.25rem',
                zIndex: 2,
              }}
            >
              Click any movie card to view full rating, director & synopsis • Use Swap to discard & redraw
            </div>
          </div>
        </section>
      </main>

      <MovieModal
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)}
        onDiscardAndReplace={handleDiscardCard}
      />
    </div>
  );
}
