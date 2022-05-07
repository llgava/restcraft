import { ObjectId } from 'mongoose';

export interface Block extends BlockBase {
  _id?: ObjectId | string;
  id?: string;
  has_variations?: boolean;
  metadata?: Metadata[]
}

export interface Metadata extends BlockBase {
  data: number;
}

export interface BlockBase {
  name?: string;
  texture_path?: string;
}
