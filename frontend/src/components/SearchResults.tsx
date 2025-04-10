import React from 'react';
import { Movie } from '../types/Movie';
import '../styles/SearchResults.css';

interface SearchResultsProps {
  results: Movie[];
  onMovieClick: (movie: Movie) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  onMovieClick,
}) => {
  return (
    <div className="search-results-panel">
      <h2 className="results-heading">Search Results ({results.length})</h2>
      {results.length === 0 ? (
        <div className="no-results">No movies found matching your search.</div>
      ) : (
        <div className="poster-grid">
          {results.map((movie) => (
            <div
              key={movie.show_id}
              className="poster-tile"
              onClick={() => onMovieClick(movie)}
            >
              <img
                src={`https://cinenicheblobcontainer.blob.core.windows.net/posters/resized_images/${encodeURIComponent(
                  movie.title.replace(/[^A-Za-z0-9_\s]/g, '').trim()
                )}.jpg`}
                alt={movie.title}
                className="poster-image"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    '../public/assets/movies/A Sun.jpg';
                }}
              />
              <div className="poster-info">
                <div className="movie-title" title={movie.title}>
                  {movie.title}
                </div>
                <div className="movie-rating">{movie.rating}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
