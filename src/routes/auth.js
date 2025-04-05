import User from '../models/User.js';
import { hashPassword } from "../utils/password.js";

const express = require('express');
const router = express.Router();

// Example: Route for user registration
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  const existing = await User.findOne({ email });
    if (existing) {
      ctx.throw(400, "User already exists");
    }
  
    const { hash, salt } = hashPassword(password);
    const user = new User({ username, email, hash, salt });
    await user.save();
    res.send("uesr registered");
});

module.exports = router;