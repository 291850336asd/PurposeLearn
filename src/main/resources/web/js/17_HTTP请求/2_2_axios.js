/*
 * axios的配置项:
 *   url
 *   method
 *   baseURL * 
 *   transformRequest *
 *   transformResponse *
 *   headers *
 *   params
 *   data
 *   timeout *
 *   withCredentials *
 *   responseType *
 *   validateStatus *
 *   ...
 * 
 * 后面带*的，是当前项目中绝大部分请求都公用的信息，偶尔有极个别的请求配置信息和它不一样，这类配置信息，我们应该统一设定，所有请求都用这些配置信息 => axios的二次封装/配置
 */

/* 
axios.defaults.validateStatus = status => {
    // status是才服务器获取的HTTP状态码
    return status >= 200 && status < 300;
}; 
*/

/* // 真实项目中，大部分post请求，基于请求主体传递给服务器的格式，不期望是默认的json格式字符串，而是需要改为服务器要求的格式，例如：x-www-form-urlencoded，则需要我们统一基于transformRequest处理
axios.defaults.transformRequest = [data => {
    // data是基于请求主体传递给服务器的信息，transformRequest只对post系列请求有用
    // 返回的是啥，最后基于请求主体传递给服务器的就是啥
    return Qs.stringify(data);
}]; */
/* axios.defaults.transformResponse = [data => {
    // data是从服务器获取的响应主体信息，并且根据responseType的值，格式化处理过了
    // 返回的是啥，以后基于.then获取的response.data就是啥
    try {
        data = JSON.parse(data);
    } catch (err) {}
    return data;
}]; */


/* axios.defaults.baseURL = 'http://127.0.0.1:8888';
axios.defaults.withCredentials = true;
// axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.headers.common/post/get/delete/...
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.transformRequest = [data => {
    return Qs.stringify(data);
}]; */

/* 
axios.post('/department/update', {
    departmentId: 1,
    name: '总裁办AAA'
}, {
    headers: {
        'Content-Type': 'application/json'
    }
}); */

/* axios.get('/user/login').then(response => {
    console.log(response);
}); */

/* axios.get('/user/info', {
    params: {
        userId: 1
    }
}); */

//============================
// 关于baseURL在真实项目中的一些处理 "根据环境变量，区分不同的接口"「需要webpack的支持」
//   + 开发环境  请求的是测试服务器接口  http://168.1.1.12:8081
//   + 测试环境  请求的是另外服务器的接口地址(模拟的是实际上线的数据)  http://168.1.1.0:9000
//   + 生产环境  部署到真是的服务器上  http://api.zhufengpeixun.cn
// 我们期望：以后只需要在webpack或者其他地方指定好环境变量，项目打包或者运行的时候，自动切换接口地址

/* let env = process.env.NODE_ENV; //webpack或者node中配置出来的
switch (env) {
    case 'development':
        axios.defaults.baseURL = 'http://168.1.1.12:8081';
        break;
    case 'test':
        axios.defaults.baseURL = 'http://168.1.1.0:9000';
        break;
    case 'production':
        axios.defaults.baseURL = 'http://api.zhufengpeixun.cn';
        break;
} */

axios.defaults.baseURL = 'http://127.0.0.1:8888';
axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.transformRequest = [data => {
    return Qs.stringify(data);
}];

// 拦截器：axios.interceptors
// 请求拦截器：axios.interceptors.request  发生在axios内部帮我们整理好配置项，在发送给服务器之前，请求拦截器一般是对配置项的处理
axios.interceptors.request.use(config => {
    // config整理好的配置项，返回全新的config
    // 实战场景，例如：每一次向服务器发送请求的时候，可能需要传递一个Token来校验身份(放在请求头中)
    let token = localStorage.getItem('token');
    if (token) {
        // X-Token 服务器要求的名字 ，还可能会叫做Authorization...
        config.headers['X-Token'] = token;
    }
    return config;
});

// 响应拦截器：从服务器获取到信息后（或者知道结果，哪怕是失败），到我们自己执行.then/.catch之间触发的
axios.interceptors.response.use(response => {
    // 成功:根据validateStatus处理的
    // 实际开发中，response包含的信息太多了，但是到业务逻辑层，往往只需要响应主体的信息
    return response.data;
}, reason => {
    // 失败:获取数据了,但是状态码不对，或者是没有获取任何的数据...
    // 实际开发中，不论哪一个请求失败，基本上的提示信息或者处理方案是一致的，此时我们在响应拦截器中对错误进行统一的处理
    let response = reason.response;
    if (response) {
        // 从服务器获取到数据了，只是状态码不对，根据不同的状态码，做不同的提示即可
        switch (response.status) {
            case 400:
                break;
            case 401:
                break;
            case 404:
                break;
        }
    } else {
        // 数据都没有获取到
        if (!navigator.onLine) {
            // 断网了
        }
    }
    return Promise.reject(reason);
});

// 真实项目中，根据业务场景上的一写统一情况，还可以封装一个get/post公共方法，方法中往往夹杂着业务的一些统一逻辑，以后基于自己封装的方法发送请求
function api_get(url, params) {
    // ... 自己根据业务逻辑的统一处理
    return axios.get(url, {
        params
    }).then(data => {
        if (data.code == 0) {
            // 业务成功
            return data;
        }
        // 业务失败
        return Promise.reject(data);
    });
}

function api_post(url, data) {
    // ...
    return axios.post(url, data);
}


api_get('/user/list', {}).then(data => {
    console.log(data);
}).catch(reason => {
    
});


/* axios.get('/user/list').then(data => {
    // 此处拿到的直接是基于拦截器处理后的“响应主体”信息
    console.log(data);
}).catch(reason => {

}); */