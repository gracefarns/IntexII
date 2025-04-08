import { useEffect, useState } from 'react';
import { Movie } from '../types/Movie';
import { deleteMovie, fetchMovies } from '../api/MoviesAPI';
import Pagination from '../components/Pagination';
import NewMovieForm from '../components/NewMovieForm';
import EditMovieForm from '../components/EditMovieForm';

const AdminPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [showForm, setShowForm] = useState(false);
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await fetchMovies(pageSize, pageNum, []);
        setMovies(data.movies);
        setTotalPages(Math.ceil(data.totalNumMovies / pageSize));
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [pageSize, pageNum]);

  const handleDelete = async (show_id: number) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this movie?'
    );
    if (!confirmDelete) return;

    try {
      await deleteMovie(show_id);
      setMovies(movies.filter((b) => b.show_id !== show_id));
    } catch (error) {
      alert('Failed to delete movie. Please try again.');
    }
  };

  const filteredMovies = searchTerm
    ? movies.filter(
        (movie) =>
          movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          movie.director.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : movies;

  return (
    <div
      className="admin-container"
      style={{
        padding: '30px',
        maxWidth: '1400px',
        margin: '0 auto',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
          flexWrap: 'wrap',
        }}
      >
        <h1
          style={{
            fontSize: '2rem',
            color: '#333',
            marginBottom: '10px',
            fontWeight: '600',
          }}
        >
          Admin - Movie Management
        </h1>

        {!showForm && !editingMovie && (
          <button
            style={{
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
            onClick={() => setShowForm(true)}
          >
            <span style={{ fontSize: '18px' }}>+</span> Add New Movie
          </button>
        )}
      </div>

      {loading ? (
        <div
          style={{
            textAlign: 'center',
            padding: '40px 0',
            color: '#666',
          }}
        >
          <div
            style={{
              border: '4px solid rgba(0, 0, 0, 0.1)',
              borderRadius: '50%',
              borderTop: '4px solid #3498db',
              width: '40px',
              height: '40px',
              margin: '0 auto 15px',
              animation: 'spin 1s linear infinite',
            }}
          ></div>
          <p>Loading Movies...</p>
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      ) : error ? (
        <div
          style={{
            background: '#ffebee',
            color: '#c62828',
            padding: '15px',
            borderRadius: '5px',
            marginBottom: '20px',
          }}
        >
          <p style={{ margin: 0 }}>Error: {error}</p>
        </div>
      ) : (
        <>
          {showForm && (
            <div
              style={{
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '6px',
                marginBottom: '20px',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
              }}
            >
              <h2 style={{ marginBottom: '15px', color: '#444' }}>
                Add New Movie
              </h2>
              <NewMovieForm
                onSuccess={() => {
                  setShowForm(false);
                  fetchMovies(pageSize, pageNum, []).then((data) =>
                    setMovies(data.movies)
                  );
                }}
                onCancel={() => setShowForm(false)}
              />
            </div>
          )}

          {editingMovie && (
            <div
              style={{
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '6px',
                marginBottom: '20px',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
              }}
            >
              <h2 style={{ marginBottom: '15px', color: '#444' }}>
                Edit Movie
              </h2>
              <EditMovieForm
                movie={editingMovie}
                onSuccess={() => {
                  setEditingMovie(null);
                  fetchMovies(pageSize, pageNum, []).then((data) =>
                    setMovies(data.movies)
                  );
                }}
                onCancel={() => setEditingMovie(null)}
              />
            </div>
          )}

          {!showForm && !editingMovie && (
            <>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '15px',
                }}
              >
                <div
                  style={{
                    position: 'relative',
                    width: '300px',
                  }}
                >
                  <input
                    type="text"
                    placeholder="Search by title or director..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                      padding: '10px 10px 10px 35px',
                      width: '100%',
                      borderRadius: '5px',
                      border: '1px solid #ddd',
                      fontSize: '14px',
                    }}
                  />
                  <span
                    style={{
                      position: 'absolute',
                      left: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#888',
                    }}
                  >
                    🔍
                  </span>
                </div>
                <div
                  style={{
                    color: '#666',
                    fontSize: '14px',
                  }}
                >
                  Showing {filteredMovies.length} of {movies.length} movies
                </div>
              </div>

              <div
                style={{
                  overflowX: 'auto',
                  borderRadius: '6px',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                }}
              >
                <table
                  style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    backgroundColor: 'white',
                  }}
                >
                  <thead>
                    <tr
                      style={{
                        backgroundColor: '#343a40',
                        color: 'white',
                      }}
                    >
                      <th style={{ padding: '12px 15px', textAlign: 'left' }}>
                        Title
                      </th>
                      <th style={{ padding: '12px 15px', textAlign: 'left' }}>
                        Director
                      </th>
                      <th style={{ padding: '12px 15px', textAlign: 'left' }}>
                        Cast
                      </th>
                      <th style={{ padding: '12px 15px', textAlign: 'left' }}>
                        Country
                      </th>
                      <th style={{ padding: '12px 15px', textAlign: 'left' }}>
                        Year
                      </th>
                      <th style={{ padding: '12px 15px', textAlign: 'left' }}>
                        Rating
                      </th>
                      <th style={{ padding: '12px 15px', textAlign: 'left' }}>
                        Duration
                      </th>
                      <th style={{ padding: '12px 15px', textAlign: 'left' }}>
                        Description
                      </th>
                      <th
                        style={{
                          padding: '12px 15px',
                          textAlign: 'center',
                          width: '120px',
                        }}
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredMovies.length > 0 ? (
                      filteredMovies.map((movie, index) => (
                        <tr
                          key={movie.show_id}
                          style={{
                            backgroundColor:
                              index % 2 === 0 ? '#ffffff' : '#f9f9f9',
                            borderBottom: '1px solid #eee',
                          }}
                        >
                          <td style={{ padding: '12px 15px' }}>
                            {movie.title}
                          </td>
                          <td style={{ padding: '12px 15px' }}>
                            {movie.director}
                          </td>
                          <td
                            style={{
                              padding: '12px 15px',
                              maxWidth: '200px',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {movie.cast}
                          </td>
                          <td style={{ padding: '12px 15px' }}>
                            {movie.country}
                          </td>
                          <td style={{ padding: '12px 15px' }}>
                            {movie.release_year}
                          </td>
                          <td style={{ padding: '12px 15px' }}>
                            {movie.rating}
                          </td>
                          <td style={{ padding: '12px 15px' }}>
                            {movie.duration}
                          </td>
                          <td
                            style={{
                              padding: '12px 15px',
                              maxWidth: '250px',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {movie.description}
                          </td>
                          <td style={{ padding: '8px 15px' }}>
                            <div style={{ display: 'flex', gap: '6px' }}>
                              <button
                                style={{
                                  backgroundColor: '#007bff',
                                  color: 'white',
                                  border: 'none',
                                  padding: '6px 10px',
                                  borderRadius: '4px',
                                  cursor: 'pointer',
                                  fontSize: '13px',
                                  flex: '1',
                                }}
                                onClick={() => setEditingMovie(movie)}
                              >
                                Edit
                              </button>
                              <button
                                style={{
                                  backgroundColor: '#dc3545',
                                  color: 'white',
                                  border: 'none',
                                  padding: '6px 10px',
                                  borderRadius: '4px',
                                  cursor: 'pointer',
                                  fontSize: '13px',
                                  flex: '1',
                                }}
                                onClick={() => handleDelete(movie.show_id)}
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={9}
                          style={{
                            padding: '20px',
                            textAlign: 'center',
                            color: '#666',
                          }}
                        >
                          No movies found matching your search.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div style={{ marginTop: '20px' }}>
                <Pagination
                  currentPage={pageNum}
                  totalPages={totalPages}
                  pageSize={pageSize}
                  onPageChange={setPageNum}
                  onPageSizeChange={(newSize) => {
                    setPageSize(newSize);
                    setPageNum(1);
                  }}
                />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default AdminPage;
