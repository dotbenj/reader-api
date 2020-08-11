import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { Favorite } from './interfaces/favorite.interface';
import { CreateFavDto } from './dto/create-fav.dto';
import { ModifyFavDto } from './dto/modify-fav.dto copy';

@Injectable()
export class FavoritesService {
  constructor(@Inject('FAVORITE_MODEL') private favModel: Model<any>) {}

  async getFavs(userId: string): Promise<Favorite[]> {
    try {
      return this.favModel.find({ _user: userId });
    } catch (error) {
      throw new Error(error);
    }
  }

  addFav(fav: CreateFavDto, userId: string): Promise<Favorite> {
    const newFav = {
      url: fav.url,
      cursor: fav.cursor || 0,
      _user: userId,
    };
    const favToAdd = new this.favModel(newFav);
    try {
      return favToAdd.save();
    } catch (error) {
      throw new Error(error);
    }
  }

  modifyFav(favId: string, newFav: ModifyFavDto, userId: string): Promise<Favorite> {
    try {
      return this.favModel.findOneAndUpdate(
        {
          _id: favId,
          _user: userId,
        },
        {
          $set: {
            cursor: newFav.cursor,
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
