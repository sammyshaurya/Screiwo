import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import { Profile } from "./components/Pages/main/Profile";
import AuthGuard from "./components/AuthGuard";
import CreateProfile from "./components/Pages/main/CreateProfile.jsx";
import Postings from "@/components/Pages/Postings"

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<App />} />
      
      <Route
        path="/*"
        element={
          // <AuthGuard>
            <Routes>
              <Route path="/createprofile" element={<CreateProfile />} exact/>
              <Route path="/profile" element={<Profile />} exact/>
              <Route path="/post" element={<Postings />} exact/>
              {/* Add any other protected routes here */}
            </Routes>
          // </AuthGuard>
        }
      />
    </Routes>
  </BrowserRouter>
);