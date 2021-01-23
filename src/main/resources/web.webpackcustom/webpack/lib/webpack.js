const fs = require("fs");
const path = require("path");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
module.exports = class webpack {
    constructor(options){
        // console.log(options);
        const { entry,output } = options;
        this.entry = entry;
        this.output = output;
    }

    run(){
        this.parse(this.entry);
    }

    parse(entryFile){
        // 开始分析入口文件的内容
        const content = fs.readFileSync(entryFile, "utf-8");
        console.log(content);
        // 抽象语法树
        var ast = parser.parse(content, {
            sourceType:"module"
        });
        // console.log(ast.program.bod
        // y);
        traverse(ast, {
            ImportDeclaration({node}) {
                console.log(path.join(path.dirname(entryFile),node.source.value));
            }
        });
    }
}