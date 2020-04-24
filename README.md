##### webpack4
> webpack4脚手架配置中心

##### 使用
> 创建webpack4.config.js文件

```js
const path = require('path')

module.exports = {
  package: {
    assetsPublicPath: '/path/', // 打包后的目录地址
    onlineAssetsPublicPath: '//s/', // 正式环境打包后的目录地址
    assetsPublicPathDll: '/dll/', // dll打包地址
    autoTutor: '/path/', // 自动化路由
    openPage: '/path/', // 自动打开页面
    assetsSubDirectory: 'static',
    index: path.join(process.cwd(), 'dist/index.html'),
    assetsRoot: path.join(process.cwd(), 'dist'), // 打包后的地址
  }
}
```
> package.json配置
```js
{
  "name": "web-wetrunk-ts",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "webpack4 --dev",
    "dll": "webpack4 --dll",
    "build:test": "webpack4 --build",
    "build": "webpack4 --online",
    "build:report": "webpack4 --report"
  },
  "dependencies": {
  },
  "devDependencies": {
    "webpack4": "^1.0.0"
  },
  "browserslist": [
    "> 1%",
    "last 2 versions",
    "not ie <= 8"
  ]
}

```
