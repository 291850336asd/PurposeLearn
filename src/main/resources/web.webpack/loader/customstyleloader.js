function loader(source) {
    //1.先创建style标签
    //2.把样式作为style的内容
    //3.把style内容插入到head中
    let code = `let style=  document.createElement("style");
                style.innerHTML= ${ JSON.stringify(source) };
                document.head.appendChild(style);`;
    return code;
}

module.exports = loader;