const express = require('express');
let {listInfos} = require('../../data/list');
const route = express.Router();
const user = {id:1, name:'usertest',phone:'134xxxxxxxx'}
//登录
route.post('/login',(req, res)=> {
    let { account, password, yupe} = req.body;
    res.send(user);
});
//校验是否登录
route.get('/login',(req, res)=> {
    let { account, password, yupe} = req.body;
    res.send({id:1, name:'usertest',phone:'134xxxxxxxx'});
});
route.get("/list",(req, res) => {
    let { page = 1, size=5 } = req.query;
    res.send(listInfos.slice((page-1)*size, page*size));
});
route.post('/add',(req, res)=> {
    let { id, name} = req.body;
    listInfos.splice(0,0,{id:id, name:name });
    res.send(listInfos);
});
module.exports = route;