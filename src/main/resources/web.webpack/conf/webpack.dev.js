const baseconfig = require('./webpack.base');
const { merge } = require('webpack-merge');
const path = require('path');
const API = require('../mockapi/index');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = merge(baseconfig, {
    devServer: {
        port: 9000,
        // open: true,
        contentBase: path.resolve(__dirname, "../public"),
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
            filename:'index.html',
            chunks:['index','common']
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
