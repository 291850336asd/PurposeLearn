
// 监听方式1
var obj2 = {
    name: 'aaa',
    age:123
}

function dereactive(obj, key, value) {
    Object.defineProperty(obj, key,{
        // value: 123,
        // enumerable: false, //是否可枚举
        // configurable: true, // 是否可以删除
        // writable: false, //是否改写
        get(){
            console.log("get " + key)
            return value
        },
        set(val) {
            console.log("set name " + val)
            value = val;
        }
    });
}
function fn(obj2) {
    for (let key in obj2){
        if(typeof obj2[key] === "object"){
            fn(obj2[key]);
        } else {
            dereactive(obj2, key, obj2[key])
        }
    }
}
fn(obj2);


//监听方式2
var obj2 = {
    name: 'aaa',
    age:123
}
var objProxy = new Proxy(obj2,{

    set(target, key, value, receiver) {
        console.log(arguments)
        target[key] = value;
    },
    /**
     *
     * @param target  obj2
     * @param key
     * @param receiver
     */
    get(target, key, receiver) {
        console.log(arguments)
        return target[key];
    }
});
objProxy.name;
objProxy.name = '23232';








var str = 'abcdfedokdjqlcij'
// 找出字母不一样最长的哪一个
var temp1=[]
var temp2=[]
let arr = []
let index = 0
// var flag= true
for(var i=0;i<str.length;i++){
    let item = str[i]
    !arr[index]?arr[index]=[]:null
    if(arr[index].includes(item)){

        let repeatIndex = arr[index].indexOf(item)
        let strBefore = arr[index].slice(repeatIndex+1)
        //发现重复则扩建数组，并将重复的数据插入到arr
        index ++
        arr[index] = [];
        arr[index].push(...strBefore,item)
        //检验二维数组中每个数组长度大小将小的数组删除，二维数组长度小于等于2时不需要校验
        var length = arr.length;
        if(length>2){
            //检验倒数第二和倒数第三个长度
            if(arr[length-2].length == arr[length-3].length){
                //长度相等说明二维数组中的每个数组长度都一样
                //则不需要处理
            } else if(arr[length-2].length > arr[length-3].length){
                // 说明新产生的数组比之前存的数组都长，则删除之前产生的数组
                arr = arr.slice(length -2); // arr需要重新覆盖
                //覆盖后index为当前arr的长度
                index = arr.length-1;
            }else if(arr[length-2].length< arr[length-3].length){
                // 说明新产生的数组比之前存的数组短，则删除新产生的数组
                arr.splice(length-3,1);
                index = arr.length-1;
            }
        }
    }else{
        arr[index].push(item)
    }
}
var length = arr.length;
//执行完校验最后插入的新数组
if(length>=2){
    //检验最后两个
    if(arr[length-1].length == arr[length-2].length){
        //长度相等说明二维数组中的每个数组长度都一样
        //则不需要处理
    } else if(arr[length-1].length > arr[length-2].length){
        // 说明新产生的数组比之前存的数组都长，则删除之前产生的数组
        arr = arr.slice(length -2); // arr需要重新覆盖

    }else if(arr[length-1].length< arr[length-2].length){
        // 说明新产生的数组比之前存的数组短，则删除新产生的数组
        arr.splice(length-1,1);
    }
}
console.log(arr)






var str = 'abcdfedokdjqlcij'
// 找出字母不一样最长的哪一个
let arr = []
let index = 0
// var flag= true
for(var i=0;i<str.length;i++){
    let item = str[i]
    !arr[index]?arr[index]=[]:null
    if(arr[index].includes(item)){
        let repeatIndex = arr[index].indexOf(item)
        let strBefore = arr[index].slice(repeatIndex+1)
        ++index
        arr[index] = []
        arr[index].push(...strBefore,item)
        var lengthArr = arr.length;
        if(lengthArr>2){
            // arr[0].length>arr[1].length?arr[1]=[]:arr[--index]=[]
            if(arr[lengthArr- 2].length > arr[lengthArr-3].length){
                arr = arr.slice(lengthArr-2);

            } else  if(arr[lengthArr- 2].length < arr[lengthArr-3].length){
                arr.splice(lengthArr-2,1);
            }
            index = arr.length-1;
        }
        // ++index
        // arr[index] = []
    }else{
        arr[index].push(item)
    }

    if(i == str.length -1){
        var lengthArr = arr.length;
        if(lengthArr>=2){
            if(arr[lengthArr- 1].length > arr[lengthArr-2].length){
                arr = arr.slice(lengthArr-1);
            } else  if(arr[lengthArr- 1].length < arr[lengthArr-2].length){
                arr.splice(lengthArr-1,1);
            }
        }

    }
}
console.log(arr)





