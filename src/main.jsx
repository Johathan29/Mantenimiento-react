import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import HeaderComponent from './Components/HeaderComponent.jsx';
import FooterComponent from './Components/FooterComponent.jsx';
import App from './App.jsx';
import Layout from './Views/Layout.jsx';
import { BrowserRouter,Routes,Route, Outlet} from "react-router-dom";
import HomePage from './Views/Home.jsx';
import NoPage from './Views/NoPage.jsx';
import ContactPage from './Views/Contact.jsx';
import DetailChild from './Views/DetailChild.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
   
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage></HomePage>} />
          <Route path="/:id" element={<DetailChild></DetailChild>} />
          <Route path="/contact" action  element={<ContactPage></ContactPage>} />
          <Route path="*" element={<NoPage></NoPage>} />
        </Route>
      </Routes>
    </BrowserRouter>
    
    <App />
 
    
  </StrictMode>
);
