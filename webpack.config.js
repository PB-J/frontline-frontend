const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const rules = [
  {
    test: /\.js$/,
    loader: 'babel-loader',
    exclude: /node_modules/
  },
  {
    test: /\.s[ac]ss$/i,
    use: ['style-loader', 'css-loader', 'sass-loader']
  },
  {
    test: /\.js$/,
    enforce: 'pre',
    use: ['source-map-loader']
  },
  {
    test: /\.(webm|webp|mp4|png|svg)$/,
    loader: 'file-loader'
  }
]

const plugins = [
  new HtmlWebpackPlugin({
    template: './public/index.html',
    favicon: './public/favicon.ico'
  }),
  new CopyPlugin({
    patterns: [
      {
        from: 'public/manifest.json',
        to: 'assets/manifest.json',
        toType: 'file'
      }
    ]
  })
]

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules
  },
  plugins,
  devServer: {
    port: 7165,
    open: true,
    hot: true
  }
}
