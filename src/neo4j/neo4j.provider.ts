import v1 from 'neo4j-driver';
import { ConfigService } from '@nestjs/config';

export const neo4jProviders = [
  {
    provide: 'NEO4J_CONNECTION',
    useFactory: () =>
      v1.driver(
        new ConfigService().get('NEO4J_URL'),
        v1.auth.basic(new ConfigService().get('NEO4J_USER'), new ConfigService().get('NEO4J_PASSWORD')),
        {encrypted: 'ENCRYPTION_ON'},
      ),
  },
];
