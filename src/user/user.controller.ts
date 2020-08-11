import { UserService } from './user.service';
import { User } from './interfaces/user.interface';
import { Controller, Get, Param, HttpException, Post, Body } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':userId')
  async getUser(@Param('userId') userId: string) {
    let user: User;
    try {
      user = await this.userService.getUser(userId);
    } catch (error) {
      throw new HttpException(error.message, 404);
    }
    if (!user) {
      throw new HttpException('User not found', 404);
    }
    return user;
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.userService.create(createUserDto);
    } catch (error) {
      throw new HttpException(error.message, 520);
    }
  }
}
