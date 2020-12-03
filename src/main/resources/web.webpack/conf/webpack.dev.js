const baseconfig = require('./webpack.base');
const { merge } = require('webpack-merge');
const path = require('path');
const API = require('../mockapi/index');
module.exports = merge(baseconfig, {
    devServer: {
        port: 9000,
        open: true,
        contentBase: path.resolve(__dirname, "../public"),
        before: API.before,
        proxy: {
            // '/api': 'http://www.baidu.com'
            '/api': {
                target: 'https://www.jd.com',
                changeOrigin:true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
})
