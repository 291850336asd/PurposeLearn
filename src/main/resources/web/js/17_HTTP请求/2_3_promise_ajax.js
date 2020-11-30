import * as _ from "../utils/utils";

(function () {

    //Get系列
    let GetSerial = ['get','head','delete', 'options'];
    //Post系列
    let PostSerial = ['post','put', 'patch'];
    //处理header默认值
    let heads = {
        common:{
            'Content-Type':'application/json'
        }
    };
    GetSerial.forEach((item, index) =>{
        heads[item] = {};
    });
    PostSerial.forEach((item, index) =>{
        heads[item] = {};
    });
    //参数处理
    let configDefault = {
        baseURL:{
            type:'string',
            default:''
        },
        url:{
            type:'string',
            required: true
        },
        method:{
            type:'string',
            default:'get'
        },
        header:{
            type:'object',
            default: heads
        },
        params:{
            type:'object',
            default:{}
        },
        cache:{
            type: 'boolean',
            default: true
        },
        data:{
            type:'object',
            default:{}
        },
        timeout:{
            type:'number',
            default: 0
        },
        withCredentials:{
            type: 'boolean',
            default: false
        },
        responseType: {
            type: 'string',
            default: 'json'
        },
        transformRequest: {
            type:'function',
            default:function (data) {
                if(_.isEmptyObject(data)){
                    return null;
                }
                return JSON.stringify(data); //默认处理成json
            }
        },
        validateStatus: {
            type: 'function',
            default:function(status){
                return status >= 200 && status < 300;
            }
        },
        transformResponse: {
            type: 'function',
            default:function (data) {
                if(_.isEmptyObject(data)){
                    return null;
                }
                return JSON.stringify(data); //默认处理成json
            }
        }
    };

    //支持二次配置更改
    ajax.defaults = {
        // baseURL: '',
        headers:heads,
        // timeout: 0,
        // withCredentials: false,
        // responseType: 'json',
        // transformRequest: function (data) {
        //     return data;
        // },
        // validateStatus:function(status){
        //     return status >= 200 && status < 300;
        // }
    };

    //配置项参数初始化
    function initParams(config) {
        //先把自定义的配置项和ajax.defaults 深度合并
        config = _.merge(_.deepClone(ajax.defaults),_.deepClone(config));
        let params = {};
        _.each(configDefault, (key, rule) => {
            let {
                type, required, default:defaultValue
            } = rule;
            //传递的配置中没有这一项：验证是否必传  && 走默认值
            if(!config.hasOwnProperty(key)){
                if(required){
                    throw new ReferenceError(`${key} is must be required`);
                }
                params[key]= defaultValue;
            }
            //传递的配置有这一项:验证格式  && 合并
            if(_.toType(config[key]) !== type){
                throw new ReferenceError(`${key} is must be ${type}`);
            }
            params[key] = _.merge(_.deepClone(defaultValue), _.deepCloneconfig[key]);
        });
        return params;
    }



    // 暴露供外面调用的api
    function ajax(url,config) {
        if(_.isPlainObject(url)){
            config = url;
        }
        if(_.toType(url) === 'string'){
            if(!_.isPlainObject(config)){
                config = {};
            }
            config.url = url;
        }
        config = initParams(config);
        return new AJAX(config);
    };

    //GET 系列 快捷方法支持二次修改
    GetSerial.forEach((item, index) =>{
        ajax[item] = function (url, config) {
            if(!_.isPlainObject(item)){
                config = {};
            }
            config.url = url;
            config.method = item;
           return ajax(config);
        }
    });

    //POST系列  快捷方法支持二次修改
    PostSerial.forEach((item, index)=>{
       ajax[item] = function (url, data, config) {
           if(!_.isPlainObject(item)){
               config = {};
           }
           config.url = url;
           config.method = item;
           config.data = data;
           return ajax(config);
       }
    });


    //发送请求核心内容
    function AJAX(config){
        this.config = config;
        this.GETREG = /^(GET|HEAD|OPTIONS|DELETE)$/i;
        return this.send();
    }
    AJAX.prototype = {
        constructor: AJAX,
        version: '1.0.0',
        send(){
            let {method, validateStatus, timeout, withCredentials} = this.config;
            return new Promise((resolve, reject) => {
                let xhr = new XMLHttpRequest();
                xhr.open(method, this.initURL());
                xhr.timeout = timeout;
                xhr.withCredentials = withCredentials;
                xhr.headers =this.initRequestHeader(xhr);
                xhr.onreadystatechange = () => {
                    //服务器有响应
                    let {
                        readState, status, responseTest, response
                    } = xhr;
                    if (!validateStatus(status)) {
                        //状态码不符合要求，失败
                        reject(this.initResult(false, xhr));
                    }
                    if(readyState === 4){
                        //成功
                        resolve(this.initResult(true, xhr));
                    }
                };
                xhr.onerror = (error) => {
                    // 服务器没有响应
                    reject({
                        message: error.message
                    });
                }
                xhr.send(this.initData());
            });
        },
        initURL(){
            let {
                baseURL, url, method, params, cache
            } = this.config;

            url = baseURL + url;
            //get 请求？传参
            if(this.GETREG.test(method)){
                if(params){
                    params = this.stringify(params);
                    url += `${url.includes('?') ? '&':'?'}${params}`;
                }
                if(!cache){
                    url += `${url.includes('?') ? '&':'?'}_=${Math.random()}`;
                }
            }
        },
        stringify(params){
            let str = ``;
            _.each(params, (key, value)=>{
               str +=`&${key}=${value}`;
            });
            return str.substr(1);
        },
        //POST  处理data
        initData(){
            let {
                method, data, transformRequest
            } = this.config;
            if(this.GETREG.test(method)){
               return null;
            }
            return transformRequest(data);
        },
        // 处理返回结果
        initResult(flag,xhr){
            let response = {
                data:{},
                request: xhr,
                status: xhr.status,
                statusText: xhr.statusText,
                headers: this.initResponseHeaders(xhr),
                config: this.config;
            }
            if(flag){
                let text = xhr.responseText;
                switch (this.config.responseType.toLowerCase()){
                    case 'json':
                        text = JSON.parse(text);
                        break;
                    case 'stream':
                        text = xhr.response;
                        break;
                    case 'document':
                        text = xhr.responseXML;
                        break;

                }
                response.data = text;
                return response;
            }
            return {
                response,
                message: shr.statusText
            };
        },
        initRequestHeader(xhr){
            let {
                headers,
                method
            } = this.config;
            let alone = headers[method] || {},
                common = headers['common'] || {};
            delete headers['common'];
            ['get','head','delete', 'options','post','put', 'patch'].forEach((value, index)=>{
                delete headers[value];
            });
            common = _.merge(common, alone);
            headers = _.merge(headers, common);
            headers.each((key,value) => {
               xhr.setRequestHeader(key, value);
            });
        },
        initResponseHeaders(xhr){
            let allResponseHeaders = xhr.getAllResponseHeaders(),
            headers = {};
            allResponseHeaders = allResponseHeaders.split(/(?:\n)/g);
            _.each(allResponseHeaders, (item, key) => {
               let [key,value] = item.split('：');
               if(!key){
                   return;
               }
               headers[key] = value;
            });
            return headers;
        }
    };

    ajax['all'] = function (promiseList) {
        if(!_.isArrayLike(promiseList)){
            throw new TypeError("promise must be an array or likeArray");
        }
        return Promise.all(promiseList);
    };
    ajax.stringify = AJAX.prototype.stringify;
    if(typeof window !== 'undefined'){
        window.ajax = ajax;
    }
    if(typeof module === 'object' && typeof module.exports === 'object'){
        module.exports = ajax;
    }
})();


ajax.defaults.withCredentials = true;
ajax.defaults.baseURL = "http://127.0.0.1:8888";
ajax.defaults.headers.post['Content-type'] = 'application/x-www-urlencoded';
ajax.defaults.transformRequest = (data) => {
  return ajax.stringify(data);
};
//get
ajax({
    url:"/user/list",
    params:{
        id: 1
    },
    cache: false
}).then(response => {
    console.log("ok", response);
}).catch(reason => {
   console.log('no', reason);
});

ajax.post('/user/login',{
    account:'xxxx',
    password:'xxcx'
}).then(response => {
    console.log("ok", response);
}).catch(reason => {
    console.log('no', reason);
});