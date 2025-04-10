import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Movie } from '../types/Movie';
import { SimilarMovies } from '../types/SimilarMovies';
import '../styles/MovieDetailPage.css';

const MovieDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [recommendations, setRecommendations] = useState<SimilarMovies[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingRecommendations, setLoadingRecommendations] =
    useState<boolean>(true);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [posterError, setPosterError] = useState<boolean>(false);

  // Function to clean movie titles for image URLs
  const cleanTitleForImageUrl = (title: string): string => {
    // Remove all special characters (keeping only letters, numbers, and spaces)
    const cleanedTitle = title.replace(/[^a-zA-Z0-9 ]/g, '');
    // Replace multiple spaces with single space
    return cleanedTitle.replace(/\s+/g, ' ');
  };

  // Reset states when ID changes and fetch data
  useEffect(() => {
    setLoading(true);
    setLoadingRecommendations(true);
    setPosterError(false);

    // Scroll to top when navigating to a new movie
    window.scrollTo(0, 0);

    // Fetch movie details
    fetch(`https://localhost:5000/Movie/GetSingleMovie/${id}`, {
      method: 'GET',
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        setMovie(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching movie:', err);
        setLoading(false);
      });

    // Fetch movie recommendations
    fetch(`https://localhost:5000/Recommendation/ForMovie/${id}`, {
      method: 'GET',
      credentials: 'include',
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch recommendations');
        }
        return res.json();
      })
      .then((data) => {
        if (data && data.length > 0) {
          setRecommendations(data);
        } else {
          // Fallback to recommendations for a random movie from the list if no recommendations can be found
          const fallbackIds = [11, 1005, 1006, 1007, 1018, 1028, 1037];
          const randomFallbackId =
            fallbackIds[Math.floor(Math.random() * fallbackIds.length)];
          return fetch(
            `https://ambitious-sky-052f4611e.6.azurestaticapps.net/${randomFallbackId}`,
            {
              method: 'GET',
              credentials: 'include',
            }
          )
            .then((res) => res.json())
            .then((fallbackData) => {
              setRecommendations(fallbackData);
            });
        }
      })
      .catch((err) => {
        console.error('Error fetching recommendations:', err);
        // Fallback to recommendations for a random movie from the list
        const fallbackIds = [11, 1005, 1006, 1007, 1018, 1028, 1037];
        const randomFallbackId =
          fallbackIds[Math.floor(Math.random() * fallbackIds.length)];
        fetch(
          `https://ambitious-sky-052f4611e.6.azurestaticapps.net/${randomFallbackId}`,
          {
            method: 'GET',
            credentials: 'include',
          }
        )
          .then((res) => res.json())
          .then((fallbackData) => {
            setRecommendations(fallbackData);
          })
          .catch((fallbackErr) => {
            console.error(
              'Error fetching fallback recommendations:',
              fallbackErr
            );
          })
          .finally(() => {
            setLoadingRecommendations(false);
          });
      })
      .finally(() => {
        setLoadingRecommendations(false);
      });
  }, [id]); // This ensures the effect runs when the ID changes

  const getPrimaryGenre = (movie: Movie): string => {
    const genreMap: Record<string, number> = {
      Action: movie.action,
      Adventure: movie.adventure,
      Anime: movie.anime,
      'British Docuseries': movie.british_Docuseries,
      Children: movie.children,
      Comedies: movie.comedies,
      'Comedies Dramas': movie.comedies_Dramas,
      'Comedies International': movie.comedies_International,
      'Comedies Romantic': movie.comedies_Romantic,
      'Crime TV': movie.crime_TV,
      Documentaries: movie.documentaries,
      'Documentaries International': movie.documentaries_International,
      Docuseries: movie.docuseries,
      Dramas: movie.dramas,
      'Dramas International': movie.dramas_International,
      'Dramas Romantic': movie.dramas_Romantic,
      Family: movie.family,
      Fantasy: movie.fantasy,
      Horror: movie.horror,
      'International Thrillers': movie.international_Thrillers,
      'International Romantic Dramas TV':
        movie.international_Romantic_Dramas_TV,
      'Kids TV': movie.kids_TV,
      'Language TV': movie.language_TV,
      Musicals: movie.musicals,
      'Nature TV': movie.nature_TV,
      'Reality TV': movie.reality_TV,
      Spirituality: movie.spirituality,
      'TV Action': movie.tV_Action,
      'TV Comedies': movie.tV_Comedies,
      'TV Dramas': movie.tV_Dramas,
      'Talk Shows': movie.talk_Shows,
      Thrillers: movie.thrillers,
    };

    let maxGenre = 'Unknown';
    let maxValue = 0;

    for (const [genre, value] of Object.entries(genreMap)) {
      if (value > maxValue) {
        maxValue = value;
        maxGenre = genre;
      }
    }

    return maxGenre;
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -800, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 800, behavior: 'smooth' });
    }
  };

  // Image error handling for movie poster
  const handlePosterError = () => {
    setPosterError(true);
  };

  // Render star rating based on movie rating
  const renderStarRating = (rating: string) => {
    // Convert rating to a number between 0-5
    const numericRating = parseFloat(rating) || 0;
    const starRating = Math.min(5, Math.max(0, Math.round(numericRating)));

    return (
      <>
        {Array.from({ length: 5 }, (_, index) => (
          <span
            key={index}
            className={`star ${index < starRating ? 'filled' : 'empty'}`}
          >
            {index < starRating ? '★' : '☆'}
          </span>
        ))}
      </>
    );
  };

  // Handle recommendation click to refresh the entire page with new movie data
  const handleRecommendationClick = (recId: string) => {
    navigate(`/moviedetails/${recId}`);
  };

  if (loading) return <div className="loading-container">Loading...</div>;
  if (!movie) return <div className="loading-container">Movie not found.</div>;

  const primaryGenre = getPrimaryGenre(movie);

  // Use a default poster URL if the image doesn't exist
  const fallbackPosterUrl = '/assets/movies/DefaultMoviePoster.jpg';
  const posterUrl = !posterError
    ? `https://cinenicheblobcontainer.blob.core.windows.net/posters/resized_images/${encodeURIComponent(
        cleanTitleForImageUrl(movie.title)
      )}.jpg`
    : fallbackPosterUrl;

  return (
    <div className="movie-detail-page">
      {/* Hero Section */}
      <div className="movie-hero">
        <div
          className="hero-backdrop"
          style={{ backgroundImage: `url(${posterUrl})` }}
        ></div>
        <div className="hero-gradient"></div>
        <div className="hero-content">
          <div className="movie-poster">
            {!posterError ? (
              <img
                src={posterUrl}
                alt={movie.title}
                onError={handlePosterError}
                className="poster-image"
              />
            ) : (
              <img
                src={fallbackPosterUrl}
                alt="Default Poster"
                className="poster-image"
              />
            )}
          </div>

          <div className="movie-info">
            <h1 className="movie-title">{movie.title}</h1>

            {/* Condensed metadata (year, genre, duration) */}
            <div className="movie-meta">
              <span className="meta-item">
                {movie.release_year} — {primaryGenre} — {movie.duration}
              </span>
            </div>

            {/* Rating row */}
            <div className="movie-rating">
              <div className="rating-stars">
                {renderStarRating(movie.rating)}
              </div>
              <span className="rating-text">{movie.rating}</span>
            </div>

            {/* Buttons and description */}
            <div className="movie-buttons">
              <button className="btn-play">
                <span className="play-icon">▶</span> Play
              </button>
              <button className="btn-watchlist">+ My List</button>
            </div>

            {/* Additional details merged below the description */}
            <div className="movie-additional-details">
              <h2 className="details-title">About {movie.title}</h2>
              <div className="movie-description">
                {movie.description || 'No description available.'}
              </div>
              <div className="additional-details-grid">
                <div className="details-item">
                  <span className="details-label">Director</span>
                  <span className="details-value">
                    {movie.director || 'Not available'}
                  </span>
                </div>
                <div className="details-item">
                  <span className="details-label">Cast</span>
                  <span className="details-value">
                    {movie.cast || 'Not available'}
                  </span>
                </div>
                <div className="details-item">
                  <span className="details-label">Country</span>
                  <span className="details-value">
                    {movie.country || 'Not available'}
                  </span>
                </div>
                <div className="details-item">
                  <span className="details-label">Type</span>
                  <span className="details-value">
                    {movie.type || 'Not available'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations Section */}
      <div className="recommendations-section">
        {loadingRecommendations ? (
          <div className="loading-recommendations">
            Loading recommendations...
          </div>
        ) : recommendations.length > 0 ? (
          <div className="recommendation-carousel-container">
            <h2 className="sigma-title">More Like This...</h2>
            <div className="recommendation-carousel-wrapper">
              {/* Left arrow */}
              <button
                onClick={scrollLeft}
                className="carousel-arrow carousel-arrow-left"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 18L9 12L15 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {/* Carousel container */}
              <div className="carousel-overflow-container" ref={carouselRef}>
                <div className="carousel-items-container">
                  {recommendations.map((recommendation) => {
                    // Fixed TypeScript error by converting rec_show_id to string
                    const recId = String(recommendation.rec_show_id);
                    // Update the recPosterUrl to use the cleaned recommendation title
                    const recPosterUrl = `https://cinenicheblobcontainer.blob.core.windows.net/posters/resized_images/${encodeURIComponent(
                      cleanTitleForImageUrl(recommendation.rec_title)
                    )}.jpg`;
                    return (
                      <div
                        key={`${recommendation.source_show_id}-${recommendation.rec_show_id}`}
                        className="movie-recommendation-link"
                        onClick={() => handleRecommendationClick(recId)}
                      >
                        <div className="movie-recommendation-card">
                          <div className="recommendation-rank-badge">
                            {recommendation.rec_rank}
                          </div>
                          <div className="recommendation-image-container">
                            <img
                              src={recPosterUrl}
                              alt={recommendation.rec_title}
                              className="recommendation-image"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.onerror = null; // Prevent infinite loop
                                target.src =
                                  '/assets/movies/DefaultMoviePoster.jpg';
                              }}
                            />
                            <div className="recommendation-image-fallback">
                              <div className="recommendation-image-initial">
                                {recommendation.rec_title.charAt(0)}
                              </div>
                            </div>
                          </div>
                          <div className="recommendation-content">
                            <h3 className="recommendation-title">
                              {recommendation.rec_title}
                            </h3>
                            <div className="recommendation-genre">
                              {recommendation.rec_genre || 'Unknown Genre'}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right arrow */}
              <button
                onClick={scrollRight}
                className="carousel-arrow carousel-arrow-right"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 18L15 12L9 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        ) : (
          <div className="no-recommendations">
            No recommendations available for this movie.
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetailPage;
