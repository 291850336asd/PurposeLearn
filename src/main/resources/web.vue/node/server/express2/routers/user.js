const express = require('express');
let {listInfos} = require('../../data/list');
const route = express.Router();



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