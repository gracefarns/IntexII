import React, { useState } from 'react';
import { SimilarMovies } from '../types/SimilarMovies';
import MovieRecommendation from './MovieRecommendation';
import '../styles/MovieRecommendationCarousel.css';

interface MovieRecommendationCarouselProps {
  recommendations: SimilarMovies[];
}

const MovieRecommendationCarousel: React.FC<
  MovieRecommendationCarouselProps
> = ({ recommendations }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const itemsPerScreen = 4;
  const maxScroll = Math.max(0, recommendations.length - itemsPerScreen);

  const scrollLeft = () => {
    setScrollPosition(Math.max(0, scrollPosition - 1));
  };

  const scrollRight = () => {
    setScrollPosition(Math.min(maxScroll, scrollPosition + 1));
  };

  return (
    <div className="recommendation-carousel-container">
      <h2 className="recommendation-carousel-title">You Might Also Like...</h2>

      <div className="recommendation-carousel-wrapper">
        {/* Left arrow */}
        {scrollPosition > 0 && (
          <button
            onClick={scrollLeft}
            className="carousel-arrow carousel-arrow-left"
          >
            &lt;
          </button>
        )}

        {/* Carousel container */}
        <div className="carousel-overflow-container">
          <div
            className="carousel-items-container"
            style={{
              transform: `translateX(-${scrollPosition * 220}px)`,
            }}
          >
            {recommendations.map((recommendation) => (
              <MovieRecommendation
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
            className="carousel-arrow carousel-arrow-right"
          >
            &gt;
          </button>
        )}
      </div>
    </div>
  );
};

export default MovieRecommendationCarousel;
