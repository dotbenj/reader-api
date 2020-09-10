import { Model } from 'mongoose';
import { genSalt, hash } from 'bcrypt';
import { User } from './interfaces/user.interface';
import { Injectable, Inject } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(@Inject('USER_MODEL') private userModel: Model<User>) {}

  generateHashPassword(password: string, salt: string): Promise<string> {
    return hash(password, salt);
  }

  async getUser(userId: string): Promise<User> {
    try {
      return this.userModel.findOne({ _id: userId });
    } catch (error) {
      throw new Error(error);
    }
  }

  async getUserByUsername(username: string): Promise<User> {
    try {
      return this.userModel.findOne({ username });
    } catch (error) {
      throw new Error(error);
    }
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const salt = await genSalt(10);
    const newUser = {
      salt,
      username: createUserDto.username,
      email: createUserDto.email,
      password: await this.generateHashPassword(createUserDto.password, salt),
    };
    const createdUser = new this.userModel(newUser);
    try {
      return createdUser.save();
    } catch (error) {
      console.log('Error', error);
      throw new Error(error);
    }
  }
}
