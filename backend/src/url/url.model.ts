import { Document } from 'mongoose';

export interface IUrl extends Document {
  url: string;
  short: string;
  author: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}
