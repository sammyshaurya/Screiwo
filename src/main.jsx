// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
// import "./index.css";
// import CreateProfile from "./components/Pages/main/CreateProfile.jsx";
// import { BrowserRouter, Routes, Route } from "react-router-dom";

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<App />} />
//         <Route path="/createprofile" element={<CreateProfile />} />
//       </Routes>
//     </BrowserRouter>
//   </React.StrictMode>
// );


import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import { Home } from "./components/Pages/main/Home";
import CreateProfile from "./components/Pages/main/CreateProfile.jsx";
import axios from "axios";


function AuthGuard({ children }) {
  if (localStorage.getItem("token")) {
    return children;
  }
  else {
    return <Navigate to="/" replace />;
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<App />} />
      <Route
        path="/*"
        element={
          <AuthGuard>
            <Routes>
              <Route path="/createprofile" element={<CreateProfile />} exact/>
              <Route path="/home" element={<Home />} exact/>
              {/* Add any other protected routes here */}
            </Routes>
          </AuthGuard>
        }
      />
    </Routes>
  </BrowserRouter>
);
