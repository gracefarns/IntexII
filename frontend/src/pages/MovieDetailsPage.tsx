import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MovieDetail from '../components/MovieDetail';
import MovieRecommendationCarousel from '../components/MovieRecommendationCarousel';
import { Movie } from '../types/Movie';
import { SimilarMovies } from '../types/SimilarMovies';

const MovieDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [recommendations, setRecommendations] = useState<SimilarMovies[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingRecommendations, setLoadingRecommendations] =
    useState<boolean>(true);

  // Color palette
  const colors = {
    darkBlue: 'rgb(0, 18, 25)',
    teal: 'rgb(0, 95, 115)',
    brightTeal: 'rgb(10, 147, 150)',
    mint: 'rgb(148, 210, 189)',
    cream: 'rgb(233, 216, 166)',
    gold: 'rgb(238, 155, 0)',
    orange: 'rgb(202, 103, 2)',
    rust: 'rgb(187, 62, 3)',
    darkRed: 'rgb(174, 32, 18)',
    burgundy: 'rgb(155, 34, 38)',
  };

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
    fetch(
      `https://intex-backend-fmb8dnaxb0dkd8gv.eastus-01.azurewebsites.net/Movie/GetMovieRecommendations/${id}`,
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
        setRecommendations(data);
        setLoadingRecommendations(false);
      })
      .catch((err) => {
        console.error('Error fetching recommendations:', err);
        setLoadingRecommendations(false);
      });
  }, [id]);

  if (loading)
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          backgroundColor: colors.darkBlue,
          color: colors.cream,
        }}
      >
        Loading...
      </div>
    );

  if (!movie)
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          backgroundColor: colors.darkBlue,
          color: colors.cream,
        }}
      >
        Movie not found.
      </div>
    );

  return (
    <div
      style={{
        backgroundColor: colors.darkBlue,
        minHeight: '100vh',
        padding: '20px',
        color: colors.cream,
      }}
    >
      <MovieDetail movie={movie} />

      {loadingRecommendations ? (
        <div
          style={{
            textAlign: 'center',
            marginTop: '40px',
            color: colors.mint,
          }}
        >
          Loading recommendations...
        </div>
      ) : recommendations.length > 0 ? (
        <MovieRecommendationCarousel recommendations={recommendations} />
      ) : (
        <div
          style={{
            textAlign: 'center',
            marginTop: '40px',
            color: colors.mint,
            padding: '20px',
            backgroundColor: colors.teal,
            borderRadius: '8px',
          }}
        >
          No recommendations available for this movie.
        </div>
      )}
    </div>
  );
};

export default MovieDetailPage;
