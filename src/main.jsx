import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
// import Test from "./test/Test";
import AuthGuard from "./components/AuthGuard";
import { Profile } from "./components/Pages/main/Profile";
import CreateProfile from "./components/Pages/main/CreateProfile.jsx";
import Home from "./components/Pages/main/Home/Home";
import Postings from "@/components/Pages/Postings";
import "@radix-ui/themes/styles.css";
import SearchPage from "./components/Pages/search/SearchPage";
import { UsersProfile } from "./components/Pages/main/UsersProfile/UsersProfile";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<App />} />
      <Route path="user/:username" element={<UsersProfile />} />
      {/* <Route path="/test" element={<Test />} /> */}
      
      <Route
        path="/*"
        element={
          <AuthGuard>
            <Routes>
              <Route path="/createprofile" element={<CreateProfile />} exact />
              <Route path="/profile" element={<Profile />} exact />
              <Route path="/post" element={<Postings />} exact />
              <Route path="/search" element={<SearchPage />} exact />
              <Route path="/home" element={<Home />} exact />
              {/* Add any other protected routes here */}
            </Routes>
          </AuthGuard>
        }
      />
    </Routes>
  </BrowserRouter>
);
