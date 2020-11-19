$(function () {
    let box = $('.box');
    var boundingClientRect = box.getBoundingClientRect(); //距离当前视口的距离

    const down = function down(ev) {
    };
    const up = function up(ev) {

    };

    box.addEventListener('mousedown', down);
    box.addEventListener('mousedup', down);
});