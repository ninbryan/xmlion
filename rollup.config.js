import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';

export default {
  entry: 'src/xmlion.js',
  format: 'umd',
  moduleName:'xmlion',
  plugins: [
    json(),
    babel()
  ],
  dest: 'dist/xmlion.js'
};