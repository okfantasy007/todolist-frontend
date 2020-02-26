import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { rootReducer } from "./store";

import Router from "./route";
import "./assets/styles/base.less";
import "./assets/styles/antd-override.less";

import createSagaMiddleware from "redux-saga"; // 引入redux-saga中的createSagaMiddleware函数
import rootSaga from "./sagas"; // 引入saga

import { LocaleProvider } from 'antd';
import zhCN from "antd/lib/locale-provider/zh_CN";

const sagaMiddleware = createSagaMiddleware(); // 创建saga中间件
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware)); // 创建store
sagaMiddleware.run(rootSaga); // 运行saga中间件

ReactDOM.render(
  <Provider store={store}>
    <LocaleProvider locale={zhCN}>
      <Router />
    </LocaleProvider>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
