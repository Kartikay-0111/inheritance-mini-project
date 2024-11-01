import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react'
const onRedirectCallback = (appState) => {
  // Redirect user to your custom component or route
  window.history.replaceState(
    {},
    document.title,
    appState?.targetUrl || '/user-form'
  );
};
// console.log(import.meta.env.VITE_AUTH0_DOMAIN)
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin + '/user-form',
        audience: "http://localhost",
        scope: "openid profile email",
      }}
    >
      <App />
    </Auth0Provider>
  </StrictMode>
)
