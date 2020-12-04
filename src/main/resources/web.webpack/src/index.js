let a = require("./a.js");
let {b} = require("./b.js");
import './css/htmlcss.css'
console.log(a);
console.log(b);

import './css/2.less'

import imgClose from '../public/close.png'
let img = new Image();
img.src = imgClose;
document.body.appendChild(img);
let xhr = new XMLHttpRequest();

xhr.load = ()=>{
}
xhr.open('get','/api/index.html');
xhr.send();

let xhr3 = new XMLHttpRequest();

xhr3.load = ()=>{
}
xhr3.open('get','/api/aa');
xhr3.send();

let xhr2 = new XMLHttpRequest();

xhr2.load = ()=>{
}
xhr2.open('post','/api/aa');
xhr2.send();