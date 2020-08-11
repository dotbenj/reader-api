import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { DatabaseModule } from 'src/database/database.module';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';
import { userProviders } from 'src/schemas/user.provider';

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
