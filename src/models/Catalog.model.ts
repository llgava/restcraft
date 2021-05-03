import { ObjectId, Document } from 'mongoose';

interface CatalogRating {
  average?: number;
  total?: number;
}

interface CatalogModel {
  _id?: ObjectId | string;
  uuid?: string;
  title?: string;
  description?: string;
  creator?: string;
  price?: string;
  trailer?: string;
  keyart?: string;
  rating?: CatalogRating;
  url?: string;
}

type CatalogType = CatalogModel & Document;

export { CatalogRating, CatalogModel, CatalogType };
