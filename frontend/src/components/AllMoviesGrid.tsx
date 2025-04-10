import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Movie } from '../types/Movie';
import { fetchMovies } from '../api/MoviesAPI';
import '../styles/AllMoviesGrid.css';
import MovieCard from './MovieCard';

interface Props {
  selectedGenre: string | null;
  genreMap: { [label: string]: keyof Movie };
  onMovieClick: (movie: Movie) => void;
}

const AllMoviesGrid: React.FC<Props> = ({
  selectedGenre,
  genreMap,
  onMovieClick,
}) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  // commented out code below temporarily to run build -grace
  //const genreFilter = selectedGenre ? genreMap[selectedGenre] : null;

  const loadMovies = useCallback(
    async (reset = false) => {
      if (isLoading || !hasMore) return;
      setIsLoading(true);

      const categoryList = selectedGenre ? [selectedGenre] : [];

      console.log('Calling fetchMovies with:', categoryList);

      const data = await fetchMovies(10, reset ? 1 : page, categoryList, '');

      if (!data || !data.movies) {
        setHasMore(false);
        setIsLoading(false);
        return;
      }

      const newMovies = data.movies;
      console.log('new movies:', data.movies);

      if (reset) {
        setMovies(newMovies);
      } else {
        setMovies((prev) => [...prev, ...newMovies]);
      }

      setHasMore(newMovies.length > 0);
      setIsLoading(false);
    },
    [page, selectedGenre, genreMap, isLoading, hasMore]
  );

  //  On genre change, reset everything and fetch new
  useEffect(() => {
    console.log('GENRE CHANGED:', selectedGenre);
    setMovies([]);
    setPage(1);
    setHasMore(true);
    loadMovies(true); // fetch fresh page 1
  }, [selectedGenre]);

  //  Load next page if page increases
  useEffect(() => {
    if (page > 1) {
      loadMovies();
    }
  }, [page]);

  //  Infinite scroll
  useEffect(() => {
    if (!loaderRef.current || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );

    observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, [loaderRef.current, hasMore]);

  return (
    <div className="all-movies-section">
      <h2 className="category-title">
        {selectedGenre
          ? `Showing ${selectedGenre.replace(/_/g, ' ')}`
          : 'All Movies'}
      </h2>

      <div className="movie-grid">
        {movies.map((movie, index) => (
          <MovieCard
            key={`${movie.show_id}-${index}`}
            movie={movie}
            onClick={() => onMovieClick(movie)}
          />
        ))}
      </div>

      <div ref={loaderRef} className="loader-trigger">
        {isLoading && <p>Loading more...</p>}
        {!isLoading && !hasMore && <p>No more movies!</p>}
      </div>
    </div>
  );
};

export default AllMoviesGrid;
