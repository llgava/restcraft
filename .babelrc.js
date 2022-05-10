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
        '@controllers': './src/controllers',
        '@models': './src/models',
        '@routes': './src/routes',
        '@schemas': './src/schemas',
        '@utils': './src/utils',
      }
    }]
  ],

  ignore: [
    '**/__tests__/',
    '**/typings/'
  ]
};
