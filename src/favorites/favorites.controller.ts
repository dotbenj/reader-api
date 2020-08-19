import { ApiBearerAuth } from '@nestjs/swagger';
import { CreateFavDto } from './dto/create-fav.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FavoritesService } from './favorites.service';
import { ModifyFavDto } from './dto/modify-fav.dto copy';
import { Controller, UseGuards, Get, Request, HttpException, Body, Post, Param, Put } from '@nestjs/common';

@Controller('favorites')
export class FavoritesController {
  constructor(private favService: FavoritesService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  async getAllFavs(@Request() req) {
    try {
      return await this.favService.getFavs(req.user.id);
    } catch (error) {
      throw new HttpException(error.message, 520);
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  async createFav(@Body() createFav: CreateFavDto, @Request() req) {
    try {
      return await this.favService.addFav(createFav, req.user.id);
    } catch (error) {
      throw new HttpException(error.message, 520);
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Put(':favId')
  async modifyFav(@Param('favId') favId: string, @Body() modifiedFav: ModifyFavDto, @Request() req) {
    try {
      return await this.favService.modifyFav(favId, modifiedFav.cursor, req.user.id);
    } catch (error) {
      throw new HttpException(error.message, 520);
    }
  }

}
