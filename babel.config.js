module.exports = {
  presets: [
    [
      '@babel/env',
      {
        modules: false,
        useBuiltIns: 'usage',
        targets: {
          browsers: 'ie 6',
        },
      },
    ],
  ],
};
