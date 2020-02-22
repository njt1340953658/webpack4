#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const defaultConfig = require('./default.js')
const file = path.join(process.cwd(), 'vip.config.js')
const configInfo = fs.existsSync(file) ? require(file) : {}

class Config {
  constructor() {
    if (this.isObjectEmpty(configInfo)) {
      // 走覆盖配置 未来可能会加上针对字段替换和add
      this.config = Object.assign(defaultConfig, {
        postcss: configInfo.postcss || defaultConfig.postcss,
        package: {
          ...defaultConfig.package,
          ...configInfo.package
        }
      })
    } else {
      // 走默认配置
      this.config = defaultConfig
    }
  }
  getConfig() {
    return this.config
  }
  getPostCss() {
    return this.config['postcss']
  }
  getBabel() {
    return this.config['babel']
  }
  getPackage() {
    return this.config['package']
  }
  getTsconfig() {
    return this.config['tsconfig']
  }
  isObjectEmpty(obj) {
    return Boolean(Object.keys(obj).length)
  }
}

module.exports = Config