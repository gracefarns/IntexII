import React from 'react';
import '../styles/Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-links">
        <a href="/register">Sign Up</a>
        <a href="/privacy">Privacy Policy</a>
        <a href="mailto:info@cineniche.com">Email</a>
        <span>Phone: 123-456-7890</span>
        <span>1125 Thunder Road, Pacifica CA 94044</span>
      </div>
    </footer>
  );
};

export default Footer;
