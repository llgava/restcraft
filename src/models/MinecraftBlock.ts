import { MinecraftBlockMetadata } from './MinecraftBlockMetadata';

export class MinecraftBlock {
  private static namespace: string = "minecraft:";
  public id: string;
  public name: string;
  public metadata?: MinecraftBlockMetadata[] = [];

  constructor(id: string, name: string, metadata?: MinecraftBlockMetadata[]) {
    this.id = MinecraftBlock.namespace + id;
    this.name = name;
    this.metadata = metadata;
  }
}
