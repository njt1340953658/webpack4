const ip = require('ip')
const path = require('path')
const fs = require('fs')
const yargs = require('yargs');
const config = require('../config')
const notifier = require('node-notifier')
const merge = require('webpack-merge')
const portfinder = require('portfinder')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const packageConfig = require(path.join(process.cwd(), 'package.json'))

// 返回项目根目录
const resolve = (dir = '') => {
  return path.join(process.cwd(), dir)
}

// vipcli根目录
const cwd = (dir = '') => {
  let root = path.dirname(__dirname)
  return path.join(root, dir)
}

// 文件存在
const existFile = (file) => {
  return fs.existsSync(file)
}

// 发现存在的文件
const fileFind = (files = []) => {
  return files.find(file => existFile(file))
}

// argv
const argv = () => {
  return yargs.argv['_'].find(arg => Object.keys(config).includes(arg))
}

// 处理url-loader 文件路径问题
const assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production' ?
    config.build.assetsSubDirectory :
    config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}

// 启动消息提示
const createNotifierCallback = () => {
  return (severity, errors) => {
    if (severity === 'error') {
      const error = errors[0]
      const filename = error.file && error.file.split('!').pop()
      notifier.notify({
        title: packageConfig.name,
        message: severity + ': ' + error.name,
        subtitle: filename || '',
        icon: path.join(__dirname, 'logo.png'),
        sound: true
      })
    } else {
      return false
    }
  }
}

// 用于处理端口重复问题
const addPort = (webpackConfig) => new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      webpackConfig['plugins'].push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`当前项目地址IP和端口号：http://${ip.address()}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors ?
          createNotifierCallback() : undefined
      }))
      // 处理端口冲突
      resolve(merge(webpackConfig, {
        devServer: {
          port
        }
      }))
    }
  })
})

module.exports = {
  resolve,
  cwd,
  argv,
  assetsPath,
  createNotifierCallback,
  addPort,
  existFile,
  fileFind
}