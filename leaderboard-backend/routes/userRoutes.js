import express from 'express';
import {
  createUser,
  getUsers,
  getTopUsers,
  getTopByCategory,
  getUsersbycategory,
  claimPoints,
  getClaimHistory,
  getCategories
} from '../controllers/userController.js';

const router = express.Router();

// User Registration
router.post('/register', createUser);

// Get All Users (optionally filtered by category)
router.get('/', getUsers); // for all users
router.get('/filter', getUsersbycategory); // optional: filter by category

// Leaderboards
router.get('/leaderboard', getTopUsers); // Top users overall
router.get('/leaderboard/:category', getTopByCategory); // Top users by category

// Claim Points
router.post('/claim/:id', claimPoints);

// Claim History
router.get('/:id/claims', getClaimHistory);


//category pf user
router.get('/categories',getCategories)
export default router;
