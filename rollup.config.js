import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
  input: './src/browser/obsolete.js',
  output: {
    file: './lib/browser/obsolete.js',
    format: 'iife',
    name: 'Obsolete'
  },
  plugins: [
    resolve(),
    commonjs()
  ]
};