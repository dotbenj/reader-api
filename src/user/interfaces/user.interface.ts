import { Document } from 'mongoose';

export interface User extends Document {
  id?: string;
  salt: string;
  username: string;
  email: string;
  password: string;
}