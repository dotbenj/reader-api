import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AppController } from './app.controller';
import { LoginModule } from './login/login.module';
import { MangaModule } from './manga/manga.module';
import { DatabaseModule } from './database/database.module';
import { FavoritesModule } from './favorites/favorites.module';
import { ConfigModuleOptions } from '@nestjs/config/dist/interfaces';
import { RecommandationsModule } from './recommandations/recommandations.module';
import { Neo4jModule } from './neo4j/neo4j.module';


const envConfig: ConfigModuleOptions = process.env.ENV === 'development' ? { envFilePath: 'development.env' } : { ignoreEnvFile: true };

@Module({
  imports: [
    UserModule,
    AuthModule,
    MangaModule,
    LoginModule,
    DatabaseModule,
    FavoritesModule,
    ScheduleModule.forRoot(),
    ConfigModule.forRoot(envConfig),
    RecommandationsModule,
    Neo4jModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
