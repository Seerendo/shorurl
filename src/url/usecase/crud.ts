import { nanoid } from 'nanoid';
import { UrlRepository, UrlUseCase } from '../domain/url';

export class UrlUC implements UrlUseCase {
  #urlRepo: UrlRepository;

  constructor(urlRepo: UrlRepository) {
    this.#urlRepo = urlRepo;
  }

  async registerUrl(originalUrl: string): Promise<String> {
    const urlCode = nanoid(10);
    const baseUrl = process.env.BASE_URL;
    try {
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

  async redirectUrl(urlCode: string): Promise<String> {
    try {
      const urlData = await this.#urlRepo.findByUrlCode(urlCode);
      if (!urlData) {
        throw new Error('No existe un URL asi');
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
