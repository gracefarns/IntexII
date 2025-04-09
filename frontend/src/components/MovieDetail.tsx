import React from 'react';
import { Movie } from '../types/Movie';
import '../styles/MovieDetail.css';

interface MovieDetailProps {
  movie: Movie;
}

const MovieDetail: React.FC<MovieDetailProps> = ({ movie }) => {
  // Function to determine the most prominent genre
  const getPrimaryGenre = (movie: Movie): string => {
    const genreMap: Record<string, number> = {
      Action: movie.action,
      Adventure: movie.adventure,
      Anime: movie.anime,
      'British Docuseries': movie.british_Docuseries,
      Children: movie.children,
      Comedies: movie.comedies,
      'Comedies Dramas': movie.comedies_Dramas,
      'Comedies International': movie.comedies_International,
      'Comedies Romantic': movie.comedies_Romantic,
      'Crime TV': movie.crime_TV,
      Documentaries: movie.documentaries,
      'Documentaries International': movie.documentaries_International,
      Docuseries: movie.docuseries,
      Dramas: movie.dramas,
      'Dramas International': movie.dramas_International,
      'Dramas Romantic': movie.dramas_Romantic,
      Family: movie.family,
      Fantasy: movie.fantasy,
      Horror: movie.horror,
      'International Thrillers': movie.international_Thrillers,
      'International Romantic Dramas TV':
        movie.international_Romantic_Dramas_TV,
      'Kids TV': movie.kids_TV,
      'Language TV': movie.language_TV,
      Musicals: movie.musicals,
      'Nature TV': movie.nature_TV,
      'Reality TV': movie.reality_TV,
      Spirituality: movie.spirituality,
      'TV Action': movie.tV_Action,
      'TV Comedies': movie.tV_Comedies,
      'TV Dramas': movie.tV_Dramas,
      'Talk Shows': movie.talk_Shows,
      Thrillers: movie.thrillers,
    };

    let maxGenre = 'Unknown';
    let maxValue = 0;

    for (const [genre, value] of Object.entries(genreMap)) {
      if (value > maxValue) {
        maxValue = value;
        maxGenre = genre;
      }
    }

    return maxGenre;
  };

  const primaryGenre = getPrimaryGenre(movie);

  return (
    <div className="movie-detail">
      <div className="movie-header">
        <div className="movie-poster">{movie.title.charAt(0)}</div>

        <div className="movie-info">
          <h1 className="movie-title">{movie.title}</h1>

          <div className="movie-meta">
            <div className="movie-meta-item">{movie.release_year}</div>
            <div className="movie-meta-item">{primaryGenre}</div>
            <div className="movie-meta-item">{movie.rating}</div>
            <div className="movie-meta-item">{movie.duration}</div>
          </div>

          <div className="movie-rating">
            <div className="rating-value">
              {/* Using a placeholder for rating */}
              {Math.floor(Math.random() * 3) + 7}
            </div>
            <div className="rating-text">Rating</div>
          </div>
        </div>
      </div>

      <div className="movie-description">
        {movie.description || 'No description available.'}
      </div>

      <div className="movie-details-section">
        <h2 className="details-title">Additional Information</h2>
        <div className="details-list">
          <div className="details-item">
            <div className="details-label">Director:</div>
            <div className="details-value">
              {movie.director || 'Not available'}
            </div>
          </div>
          <div className="details-item">
            <div className="details-label">Cast:</div>
            <div className="details-value">{movie.cast || 'Not available'}</div>
          </div>
          <div className="details-item">
            <div className="details-label">Country:</div>
            <div className="details-value">
              {movie.country || 'Not available'}
            </div>
          </div>
          <div className="details-item">
            <div className="details-label">Type:</div>
            <div className="details-value">{movie.type || 'Not available'}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
