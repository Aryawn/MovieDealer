import React from 'react';
import { SlidersHorizontal, Shuffle, Spade } from 'lucide-react';
import { GENRES, LANGUAGES, MOODS } from '../services/movieApi';

export default function FilterPanel({
  filters,
  onFilterChange,
  onDealFiltered,
  onDealRandom,
  handSize,
  onHandSizeChange,
  loading,
}) {
  return (
    <aside className="filter-panel" aria-label="Movie Preference Filters">
      <div className="panel-heading">
        <h2>
          <SlidersHorizontal size={18} />
          Table Preferences
        </h2>
      </div>

      <div className="field-group">
        <label htmlFor="keyword-input">Keyword / Title Hint (Optional)</label>
        <input
          id="keyword-input"
          type="text"
          placeholder="e.g. Nolan, Space, Heist..."
          value={filters.searchQuery}
          onChange={(e) => onFilterChange('searchQuery', e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onDealFiltered()}
        />
      </div>

      <div className="field-group">
        <label htmlFor="genre-select">Genre</label>
        <select
          id="genre-select"
          value={filters.genre}
          onChange={(e) => onFilterChange('genre', e.target.value)}
        >
          {GENRES.map((g) => (
            <option key={g.id} value={g.id}>
              {g.label}
            </option>
          ))}
        </select>
      </div>

      <div className="field-group">
        <label htmlFor="language-select">Language</label>
        <select
          id="language-select"
          value={filters.language}
          onChange={(e) => onFilterChange('language', e.target.value)}
        >
          {LANGUAGES.map((l) => (
            <option key={l.id} value={l.id}>
              {l.label}
            </option>
          ))}
        </select>
      </div>

      <div className="field-group">
        <label htmlFor="mood-select">Mood / Vibe</label>
        <select
          id="mood-select"
          value={filters.mood}
          onChange={(e) => onFilterChange('mood', e.target.value)}
        >
          {MOODS.map((m) => (
            <option key={m.id} value={m.id}>
              {m.label}
            </option>
          ))}
        </select>
      </div>

      <div className="field-group">
        <label htmlFor="hand-size-select">Cards Dealt Per Hand</label>
        <select
          id="hand-size-select"
          value={handSize}
          onChange={(e) => onHandSizeChange(Number(e.target.value))}
        >
          <option value={3}>3 Cards (Quick Pick)</option>
          <option value={4}>4 Cards (Standard Hand)</option>
          <option value={5}>5 Cards (Full Poker Hand)</option>
        </select>
      </div>

      <button
        type="button"
        className="btn-deal-primary"
        onClick={onDealFiltered}
        disabled={loading}
      >
        <Spade size={18} />
        {loading ? 'Shuffling Deck...' : 'Deal Matching Hand'}
      </button>

      <button
        type="button"
        className="btn-random-hand"
        onClick={onDealRandom}
        disabled={loading}
      >
        <Shuffle size={17} />
        Surprise Me (Random Deal)
      </button>
    </aside>
  );
}
