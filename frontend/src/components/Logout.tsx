import { useNavigate } from 'react-router-dom';

function Logout(props: { children: React.ReactNode }) {
    const navigate = useNavigate();
  

  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('https://intex-backend-fmb8dnaxb0dkd8gv.eastus-01.azurewebsites.net/logout', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        navigate('/login');
      } else {
        console.error('Logout failed:', response.status);
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <button className="logout" onClick={handleLogout}>
      {props.children}
    </button>
  );
}

export default Logout;
