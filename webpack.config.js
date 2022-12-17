const prod = process.env.NODE_ENV === 'production';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const dotenv = require('dotenv');
const { DefinePlugin } = require('webpack');

module.exports = {
  mode: prod ? 'production' : 'development',
  entry: './src/index.jsx',
  output: {
    path: __dirname + '/dist/',
    clean: true,
    publicPath: '/',
  },
  resolve: {
    fallback: {
      path: false,
      fs: false,
      os: false,
    }
  },
  module: {
    rules: [
      {
        test: /\.(jsx?)$/,
        exclude: [path.resolve('node_modules')],
        resolve: {
          extensions: ['.js','.jsx'],
        },
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: prod ? [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
                  : ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/,
        include: path.resolve('src/assets'),
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]',
        },
      },
      {
        test: /\.(mp4|ogg)$/,
        include: path.resolve('src/assets'),
        type: 'asset/resource',
        generator: {
          filename: 'videos/[name][ext]',
        },
      },
    ]
  },
  devServer: {
    historyApiFallback: true,
  },
  devtool: prod ? undefined : 'source-map',
  plugins: [
    /*
      Note: favicon image name should be 'icon'.
      Otherwise, the image may not appear
      in the browser tab
     */
    new HtmlWebpackPlugin({
      template: 'index.html',
      favicon: './src/assets/icon.ico',
      inject: 'body'
    }),
    new MiniCssExtractPlugin(),
    new DefinePlugin({
      'process.env': JSON.stringify(dotenv.config().parsed)
    }),
  ],
};

