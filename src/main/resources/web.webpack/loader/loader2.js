/**
 *
 * @param source  上一个loader或者资源文件
 */
function loader(source) {
    console.log("loader2");
    return source;
}
loader.pitch = function(){
    console.log("loader2-pitch")
    // return "aa";
}
module.exports = loader;