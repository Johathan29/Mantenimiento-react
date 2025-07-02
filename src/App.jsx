import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Child from './Views/Child.jsx';
import PropTypes from 'prop-types';
import ControllerChild from './Controllers/ControllerChild.jsx';
import Layout from './Views/Layout.jsx';
import { BrowserRouter,Routes,Route} from "react-router-dom";
import HomePage from './Views/Home.jsx';
import NoPage from './Views/NoPage.jsx';
import ContactPage from './Views/Contact.jsx';
function App() {
  const [count, setCount] = useState(0);
  
  return (
    <>
    
      
      {/*<div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
  </p>*/}
    
    </>
  );
}
App.propTypes = {
  data: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.number.isRequired,
  }),
};

export default App;
