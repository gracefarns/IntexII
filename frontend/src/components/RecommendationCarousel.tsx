import React, { useRef } from 'react';
import { Movie } from '../types/Movie';
import '../styles/RecommendationCarousel.css';
import MovieCard from './MovieCard';

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

  //   const scroll = (direction: 'left' | 'right') => {
  //     if (scrollRef.current) {
  //       const scrollAmount = scrollRef.current.offsetWidth;
  //       scrollRef.current.scrollBy({
  //         left: direction === 'left' ? -scrollAmount : scrollAmount,
  //         behavior: 'smooth',
  //       });
  //     }
  //   };

  return (
    <div className="carousel-section">
      <h2 className="category-title">{title}</h2>

      <div className="carousel-wrapper">
        {/* <button className="scroll-button left" onClick={() => scroll('left')}>
          &#10094;
        </button> */}

        <div className="carousel-scroll-row" ref={scrollRef}>
          {movies.map((movie, index) => (
            <div
              key={`${movie.show_id}-${index}`}
              className="carousel-card-wrapper"
            >
              <MovieCard movie={movie} onClick={() => onClickMovie(movie)} />
            </div>
          ))}
        </div>

        {/* <button className="scroll-button right" onClick={() => scroll('right')}>
          &#10095;
        </button> */}
      </div>
    </div>
  );
};

export default RecommendationCarousel;
