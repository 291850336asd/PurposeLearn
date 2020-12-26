const express = require('express');
const app = express();
const config = require('./config');
let {listInfos} = require('../data/list');
let bodyParser = require('body-parser')
app.listen(config.port, _ => {
    console.log(`server is create port ${config.port}`)
});


/**
 * 中间件  在处理请求前统一处理的事情
 *
 * app.use
 */
// application/x-www-form-urlencoded parser  把x-www-form-urlencoded 变为对象键值对，储存到req.body上
app.use(bodyParser.urlencoded({ extended: false }));


/*
 api
 */
app.get("/api/list",(req, res) => {
    let { page = 1, size=5 } = req.query;
    res.send(listInfos.slice((page-1)*size, page*size));
});

app.post('/api/add',(req, res)=> {
    let { id, name} = req.body;
    listInfos.splice(0,0,{id:id, name:name });
    res.send(listInfos);
});

/**
 * 静态资源文件的处理
 */
app.use(express.static('../static'));
app.use((req, res)=> {
    res.status(404).send({
        code: 404,
        msg:'not found'
    })
});