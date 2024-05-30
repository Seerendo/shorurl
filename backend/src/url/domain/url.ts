export class UrlModel {
  urlCode: string;
  originalUrl: string;
  shortUrl: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor() {
    this.urlCode = '';
    this.originalUrl = '';
    this.shortUrl = '';
    this.description = '';
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}

export interface UrlRepository {
  registerUrl(urlModel: UrlModel): Promise<boolean>;
  findByOriginalUrl(originalUrl: string): Promise<UrlModel | null>;
  findByShortUrl(originalUrl: string): Promise<UrlModel | null>;
}

export interface UrlUseCase {
  registerUrl(originalUrl: string): Promise<String>;
  redirectUrl(shortUrl: string): Promise<String>;
}
