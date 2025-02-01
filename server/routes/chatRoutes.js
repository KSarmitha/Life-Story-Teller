const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  generateResponse,
  processDocument,
  generateStoryFromData,
} = require("../controllers/chatController");

const upload = multer({
  dest: "uploads/",
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

router.post("/gemini", generateResponse);
router.post("/process-document", upload.single("file"), processDocument);
router.get("/user/:userId/generate-story", generateStoryFromData);

module.exports = router;
