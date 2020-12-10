const baseconfig = require('./webpack.base');
const { merge } = require('webpack-merge');
const path = require('path');
const API = require('../mockapi/index');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = merge(baseconfig, {
    devtool:"source-map", //有助于调试
    devServer: {
        port: 9000,
        // open: true,
        contentBase:[ path.resolve(__dirname, "../public"), 'dist'],
        before: API.before,
        proxy: {
            // '/api': 'http://www.baidu.com'
            '/api': {
                target: 'https://www.jd.com/',
                changeOrigin:true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    plugins:[
        new HtmlWebpackPlugin({
            title: '首页',
            // Load a custom template (lodash by default)
            template: './index.html',
            filename:'web.vue.demo.index.html',
            chunks:['web.vue.demo.index','common']
            // hash: true,
            // minify: true  //压缩
        }),
        new HtmlWebpackPlugin({
            title: '首页2',
            template: './indexSecond.html',
            filename:'indexSecond.html',
            chunks:['indexSecond','common']
        })
    ]
})
