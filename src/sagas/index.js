import {takeEvery, call, put} from 'redux-saga/effects';
import request from '../utils/request';
import {urlEncode} from '@/utils';
import {message} from 'antd';

import registerSaga from '@/views/register/saga';
import loginSaga from '@/views/login/saga';
import defaultPageSaga from "@/containers/defaultPage/saga";
import addTaskPageSaga from "@/containers/addTaskPage/saga";
import settingPageSaga from "@/containers/settingPage/saga";
import settingDefaultPageSaga from "@/containers/settingDefaultPage/saga";
import updateUserInfoPageSaga from "@/containers/updateUserInfoPage/saga";

// 根据action.type执行异步请求(sage)
function executeSaga(action) {
  return function* ({type, path}) {
    const params = action.payload;
    //定义请求者
    const requester = () => {
      if (type === 'post') {
        return request.post(/*serverUrl + */path, params);
      } else if (type === 'get') {
        return request.get(/*serverUrl + */path + "?" + urlEncode(params));
      }
    };
    try {
      //调用请求者获取数据
      const json = yield call(requester);

      let typeMsg = '';
      switch (json.code) {
        case '0000':
          typeMsg = `${action.type}_success`;
          break;
        case '0003':
          message.info("请重新登录");
          window.location.href = '/login';
          break;
        case '0006':
          message.info("该账号已在其他终端登陆，请重新登录");
          window.location.href = '/login';
          break;
        default:
          typeMsg = `${action.type}_fail`;
					//如果没有错误信息，则构建错误信息
					if (!json.msg) {
						json.msg = "请求错误";
					}
          break;
      }
      yield put({
        type: `${typeMsg}`,
        payload: json
      });
			/*
			异步请求完毕后，改变redux的状态
			页面依赖于对应redux状态的，根据该改变去进行重新渲染
			注意，加上初始化对应redux状态的操作，
			主要是为了保证每次发起异步请求时，对应redux的状态都是初始化的状态
			因为页面有些提示信息需要每次发起异步请求都需要给到用户即时的响应信心
			如果异步请求完毕后，不加初始化对应redux状态的操作
			会造成每次用户操作，只有第一次会给出提示信息的情况，造成用户体验差的不良影响
			* */
			yield put({
				type: `init_${action.type}`,
				payload: {}
			});
    } catch (error) {
			console.error(error);
			let infoText = "接口请求异常！";
			// 请求超时！或 服务器地址错误或网络异常，请检查后重试！处理逻辑
			if (error.message) {
				if (error.message === "Network Error") {
					infoText = "网络异常！";
				} else if (error.message.indexOf("timeout") !== -1) {
					infoText = "请求超时！";
				}
			}
			yield put({
				type: `${action.type}_fail`,
				payload: {
					msg: infoText,
					success: false
				}
			});
			message.error(infoText);
			// 错误捕捉 网络异常 或 请求超时 仍然需要对redux状态进行初始化处理
			yield put({
				type: `init_${action.type}`,
				payload: {}
			});
    }
  };
}

const sagas = Object.assign({}, loginSaga, registerSaga, defaultPageSaga, addTaskPageSaga, settingPageSaga, settingDefaultPageSaga, updateUserInfoPageSaga);

function* rootSaga() {
  for (let key in sagas) {
    yield takeEvery(key, action => executeSaga(action)(sagas[key]));
  }
}

export default rootSaga;
