import { MangaService } from './manga.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { SearchQueryDto } from './dto/search-query.dto';
import { Controller, Get, Query, Param, HttpException, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('manga')
export class MangaController {

  constructor(private mangasService: MangaService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('search/')
  async search(@Query() query: SearchQueryDto) {
    try {
      return await this.mangasService.search(query.query);
    } catch (error) {
      throw new HttpException(error.message, 520);
    }
  }

  @Get(':url')
  async getChapters(@Param('url') url: string) {
    try {
      return await this.mangasService.getChapters(url);
    } catch (error) {
      throw new HttpException(error.message, 520);
    }
  }

  @Get(':url/chapter/:chapter')
  async getChapter(@Param('url') url: string, @Param('chapter') chapter: string) {
    try {
      return await this.mangasService.getChapter(url, chapter);
    } catch (error) {
      throw new HttpException(error.message, 520);
    }
  }
 }
