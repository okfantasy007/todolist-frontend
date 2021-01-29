import React, {Component} from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {Layout, Form, Icon, Input, Button, message, notification} from "antd";
import io from 'socket.io-client';
import wsUrl from '@/config';
import request from "@/utils/request";
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import "./index.less";

const FormItem = Form.Item;
const {Content} = Layout;

class LoginForm extends Component {
    constructor() {
        super();
        this.state = {
            submitLoading: false,
            verifyUrl: "/user/fetch_verify_code",
            throwErr: false,
            keycloak: null
        }
    }

    componentWillMount() {
        this.refreshVerifyCode();
    };

    componentDidMount() {
        this.connectSocketJs();
        console.log("测试缓存");
        // eslint-disable-next-line
        var keycloak = new Keycloak({
            url: 'http://10.10.17.41:8080/auth',
            realm: 'demo',
            clientId: 'app1'
        });

        this.setState({
            keycloak
        });

        keycloak.init({
            onLoad: 'check-sso',
            silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html'
        }).success(function (auth) {
            if (auth) {
                console.info('login Authenticated');
                localStorage.setItem('auth', 'true');
                keycloak.loadUserProfile()
                    .then(function (profile) {
                        console.info('Authenticated keycloak');
                        console.info(JSON.stringify(keycloak, null, "  "));
                        console.info('Authenticated loadUserProfile');
                        console.info(JSON.stringify({
                            authenticated: true,
                            ...profile,
                        }, null, "  "));
                    }).catch(function () {
                        alert('Failed to load user profile');
                    });
            } else {
                console.info('login Not Authenticated');
                keycloak.login();
            }
        })
    }

    componentWillReceiveProps(nextProps) {
        console.log("componentWillReceiveProps");
        const {login_result} = nextProps;
        if (login_result !== this.props.login_result) {
            if (login_result.success) {
                message.success("登录成功");
                this.connectMsgCenter(login_result.id);
                localStorage.setItem('userInfo', JSON.stringify(login_result));
                this.props.history.push('/home');
                this.setState({
                    submitLoading: false
                });
            } else if (login_result.success === false) {
                this.setState({
                    submitLoading: false,
                });
                this.refreshVerifyCode();
                message.error(login_result.msg);
                localStorage.clear();
            }
        }
    }

    componentDidUpdate() {

    }

    componentWillUnmount() {
    }

    connectSocketJs = () => {
        // 本例搭配 websocket-spring-demo
        // 可以实现正确连接
        // let socket = new SockJS('http://127.0.0.1:8082/webSocket/webSocketEndPoint');
        let socket = new SockJS('http://39.108.85.75:15674');
        let stompClient = Stomp.over(socket);
        let headers = {
            username: 'admin',
            password: 'admin'
        };
        stompClient.connect(headers, function (frame) {
            console.log('Connected: ' + frame);
            stompClient.subscribe('/topic/demo1/greetings', function (greeting) {

            });
            stompClient.subscribe('/topic/demo1/twoWays', function (greeting) {

            });
        });
    };

    /*
    connectRabbitmqByStomp = () => {
        let ws = new WebSocket('ws://39.108.85.75:15674');
        let client = Stomp.over(ws);
        // let client = Stomp.overWS('ws://39.108.85.75:61614');
        // SockJS does not support heart-beat: disable heart-beats
        client.heartbeat.outgoing = 0;
        client.heartbeat.incoming = 0;
        // Declare on_connect
        let on_connect = function (x) {
            client.subscribe("/queue/hello1", function (d) {
                console.log(d.body);
            });
        };

        // Declare on_error
        let on_error = function () {
            console.log('error');
        };

        // Conect to RabbitMQ
        client.connect('guest', 'guest', on_connect, on_error, '/');
    };
    */

    refreshVerifyCode = () => {
        this.setState({
            verifyUrl: "/user/fetch_verify_code?r=" + Math.random()
        });
    };

