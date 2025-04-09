import React from 'react';
import { SimilarMovies } from '../types/SimilarMovies';
import { Link } from 'react-router-dom';
import '../styles/MovieRecommendation.css';

interface MovieRecommendationProps {
  recommendation: SimilarMovies;
}

const MovieRecommendation: React.FC<MovieRecommendationProps> = ({
  recommendation,
}) => {
  return (
    <Link
      to={`/movie/${recommendation.rec_show_id}`}
      className="movie-recommendation-link"
    >
      <div
        className="movie-recommendation-card"
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.4)';
          e.currentTarget.style.zIndex = '10';
          e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.zIndex = '1';
          e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        }}
      >
        {/* Badge for rank */}
        <div className="recommendation-rank-badge">
          {recommendation.rec_rank}
        </div>

        {/* Placeholder image */}
        <div className="recommendation-image-placeholder">
          <div className="recommendation-image-initial">
            {recommendation.rec_title.charAt(0)}
          </div>
        </div>

        {/* Movie title */}
        <h3 className="recommendation-title">{recommendation.rec_title}</h3>

        {/* Genre */}
        <div className="recommendation-genre">{recommendation.rec_genre}</div>
      </div>
    </Link>
  );
};

export default MovieRecommendation;
