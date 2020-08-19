import { Injectable, Inject } from '@nestjs/common';
import { Driver } from 'neo4j-driver';

@Injectable()
export class Neo4jService {

  constructor(@Inject('Neo4j') private readonly neo4j: Driver) {}

  async findAll(): Promise<any> {
    return this.neo4j.session().run('MATCH (n) RETURN n LIMIT 5');
  }
}
