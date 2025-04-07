import React from 'react';
import '../styles/Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <h1 className="logo">
        <span className="capital">C</span>ine
        <span className="capital">N</span>iche
      </h1>
    </header>
  );
};

export default Header;
