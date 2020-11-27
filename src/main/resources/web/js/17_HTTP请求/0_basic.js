/**
 * 前后端数据通信方案
 *   + ajax XMLHttpRequest: 同源 & 跨域（cros\proxy）
 *   + Fetch ES6新增 同源 & 跨域（cros\proxy）
 *   + jsonp 跨域传输
 *   + websocket
 *   + postMessage 跨域传输
 *   + iframe  +  document.domain/location.hash... 跨域传输
 *
 * 通信格式(post-请求主体  get-url参数)
 *   + form-data    MIME:mutipart、raw
 *      -- 表单提交
 *      -- 文件上传
 *   + x-www-form-urlencoded     MIME:application/x-www-form-urlencoded
 *      -- 普通数据的传输一般都采用这种格式
 *      -- 字符串 'xxxx=xxxx&xxx=xxx'
 *      --GET 系列请求，URL传参的参数信息就是这种格式
 *   + raw 文本格式未经任何加工
 *      -- Json   MIME:application/json
 *      -- text普通字符串  MIME:text/plain
 *      -- xml 字符串  MIME:application/xml
 *      ...
 *   + binary 文件流
 *     根据上传的文件（图片、excel等）不同MIME不同  例如：image/jpeg
 *   + GraphQL 查询类 select ....
 *
 */
//form-data
let formData = new FormData();
formData.append("name", "xxxxx");
formData.append("age", 12);