import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { User } from '../user/interfaces/user.interface';
import { AuthService } from '../auth/auth.service';
import { LoginDto } from './dto/login.dto';
import { compare } from 'bcrypt';

@Injectable()
export class LoginService {
  constructor(
    @Inject('USER_MODEL') private userModel: Model<User>,
    private authService: AuthService,
  ) {}

  async login(loginCredentials: LoginDto): Promise<any> {
    const user: User = await this.userModel.findOne({ email: loginCredentials.email.toLowerCase() });
    if (!user || !await compare(loginCredentials.password, user.password)) {
      throw new Error('Bad credentials');
    }
    return {
      token: await this.authService.generateToken(user),
    };
  }
}
