module.exports = {
    PORT: 9000,
    CROS:{
        // ALLOW_ORIGIN: 'http://127.0.0.1:3000',//一旦设置*则不能携带cookie
        ALLOW_ORIGIN: '*',
        ALLOW_METHODS:'PUT,POST,GET,DELETE,OPTIONS,HEAD',
        HEADERS:'Content-Type,Content-Length,Authorization,Accept,X-Request-With',
        CREDENTIALS:true
    },
    SESSION:{
        secret:'ZFPX',//加密的秘钥
        saveUninitialized: false,
        resave: false,
        cookie:{
            maxAge: 1000 * 60 * 60
        }
    }

}
