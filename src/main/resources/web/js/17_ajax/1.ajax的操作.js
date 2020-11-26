// 1.创建AJAX实例对象（在IE低版本浏览器中需要基于new ActiveXObject()处理）
let xhr = new XMLHttpRequest;
// 2.打开URL（发送请求前的一些处理）
xhr.open('get', './data.json', true);
// 3.监听AJAX状态信息
xhr.onreadystatechange = function () {
	// xhr.readyState  AJAX状态 0~4
	// xhr.status  xhr.statusText  服务器返回的网络状态码  2/3/4/5
	/* if (xhr.readyState === 4 && xhr.status === 200) {
		console.log(xhr.responseText);
	} */
	if (xhr.status === 200) {
		let n = xhr.readyState;
		if (n === 2) {
			console.log("响应头信息先回来", xhr.getAllResponseHeaders());
		}
		if (n === 4) {
			console.log("响应主体信息回来", xhr.responseText);
		}
	}
};
// 4.发送请求（请求主体的信息会基于SEND的时候发送给服务器）
xhr.send(null);

/*
 * 客户端向服务器发送网络请求的方式
 * GET：get/delete/head/options 
 * POST：post/put
 * 
 * GET系列的特点：一般认为是从服务器获取信息（当然也可以把客户端的信息传递给服务器），比重：给的少，拿的多
 *    GET
 *    DELETE  一般应用于想删除服务器上的一些文件或者一些大量的信息
 *    HEAD 只需要获取响应头的信息即可，响应主体信息不接受（服务器也不需要返回）
 *    OPTIONS 试探性请求，常用于CORS跨域资源共享的时候，每一个正常的请求发送之前，我们默认先发送一个OPTIONS请求，这个请求用来校验客户端和服务器端是否正常连接即可
 * 
 * POST系列的特点：一般认为是给服务器推送信息（当然服务器也可以给客户端返回信息），比重：给的多，拿的少
 *    POST
 *    PUT 和DELETE对应的，一般用于给服务器传递文件或者大数据（例如文本编辑器编辑的内容）
 * 
 * 官方文档没有明确规定GET和POST的区别，但是大家约定俗成的按照以下的方式来搞
 *    GET传递给服务器的信息一般基于“URL地址问号传参”实现
 *       xhr.open('GET','./DATA.json?lx=1&name=zhufeng&xxx=xxx...')
 *    POST传递给服务器的信息一般基于“请求主体”实现
 * 		 xhr.send('lx=1&name=zhufeng&xxx=xxx...')
 *    客户端还可以基于设置请求头把一些简要的信息传递给服务器（COOKIE、TOKEN...）
 * 
 * 1. GET传递给服务器的信息要远远小于POST
 *    原因：URL在不同浏览器中有长度的限制 IE:2KB（2*1024B），超出浏览器限制的部分，内容会被自动裁切掉；POST理论上是没有长度限制的（请求主体没有设置过大小的限制），但是真实项目中为了保证数据传输的高效性，我们都会手动做限制；
 * 
 * 2. 安全问题：POST相对GET来讲安全好一些
 *    这样项目中涉及安全信息的传输都要用POST（例如：登录）
 *    GET基于URL传输数据很容易会被URL劫持掉，这样不安全；POST相对安全，但也不是绝对安全，所以对于重要信息的传输也需要进行手动加密处理（MD5加密等）；
 * 
 * 3. 缓存问题：浏览器在处理GET请求的时候，如果两次请求的地址+参数都一致，浏览器自己会设置数据缓存（当然这个缓存是我们不想要的）；想要不走浏览器的缓存，我们需要保证每次请求的URL都不完全一致（方案：每次请求，问号传参的末尾都加一个随机数或者一个时间戳等）；
 *    xhr.open('GET','./DATA.json?lx=1&_='+Math.random())
 */

/*
 * AJAX的状态 xhr.readyState
 *   DONE: 4   响应主体信息也返回了   （***）
 *   LOADING: 3   响应主体正在加载返回中
 *   HEADERS_RECEIVED: 2  服务器已经返回响应头的信息  （***）
 *   OPENED: 1  已打开  执行了OPEN
 *   UNSENT: 0  未发送  开始创建XHR默认状态就是0
 */

/*
 * HTTP网络状态码  xhr.status
 *   以2开始的  200   服务正常返回数据（客户端向服务器发送请求，服务器正常把数据给客户端了，但是数组是否为想要的不一定）
 *   以3开始的  304读取的是协商缓存的数据   301永久重定向（一般用于域名的转移）  302/307 临时转移或者临时重定向（一般用于服务器的负载均衡）
 *   以4开头  400请求参数有误   401无权限访问   404地址错误   403服务拒绝执行 【错误一般都是客户端的问题】
 *   以5开头  500服务器发生未知错误  503超负荷  【错误一般是服务器的问题】
 * 
 * 项目中所谓的请求成功和失败是分为两种的：
 *     网络层面：服务器没有返回任何的信息（或者和服务器都没有连接上）这肯定是失败【根据不同的状态码可以分析不同的原因】
 *     业务层面：已经从从服务器获取数据，只不过获取的数据是不符合业务逻辑需要的，则也可以定位失败  一般服务器返回的数据中都包含 code 标识，代表是业务逻辑上的成功还是失败【需要前后端协商好数据的判断标识】
 */