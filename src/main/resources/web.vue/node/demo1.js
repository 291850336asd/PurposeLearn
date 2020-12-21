const env = process.env.NODE_ENV || 'dev';
if(env === 'dev'){
    console.log("开发环境");
} else {
    console.log("生产环境");
}



const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello world')
});


server.listen(port, hostname, () => {
    console.log(`服务器运行在 http://${hostname}:${port}/`);
});