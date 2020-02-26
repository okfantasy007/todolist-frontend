const _GET_PUBLIC_KEY = "GET_PUBLIC_KEY";
const _LOGIN = "LOGIN";

let settingPageSaga = {};
//获取公钥
settingPageSaga[_GET_PUBLIC_KEY] = {
  type: "get",
  path: "/account/fetchRSAPublicKey"
};
//登录
settingPageSaga[_LOGIN] = {
  type: "post",
  path: "/account/login"
};

export default settingPageSaga;
