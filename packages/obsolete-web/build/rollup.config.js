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
      runtimeHelpers: true,
      exclude: '../../node_modules/**',
    }),
  ],
};
