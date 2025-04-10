import React, { useState, useEffect } from 'react';
import { Movie } from '../types/Movie';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { fetchMovies } from '../api/MoviesAPI';
import '../styles/MoviePage.css';
import SearchResults from '../components/SearchResults';
import { useNavigate } from 'react-router-dom';
import RecommendationCarousel from '../components/RecommendationCarousel';
import AllMoviesGrid from '../components/AllMoviesGrid'; // 🔥 New import

const MoviePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const navigate = useNavigate();
  const [top10Recs, setTop10Recs] = useState<Movie[]>([]);
  const [genreRecs, setGenreRecs] = useState<
    { genre: string; movies: Movie[] }[]
  >([]);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  const GENRE_MAP: { [label: string]: keyof Movie } = {
    Action: 'action',
    Adventure: 'adventure',
    Anime: 'anime',
    British_Docuseries: 'british_Docuseries',
    Children: 'children',
    Comedies: 'comedies',
    Comedies_Dramas: 'comedies_Dramas',
    Comedies_International: 'comedies_International',
    Comedies_Romantic: 'comedies_Romantic',
    Crime_TV: 'crime_TV',
    Documentaries: 'documentaries',
    Documentaries_International: 'documentaries_International',
    Docuseries: 'docuseries',
    Dramas: 'dramas',
    Dramas_International: 'dramas_International',
    Dramas_Romantic: 'dramas_Romantic',
    Family: 'family',
    Fantasy: 'fantasy',
    Horror: 'horror',
    International_Thrillers: 'international_Thrillers',
    International_Romantic_Dramas_TV: 'international_Romantic_Dramas_TV',
    Kids_TV: 'kids_TV',
    Language_TV: 'language_TV',
    Musicals: 'musicals',
    Nature_TV: 'nature_TV',
    Reality_TV: 'reality_TV',
    Spirituality: 'spirituality',
    TV_Action: 'tV_Action',
    TV_Comedies: 'tV_Comedies',
    TV_Dramas: 'tV_Dramas',
    Talk_Shows: 'talk_Shows',
    Thrillers: 'thrillers',
  };

  const GENRES = Object.keys(GENRE_MAP);

  const fetchMovieById = async (id: string | number) => {
    const res = await fetch(
      `https://intex-backend-fmb8dnaxb0dkd8gv.eastus-01.azurewebsites.net/Movie/GetSingleMovie/${id}`,
      { credentials: 'include' }
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

        const allowedGenres = [
          'Action',
          'Adventure',
          'Comedies',
          'Children',
          'Horror',
        ];
        const genreMovieGroups = await Promise.all(
          data.byGenre
            .filter((g: any) => allowedGenres.includes(g.genre))
            .map(async (g: any) => {
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
                title="Top 10 Picks For You"
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

            {/* 🔥 All Movies Infinite Scroll */}
            <AllMoviesGrid
              selectedGenre={selectedGenre}
              genreMap={GENRE_MAP}
              onMovieClick={handleResultClick}
            />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default MoviePage;
