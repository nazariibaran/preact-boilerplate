const { DefinePlugin, optimize, ContextReplacementPlugin } = require('webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const {
  toProcessEnv,
  root,
  images,
  use,
  production,
  enviroment
} = require('./webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const SimpleProgressPlugin = require('webpack-simple-progress-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');

/**
 * Plugins
 */
const { OccurrenceOrderPlugin } = optimize;
/**
 * Get styles rule
 */
const styles = (global = true) => {
  const rule = {
    test: /(\.css|\.scss)/,
    exclude: [/node_modules/],
    use: [
      use(MiniCssExtractPlugin.loader, {
        minimize: production,
        hmr: !production
      }),
      use(
        'css-loader',
        global
          ? {}
          : {
              modules: {
                localIdentName: '[local]__[hash:base64:5]'
              },
              localsConvention: 'camelCaseOnly'
            }
      ),
      'postcss-loader',
      'sass-loader'
    ]
  };

  if (global) {
    rule.include = [/(global\..*)$/];
  } else {
    rule.exclude.push(/(global\..*)$/);
  }

  return rule;
};

/**
 * Base configuration
 */
const base = {
  output: {
    path: root('dist'),
    filename: 'js/[name].js',
    publicPath: '/',
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]'
  },
  resolve: {
    plugins: [new TsconfigPathsPlugin()],
    alias: {
      '@core': root('src/styles/core.scss'),
      assets: root('src/assets/'),
      react: 'preact/compat',
      'react-dom/test-utils': 'preact/test-utils',
      'react-dom': 'preact/compat'
    },
    modules: ['node_modules'],
    extensions: [
      '.ts',
      '.css',
      '.scss',
      '.tsx',
      '.js',
      '.json',
      '.png',
      '.svg',
      '.jpg',
      '.*'
    ]
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: [use('ts-loader')],
        exclude: /node_modules/
      },
      {
        test: /\.(woff|woff2|otf|eot|ico|ttf)(\?[a-z0-9=.]+)?$/,
        use: [
          use('file-loader', {
            name: 'fonts/[name].[ext]'
          })
        ]
      },
      // images({ optimize: process.env.NODE_ENV == 'production' }),
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          use('file-loader', {
            name: 'img/[name].[ext]'
          })
        ]
      },
      styles(),
      styles(false)
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: root('src/public/index.html'),
      filename: 'index.html',
      inject: true
      // minify: production
    }),
    new DefinePlugin(toProcessEnv(enviroment())),
    new ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
    new OccurrenceOrderPlugin(true),
    new FriendlyErrorsWebpackPlugin(),
    // new ForkTsCheckerWebpackPlugin(),
    // new ForkTsCheckerNotifierWebpackPlugin({
    //   title: 'TypeScript',
    //   alwaysNotify: true
    // }),
    new SimpleProgressPlugin({
      progressOptions: {
        clear: true
      }
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new CircularDependencyPlugin({
      exclude: /node_modules/,
      failOnError: true,
      allowAsyncCycles: false
    })
  ]
};

module.exports = { base };
