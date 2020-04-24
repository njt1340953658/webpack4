##### webpack4
> webpack4脚手架配置中心

##### 使用
```js
const path = require('path')

module.exports = {
  package: {
    assetsPublicPath: '/patch/', // 打包后的目录地址
    onlineAssetsPublicPath: '//s/', // 正式环境打包后的目录地址
    assetsPublicPathDll: '/dll/', // dll打包地址
    autoTutor: '/patch/', // 自动化路由
    openPage: '/patch/', // 自动打开页面
    assetsSubDirectory: 'static',
    index: path.join(process.cwd(), 'dist/index.html'),
    assetsRoot: path.join(process.cwd(), 'dist'), // 打包后的地址
  }
}
```
