import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

// Navigeerimiseks (URLi vahetuseks ja erineva sisu kuvamiseks):
// 1. npm i react-router-dom
// 2. <App /> ümber <BrowserRouter>
// 3. App.js failis URLi ja sisu seoste loomine

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
