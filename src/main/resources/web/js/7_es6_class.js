function Modal(x,y){
    this.x=x;
    this.y=y;
}
Modal.prototype.z=10;
Modal.prototype.getX=function(){
    console.log(this.x);
}
Modal.prototype.getY=function(){
    console.log(this.y);
}
Modal.n=200;
Modal.setNumber=function(n){
    this.n=n;
};
let m = new Model(10,20);
//.........改成ES6中class的写法.................................
// 改成ES6中class的写法
class Modal{
    // 构造函数
    constructor(x,y){
        this.x = x
        this.y = y
        this.n = 100
    }
    n = 100  // 等价于 在构造函数内的this.n = 100  ES7中支持的

    // 原型上的公共的方法
    getX() {}
    getY() {}
    // 这里无法添加原型上公共的属性，要提到外面单独写。

    // getY=function(){} 这样写 相当于加的是私有的方法。不在原型上
    // getY:()=>{} 原生不支持这样，但是在react中，可以基于babel-preset-react-app包识别

    // 把其当作普通对象设置属性和方法  静态的方法和属性
    static n = 200;
    static setNumber(){}
    // static setNumber=function(){}  这样可以
}
Modal.prototype.z =10

let m = new Modal(10,20)  // class的类 只能new执行 不能作为普通函数执行
