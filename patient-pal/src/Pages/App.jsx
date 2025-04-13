import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PageNotFound from './404-Not-Found.jsx';
import Home from './HomePage.jsx';
import Layout from './Layout.jsx';
import Login from "./Login.jsx";
import MedicalApp from "./MedicalApp.jsx";
/*import register from "./register.jsx"; */
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
              isAuthenticated() ? <Home /> : <Navigate to="/login" replace />
              // <Home />
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="MedicalApp" element={<MedicalApp />} />
          

          {/*<Route path="register" element={<Register />} />*/ }
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
