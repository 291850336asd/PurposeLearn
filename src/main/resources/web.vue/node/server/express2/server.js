const express = require('express');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const fsPromise = require('fs').promises;
const config = require('./config');
const app = express();
app.listen(config.PORT, _ => {
    console.log(`server is create port ${config.PORT}`)
});

/**
 * 中间件  在处理请求前统一处理的事情
 *
 * app.use
 */
// application/x-www-form-urlencoded parser  把x-www-form-urlencoded 变为对象键值对，储存到req.body上
app.use(bodyParser.urlencoded({ extended: false }));


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