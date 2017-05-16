import json from 'rollup-plugin-json';

export default {
  entry: 'src/xmlion.js',
  format: 'es',
  plugins: [
    json()
  ],
  dest: 'dist/xmlion.es.js'
};