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
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(8px)',
        color: '#fff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        overflow: 'auto',
      }}
    >
      {/* Content column - 60% width centered */}
      <div
        style={{
          width: '60%',
          maxHeight: '90vh',
          backgroundColor: '#181818',
          borderRadius: '8px',
          overflow: 'auto',
          boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)',
        }}
      >
        {/* Movie Banner/Image with actual <img> */}
        <div
          className="movie-image"
          style={{
            width: '100%',
            height: '400px',
            backgroundColor: '#333',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Image from Azure Blob */}
          <img
            src={`https://cinenicheblobcontainer.blob.core.windows.net/posters/resized_images/${encodeURIComponent(
              movie.title
            )}.jpg`}
            alt={`${movie.title} Poster`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
            onError={(e) => {
              e.currentTarget.src = '/placeholder.jpg'; // Local fallback image
            }}
          />

          {/* Dark gradient overlay for text visibility */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              height: '200px',
              background: 'linear-gradient(to top, #181818, transparent)',
            }}
          />

          {/* Movie title positioned at bottom of banner */}
          <div
            style={{
              position: 'absolute',
              bottom: '20px',
              left: '20px',
              right: '20px',
            }}
          >
            <h1
              style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                marginBottom: '10px',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
              }}
            >
              {movie.title}
            </h1>
          </div>
        </div>

        {/* Movie Information */}
        <div
          className="movie-info"
          style={{
            padding: '20px 30px 40px 30px',
            textAlign: 'left',
          }}
        >
          {/* Quick facts row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '15px',
              marginBottom: '20px',
              fontSize: '0.9rem',
            }}
          >
            <span style={{ color: '#46d369' }}>{movie.rating}</span>
            <span>{movie.release_year}</span>
            <span>{movie.duration}</span>
            <span
              style={{
                border: '1px solid rgba(255, 255, 255, 0.4)',
                padding: '1px 5px',
                fontSize: '0.8rem',
              }}
            >
              HD
            </span>
          </div>

          {/* Description */}
          <p
            style={{
              fontSize: '1.1rem',
              marginBottom: '25px',
              lineHeight: '1.5',
              color: '#d2d2d2',
            }}
          >
            {movie.description}
          </p>

          {/* Details with flexbox layout */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '15px 30px',
              fontSize: '0.95rem',
            }}
          >
            <div style={{ marginBottom: '10px' }}>
              <span style={{ color: '#777' }}>Director: </span>
              <span>{movie.director}</span>
            </div>
            <div style={{ marginBottom: '10px' }}>
              <span style={{ color: '#777' }}>Cast: </span>
              <span>{movie.cast}</span>
            </div>
            <div style={{ marginBottom: '10px' }}>
              <span style={{ color: '#777' }}>Country: </span>
              <span>{movie.country}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
