import { Document } from 'mongoose';
import { User } from '../../user/interfaces/user.interface';

export interface Favorite extends Document {
  id?: string;
  name: string;
  url: string;
  cursor: number;
  _user: User;
}
