import { IBlockTextureFaces } from '@typings/IBlocks';
import { MinecraftBlockMetadata } from './MinecraftBlockMetadata';
import RPBlocks from '../../VanillaResourcePack/blocks.json';

export class MinecraftBlock {
  private static namespace: string = "minecraft:";
  public id: string;
  public name: string;
  public metadata?: MinecraftBlockMetadata[] = [];
  public texture_data?: string | IBlockTextureFaces;

  constructor(id: string, name: string, metadata?: MinecraftBlockMetadata[]) {
    this.id = MinecraftBlock.namespace + id;
    this.name = name;
    this.metadata = metadata;
    this.texture_data = MinecraftBlock.getTextureData(id);
  }

  public static getTextureData(block_id: string): string | IBlockTextureFaces | null {
    const _id = block_id.replace(MinecraftBlock.namespace, '');
    const block = Object.keys(RPBlocks).find((key) => key === _id);

    if(!block || !RPBlocks[block].textures) {
      return null;
    }

    return RPBlocks[block].textures;
  }
}
