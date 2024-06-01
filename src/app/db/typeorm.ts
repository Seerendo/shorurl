import { DataSource } from 'typeorm';
import { UrlORM } from '../../url/repository/orm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  entities: [
    UrlORM
  ],
  synchronize: false,
  logging: true,
  ssl: true,
});
