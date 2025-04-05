import React, { useState } from "react";
import { Box, Typography, TextField, Button, Paper } from "@mui/material";

function HomePage() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    const handleSendMessage = () => {
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
                elevation={3}
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
                        height: 300,
                        overflowY: "auto",
                        border: "1px solid #ccc",
                        borderRadius: 1,
                        padding: 1,
                        mb: 2,
                        display: "flex", // Center the welcome message
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    {messages.length === 0 ? (
                        <Typography variant="body1" color="text.secondary" textAlign="center">
                            Welcome to PatientPal! Start a conversation to get assistance.
                        </Typography>
                    ) : (
                        messages.map((message, index) => (
                            <Typography
                                key={index}
                                sx={{
                                    textAlign: message.sender === "user" ? "right" : "left",
                                    mb: 1,
                                }}
                            >
                                {message.text}
                            </Typography>
                        ))
                    )}
                </Box>
                <Box sx={{ display: "flex", gap: 1 }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Type your message..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
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