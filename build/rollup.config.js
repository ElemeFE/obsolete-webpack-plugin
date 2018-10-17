import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';

export default {
  input: './web/obsolete.js',
  output: {
    file: './web-dist/obsolete.js',
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
      exclude: 'node_modules/**',
    }),
  ],
};
