import axios from 'axios';
import MinecraftDataManager from '../src/utils/MinecraftDataManager';
import { IBlock } from '../src/typings/IBlocks';

MinecraftDataManager.blocks.forEach(block => {
  axios.post<IBlock>('http://localhost:3000/api/blocks', {
    id: block.id,
    name: block.name,
    has_variations: block.metadata.length > 0 ? true : false,
    texture_data: "This can be a string or ITextures object type.", // TODO: change in the future
    metadata: block.metadata
  });
});
