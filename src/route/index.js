import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import {message} from 'antd';
import Home from '../views/home';
import Login from '../views/login';
import Register from '../views/register';
import SettingPage from "@/containers/settingPage";


//全局配置消息最多显示一个
message.config({
	maxCount: 1
});

// 登录成功才进入的路由
const AuthRoute = ({component: Component, ...rest}) => (
	<Route
		{...rest}
		render={props => <Component {...props} />}
	/>
);

class RouterIndex extends Component {
	render() {
		return (
			<Router>
				<Switch>
					{/*不需要登录的路由*/}
					<Route path="/" component={Login}></Route>
					<Route path="/register" component={Register}></Route>
					{/*需要登录的路由*/}
					{/*登录成功之后，无法识别的路由，统一重定向到主页*/}
					<Route>
						<Redirect to={{pathname: "/"}}></Redirect>
					</Route>
				</Switch>
			</Router>
		);
	}
}

export default RouterIndex;