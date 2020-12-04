const baseconfig = require('./webpack.base');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = merge(baseconfig, {
    mode: "production",
    plugins:[
        new HtmlWebpackPlugin({
            title: '首页',
            // Load a custom template (lodash by default)
            template: './index.html',
            filename:'index.html'
            // hash: true,
            // minify: true  //压缩
        }),
        new HtmlWebpackPlugin({
            title: '首页2',
            template: './indexSecond.html',
            filename:'indexSecond.html'
        })
    ]
})