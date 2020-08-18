import { Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { favoriteProvider } from '../schemas/favorite.provider';
import { DatabaseModule } from '..//database/database.module';
import { MangaModule } from 'src/manga/manga.module';

@Module({
  controllers: [FavoritesController],
  providers: [
    FavoritesService,
    MangaModule,
    ...favoriteProvider,
  ],
  imports: [DatabaseModule],
})
export class FavoritesModule {}
