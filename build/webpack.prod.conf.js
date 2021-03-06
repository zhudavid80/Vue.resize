var path = require('path')
var config = require('../config')
var utils = require('./utils')
var webpack = require('webpack')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var env = config.build.env

var webpackConfig = merge(baseWebpackConfig, {
  entry: {
    "vueImagesLoaded": './src/Vueresize.js'
  },
  module: {
    loaders: utils.styleLoaders({ sourceMap: config.build.productionSourceMap, extract: true })
  },
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot,
    filename: 'Vueresize.js',
    library: 'Vueresize',
    libraryTarget: "umd"
  },
  externals: {
    "vue": {
      root: 'Vue',
      commonjs2: 'vue',
      commonjs: 'vue',
      amd: 'vue'
    },
    "resizeSensor": {
      root: 'ResizeSensor',
      commonjs2: 'css-element-queries/src/ResizeSensor.js',
      commonjs: 'css-element-queries/src/ResizeSensor.js',
      amd: 'css-element-queries/src/ResizeSensor.js'
    },
    "lodash.debounce": {
      root: '_',
      commonjs2: 'lodash.debounce',
      commonjs: 'lodash.debounce',
      amd: 'lodash.debounce'
    }
  },
  vue: {
    loaders: utils.cssLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin()
  ]
})

module.exports = webpackConfig
