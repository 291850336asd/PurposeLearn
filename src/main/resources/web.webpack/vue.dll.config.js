//这个配置文件就是把vue打包成一个单独文件
// 这个插件会生成一个名为 manifest.json 的文件，这个文件是用来让 DLLReferencePlugin 映射到相关的依赖上去的
let path = require('path');
let { CleanWebpackPlugin } = require('clean-webpack-plugin')
let webpack = require('webpack')

module.exports = {
    mode: 'production',
    entry: {
        vue: ['vue']
    },
    output:{
        filename: 'dll_[name].js',
        path: path.resolve(__dirname, 'dist'),
        library: 'dll_[name]'
    },
    plugins:[
        new CleanWebpackPlugin(),
        new webpack.DllPlugin({
            // // manifest缓存文件的请求上下文（默认为webpack执行环境上下文）
            // context: process.cwd(),
            name: 'dll_[name]', //需要跟ouput中的libarary一致
            // manifest.json文件的输出位置
            path: path.resolve(__dirname, 'dist', 'manifest.json'),
        })
    ]
}