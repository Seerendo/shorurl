import 'reflect-metadata';
import 'dotenv/config';
import { AppDataSource } from './app/db/typeorm';
import { HttpAPI } from './app/server';
import { UrlHandler } from './url/delivery/http';
import { ORMUrlRepository } from './url/repository/orm';
import { UrlUC } from './url/usecase/crud';

const httpAPI = new HttpAPI(3001);

async function main() {
  httpAPI.run();
}

const urlRepo = new ORMUrlRepository(AppDataSource);
const urlUC = new UrlUC(urlRepo);
const urlHandler = new UrlHandler(urlUC);
httpAPI.addHandler(urlHandler);

main();
