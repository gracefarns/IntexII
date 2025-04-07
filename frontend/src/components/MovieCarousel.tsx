import React from 'react';
import '../styles/MovieCarousel.css';

const MovieCarousel: React.FC = () => {
  const movies = ['Movie1', 'Movie2', 'Movie3', 'Movie4', 'Movie5', 'Movie6'];
  return (
    <section className="carousel-section">
      <h2 className="carousel-title">Featured Movies</h2>
      <div className="carousel">
        {movies.map((movie, index) => (
          <div className="carousel-item" key={index}>
            <div className="movie-poster">{movie}</div>
            <button className="journey-button">Start your Journey</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MovieCarousel;
