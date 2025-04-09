import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MovieDetail from '../components/MovieDetail';
import MovieRecommendationCarousel from '../components/MovieRecommendationCarousel';
import { Movie } from '../types/Movie';
import { SimilarMovies } from '../types/SimilarMovies';
import './MovieDetailPage.css';

const MovieDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [recommendations, setRecommendations] = useState<SimilarMovies[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingRecommendations, setLoadingRecommendations] =
    useState<boolean>(true);

  useEffect(() => {
    // Fetch movie details
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
        setRecommendations(data);
        setLoadingRecommendations(false);
      })
      .catch((err) => {
        console.error('Error fetching recommendations:', err);
        setLoadingRecommendations(false);
      });
  }, [id]);

  if (loading) return <div className="loading-container">Loading...</div>;

  if (!movie) return <div className="loading-container">Movie not found.</div>;

  return (
    <div className="movie-detail-page">
      <div className="movie-detail-container">
        <MovieDetail movie={movie} />
      </div>

      <div className="recommendations-section">
        {loadingRecommendations ? (
          <div className="loading-recommendations">
            Loading recommendations...
          </div>
        ) : recommendations.length > 0 ? (
          <MovieRecommendationCarousel recommendations={recommendations} />
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
