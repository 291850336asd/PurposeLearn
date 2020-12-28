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

app.use((req, res, next)=>{
   const {
       ALLOW_ORIGIN,ALLOW_METHODS,HEADERS,CREDENTIALS
   }  = config.CROS;
   res.header("Access-Control-Allow-Origin", ALLOW_ORIGIN);
   res.header("Access-Control-Allow-Credentials", CREDENTIALS);
   res.header("Access-Control-Allow-Headers", HEADERS);
   res.header("Access-Control-Allow-Methods", ALLOW_METHODS);
   //options 浏览器默认发送的试探性请求
   req.method === "OPTIONS" ? res.send("CURRENT SERVICES SUPPORT CROSS DOMAIN REQUESTS OK") : next();
});
// application/x-www-form-urlencoded parser  把x-www-form-urlencoded 变为对象键值对，储存到req.body上
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressSession(config.SESSION));

/**
 * api
 * route
 */
app.use("/user", require('./routers/user'));
app.use("/product", require('./routers/product'));


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