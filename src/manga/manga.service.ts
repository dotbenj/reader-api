import { Injectable } from '@nestjs/common';
import { SearchResult } from './interfaces/search-result.interface';
import * as axios from 'axios';
import * as cheerio from 'cheerio';
import { Chapter } from './interfaces/chapter.interface';

@Injectable()
export class MangaService {

  async search(query: string): Promise<SearchResult[] | Error> {
    try {
      const html = await axios.default.get(`http://www.mangapanda.com/actions/search/?q=${query}`);
      const resultJson = [];
      let resultObject: SearchResult = {};
      const results = html.data.split('|');
      let i = 0;
      results.forEach((result: string, index: number) => {
        if (i === 5) {
          i = 0;
          resultJson.push(resultObject);
          resultObject = {};
        }
        switch (i) {
          case 0:
            resultObject.id = result;
            break;
          case 2:
            resultObject.title = result;
            break;
          case 1:
            resultObject.img = result;
            break;
          case 3:
            resultObject.author = result;
            break;
          case 4:
            resultObject.url = result;
            break;
        }
        i ++;
      });
      return resultJson;
    } catch (error) {
      return new Error(error);
    }
  }

  async getChapters(url: string): Promise<Chapter[] | Error> {
    try {
      const html = await axios.default.get(`http://www.mangapanda.com${url}`);
      const mangaContainer = [];
      const $ = cheerio.load(html.data);
      $('#chapterlist > table').find('tr > td').each((index: number, elem) => {
        const element = $(elem).find('a').attr('href');
        if (element) {
          mangaContainer.push({
            number: element.split('/')[2],
            url: '/manga' + element,
          });
        }
      });
      return mangaContainer.reverse();
    } catch (error) {
      return new Error(error);
    }
  }

  getChapter(url: string, chapter: string): Promise<Chapter | Error> {
    return new Promise(async (resolve, reject) => {
      try {
        let count = 0;
        const result: Chapter = {
          number: chapter,
          pages: [],
        };
        const html = await axios.default.get(`http://www.mangapanda.com/${url}/${chapter}`);
        const $ = cheerio.load(html.data);
        const pageOptionCount = $('#pageMenu > option').length;
        $('#pageMenu > option').each(async (index: number, elem) => {
          try {
            const htmlContent = await axios.default.get(`http://www.mangapanda.com${$(elem).attr('value')}`);
            const cheer = cheerio.load(htmlContent.data);
            result.pages[index] = cheer('#imgholder').find('img').attr('src');
            count++;
            if (count === pageOptionCount) {
              resolve(result);
            }
          } catch (error) {
            reject(Error(error));
          }
        });
      } catch (error) {
        reject(new Error(error));
      }
    })
  }
}
