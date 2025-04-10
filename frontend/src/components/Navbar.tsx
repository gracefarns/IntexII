import React from 'react';
import '../styles/Navbar.css';

const Navbar: React.FC = () => {
  return (
    <header className="navbar">
      <div className="navbar-left">
        <div className="brand">
          <span className="brand-cine">Cine</span>
          <span className="brand-niche">Niche</span>
        </div>
      </div>
      <div className="navbar-right"></div>
    </header>
  );
};

export default Navbar;
