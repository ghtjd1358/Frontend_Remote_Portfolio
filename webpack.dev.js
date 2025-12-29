// â­?Phase 3: ê°œë°œ ?˜ê²½ ?¤ì •
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  
  devServer: {
    static: {
      directory: path.join(__dirname, 'public')
    },
    port: 3003,
    hot: true,
    open: true,
    historyApiFallback: true
  }
});
