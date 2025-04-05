//import stuff
import cors from 'cors'
import dotenv from 'dotenv';
import connectDB from './db.js';
import authRoutes from "./src/routes/auth.js";
import express from 'express';

//allow environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

//Use CORS
app.use(cors({
    allowMethods: ['GET', 'POST'],
    allowHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  }));

// Middleware for parsing JSON bodies
app.use(express.json());

// Connect to MongoDB
connectDB();

// Use routes
app.use('/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
