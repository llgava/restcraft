const axios = require('axios');
const chalk = require('chalk');
const { requireTS } = require('./utils/ImportTypeScriptFile');

const MinecraftDataManager = requireTS('../src/utils/MinecraftDataManager')

console.log(chalk.bold.green('Populating database...\n'));

MinecraftDataManager.blocks.forEach(block => {
  axios.post('http://localhost:3000/api/blocks', {
    id: block.id,
    name: block.name,
    has_variations: block.metadata.length > 0 ? true : false,
    texture_data: block.texture_data,
    metadata: block.metadata
  });
});
