let a = require("./a.js");
let {b} = require("./b.js");
console.log(a);
console.log(b);


let xhr = new XMLHttpRequest();

xhr.load = ()=>{
    console.log(xhr.request);
}
xhr.open('get','/api/index.html');
xhr.send();