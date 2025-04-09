import React, { useState, useEffect } from 'react';
import { Movie } from '../types/Movie'; // Use the centralized Movie type from your database
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { fetchMovies } from '../api/MoviesAPI'; // Reuse your API function for fetching movies
import '../styles/MoviePage.css';
import SearchResults from '../components/SearchResults';
import { useNavigate } from 'react-router-dom';
import RecommendationCarousel from '../components/RecommendationCarousel';

const MoviePage: React.FC = () => {
  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const navigate = useNavigate();
  const [top10Recs, setTop10Recs] = useState<Movie[]>([]);
  const [genreRecs, setGenreRecs] = useState<
    { genre: string; movies: Movie[] }[]
  >([]);

  const fetchMovieById = async (id: string | number) => {
    const res = await fetch(
      `https://intex-backend-fmb8dnaxb0dkd8gv.eastus-01.azurewebsites.net/Movie/GetSingleMovie/${id}`,
      {
        credentials: 'include',
      }
    );
    if (!res.ok) throw new Error(`Failed to fetch movie ${id}`);
    return await res.json();
  };

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const res = await fetch(
          'https://localhost:5000/Recommendation/personalized',
          {
            credentials: 'include',
          }
        );

        const data = await res.json();

        // Fetch full movie details for top 10
        const topMovies = await Promise.all(
          Object.values(data.top10)
            .filter((id) => id)
            .map((id) => fetchMovieById(String(id)))
        );

        setTop10Recs(topMovies);

        // Fetch genre-based movies
        const genreMovieGroups = await Promise.all(
          data.byGenre.map(async (g: any) => {
            const movies = await Promise.all(
              g.recs
                .filter((id: string) => id)
                .map((id: string) => fetchMovieById(id))
            );

            return { genre: g.genre, movies };
          })
        );

        setGenreRecs(genreMovieGroups);
      } catch (err) {
        console.error('Error fetching recommendations:', err);
      }
    };

    fetchRecommendations();
  }, []);

  // Debounce search: only search after 300ms of inactivity to minimize API calls.
  useEffect(() => {
    if (searchQuery.trim() === '') {
      // Clear results and hide popup if the search query is empty.
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    const timeoutId = setTimeout(() => {
      // Assuming your fetchMovies API takes (pageSize, pageNum, containers, searchTerm)
      fetchMovies(10, 1, [], searchQuery)
        .then((data) => {
          setSearchResults(data.movies);
          setShowSearchResults(true);
        })
        .catch((error) => {
          console.error('Search error:', error);
          setSearchResults([]);
          setShowSearchResults(false);
        });
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // Function to handle clicking a search result
  const handleResultClick = (movie: Movie) => {
    navigate(`/moviedetails/${movie.show_id}`);

    console.log('Clicked movie:', movie); //debug
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
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
          </div>
        </div>

        {showSearchResults && (
          <SearchResults
            results={searchResults}
            onMovieClick={handleResultClick}
          />
        )}

        {/* Main Content - can be used for other information, like featured movies */}
        <div className="main-content">
          <div className="recommendation-section">
            {top10Recs.length > 0 && (
              <RecommendationCarousel
                title="You’ll Love These"
                movies={top10Recs}
                onClickMovie={(movie) =>
                  navigate(`/moviedetails/${movie.show_id}`)
                }
              />
            )}

            {genreRecs.map((g) => (
              <RecommendationCarousel
                key={g.genre}
                title={`Top ${g.genre}`}
                movies={g.movies}
                onClickMovie={(movie) =>
                  navigate(`/moviedetails/${movie.show_id}`)
                }
              />
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default MoviePage;
