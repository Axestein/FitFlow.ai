import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter
import './index.css';
import App from './App.jsx';

// Ensure your whole app is wrapped in Router
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>  {/* Wrap App inside Router */}
      <App />
    </Router>
  </StrictMode>
);
