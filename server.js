//import stuff
import cors from 'cors'
import dotenv from 'dotenv';
import authRoutes from "./src/routes/auth.js";
import express from 'express';

//allow environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

//Use CORS
app.use(cors({
    origin: 'http://localhost:5173',
    allowMethods: ['GET', 'POST'],
    allowHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  }));

// Connect to MongoDB
connectDB();

// Use routes
app.use('/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
