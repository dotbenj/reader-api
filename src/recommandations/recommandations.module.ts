import { Module } from '@nestjs/common';
import { Neo4jModule } from 'nest-neo4j';

import { RecommandationsController } from './recommandations.controller';
import { RecommandationsService } from './recommandations.service';
import { neo4jProviders } from 'src/neo4j/neo4j.provider';

@Module({
  imports: [Neo4jModule],
  controllers: [RecommandationsController],
  providers: [RecommandationsService, ...neo4jProviders],
})
export class RecommandationsModule {}
