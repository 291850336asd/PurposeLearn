const express = require('express');
const route = express.Router();

route.get("/list",(req, res) => {
    let { page = 1, size=5 } = req.query;
    res.send({id:1,produceName:"p1"});
});
route.post('/add',(req, res)=> {
    let { id, name} = req.body;
    res.send(res.send({id:1,produceName:"p1"},{id:id, productName:name}));
});


module.exports = route;