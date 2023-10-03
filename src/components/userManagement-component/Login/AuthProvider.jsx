import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';
const configFile = require('../../../config.json');

const root = createRoot(document.getElementById('app'));
root.render(
  <GoogleOAuthProvider clientId= {configFile.GOOGLE_OAUTH_CLIENT_ID}>
      <App />
  </GoogleOAuthProvider>,
);