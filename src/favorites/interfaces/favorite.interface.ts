import { Document } from 'mongoose';
import { User } from 'src/user/interfaces/user.interface';

export interface Favorite extends Document {
  id?: string;
  url: string;
  cursor: number;
  _user: User;
}