module.exports = {
  presets: [
    [
      '@babel/env',
      {
        modules: false,
        loose: true,
        targets: {
          browsers: '>= 0%',
        },
      },
    ],
  ],
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: 2,
      },
    ],
    '@babel/plugin-transform-property-mutators',
    '@babel/plugin-proposal-class-properties',
  ],
  env: {
    test: {
      presets: [
        [
          '@babel/env',
          {
            modules: 'commonjs',
            loose: true,
            targets: {
              browsers: '>= 0%',
            },
          },
        ],
      ],
    },
    cjs: {
      presets: [
        [
          '@babel/env',
          {
            modules: 'commonjs',
            loose: true,
            targets: {
              browsers: '>= 0%',
            },
          },
        ],
      ],
    },
    esm: {
      presets: [
        [
          '@babel/env',
          {
            modules: false,
            loose: true,
            targets: {
              browsers: '>= 0%',
            },
          },
        ],
      ],
    },
  },
};
