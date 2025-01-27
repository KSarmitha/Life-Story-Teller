const express = require("express");
const { signup, login, logout, refreshToken } = require("../controllers/authController");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", verifyToken, logout);
router.post("/refresh-token", refreshToken);

module.exports = router;