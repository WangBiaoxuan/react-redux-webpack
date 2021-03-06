/**
 * External dependencies
 */
const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');

/**
 * Internal dependencies
 */
const paths = require('../../global/paths');
const getClientEnvironment = require('../../global/env');

const publicPath = '/';
const publicUrl = '';
const env = getClientEnvironment(publicUrl);

module.exports = {
  entry: [
    require.resolve('react-dev-utils/webpackHotDevClient'),
    require.resolve('../../global/polyfills'),
    paths.indexJs,
  ],
  output: {
    path: paths.clientBuild,
    pathinfo: true,
    filename: 'static/js/bundle.js',
    publicPath: publicPath
  },
  resolve: {
    fallback: paths.nodePaths,
    extensions: ['.js', '.json', '.jsx', ''],
    alias: {
      'react-native': 'react-native-web'
    }
  },
  module: {
    preLoaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'eslint',
        include: paths.clientSrc,
      }
    ],
    loaders: [
      {
        exclude: [
          /\.html$/,
          /\.(js|jsx)$/,
          /\.(css|less)$/,
          /\.json$/,
          /\.svg$/
        ],
        loader: 'url',
        query: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]'
        }
      },
      {
        test: /\.(js|jsx)$/,
        include: paths.clientSrc,
        loader: 'babel',
        query: {
          cacheDirectory: true
        }
      },
      {
        test: /\.(css|less)$/,
        loader: 'style!css!less?importLoaders=1!postcss'
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.svg$/,
        loader: 'file',
        query: {
          name: 'static/media/[name].[hash:8].[ext]'
        }
      }
    ]
  },
  postcss: function() {
    return [
      autoprefixer({
        browsers: [
          '>1%',
          'last 4 versions',
          'Firefox ESR',
          'not ie < 9',
        ]
      }),
    ];
  },
  plugins: [
    new InterpolateHtmlPlugin({
      PUBLIC_URL: publicUrl
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.indexHtml,
    }),
    new webpack.DefinePlugin(env),
    new webpack.HotModuleReplacementPlugin(),
    new CaseSensitivePathsPlugin(),
    new WatchMissingNodeModulesPlugin(paths.appNodeModules),
    new StyleLintPlugin({
      configFile: path.join(__dirname, '../../../.stylelintrc'),
      context: paths.clientSrc,
      files: ['**/*.css', '**/*.less'],
      failOnError: false,
    }),
  ],
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  devtool: 'cheap-module-source-map',
};
