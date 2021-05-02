import { model, Schema } from 'mongoose';

import { CatalogType } from '@models/Catalog.model';

const schema = new Schema({
  uuid: { type: String, required: true, unique: true },
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true, unique: true },
  creator: { type: String, required: true },
  price: { type: String, required: true },
  trailer: { type: String },
  keyart: { type: String, required: true },
  rating: {
    average: { type: Number, required: true },
    total: { type: Number, require: true }
  },
  url: { type: String, required: true, unique: true },
}, { versionKey: false });

export const Catalog = model<CatalogType>('catalog', schema);
