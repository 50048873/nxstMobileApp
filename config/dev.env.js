'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
const API_HOST = require('./API_HOST')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_HOST: API_HOST.API_HOST_DEV
})
