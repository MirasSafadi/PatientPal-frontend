import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken"); // Retrieve the token from localStorage
    const username = localStorage.getItem("username"); // Retrieve the username from localStorage
    // Initialize the socket connection
    const newSocket = io("http://localhost:5000", {
        transports: ["polling", "websocket"],
        extraHeaders: {
            Authorization: `Bearer ${token}`, // Use the retrieved token
            Username: username, // Use the retrieved username
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