/*
 * 拿当前时间和目标时间进行对比：对比的差值中算出还剩多少小时、多少分钟、多少秒
 *    new Date() 获取当前客户端本地时间（因为这个时间用户自己可以改）
 *    倒计时抢购的当前时间应该以服务器时间为准（服务器返回的响应头信息中有服务器时间）
 * 思路：加载页面首先从服务器获取时间（尽可能减少时间差），把获取的服务器时间保存起来，以后每间隔1秒中，让获取的时间向上累加
 */
let target = new Date("2020/11/27 22:14:50"),
	now = new Date(),
	box = document.querySelector('#box'),
	spanBox = box.querySelector('span'),
	autoMove = null;

function queryServerTime() {
	let xhr = new XMLHttpRequest;
	xhr.open('HEAD', './DATA.json?_=' + Math.random());
	xhr.onreadystatechange = function () {
		if (xhr.status >= 200 && xhr.status < 400) {
			if (xhr.readyState === 2) {
				// 把服务器获取的格林尼治时间GMT 转换为 北京时间GMT+0800
				now = new Date(xhr.getResponseHeader('date'));
				// 计算时间差
				computed();
				// 每隔1S让时间累加，并且重新计算时间差
				interval();
			}
		}
	};
	xhr.send();
}

function computed() {
	let spanTime = target - now; //毫秒
	if (spanTime <= 0) {
		// 到达抢购的时间了
		// spanBox.innerHTML = "00:00:00";
		box.innerHTML = "开始抢购吧~~";
		clearInterval(autoMove);
		return;
	}
	let hours = Math.floor(spanTime / (60 * 60 * 1000));
	spanTime = spanTime - (60 * 60 * 1000) * hours;
	let minutes = Math.floor(spanTime / (60 * 1000));
	spanTime = spanTime - (60 * 1000) * minutes;
	let seconds = Math.floor(spanTime / 1000);
	hours < 10 ? hours = '0' + hours : null;
	minutes < 10 ? minutes = '0' + minutes : null;
	seconds < 10 ? seconds = '0' + seconds : null;
	spanBox.innerHTML = `${hours}:${minutes}:${seconds}`;
}

function interval() {
	autoMove = setInterval(() => {
		// 在自身基础上累加1S
		now = new Date(now.getTime() + 1000);
		computed();
	}, 1000);
}

queryServerTime();