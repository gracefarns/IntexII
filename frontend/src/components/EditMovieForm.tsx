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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      console.log(formData);
      await updateMovie(formData.show_id, formData);
      onSuccess();
    } catch (error) {
      console.error('Error updating movie:', error);
      alert('Failed to update movie. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
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
            Edit Movie
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
            <button
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
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                padding: '10px 16px',
                borderRadius: '4px',
                border: 'none',
                backgroundColor: '#007bff',
                color: 'white',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                opacity: isSubmitting ? 0.7 : 1,
              }}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>

      {/* Add animation styles */}
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

export default EditMovieForm;
