// page for authentication if needed in future in this project


import { createContext, useState } from "react";


export const AuthContext = createContext();


export function AuthContextProvider({ children }) {
  const [authDetails, setAuthDetails] = useState({
    isLoggedIn: true,
    token: null,
  });

  const login = (token) => {
    setAuthDetails({
      isLoggedIn: true,
      token: token,
    });
  };

  const logout = () => {
    setAuthDetails({
      isLoggedIn: false,
      token: null,
    });
  };

  return (
    <AuthContext.Provider value={{ authDetails, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
