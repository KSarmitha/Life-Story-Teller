const express = require("express");
const router = express.Router();
const {
  createStory,
  getStoriesByUserId,
  updateStory,
  deleteStory,
} = require("../controllers/storyController");

router.post("/", createStory);
router.get("/user/:userId", getStoriesByUserId);
router.put("/:id", updateStory);
router.delete("/:id", deleteStory);

module.exports = router;
