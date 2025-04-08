import React, { useEffect, useRef } from 'react';
import '../styles/MovieCarousel.css';

const MovieCarousel: React.FC = () => {
  console.log('Rendering MovieCarousel');
  const carouselRef = useRef<HTMLDivElement>(null);
  const scrollPos = useRef(0);

  const movies = [
    { title: 'A Monster Calls', image: '/assets/movies/A Monster Calls.jpg' },
    { title: 'A Sun', image: '/assets/movies/A Sun.jpg' },
    {
      title: 'A Taiwanese Tale of Two Cities',
      image: '/assets/movies/A Taiwanese Tale of Two Cities.jpg',
    },
    {
      title: 'A Thousand Goodnights',
      image: '/assets/movies/A Thousand Goodnights.jpg',
    },
    { title: 'A Touch of Green', image: '/assets/movies/A Touch of Green.jpg' },
    { title: 'Alone', image: '/assets/movies/Alone.jpg' },
    { title: 'American Outlaws', image: '/assets/movies/American Outlaws.jpg' },
    { title: 'Arrow', image: '/assets/movies/Arrow.jpg' },
    { title: 'Arthur', image: '/assets/movies/Arthur.jpg' },
    { title: 'At All Costs', image: '/assets/movies/At All Costs.jpg' },
    {
      title: 'At Eternitys Gate',
      image: '/assets/movies/At Eternitys Gate.jpg',
    },
    { title: 'Athlete A', image: '/assets/movies/Athlete A.jpg' },
    { title: 'Attack on Titan', image: '/assets/movies/Attack on Titan.jpg' },
    { title: 'Beat Bugs', image: '/assets/movies/Beat Bugs.jpg' },
    {
      title: 'Becoming Champions',
      image: '/assets/movies/Becoming Champions.jpg',
    },
  ];

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    let animationFrameId: number;

    const animate = () => {
      const maxScroll = carousel.scrollWidth - carousel.clientWidth;
      scrollPos.current =
        scrollPos.current + 0.5 >= maxScroll ? 0 : scrollPos.current + 0.5;
      carousel.scrollLeft = scrollPos.current;
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const scrollByOffset = (offset: number) => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section className="carousel-section">
      <h2 className="carousel-title">Featured Movies</h2>

      <div className="carousel-wrapper">
        <div className="fade fade-left" />
        <div className="fade fade-right" />

        <button
          className="carousel-arrow left"
          onClick={() => scrollByOffset(-300)}
        >
          ‹
        </button>
        <button
          className="carousel-arrow right"
          onClick={() => scrollByOffset(300)}
        >
          ›
        </button>

        <div className="carousel" ref={carouselRef}>
          {movies.map((movie, index) => (
            <div className="carousel-item" key={index}>
              <img
                className="movie-poster"
                src={encodeURI(movie.image)}
                alt={movie.title}
              />
              <div className="movie-label">{movie.title}</div>
              <button className="journey-button">Start your Journey</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MovieCarousel;
