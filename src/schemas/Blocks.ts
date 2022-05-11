import { model, Schema } from 'mongoose';
import { IBlock } from '@typings/IBlocks';
import { MetadataType } from './MetadataType';
import { TextureDataType } from './TextureDataType';

const schema = new Schema({
  id: { type: String, required: true },
  has_variations: { type: Boolean, required: true },
  name: { type: String, required: false },
  texture_data: { type: TextureDataType, required: false },
  metadata: { type: MetadataType, required: false },
}, { versionKey: false });

export const Blocks = model<IBlock>('blocks', schema);
