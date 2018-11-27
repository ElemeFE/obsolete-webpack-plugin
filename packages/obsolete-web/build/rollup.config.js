import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';

const config = ['js', 'min.js'].map(extname => ({
  input: 'src/obsolete.js',
  output: {
    file: `dist/obsolete.${extname}`,
    format: 'umd',
    name: 'Obsolete',
  },
  plugins: [
    resolve(),
    babel({
      runtimeHelpers: true,
      exclude: '../../node_modules/**',
    }),
    commonjs(),
    ...(extname.includes('min') ? [uglify()] : []),
  ],
}));

export default config;
