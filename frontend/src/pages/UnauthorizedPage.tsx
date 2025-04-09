import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/identity.css';

function UnauthorizedPage() {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/moviepage');
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="niche-logo text-center mb-4">
            <h1><span className="text-teal">Cine</span>Niche</h1>
          </div>
          <div className="card unauthorized-card">
            <div className="card-body p-4 p-md-5">
              <div className="text-center mb-4">
                <i className="fas fa-exclamation-circle icon-unauthorized"></i>
              </div>
              <h2 className="text-center mb-3">
                Access Denied
              </h2>
              <p className="text-center mb-4">
                You do not have permission to view this page.
              </p>
              <div className="d-grid">
                <button 
                  onClick={handleRedirect}
                  className="btn btn-primary"
                >
                  Return to Main Page
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UnauthorizedPage;