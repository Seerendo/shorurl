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
import { ORMUrlRepository } from '../src/url/repository/orm';
import { UrlUC } from '../src/url/usecase/crud';
import { UrlHandler } from '../src/url/delivery/http';
import { AppDataSource } from '../src/app/db/typeorm';

const httpAPI = new HttpAPI(3002);

const app = httpAPI.app;
let server: Server;

describe('Redirect Url integration test', () => {
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
    if (server) {
      return new Promise((resolve, reject) => {
        server.close((err) => {
          if (err) {
            return reject(err);
          }
          resolve();
        });
      });
    }
  });

  it('Should redirect if url key exist', async () => {
    const originalUrl = 'https://www.youtube.com';
    const alias = 'youtube';
    await request(server).post('/api/url').send({ originalUrl, alias });
    const res = await request(server).get(`/api/url/${alias}`);
    expect(res.status).toBe(307);
  });

  it('Should throw error if url key does not exist', async () => {
    const alias = 'unknown';
    const res = await request(server).get(`/api/url/${alias}`);
    expect(res.status).toBe(404);
  });
});
