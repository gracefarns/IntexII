import { useState } from 'react';
import { Movie } from '../types/Movie';
import { addMovie } from '../api/MoviesAPI';

interface NewMovieFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const NewMovieForm = ({ onSuccess, onCancel }: NewMovieFormProps) => {
  const [formData, setFormData] = useState<Movie>({
    show_id: 0,
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { show_id, ...movieWithoutId } = formData;
    await addMovie(movieWithoutId);
    onSuccess();
  };

  return (
    // Overlay with backdrop blur effect
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(5px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
    >
      {/* Modal container */}
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
          width: '90%',
          maxWidth: '600px',
          maxHeight: '90vh',
          overflow: 'auto',
          padding: '0',
          animation: 'modalFadeIn 0.3s ease-out',
        }}
      >
        {/* Header */}
        <div
          style={{
            borderBottom: '1px solid #eee',
            padding: '16px 24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#f8f9fa',
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: '1.5rem',
              color: '#333',
              fontWeight: '600',
            }}
          >
            Add Movie
          </h2>
          <button
            type="button"
            onClick={onCancel}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              color: '#666',
            }}
          >
            ×
          </button>
        </div>

        {/* Form body */}
        <form onSubmit={handleSubmit} style={{ padding: '24px' }}>
          <div style={{ marginBottom: '20px' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '6px',
                fontWeight: '500',
                color: '#444',
              }}
            >
              Movie Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              style={{
                display: 'block',
                width: '100%',
                padding: '10px 12px',
                fontSize: '16px',
                borderRadius: '4px',
                border: '1px solid #ddd',
              }}
              required
            />
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '16px',
              marginBottom: '20px',
            }}
          >
            <div>
              <label
                style={{
                  display: 'block',
                  marginBottom: '6px',
                  fontWeight: '500',
                  color: '#444',
                }}
              >
                Director
              </label>
              <input
                type="text"
                name="director"
                value={formData.director}
                onChange={handleChange}
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '10px 12px',
                  fontSize: '16px',
                  borderRadius: '4px',
                  border: '1px solid #ddd',
                }}
                required
              />
            </div>
            <div>
              <label
                style={{
                  display: 'block',
                  marginBottom: '6px',
                  fontWeight: '500',
                  color: '#444',
                }}
              >
                Country
              </label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '10px 12px',
                  fontSize: '16px',
                  borderRadius: '4px',
                  border: '1px solid #ddd',
                }}
              />
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: '16px',
              marginBottom: '20px',
            }}
          >
            <div>
              <label
                style={{
                  display: 'block',
                  marginBottom: '6px',
                  fontWeight: '500',
                  color: '#444',
                }}
              >
                Release Year
              </label>
              <input
                type="number"
                name="release_year"
                value={formData.release_year}
                onChange={handleChange}
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '10px 12px',
                  fontSize: '16px',
                  borderRadius: '4px',
                  border: '1px solid #ddd',
                }}
                required
              />
            </div>
            <div>
              <label
                style={{
                  display: 'block',
                  marginBottom: '6px',
                  fontWeight: '500',
                  color: '#444',
                }}
              >
                Rating
              </label>
              <input
                type="text"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '10px 12px',
                  fontSize: '16px',
                  borderRadius: '4px',
                  border: '1px solid #ddd',
                }}
              />
            </div>
            <div>
              <label
                style={{
                  display: 'block',
                  marginBottom: '6px',
                  fontWeight: '500',
                  color: '#444',
                }}
              >
                Duration
              </label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '10px 12px',
                  fontSize: '16px',
                  borderRadius: '4px',
                  border: '1px solid #ddd',
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '6px',
                fontWeight: '500',
                color: '#444',
              }}
            >
              Cast
            </label>
            <input
              type="text"
              name="cast"
              value={formData.cast}
              onChange={handleChange}
              style={{
                display: 'block',
                width: '100%',
                padding: '10px 12px',
                fontSize: '16px',
                borderRadius: '4px',
                border: '1px solid #ddd',
              }}
              placeholder="Separate cast members with commas"
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '6px',
                fontWeight: '500',
                color: '#444',
              }}
            >
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              style={{
                display: 'block',
                width: '100%',
                padding: '10px 12px',
                fontSize: '16px',
                borderRadius: '4px',
                border: '1px solid #ddd',
                minHeight: '100px',
                resize: 'vertical',
              }}
            />
          </div>

          {/* Footer with action buttons */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '10px',
              borderTop: '1px solid #eee',
              paddingTop: '20px',
            }}
          >
            {/* <button
              type="button"
              onClick={onCancel}
              style={{
                padding: '10px 16px',
                borderRadius: '4px',
                border: '1px solid #ddd',
                backgroundColor: '#f8f9fa',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
              }}
            >
              Cancel
            </button> */}
            <button
              type="submit"
              style={{
                padding: '10px 16px',
                borderRadius: '4px',
                border: 'none',
                backgroundColor: 'teal',
                color: 'white',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
              }}
            >
              Add Movie
            </button>
          </div>
        </form>
      </div>

      {/* Animation styles */}
      <style>
        {`
          @keyframes modalFadeIn {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
};

export default NewMovieForm;
