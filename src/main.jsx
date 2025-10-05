import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { ThemeProvider } from '@mui/material/styles';
import { customTheme } from './theme';
import './index.css'; // Assuming default Vite CSS setup

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={customTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);