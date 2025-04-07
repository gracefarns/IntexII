import React from 'react';
import { Movie } from '../types/Movie';

interface MovieDetailProps {
  movie: Movie;
}

const MovieDetail: React.FC<MovieDetailProps> = ({ movie }) => {
  return (
    <div
      className="movie-detail-container"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        backgroundColor: '#141414',
        color: '#fff',
        minHeight: '100vh',
      }}
    >
      {/* Movie Banner/Image Placeholder */}
      <div
        className="movie-image"
        style={{
          width: '100%',
          height: '500px',
          backgroundColor: '#333',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.5rem',
        }}
      >
        {/* Replace this with an <img> tag when ready */}
        Movie Image Placeholder
      </div>

      {/* Movie Information */}
      <div
        className="movie-info"
        style={{ maxWidth: '800px', textAlign: 'left' }}
      >
        <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>
          {movie.title}
        </h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '20px' }}>
          {movie.description}
        </p>
        <div style={{ marginBottom: '10px' }}>
          <strong>Rating:</strong> {movie.rating}
        </div>
        <div style={{ marginBottom: '10px' }}>
          <strong>Release Year:</strong> {movie.release_year}
        </div>
        <div style={{ marginBottom: '10px' }}>
          <strong>Director:</strong> {movie.director}
        </div>
        <div style={{ marginBottom: '10px' }}>
          <strong>Cast:</strong> {movie.cast}
        </div>
        <div style={{ marginBottom: '10px' }}>
          <strong>Duration:</strong> {movie.duration}
        </div>
        <div style={{ marginBottom: '10px' }}>
          <strong>Country:</strong> {movie.country}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
