import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

const router = express.Router();

// Middleware to parse JSON bodies (use built-in Express 4.16+ middleware)
router.use(express.json());

// Route for user registration
router.post('/register_user', async (req, res) => {
  const { username = 'brokli', email = 'brokli', password = 'brokli' } = req.body;

  // Validate input
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save user to the database
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

//Decrypt function
/*async function verifyPassword(inputPassword, storedHash) {
  try {
    const match = await bcrypt.compare(inputPassword, storedHash);
    if (match) {
      console.log('Password is correct!');
    } else {
      console.log('Incorrect password');
    }
  } catch (error) {
    console.error('Error verifying password:', error);
  }
}*/

export default router;
