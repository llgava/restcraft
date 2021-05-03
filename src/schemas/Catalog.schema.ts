import { model, Schema } from 'mongoose';

import { CatalogType } from '@models/Catalog.model';

const schema = new Schema({
  uuid: { type: String,  unique: true },
  title: { type: String },
  description: { type: String },
  creator: { type: String },
  price: { type: String },
  trailer: { type: String },
  keyart: { type: String,  },
  rating: {
    average: { type: Number },
    total: { type: Number }
  },
  url: { type: String },
}, { versionKey: false });

export const Catalog = model<CatalogType>('catalog', schema);
