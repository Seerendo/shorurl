import { DataSource } from 'typeorm';
import { UrlORM } from '../../url/repository/orm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  port: Number(process.env.DATABASE_PORT || 5432),
  host: process.env.DATABASE_HOST || 'localhost',
  database: process.env.DATABASE_NAME || 'url_shortener',
  username: process.env.DATABASE_USER || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'qwerty',
  entities: [
    UrlORM
  ],
  synchronize: true,
  logging: false,
  ssl: Boolean(process.env.DATABASE_SSL),
});
