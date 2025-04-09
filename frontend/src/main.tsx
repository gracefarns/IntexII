import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GoogleOAuthProvider } from '@react-oauth/google';

const clientId = '927787589560-ng122o7dcitoj65o59hrg2hpnbl4b1ah.apps.googleusercontent.com';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <GoogleOAuthProvider clientId={clientId}>
      <App />
    </GoogleOAuthProvider>
  </StrictMode>
);
