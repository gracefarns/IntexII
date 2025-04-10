import { useEffect, useState } from 'react';
import { Movie } from '../types/Movie';
import { deleteMovie, fetchMovies } from '../api/MoviesAPI';
import Pagination from '../components/Pagination';
import NewMovieForm from '../components/NewMovieForm';
import EditMovieForm from '../components/EditMovieForm';
import '../styles/AdminPage.css';

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
        console.log('Searching for:', searchTerm);
        const data = await fetchMovies(pageSize, pageNum, [], searchTerm);
        setMovies(data.movies);
        console.log('Movies received:', data.movies);
        setTotalPages(Math.ceil(data.totalNumMovies / pageSize));
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [pageSize, pageNum, searchTerm]);

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

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1 className="admin-title">Manage Movies</h1>
        {!showForm && !editingMovie && (
          <button className="add-button" onClick={() => setShowForm(true)}>
            <span style={{ fontSize: '18px' }}>+</span> Add New Movie
          </button>
        )}
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading Movies...</p>
        </div>
      ) : error ? (
        <div className="error-message">
          <p style={{ margin: 0 }}>Error: {error}</p>
        </div>
      ) : (
        <>
          {showForm && (
            <div className="form-card">
              <h2>Add New Movie</h2>
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
            <div className="form-card">
              <h2>Edit Movie</h2>
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
              <div className="search-bar-container">
                <div className="search-wrapper">
                  <input
                    type="text"
                    placeholder="Search by title or director..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setPageNum(1);
                    }}
                    className="search-input"
                  />
                  <span className="search-icon">🔍</span>
                </div>
                <div className="movie-count">
                  Showing {movies.length} of {totalPages * pageSize} movies
                </div>
              </div>

              <div className="movie-table-wrapper">
                <table className="movie-table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Director</th>
                      <th>Cast</th>
                      <th>Country</th>
                      <th>Year</th>
                      <th>Rating</th>
                      <th>Duration</th>
                      <th>Description</th>
                      <th style={{ textAlign: 'center', width: '120px' }}>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {movies.length > 0 ? (
                      movies.map((movie, index) => (
                        <tr
                          key={movie.show_id}
                          className={index % 2 === 0 ? 'row-even' : 'row-odd'}
                        >
                          <td>{movie.title}</td>
                          <td>{movie.director}</td>
                          <td className="cast">{movie.cast}</td>
                          <td>{movie.country}</td>
                          <td>{movie.release_year}</td>
                          <td>{movie.rating}</td>
                          <td>{movie.duration}</td>
                          <td className="description">{movie.description}</td>
                          <td className="actions">
                            <div className="movie-actions">
                              <button
                                className="edit-button"
                                onClick={() => setEditingMovie(movie)}
                              >
                                Edit
                              </button>
                              <button
                                className="delete-button"
                                onClick={() =>
                                  movie.show_id !== undefined &&
                                  handleDelete(movie.show_id)
                                }
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={9} className="no-results">
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
