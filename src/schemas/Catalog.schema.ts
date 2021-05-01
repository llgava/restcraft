import { model, Schema } from 'mongoose';

import { CatalogType } from '@models/Catalog.model';

const schema = new Schema({
  uuid: { type: String, required: true, unique: true },
  title: { type: String, required: true, unique: true },
  creator: { type: String, required: true },
  price: { type: Number, required: true },
  url: { type: String, required: true, unique: true },
  thumbnail: { type: String, required: true, unique: true },

  // Not colleted by Web Scraping yet!
  description: { type: String, required: false },
  averageRating: { type: Number, required: false },
  totalRatingCount: { type: Number, required: false }
}, { versionKey: false });

export const Catalog = model<CatalogType>('catalog', schema);
