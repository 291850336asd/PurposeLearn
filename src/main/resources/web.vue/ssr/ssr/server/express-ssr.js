const express = require('express');
const fs = require('fs');
const path = require('path');
const server = express();

function resolve(dir) {
    return path.resolve(__dirname, dir);
}

//获取渲染实例
const { createBundleRenderer } = require("vue-server-renderer");
const bundleServer = require(resolve("../dist/server/vue-ssr-server-bundle.json"));
const template = fs.readFileSync(resolve("../public/index.html"), "utf-8");
const clientManifest = require(resolve("../dist/client/vue-ssr-client-manifest.json"));

const render = createBundleRenderer(bundleServer,{
    runInNewContext: false,
    template: template,
    clientManifest: clientManifest
});


//处理favicon
const favicon = require('serve-favicon');
server.use(favicon('../public/favicon.ico'));


/**
 * 静态资源文件的处理
 */
server.use(express.static('../dist/client', { index: false }));

server.get('*',async (req, res) => {
    console.log(req.url)
   const context = {
       title:"ssr test",
       url:req.url
   }
   try{
       const html = await render.renderToString(context);
       res.send(html)
   }catch (err){
       res.status(500).send('服务器异常：' + err.toString());
   }
});

server.listen(3000, ()=> {
    console.log('server start on port 3000');
})