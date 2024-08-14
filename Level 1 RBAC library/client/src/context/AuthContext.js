import React, { createContext, useState } from 'react';
import jwtDecode from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const token = localStorage.getItem('token');
    return token ? { token, user: jwtDecode(token) } : null;
  });

  const login = (token) => {
    localStorage.setItem('token', token);
    setAuth({ token, user: jwtDecode(token) });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuth(null);
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
