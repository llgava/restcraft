import { ObjectId } from 'mongoose';

export interface IBlock extends IBlockBase {
  _id?: ObjectId | string;
  id?: string;
  has_variations?: boolean;
  metadata?: IBlockMetadata[];
}

export interface IBlockMetadata extends IBlockBase {
  data?: number;
}

export interface IBlockBase {
  name?: string;
  texture_path?: string;
}

/**
 * @example { "transferTo": "transferFrom" }
 */
export interface ITransferMetadata {
  [block: string]: string;
}
