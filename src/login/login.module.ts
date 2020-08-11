import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { DatabaseModule } from '../database/database.module';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { userProviders } from '../schemas/user.provider';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    AuthModule,
  ],
  controllers: [LoginController],
  providers: [
    LoginService,
    ...userProviders,
  ],
})
export class LoginModule {}
