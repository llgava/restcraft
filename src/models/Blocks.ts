import { model, Schema } from 'mongoose';
import { IBlock } from '@typings/IBlocks';
import { MetadataSchema } from './db/MetadataType';
import { TextureDataType } from './db/TextureDataType';

const schema = new Schema({
  id: { type: String, required: true, unique: true },
  has_variations: { type: Boolean, required: true },
  name: { type: String, required: true },
  texture_data: { type: TextureDataType, required: false },
  metadata: { type: [MetadataSchema], required: false },
}, { versionKey: false });

export const Blocks = model<IBlock>('blocks', schema);
