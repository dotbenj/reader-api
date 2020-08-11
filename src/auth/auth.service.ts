import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/interfaces/user.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user: User = await this.userService.getUserByUsername(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async generateToken(user: any) {
    const payload = { username: user.username, id: user.id, email: user.email };
    return this.jwtService.sign(payload);
  }
}
