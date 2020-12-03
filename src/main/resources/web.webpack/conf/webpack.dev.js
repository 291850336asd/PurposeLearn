const baseconfig = require('./webpack.base');
const { merge } = require('webpack-merge');
const path = require('path');
module.exports = merge(baseconfig, {
    devServer: {
        port: 9000,
        open: true,
        contentBase: path.resolve(__dirname, "../public"),
        proxy: {
            // '/api': 'http://www.baidu.com'
            '/api': {
                target: 'http://www.baidu.com',
                changeOrigin:true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
})
