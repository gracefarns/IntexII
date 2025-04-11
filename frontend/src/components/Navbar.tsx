import React from 'react';
import '../styles/Navbar.css';

const Navbar: React.FC = () => {
  return (
    <div className="skibidi-navbar">
      <div className="sigma-container">
        <header className="skibidi-header">
          <div className="ohio-brand">
            <span className="sigma-cine">Cine</span>
            <span className="ohio-niche">Niche</span>
          </div>
        </header>
      </div>
    </div>
  );
};

export default Navbar;
