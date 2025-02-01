import {
  Alert,
  AlertTitle,
  Button,
  Link,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_PATHS } from "../utils/constants/api";

export const Signup = () => {
  const heading = { margin: "5px 0", textAlign: "center" };
  const paperStyle = {
    padding: "2rem",
    margin: "40px auto",
    borderRadius: "1rem",
    boxShadow: "10px 10px 10px rgba(0,0,0,0.1)",
    backgroundColor: "var(--white)",
  };
  const row = { display: "flex", marginTop: "1.5rem" };
  const btnStyle = {
    marginTop: "1.5rem",
    fontWeight: "700",
    backgroundColor: "var(--primary)",
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(API_PATHS.SIGNUP, { name, email, password })
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          setSuccessMessage("User created successfully");
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.status === 400) {
          setErrorMessage("User already exists");
        } else {
          setErrorMessage("Internal server error");
        }
      });
  };

  return (
    <>
      {errorMessage && (
        <Snackbar
          open={open}
          autoHideDuration={3000}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          onClose={() => setOpen(false)}
          sx={{ width: "400px" }}
        >
          <Alert
            severity="error"
            onClose={() => setOpen(false)}
            sx={{ width: "100%" }}
          >
            <AlertTitle>Error</AlertTitle>
            {errorMessage}
          </Alert>
        </Snackbar>
      )}
      {successMessage && (
        <Snackbar
          open={open}
          autoHideDuration={3000}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          onClose={() => setOpen(false)}
          sx={{ width: "400px" }}
        >
          <Alert
            severity="success"
            onClose={() => setOpen(false)}
            sx={{ width: "100%" }}
          >
            <AlertTitle>Success</AlertTitle>
            {successMessage}
          </Alert>
        </Snackbar>
      )}
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          backgroundColor: "var(--background)",
        }}
      >
        {/* Left Side: Image */}
        <div
          style={{
            flex: 1,
            backgroundImage: `url("post.svg")`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            alignItems: "center",
            height: "100%",
          }}
        ></div>

        {/* Right Side: Login Form */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* Title & Phrase (Above the Login Component) */}
          <div style={{ marginBottom: "2rem", textAlign: "center" }}>
            <Typography variant="h3" fontWeight="bold" color="var(--secondary)">
              Life Story Teller
            </Typography>
            <Typography variant="h6" color="var(--white)">
              Make your own story here
            </Typography>
          </div>

          {/* Login Form */}
          <Paper
            elevation={10}
            style={paperStyle}
            sx={{
              width: "25vw",
            }}
          >
            <h2 style={heading} className="heading">
              Sign Up
            </h2>
            <form onSubmit={handleSubmit}>
              <TextField
                onChange={(e) => setName(e.target.value)}
                name="name"
                style={row}
                label="Username"
                placeholder="Enter username"
                type="text"
                fullWidth
                required
              />
              <TextField
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                style={row}
                label="Email"
                placeholder="Enter email"
                type="email"
                fullWidth
                required
              />
              <TextField
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                style={row}
                label="Password"
                placeholder="Enter password"
                type="password"
                fullWidth
                required
              />
              <Button
                style={btnStyle}
                type="submit"
                color="primary"
                variant="contained"
                fullWidth
              >
                Sign up
              </Button>
              <Typography className="center pt-5 desc">
                Already have an account? <Link href="/login">Log in</Link>
              </Typography>
            </form>
          </Paper>
        </div>
      </div>
    </>
  );
};
