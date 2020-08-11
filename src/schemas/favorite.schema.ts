import * as mongoose from 'mongoose';

export const FavoriteSchema = new mongoose.Schema({
  url: String,
  cursor: Number,
  lastChecked: Date,
  _user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});
