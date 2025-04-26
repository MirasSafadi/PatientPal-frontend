import { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const isTokenExpired = async (token) => {
  // check if the token is valid
  try {
    const response = await fetch("http://localhost:5000/validate_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        token: token
      })
    });

    const data = await response.json();

    return response.ok && data.message === "Token is valid"

  } catch (err) {
    console.error("Token validity error:", err);
  }
  return false;
}

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
    if (token && isTokenExpired(token)) {
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
