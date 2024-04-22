import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const toggleAuthentication = () => {
    setIsAuthenticated((prevAuth) => !prevAuth);
  };

  const authContextValue = {
    isAuthenticated,
    toggleAuthentication,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};