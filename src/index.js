import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css";
import './style.min.css';
import {
  HashRouter
} from "react-router-dom";
// import Auth from "./Auth";

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      
    <App />
    </HashRouter>
    
  </React.StrictMode>,
  document.getElementById('root')
);

