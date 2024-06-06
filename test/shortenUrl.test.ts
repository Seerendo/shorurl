import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
} from 'vitest';

import request from 'supertest';
import { Server } from 'node:http';
import { HttpAPI } from '../src/app/server';
import { ORMUrlRepository, UrlORM } from '../src/url/repository/orm';
import { UrlUC } from '../src/url/usecase/crud';
import { UrlHandler } from '../src/url/delivery/http';
import { AppDataSource } from '../src/app/db/typeorm';

const httpAPI = new HttpAPI(3001);

const app = httpAPI.app;
let server: Server;

describe('Shorten Url integration test', () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
    const urlRepo = new ORMUrlRepository(AppDataSource);
    const urlUC = new UrlUC(urlRepo);
    const urlHandler = new UrlHandler(urlUC);
    httpAPI.addHandler(urlHandler);
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  beforeEach(async () => {
    return new Promise((resolve) => {
      server = app.listen(app.get('port'), resolve);
    });
  });

  afterEach(async () => {
    return new Promise((resolve, reject) => {
      server.close((err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  });

  it('Should shorten url', async () => {
    const originalUrl = 'https://lindekin.com/in/seerendo';
    // The alias is not required for a random urlCode to be generated.
    let res = await request(server).post('/api/url').send({ originalUrl });

    expect(res.status).toBe(201);
  });

  it('Should throw error if alias already exist', async () => {
    const originalUrl = 'https://www.google.com';
    const alias = 'google';

    let res = await request(server).post('/api/url').send({ originalUrl, alias });
    res = await request(server)
      .post('/api/url')
      .send({ originalUrl, alias });
    expect(res.status).toBe(400);
  });
});
