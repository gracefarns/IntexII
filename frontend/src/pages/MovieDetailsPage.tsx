import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MovieDetail from '../components/MovieDetail';
import { Movie } from '../types/Movie';

const MovieDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Replace with your actual API endpoint for fetching a single movie
    fetch(`https://localhost:5000/Movie/GetSingleMovie/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setMovie(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!movie) return <div>Movie not found.</div>;

  return <MovieDetail movie={movie} />;
};

export default MovieDetailPage;
