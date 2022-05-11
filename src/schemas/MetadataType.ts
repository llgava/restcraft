import mongoose from 'mongoose';
import { IBlockMetadata } from '@typings/IBlocks';

/**
 * @deprecated Use MetadataSchema instead
 */
export class MetadataType extends mongoose.SchemaType {
  constructor(key: string, options: any) {
    super(key, options, MetadataType.name);
  }

  cast(value: IBlockMetadata[]) {
    if (!MetadataType.isMetadataArray(value)) {
      throw new Error(`${MetadataType.name}: ${value} must be a metadata object`);
    }

    return value;
  }

  private static isMetadataArray(object: any[]): object is IBlockMetadata[] {
    const metadataKeys = ['data', 'name'];

    Object.values(object).forEach(metadata => {
      if(!Object.keys(metadata).every(key => metadataKeys.includes(key))) {
        return false;
      }
    })

    return true;
  }
}

mongoose.Schema.Types[MetadataType.name] = MetadataType;

export const MetadataSchema = new mongoose.Schema({
  name: { type: String, required: true },
  data: { type: Number, required: true },
}, { _id: false, versionKey: false });
