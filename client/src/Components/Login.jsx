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
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SetIsLoggedInContext } from "../App";
import axiosInstance from "../axiosInstance";
import { API_PATHS } from "../utils/constants/api";

export const Login = () => {
  const heading = {
    margin: "5px 0",
    textAlign: "center",
  };
  const paperStyle = {
    padding: "2rem",
    margin: "50px auto",
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

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const setIsLoggedIn = useContext(SetIsLoggedInContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(true);

  const handleLogin = (e) => {
    e.preventDefault();
    axiosInstance
      .post(API_PATHS.LOGIN, { email, password })
      .then((res) => {
        if (res && res.status === 200) {
          localStorage.setItem("token", res?.data?.accessToken);
          axiosInstance
            .get(API_PATHS.USER)
            .then((res) => {
              if (res && res.status === 200) {
                setIsLoggedIn(true);
                if (res.data) {
                  navigate("/landing", { state: { user: res.data } });
                  localStorage.setItem("user_name", res?.data?.name);
                  localStorage.setItem("user_id", res?.data?.id);
                }
              }
            })
            .catch((err) => {
              if (err && err.status === 401) {
                setErrorMessage("Unauthorized");
              } else {
                setErrorMessage("Internal server error");
              }
            });
        }
      })
      .catch((err) => {
        if (err && err.status === 404) {
          setErrorMessage("User not found");
        } else if (err && err.status === 401) {
          setErrorMessage("Invalid credentials");
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
              Login
            </h2>
            <form onSubmit={handleLogin}>
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
                variant="contained"
                fullWidth
              >
                Login
              </Button>
              <Typography className="center pt-5 desc">
                Don't have an account? <Link href="/signup">Signup</Link>
              </Typography>
            </form>
          </Paper>
        </div>
      </div>
    </>
  );
};
