const VueSSRServerPlugin = require("vue-server-renderer/server-plugin");
const VueSSRClientPlugin = require("vue-server-renderer/client-plugin");
const nodeExternals = require("webpack-node-externals");
const merge = require("lodash.merge");
//根据传入的环境变量决定入口文件或相应配置
const TARGET_NODE = process.env.WEBPACK_TARGET === 'node';
const target = TARGET_NODE ? "server" : "client";

module.exports = {
  css:{
    extract: false
  },
  outputDir: "./dist/" + target,
  configureWebpack: ()=> ({
    entry: `./src/entry-${target}.js`,
    devtool: 'source-map',
    //target 设置node使webpack以node适用的方法动态导入
    //并且还会在编译vue组件时告知‘vue-loader’输出面向服务的代码
    target: TARGET_NODE ? "node": "web",
    // 是否模拟node全局变量
    node: TARGET_NODE ? undefined: false,
    output:{
      //使用node风格导出模块
      libraryTarget: TARGET_NODE ? "commonjs2": undefined
    },
    // https://webpack.js.org/configuration/externals/#function
    //外置化应用程序依赖模块，可以是服务器侯建速度更快，并生成娇小的打包文件
    externals: TARGET_NODE ? nodeExternals({
        whitelist:[/\.css$/]
    }): undefined,
    optimization:{
      splitChunks: undefined
    },
    plugins:[
        TARGET_NODE ? new VueSSRServerPlugin() : new VueSSRClientPlugin()
    ]
  }),
  chainWebpack: config => {
    // cli4项目添加
    if(TARGET_NODE){
      config.optimization.delete('splitChunks')
    }
    config.module.rule("vue").use('vue-loader').tap(options=>{
      merge(options, {
        optimizeSSR: false
      });
    });
  }

}