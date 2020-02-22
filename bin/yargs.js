#!/usr/bin/env node

class Yargs {
  constructor (yargs) {
    this.yargs = yargs
  }
  init () {
    this.helpInfo()
    this.othersInfo()
  }
  helpInfo () {
    this.yargs
    .example('vipcli --dev', '启动dev-serverr')
    .version('v').alias('v', 'version')
    .help('h').alias('h', 'help')
  }
  othersInfo () {
    this.yargs.options('d', {
      alias: 'dev',
      describe: '启动webpack-dev-server',
      boolean: false
    })
    this.yargs.options('b', {
      alias: 'build',
      describe: '非线上环境打包',
      boolean: false
    })
    this.yargs.options('o', {
      alias: 'online',
      describe: '正式环境打包',
      boolean: false
    })
    this.yargs.options('r', {
      alias: 'report',
      describe: '生成代码报告',
      boolean: false
    })
    this.yargs.options('dll', {
      describe: '生成dll文件 用于提取项目',
      boolean: false
    })
  }
}

module.exports = Yargs