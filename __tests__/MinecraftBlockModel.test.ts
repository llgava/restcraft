import { MinecraftBlock } from '../src/models/MinecraftBlock';
import { MinecraftBlockMetadata } from '../src/models/MinecraftBlockMetadata';

describe('Minecraft Block Model', () => {
  it('should create a new Minecraft Block with texture_data', () => {
    const blockMetadata: MinecraftBlockMetadata[] = [
      new MinecraftBlockMetadata('Stone', 0),
      new MinecraftBlockMetadata('Granite', 1),
      new MinecraftBlockMetadata('Polished Granite', 2)
    ];

    const block = new MinecraftBlock('stone', 'Stone', blockMetadata);

    expect(block.texture_data).toBe('stone');
  });

  it('should create a new Minecraft Block without texture_data', () => {
    const block = new MinecraftBlock('ait', 'Air', []);

    expect(block.texture_data).toBe(null);
  });
});
