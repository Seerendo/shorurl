import { Document } from 'mongoose';

export interface IUrl extends Document {
  url: string;
  author: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}
