import React, { useState } from 'react';
import { SimilarMovies } from '../types/SimilarMovies';
import MovieRecommendations from './MovieRecommendations';

interface MovieRecommendationCarouselProps {
  recommendations: SimilarMovies[];
}

const MovieRecommendationCarousel: React.FC<
  MovieRecommendationCarouselProps
> = ({ recommendations }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const itemsPerScreen = 4;
  const maxScroll = Math.max(0, recommendations.length - itemsPerScreen);

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

  const scrollLeft = () => {
    setScrollPosition(Math.max(0, scrollPosition - 1));
  };

  const scrollRight = () => {
    setScrollPosition(Math.min(maxScroll, scrollPosition + 1));
  };

  return (
    <div style={{ marginTop: '40px', marginBottom: '40px' }}>
      <h2
        style={{
          color: colors.cream,
          marginBottom: '20px',
          fontSize: '24px',
          fontWeight: 'bold',
          borderBottom: `2px solid ${colors.brightTeal}`,
          paddingBottom: '10px',
        }}
      >
        Similar Movies You Might Enjoy
      </h2>

      <div style={{ position: 'relative' }}>
        {/* Left arrow */}
        {scrollPosition > 0 && (
          <button
            onClick={scrollLeft}
            style={{
              position: 'absolute',
              left: '-40px',
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: colors.teal,
              color: colors.cream,
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
              fontSize: '24px',
              zIndex: 2,
            }}
          >
            &lt;
          </button>
        )}

        {/* Carousel container */}
        <div
          style={{
            display: 'flex',
            overflowX: 'hidden',
            padding: '20px 0',
            position: 'relative',
          }}
        >
          <div
            style={{
              display: 'flex',
              transform: `translateX(-${scrollPosition * 220}px)`,
              transition: 'transform 0.5s ease',
            }}
          >
            {recommendations.map((recommendation) => (
              <MovieRecommendations
                key={`${recommendation.source_show_id}-${recommendation.rec_show_id}`}
                recommendation={recommendation}
              />
            ))}
          </div>
        </div>

        {/* Right arrow */}
        {scrollPosition < maxScroll && (
          <button
            onClick={scrollRight}
            style={{
              position: 'absolute',
              right: '-40px',
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: colors.teal,
              color: colors.cream,
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
              fontSize: '24px',
              zIndex: 2,
            }}
          >
            &gt;
          </button>
        )}
      </div>
    </div>
  );
};

export default MovieRecommendationCarousel;
