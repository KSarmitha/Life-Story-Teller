import SendIcon from "@mui/icons-material/Send";
import { Box, IconButton, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import { API_PATHS } from "../utils/constants/api";

export const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const [userStories, setUserStories] = useState([]);
  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await axiosInstance.get(
          `${API_PATHS.STORY}/user/${userId}`
        );
        setUserStories(response.data);
      } catch (error) {
        console.error("Error fetching stories:", error);
      }
    };
    fetchStories();
  }, [userId]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const storiesContext = userStories
        .map((story) => story.content)
        .join("\n");

      const response = await axiosInstance.post(`${API_PATHS.CHAT}/gemini`, {
        question: input,
        context: storiesContext,
      });

      const botResponse = {
        sender: "bot",
        text: response.data.answer,
      };
      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      const errorResponse = {
        sender: "bot",
        text: "Sorry, I couldn't process your request at the moment.",
      };
      setMessages((prev) => [...prev, errorResponse]);
    }
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div>
      <img
        onClick={handleOpen}
        src="chatbot.png"
        alt="Chat bot"
        style={{ height: "110px", width: "100%" }}
      />

      {open && (
        <Box
          sx={{
            position: "fixed",
            bottom: 100,
            right: 20,
            width: 300,
            height: 400,
            backgroundColor: "white",
            border: "1px solid #ccc",
            borderRadius: 2,
            boxShadow: 3,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            zIndex: 1000,
          }}
        >
          <Box
            sx={{
              padding: 2,
              borderBottom: "1px solid #ccc",
              backgroundColor: "var(--primary)",
              color: "white",
            }}
          >
            <Typography variant="h6">🤔 Talk to Me</Typography>
          </Box>
          <Box
            sx={{
              flex: 1,
              padding: 2,
              overflowY: "auto",
              backgroundColor: "#f9f9f9",
            }}
          >
            {messages.map((message, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent:
                    message.sender === "user" ? "flex-end" : "flex-start",
                  marginBottom: 1,
                }}
              >
                <Box
                  sx={{
                    padding: 1,
                    borderRadius: 2,
                    backgroundColor:
                      message.sender === "user" ? "#1976d2" : "#e0e0e0",
                    color: message.sender === "user" ? "#fff" : "#000",
                    maxWidth: "70%",
                  }}
                >
                  <Typography variant="body2" sx={{ wordWrap: "break-word" }}>
                    {message.text}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              padding: 1,
              borderTop: "1px solid #ccc",
            }}
          >
            <TextField
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question or story here..."
              variant="outlined"
              size="small"
              fullWidth
              sx={{ marginRight: 1 }}
            />
            <IconButton
              style={{ color: "var(--neon-green)" }}
              onClick={handleSend}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Box>
      )}
    </div>
  );
};
