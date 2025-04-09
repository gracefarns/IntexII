import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

const GoogleLoginButton = () => {
  const navigate = useNavigate();

  function setUser(data: any) {
    localStorage.setItem('user', JSON.stringify(data));
  }

  return (
    <GoogleLogin
      onSuccess={credentialResponse => {
        fetch('https://intex-backend-fmb8dnaxb0dkd8gv.eastus-01.azurewebsites.net/api/auth/google', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', //  Important for auth cookies!
          body: JSON.stringify({ idToken: credentialResponse.credential }),
        })
        .then(res => res.json())
        .then(data => {
          setUser(data);
          navigate('/moviepage');
          //redirect
        });
      }}
      onError={() => {
        console.log('Login Failed');
      }}
    />
  );
};

export default GoogleLoginButton;
