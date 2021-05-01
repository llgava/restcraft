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
        '@utils': './src/utils',
        '@models': './src/models',
        '@routes': './src/routes',
        '@schemas': './src/schemas',
        '@services': './src/services',
        '@controllers': './src/controllers'
      }
    }]
  ],

  ignore: [
    '**/*.test.ts',
    '**/*.spec.ts'
  ]
};
