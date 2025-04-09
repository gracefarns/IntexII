import { Movie } from '../types/Movie';

interface FetchMoviesResponse {
  movies: Movie[];
  totalNumMovies: number;
}

const API_URL = `https://intex-backend-fmb8dnaxb0dkd8gv.eastus-01.azurewebsites.net`; //change to deployed backend when it gets deployed!!!

export const fetchMovies = async (
  pageSize: number,
  pageNum: number,
  selectedCategories: string[]
): Promise<FetchMoviesResponse> => {
  try {
    const categoryParams = selectedCategories
      .map((cat) => `movieCategories=${encodeURIComponent(cat)}`)
      .join('&');

    const response = await fetch(
      `${API_URL}/Movie/GetMovies?pageSize=${pageSize}&pageNum=${pageNum}${selectedCategories.length ? `&${categoryParams}` : ''}`,
      {
        credentials: 'include',
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch movies');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};

export const addMovie = async (newMovie: Movie): Promise<Movie> => {
  try {
    const response = await fetch(`${API_URL}/Movie/AddMovie`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        credentials: 'include',
      },
      body: JSON.stringify(newMovie),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error('Add failed:', response.status, text);
      throw new Error('Failed to add movie');
    }

    return await response.json();
  } catch (error) {
    console.error('Error adding movie', error);
    throw error;
  }
};

export const updateMovie = async (
  movieId: number,
  updatedMovie: Movie
): Promise<Movie> => {
  try {
    const response = await fetch(`${API_URL}/Movie/UpdateMovie/${movieId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        credentials: 'include',
      },
      body: JSON.stringify(updatedMovie),
    });

    if (!response.ok) {
      const errorText = await response.text(); // debugging
      console.error('Update failed:', response.status, errorText);
      throw new Error(`Update failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating movie:', error);
    throw error;
  }
};

export const deleteMovie = async (movieId: number): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/Movie/DeleteMovie/${movieId}`, {
      method: 'DELETE',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to delete movie');
    }
  } catch (error) {
    console.error('Error deleting movie', error);
    throw error;
  }
};
