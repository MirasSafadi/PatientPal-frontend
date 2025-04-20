import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "../context/AuthContext";

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { token } = useContext(AuthContext); // Access the token from AuthContext

  useEffect(() => {
    // Initialize the socket connection
    const newSocket = io("http://localhost:5000", {
        transports: ["polling", "websocket"],
        extraHeaders: {
            Authorization: `Bearer ${token}`, // Use the token from AuthContext
        },
    });

    setSocket(newSocket);

    // Clean up the socket connection on unmount
    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};