//执行webapack构建的入口
// 1.拿到webpack.config.js 配置
const options = require('./weboack.config.js');
const webpack = require('./lib/webpack.js');
new webpack(options).run();