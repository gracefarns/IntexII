import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const returnToHome = () => {
    navigate('/');
  };

  return (
    <div className="skibidi-navbar">
      <div className="sigma-container">
        <header className="skibidi-header">
          <div
            className="ohio-brand"
            onClick={returnToHome}
            style={{ cursor: 'pointer' }}
          >
            <span className="sigma-cine">Cine</span>
            <span className="ohio-niche">Niche</span>
          </div>
        </header>
      </div>
    </div>
  );
};

export default Navbar;
