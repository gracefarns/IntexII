import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../components/AuthorizeView'; // update this import as needed
import '../styles/ManageMoviesButton.css';

const ManageMoviesButton = () => {
  const user = useContext(UserContext);
  const navigate = useNavigate();

  if (!user || !user.roles.includes('Administrator')) return null;

  return (
    <button
      className="manage-movies manage-movies-btn"
      onClick={() => navigate('/admin')}
    >
      Manage Movies
    </button>
  );
};

export default ManageMoviesButton;
