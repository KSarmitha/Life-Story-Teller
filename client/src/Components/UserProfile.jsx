import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Container,
  MenuItem,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import { API_PATHS } from "../utils/constants/api";

const UserProfile = () => {
  const [bio, setBio] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [professional, setProfessional] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [education, setEducation] = useState("");
  const [gender, setGender] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem("user_id");
        const response = await axiosInstance.get(`${API_PATHS.USER}/${userId}`);
        const userData = response.data;

        // Format the date to YYYY-MM-DD for the date input
        const formattedBirthdate = userData.birthdate
          ? new Date(userData.birthdate).toISOString().split("T")[0]
          : "";

        setBio(userData.bio || "");
        setBirthdate(formattedBirthdate);
        setFirstName(userData.firstName || "");
        setLastName(userData.lastName || "");
        setProfessional(userData.professional || "");
        setWebsiteUrl(userData.websiteUrl || "");
        setEducation(userData.education || "");
        setGender(userData.gender || "");
      } catch (error) {
        setErrorMessage("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userProfileData = {
      bio,
      birthdate,
      firstName,
      lastName,
      professional,
      websiteUrl,
      education,
      gender,
    };
    try {
      console.info("Profile Data", userProfileData);
      const userId = localStorage.getItem("user_id"); // Make sure to store userId in localStorage during login
      const response = await axiosInstance.put(
        `${API_PATHS.USER}/${userId}`,
        userProfileData
      );
      setSuccessMessage("Profile updated successfully", response.data);
    } catch (error) {
      setErrorMessage("Error updating profile:", error);
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
      <Container
        style={{
          padding: "10px",
          borderRadius: "8px",
          maxWidth: "1000px",
          marginTop: "0",
          height: "80vh",
          backgroundColor: "var(--secondary-bg)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          style={{
            fontFamily: "var(--font)",
            marginBottom: "20px",
            color: "var(--primary)",
          }}
        >
          User Profile
        </Typography>
        <form onSubmit={handleSubmit} style={{ height: "100%" }}>
          <Box
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "20px",
              height: "100%",
            }}
          >
            <TextField
              label="FirstName"
              variant="outlined"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />

            <TextField
              label="LastName"
              variant="outlined"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />

            <TextField
              label="Bio"
              variant="outlined"
              multiline
              rows={2}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              style={{ gridColumn: "span 2" }}
            />

            <TextField
              label="Birthdate"
              variant="outlined"
              type="date"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />

            <TextField
              label="Gender"
              variant="outlined"
              select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
              <MenuItem value="preferNotToSay">Prefer not to say</MenuItem>
            </TextField>

            <TextField
              label="Website/ URL"
              variant="outlined"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              style={{ gridColumn: "span 2" }}
            />

            <TextField
              label="Education"
              variant="outlined"
              multiline
              rows={4}
              value={education}
              onChange={(e) => setEducation(e.target.value)}
            />

            <TextField
              label="Professional Info"
              variant="outlined"
              multiline
              rows={4}
              value={professional}
              onChange={(e) => setProfessional(e.target.value)}
            />
          </Box>
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            <Button
              type="submit"
              variant="contained"
              style={{
                backgroundColor: "var(--primary)",
              }}
            >
              Save
            </Button>
          </Box>
        </form>
      </Container>
    </>
  );
};

export default UserProfile;
