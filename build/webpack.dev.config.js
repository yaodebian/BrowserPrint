const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  devtool: 'source-map',
  entry: {
    importPrint: './src/view/importPrint.js',
    index: './src/view/index.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js' // customize the filenames of generated bundle file
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/view/index.html'
    })
  ]
}
