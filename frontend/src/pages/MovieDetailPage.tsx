import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Movie } from '../types/Movie';
import { SimilarMovies } from '../types/SimilarMovies';
import '../styles/MovieDetailPage.css';
import Footer from '../components/Footer';
import Navbar_Logged from '../components/Navbar_Logged';

const MovieDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [recommendations, setRecommendations] = useState<SimilarMovies[]>([]);
  const [currentMovieRating, setCurrentMovieRating] = useState<
    number | undefined
  >(undefined);
  const [interactiveRating, setInteractiveRating] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingRecommendations, setLoadingRecommendations] =
    useState<boolean>(true);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [posterError, setPosterError] = useState<boolean>(false);
  const [mainPosterFallback, setMainPosterFallback] = useState<string>('');
  const [fallbackMapping, setFallbackMapping] = useState<{
    [key: string]: string;
  }>({});

  const fallbackImages = [
    'A Monster Calls.jpg',
    'A Sun.jpg',
    'A Taiwanese Tale of Two Cities.jpg',
    'A Thousand Goodnights.jpg',
    'A Touch of Green.jpg',
    'Alone.jpg',
    'American Outlaws.jpg',
    'Arrow.jpg',
    'Arthur.jpg',
    'At All Costs.jpg',
    'At Eternitys Gate.jpg',
    'Athlete A.jpg',
    'Attack on Titan.jpg',
    'Beat Bugs.jpg',
    'Becoming Champions.jpg',
    'DefaultMoviePoster.jpg',
  ];

  const cleanTitleForImageUrl = (title: string): string => {
    const cleanedTitle = title.replace(/[^A-Za-z0-9_\s]/g, '');
    return cleanedTitle.replace(/\s+/g, ' ');
  };

  useEffect(() => {
    setLoading(true);
    setLoadingRecommendations(true);
    setPosterError(false);
    setFallbackMapping({});
    setMainPosterFallback('');

    window.scrollTo(0, 0);

    // Fetch movie details.
    fetch(
      `https://intex-backend-fmb8dnaxb0dkd8gv.eastus-01.azurewebsites.net/Movie/GetSingleMovie/${id}`,
      {
        method: 'GET',
        credentials: 'include',
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setMovie(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching movie:', err);
        setLoading(false);
      });

    // Fetch recommendations (which now includes source_show_rating).
    fetch(
      `https://intex-backend-fmb8dnaxb0dkd8gv.eastus-01.azurewebsites.net/Recommendation/ForMovie/${id}`,
      {
        method: 'GET',
        credentials: 'include',
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch recommendations');
        }
        return res.json();
      })
      .then((data) => {
        if (data && data.recommendations) {
          setCurrentMovieRating(data.source_show_rating);

          if (data.recommendations.length === 0) {
            const fallbackIds = [
              2, 4, 5, 6, 11, 12, 18, 20, 22, 24, 26, 30, 31, 32, 36, 37, 41,
              42, 43, 46, 57, 58, 59, 61, 62, 64, 73, 88, 90, 92, 98, 115, 116,
              119, 120, 124, 127, 131, 146, 155, 162, 166, 167, 169, 175, 1005,
              1006, 1007, 1018, 1028, 1037,
            ];
            const randomFallbackId =
              fallbackIds[Math.floor(Math.random() * fallbackIds.length)];

            return fetch(
              `https://intex-backend-fmb8dnaxb0dkd8gv.eastus-01.azurewebsites.net/Recommendation/ForMovie/${randomFallbackId}`,
              {
                method: 'GET',
                credentials: 'include',
              }
            )
              .then((res) => res.json())
              .then((fallbackData) => {
                if (fallbackData && fallbackData.recommendations) {
                  setRecommendations(fallbackData.recommendations);
                } else if (fallbackData && fallbackData.length > 0) {
                  setRecommendations(fallbackData);
                } else {
                  setRecommendations([]);
                }
              });
          } else {
            setRecommendations(data.recommendations);
          }
        } else if (data && data.length > 0) {
          setRecommendations(data);
        } else {
          const fallbackIds = [
            2, 4, 5, 6, 11, 12, 18, 20, 22, 24, 26, 30, 31, 32, 36, 37, 41, 42,
            43, 46, 57, 58, 59, 61, 62, 64, 73, 88, 90, 92, 98, 115, 116, 119,
            120, 124, 127, 131, 146, 155, 162, 166, 167, 169, 175, 1005, 1006,
            1007, 1018, 1028, 1037,
          ];
          const randomFallbackId =
            fallbackIds[Math.floor(Math.random() * fallbackIds.length)];
          return fetch(
            `https://intex-backend-fmb8dnaxb0dkd8gv.eastus-01.azurewebsites.net/Recommendation/ForMovie/${randomFallbackId}`,
            {
              method: 'GET',
              credentials: 'include',
            }
          )
            .then((res) => res.json())
            .then((fallbackData) => {
              if (fallbackData && fallbackData.recommendations) {
                setRecommendations(fallbackData.recommendations);
              } else if (fallbackData && fallbackData.length > 0) {
                setRecommendations(fallbackData);
              } else {
                setRecommendations([]);
              }
            });
        }
      })
      .catch((err) => {
        console.error('Error fetching recommendations:', err);
        const fallbackIds = [11, 1005, 1006, 1007, 1018, 1028, 1037];
        const randomFallbackId =
          fallbackIds[Math.floor(Math.random() * fallbackIds.length)];
        fetch(
          `https://intex-backend-fmb8dnaxb0dkd8gv.eastus-01.azurewebsites.net/Recommendation/ForMovie/${randomFallbackId}`,
          {
            method: 'GET',
            credentials: 'include',
          }
        )
          .then((res) => res.json())
          .then((fallbackData) => {
            if (fallbackData && fallbackData.recommendations) {
              setRecommendations(fallbackData.recommendations);
            } else if (fallbackData && fallbackData.length > 0) {
              setRecommendations(fallbackData);
            } else {
              setRecommendations([]);
            }
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
  }, [id]);

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

  // Modified main poster error handler: accepts the event and sets the fallback immediately.
  const handleMainPosterError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    e.currentTarget.onerror = null;
    const selected =
      fallbackImages[Math.floor(Math.random() * fallbackImages.length)];
    e.currentTarget.src = `/assets/movies/${selected}`;
    setPosterError(true);
    setMainPosterFallback(selected);
  };

  // Function to render static numeric (1–5) star ratings.
  const renderStarRating = (rating: number | undefined) => {
    if (rating == null || isNaN(rating)) {
      return (
        <>
          {Array.from({ length: 5 }, (_, index) => (
            <span key={index} className="star empty">
              ☆
            </span>
          ))}
        </>
      );
    }
    const starRating = Math.round(rating);
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

  // Interactive star rating component for unrated movies.
  const InteractiveStarRating: React.FC = () => {
    const [hoverRating, setHoverRating] = useState<number>(0);
    return (
      <>
        {Array.from({ length: 5 }, (_, index) => {
          const starValue = index + 1;
          const filled =
            hoverRating > 0
              ? starValue <= hoverRating
              : starValue <= interactiveRating;
          return (
            <span
              key={index}
              className={`star ${filled ? 'filled' : 'empty'}`}
              onMouseEnter={() => setHoverRating(starValue)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => setInteractiveRating(starValue)}
              style={{ cursor: 'pointer' }}
            >
              {filled ? '★' : '☆'}
            </span>
          );
        })}
      </>
    );
  };

  const handleRecommendationClick = (recId: string) => {
    navigate(`/moviedetails/${recId}`);
  };

  if (loading) return <div className="loading-container">Loading...</div>;
  if (!movie) return <div className="loading-container">Movie not found.</div>;

  const primaryGenre = getPrimaryGenre(movie);

  // Determine main movie poster URL (using fallback if error occurs).
  const fallbackPosterUrl = '/assets/movies/DefaultMoviePoster.jpg';
  const posterUrl = !posterError
    ? `https://cinenicheblobcontainer.blob.core.windows.net/posters/resized_images/${encodeURIComponent(
        movie.title.replace(/[^A-Za-z0-9_\s]/g, '').trim()
      )}.jpg`
    : mainPosterFallback
      ? `/assets/movies/${mainPosterFallback}`
      : fallbackPosterUrl;

  return (
    <div className="movie-detail-page">
      <Navbar_Logged />
      <br />
      <br />
      <br />
      {/* Hero Section */}
      <div className="movie-hero">
        <div
          className="hero-backdrop"
          style={{ backgroundImage: `url(${posterUrl})` }}
        ></div>
        <div className="hero-gradient"></div>
        <div className="hero-content">
          <div className="movie-poster">
            <img
              src={posterUrl}
              alt={movie.title}
              onError={handleMainPosterError}
              className="poster-image"
            />
          </div>

          <div className="movie-info">
            <h1 className="movie-skibidi">{movie.title}</h1>
            <div className="movie-meta">
              <span className="meta-item">
                {movie.release_year} — {primaryGenre} — {movie.duration}
              </span>
            </div>
            <div className="movie-rating">
              <div className="rating-stars">
                {currentMovieRating && currentMovieRating > 0 ? (
                  renderStarRating(currentMovieRating)
                ) : (
                  <InteractiveStarRating />
                )}
              </div>
              <span className="rating-text">{movie.rating}</span>
            </div>
            <div className="movie-buttons">
              <button className="btn-play">
                <span className="play-icon">▶</span> Play
              </button>
              <button className="btn-watchlist">+ My List</button>
            </div>
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

              <div className="carousel-overflow-container" ref={carouselRef}>
                <div className="carousel-items-container">
                  {recommendations.map((recommendation) => {
                    const recId = String(recommendation.rec_show_id);
                    const recPosterUrl = `https://cinenicheblobcontainer.blob.core.windows.net/posters/resized_images/${encodeURIComponent(cleanTitleForImageUrl(recommendation.rec_title))}.jpg`;
                    return (
                      <div
                        key={`${recommendation.source_show_id}-${recommendation.rec_show_id}`}
                        className="movie-recommendation-link"
                        onClick={() => handleRecommendationClick(recId)}
                      >
                        <div className="movie-recommendation-card">
                          <div className="recommendation-image-container">
                            <img
                              src={
                                fallbackMapping[recId]
                                  ? `/assets/movies/${fallbackMapping[recId]}`
                                  : recPosterUrl
                              }
                              alt={recommendation.rec_title}
                              className="recommendation-image"
                              onError={(e) => {
                                if (!fallbackMapping[recId]) {
                                  const used = Object.values(fallbackMapping);
                                  const available = fallbackImages.filter(
                                    (img) => !used.includes(img)
                                  );
                                  const selected =
                                    available.length > 0
                                      ? available[
                                          Math.floor(
                                            Math.random() * available.length
                                          )
                                        ]
                                      : fallbackImages[
                                          Math.floor(
                                            Math.random() *
                                              fallbackImages.length
                                          )
                                        ];
                                  setFallbackMapping((prev) => ({
                                    ...prev,
                                    [recId]: selected,
                                  }));
                                  e.currentTarget.onerror = null;
                                  e.currentTarget.src = `/assets/movies/${selected}`;
                                } else {
                                  e.currentTarget.onerror = null;
                                  e.currentTarget.src = `/assets/movies/${fallbackMapping[recId]}`;
                                }
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
                            <div className="recommendation-rating">
                              {renderStarRating(recommendation.rating)}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

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
      <Footer />
    </div>
  );
};

export default MovieDetailPage;
