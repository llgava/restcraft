import { ObjectId } from 'mongoose';

export interface IBlock {
  _id?: ObjectId | string;
  id?: string;
  name?: string;
  has_variations?: boolean;
  metadata?: IBlockMetadata[];
  texture_data?: string | IBlockTextureFaces;
}

export interface IBlockMetadata {
  name?: string;
  data?: number;
}

/**
 * @example { "transferTo": "transferFrom" }
 */
export interface ITransferMetadata {
  [block: string]: string;
}

export interface IBlockTextureFaces {
  up?: string;
  down?: string;
  side?: string;
  east?: string;
  west?: string;
  north?: string;
  south?: string;
}
