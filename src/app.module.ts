import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AppController } from './app.controller';
import { LoginModule } from './login/login.module';
import { MangaModule } from './manga/manga.module';
import { DatabaseModule } from './database/database.module';
import { FavoritesModule } from './favorites/favorites.module';


@Module({
  imports: [
    UserModule,
    AuthModule,
    MangaModule,
    LoginModule,
    DatabaseModule,
    ConfigModule.forRoot({
      envFilePath: 'development.env',
    }),
    FavoritesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
