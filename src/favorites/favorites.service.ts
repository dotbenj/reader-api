import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { CreateFavDto } from './dto/create-fav.dto';
import { MangaService } from '../manga/manga.service';
import { ModifyFavDto } from './dto/modify-fav.dto copy';
import { Favorite } from './interfaces/favorite.interface';
import { Chapter } from '../manga/interfaces/chapter.interface';

@Injectable()
export class FavoritesService {
  constructor(
    @Inject('FAVORITE_MODEL') private favModel: Model<any>,
    private mangaService: MangaService) {}

  async getFavs(userId: string): Promise<Favorite[]> {
    try {
      return this.favModel.find({ _user: userId });
    } catch (error) {
      throw new Error(error);
    }
  }

  async addFav(fav: CreateFavDto, userId: string): Promise<Favorite> {
    const newFav = {
      name: fav.name,
      url: fav.url,
      author: fav.author,
      img: fav.img,
      chapters: 0,
      remain: 0,
      cursor: fav.cursor || 0,
      _user: userId,
    };
    try {
      const chapters = await this.mangaService.getChapters(fav.url);
      if (chapters as Chapter[]) {
        const chapterCount = chapters as Chapter[];
        newFav.chapters = chapterCount.length;
        newFav.remain = newFav.chapters - newFav.cursor;
      }
      const favToAdd = new this.favModel(newFav);
      return favToAdd.save();
    } catch (error) {
      throw new Error(error);
    }
  }

  async modifyFav(favId: string, newFav: ModifyFavDto, userId: string): Promise<Favorite> {
    try {
      const fav = await this.favModel.findOne({ _id: favId });
      const chapters = await this.mangaService.getChapters(fav.url) as Chapter[];
      return this.favModel.findOneAndUpdate(
        {
          _id: favId,
          _user: userId,
        },
        {
          $set: {
            chapters: chapters.length,
            cursor: newFav.cursor as number + 1,
            remain: parseInt(chapters[0].number, 10) - newFav.cursor,
          },
        },
        {
          new: true,
          useFindAndModify: true,
        })
        .populate('_user')
        .exec();
    } catch (error) {
      throw new Error(error);
    }
  }
}
