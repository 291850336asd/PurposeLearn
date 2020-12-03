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

let xhr3 = new XMLHttpRequest();

xhr3.load = ()=>{
    console.log(xhr.request);
}
xhr3.open('get','/api/aa');
xhr3.send();

let xhr2 = new XMLHttpRequest();

xhr2.load = ()=>{
    console.log(xhr.request);
}
xhr2.open('post','/api/aa');
xhr2.send();