import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';

export default {
  input: 'src/obsolete.js',
  output: {
    file: 'dist/obsolete.js',
    format: 'umd',
    name: 'Obsolete',
  },
  plugins: [
    resolve(),
    commonjs(),
    babel({
      presets: [
        [
          '@babel/env',
          {
            modules: false,
            useBuiltIns: 'usage',
            targets: {
              browsers: '> 0%',
            },
          },
        ],
      ],
      plugins: ['@babel/plugin-transform-property-mutators'],
      exclude: '../../node_modules/**',
    }),
  ],
};
