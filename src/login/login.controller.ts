import { Controller, Post, Body, HttpException } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginDto } from './dto/login.dto';

@Controller('login')
export class LoginController {
  constructor(private loginService: LoginService) {}

  @Post()
  async login(@Body() loginDto: LoginDto): Promise<any> {
    try {
      return await this.loginService.login(loginDto);
    } catch (error) {
      throw new HttpException(error.message, 403);
    }
  }
}
