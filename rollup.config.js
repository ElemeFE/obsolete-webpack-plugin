import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
  input: './web/obsolete.js',
  output: {
    file: './web-dist/obsolete.js',
    format: 'iife',
    name: 'Obsolete',
  },
  plugins: [resolve(), commonjs()],
};
