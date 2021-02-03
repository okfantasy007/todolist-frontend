import React, {Component} from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {Layout, Form, Icon, Input, Button, message} from "antd";
import request from "@/utils/request";
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
            silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
            pkceMethod: 'S256',
        }).success(function (auth) {
            if (auth) {
                console.info('login Authenticated');
                localStorage.setItem('auth', 'true');
                window.keycloak = keycloak;
                keycloak.loadUserProfile()
                    .then(function (profile) {
                        console.info('Authenticated keycloak');
                        console.info(JSON.stringify(keycloak, null, "  "));
                        localStorage.setItem('token', keycloak.token);
                        console.info('Authenticated loadUserProfile');
                        console.info(JSON.stringify({
                            authenticated: true,
                            ...profile,
                        }, null, "  "));
                    }).catch(function () {
                    alert('Failed to load user profile');
                });
                var data = {
                    message: 'sth to iframe1'
                };
                // 给子页面发送消息
                document.getElementById('iframe1').contentWindow.postMessage(data, "*");
                window.addEventListener('message', function (e) {
                    console.log(e);
                }, false);
                keycloak.onAuthLogout = function () {
                    console.info('listend onAuthLogout');
                    localStorage.removeItem('auth');
                    keycloak.logout();
                    keycloak.clearToken();
                }
            } else {
                console.info('login Not Authenticated');
                keycloak.login();
            }
        });
    }

    componentDidUpdate() {}

    componentWillUnmount() {}

    refreshVerifyCode = () => {
        this.setState({
            verifyUrl: "/user/fetch_verify_code?r=" + Math.random()
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
        const {keycloak} = this.state;
        if (keycloak) {
            keycloak.logout();
            keycloak.clearToken();
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
                        <span className="large-title">TODOLIST 111</span>
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