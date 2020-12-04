// 这是webpack默认读取的配置文件
const path = require('path');  // node默认自带
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
    // 这个对象里面都是webpack的配置项
    // https://www.webpackjs.com/configuration/
    mode: 'development', // 控制环境 development 默认 production
    entry: {
        index: './src/index.js',
        indexSecond:'./src/indexSecond.js',
        common:'./src/common.js'
    },   // 默认值为 ./src/index.js    来指定一个入口起点（或多个入口起点）。
    output:{
        // output 属性告诉 webpack 在哪里输出它所创建的 bundles，以及如何命名这些文件，默认值为 ./dist,  基本上，整个应用程序结构，都会被编译到你指定的输出路径的文件夹中
        path: path.resolve(__dirname, '../dist'),  //需要配置绝对路径
        filename: '[name].[hash:5].js'
    },
    plugins:[
        new CleanWebpackPlugin()
    ]
};

//单入口
// module.exports = {
//     // 这个对象里面都是webpack的配置项
//     // https://www.webpackjs.com/configuration/
//     mode: 'development', // 控制环境 development 默认 production
//     entry:'./src/index.js',   // 默认值为 ./src/index.js    来指定一个入口起点（或多个入口起点）。
//     output:{
//         // output 属性告诉 webpack 在哪里输出它所创建的 bundles，以及如何命名这些文件，默认值为 ./dist,  基本上，整个应用程序结构，都会被编译到你指定的输出路径的文件夹中
//         path: path.resolve(__dirname, '../dist'),  //需要配置绝对路径
//         filename: 'main.[hash:5].js'
//     },
//     plugins:[
//         new CleanWebpackPlugin()
//     ]
// };
