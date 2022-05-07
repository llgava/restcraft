module.exports = {
  presets: [
    [
      '@babel/preset-env',
      { targets: { node: 'current' } }
    ],
    '@babel/preset-typescript'
  ],

  plugins: [
    ['module-resolver', {
      root: ['./src'],
      alias: {
        //'@eg': './src/eg'
      }
    }]
  ],

  ignore: [
    '**/__tests__/',
    '**/@types/'
  ]
};
