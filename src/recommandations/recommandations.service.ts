import * as axios from 'axios';
import * as cheerio from 'cheerio';
import { parse } from 'parse-neo4j';
import { Driver } from 'neo4j-driver';
import { Injectable, Inject } from '@nestjs/common';

import { Cron } from '@nestjs/schedule';

@Injectable()
export class RecommandationsService {

  constructor(@Inject('NEO4J_CONNECTION') private readonly neo4j: Driver) {}

  @Cron('0 59 * * * * ')
  async fetchRecoData() {
    console.log('start');
    const html = await axios.default.get(`https://myanimelist.net/users.php`);
    const $ = cheerio.load(html.data);
    // console.log('data', html.data);
    $('body > div#myanimelist:nth-child(1) > div.wrapper:nth-child(3) > div#contentWrapper:nth-child(3) > div#content:nth-child(2) > table:nth-child(2) > tbody > tr > td:nth-child(1) > table:nth-child(2) > tbody > tr:nth-child(1)').find('td.borderClass > div:nth-child(1) > a').each(async (index: number, elem) => {
      const profile = $(elem).attr('href').split('/')[2];
      const html2 = await axios.default.get(`https://myanimelist.net/mangalist/${profile}`);
      const $2 = cheerio.load(html2.data);
      const mangas = JSON.parse($2('div.all_anime').find('table').attr('data-items'));
      if (mangas.length > 0) {
        const queries = [];
        mangas.forEach(async (manga) => {
          queries.push({
            query: `MERGE (u:User { name: $userProfile})
            MERGE (m:Manga { title: $mangaTitle})
            MERGE (u)-[:Like { score: $mangaScore}]->(m)
            RETURN u.name AS user, m.title AS manga`,
            values: {
              userProfile: profile,
              mangaScore: manga.score,
              mangaTitle: manga.manga_title,
            },
          });
        });
        this.mapSeries(queries, async (q) => {
          const neo4jQuery = await this.neo4j.session().run(q.query, q.values);
        });
      }
    });
  }

  async mapSeries(iterable, action) {
    for (const x of iterable) {
      await action(x)
    }
  }
}
