import { Download, Send } from "@mui/icons-material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  Paper,
  Snackbar,
  TextField
} from "@mui/material";
import { jsPDF } from "jspdf";
import React, { useState } from "react";
import axiosInstance from "../axiosInstance";
import { API_PATHS } from "../utils/constants/api";
import { Share } from "./Share";

export const StoryForm = () => {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileUpload = async (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setIsLoading(true);
      setError(null);

      try {
        const formData = new FormData();
        formData.append("file", uploadedFile);

        const response = await axiosInstance.post(
          `${API_PATHS.CHAT}/process-document`,
          formData
        );
        setMessage("File Uploaded Successfully!");
        setOpenSnackbar(true);
        // if (!response.ok) throw new Error('Failed to process document');

        // const data = await response.json();
        setQuestion((prev) => `${prev} [Attached: ${uploadedFile.name}]`);
        setResponse(response?.data?.extractedContent);
      } catch (err) {
        setError("Failed to process document. Please try again.");
        console.error("Error processing document:", err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleAskQuestion = async () => {
    if (!question.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.CHAT}/user/${localStorage.getItem(
          "user_id"
        )}/generate-story`
      );

      // if (!response.ok) throw new Error('Failed to get answer');

      setResponse(response?.data?.generatedStory);
    } catch (err) {
      setError("Failed to get answer. Please try again.");
      console.error("Error getting answer:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!response.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const storyData = {
        userId: localStorage.getItem("user_id"),
        date: new Date(),
        content: response,
      };

      await axiosInstance.post(API_PATHS.STORY, storyData);
      setMessage("Story Added Successfully!");
      setOpenSnackbar(true);
      // if (!result.ok) throw new Error('Failed to save story');

      setQuestion("");
      setResponse("");
      setFile(null);
    } catch (err) {
      setError("Failed to save story. Please try again.");
      console.error("Error saving story:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const download = () => {
    if (!response.trim()) return;

    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const marginLeft = 10;
    const marginRight = 10;
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const maxWidth = pageWidth - (marginLeft + marginRight);
    let y = 15;

    doc.setFont("helvetica", "bold");
    doc.text(`${question}`, marginLeft, y);
    y += 15;
    doc.setFont("helvetica", "normal");

    const lines = doc.splitTextToSize(response, maxWidth);
    for (const element of lines) {
      if (y + 10 > pageHeight - 20) {
        doc.addPage();
        y = 20;
      }
      doc.text(element, marginLeft, y);
      y += 8;
    }

    doc.save("about_me.pdf");
    setMessage("Story has been downloaded Successfully!");
    setOpenSnackbar(true);
  };

  return (
    <div>
       <Container style={{ marginTop: "20px", maxWidth: "800px" }}>
      <Paper elevation={3} style={{ padding: "20px", borderRadius: "10px" }}>
        {error && (
          <Alert severity="error" sx={{ marginBottom: 2 }}>
            {error}
          </Alert>
        )}
        <Box display="flex" alignItems="center" gap={1}>
          <TextField
            label="Ask a Question"
            variant="outlined"
            fullWidth
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <input
            type="file"
            accept="image/*,.pdf"
            style={{ display: "none" }}
            id="file-upload"
            onChange={handleFileUpload}
            disabled={isLoading}
          />
          <label htmlFor="file-upload" style={{ marginLeft: "-50px" }}>
            <IconButton component="span" disabled={isLoading}>
              <AttachFileIcon color="info" />
            </IconButton>
          </label>
          <Button
            onClick={handleAskQuestion}
            disabled={isLoading || !question.trim()}
          >
            <IconButton>
              <Send color="success" />
            </IconButton>
          </Button>
        </Box>
        <TextField
          label="Response"
          variant="outlined"
          fullWidth
          multiline
          rows={5}
          value={response}
          onChange={(e) => setResponse(e.target.value)}
          style={{ marginTop: "20px" }}
        />
        <Box display="flex" justifyContent="space-between" marginTop="20px">
          <div style={{ display: "flex" }}>
            <IconButton color="info" onClick={download} title="Download">
              <Download />
            </IconButton>
            <Share contentUrl={window.location.href} title={question} response={response} />
          </div>

          <Button
            variant="contained"
            color="primary"
            sx={{ borderRadius: "15px", backgroundColor: "var(--primary)" }}
            onClick={handleSave}
            disabled={isLoading || (!question.trim() && !response.trim())}
          >
            {isLoading ? <CircularProgress size={24} /> : "Save"}
          </Button>
        </Box>
      </Paper>
    </Container>
       <Snackbar
              open={openSnackbar}
              autoHideDuration={2000}
              onClose={() => setOpenSnackbar(false)}
              message={message}
            />
    </div>
   
  );
};
