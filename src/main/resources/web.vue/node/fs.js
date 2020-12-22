const fs = require('fs');
const path = require('path');
const fsPromise = fs.promises;
let text = fs.readFileSync('./node', 'utf-8');
console.log('readFileSync',text)


let text = fs.readFileSync(`${ __dirname }/node`, 'utf-8');
console.log('readFileSync',text)
console.log(__dirname)  ;// 绝对路径


console.log(path.resolve()); // node命令执行目录


fs.readFile('./node1', 'utf-8',(err, data) => {
    if (err) {
        console.log('log', err);
        console.dir('dir', err)
        return;
    }
    console.log('readFile', data);
});

fsPromise.readFile('./node', 'utf-8').then((result) =>{
    console.log(resullt)
}).catch(err => {
    console.log(err)
})




function readFile(pathName, encoding='utf-8') {
    return new Promise((resolve, reject)=>{
        pathName = path.resolve(pathName);
        fs.readFile(pathName, encoding, function (err, data) {
            if(err){
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}


fs.writeFile('./node', 'Node.js 中文网', (err) => {
    if (err) throw err;
    console.log('文件已保存！');
});

fs.appendFile('./node', 'data to append', (err) => {
    if (err) throw err;
    console.log('The "data to append" was appended to file!');
});


function writeFile(pathName,data,  encoding='utf-8') {
    return new Promise((resolve, reject)=>{
        pathName = path.resolve(pathName);
        if(typeof data !== 'string'){
            data = JSON.stringify(data);
        }
        fs.writeFile(pathName,data,  encoding, function (err) {
            if(err){
                reject("ok")
            } else {
                resolve(err)
            }
        })
    })
}