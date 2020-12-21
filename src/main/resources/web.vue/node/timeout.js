console.log(0);

setTimeout(()=> {
    console.log(1);
}, 100);

setTimeout(()=> {
    console.log(1);
}, 0); // 不会立即执行，也需要等待5ms

setImmediate(()=>{
    console.log(3);
}); // 和settimeout(0)效果类似，但是先先执行setTimeout（0-5），  放置到event queue的最顶部，执行完主任务队列，首先执行它

setTimeout(()=> {
    console.log(6);
}, 0); // 不会立即执行，也需要等待5ms

process.nextTick(()=>{
    console.log(4);
});

console.log(5);

// 0  5  4  1  6  3  1






