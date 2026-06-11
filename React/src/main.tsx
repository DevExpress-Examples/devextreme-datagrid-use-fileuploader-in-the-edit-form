import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'devextreme/dist/css/dx.material.blue.light.compact.css';
import config from 'devextreme/core/config';
import './index.css';
import App from './App.tsx';
import { licenseKey } from './devextreme-license';

config({ licenseKey });

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
