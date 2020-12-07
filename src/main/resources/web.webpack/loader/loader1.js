/**
 *
 * @param source  上一个loader或者资源文件
 */
function loader(source) {
    console.log('loader1');
    return source;
}

// pitch有返回值可以中断执行
loader.pitch = function(){
    console.log("loader1-pitch")
    // return "aa";
}
module.exports = loader;