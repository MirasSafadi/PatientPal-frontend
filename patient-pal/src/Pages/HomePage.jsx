import React, { useState } from "react";
import { Box, Typography, TextField, Button, Paper } from "@mui/material";

function HomePage() {
    // State to manage chat messages and input
    const [messages, setMessages] = useState([{
        text: "Your message here", // The content of the message
        sender: "user"            // Indicates the sender (e.g., "user")
    }, {
        text: "Your message here",
        sender: "bot"            // Indicates the sender (e.g., "user")
    }]);
    const [input, setInput] = useState("");

    const handleSendMessage = () => {
        //Will fetch the messages from the server and update the state
        // For now, we will just add the user message to the chat
        if (input.trim()) {
            setMessages([...messages, { text: input, sender: "user" }]);
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
                        flexDirection: "column", // Stack messages vertically
                        alignItems: "center", // Center the welcome message
                        justifyContent: messages.length === 0 ? "center" : "flex-start", // Center if no messages
                    }}
                >
                    {messages.map((message, index) => (
                        <Box
                            key={index}
                            sx={{
                                display: "flex",
                                justifyContent: message.sender === "user" ? "flex-end" : "flex-start",
                                mb: 1,
                                width: "100%", // Ensure messages take up the full width of the container
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
                        autoComplete="off"
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleSendMessage();
                            }
                        }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSendMessage}
                    >
                        Send
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
}

export default HomePage;