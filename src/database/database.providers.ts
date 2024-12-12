import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'postgres',
        port: 5432,
        password: 'loqui_password',
        username: 'loqui_user',
        entities: [],
        database: 'loqui_nestjs_db',
        synchronize: true,
        logging: true,
      });

      return dataSource.initialize();
    },
  },
];
