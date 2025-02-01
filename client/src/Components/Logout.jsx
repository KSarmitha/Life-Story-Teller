import LogoutIcon from "@mui/icons-material/Logout";
import { Alert, AlertTitle, Button, Snackbar } from "@mui/material";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SetIsLoggedInContext } from "../App";
import axiosInstance from "../axiosInstance";
import { API_PATHS } from "../utils/constants/api";

export const Logout = () => {
  const navigate = useNavigate();
  const setIsLoggedIn = useContext(SetIsLoggedInContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(true);

  const handleLogout = async () => {
    const response = await axiosInstance.post(
      API_PATHS.LOGOUT,
      {},
      { withCredentials: true }
    );
    try {
      if (response.status === 200) {
        setIsLoggedIn(false);
        localStorage.clear();
        navigate("/login");
      }
    } catch (err) {
      setErrorMessage("An error occurred. Please try again later.", err);
    }
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
      <Button onClick={handleLogout} color="inherit">
        <LogoutIcon sx={{ color: "var(--white)" }} />
      </Button>
    </>
  );
};
