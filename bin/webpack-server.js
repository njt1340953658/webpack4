#!/usr/bin/env node

const yargs = require('yargs');
const shell = require('shelljs')
const Pipe = require('./pipe.js')
const Yargs = require('./yargs.js')

const yard = new Yargs(yargs)

yard.init()

const pipe = new Pipe(yargs.argv)

let status = shell.exec(pipe.shell())

if (status && status.code === 0) {
  void null
} else {
  shell.echo('命令出错, 退出进程')
  shell.exit(1)
}