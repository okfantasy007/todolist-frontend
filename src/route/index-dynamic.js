import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import {message} from 'antd';
import AsyncComponent from '@/hoc/async-component';

const Home = AsyncComponent(() => import('../views/home'));
const Login = AsyncComponent(() => import('../views/login'));
const Register = AsyncComponent(() => import('../views/register'));
const SettingPage = AsyncComponent(() => import("@/containers/settingPage"));

//全局配置消息最多显示一个
message.config({
  maxCount: 1
});

// 登录成功才进入的路由
const AuthRoute = ({component: Component, ...rest}) => (
  <Route
    {...rest}
    render={props => localStorage.getItem('userInfo') ? <Component {...props} /> : <Redirect to='/login'/>}
  />
);

class RouterIndex extends Component {
  render() {
    return (
      <Router>
        <Switch>
          {/*不需要登录的路由*/}
          <Route exact path="/login" component={Login}></Route>
          <Route exact path="/register" component={Register}></Route>
          {/*需要登录的路由*/}
          <AuthRoute path="/home" component={Home}></AuthRoute>
          <AuthRoute path="/setting" component={SettingPage}></AuthRoute>
          {/*登录成功之后，无法识别的路由，统一重定向到主页*/}
          <Route>
            <Redirect to={{pathname: "/home"}}></Redirect>
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default RouterIndex;