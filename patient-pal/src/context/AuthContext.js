import { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);


export const AuthProvider = ({ children }) => {
  const [token, setTokenState] = useState(() => {
    // Initialize the token from localStorage or cookies
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      return savedToken;
    }
    const cookieToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
    return cookieToken || null;
  });

  useEffect(() => {
    // Sync the token with localStorage or cookies if it changes
    if (token) {
      localStorage.setItem("token", token);
      document.cookie = `token=${token}; path=/;`;
    } else {
      localStorage.removeItem("token");
      document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    }
  }, [token]);

  const setToken = (newToken) => {
    setTokenState(newToken);
  };

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
