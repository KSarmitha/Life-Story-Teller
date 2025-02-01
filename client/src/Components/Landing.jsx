import { Button, Container, Typography } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Chatbot } from "./Chatbot";
import { StoryForm } from "./StoryForm";

export const Landing = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userName =
    location.state?.user?.name || localStorage.getItem("user_name");

  const viewStory = () => {
    navigate("/view");
  };

  return (
    <>
      <Container style={{ textAlign: "center" }}>
        <Typography variant="h5" className="desc">
          Welcome back{" "}
          <span style={{ color: "var(--neon-green)" }}>
            <strong>
              <i>{userName}</i>
            </strong>
          </span>{" "}
          ! Ready to relive and share your life's special moments?
        </Typography>

        <Button
          onClick={viewStory}
          variant="contained"
          style={{
            marginTop: "20px",
            marginBottom: "50px",
            backgroundColor: "var(--primary)",
          }}
        >
          Start Your Journey
        </Button>

        <StoryForm />
      </Container>

      <div
        style={{
          position: "absolute",
          bottom: "0",
          right: "0",
          transition: "all 0.5s ease-out",
          opacity: "0",
          cursor: "pointer",
        }}
        className="chatbot-container"
      >
        <Chatbot />
      </div>
    </>
  );
};
