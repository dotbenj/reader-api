import { Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { favoriteProvider } from '../schemas/favorite.provider';
import { DatabaseModule } from '..//database/database.module';
import { MangaModule } from '../manga/manga.module';

@Module({
  controllers: [FavoritesController],
  providers: [
    FavoritesService,
    ...favoriteProvider,
  ],
  imports: [
    DatabaseModule,
    MangaModule,
  ],
})
export class FavoritesModule {}
