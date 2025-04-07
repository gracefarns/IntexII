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
      <h2>Add a new movie</h2>
      {/* <label>
        Book Title:{' '}
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </label>
      <label>
        Author:{' '}
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
        />
      </label>
      <label>
        Publisher:{' '}
        <input
          type="text"
          name="publisher"
          value={formData.publisher}
          onChange={handleChange}
        />
      </label>
      <label>
        ISBN:{' '}
        <input
          type="text"
          name="isbn"
          value={formData.isbn}
          onChange={handleChange}
        />
      </label>
      <label>
        Classification:{' '}
        <input
          type="text"
          name="classification"
          value={formData.classification}
          onChange={handleChange}
        />
      </label>
      <label>
        Category:{' '}
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
        />
      </label>
      <label>
        Number of Pages:{' '}
        <input
          type="number"
          name="pageCount"
          value={formData.pageCount}
          onChange={handleChange}
        />
      </label>
      <label>
        Price:{' '}
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Update Book</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button> */}
    </form>
  );
};

export default EditMovieForm;
