import { Express, Request, Response, Router, NextFunction } from 'express';
import { UrlUseCase } from '../domain/url';

export class UrlHandler {
  #urlUC: UrlUseCase;

  constructor(urlUC: UrlUseCase) {
    this.#urlUC = urlUC;
  }

  init(apiInstance: Express) {
    const subRouter = Router({ mergeParams: true });

    subRouter.post('/', (req, res) => this.#registerUrl(req, res));

    apiInstance.use('/url', subRouter);
  }

  #registerUrl(req: Request, res: Response) {
    this.#urlUC
      .registerUrl(req.body)
      .then((urlShort) => {
        res.status(400).send({
          message: 'Url shortened successfully',
          shortUrl: urlShort,
        });
      })
      .catch((error) => {
        res.status(400).send({
          message: error.message,
          shortUrl: null,
        });
      });
  }
}
