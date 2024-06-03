import express, { Express, Router } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { AppDataSource } from './db/typeorm';
import logger from '../logger';

interface HttpHandler {
  init(app: Router): void;
}

export class HttpAPI {
  #app: Express;

  constructor(port?: number) {
    const app: Express = express();

    app.use(express.json());
    app.use(express.raw());
    app.use(express.urlencoded({ extended: true }));
    app.use(morgan('dev'));
    app.use(cors({}));

    app.set('port', process.env.PORT || port || 3000);

    this.#app = app;
  }

  addHandler(handler: HttpHandler) {
    const apiSubRouter = Router({ mergeParams: true });
    handler.init(apiSubRouter);
    this.#app.use('/api', apiSubRouter);
  }

  run() {
    this.#app.listen(this.#app.get('port'), async () => {
      AppDataSource.initialize()
        .then(() => {
          logger.info(`Server running on PORT: ${this.#app.get('port')}`)
          console.log(`Server running on PORT: ${this.#app.get('port')}`);
        })
        .catch((err) => {
          logger.error(err)
          console.dir(err);
        });
    });
  }
}
