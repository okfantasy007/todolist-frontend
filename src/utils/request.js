import axios from 'axios';

/**
 * @author William Cui
 * @description 自定义配置请求axios实例
 * @return Promise 对象
 * @date 2018-05-23
 **/

// 暂时指定请求超时时间为5秒
axios.defaults.timeout = 10 * 1000;
axios.defaults.withCredentials = true;

axios.interceptors.request.use(
	config => {
		return config
	},
	error => {
		return Promise.reject(error)
	}
);

axios.interceptors.response.use(
	function (response) {
		if (response.status === 200) {
			return response.data;
		}
	},
	function (error) {
		// Do something with response error
		return Promise.reject(error);
	}
);

export default axios;

