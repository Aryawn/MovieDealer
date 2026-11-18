import React from 'react';
import { Star, RefreshCw, Eye, Film } from 'lucide-react';

export default function MovieCard({
  movie,
  index,
  isDiscarding,
  onSelect,
  onDiscard,
}) {
  const isRedSuit = movie.suit === '♥' || movie.suit === '♦';

  return (
    <div
      className={`movie-card-wrapper ${isDiscarding ? 'discarding' : ''}`}
      style={{ '--deal-index': index }}
    >
      <article
        className="playing-card"
        onClick={() => onSelect(movie)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onSelect(movie)}
        aria-label={`Inspect ${movie.title}`}
      >
        <div>
          <div className="card-corner-top">
            <span className={isRedSuit ? 'suit-red' : 'suit-black'}>
              {movie.suit} {movie.year}
            </span>
            <span className="card-rating-pill">
              <Star size={12} fill="#0f172a" color="#0f172a" />
              {movie.rating}
            </span>
          </div>

          <div className="card-poster-box">
            {movie.poster ? (
              <img
                src={movie.poster}
                alt={`${movie.title} poster`}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextSibling.style.display = 'flex';
                }}
              />
            ) : null}
            <div
              className="card-poster-fallback"
              style={{ display: movie.poster ? 'none' : 'flex' }}
            >
              <Film size={32} />
              <span>{movie.title}</span>
            </div>
          </div>

          <h3 className="card-title">{movie.title}</h3>
          <p className="card-meta">
            {movie.genre} • {movie.runtime}
          </p>
        </div>

        <div className="card-actions" onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            className="btn-card-inspect"
            onClick={() => onSelect(movie)}
          >
            <Eye size={13} style={{ verticalAlign: 'middle', marginRight: 4 }} />
            Details
          </button>
          <button
            type="button"
            className="btn-card-discard"
            onClick={() => onDiscard(movie.id)}
            title="Discard this card and draw a replacement from the shoe"
          >
            <RefreshCw size={12} />
            Swap
          </button>
        </div>
      </article>
    </div>
  );
}
