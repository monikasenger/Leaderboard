import User from '../models/User.js';
import ClaimHistory from '../models/ClaimHistory.js';

//claim point history
export const claimPoints = async (req, res) => {
  try {
    const { userId } = req.body;
    const randomPoints = Math.floor(Math.random() * 10) + 1;

    // Update user score
    const user = await User.findByIdAndUpdate(
      userId,
      { $inc: { score: randomPoints } },
      { new: true }
    );

    // Save claim history
    const history = new ClaimHistory({ userId, points: randomPoints });
    await history.save();

    res.json({ user, points: randomPoints });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get leaderboard history
export const getLeaderboard = async (req, res) => {
  try {
    const users = await User.find().sort({ score: -1 });
    const leaderboard = users.map((u, i) => ({
      rank: i + 1,
      name: u.name,
      score: u.score,
    }));
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
