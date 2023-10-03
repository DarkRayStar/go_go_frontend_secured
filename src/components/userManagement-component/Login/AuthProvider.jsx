import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';


const root = createRoot(document.getElementById('app'));

root.render(
  <GoogleOAuthProvider clientId="351554064926-kvnosp2lp0cskoqjcu3fmqg7m9bcke2a.apps.googleusercontent.com">
      <App />
  </GoogleOAuthProvider>,
);