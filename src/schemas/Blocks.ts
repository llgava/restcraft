import { model, Schema } from 'mongoose';
import { Block } from '../@types/blocks';

const MetadataSchema = new Schema({
  name: { type: String, required: true },
  texture_path: { type: String, required: true },
  data: { type: String, required: true }
});

const schema = new Schema({
  id: { type: String, required: true },
  has_variations: { type: Boolean, required: true },
  name: { type: String, required: false },
  texture_path: { type: String, required: false },
  metadata: { type: [MetadataSchema], required: false },
}, { versionKey: false });

export const Blocks = model<Block>('blocks', schema);
