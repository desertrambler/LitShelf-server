import express from 'express';
import User from '../models/User.js';
import { hashPassword } from "../utils/password.js";

const router = express.Router();

// Route for user registration
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  const existing = await User.findOne({ email });

  if (existing) {
    return res.status(400).json({ message: "User already exists" });
  }

  const { hash, salt } = hashPassword(password);
  const user = new User({ name, email, hash, salt });
  await user.save();
  res.status(201).json({ message: 'User registered successfully' });
});

export default router;