import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';

const config = ['obsolete', 'obsolete.min'].map(name => ({
  input: 'src/obsolete.js',
  output: {
    file: `dist/${name}.js`,
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
    ...(name.includes('min') ? [uglify()] : []),
  ],
}));

export default config;
