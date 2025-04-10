import React from 'react';
import '../styles/Navbar.css';

const Navbar: React.FC = () => {
  return (
    <div>
      <div className="home-container">
        <header className="header">
          <div className="brand">
            <span className="brand-cine">Cine</span>
            <span className="brand-niche">Niche</span>
          </div>
        </header>
      </div>
    </div>
  );
};

export default Navbar;
