import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setTokenState] = useState(null);

  useEffect(() => {
    // נסה לטעון מה-localStorage
    const savedToken = localStorage.getItem("token");

    if (savedToken) {
      setTokenState(savedToken);
    } else {
      // אם לא קיים ב-localStorage, נבדוק ב-cookie
      const cookieToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      if (cookieToken) {
        setTokenState(cookieToken);
      }
    }
  }, []);

  // פונקציית setToken – רק משנה state
  // השמירה נעשית לפי תנאי rememberMe ב-Login.jsx
  const setToken = (newToken) => {
    setTokenState(newToken);
  };

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
