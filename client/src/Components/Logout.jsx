import { Button } from '@mui/material';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SetIsLoggedInContext } from '../App';
import axiosInstance from "../axiosInstance";
import { API_PATHS } from '../utils/constants/api';

export const Logout = () => {
  const btnStyle = { margin: "0 10px" };
  const navigate = useNavigate();
  const setIsLoggedIn  = useContext(SetIsLoggedInContext);

  const handleLogout = async () => {
    const response = await axiosInstance.post(API_PATHS.LOGOUT, {}, { withCredentials: true })
    try {
      if (response.status === 200) {
        setIsLoggedIn(false);
        localStorage.clear();
        navigate("/login");
      }
    } catch (err) {
      window.alert("An error occurred. Please try again later.", err);
    }
  }
  return (
    <>
      <Button onClick={handleLogout} style={btnStyle} variant='contained'>Logout</Button>
    </>
  )
}
