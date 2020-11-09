// ##js中的多种继承方式
//     # 特点
// JS本身是基于面向对象开发的编程语言
// 类：封装 继承 多态
// 封装：类也是一个函数，把视线一个功能的代码进行封装，以此实现“低耦合高内聚”
//             多态：重载，重写
// 重写：子类重写父类上的方法（伴随着继承运行的）
//                 重载：相同的方法，由于参数或者返回值不同，具备了不同的功能（JS中不具备严格意义上的重载）JS中的重载：同一个方法内，根据传参不同实现不同的功能。
//             继承：子类继承父类中的方法
//
// 在JS语言中，他的继承和其他编程语言还是不太一样的，原型继承并不会把父类的属性和方法 拷贝 给子类，而且让子类实例基于__proto__原型链找到自己定义的属性和方法 指向/查找 方式的。
//         父类中私有和公有的属性方法，最后都变为子类实例公有的。
//
// // 继承的目的：让子类的实例同时也具备父类中私有的属性和公共的方法
//
// // JS中第一种继承方案：原型继承（让子类的原型等于父类的实例即可）
// 1.父类中的私有的和公有的属性方法最后都变成子类实例公有的
// 2.和其他编程语言还是不太一样的，原型继承并不会把父类的属性和方法 拷贝 给子类，
//             而且让子类实例基于__proto__原型链找到自己定义的属性和方法 指向/查找 方式的
function Parent(){
    this.x = 100;

}
Parent.prototype.getX = function getX(){
    return this.x
}

function Child(){
    this.y = 200
}
Child.prototype = new Parent; // 原型继承
Child.prototype.getY = function getY(){
    return this.y;
}

let c1 = new Child;


// JS中第二种继承方案：Call继承    父类私有的当作子类实例私有的，但是没有继承父类prototype上的。
function Parent(){
    this.x = 100;

}
Parent.prototype.getX = function getX(){
    return this.x
}

function Child(){
    // 在子类的构造函数中，把父类当作普通方法执行（没有父类实例，父类原型上的那些东西也就和它没关系了）
    Parent.call(this) // this->Child的实例c1  拷贝式的
    this.y = 200
}
Child.prototype.getY = function getY(){
    return this.y;
}

let c1 = new Child;
