import Promise from '../lib/promise'

function request(url, data, type) {
	var data = data || {};
	var url = url || '';
	var type = type || 'post';
	if(!url && typeof url != 'string') {
		console.log('传入的url有问题')
		return;
	}
	if(url.charAt(0) != '/') {
		url = '/' + url;
	}
	var param = {
		type: type,
		url: proxypath + url,
		data: data
	}
	return new Promise((resolve, reject) => {
		GB.ajax2(param).done((result) => {
			resolve(result);
		}).fail((data) => {
			reject(data);
		})
	})
}

export let post = (url, data) => {
	return request(url, data, 'post')
}
export let get = (url, data) => {
	return request(url, data, 'get')
}

export class query {
	constructor(prefix) {
		if(!prefix || typeof prefix != 'string') throw new Error('prefix is undefine')
		if(prefix.charAt(prefix.length - 1) != '/') prefix += '/';
		this.prefix = prefix;
		//过滤器，默认直接将结果传递，如果需要单独处理需自己实现
		this.queryFilter = res => res;
		this.exceptFilter = res => {
			return Promise.reject(res);
		}
	}
	get(method, data) {
		return get(this.prefix + method, data).then(this.queryFilter).catch(this.exceptFilter);
	}
	post(method, data) {
		return post(this.prefix + method, data).then(this.queryFilter).catch(this.exceptFilter);
	}
}


export const isWX=()=>{
	var ua = navigator.userAgent.toLowerCase();
	return /micromessenger/.test(ua);
}

export const isLogin=()=>{
	//判断是否登录
	var telephone= GB.cookie.getCookie('telephone');
	return !!telephone
}



