import React from 'react';
import '../styles/Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-links">
        <a href="/signup">Sign Up</a>
        <a href="/privacy">Privacy Policy</a>
        <a href="mailto:info@cineniche.com">Email</a>
        <span>Phone: 123-456-7890</span>
        <span>Address: 123 Movie Lane, Filmtown</span>
        <a href="/contact">Contact Us</a>
      </div>
    </footer>
  );
};

export default Footer;