    openNotification = (msg) => {
        notification.config({
            placement: 'topRight',
            top: 64,
            duration: 6,
        });

        //只有在非登录或非注册页面，才显示通知消息
        if (window.location.href.indexOf("/register") < 0 && window.location.href.indexOf("/login") < 0) {
            notification['info']({
                message: '温馨提示',
                description: msg,
                onClick: () => {
                    console.log('Notification Clicked!');
                },
            });
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

    toPath = path => {
        this.props.history.push(path);
    };

    handleLogin = (params) => {
        console.log("我点击了登录按钮啊！！！！！！");
        this.setState({
            submitLoading: true
        });
        this.props.login(params);
    };

    handleSubmit = e => {
        e.preventDefault();
        /*this.props.form.validateFields((err, values) => {
            this.setState({
                throwErr: true
            });
            if (!err) {
                this.handleLogin({
                    userName: values.userName,
                    password: values.password,
                    verifyCode: values.verifyCode
                });
            }
        });*/
        const {keycloak} = this.state;
        if (keycloak) {
            keycloak.logout();
            localStorage.removeItem('auth');
        }
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const {submitLoading, verifyUrl} = this.state;
        return (
            <Layout>
                <Content className="login">
                    <div className="login-title">
                        <span className="large-title">TODOLIST</span>
                        <span className="normal-title">V3.0.2</span>
                    </div>
                    <div className="login-form-wrapper">
                        <Form onSubmit={this.handleSubmit} className="login-form">
                            <FormItem>
                                {getFieldDecorator("userName", {
                                    rules: [{required: true, message: "请输入用户名"}]
                                })(
                                    <Input
                                        className="login-input"
                                        prefix={
                                            <Icon type="user" style={{color: "rgba(0,0,0,.25)"}}/>
                                        }
                                        placeholder="用户名"
                                    />
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator("password", {
                                    rules: [{required: true, message: "请输入密码"}]
                                })(
                                    <Input
                                        className="login-input"
                                        prefix={
                                            <Icon type="lock" style={{color: "rgba(0,0,0,.25)"}}/>
                                        }
                                        type="password"
                                        placeholder="密码"
                                    />
                                )}
                            </FormItem>
                            <FormItem style={{display: 'inline-block'}} className={"password-len"}>
                                {getFieldDecorator("verifyCode", {
                                    rules: [{required: true, message: "请输入验证码"}]
                                })(
                                    <Input
                                        className="login-input"
                                        prefix={
                                            <i style={{fontSize: 14, fontWeight: 900, color: "rgba(0,0,0,.25)"}}
                                               className="iconfont icon-yanzhengma2"
                                            ></i>
                                            // <Icon type="lock" style={{color: "rgba(0,0,0,.25)"}}/>
                                        }
                                        placeholder="验证码"
                                    />
                                )}
                            </FormItem>
                            <FormItem style={{display: 'inline-block'}}>
                                <img src={verifyUrl} height={40} style={{cursor: "pointer"}} alt="captcha"
                                     onClick={this.refreshVerifyCode}/>
                            </FormItem>
                            <FormItem>
                                <Button
                                    type="primary"
                                    className="login-form-button"
                                    htmlType="submit"
                                    loading={submitLoading}
                                >
                                    退出登录
                                </Button>
                                <Button
                                    type="primary"
                                    className="register-button"
                                    onClick={() => this.toPath("/register")}
                                >
                                    去注册
                                </Button>
                            </FormItem>
                        </Form>
                    </div>
                </Content>
            </Layout>
        );
    }
}

//映射state到容器组件props
const mapStateToProps = state => ({
    login_result: state.login_result,
});

//映射dispatch到容器组件props
const mapDispatchToProps = dispatch => ({
    login: param => {
        dispatch({
            type: 'login',
            payload: param
        });
    }
});

const Login = Form.create()(LoginForm);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Login));