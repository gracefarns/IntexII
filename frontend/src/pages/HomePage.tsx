import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/HomePage.css';
import MovieCarousel from '../components/MovieCarousel';
import FAQSection from '../components/FAQSection';

const HomePage: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="homepage">
        <div className="content">
          <MovieCarousel />
          <FAQSection />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
