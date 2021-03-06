import { Model } from 'mongoose';
import { Cron } from '@nestjs/schedule';
import { Injectable, Inject } from '@nestjs/common';

import { CreateFavDto } from './dto/create-fav.dto';
import { MangaService } from '../manga/manga.service';
import { Favorite } from './interfaces/favorite.interface';
import { Chapter } from '../manga/interfaces/chapter.interface';

@Injectable()
export class FavoritesService {
  constructor(
    @Inject('FAVORITE_MODEL') private favModel: Model<any>,
    private mangaService: MangaService) {}

  async getFavs(userId: string): Promise<Favorite[]> {
    try {
      await this.updateFavsForUser(userId);
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

  async modifyFav(favId: string, cursor: string, userId: string): Promise<Favorite> {
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
            cursor: parseInt(cursor, 10),
            remain: parseInt(chapters[0].number, 10) - parseInt(cursor, 10),
          },
        },
        {
          new: true,
          useFindAndModify: false,
        })
        .populate('_user')
        .exec();
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateFavsForUser(userId: string): Promise<any> {
    const favs = await this.favModel.find({ _user: userId});
    const favsUpdate = [];
    favs.forEach(async (fav) => {
      const chapters = await this.mangaService.getChapters(fav.url) as Chapter[];
      const cursor = parseInt(fav.cursor, 10);
      let remain = parseInt(chapters[0].number, 10) - parseInt(fav.cursor, 10);
      if (remain < 0) {
        remain = 0;
      }
      favsUpdate.push(this.favModel.findOneAndUpdate(
        {
          _id: fav._id,
      },
      {
        $set: {
          remain,
          chapters: chapters.length,
        },
      },
      {
        useFindAndModify: false,
      }));
    });
    return Promise.all(favsUpdate);
  }

  @Cron('* * 6 * * *')
  async handleChaptersCheck() {
    try {
      const favorites: any[] = await this.favModel.find();
      favorites.forEach(async (fav) => {
        const chapters = await this.mangaService.getChapters(fav.url) as Chapter[];
        const cursor = parseInt(fav.cursor, 10);
        let remain = parseInt(chapters[0].number, 10) - parseInt(fav.cursor, 10);
        if (remain < 0) {
          remain = 0;
        }
        await this.favModel.findOneAndUpdate(
          {
            _id: fav._id,
          },
          {
            $set: {
              remain,
              chapters: chapters.length,
            },
          },
          {
            useFindAndModify: false,
          },
        );
      });
    } catch (error) {
      console.log('Error', error);
    }
  }

}
