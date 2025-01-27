const express = require("express");
const { getUser } = require("../controllers/userController");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");

router.get("/", verifyToken, getUser);

module.exports = router;