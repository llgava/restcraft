import mongoose from 'mongoose';
import { IBlockMetadata } from '@typings/IBlocks';

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
