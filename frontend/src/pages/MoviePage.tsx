import React, { useState, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/MoviePage.css';

// Define types
type Movie = {
  id: number;
  title: string;
  year: number;
  rating: number;
};

type Category = {
  id: string;
  title: string;
  movies: Movie[];
};

const MoviePage: React.FC = () => {
  // Generate sample movie data
  const generateSampleMovies = (count: number, prefix: string): Movie[] => {
    return Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      title: `${prefix} Movie ${i + 1}`,
      year: 2020 + Math.floor(Math.random() * 5),
      rating: 5 + Math.random() * 5,
    }));
  };

  // Create sample categories
  const categories: Category[] = [
    {
      id: 'recommended',
      title: 'Recommended for you',
      movies: generateSampleMovies(15, 'Recommended'),
    },
    {
      id: 'top-picks',
      title: 'Top Picks',
      movies: generateSampleMovies(15, 'Top'),
    },
    {
      id: 'action',
      title: 'Action',
      movies: generateSampleMovies(15, 'Action'),
    },
    {
      id: 'comedy',
      title: 'Comedy',
      movies: generateSampleMovies(15, 'Comedy'),
    },
    {
      id: 'romance',
      title: 'Romance',
      movies: generateSampleMovies(15, 'Romance'),
    },
  ];

  // Movie card component
  const MovieCard: React.FC<{ movie: Movie }> = ({ movie }) => {
    return (
      <div className="movie-card">
        <div className="movie-poster">
          <div className="movie-image-placeholder"></div>
          <div className="movie-overlay">
            <div className="overlay-controls">
              <button className="control-button play-button">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              </button>
              <button className="control-button add-button">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </button>
              <button className="control-button info-button">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="movie-info">
          <h3 className="movie-title">{movie.title}</h3>
          <div className="movie-meta">
            <span className="movie-year">{movie.year}</span>
            <span className="movie-rating">{movie.rating.toFixed(1)}</span>
          </div>
        </div>
      </div>
    );
  };

  // Carousel component for each category
  const MovieCarousel: React.FC<{ category: Category }> = ({ category }) => {
    const carouselRef = useRef<HTMLDivElement>(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);

    const scroll = (direction: 'left' | 'right') => {
      if (!carouselRef.current) return;

      const scrollAmount = carouselRef.current.clientWidth * 0.8;
      const newScrollLeft =
        direction === 'left'
          ? carouselRef.current.scrollLeft - scrollAmount
          : carouselRef.current.scrollLeft + scrollAmount;

      carouselRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth',
      });

      // Update arrow visibility after scroll animation
      setTimeout(() => {
        if (!carouselRef.current) return;
        setShowLeftArrow(carouselRef.current.scrollLeft > 10);
        setShowRightArrow(
          carouselRef.current.scrollLeft + carouselRef.current.clientWidth <
            carouselRef.current.scrollWidth - 10
        );
      }, 500);
    };

    return (
      <div className="movie-category">
        <div className="category-header">
          <h2 className="category-title">{category.title}</h2>
          <div className="category-controls">
            <button className="see-all-button">Explore All</button>
          </div>
        </div>

        <div className="carousel-container">
          {showLeftArrow && (
            <button
              className="carousel-arrow carousel-arrow-left"
              onClick={() => scroll('left')}
              aria-label="Scroll left"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
          )}

          <div className="movie-carousel" ref={carouselRef}>
            {category.movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>

          {showRightArrow && (
            <button
              className="carousel-arrow carousel-arrow-right"
              onClick={() => scroll('right')}
              aria-label="Scroll right"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          )}
        </div>
      </div>
    );
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');

  const genres = [
    'Action',
    'Adventure',
    'Comedy',
    'Drama',
    'Horror',
    'Romance',
    'Sci-Fi',
    'Thriller',
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleGenreChange = (genre: string) => {
    setSelectedGenre(genre === selectedGenre ? '' : genre);
  };

  return (
    <>
      <Navbar />
      <div className="movie-page">
        <div className="hero-section">
          <div className="featured-content">
            <h1 className="featured-title">Discover Movies</h1>
            <p className="featured-description">
              Millions of movies to discover. Explore now.
            </p>
          </div>

          <div className="search-filter-container">
            <div className="search-box">
              <svg
                className="search-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
                type="text"
                placeholder="Search for movies..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="search-input"
              />
            </div>

            <div className="genre-filters">
              {genres.map((genre) => (
                <button
                  key={genre}
                  className={`genre-button ${selectedGenre === genre ? 'active' : ''}`}
                  onClick={() => handleGenreChange(genre)}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="main-content">
          {categories.map((category) => (
            <MovieCarousel key={category.id} category={category} />
          ))}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default MoviePage;
