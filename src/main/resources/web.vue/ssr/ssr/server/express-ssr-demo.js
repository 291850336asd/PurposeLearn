const express = require('express');
const fs = require('fs');
const path = require('path');
const server = express();
const Vue = require('vue');

//获取渲染实例
const { createRenderer } = require("vue-server-renderer");
const render = createRenderer({});


//处理favicon
const favicon = require('serve-favicon');
server.use(favicon('../public/favicon.ico'))
server.get('*', (req, res) => {
    const template = req.url.substr(1) || 'index';
    // console.log( req.url,template)
    // 加载模板
    const buffer = fs.readFileSync(path.resolve(__dirname, '../public/' + template + '.html'));

   const app = new Vue({
       // template:"<div @click='onClick'> {{msg}} </div>",  //无法交互
       template: buffer.toString(),  //无法交互
       data(){
           return {
             msg: "vue ssr"
           };
       },
       methods:{
           onClick(){
               console.log('do something');
           }
       }
   });
   render.renderToString(app).then(html =>{
       res.send(html);
   }).catch(err => {
       res.status(500);
       res.send('Internal Server Error, 500!');
   })
});

server.listen(3000, ()=> {
    console.log('server start on port 3000');
})