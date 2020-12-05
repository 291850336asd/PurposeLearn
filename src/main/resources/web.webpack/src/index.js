let a = require("./a.js");
let {b} = require("./b.js");
import './css/htmlcss.css'
console.log(a.default);
console.log(b);
console.log(BASE_URL)
console.log(OPTIONS.name)
import './css/2.less'

import imgClose from '../public/close.png'
let img = new Image();
img.src = imgClose;
document.body.appendChild(img);
let xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
    // xhr.readyState  AJAX状态 0~4
    // xhr.status  xhr.statusText  服务器返回的网络状态码  2/3/4/5
    /* if (xhr.readyState === 4 && xhr.status === 200) {
        console.log(xhr.responseText);
    } */
    if (xhr.status === 200) {
        let n = xhr.readyState;
        if (n === 2) {
            console.log("响应头信息先回来", xhr.getAllResponseHeaders());
        }
        if (n === 4) {
            console.log("响应主体信息回来", xhr.responseText);
        }
    }
};
xhr.open('get','/api/index.html');
xhr.send();

let xhr3 = new XMLHttpRequest();

xhr3.onreadystatechange = function () {
    // xhr.readyState  AJAX状态 0~4
    // xhr.status  xhr.statusText  服务器返回的网络状态码  2/3/4/5
    /* if (xhr.readyState === 4 && xhr.status === 200) {
        console.log(xhr.responseText);
    } */
    if (xhr3.status === 200) {
        let n = xhr3.readyState;
        if (n === 2) {
            console.log("响应头信息先回来", xhr3.getAllResponseHeaders());
        }
        if (n === 4) {
            console.log("响应主体信息回来", xhr3.responseText);
        }
    }
};
xhr3.open('get','/api/aa');
xhr3.send();

let xhr2 = new XMLHttpRequest();

xhr2.onreadystatechange = function () {
    // xhr.readyState  AJAX状态 0~4
    // xhr.status  xhr.statusText  服务器返回的网络状态码  2/3/4/5
    /* if (xhr.readyState === 4 && xhr.status === 200) {
        console.log(xhr.responseText);
    } */
    if (xhr2.status === 200) {
        let n = xhr2.readyState;
        if (n === 2) {
            console.log("响应头信息先回来", xhr2.getAllResponseHeaders());
        }
        if (n === 4) {
            console.log("响应主体信息回来", xhr2.responseText);
        }
    }
};
xhr2.open('post','/api/aa');
xhr2.send();