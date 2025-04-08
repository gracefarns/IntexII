import React from 'react';
import { SimilarMovies } from '../types/SimilarMovies';
import { Link } from 'react-router-dom';

interface MovieRecommendationProps {
  recommendation: SimilarMovies;
}

const MovieRecommendation: React.FC<MovieRecommendationProps> = ({
  recommendation,
}) => {
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

  return (
    <Link
      to={`/movie/${recommendation.rec_show_id}`}
      className="movie-recommendation-link"
    >
      <div
        className="movie-recommendation-card"
        style={{
          backgroundColor: colors.darkBlue,
          borderRadius: '8px',
          padding: '12px',
          margin: '10px',
          width: '200px',
          height: '280px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: `0 4px 6px rgba(0, 0, 0, 0.1)`,
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.4)';
          e.currentTarget.style.zIndex = '10';
          e.currentTarget.style.boxShadow = `0 10px 20px rgba(0, 0, 0, 0.2)`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.zIndex = '1';
          e.currentTarget.style.boxShadow = `0 4px 6px rgba(0, 0, 0, 0.1)`;
        }}
      >
        {/* Badge for rank */}
        <div
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            backgroundColor: colors.gold,
            color: colors.darkBlue,
            borderRadius: '50%',
            width: '30px',
            height: '30px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontWeight: 'bold',
            fontSize: '16px',
          }}
        >
          {recommendation.rec_rank}
        </div>

        {/* Placeholder image */}
        <div
          style={{
            height: '150px',
            backgroundColor: colors.teal,
            borderRadius: '4px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '10px',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: colors.mint,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: colors.darkBlue,
              fontSize: '20px',
              fontWeight: 'bold',
            }}
          >
            {recommendation.rec_title.charAt(0)}
          </div>
        </div>

        {/* Movie title */}
        <h3
          style={{
            margin: '0 0 8px',
            color: colors.cream,
            fontSize: '16px',
            fontWeight: 'bold',
            lineHeight: '1.2',
            height: '40px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {recommendation.rec_title}
        </h3>

        {/* Genre */}
        <div
          style={{
            backgroundColor: colors.brightTeal,
            color: colors.darkBlue,
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: 'bold',
            alignSelf: 'flex-start',
            marginTop: 'auto',
          }}
        >
          {recommendation.rec_genre}
        </div>
      </div>
    </Link>
  );
};

export default MovieRecommendation;
