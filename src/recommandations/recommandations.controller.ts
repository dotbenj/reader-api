import { Controller, Get, Inject } from '@nestjs/common';
import { Driver } from 'neo4j-driver';
import { parse } from 'parse-neo4j';

@Controller('recommandations')
export class RecommandationsController {

  constructor(@Inject('NEO4J_CONNECTION') private readonly neo4j: Driver) {}

  // @Get()
  // async findAllReco(): Promise<any> {
  //   return parse(await this.neo4j.session().run('MATCH (n) RETURN n LIMIT 5'));
  // }
}
