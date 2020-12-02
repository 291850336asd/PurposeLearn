const baseconfig = require('./webpack.base');
const { merge } = require('webpack-merge');
module.exports = merge(baseconfig, {
    mode: "production"
})