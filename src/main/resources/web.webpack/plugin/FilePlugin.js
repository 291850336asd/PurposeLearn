/**
 * 记录编译后的所有文件的名字和大小
 *
 * 参数 filename
 */

class FilePlugin{
    constructor(options){
        this.filename = options.fileName;
    }

    apply(compiler){
        compiler.hooks.emit.tap('FilePlugin', (compilation) => {

            let assets = compilation.assets;
            let content = "# 文件名   文件大小";
            Object.entries(assets).forEach(([filename, fileObj]) => {
               content += ('\r\n -' + filename + "   " +fileObj.size() + 'b')
            });
            content += ('\r\n - 文件总数 ：' + Object.entries(assets).length)
            compilation.assets[this.filename] = {
                source(){
                    return content
                },
                size() {
                    return content.length;
                }
            };

        })
    }
}

module.exports = FilePlugin;