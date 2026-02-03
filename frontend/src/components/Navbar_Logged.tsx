import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';
import Logout from './Logout';

const Navbar_Logged: React.FC = () => {
  const navigate = useNavigate();

  const returnToMoviePage = () => {
    navigate('/moviepage');
  };

  return (
    <div className="skibidi-navbar">
      <div className="sigma-container">
        <header className="skibidi-header">
          <div className="skibidi-left">
            <div
              className="ohio-brand"
              onClick={returnToMoviePage}
              style={{ cursor: 'pointer' }}
            >
              <span className="sigma-cine">Cine</span>
              <span className="ohio-niche">Niche</span>
            </div>
          </div>
          <div className="skibidi-right">
            <Logout>Log out</Logout>
          </div>
        </header>
      </div>
    </div>
  );
};

export default Navbar_Logged;
