import 'dotenv/config';
import path from 'path';
import express, { Express, Router } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { runDBMongo } from './db/mongoose';

const { SERVER_PORT, DB_URI } = process.env;

export class HttpAPI {
  #app: Express;

  constructor(port?: number) {
    const app: Express = express();

    app.use(express.json());
    app.use(express.raw());
    app.use(express.urlencoded({ extended: true }));
    app.use(morgan('dev'));
    app.use(cors({}));

    app.set('port', SERVER_PORT || port || 3000);

    this.#app = app;
  }

  run() {
    this.#app.listen(this.#app.get('port'), async () => {
      await runDBMongo(DB_URI!)
        .then(() => {
          console.log(`Server running on PORT: ${this.#app.get('port')}`);
        })
        .catch(console.dir);
    });
  }
}
