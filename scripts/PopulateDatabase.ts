import axios from 'axios';
import MinecraftDataManager from '../src/utils/MinecraftDataManager';
import { IBlock } from '../src/@types/IBlocks';

MinecraftDataManager.blocks.forEach(block => {
  axios.post<IBlock>('http://localhost:3000/api/blocks', {
    id: block.id,
    name: block.name,
    has_variations: block.metadata.length > 0 ? true : false,
    texture_path: "textures/blocks/$BLOCK_TEXTURE.png", // TODO: replace $BLOCK_TEXTURE with the block's texture path
    metadata: block.metadata
  });
});
