import * as mongoose from 'mongoose';
import { ConfigService } from '@nestjs/config';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(new ConfigService().get('DATABASE_URL'), { useNewUrlParser: true, useUnifiedTopology: true }),
  },
];
