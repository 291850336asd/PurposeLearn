const http = require('http');
const url = require('url');
const fsPromise = require('fs').promises;
const path = require('path');
const hostname = '127.0.0.1';
const port = 3000;
const server = http.createServer((req, res) => {
    console.log(req.url);
    let { pathname, query } = url.parse(req.url, true);

    //静态文件
    pathname = pathname === '/' ? '/index.html' : pathname;
    const suffixReg = /\.([0-9A-Z])/i;
    const suffix = suffixReg.test(pathname) ? suffixReg.exec(pathname)[1] : null;
    let resultData = null;
    let contentType = null;
    let codeStatus = 200;
    if(suffix){

        fsPromise.readFile(`./static${ pathname }`, 'utf-8').then((result) =>{
            contentType = 'text/plain';
            resultData = result;
        }).catch(err => {
            contentType = 'application/json';
            codeStatus = 404;
            resultData = JSON.stringify({...err, msg:`not foud ${pathname}`});
        });
    } else {
        // api 接口
        contentType = 'application/json';
    }

    res.statusCode = codeStatus;
    res.setHeader('Content-Type', contentType);
    res.end(resultData)
});


server.listen(port, hostname, () => {
    console.log(`服务器运行在 http://${hostname}:${port}/`);
});