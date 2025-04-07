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
      {/* <label>
        Movie Title:{' '}
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
      <button type="submit">Add Book</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button> */}
    </form>
  );
};

export default NewMovieForm;
