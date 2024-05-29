import mongoose, { Model, Schema } from 'mongoose';
import {IUrl} from './url.model'

const urlSchema: Schema<IUrl> = new Schema(
  {
    url: {
      type: String,
      required: true,
      default: '',
    },
    short: {
      type: String,
      required: true,
      default: '',
    },
    author: {
      type: String,
      required: false,
      default: '',
    },
    description: {
      type: String,
      required: false,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

export const UrlModel: Model<IUrl> = mongoose.model<IUrl>('urls', urlSchema);