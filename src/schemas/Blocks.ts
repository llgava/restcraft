import { model, Schema } from 'mongoose';
import { IBlock } from '@typings/IBlocks';

const MetadataSchema = new Schema({
  name: { type: String, required: true },
  texture_path: { type: String, required: false },
  data: { type: Number, required: true }
}, { _id: false });

const schema = new Schema({
  id: { type: String, required: true },
  has_variations: { type: Boolean, required: true },
  name: { type: String, required: false },
  texture_path: { type: String, required: false },
  metadata: { type: [MetadataSchema], required: false },
}, { versionKey: false });

export const Blocks = model<IBlock>('blocks', schema);
