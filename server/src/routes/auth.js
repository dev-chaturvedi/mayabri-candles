const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const authMiddleware = require("../middleware/auth");
const superUserMiddleware = require("../middleware/superUser");
const { SUPER_USER_EMAILS } = require("../config/superUsers");

const router = express.Router();

const createToken = (userId) =>
  jwt.sign({ userId }, process.env.JWT_SECRET || "dev_secret", {
    expiresIn: "7d",
  });

const serializeUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  isSuperUser: Boolean(user.isSuperUser),
});

router.post("/register", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const normalizedEmail = email?.toLowerCase().trim();

    if (!name || !normalizedEmail || !password || password.length < 6) {
      return res.status(400).json({
        message: "Name, valid email and password (min 6 chars) are required.",
      });
    }

    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered." });
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email: normalizedEmail,
      password: hash,
      isSuperUser: SUPER_USER_EMAILS.includes(normalizedEmail),
    });

    const token = createToken(user._id.toString());

    return res.status(201).json({
      token,
      user: serializeUser(user),
    });
  } catch (error) {
    return next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = email?.toLowerCase().trim();

    if (!normalizedEmail || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const token = createToken(user._id.toString());

    return res.json({
      token,
      user: serializeUser(user),
    });
  } catch (error) {
    return next(error);
  }
});

router.get("/me", authMiddleware, async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.json({
      user: serializeUser(user),
    });
  } catch (error) {
    return next(error);
  }
});

router.post(
  "/make-super-user",
  authMiddleware,
  superUserMiddleware,
  async (req, res, next) => {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({ message: "Email is required." });
      }

      const normalizedEmail = email.toLowerCase().trim();
      const user = await User.findOneAndUpdate(
        { email: normalizedEmail },
        { $set: { isSuperUser: true } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: "User not found with this email." });
      }

      return res.json({
        message: `${normalizedEmail} is now a super user.`,
        user: serializeUser(user),
      });
    } catch (error) {
      return next(error);
    }
  }
);

module.exports = router;
