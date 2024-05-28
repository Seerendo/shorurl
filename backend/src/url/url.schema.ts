import mongoose, { Model, Schema } from 'mongoose';
import {IUrl} from './url.model'

const urlSchema: Schema<IUrl> = new Schema(
  {
    url: {
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

const UrlModel: Model<IUrl> = mongoose.model<IUrl>('urls', urlSchema);

export async function findRg() {
  const save = new UrlModel({
    author: 'Roddy Andrade',
    url: 'https://www.linkedin.com/in/seerendo/',
    description: 'LinkedIn',
  });
  await save.save();
  const data = await UrlModel.find({ description: 'LinkedIn' });
  console.log({ data, save });
}