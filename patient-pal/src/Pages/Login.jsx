import React, { useState, useContext } from "react";
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
        navigate("/");
      } else {
        setError(data.error || data.message || "Login failed");
      }
    } catch (err) {
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
        {/* Title Row (ללא חץ חזור) */}
        <Box sx={{ mb: 3 }}>
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

          {/* Register Link */}
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            אין לך חשבון?{" "}
            <Link to="/register" style={{ color: "#1976d2", textDecoration: "none" }}>
              הירשם כאן
            </Link>
          </Typography>

          {/* Error Message */}
          {error && (
            <Typography color="error" variant="body2" mt={2} align="center">
              {error}
            </Typography>
          )}
        </form>
      </Box>
    </Container>
  );
};

export default Login;
