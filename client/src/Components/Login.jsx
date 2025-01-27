import { Button, Link, Paper, TextField, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SetIsLoggedInContext } from "../App";
import axiosInstance from "../axiosInstance";
import { API_PATHS } from "../utils/constants/api";

export const Login = () => {
  const heading = {
    margin: "5px 0",
    fontSize: "2rem",
    fontWeight: "600",
    textAlign: "center",
  };
  const paperStyle = {
    padding: "2rem",
    margin: "100px auto",
    borderRadius: "1rem",
    boxShadow: "10px 10px 10px rgba(0,0,0,0.1)",
  };
  const row = { display: "flex", marginTop: "2rem" };
  const btnStyle = { marginTop: "2rem", fontWeight: "700" };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const setIsLoggedIn = useContext(SetIsLoggedInContext);

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
                }
              }
            })
            .catch((err) => {
              if (err && err.status === 401) {
                window.alert("Unauthorized");
              } else {
                window.alert("Internal server error");
              }
            });
        }
      })
      .catch((err) => {
        if (err && err.status === 404) {
          window.alert("User not found");
        } else if (err && err.status === 401) {
          window.alert("Invalid credentials");
        } else {
          window.alert("Internal server error");
        }
      });
  };

  return (
    <>
      <div>
        <Paper
          elevation={10}
          style={paperStyle}
          sx={{
            width: {
              xs: "80vw",
              sm: "50vw",
              md: "40vw",
              lg: "30vw",
              xl: "20vw",
            },
            height: "60vh",
          }}
        >
          <h2 style={heading}>Login</h2>
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
              color="primary"
              variant="contained"
              fullWidth
            >
              Login
            </Button>
            <Typography>
              <Link href="#">Already have an account?</Link>
            </Typography>
          </form>
        </Paper>
      </div>
    </>
  );
};
