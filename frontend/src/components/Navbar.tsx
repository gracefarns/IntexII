import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';
import ManageMoviesButton from './ManageMoviesButton';
import AuthorizeView from './AuthorizeView';

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const returnToHome = () => {
    navigate('/');
  };

  return (
    <div className="skibidi-navbar">
      <div className="sigma-container">
        <header className="skibidi-header">
          <div className="skibidi-left">
            <div
              className="ohio-brand"
              onClick={returnToHome}
              style={{ cursor: 'pointer' }}
            >
              <span className="sigma-cine">Cine</span>
              <span className="ohio-niche">Niche</span>
            </div>
          </div>
          <div className="skibidi-right">
            <AuthorizeView>
              <ManageMoviesButton />
            </AuthorizeView>
          </div>
        </header>
      </div>
    </div>
  );
};

export default Navbar;
