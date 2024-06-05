export class UrlModel {
  urlCode: string;
  originalUrl: string;
  shortUrl: string;
  alias?: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor() {
    this.urlCode = '';
    this.originalUrl = '';
    this.shortUrl = '';
    this.alias = '';
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}

export interface UrlRepository {
  registerUrl(urlModel: UrlModel): Promise<boolean>;
  findByOriginalUrl(originalUrl: string): Promise<UrlModel | null>;
  findByUrlCode(originalUrl: string): Promise<UrlModel | null>;
}

export interface UrlUseCase {
  registerUrl(originalUrl: string, alias?: string): Promise<String>;
  redirectUrl(shortUrl: string): Promise<String>;
}
