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
            filename:'web.vue.demo.index.html',
            chunks:['web.vue.demo.index', 'common']
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