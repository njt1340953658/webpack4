const Config = require('./config/config.js')

const config = new Config()

module.exports = config.getPostCss()