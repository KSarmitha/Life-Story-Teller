import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import React, { useContext } from "react";
import { IsLoggedInContext } from "../App";
import { Logout } from "./Logout";

export const Navbar = () => {
  const btnStyle = { margin: "0 10px" };
  const isLoggedIn = useContext(IsLoggedInContext);

  return (
    <>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Navbar
          </Typography>
          {isLoggedIn ? (
            <Logout />
          ) : (
            <>
              <Button style={btnStyle} variant="contained" href="/signup">
                Signup
              </Button>
              <Button style={btnStyle} variant="contained" href="/login">
                Login
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};
