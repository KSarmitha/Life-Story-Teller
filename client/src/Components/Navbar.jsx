import { AppBar, Avatar, Stack, Toolbar, Typography } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Logout } from "./Logout";

export const Navbar = () => {
  const navBar = { backgroundColor: "var(--primary)", padding: "0 10px" };
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state?.user;
  const firstName =
    user?.name?.split(" ")[0] || localStorage.getItem("user_name");

  const handleProfile = () => {
    navigate("/profile");
  };

  const backToLanding = () => {
    navigate("/landing");
  };

  return (
    <>
      <AppBar style={navBar}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, cursor: "pointer" }}
            onClick={backToLanding}
          >
            <img src="logo.png" alt="Logo" style={{ height: "55px" }} />
          </Typography>

          <Stack direction="row" spacing={2}>
            <Avatar
              onClick={handleProfile}
              sx={{
                bgcolor: "var(--mint-green)",
                color: "var(--primary)",
                cursor: "pointer",
              }}
            >
              {firstName[0]}
            </Avatar>
            <Typography
              onClick={handleProfile}
              variant="body1"
              sx={{
                color: "var(--white)",
                alignSelf: "center",
                cursor: "pointer",
              }}
            >
              {firstName}
            </Typography>

            <Logout />
          </Stack>
        </Toolbar>
      </AppBar>
    </>
  );
};
