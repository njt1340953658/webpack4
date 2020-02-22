const path = require('path')

module.exports = {
  index: path.join(process.cwd(), 'output/index.html'),
  assetsRoot: path.join(process.cwd(), 'output'), // 打包后的地址
  assetsSubDirectory: 'fe-static', // 静态目录拷贝出的存放地址
  assetsPublicPath: '/path/', // 打包后的目录地址
  onlineAssetsPublicPath: '//online-patch', // 正式环境打包后的目录地址
  assetsPublicPathDll: '/path/', // dll打包地址
  autoTutor: '/path/',
  openPage: 'path',
  proxyTable: {}
}