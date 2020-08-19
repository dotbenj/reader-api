import { Module } from '@nestjs/common';
import { neo4jProviders } from './neo4j.provider';
import { Neo4jService } from 'nest-neo4j/dist';

@Module({
  providers: [...neo4jProviders],
  exports: [...neo4jProviders],
})
export class Neo4jModule {}
