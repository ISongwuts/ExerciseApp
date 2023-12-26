import React, { createContext, useContext, useState } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    // TODO: Perform login logic, set user state, and handle authentication
    // For now, let's just set the user state with the provided data
    setUser(userData);
  };

  const logout = () => {
    // TODO: Perform logout logic, clear user state, and handle de-authentication
    // For now, let's just set the user state to null
    Cookies.remove('userData')
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};