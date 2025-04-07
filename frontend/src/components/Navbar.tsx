import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import '../styles/Navbar.css';

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Header />
      </div>
      <div className="navbar-right">
        <button className="sign-in-button" onClick={handleSignIn}>
          Sign In
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
