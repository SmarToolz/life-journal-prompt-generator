
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Index from './pages/Index'; // Adjust path if needed based on your structure

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App>
      <Index />
    </App>
  </React.StrictMode>
);