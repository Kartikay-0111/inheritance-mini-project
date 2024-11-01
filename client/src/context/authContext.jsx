// AuthContext.js
import React, { createContext, useState, useContext, useEffect } from "react";
import { googleLogout } from "@react-oauth/google";
import {jwtDecode} from "jwt-decode";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      const userObject = jwtDecode(savedToken);
      setUser({ name: userObject.name, email: userObject.email ,picture: userObject.picture});
    }
  }, []);

  const login = (credentialResponse) => {
    const token = credentialResponse.credential;
    const userObject = jwtDecode(token);
    setUser({ name: userObject.name, email: userObject.email });
    setToken(token);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userObject));
  };

  const logout = () => {
    googleLogout();
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for consuming AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
