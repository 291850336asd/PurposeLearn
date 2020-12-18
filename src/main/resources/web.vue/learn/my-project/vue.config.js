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
        }))
    }
}
