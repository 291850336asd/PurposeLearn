//    https://developer.mozilla.org/zh-CN/docs/Web/API/Document/dragstart_event 这种貌似很少用
// mouseenter move更常用
$(function () {
    let box = document.querySelector(".box");
    var boundingClientRect = box.getBoundingClientRect(); //距离当前视口的距离

    //解决鼠标焦点丢失问题  把盒子和鼠标绑定在一起
    // IE /火狐   setCapture   releaseCapture
    // 谷歌  鼠标快速移动时都在网页中  setPointerCapture并且兼容IE/火狐
    //默认把事件放到盒子上导致快速移动焦点丢失

    const down = function down(ev) {
        //记录鼠标开始位置和盒子的开始位置，这些值会在鼠标移动的方法中使用（把信息存储在盒子自定义的属性上）
        let {top, left} = this.getBoundingClientRect();
        this.startTop = top;
        this.startLeft = left;
        this.startClientX = ev.clientX;
        this.startClientY = ev.clientY;
        this.moveWindow = move.bind(this);
        this.upWindow = up.bind(this);
        window.addEventListener('mousemove', this.moveWindow);
        window.addEventListener('mouseup', this.upWindow);
    };
    const move = function up(ev) {
        let curL = ev.clientX - this.startClientX + this.startLeft;
        let curT = ev.clientY - this.startClientY + this.startTop;
        this.style.left = `${curL}px`;
        this.style.top = `${curT}px`;
    };
    const up = function up(ev) {
        window.removeEventListener('mousemove', this.moveWindow);
        window.removeEventListener('mouseup', this.upWindow);
    };



    box.addEventListener('mousedown', down);




});


// $(function () {
//     let box = document.querySelector(".box");
//     var boundingClientRect = box.getBoundingClientRect(); //距离当前视口的距离
//
//     //解决鼠标焦点丢失问题  把盒子和鼠标绑定在一起
//     // IE /火狐   setCapture   releaseCapture
//     // 谷歌  鼠标快速移动时都在网页中  setPointerCapture并且兼容IE/火狐
//     //默认把事件放到盒子上导致快速移动焦点丢失
//    https://developer.mozilla.org/zh-CN/docs/Web/API/Document/dragstart_event 这种貌似很少用
//     const down = function down(ev) {
//         //记录鼠标开始位置和盒子的开始位置，这些值会在鼠标移动的方法中使用（把信息存储在盒子自定义的属性上）
//         let {top, left} = this.getBoundingClientRect();
//         this.startTop = top;
//         this.startLeft = left;
//         this.startClientX = ev.clientX;
//         this.startClientY = ev.clientY;
//         this.addEventListener('mousemove', move);
//         this.addEventListener('mouseup', up);
//         console.log(ev.clientX);
//     };
//     const move = function up(ev) {
//         let curL = ev.clientX - this.startClientX + this.startLeft;
//         let curT = ev.clientY - this.startClientY + this.startTop;
//         this.style.left = `${curL}px`;
//         this.style.top = `${curT}px`;
//     };
//     const up = function up(ev) {
//         this.removeEventListener('mousemove', move);
//         this.removeEventListener('mouseup', up);
//     };
//
//
//     box.addEventListener('mousedown', down);
//
//
//
//
// });