import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PageNotFound from './404-Not-Found.jsx';
import Home from './HomePage.jsx';
import Layout from './Layout.jsx';
import Register from "./Register";
import Login from "./Login.jsx";
import MedicalApp from "./MedicalApp.jsx";
import { SocketProvider } from "./SocketContext.jsx";
import '../styles/App.css';

import { AuthProvider, AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import PrivateRoute from "../context/PrivateRoute.jsx";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={
                <PrivateRoute>
                  <SocketProvider>
                    <Home />
                  </SocketProvider>
                </PrivateRoute>
              }
            />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="MedicalApp" element={<MedicalApp />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
