const path = require('path');

module.exports = {
  mode: 'none',
  entry: './src/main.js',
  target: 'node',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
