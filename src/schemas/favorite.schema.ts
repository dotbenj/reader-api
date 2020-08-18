import * as mongoose from 'mongoose';

export const FavoriteSchema = new mongoose.Schema({
  url: String,
  author: String,
  img: String,
  name: String,
  cursor: Number,
  lastChecked: Date,
  _user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});
