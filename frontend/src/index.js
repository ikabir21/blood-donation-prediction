import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js'
import './index.css'
import { MyProvider } from "./context/Context";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MyProvider>
    <App />
    </MyProvider>
  </React.StrictMode>
);


