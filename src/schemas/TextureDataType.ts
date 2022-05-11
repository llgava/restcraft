import mongoose from 'mongoose';
import { IBlockTextureFaces } from '@typings/IBlocks';

export class TextureDataType extends mongoose.SchemaType {
  constructor(key: string, options: any) {
    super(key, options, TextureDataType.name);
  }

  cast(value: string | IBlockTextureFaces) {
    if (typeof value !== 'string' && !TextureDataType.isTexturesObject(value)) {
      throw new Error(`${TextureDataType.name}: ${value} must be a string or Textures object`);
    }

    return value;
  }

  private static isTexturesObject(object: any): object is IBlockTextureFaces {
    return (
      'up' in object ||
      'down' in object ||
      'side' in object ||
      'east' in object ||
      'west' in object ||
      'north' in object ||
      'south' in object
    );
  }
}

mongoose.Schema.Types[TextureDataType.name] = TextureDataType;
