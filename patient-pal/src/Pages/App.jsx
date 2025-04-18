import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PageNotFound from './404-Not-Found.jsx';
import Home from './HomePage.jsx';
import Layout from './Layout.jsx';
import Register from "./Register";
 // ✅ ודא שהקובץ קיים
import Login from "./Login.jsx";
import MedicalApp from "./MedicalApp.jsx";
import { SocketProvider } from "./SocketContext.jsx"; // Import the SocketProvider

import '../styles/App.css';

import { AuthProvider, AuthContext } from "../context/AuthContext";
import { useContext } from "react";

// ✔️ פונקציית עטיפה בשביל לגשת ל־Context בתוך Routes
const PrivateRoute = ({ children }) => {
  const { token } = useContext(AuthContext);
  return token ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
          <Route
              index
              element={
                // isAuthenticated() ? <Home /> : <Navigate to="/login" replace />
                <PrivateRoute>
                  <SocketProvider>
                    <Home />
                  </SocketProvider>
                </PrivateRoute>
              }
            />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} /> {/* ✅ פתיחת המסלול */}
            <Route path="MedicalApp" element={<MedicalApp />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
