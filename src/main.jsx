import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import HeaderComponent from './Components/HeaderComponent.jsx';
import FooterComponent from './Components/HeaderComponent.jsx';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HeaderComponent/>
    <App />
    <FooterComponent/>
  </StrictMode>
);
