/**
 * http://axios-js.com/zh-cn/docs/index.html
 * Axios 是一个基于 promise 的 HTTP 库，可以用在浏览器和 node.js 中
 *
 * axios应用
 *  基于Promise封装和管理的ajax库，核心还是XMLHttpRequest
 *
 * 语法：
 *    + axios([config])
 *    + axios(url,[config])
 *    + axios.get/delete/head/options(url,[config])
 *    + axios.post/put/patch(url,[data],[config])
 *    + 后面三种都是快捷写法，指定了请求地址/请求方式/请求主体 这些东西，config无需再次配置了，最后处理的方案还是第一种
 *    + 返回的结果都是promise实例
 *      + 成功：从服务器获取到结果，并且HTTP状态码是以2开始的。可以通过在config里面的
 *          validateStatus：function(status){return status>=200 && status<300}
 *      + 失败：
 *          + 从服务器获取到数据了，但是状态码不是以2开头的
 *          + 没有从服务器获取到数据
 *
 * 返回结果
 *    response对象
 *      status:200
 *      statusText:'OK'
 *      request:基于new XMLHttpRequest创建的xhr对象
 *      headers：响应头信息
 *      data:响应主体信息
 *      config:发送请求的时候传递的配置新
 *      ===>项目中，我们常用的还是响应主体信息
 *    reason对象
 *      config:发送请求的时候传递的配置新
 *      request:基于new XMLHttpRequest创建的xhr对象
 *      isAxiosError:true/false
 *      response：等于返回成功的response对象，如果没有从服务器获取任何结果，response就是不存在的
 *
 *  配置信息 config
 *    + url
 *    + method:'get' //default
 *    + baseURL:'' 向服务器发送请求的地址是有baseURL+url完成的
 *    + transformRequest:[function(data,headers){
 *           .....
 *           return data
 *      }] 针对post系列[put,psot,patch]请求，请求主体传递的信息 进行格式化处理，发生在发送请求之前
 *    + transformResponse:[function(data){
 *          .....
 *           return data
 *      }] 针对服务器响应主体中的信息，进行格式化处理. 发生在自己.then /catch之前
 *    +  headers:{}  设置自定义请求头信息
 *    +  params:{} get系列请求问号传递参数的信息（键值对方式存储，也可以是URLSearchParams对象）
 *    +  paramsSerializer: function(params) {
 *              return Qs.stringify(params, {arrayFormat: 'brackets'})
 *           }, 把params对象变为 xxx=xxx&xxx=xxx格式的。
 *    + data:{}  请求主体
 *    + timeout:0 0表示不设置，设置请求超时时间。在这么久的时间内，没有完成数据请求，则触发xhr.ontimeout事件
 *    + withCredentials：false  在跨域请求中设置是否允许携带资源凭证。例如：cookies
 *    + responseType：'json' axios 内部会把服务器返回的信息转换为指定格式的数据。
 *    + unUploadProgress:function(){} 监听在上传下载处理进度事件   用的原生的xhr.upload.onprogress事件
 *    + validateStatus:function(status){
 *                return status>=200 && status<300
 *             }
 *    + .....
 *
 */

//promise写法
// axios.get('http://127.0.0.1:8888/user/login', {params:{account: 'xxx',password:'123dfdf'}}).then(response => {
//     console.log('成功', response)
//     return response.data
// }).then(data => {
//     console.log('响应主体信息',data)
// }).catch(reason => {
//     console.dir(reason)
// })

axios.post('/user/login', {
    // axios默认会把对象变为JSON字符串传递给服务器{"account":"xxx","password":"123dfdf"}
    account: 'xxx',
    password:'123dfdf'
}, {
    baseURL: 'http://127.0.0.1:8888',
    // headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded'
    // },
    transformRequest: [function (data) {
        //console.log(data) //{account: "xxx", password: "123dfdf"}
        // 直接返回data
        //return data  //这个处理返回的是对象，浏览器默认会直接转成字符串，所以对象变成字符串，返回的是[object Object]


        // x-www-form-urlencoded 想要这个get url方式的参数 xxx=xxx&xxx=xxx
        return Qs.stringify(data)

    }]
})

// // async await写法
// async function fn() {
//     try {
//         let response = await axios.get('http://127.0.0.1:8888/user/login')
//         console.log('成功',response)
//     } catch(reason) {

//     }
// }
// fn()
