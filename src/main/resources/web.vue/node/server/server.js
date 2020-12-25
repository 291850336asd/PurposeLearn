const http = require('http');
const url = require('url');
const fsPromise = require('fs').promises;
const path = require('path');
const mime = require('mime');
const qs = require('qs');
let { listInfos } =  require('./data/list')
const hostname = '127.0.0.1';
const port = 3000;
const server = http.createServer((req, res) => {
    console.log(req.url);
    let { pathname,
        //? 问号传参
        query } = url.parse(req.url, true);

    //静态文件
    pathname = pathname === '/' ? '/index.html' : pathname;
    const suffixReg = /\.([0-9A-Z]+)/i;
    const suffix = suffixReg.test(pathname) ? suffixReg.exec(pathname)[1] : null;
    let resultData = null;
    let contentType = null;
    let codeStatus = 200;
    if(suffix){
        var coding = 'utf-8'; //如果未指定字符编码，则返回原始的 buffer。
        if(/^(JPG|JEPG|GIF|PNG|WAMP|ICO|SVG|MP4|MP4)$/i.test(suffix)){
            coding = null;
        }

        fsPromise.readFile(`./static${ pathname }`, coding).then((result) =>{
            resultData = result;
            res.writeHead(codeStatus, {
                'content-type': mime.getType(suffix)
            });
            res.end(resultData)
        }).catch(err => {
            contentType = 'application/json';
            codeStatus = 404;
            resultData = JSON.stringify({...err, msg:`not foud ${pathname}`});
            res.writeHead(codeStatus, {
                'content-type': contentType
            });
            res.end(resultData)
        });
    } else {
        // api 接口
        contentType = 'application/json';
        res.writeHead(codeStatus, {
            'content-type': contentType
        });
        var method = req.method.toUpperCase();;
        if(pathname === '/api/list' && method === 'GET'){
            var listData = listInfos;
            let { page = 1, size=5 } = query;

            resultData = JSON.stringify(listData.slice((page-1)*size, page*size));
            res.end(resultData)
            return
        }
        if(pathname === '/api/add' && method === 'POST'){
            //获取请求主体中的信息
            let textInfo = '';
            req.on('data', chunk => {
                textInfo += chunk;
            });
            req.on('end', () => {
                let dataObj = qs.parse(textInfo);
                let {id, name} = dataObj;
                listInfos.splice(0,0,{id:id, name:name });
                resultData = JSON.stringify(listInfos);
                res.writeHead(codeStatus, {
                    'content-type': contentType
                });
                res.end(resultData)
            })

            return;
        }

        codeStatus = 404;
        resultData = JSON.stringify({msg:`api not foud ${pathname}, method ${method}`});
        res.writeHead(codeStatus, {
            'content-type': contentType
        });
        res.end(resultData)
    }


});


server.listen(port, hostname, () => {
    console.log(`服务器运行在 http://${hostname}:${port}/`);
});