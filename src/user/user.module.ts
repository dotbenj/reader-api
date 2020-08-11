import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { userProviders } from '../schemas/user.provider';
import { DatabaseModule } from '../database/database.module';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    ...userProviders,
  ],
  imports: [DatabaseModule],
  exports: [UserService],
})
export class UserModule {}
