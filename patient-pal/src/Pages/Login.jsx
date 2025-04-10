import React, { useState } from "react";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Link } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Stack,
} from "@mui/material";
 
const Login = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
 
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
 
  const [rememberMe, setRememberMe] = useState(false);
 
  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Username:", form.username, "Password:", form.password);
    // Continue to submit logic or backend API call here
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
        </form>
      </Box>
    </Container>
  );
};
 
export default Login;
 