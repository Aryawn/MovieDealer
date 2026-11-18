import React from 'react';
import { Star, X, RefreshCw, Film } from 'lucide-react';

export default function MovieModal({ movie, onClose, onDiscardAndReplace }) {
  if (!movie) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="movie-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-body">
          <div>
            {movie.poster ? (
              <img
                src={movie.poster}
                alt={`${movie.title} poster`}
                className="modal-poster"
              />
            ) : (
              <div className="modal-poster card-poster-fallback">
                <Film size={44} />
                <span>{movie.title}</span>
              </div>
            )}
          </div>

          <div className="modal-details">
            <h2>{movie.title}</h2>
            <div className="modal-tags">
              <span className="modal-tag">
                <Star size={12} style={{ verticalAlign: 'middle', marginRight: 4 }} />
                {movie.rating} / 10
              </span>
              <span className="modal-tag">{movie.year}</span>
              <span className="modal-tag">{movie.genre}</span>
              <span className="modal-tag">{movie.runtime}</span>
              {movie.contentRating && (
                <span className="modal-tag">{movie.contentRating}</span>
              )}
            </div>

            <p style={{ fontSize: '0.84rem', color: '#a8a29e', marginBottom: '0.75rem' }}>
              Directed by <strong style={{ color: '#fafaf9' }}>{movie.director}</strong>
            </p>

            <p className="modal-synopsis">{movie.synopsis}</p>

            <div className="modal-footer">
              <button
                type="button"
                className="btn-card-discard"
                style={{ padding: '0.6rem 1rem', fontSize: '0.85rem' }}
                onClick={() => {
                  onDiscardAndReplace(movie.id);
                  onClose();
                }}
              >
                <RefreshCw size={15} />
                Discard & Deal New Card
              </button>
              <button
                type="button"
                className="btn-deal-primary"
                style={{ padding: '0.6rem 1.1rem', fontSize: '0.85rem' }}
                onClick={onClose}
              >
                <X size={15} />
                Back to Table
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
