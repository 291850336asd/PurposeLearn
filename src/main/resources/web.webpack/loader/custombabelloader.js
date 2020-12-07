// https://www.webpackjs.com/api/loaders/
const babel = require('@babel/core')
const loaderUtils = require('loader-utils') // 专门用来处理loader的options的工具包

// 转换es6代码时通过babel.transform 进行转换，并且还需要把options下的@babel/preset-env预设参数加进去
function loader(source) {
    // this 是一个loaderContext对象,传进来的参数都放在this.query下
    const options = loaderUtils.getOptions(this);
    let cb = this.async();// 会把loader变成一个异步的loader，并产生一个异步回调
    cb.transform(source, { ...options,
        sourceMap: true,  // 开启源码映射
        filename:this.resourcePath  // 对应哪个自己编写的文件名
    }, function (err, result) {
        cb(err, result.code)
    })
}

module.exports = loader;