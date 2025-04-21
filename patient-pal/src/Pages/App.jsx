import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageNotFound from './404-Not-Found.jsx';
import Home from './HomePage.jsx';
import Layout from './Layout.jsx';
import { SocketProvider } from "./SocketContext.jsx"; // Import the SocketProvider

import '../styles/App.css';

// Mock authentication function
const isAuthenticated = () => {
  // Replace this with your actual authentication logic
  return localStorage.getItem("authToken") !== null;
};

function App() {
  return (
    
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
          <Route
              index
              element={
                // isAuthenticated() ? <Home /> : <Navigate to="/login" replace />
                <SocketProvider>
                <Home />
                </SocketProvider>
              }
            />
            {/* <Route path="login" element={<Login />} /> */}
            {/* <Route path="register" element={<Register />} /> */}
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    
  );
}

export default App;
