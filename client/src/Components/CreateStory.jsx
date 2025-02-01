import { Box, Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

export const CreateStory = ({ existingStory, onClose, onSave }) => {
  const [date, setDate] = useState("");
  const [story, setStory] = useState("");

  useEffect(() => {
    if (existingStory) {
      console.log(existingStory);
      const formattedDate = new Date(existingStory.date)
        .toISOString()
        .split("T")[0];
      setDate(formattedDate);
      setStory(existingStory.content);
    }
  }, [existingStory]);

  const handleSave = async () => {
    if (!date || !story) {
      alert("Please provide both a date and a story.");
      return;
    }

    const storyData = {
      userId: localStorage.getItem("user_id"),
      date,
      content: story,
    };

    try {
      onSave(storyData);
    } catch (error) {
      console.error("Error saving story:", error);
      alert("Failed to save story. Please try again.");
    }

    onClose();
  };

  return (
    <Box sx={{ padding: "16px" }}>
      <TextField
        label="Select Date"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        label="Your Story"
        multiline
        rows={4}
        value={story}
        onChange={(e) => setStory(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 2,
          marginTop: 2,
        }}
      >
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{ color: "var(--amber)", borderColor: "var(--amber)" }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          sx={{ backgroundColor: "var(--primary)" }}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};
