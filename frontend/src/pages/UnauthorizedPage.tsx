import { useNavigate } from 'react-router-dom';
import '../styles/identity.css';
import '@fortawesome/fontawesome-free/css/all.css';
import '../styles/LoginPage.css';

function UnauthorizedPage() {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/');
  };

return (
  <div>
    <div className="container">
      <div>
        <br />
        <br />
        <div className="card border-0 shadow rounded-3 ">
          <div className="card-body p-4 p-sm-5">
            <h3>Access Denied</h3>
            <h5 className="card-title text-center mb-5 fw-light fs-5">
            You do not have permission to view this page.
            </h5>
              <hr className="my-4" />
              <div className="d-grid mb-2">
              <button 
                  onClick={handleRedirect}
                  className="btn btn-primary"
                >
                 Return to home page
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