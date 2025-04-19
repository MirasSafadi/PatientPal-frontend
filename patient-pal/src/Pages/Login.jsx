import React, { useState, useContext, useEffect } from "react"; 
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Link, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [form, setForm] = useState({
    username: "testuser",
    password: "testpass",
  });
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  // פונקציית בדיקת תפוגת JWT
  const isTokenExpired = (token) => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const now = Math.floor(Date.now() / 1000);
      return payload.exp && payload.exp < now;
    } catch (e) {
      return true;
    }
  };

  // useEffect: אם יש טוקן בתוקף → להשאיר. אם לא – למחוק אותו
  useEffect(() => {
    const storedToken =
      localStorage.getItem("token") ||
      document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

    if (storedToken && isTokenExpired(storedToken)) {
      // טוקן פג תוקף → מוחקים ומאפסים
      localStorage.removeItem("token");
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      setToken(null);
    }
  }, [setToken]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
          username: form.username,
          password: form.password
        })
      });

      const data = await response.json();

      if (response.ok && data.token) {
        setToken(data.token);

        if (rememberMe) {
          localStorage.setItem("token", data.token);
        } else {
          document.cookie = `token=${data.token}; path=/`;
        }

        navigate("/");
      } else {
        setError(data.error || data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Server error. Please try again later.");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          mt: 5,
          p: 4,
          borderRadius: 3,
          boxShadow: 3,
          backgroundColor: "#f5f5f5",
        }}
      >
        {/* Back Arrow + Title Row */}
        <Box sx={{ position: "relative", mb: 3 }}>
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <ArrowBackIosNewIcon
              sx={{
                position: "absolute",
                left: 0,
                top: "50%",
                transform: "translateY(-50%)",
                color: "text.primary",
                fontSize: "1.2rem",
                cursor: "pointer"
              }}
            />
          </Link>

          <Typography
            variant="h4"
            fontWeight="bold"
            align="center"
            sx={{ fontFamily: "'Poppins', sans-serif" }}
          >
            <Box component="span" color="primary.main">
              Patient
            </Box>
            <Box component="span" sx={{ color: '#5DBB63' }}>
              Pal
            </Box>
          </Typography>
        </Box>

        <Typography
          variant="h6"
          mt={2}
          mb={2}
          align="left"
          fontWeight="600"
          sx={{ fontFamily: "'Poppins', sans-serif", fontSize: "1rem" }}
        >
          Login to Your Account
        </Typography>

        {/* Form */}
        <form onSubmit={handleLogin}>
          <Stack direction="row" spacing={2}>
            <Box sx={{ flex: 1 }}>
              <TextField
                fullWidth
                label="Username"
                name="username"
                value={form.username}
                onChange={handleChange}
                variant="filled"
                margin="dense"
                InputProps={{
                  disableUnderline: true,
                  sx: {
                    borderRadius: "15px",
                    backgroundColor: "#fff",
                    fontFamily: "'Poppins', sans-serif",
                  },
                }}
              />
            </Box>
          </Stack>

          <TextField
            fullWidth
            margin="dense"
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            variant="filled"
            InputProps={{
              disableUnderline: true,
              sx: {
                borderRadius: "15px",
                backgroundColor: "#fff",
                fontFamily: "'Poppins', sans-serif"
              },
            }}
          />

          {/* Remember Me Checkbox */}
          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className="mr-2"
            />
            <label htmlFor="rememberMe" className="text-sm text-gray-600">Remember me</label>
          </div>

          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{
              mt: 2, mb: 1, borderRadius: 2, fontFamily: "'Poppins', sans-serif", fontSize: "1rem", width: "70%",
              mx: "auto",
              display: "block",
            }}
          >
            Login
          </Button>

          {error && (
            <Typography color="error" variant="body2" mt={2} align="center">
              {error}
            </Typography>
          )}
        </form>

        {/* Sign Up Link */}
        <Box sx={{ textAlign: "center", mt: 3 }}>
          <Typography variant="body2">
            Don't have an account?{" "}
            <Link to="/register" style={{ color: '#1976d2', fontWeight: 'bold', textDecoration: 'none' }}>
              Sign Up
            </Link>
          </Typography>
        </Box>

      </Box>
    </Container>
  );
};

export default Login;
