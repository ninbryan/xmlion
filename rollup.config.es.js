import json from 'rollup-plugin-json';

export default {
  entry: 'src/xmlion.js',
  format: 'es',
  plugins: [
    json({
      preferConst: true
    })
  ],
  dest: 'dist/xmlion.es.js'
};