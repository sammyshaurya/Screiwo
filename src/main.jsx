import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import CreateProfile from './components/Pages/main/CreateProfile.jsx';
import { BrowserRouter, Routes, Route } from "react-router-dom"; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter> <Routes>
        <Route path="/" element={<App />} /> 
        <Route path="/createprofile" element={<CreateProfile />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
