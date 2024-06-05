import { Express, Request, Response, Router, NextFunction } from 'express';
import { UrlUseCase } from '../domain/url';
import { UrlValidator } from './middlewares/validators';
import logger from '../../logger';

const urlValidator = new UrlValidator();

export class UrlHandler {
  #urlUC: UrlUseCase;

  constructor(urlUC: UrlUseCase) {
    this.#urlUC = urlUC;
  }

  init(apiInstance: Express) {
    const subRouter = Router({ mergeParams: true });

    subRouter.post('/', urlValidator.validateLink, (req, res) =>
      this.#registerUrl(req, res)
    );
    subRouter.get('/:urlCode', (req, res) => this.#redirectUrl(req, res));

    apiInstance.use('/url', subRouter);
  }

  #registerUrl(req: Request, res: Response) {
    logger.info('Register Url');
    const { originalUrl, alias } = req.body;
    this.#urlUC
      .registerUrl(originalUrl, alias)
      .then((urlShort) => {
        res.status(201).json({
          message: 'Url shortened successfully',
          shortUrl: urlShort,
        });
      })
      .catch((error) => {
        logger.error(error.message);
        res.status(400).json({
          message: error.message,
          shortUrl: null,
        });
      });
  }

  #redirectUrl(req: Request, res: Response) {
    logger.info('Redirect Url');
    const { urlCode } = req.params;
    this.#urlUC
      .redirectUrl(urlCode)
      .then((originalUrl) => {
        res.redirect(307, originalUrl.toString());
      })
      .catch((error) => {
        logger.error(error.message);
        res.status(404).json({
          message: error.message,
        });
      });
  }
}
