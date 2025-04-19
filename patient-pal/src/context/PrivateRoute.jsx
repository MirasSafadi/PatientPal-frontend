import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import React from "react";

const PrivateRoute = ({ children, ...rest }) => {
    const { token } = useContext(AuthContext);
  
    return token ? (
      // Pass all props to children
      React.Children.map(children, child => {
        return React.cloneElement(child, { ...rest }); // Pass rest props to children
      })
    ) : (
      <Navigate to="/login" replace />
    );
  };

  export default PrivateRoute;