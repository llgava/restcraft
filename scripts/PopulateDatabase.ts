import axios from 'axios';
import MinecraftDataManager from '../src/utils/MinecraftDataManager';
import { IBlock } from '../src/typings/IBlocks';
import { MinecraftBlock } from '../src/models/MinecraftBlock';

MinecraftDataManager.blocks.forEach(block => {
  axios.post('http://localhost:3000/api/blocks', <IBlock>{
    id: block.id,
    name: block.name,
    has_variations: block.metadata.length > 0 ? true : false,
    texture_data: block.texture_data, // TODO: change in the future
    metadata: block.metadata
  });
});

