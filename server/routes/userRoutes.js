const express = require("express");
const {
  getUser,
  updateUser,
  getUserById,
} = require("../controllers/userController");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");

router.get("/", verifyToken, getUser);
router.put("/:id", verifyToken, updateUser);
router.get("/:id", verifyToken, getUserById);

module.exports = router;
