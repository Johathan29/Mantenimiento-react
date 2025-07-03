import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import Layout from './Views/Layout.jsx';
import HomePage from './Views/Home.jsx';
import NoPage from './Views/NoPage.jsx';
import ContactPage from './Views/Contact.jsx';
import Child from './Views/Child.jsx';
import DetailChild from './Views/DetailChild.jsx';
import ControllerChild from './Controllers/ControllerChild.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="userall" element={<Child  />} />
          <Route path=":id" element={<DetailChild />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    <App />
  </StrictMode>
);
