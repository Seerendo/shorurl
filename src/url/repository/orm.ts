import {
  Column,
  CreateDateColumn,
  DataSource,
  Entity,
  PrimaryColumn,
  Repository,
  UpdateDateColumn,
} from 'typeorm';
import { UrlModel, UrlRepository } from '../domain/url';

@Entity('urls')
export class UrlORM {
  @PrimaryColumn({ unique: true, unsigned: true })
  declare urlCode: string;

  @Column()
  declare originalUrl: string;
  @Column()
  declare shortUrl: string;
  @Column({ nullable: true })
  declare description: string;

  @CreateDateColumn()
  declare createdAt: Date;
  @UpdateDateColumn()
  declare updatedAt: Date;

  toUrl(): UrlModel {
    const urlModel = new UrlModel();

    urlModel.shortUrl = this.shortUrl;
    urlModel.originalUrl = this.originalUrl;
    urlModel.urlCode = this.urlCode;
    urlModel.description = this.description;
    urlModel.createdAt = this.createdAt;
    urlModel.updatedAt = this.updatedAt;

    return urlModel;
  }

  fromUrl(urlModel: UrlModel) {
    this.urlCode = urlModel.urlCode;
    this.originalUrl = urlModel.originalUrl;
    this.shortUrl = urlModel.shortUrl;
    this.description = urlModel.description;
    this.createdAt = urlModel.createdAt;
    this.updatedAt = urlModel.updatedAt;

    return this;
  }
}

export class ORMUrlRepository implements UrlRepository {
  #dataSource: DataSource;
  #urlRepository: Repository<UrlORM>;

  constructor(dataSource: DataSource) {
    this.#dataSource = dataSource;
    this.#urlRepository = this.#dataSource.getRepository(UrlORM);
  }

  async registerUrl(urlModel: UrlModel): Promise<boolean> {
    try {
      const url = this.#urlRepository.create(urlModel);
      await this.#urlRepository.save(url);
      return true;
    } catch (error) {
      let message = 'Unknown Error';
      if (error instanceof Error) message = error.message;
      else message = String(error);
      throw new Error(message);
    }
  }

  async findByOriginalUrl(originalUrl: string): Promise<UrlModel | null> {
    try {
      const url = await this.#urlRepository.findOneBy({
        originalUrl: originalUrl,
      });
      if (!url) return null;
      return url.toUrl();
    } catch (error) {
      let message = 'Unknown Error';
      if (error instanceof Error) message = error.message;
      else message = String(error);
      throw new Error(message);
    }
  }

  async findByUrlCode(urlCode: string): Promise<UrlModel | null> {
    try {
      const url = await this.#urlRepository.findOneBy({
        urlCode: urlCode,
      });
      if (!url) return null;
      return url.toUrl();
    } catch (error) {
      let message = 'Unknown Error';
      if (error instanceof Error) message = error.message;
      else message = String(error);
      throw new Error(message);
    }
  }
}
