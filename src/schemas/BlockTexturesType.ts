import mongoose from 'mongoose';

interface ITextures {
  up?: string;
  down?: string;
  side?: string;
  east?: string;
  west?: string;
  north?: string;
  south?: string;
}

export class BlockTexturesType extends mongoose.SchemaType {
  constructor(key: string, options: any) {
    super(key, options, 'BlockTexturesType');
  }

  cast(value: string | ITextures) {
    if (typeof value !== 'string' && !BlockTexturesType.isTexturesObject(value)) {
      throw new Error(`BlockTexturesType: ${value} must be a string or Textures object`);
    }

    return value;
  }

  private static isTexturesObject(object: any): object is ITextures {
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

mongoose.Schema.Types['BlockTexturesType'] = BlockTexturesType;
