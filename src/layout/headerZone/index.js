import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {Layout, Icon, message, Tag, Popover} from "antd";
import io from 'socket.io-client';
import wsUrl from '@/config';
import request from "@/utils/request";

const {Header} = Layout;

class headerZone extends Component {

  constructor() {
    super();
    this.state = {
      onlineCount: localStorage.getItem("onlineCount") || 1,
			onlineUserList: JSON.parse(localStorage.getItem("onlineUser")) || []
    }
  }

  componentDidMount() {
    const _this = this;
    if(window.socketConnected) {
			// 后端推送来在线数据时
			window.socketConnected.on('update_online_count', function (data) {
				console.log("window.socketConnected(current online count)", window.socketConnected);
				console.log('current online count:' + data.online_count);
				console.log('current online user list:' + data.user_list);
				localStorage.setItem("onlineCount", data.online_count);
				localStorage.setItem("onlineUser", JSON.stringify(data.user_list));
				_this.setState({
					onlineCount: data.online_count,
					onlineUserList: data.user_list
				});
			});
    }
		// window.addEventListener('beforeunload', this.beforeunloadFn);
  }

	componentWillReceiveProps(nextProps) {
		console.log("componentWillReceiveProps");

		if(nextProps.logout_result !== this.props.logout_result) {
			const {logout_result} = nextProps;
			if (logout_result.logout_success) {
				message.success("登出成功");
				window.socketConnected && window.socketConnected.emit('logout_disconnect');
				window.socketConnected = null;
				localStorage.clear();
				this.props.history.push('/login');
			} else {
				message.error("登出失败");
			}
		}
	}

	componentWillUnmount() {
		// window.removeEventListener('beforeunload', this.beforeunloadFn);
	}

	beforeunloadFn = () => {
  	let userInfo = localStorage.getItem("onlineUser");
  	if (userInfo) {
			userInfo = JSON.parse(userInfo);
			this.connectMsgCenter(userInfo.id);
		}
	};

	connectMsgCenter = (userId) => {
		if (window.socketConnected) {
			window.socketConnected = null;
		}
		window.socketConnected = io.connect(wsUrl);
		const t = new Date();
		window.socketConnected && window.socketConnected.emit('login', userId);
		console.log("User " + userId + " login at time: %s~", t);

		// 后端推送来消息时
		const _this = this;
		window.socketConnected && window.socketConnected.on('message', function (msg) {
			if (msg && msg.type && msg.userName && msg.text) {
				let userInfo = localStorage.getItem("userInfo") ? localStorage.getItem("userInfo") : "";
				if (userInfo) {
					userInfo = JSON.parse(userInfo);
					const userName = userInfo.user_name;
					if (userName !== msg.userName) {
						_this.openNotification(msg.text);
					}
				}
			} else {
				console.log("window.socketConnected(receive msg)", window.socketConnected);
				console.log("receive msg:" + msg);
				_this.openNotification(msg);
			}
		});

		//websocket服务端推送登录成功，此时需要将当前的socketId放入请求会话中
		//通过向后端发送请求的方式实现
		window.socketConnected && window.socketConnected.on('login_success', function (data) {
			console.log("window.socketConnected(login_success)", window.socketConnected, data);
			request
				.post(
					"/user/set_socket_id_to_user_session",
					{
						socketId: window.socketConnected.id
					},
					{}
				)
				.then(function (res) {
					console.log("set_socket_id_to_user_session res", res);
					if (res.code === "0000") {
						console.log("set_socket_id_to_user_session success");
					} else {
						console.log("set_socket_id_to_user_session failure");
					}
				});
		});

		window.socketConnected && window.socketConnected.on('redirect_to_login', function () {
			console.log("window.socketConnected(redirect_to_login)", window.socketConnected);
			window.socketConnected = null;
			localStorage.clear();
			_this.toPath("/login");
		});
	};

	logout = () => {
		const {logout} = this.props;
		logout();
	};

  toPath = path => {
    this.props.history.push(path);
  };

  render() {
		const {homeMode} = this.props;
		const {onlineCount} = this.state;
		const userInfo = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : {};
		let menu = [];
		let menuItems = [];
		const {onlineUserList} = this.state;
		if (onlineUserList && onlineUserList.length > 0) {
			onlineUserList.forEach((item, index) => {
				menuItems.push(<div key={index}>{userInfo.user_name === item ? `${item}（当前）`: item}</div>);
			});
			menu = (
				<div style={{maxHeight: 90, overflowY: 'auto'}} className="online-user-pop">
					{
						menuItems
					}
				</div>);
		}
    return (
      <Header className="header header-zone" style={{backgroundColor: "#fff", borderBottom: '3px solid #f0f2f5', padding: '0 20px'}}>
        <div className="title" onClick={homeMode ? null : this.toPath.bind(this, "/home")}>
          <span className="large-title">TODOLIST</span>
          <span className="normal-title">V3.0.0</span>
        </div>
        <div className="login-info">
					当前在线人数：
					{
						menuItems.length > 0 ?
							<Popover content={menu} title={null} getPopupContainer={(triggerNode) => triggerNode.parentNode}>
								<Tag color="#4682B4">{onlineCount}</Tag>
							</Popover> : "-"
					}
					{/*<Tag color="#4682B4">{onlineCount}</Tag>*/}
					&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;
					<span style={{fontWeight: 'bold'}}>{userInfo.user_name}</span>
          {homeMode && <div className="logout" onClick={this.toPath.bind(this, "/setting")}><Icon type="setting" /></div>}
          <div className="logout" onClick={this.logout}><Icon type="logout" /></div>
        </div>
      </Header>
    );
  }
}

//映射state到容器组件props
const mapStateToProps = state => ({
	logout_result: state.logout_result
});

//映射dispatch到容器组件props
const mapDispatchToProps = dispatch => ({
	logout: () => {
		dispatch({
			type: 'logout'
		});
	}
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(headerZone));
