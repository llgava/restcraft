/*
  TODO: Add metadata manually for following blocks (static/blocks.json)
    - Trapdoor types;
    - Log types;
    - Log2 types;
    - Sapling types;
    - Water types;
    - Flowing water types;
    - Lava types;
    - Flowing lava types;
    - Candle types;
    - Lantern types;
    - Respawn anchor types;
    - Brewing stand types;
*/

import MinecraftData from 'minecraft-data';
import StaticBlocks from '../static/Blocks.json';
import { ITransferMetadata } from '@typings/IBlocks';
import { MinecraftBlock } from '@models/MinecraftBlock';
import { MinecraftBlockMetadata } from '@models/MinecraftBlockMetadata';

const minecraft = {
  legacy: MinecraftData("bedrock_0.14"),
  latest: MinecraftData("bedrock_1.18.11")
};

class MinecraftDataManager {
  private static transferMetadata: ITransferMetadata[] = [{ "stained_glass": "glass" }, { "stained_hardened_clay": "hardened_clay" }];
  private ignoreMetadata: string[] = ["podzol"];
  public blocks: MinecraftBlock[] = [];

  constructor() {
    this.updateIgnoreMetadata();
    this.collectMinecraftBlocks();
  }

  /**
   * The 'transferFrom' id will be added automatically on the ignoreMetadata array.
   * @example { "dirt": "podzol" }
   **/
  private updateIgnoreMetadata() {
    MinecraftDataManager.transferMetadata.forEach((value) => {
      this.ignoreMetadata.push(Object.values(value)[0]);
    });
  }

  private collectMinecraftBlocks(): void {
    minecraft.latest.blocksArray.forEach((blockLatest) => {
      const metadata: MinecraftBlockMetadata[] = [];

      // * Use static block metadata if available
      if (Object.keys(StaticBlocks).find((key) => key === 'minecraft:' + blockLatest.name)) {
        const staticMetadata = StaticBlocks['minecraft:' + blockLatest.name].metadata;
        return this.blocks.push(new MinecraftBlock(blockLatest.name, blockLatest.displayName, staticMetadata));
      }

      // * Fix block metadata from legacy to latest
      if (!minecraft.legacy.blocksByName[blockLatest.name]) {
        if (MinecraftDataManager.transferMetadata.find((index) => index[blockLatest.name])) {
          const metadataFrom = MinecraftDataManager.transferMetadata.find((index) => index[blockLatest.name])[blockLatest.name];

          minecraft.legacy.blocksByName[metadataFrom].variations.forEach(metadataLegacy => {
            metadata.push(new MinecraftBlockMetadata(metadataLegacy.displayName, metadataLegacy.metadata));
          });

          return this.blocks.push(new MinecraftBlock(blockLatest.name, blockLatest.displayName, metadata));
        }

        return this.blocks.push(new MinecraftBlock(blockLatest.name, blockLatest.displayName, []));
      }

      // * Transfer block metadata from legacy to latest version
      if (minecraft.legacy.blocksByName[blockLatest.name].variations
        && !this.ignoreMetadata.find((metadata) => metadata === blockLatest.name)) {

        minecraft.legacy.blocksByName[blockLatest.name].variations.forEach(metadataLegacy => {
          const blockMetadata: MinecraftBlockMetadata = new MinecraftBlockMetadata(metadataLegacy.displayName, metadataLegacy.metadata);
          metadata.push(blockMetadata);
        });
      }

      const block = new MinecraftBlock(blockLatest.name, blockLatest.displayName, metadata);
      this.blocks.push(block);
    });
  }
}

export default new MinecraftDataManager;
