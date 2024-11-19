// src/index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './styles/globals.css';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);

// Function to remove the initial loader
const removeInitialLoader = () => {
  const loader = document.querySelector('.initial-loader');
  if (loader) {
    loader.style.opacity = '0';
    loader.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
      loader.remove();
    }, 500);
  }
};

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  () => {
    // Remove the initial loader after React has rendered
    removeInitialLoader();
  }
);