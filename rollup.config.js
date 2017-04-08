import babel from 'rollup-plugin-babel';

export default {
  entry: 'src/xmlion.js',
  format: 'umd',
  moduleName:'xmlion',
  plugins: [
    babel()
  ],
  dest: 'dist/xmlion.js'
};