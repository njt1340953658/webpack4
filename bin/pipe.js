#!/usr/bin/env node
const path = require('path')
const root = path.dirname(__dirname)
const buildConfigPath = path.join(root, 'lib/build.js')
const devWebpackConfigPath = path.join(root, 'lib/webpack.dev.conf.js')
const dllWebpackConfigPath = path.join(root, 'lib/webpack.dll.conf.js')

function isDev(argvs) {
  if (argvs['dev']) {
    return `webpack-dev-server --color --open 'Google Chrome' --inline --config ${devWebpackConfigPath}`
  } else {
    return isBuild(argvs)
  }
}
function isBuild(argvs) {
  if (argvs['build']) {
    return `node ${buildConfigPath} build`
  } else {
    return isOnline(argvs)
  }
}
function isOnline(argvs) {
  if (argvs['online']) {
    return `node ${buildConfigPath} online`
  } else {
    return isDll(argvs)
  }
}

function isDll (argvs) {
  if (argvs['dll']) {
    return `webpack --config ${dllWebpackConfigPath}`
  } else {
    return isReport(argvs)
  }
}

function isReport (argvs) {
  if (argvs['report']) {
    return `npm_config_report=true node ${buildConfigPath} online`
  } else {
    return null
  }
}

class Pipe {
  constructor (argvs = []) {
    this.argvs = argvs
  }
  shell () {
    return isDev(this.argvs)
  }
}

module.exports = Pipe