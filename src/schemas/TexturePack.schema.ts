import { model, Schema } from 'mongoose';

import { Catalog } from '@schemas/Catalog.schema';
import { CatalogType } from '@models/Catalog.model';

const schema = new Schema({
  ...Catalog.schema.obj

}, { versionKey: false });

export const TexturePack = model<CatalogType>('texture-pack', schema);