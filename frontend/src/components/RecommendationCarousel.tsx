import React, { useRef } from 'react';
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
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.offsetWidth;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="carousel-section">
      <h2 className="carousel-title">
        <span className="carousel-title-glow">{title}</span>
      </h2>

      <div className="carousel-wrapper">
        <button className="scroll-button left" onClick={() => scroll('left')}>
          &#10094;
        </button>

        <div className="carousel-row" ref={scrollRef}>
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
                onError={(e) => {
                  e.currentTarget.src = '/fallback.jpg';
                }}
              />
              <div className="carousel-info">
                <div className="carousel-title-text">{movie.title}</div>
                <div className="carousel-rating">{movie.rating}</div>
              </div>
            </div>
          ))}
        </div>

        <button className="scroll-button right" onClick={() => scroll('right')}>
          &#10095;
        </button>
      </div>
    </div>
  );
};

export default RecommendationCarousel;
