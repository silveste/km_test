const webpack = require('webpack');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');
const common = require('./webpack.common');

const prod = {
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({filename: 'style-[contentHash:8]-bundle.css'})
  ],
  optimization: {
    minimizer: [
      new OptimizeCssAssetsWebpackPlugin(),
      new TerserPlugin()
    ]
  },
  module: {
    rules: [
      {
        test: /\.(scss|sass)$/,
        use: [
          MiniCssExtractPlugin.loader,
        ]
      },
    ]
  },
  output: {
    filename: 'main-[contentHash:8]-bundle.js',
    path: path.resolve(__dirname,'../dist'),
    publicPath: './'
  }
};

module.exports = merge.smartStrategy({'module.rules.use': 'prepend'})(common,prod);
