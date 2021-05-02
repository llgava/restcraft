import { ObjectId, Document } from 'mongoose';

interface Rating {
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
  rating?: Rating;
  url?: string;
}

type CatalogType = CatalogModel & Document;

export { CatalogModel, CatalogType };
