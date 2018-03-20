'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

const express = require('express')
const app = express()
const appData = require('../data.json')
const apiRoutes = express.Router()
app.use('/api', apiRoutes)

const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    },
    before(app) {
      app.post('/api/login', function (req, res) { 
        res.json({
          status: appData.login.status,
          data: appData.login.data,
          msg:  appData.login.msg
        });
      })
      app.get('/api/newsMarquee', function (req, res) { 
        res.json({
          status: appData.newsMarquee.status,
          data: appData.newsMarquee.data,
          msg:  appData.newsMarquee.msg
        });
      })
      app.get('/api/reservoirList', function (req, res) { 
        res.json({
          status: appData.reservoirList.status,
          data: appData.reservoirList.data,
          msg:  appData.reservoirList.msg
        });
      })
      app.get('/api/reservoirDetail/info', function (req, res) { 
        res.json({
          status: appData.reservoirDetailInfo.status,
          data: appData.reservoirDetailInfo.data,
          msg:  appData.reservoirDetailInfo.msg
        });
      })
      app.get('/api/reservoirDetail/member', function (req, res) { 
        res.json({
          status: appData.reservoirDetailMember.status,
          data: appData.reservoirDetailMember.data,
          msg:  appData.reservoirDetailMember.msg
        });
      })
      app.get('/api/reservoirDetail/inspection', function (req, res) { 
        res.json({
          status: appData.ReservoirDetailInspection.status,
          data: appData.ReservoirDetailInspection.data,
          msg:  appData.ReservoirDetailInspection.msg
        });
      })
      app.get('/api/reservoirDetail/monitor/photo', function (req, res) { 
        res.json({
          status: appData.ReservoirDetailMonitorPhoto.status,
          data: appData.ReservoirDetailMonitorPhoto.data,
          msg:  appData.ReservoirDetailMonitorPhoto.msg
        });
      })
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
