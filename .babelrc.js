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
        '@typings': './src/typings',
        '@controllers': './src/api/controllers',
        '@models': './src/models',
        '@routes': './src/api/routes',
        '@utils': './src/utils',
      }
    }]
  ],

  ignore: [
    '**/__tests__/',
    '**/typings/',
    "**/scripts/"
  ]
};
