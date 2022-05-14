const path = require('path');
const { register } = require('ts-node');
const { compilerOptions } = require('../../tsconfig.json');

function requireTS(file_path) {
  register({ compilerOptions });

  const TSFile = require(path.join('..', file_path));
  return TSFile.default || TSFile;
}

module.exports = { requireTS };
