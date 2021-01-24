const fs = require("fs");
const path = require("path");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const { transformFromAst } = require("@babel/core");

module.exports = class webpack {
    constructor(options){
        // console.log(options);
        const { entry,output } = options;
        this.entry = entry;
        this.output = output;
        this.modules = [];
    }

    run(){
        //开始分析入口模块的内容
        const info = this.parse(this.entry);
        // console.log(info);
        //递归分析其他模块
        this.modules.push(info);
        this.modules.forEach(item=>{
            const { dependencies } = item;
            if(dependencies){
                for (let j in dependencies){
                    const deInfo = this.parse(dependencies[j]);
                     // console.log(deInfo);
                    this.modules.push(deInfo);

                }
            }

        })
        console.log( this.modules)
    }

    parse(entryFile){
        // 开始分析入口文件的内容
        const content = fs.readFileSync(entryFile, "utf-8");
        // console.log(content);
        // 抽象语法树
        var ast = parser.parse(content, {
            sourceType:"module"
        });
        // console.log(ast.program.bod
        // y);
        const dependencies = {};
        traverse(ast, {
            ImportDeclaration({node}) {
                const newPathName = "./" + path.join(path.dirname(entryFile),node.source.value);
                dependencies[node.source.value] = newPathName;
            }
        });
        const  { code } = transformFromAst(ast,null, {
            presets:["@babel/preset-env"]
        })
       return {
            entryFile,dependencies, code
       };
    }
}