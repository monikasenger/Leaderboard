import User from '../models/User.js';
import ClaimHistory from '../models/ClaimHistory.js';
import mongoose from 'mongoose';

// Create a new user (register)
export const createUser = async (req, res) => {
  try {
    const { username, category, avatar } = req.body;

    if (!username) return res.status(400).json({ message: "Username is required" });

    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(409).json({ message: "Username already exists" });

    const user = new User({ username, category, avatar, score: 0 });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ username: 1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get leaderboard
export const getTopUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ score: -1 });

    const leaderboard = users.map((user, index) => ({
      rank: index + 1,
      username: user.username,
      category: user.category,
      avatar: user.avatar,
      score: user.score,
      _id: user._id
    }));

    res.json(leaderboard);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch leaderboard" });
  }
};

//  Claim daily points
export const claimPoints = async (req, res) => {
  try {
    const userId = req.params.id;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const randomPoints = Math.floor(Math.random() * 10) + 1;
    user.score += randomPoints;
    await user.save();

    const claim = new ClaimHistory({ userId, points: randomPoints });
    await claim.save();

    res.json({ message: "Points claimed", score: user.score, claimed: randomPoints });
  } catch (err) {
    res.status(500).json({ message: "Error claiming points" });
  }
};

// Get claim history for a user
export const getClaimHistory = async (req, res) => {
  try {
    const userId = req.params.id;
    const history = await ClaimHistory.find({ userId }).sort({ claimedAt: -1 });
    res.json(history);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Filter users by category
export const getUsersbycategory = async (req, res) => {
  try {
    const { category } = req.query;
    const query = category ? { category } : {};
    const users = await User.find(query).sort({ username: 1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Leaderboard by category
export const getTopByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    if (!category) return res.status(400).json({ message: "Category is required" });

    const users = await User.find({ category }).sort({ score: -1 });
    const leaderboard = users.map((user, index) => ({
      rank: index + 1,
      username: user.username,
      category: user.category,
      avatar: user.avatar,
      score: user.score,
      _id: user._id
    }));

    res.json(leaderboard);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch category leaderboard" });
  }
};

// Get all categories
export const getCategories = async (req, res) => {
  try {
    const categories = await User.distinct("category");
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch categories" });
  }
};
