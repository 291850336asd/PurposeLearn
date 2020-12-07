// 这是webpack默认读取的配置文件
const path = require('path');  // node默认自带
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');//可以把import的css文件单独生成一个css文件然后引入
// const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); //压缩css  方式1
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin'); //压缩css  方式2
const TerserPlugin = require('terser-webpack-plugin');  //js压缩
const FilePlugin = require('../plugin/FilePlugin');// 自定义记录打包文件大小插件
module.exports = {
    // 这个对象里面都是webpack的配置项
    // https://www.webpackjs.com/configuration/
    mode: 'development', // 控制环境 development 默认 production
    entry: {  // 默认值为 ./src/index.js    来指定一个入口起点（或多个入口起点）。
        index: './src/index.js',
        indexSecond: './src/indexSecond.js',
        common: './src/common.js'
    },
    output: {
        // output 属性告诉 webpack 在哪里输出它所创建的 bundles，以及如何命名这些文件，默认值为 ./dist,  基本上，整个应用程序结构，都会被编译到你指定的输出路径的文件夹中
        path: path.resolve(__dirname, '../dist'),  //需要配置绝对路径
        filename: '[name].[hash:5].js'
    },
    plugins: [
        new webpack.DllReferencePlugin({
            manifest: path.resolve(__dirname, '../dist/manifest.json'),
            //在打包编译的时候，先去manifest中查看有没有这个包，若有则直接跳过，不再打包
        }),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns:['**/*', "!dll_*", "!manifest*"]
        }),
        // new OptimizeCssAssetsPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name][hash:5].css'
        }),
        new webpack.ProvidePlugin({ //自动加载模块，而不必到处 import 或 require
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new webpack.DefinePlugin({  // 全局常量
            BASE_URL: '"xxxx"', // xxxx字符串
            BASE_URL2: 'xxxx', // xxxx变量
            BASE_URL3:  JSON.stringify("xxxx"), // xxxx字符串
            TWO: "1+1",// 2
            OPTIONS: {
                name: JSON.stringify("name")
            }
        }),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/), // 打包时忽略指定的文件 减少打包文件的体积
        new FilePlugin({fileName: 'fileStatistics.txt'}) //文件统计大小插件
    ],
    resolveLoader:{
        modules: [ path.resolve(__dirname,"../node_modules"), path.resolve(__dirname,"../loader")]
        // alias: {
        //     loader1: path.resolve(__dirname,"../loader", "loader1.js"),
        //     loader2: path.resolve(__dirname,"../loader", "loader2.js"),
        //     loader3: path.resolve(__dirname,"../loader", "loader3.js"),
        // }
    },
    module: {
        noParse: /jquery|lodash/, // 明确告诉webpack这俩包不依赖任何其他包，可以提高构建性能
        rules: [ // 从下往上，从右到左 加载
            // {
            //     test: /\.css$/,
            //     //css-loader把css转成js语法，style-loader把css转成的js语法，插入到页面中
            //     //loader加载顺讯从右到左
            //     use: ['style-loader', 'css-loader']
            // }
            {
                test: /\.css$/,
                // css兼容性处理  写法一
                // postcss-loader 安装postcss-loader postcss
                // 配置 src/postcss.config.js src/  需要安装postcss-preset-env
                //.browserslistrc 设置浏览器兼容版本
                // use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
                // css兼容性处理  写法二
                // .browserslistrc 设置浏览器兼容版本
                use: [MiniCssExtractPlugin.loader, 'css-loader', {
                    loader: 'postcss-loader',
                    options: {
                        postcssOptions: {
                            plugins: [
                                [
                                    "postcss-preset-env",
                                    {
                                        // Options
                                    },
                                ],
                            ],
                        }
                    }
                }]
            },
            {
                test: /\.less$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader', 'postcss-loader']
            },
            {
                test: /\.(png|jpg|jpeg|gif|jfif|icon)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: 'img/[name].[ext]', //不设置自动在dist生成名字
                            limit: 8192
                            //url-loader 功能类似于 file-loader，但是在文件大小（单位 byte）低于指定的限制时，可以返回一个 DataURL。
                            //当图片大小小于limit时，则直接base64  减少服务器请求
                            //当图片大小大于limit时，url-loader将启动file-loader插件，返回图片路径
                            //limit可以设置成false,全部返回图片路径
                        }
                    }
                ]
            },
            {
                test: /\.(js)$/,
                exclude: /(node_modules|bower_components)/,
                use: ["thread-loader",{
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [
                           [
                               '@babel/plugin-proposal-class-properties',
                               {'loose':true}
                           ],
                           [
                               '@babel/plugin-transform-runtime',
                               { corejs: 3 }
                            ]
                        ]
                    }
                }]
            },
            // {
            //     test: /\index.(js)$/,
            //     use:{
            //         loader: 'loader1'
            //     },
            //     enforce:"pre" // 设置加载顺序  https://webpack.js.org/configuration/module/#ruleenforce
            // },
            // {
            //     test: /\index.(js)$/,
            //     use:{
            //         loader: 'loader2'
            //     }
            // },
            // {
            //     test: /\index.(js)$/,
            //     use:{
            //         loader: 'loader3'
            //     },
            //     enforce:"post"
            // },
            // {
            //     test: /3\.less$/,
            //     use:[
            //            { loader: 'customstyleloader' },
            //            { loader: 'customlessloader' }
            //         ]
            // }
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin(), //css压缩
            // new TerserPlugin({    // js压缩
            //     parallel: true,
            // })
        ],
        splitChunks:{  //分包的配置    https://webpack.js.org/plugins/split-chunks-plugin/#optimizationsplitchunks
            chunks: "all", // 引入方式
            minSize: 20000,
            minChunks: 1, // 最少被使用的次数
            // maxAsyncRequests: 5,
            // maxInitialRequests: 3,
            // automaticNameDelimiter: '~',
            // name: true,
            cacheGroups: {
                //緩存組，符合這些条件的包后续走这个缓存
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                jquery: {
                    test: /jquery/,
                    filename:'[name][hash:5].js',
                    chunks:'initial'
                },
                moment: {
                    test: /moment/,
                    filename:'[name][hash:5].js',
                    chunks:'initial'
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
    },
    externals: {
        jquery: 'jQuery'
    },
    resolve: {
        extensions: [".js", ".json",".vue", ".css"],   //自动解析确定的扩展。默认值为：[".js", ".json"]
        alias:{ // 加快查找速度
            '@utils' : path.resolve(__dirname, '../src/utils')
        },
        modules: [ path.resolve(__dirname,"../node_modules")] //引入模块默认查找位置
        // modules: [path.resolve(__dirname, "src"), "node_modules"] 如果你想要添加一个目录到模块搜索目录，此目录优先于 node_modules
    }
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
