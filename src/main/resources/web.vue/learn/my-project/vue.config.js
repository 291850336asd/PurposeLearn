const path = require('path')
const SkeletonWebpackPlugin = require('vue-skeleton-webpack-plugin')
module.exports = {
    configureWebpack: (config) => {
        config.plugins.push(new SkeletonWebpackPlugin({
            webpackConfig: {
                entry: {
                    app: path.join(__dirname, './src/Skeleton.js')
                }
            },
            minimize: true,
            quiet: true,
            router: {
                mode: 'hash',
                routes: [
                    { path: '/', skeletonId: 'listSkeleton' },
                    { path: /^\/detail/i, skeletonId: 'detailSkeleton' }
                ]
            }
        }));
        // Object.assign(config.resolve, {
        //     alias: {
        //         '@': path.resolve(__dirname, './src'),
        //         '@assets': path.resolve(__dirname, './src/assets'),
        //         '@common': path.resolve(__dirname, './src/common'),
        //         '@components': path.resolve(__dirname, './src/components'),
        //         '@network': path.resolve(__dirname, './src/network'),
        //         '@configs': path.resolve(__dirname, './src/configs'),
        //         '@views': path.resolve(__dirname, './src/views'),
        //         '@plugins': path.resolve(__dirname, './src/plugins'),
        //     }
        // })
    }
}
