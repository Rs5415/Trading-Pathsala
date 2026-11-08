import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';

// Automatically detect whether the app is served from the GitHub Pages repository subpath
// (/Trading-Pathsala) or from a root/custom domain.
const getBasename = (): string => {
  const base = import.meta.env.BASE_URL;
  if (base && base !== '/') {
    return base.endsWith('/') ? base.slice(0, -1) : base;
  }
  if (window.location.pathname.startsWith('/Trading-Pathsala')) {
    return '/Trading-Pathsala';
  }
  return '/';
};

createRoot(document.getElementById('root')!).render(
  <BrowserRouter basename={getBasename()}>
    <App />
  </BrowserRouter>
);
