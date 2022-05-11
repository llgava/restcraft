import { model, Schema } from 'mongoose';
import { IBlock } from '@typings/IBlocks';
import { BlockTexturesType } from './BlockTexturesType';

const MetadataSchema = new Schema({
  name: { type: String, required: true },
  data: { type: Number, required: true }
}, { _id: false, versionKey: false });

const schema = new Schema({
  id: { type: String, required: true },
  has_variations: { type: Boolean, required: true },
  name: { type: String, required: false },
  texture_data: { type: BlockTexturesType, required: false },
  metadata: { type: [MetadataSchema], required: false },
}, { versionKey: false });

export const Blocks = model<IBlock>('blocks', schema);
