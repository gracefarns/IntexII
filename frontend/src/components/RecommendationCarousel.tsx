import React from 'react';
import { Movie } from '../types/Movie';
import '../styles/RecommendationCarousel.css';

interface Props {
  title: string;
  movies: Movie[];
  onClickMovie: (movie: Movie) => void;
}

const RecommendationCarousel: React.FC<Props> = ({
  title,
  movies,
  onClickMovie,
}) => {
  return (
    <div className="carousel-section">
      <h2 className="carousel-title">{title}</h2>
      <div className="carousel-row">
        {movies.map((movie) => (
          <div
            key={movie.show_id}
            className="carousel-tile"
            onClick={() => onClickMovie(movie)}
          >
            <img
              src={`https://cinenicheblobcontainer.blob.core.windows.net/posters/resized_images/${encodeURIComponent(
                movie.title.replace(/[^A-Za-z0-9\s]/g, '').trim()
              )}.jpg`}
              alt={movie.title}
              className="carousel-image"
            />
            <div className="carousel-info">
              <div className="carousel-title-text">{movie.title}</div>
              <div className="carousel-rating">{movie.rating}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendationCarousel;
