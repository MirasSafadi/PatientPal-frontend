//src/Pages/RegisterPage.jsx
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


const RegisterPage = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    idNumber: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const [errors, setErrors] = useState({});


  const validate = () => {
    const newErrors = {};

    //Required fields (user cant submit if empty field exists)
    Object.entries(form).forEach(([key, value]) => {
      if (!value.trim()) {
        newErrors[key] = "This field needs to be filled.";
      }
    });

    //First & Last Name length check and non-alphabetical characters check
    if (form.firstName) {
      if (form.firstName.length < 3) {
        newErrors.firstName = "Name must be at least 3 characters long.";
      } else if (!/^[A-Za-z]+$/.test(form.firstName)) {
        newErrors.firstName = "Name must contain only letters.";
      }
    }
    
    if (form.lastName) {
      if (form.lastName.length < 3) {
        newErrors.lastName = "Name must be at least 3 characters long.";
      } else if (!/^[A-Za-z]+$/.test(form.lastName)) {
        newErrors.lastName = "Name must contain only letters.";
      }
    }
    

    //ID Number: 9 digits, numbers only
    if (form.idNumber && !/^\d{9}$/.test(form.idNumber)) {
      newErrors.idNumber = "ID number must be exactly 9 digits.";
    }

    //Phone Number: 10 digits, starts with 05
    if (form.phone && !/^05\d{8}$/.test(form.phone)) {
      newErrors.phone = "Phone number must start with '05' and be 10 digits long.";
    }

    //Email format
    if (form.email && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    

    //Password strength
    if (form.password && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(form.password)) {
      newErrors.password = "Password must be at least 8 characters and contain small case and big case letters and numbers.";
    }
    

    //Password match
    if (form.confirmPassword !== form.password) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Register form submitted", form);
      // Continue to submit logic or backend API call here
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
        {/* Back Arrow +Title Row */}
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



        <Typography variant="h6" mt={2} mb={2} align="left"
          fontWeight="600"
          sx={{ fontFamily: "'Poppins', sans-serif", fontSize: "1rem" }}

        >
          Create Account!
        </Typography>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <Stack direction="row" spacing={2}>
            <Box sx={{ flex: 1 }}>
              {errors.firstName && (
                <Typography variant="body2" color="error" sx={{ mt: 1, mb: -1 }}>
                  {errors.firstName}
                </Typography>
              )}
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={form.firstName}
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

            <Box sx={{ flex: 1 }}>
              {errors.lastName && (
                <Typography variant="body2" color="error" sx={{ mt: 1, mb: -1 }}>
                  {errors.lastName}
                </Typography>
              )}
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={form.lastName}
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
          {errors.idNumber && (
            <Typography variant="body2" color="error" sx={{ mt: 1, mb: -1 }}>
              {errors.idNumber}
            </Typography>
          )}
          <TextField
            fullWidth
            margin="dense"
            label="ID Number"
            name="idNumber"
            value={form.idNumber}
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
          {errors.phone && (
            <Typography variant="body2" color="error" sx={{ mt: 1, mb: -1 }}>
              {errors.phone}
            </Typography>
          )}
          <TextField
            fullWidth
            margin="dense"
            label="Phone Number"
            name="phone"
            value={form.phone}
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
          {errors.email && (
            <Typography variant="body2" color="error" sx={{ mt: 1, mb: -1 }}>
              {errors.email}
            </Typography>
          )}
          <TextField
            fullWidth
            margin="dense"
            label="Email"
            name="email"
            type="email"
            value={form.email}
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
          {errors.username && (
            <Typography variant="body2" color="error" sx={{ mt: 1, mb: -1 }}>
              {errors.username}
            </Typography>
          )}
          <TextField
            fullWidth
            margin="dense"
            label="Username"
            name="username"
            value={form.username}
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

          {errors.password && (
            <Typography variant="body2" color="error" sx={{ mt: 1, mb: -1 }}>
              {errors.password}
            </Typography>
          )}

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
          {errors.confirmPassword && (
            <Typography variant="body2" color="error" sx={{ mt: 1, mb: -1 }}>
              {errors.confirmPassword}
            </Typography>
          )}
          <TextField
            fullWidth
            margin="dense"
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
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
            Sign up
          </Button>
        </form>


      </Box>
    </Container>
  );
};

export default RegisterPage;
