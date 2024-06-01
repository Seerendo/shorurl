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
    subRouter.get('/:urlCode', (req, res) => this.#redirectUrl(req, res));

    apiInstance.use('/url', subRouter);
  }

  #registerUrl(req: Request, res: Response) {
    const { originalUrl } = req.body;
    this.#urlUC
      .registerUrl(originalUrl)
      .then((urlShort) => {
        res.status(200).json({
          message: 'Url shortened successfully',
          shortUrl: urlShort,
        });
      })
      .catch((error) => {
        res.status(400).json({
          message: error.message,
          shortUrl: null,
        });
      });
  }

  #redirectUrl(req: Request, res: Response) {
    const { urlCode } = req.params;
    this.#urlUC
      .redirectUrl(urlCode)
      .then((originalUrl) => {
        res.redirect(307, originalUrl.toString());
      })
      .catch((error) => {
        res.status(400).json({
          message: error.message,
        });
      });
  }
}
