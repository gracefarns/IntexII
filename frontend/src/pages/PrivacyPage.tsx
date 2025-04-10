import PrivacyPolicy from '../components/PolicyBody';
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PrivacyPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <br />
      <br />
      <div className="homepage">
        <div className="content">
          <PrivacyPolicy />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default PrivacyPage;
