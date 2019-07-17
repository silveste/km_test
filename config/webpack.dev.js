const merge = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common');

const dev = {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(scss|sass)$/,
        use: [
          'style-loader'
        ]
      },
    ]
  },
  devServer: {
    overlay: true //Show compile errors in the browser
  },
  devtool: 'source-map' //Devtools will show the source in addition the compiled code
  //dev mode is used with webpack-dev-server therefore no need to set the output
};

module.exports = merge.smartStrategy({'module.rules.use': 'prepend'})(common,dev);
