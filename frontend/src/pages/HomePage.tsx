import { useState, useEffect, SetStateAction } from 'react';
import '../styles/HomePage.css';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
interface FaqItem {
  question: string;
  answer: string;
}
const mockGenres: (keyof typeof mockGenreHeroImages)[] = [
  'Action',
  'Drama',
  'Comedy',
  'Horror',
  'Sci-Fi',
  'Thriller',
  'Anime',
];
const mockGenreHeroImages = {
  Action: {
    id: 'action-hero',
    title: 'Action',
    imageUrl: '/assets/movies/Dune.jpg',
    description:
      'Explosive action content for thrill-seekers and adrenaline junkies.',
  },
  Drama: {
    id: 'drama-hero',
    title: 'Drama',
    imageUrl: '/assets/movies/Moonlight.jpg',
    description: 'Compelling stories of human emotion and struggle.',
  },
  Comedy: {
    id: 'comedy-hero',
    title: 'Comedy',
    imageUrl: '/assets/movies/Comedy.jpg',
    description: 'Laugh-out-loud entertainment for the whole family.',
  },
  Horror: {
    id: 'horror-hero',
    title: 'Horror',
    imageUrl: 'assets/movies/Heretic.jpg',
    description: 'Terrifying tales that will keep you up at night.',
  },
  'Sci-Fi': {
    id: 'scifi-hero',
    title: 'Sci-Fi',
    imageUrl: 'assets/movies/Silo.jpeg',
    description: 'Mind-bending journeys through space, time and imagination.',
  },
  Thriller: {
    id: 'thriller-hero',
    title: 'Thriller',
    imageUrl: 'assets/movies/Open.jpg',
    description: 'Edge-of-your-seat suspense and unexpected twists.',
  },
  Anime: {
    id: 'anime-hero',
    title: 'Anime',
    imageUrl: 'assets/movies/Anime.jpg',
    description:
      'Where epic battles, and endless imagination collide — feel the adrenaline, live the saga',
  },
};
const faqs: FaqItem[] = [
  {
    question: 'What is CineNiche?',
    answer:
      'CineNiche is a streaming platform dedicated to offering unique, curated content that mainstream services often overlook. We focus on independent films, international cinema, and niche genres that passionate movie lovers appreciate.',
  },
  {
    question: 'How do I sign up?',
    answer:
      "Signing up is easy! Click the 'Register' button at the top of the page, fill in your information, select a subscription plan, and start streaming your favorite niche content immediately.",
  },
  {
    question: 'What devices does CineNiche support?',
    answer:
      'CineNiche supports Windows, Mac, iOS, Android, Roku, AppleTV, GoogleTV, and more.',
  },
  {
    question: 'How do I contact support?',
    answer:
      "You can reach our support team by emailing support@cineniche.com or through the 'Help' section in your account menu. We're available 24/7 to assist with any questions or concerns.",
  },
];
export default function HomePage() {
  const [selectedGenre, setSelectedGenre] = useState(mockGenres[0]);
  const [currentHero, setCurrentHero] = useState(
    mockGenreHeroImages[mockGenres[0]]
  );
  const [expandedFaq, setExpandedFaq] = useState<null | number>(null);
  useEffect(() => {
    setCurrentHero(
      mockGenreHeroImages[selectedGenre] || mockGenreHeroImages[mockGenres[0]]
    );
  }, [selectedGenre]);
  const toggleFaq = (index: number ) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };
  const navigate = useNavigate();
  return (
    <div className="home-container">
      <header className="header">
        <div className="brand">
          <span className="brand-cine">Cine</span>
          <span className="brand-niche">Niche</span>
        </div>
      </header>
      <main>
        {/* Hero Section */}
        <div className="hero-section">
          {/* Left Panel - Branding */}
          <div className={`hero-left ${selectedGenre.toLowerCase()}`}>
            <div className="hero-content">
              <h1 className="hero-title">
                Not Mainstream.
                <br />
                Your Niche - Stream
              </h1>
              <h2 className="hero-subtitle">
                Find what the mainstream missed.
                <br />
                Stream your obsession
              </h2>
              <div className="hero-divider"></div>
              <div className="hero-buttons">
                <button
                  className="btn-signin"
                  onClick={() => navigate('/login')}
                >
                  Sign in
                </button>
                <button
                  className="btn-register"
                  onClick={() => navigate('/register')}
                >
                  Register
                </button>
              </div>
            </div>
            <div className="hero-footer">
              <div className="hero-links">
                <a href="#" className="footer-link">
                  Privacy Policy
                </a>
                <span>|</span>
                <a href="#" className="footer-link">
                  Help
                </a>
              </div>
            </div>
          </div>
          {/* Right Panel - Hero Image */}
          <div className="hero-right">
            <div className="genre-nav-container">
              <nav className="genre-nav">
                {mockGenres.map((genre) => (
                  <button
                    key={genre}
                    className={`genre-btn ${selectedGenre === genre ? 'active' : ''}`}
                    onClick={() => setSelectedGenre(genre)}
                  >
                    {genre}
                  </button>
                ))}
              </nav>
            </div>
            <div className="hero-image-container">
              <div className="genre-overlay">
                <h3 className="genre-title">{currentHero.title}</h3>
                <p className="genre-description">{currentHero.description}</p>
              </div>
              <img
                src={currentHero.imageUrl}
                alt={currentHero.title}
                className="hero-image"
              />
            </div>
          </div>
        </div>
      </main>
      {/* FAQ Section (below main, above footer) */}
      <div className="faq-section">
        <h2>
          Niche questions?{' '}
          <span className="italic-part">We’ve got niche answers</span>
        </h2>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <button className="faq-question" onClick={() => toggleFaq(index)}>
                {faq.question}
              </button>
              {expandedFaq === index && (
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}