const os = require('os')
const webpack = require('webpack')
const utils = require('./utils')
const config = require('../config')
const HappyPack = require('happypack')
const vueLoaderConfig = require('./vue-loader.conf')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const happyThreadPool = HappyPack.ThreadPool({
  size: os.cpus().length
})

module.exports = {
  entry: {
    app: utils.fileFind([
      utils.resolve('src/main.js'),
      utils.resolve('src/main.ts')
    ])
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production' ?
      config.build.assetsPublicPath : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': utils.resolve('src')
    }
  },
  performance: {
    maxEntrypointSize: 2.5 * 1024 * 1024,
    maxAssetSize: 3 * 1024 * 1024
  },
  module: {
    rules: [{
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      }, {
        test: /\.(ts|tsx)?$/,
        use: ['happypack/loader?id=happyBable', {
          loader: 'ts-loader',
          options: {
            context: utils.resolve(),
            configFile: utils.cwd('tsconfig.json'),
            appendTsSuffixTo: [/\.vue$/], //为script有lang='ts'标识的脚本文件添加ts后缀
          }
        }],
        exclude: /node_modules\/(?!module-[^\s]+)/,
      },
      {
        test: /\.js$/,
        loader: 'happypack/loader?id=happyBable',
        exclude: /node_modules\/(?!module-[^\s]+)/,
        include: [
          utils.resolve('src'),
          utils.resolve('node_modules/webpack-dev-server/client'),
          /module-[^\s]+/i
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.DllReferencePlugin({
      context: utils.resolve('static/js'),
      manifest: utils.resolve('static/js/vendor.manifest.json')
    }),
    new HappyPack({
      id: 'happyBable',
      loaders: [{
        loader: 'babel-loader',
        options: {
          configFile: utils.cwd('babel.config.js')
        }
      }],
      threadPool: happyThreadPool,
      verbose: true
    })
  ]
}