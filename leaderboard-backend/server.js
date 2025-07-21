import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/mongodb.js";

// Importing routes
import leaderboardRoutes from './routes/leaderboardRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();
connectDB();

const app = express();

// ✅ Allow cross-origin requests (important!)
app.use(cors());

// Parse incoming JSON
app.use(express.json());

// API routes
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/users', userRoutes);

// Test route
app.get("/", (req, res) => res.send("API is running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
