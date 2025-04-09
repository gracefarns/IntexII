import { GoogleLogin } from '@react-oauth/google';

const GoogleLoginButton = () => {
  return (
    <GoogleLogin
      onSuccess={credentialResponse => {
        fetch('https://intex-backend-fmb8dnaxb0dkd8gv.eastus-01.azurewebsites.net/api/auth/google', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ idToken: credentialResponse.credential }),
        })
        .then(res => res.json())
        .then(data => {
          console.log('User info from backend:', data);
          // You can store user/token here or redirect
        });
      }}
      onError={() => {
        console.log('Login Failed');
      }}
    />
  );
};

export default GoogleLoginButton;
