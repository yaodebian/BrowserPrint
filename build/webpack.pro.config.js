const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: './src/lib/print.js',
  output: {
    library: 'printJS',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, '../dist'),
    filename: 'print.js', // customize the filenames of generated bundle file
    sourceMapFilename: 'print.map', // customize the filenames of generated Source Maps
    libraryExport: 'default'
  },
  plugins: [
    new CleanWebpackPlugin()
  ]
}
