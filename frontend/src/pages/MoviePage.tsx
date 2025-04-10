import React, { useState, useEffect } from 'react';
import { Movie } from '../types/Movie';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { fetchMovies } from '../api/MoviesAPI';
import '../styles/MoviePage.css';
import SearchResults from '../components/SearchResults';
import { useNavigate } from 'react-router-dom';
import RecommendationCarousel from '../components/RecommendationCarousel';

const MoviePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const navigate = useNavigate();
  const [top10Recs, setTop10Recs] = useState<Movie[]>([]);
  const [genreRecs, setGenreRecs] = useState<
    { genre: string; movies: Movie[] }[]
  >([]);
  const [allMovies, setAllMovies] = useState<Movie[]>([]); // 🔥 NEW
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null); // 🔥 NEW

  const GENRES = [
    // 🔥 NEW
    'Action',
    'Adventure',
    'Anime',
    'British_Docuseries',
    'Children',
    'Comedies',
    'Comedies_Dramas',
    'Comedies_International',
    'Comedies_Romantic',
    'Crime_TV',
    'Documentaries',
    'Documentaries_International',
    'Docuseries',
    'Dramas',
    'Dramas_International',
    'Dramas_Romantic',
    'Family',
    'Fantasy',
    'Horror',
    'International_Thrillers',
    'International_Romantic_Dramas_TV',
    'Kids_TV',
    'Language_TV',
    'Musicals',
    'Nature_TV',
    'Reality_TV',
    'Spirituality',
    'TV_Action',
    'TV_Comedies',
    'TV_Dramas',
    'Talk_Shows',
    'Thrillers',
  ];

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

        const topMovies = await Promise.all(
          Object.values(data.top10)
            .filter((id) => id)
            .map((id) => fetchMovieById(String(id)))
        );

        setTop10Recs(topMovies);

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

  // 🔥 NEW: Fetch general movies on load
  useEffect(() => {
    fetchMovies(100, 1, [], '') // You can increase page size if needed
      .then((data) => setAllMovies(data.movies))
      .catch((err) => console.error('Error fetching all movies:', err));
  }, []);

  // ✏️ MODIFIED: Search query debounce logic
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    const timeoutId = setTimeout(() => {
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

  const handleResultClick = (movie: Movie) => {
    navigate(`/moviedetails/${movie.show_id}`);
    console.log('Clicked movie:', movie);
  };

  const filteredAllMovies = selectedGenre
    ? allMovies.filter((movie) => (movie as any)[selectedGenre] === 1)
    : allMovies; // 🔥 NEW

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

            {/* 🔥 NEW: Genre filter chips */}
            <div className="genre-chips">
              {GENRES.map((genre) => (
                <button
                  key={genre}
                  className={`genre-chip ${selectedGenre === genre ? 'selected' : ''}`}
                  onClick={() =>
                    setSelectedGenre(selectedGenre === genre ? null : genre)
                  }
                >
                  {genre.replace(/_/g, ' ')}
                </button>
              ))}
            </div>
          </div>
        </div>

        {showSearchResults && (
          <SearchResults
            results={searchResults}
            onMovieClick={handleResultClick}
          />
        )}

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

            {/* 🔥 NEW: Filtered "All Movies" section */}
            {filteredAllMovies.length > 0 && (
              <RecommendationCarousel
                title={
                  selectedGenre
                    ? `Showing ${selectedGenre.replace(/_/g, ' ')}`
                    : 'All Movies'
                }
                movies={filteredAllMovies}
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
