import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  category: { type: String },
  avatar: { type: String },
  score: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model('User', userSchema);
