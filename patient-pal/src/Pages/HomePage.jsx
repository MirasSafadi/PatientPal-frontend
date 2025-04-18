import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, Button, Paper } from "@mui/material";
import { useSocket } from "./SocketContext"; // Import the useSocket hook

function HomePage() {
  const socket = useSocket(); // Access the socket instance
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (!socket) return;
    // Listen for connection
    socket.on("connect", () => {
        console.log("Connected to server");
    });
    
    socket.on("response", (data) => {
        console.log("Server response:", data);
    });
    // Listen for incoming messages
    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Clean up the listener on unmount
    return () => {
      socket.off("message");
    };
  }, [socket]);

  const handleSendMessage = () => {
    if (input.trim() && socket) {
      const userMessage = { text: input, sender: "user" };

      // Emit the message to the server
      socket.emit("message", userMessage);

      // Add the user's message to the chat
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setInput("");
    }
  };

  return (
    <Box sx={{ textAlign: "center", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Welcome to PatientPal
      </Typography>
      <Typography variant="body1" gutterBottom>
        Chat with us to get assistance or manage your tasks.
      </Typography>

      {/* Chat Box */}
      <Paper
        elevation={10}
        sx={{
          width: "100%",
          maxWidth: 600,
          margin: "20px auto",
          padding: 2,
          textAlign: "left",
        }}
      >
        <Box
          sx={{
            height: 500,
            overflowY: "auto",
            border: "1px solid #ccc",
            borderRadius: 1,
            padding: 1,
            mb: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: messages.length === 0 ? "center" : "flex-start",
          }}
        >
          {messages.length === 0 && (
            <Typography
              sx={{
                textAlign: "center",
                opacity: 0.5,
              }}
            >
              Start chatting with us! Type your message below and hit "Send".
            </Typography>
          )}
          {messages.map((message, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent: message.sender === "user" ? "flex-end" : "flex-start",
                mb: 1,
              }}
            >
              <Typography
                sx={{
                  maxWidth: "70%",
                  padding: 1,
                  borderRadius: 2,
                  backgroundColor: message.sender === "user" ? "#1976d2" : "#e0e0e0",
                  color: message.sender === "user" ? "#ffffff" : "#000000",
                }}
              >
                {message.text}
              </Typography>
            </Box>
          ))}
        </Box>
        <Box sx={{ display: "flex", gap: 1 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
          />
          <Button variant="contained" color="primary" onClick={handleSendMessage}>
            Send
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default HomePage;