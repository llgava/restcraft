import { model, Schema } from 'mongoose';

import { Catalog } from '@schemas/Catalog.schema';
import { CatalogType } from '@models/Catalog.model';

const schema = new Schema({
  ...Catalog.schema.obj

}, { versionKey: false });

export const MiniGames = model<CatalogType>('mini-game', schema);
