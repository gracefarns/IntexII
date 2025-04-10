// src/components/MovieCard.tsx
import React from 'react';
import { Movie } from '../types/Movie';
import '../styles/MovieDetailPage.css'; //

interface Props {
  movie: Movie;
  onClick: () => void;
}

const MovieCard: React.FC<Props> = ({ movie, onClick }) => {
  return (
    <div className="movie-recommendation-link" onClick={onClick}>
      <div className="movie-recommendation-card">
        <div className="recommendation-image-container">
          {movie.show_id ? (
            <img
              src={`https://cinenicheblobcontainer.blob.core.windows.net/posters/resized_images/${encodeURIComponent(
                movie.title.replace(/[^A-Za-z0-9_\s]/g, '').trim()
              )}.jpg`}
              alt={movie.title}
              className="recommendation-image"
            />
          ) : (
            <div className="recommendation-image-fallback">
              <div className="recommendation-image-initial">
                {movie.title?.charAt(0)}
              </div>
            </div>
          )}
        </div>
        <div className="recommendation-content">
          <div className="recommendation-title">{movie.title}</div>
          <div className="recommendation-genre">
            {movie.release_year} &bull; {movie.rating}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
