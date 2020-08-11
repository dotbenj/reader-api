import { MangaService } from './manga.service';
import { Controller, Get, Param, HttpException } from '@nestjs/common';

@Controller('manga')
export class MangaController {

  constructor(private mangasService: MangaService) {}

  @Get('search/:query')
  async search(@Param('query') query: string) {
    try {
      return await this.mangasService.search(query);
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

  @Get(':url/:chapter')
  async getChapter(@Param('url') url: string, @Param('chapter') chapter: string) {
    try {
      return await this.mangasService.getChapter(url, chapter);
    } catch (error) {
      throw new HttpException(error.message, 520);
    }
  }
 }
