const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");

const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '15m' });
};

const generateRefreshToken = (user) => {
  return jwt.sign(user, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
};

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ name, email, password: hashedPassword });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        const userPayload = { id: user._id, email: user.email, name: user.name };
        const accessToken = generateAccessToken(userPayload);
        const refreshToken = generateRefreshToken(userPayload);

        res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true });
        
        req.session.user = userPayload;
        res.status(200).json({ message: "Login successful", accessToken });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.refreshToken = (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(403).json({ message: "Refresh token not provided" });
  }

  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const userPayload = { id: user.id, email: user.email, name: user.name };
    const accessToken = generateAccessToken(userPayload);
    res.status(200).json({ accessToken });
  });
};

exports.logout = (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Internal server error" });
      } else {
        return res.status(200).json({ message: "Logout successful" });
      }
    });
  } else {
    return res.status(400).json({ message: "No session found" });
  }
};
