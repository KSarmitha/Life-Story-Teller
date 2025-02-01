import {
  ContentCopy as ContentCopyIcon,
  Share as ShareIcon,
} from "@mui/icons-material";
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Snackbar,
  Tooltip,
} from "@mui/material";
import React, { useState } from "react";

export const Share = ({ contentUrl, title, response }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Open share menu
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Close share menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Copy content to clipboard
  const handleCopy = () => {
    navigator.clipboard
      .writeText(response)
      .then(() => {
        setOpenSnackbar(true);
        handleClose();
      })
      .catch((err) => console.error("Error copying text: ", err));
  };

  // Share on social media
  const handleShare = (platform) => {
    const encodedContentUrl = encodeURIComponent(contentUrl);
    const encodedTitle = encodeURIComponent(title || "");
    let shareUrl = "";

    switch (platform) {
      case "linkedin":
        shareUrl = `https://www.linkedin.com/shareArticle?url=${encodedContentUrl}&title=${encodedTitle}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedContentUrl}&quote=${encodedTitle}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodedContentUrl}&text=${encodedTitle}`;
        break;
      default:
        return;
    }

    window.open(shareUrl, "_blank");
    handleClose();
  };

  return (
    <div>
      <Tooltip title="Share">
        <IconButton onClick={handleClick} color="primary">
          <ShareIcon />
        </IconButton>
      </Tooltip>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={() => handleShare("linkedin")}>
          <ListItemIcon>
            <img
              src="https://cdn-icons-png.flaticon.com/512/145/145807.png"
              alt="LinkedIn"
              width="20"
              height="20"
            />
          </ListItemIcon>
          <ListItemText>Share on LinkedIn</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleShare("facebook")}>
          <ListItemIcon>
            <img
              src="https://cdn-icons-png.flaticon.com/512/145/145802.png"
              alt="Facebook"
              width="20"
              height="20"
            />
          </ListItemIcon>
          <ListItemText>Share on Facebook</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleShare("twitter")}>
          <ListItemIcon>
            <img
              src="https://cdn-icons-png.flaticon.com/512/733/733579.png"
              alt="Twitter"
              width="20"
              height="20"
            />
          </ListItemIcon>
          <ListItemText>Share on Twitter</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleCopy}>
          <ListItemIcon>
            <ContentCopyIcon />
          </ListItemIcon>
          <ListItemText>Copy Content</ListItemText>
        </MenuItem>
      </Menu>

      {/* Snackbar for copy confirmation */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)}
        message="Content copied to clipboard"
      />
    </div>
  );
};
