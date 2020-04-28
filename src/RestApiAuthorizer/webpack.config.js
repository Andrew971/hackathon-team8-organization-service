const webpack = require('webpack'); //to access built-in plugins
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');



module.exports = {
  context: __dirname,
  mode: "production",
  entry: "./index.js",
  output: {
    filename: 'index.js',
    path: path.join(__dirname, 'build'),
    library: "[name]",
    libraryTarget: "commonjs2"
  },
  target: 'node',
  node: {
    fs: 'empty'
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin(['build']),
  ],
  devtool: 'source-map',
  module: {
    rules: [
      {
        type: 'javascript/auto',
        test: /\.mjs$/,
        use: [],
      },
      {
        test: /\.node$/,
        use: 'node-loader'
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        include: [path.resolve(__dirname, "src")],
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: true
            }
          }
        ]
      },
    
    ]
  },
  externals: {
    'sharp': 'commonjs sharp'
 },
  optimization: {
    minimize: true,
  }
}