import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import { API_PATHS } from "../utils/constants/api";
import { CreateStory } from "./CreateStory";

export const ViewStory = () => {
  const [stories, setStories] = useState([]);
  const [openCreateStory, setOpenCreateStory] = useState(false);
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      const userId = localStorage.getItem("user_id");
      const response = await axiosInstance.get(
        `${API_PATHS.STORY}/user/${userId}`
      );
      setStories(response.data);
    } catch (error) {
      alert("Failed to load stories. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`${API_PATHS.STORY}/${id}`);
      await fetchStories();
      setOpenDeleteConfirmation(false);
    } catch (error) {
      alert("Failed to delete story. Please try again.");
    }
  };

  const handleEdit = (story) => {
    setSelectedStory(story);
    setOpenCreateStory(true);
  };

  const handleCreateStory = () => {
    setSelectedStory(null);
    setOpenCreateStory(true);
  };

  const handleCloseCreateStory = () => {
    setOpenCreateStory(false);
  };

  const handleCloseDeleteConfirmation = () => {
    setOpenDeleteConfirmation(false);
  };

  return (
    <Box sx={{ padding: "16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h4"
          sx={{ marginBottom: "16px", color: "var(--primary)" }}
        >
          View Stories
        </Typography>
        <Button
          variant="contained"
          onClick={handleCreateStory}
          sx={{
            marginBottom: "16px",
            backgroundColor: "var(--primary)",
            float: "right",
          }}
        >
          Create Story
        </Button>
      </div>

      <TableContainer sx={{ width: "1000px", maxHeight: "60vh" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Content</TableCell>
              <TableCell sx={{ width: "20%" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stories.map((story) => (
              <TableRow key={story.id}>
                <TableCell>
                  {new Date(story.date).toLocaleDateString()}
                </TableCell>
                <TableCell>{story.content}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleEdit(story)}
                    sx={{
                      marginRight: "8px",
                      color: "var(--neon-green)",
                      borderColor: "var(--neon-green)",
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{ color: "var(--amber)", borderColor: "var(--amber)" }}
                    onClick={() => {
                      setSelectedStory(story);
                      setOpenDeleteConfirmation(true);
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Create Story Popup */}
      <Dialog
        open={openCreateStory}
        onClose={handleCloseCreateStory}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {selectedStory ? "Edit Story" : "Create Story"}
        </DialogTitle>
        <DialogContent>
          <CreateStory
            existingStory={selectedStory}
            onClose={handleCloseCreateStory}
            onSave={async (newStory) => {
              try {
                if (selectedStory) {
                  await axiosInstance.put(
                    `${API_PATHS.STORY}/${selectedStory._id}`,
                    newStory
                  );
                  await fetchStories();
                } else {
                  await axiosInstance.post(API_PATHS.STORY, newStory);
                  await fetchStories();
                }
                setOpenCreateStory(false);
              } catch (error) {
                console.error("Error saving story:", error);
                alert("Failed to save story. Please try again.");
              }
            }}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Popup */}
      <Dialog
        open={openDeleteConfirmation}
        onClose={handleCloseDeleteConfirmation}
      >
        <DialogTitle className="heading" style={{ fontWeight: "bold" }}>
          Confirm Deletion
        </DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this story?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteConfirmation} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => handleDelete(selectedStory._id)}
            sx={{ backgroundColor: "var(--amber)" }}
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
