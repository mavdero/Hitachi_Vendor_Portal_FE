import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import {createRoot} from 'react-dom/client';
import {BrowserRouter as Router} from 'react-router-dom';
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(
  <Router>
    <App />
  </Router>
);
