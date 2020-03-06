const { images, entry, root, enviroment } = require('./webpack');
const { base } = require('./webpack.base');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const merge = require('webpack-merge');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
const Visualizer = require('webpack-visualizer-plugin');

/**
 * Prod configuration
 */
module.exports = merge(base, {
  mode: 'production',
  entry,
  output: {
    publicPath: enviroment().domain + '/'
  },

  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 6,
      maxInitialRequests: 4,
      automaticNameDelimiter: '~',
      automaticNameMaxLength: 30,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    },
    minimize: true,
    minimizer: [new TerserPlugin(), new OptimizeCSSAssetsPlugin({})]
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [root('dist')]
    })
    // new Visualizer({
    //   filename: root('report/stats.html')
    // })
  ]
});
