import express from 'express';
import { claimPoints, getLeaderboard } from '../controllers/leaderboardController.js';

const router = express.Router();
router.get('/', getLeaderboard);
router.post('/claim',claimPoints)
export default router;
