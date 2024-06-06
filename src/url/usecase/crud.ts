import { nanoid } from 'nanoid';
import { UrlRepository, UrlUseCase } from '../domain/url';
import logger from '../../logger';

export class UrlUC implements UrlUseCase {
  #urlRepo: UrlRepository;

  constructor(urlRepo: UrlRepository) {
    this.#urlRepo = urlRepo;
  }

  async registerUrl(originalUrl: string, alias?: string): Promise<string> {
    logger.info('UC Register Url');
    const urlCode = alias ? alias : nanoid(10);

    const baseUrl = process.env.BASE;
    try {
      const aliasExist = await this.#urlRepo.findByUrlCode(urlCode);
      if (aliasExist) {
        const message =
          'This alias already exists, please choose another alias';
        throw new Error(message);
      }

      const urlData = await this.#urlRepo.findByOriginalUrl(originalUrl);
      if (urlData) return urlData.shortUrl;

      const shortUrl = `${baseUrl}/api/url/${urlCode}`;
      await this.#urlRepo.registerUrl({
        urlCode: urlCode,
        originalUrl: originalUrl,
        shortUrl: shortUrl,
      });
      return shortUrl;
    } catch (error) {
      let message = 'Unknown Error';
      if (error instanceof Error) message = error.message;
      else message = String(error);
      throw new Error(message);
    }
  }

  async redirectUrl(urlCode: string): Promise<string> {
    logger.info('UC Redirect Url');
    try {
      const urlData = await this.#urlRepo.findByUrlCode(urlCode);
      if (!urlData) {
        const message = 'This url does not exist';
        throw new Error(message);
      }
      return urlData.originalUrl;
    } catch (error) {
      let message = 'Unknown Error';
      if (error instanceof Error) message = error.message;
      else message = String(error);
      throw new Error(message);
    }
  }
}
