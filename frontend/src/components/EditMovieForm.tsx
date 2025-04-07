import { useState } from 'react';
import { Movie } from '../types/Movie';
import { updateMovie } from '../api/MoviesAPI';

interface EditMovieFormProps {
  movie: Movie;
  onSuccess: () => void;
  onCancel: () => void;
}

const EditMovieForm = ({ movie, onSuccess, onCancel }: EditMovieFormProps) => {
  const [formData, setFormData] = useState<Movie>({ ...movie });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateMovie(formData.show_id, formData);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit movie</h2>
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
      <button type="submit">Edit Movie</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default EditMovieForm;
