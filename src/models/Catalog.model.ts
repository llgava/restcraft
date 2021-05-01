import { ObjectId, Document } from 'mongoose';

interface CatalogModel {
  _id?: ObjectId | string;
  uuid?: string;
  title?: string;
  description?: string;
  creator?: string;
  price?: string | number;
  averageRating?: number;
  totalRatingCount?: number;
  url?: string;
  thumbnail?: string;
}

type CatalogType = CatalogModel & Document;

export { CatalogModel, CatalogType };
