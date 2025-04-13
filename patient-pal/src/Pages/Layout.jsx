import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Container,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

function Layout() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  return (
    <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh", // Full viewport height
            }}
        >
      {/* AppBar with Burger Menu */}
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            PatientPal
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Drawer for Burger Menu */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            <ListItem button component={Link} to="/">
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button component={Link} to="/login">
              <ListItemText primary="Login" />
            </ListItem>
            <ListItem button component={Link} to="/register">
              <ListItemText primary="Register" />
            </ListItem>
            <ListItem button component={Link} to="/MedicalApp">
              <ListItemText primary="MedicalApp" />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '87vh',
        textAlign: 'center',
        padding: 2,
    }}>
        <Box sx={{ my: 4 }}>
          <Outlet /> {/* This renders the child routes */}
        </Box>
      </Container>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
            py: 2,
            px: 2,
            backgroundColor: (theme) =>
                theme.palette.mode === "light" ? theme.palette.grey[200] : theme.palette.grey[800],
            textAlign: "center",
        }}
        >
        <Typography variant="body2" color="text.secondary">
            © 2025 PatientPal. All rights reserved.
        </Typography>
        </Box>
    </Box>
  );
}

export default Layout;