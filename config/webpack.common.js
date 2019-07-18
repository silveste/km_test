const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: './src/main.js',
  plugins: [new HtmlWebpackPlugin({
    template: './src/index.html'
  })],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            configFile: './config/babel.config.js'
          }
        },
        exclude: /node_modules/,
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              config: {path: __dirname + '/postcss.config.js'}
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.html$/,
        use: ['html-loader']
      },
      {
        test: /\.(svg|png|jpe?g|gif|webp)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name]-[hash:8].[ext]',
            outputPath: 'imgs'
          }
        }
      }
    ]
  }
}
