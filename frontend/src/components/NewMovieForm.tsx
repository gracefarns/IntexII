import { useState } from 'react';
import { Movie } from '../types/Movie';
import { addMovie } from '../api/MoviesAPI';

interface NewMovieFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const NewMovieForm = ({ onSuccess, onCancel }: NewMovieFormProps) => {
  const [formData, setFormData] = useState<Movie>({
    show_id: '',
    type: '',
    title: '',
    director: '',
    cast: '',
    country: '',
    release_year: 0,
    rating: '',
    duration: '',
    description: '',
    action: 0,
    adventure: 0,
    anime: 0,
    british_Docuseries: 0,
    children: 0,
    comedies: 0,
    comedies_Dramas: 0,
    comedies_International: 0,
    comedies_Romantic: 0,
    crime_TV: 0,
    documentaries: 0,
    documentaries_International: 0,
    docuseries: 0,
    dramas: 0,
    dramas_International: 0,
    dramas_Romantic: 0,
    family: 0,
    fantasy: 0,
    horror: 0,
    international_Thrillers: 0,
    international_Romantic_Dramas_TV: 0,
    kids_TV: 0,
    language_TV: 0,
    musicals: 0,
    nature_TV: 0,
    reality_TV: 0,
    spirituality: 0,
    tV_Action: 0,
    tV_Comedies: 0,
    tV_Dramas: 0,
    talk_Shows: 0,
    thrillers: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addMovie(formData);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add a new movie</h2>
      <label>
        Movie Title:{' '}
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </label>
      <label>
        Director:{' '}
        <input
          type="text"
          name="director"
          value={formData.director}
          onChange={handleChange}
        />
      </label>
      <label>
        Cast:{' '}
        <input
          type="text"
          name="cast"
          value={formData.cast}
          onChange={handleChange}
        />
      </label>
      <label>
        Country:{' '}
        <input
          type="text"
          name="country"
          value={formData.country}
          onChange={handleChange}
        />
      </label>
      <label>
        Release Year:{' '}
        <input
          type="number"
          name="release_year"
          value={formData.release_year}
          onChange={handleChange}
        />
      </label>
      <label>
        Rating:{' '}
        <input
          type="text"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
        />
      </label>
      <label>
        Duration:{' '}
        <input
          type="text"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
        />
      </label>
      <label>
        Description{' '}
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Add Movie</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default NewMovieForm;
