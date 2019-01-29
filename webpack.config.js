const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, './react-client/src/index.jsx'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './react-client/dist'),
  },
  mode: 'production',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        include: path.resolve(__dirname, './react-client/src'),
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        },
      }
    ],
  }
};