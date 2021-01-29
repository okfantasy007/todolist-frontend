import React, {Component} from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {Layout, Form, Icon, Input, Button, message, Radio} from "antd";
import "./index.less";

const FormItem = Form.Item;
const {Content} = Layout;

const RadioGroup = Radio.Group;

var timer = null;

class RegisterForm extends Component {
    constructor() {
        super();
        this.state = {
            timerCount: 5,
            gender: '1',
            tipText: ""
        }
    }

    componentWillMount() {
    };

    componentDidMount() {
        if (localStorage.getItem('auth')) {
            console.info('register Authenticated');
        } else {
            console.info('register Not Authenticated');
        }
        // eslint-disable-next-line
        /*var keycloak = new Keycloak({
            url: 'http://10.10.17.41:8080/auth',
            realm: 'demo',
            clientId: 'app1'
        });

        keycloak.init({
            onLoad: 'check-sso',
            silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html'
        }).success(function (auth) {
            if (auth) {
                console.info('register Authenticated');
            } else {
                console.info('register Not Authenticated');
                // keycloak.login();
            }
        })*/
    }

    componentWillReceiveProps(nextProps) {
        console.log("componentWillReceiveProps");
        if (nextProps.register_result !== this.props.register_result) {
            const {register_result} = nextProps;
            if (register_result.success) {
                message.success("注册成功");
                timer = setInterval(() => {
                    if (this.state.timerCount < 2) {
                        clearInterval(timer);
                        this.props.history.push('/');
                        return;
                    }
                    this.setState({
                        tipText: this.state.timerCount + '秒后将为您跳转至登录页',
                        timerCount: this.state.timerCount - 1
                    });
                }, 1000);
            } else if (register_result.success === false) {
                message.error(register_result.msg);
            }
        }
    }

    componentDidUpdate() {

    }

    componentWillUnmount() {
        console.log("componentWillUnmount");
        timer = null;
    }

    toPath = path => {
        this.props.history.push(path);
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const {register} = this.props;
                register(values);
            }
        });
    };

    render() {
        const {timerCount} = this.state;
        const {getFieldDecorator} = this.props.form;
        return (
            <Layout style={{overflowY: 'hidden'}}>
                <Content className="register1">
                    <div className="register-title">
                        <span className="large-title">TODOLIST</span>
                        <span className="normal-title">注册</span>
                    </div>
                    <div style={{textAlign: 'center', height: 21, margin: '20px auto'}}>
                        {timer ?
                            <span><span style={{color: 'green', fontWeight: 'bold', marginRight: 3}}>{timerCount}</span>秒后将为您跳转至登录页</span> : ""}
                    </div>
                    <div className="register-form-wrapper">
                        <Form onSubmit={this.handleSubmit} className="register-form">
                            <FormItem>
                                {getFieldDecorator("userName", {
                                    rules: [{required: true, message: "请输入用户名"}]
                                })(
                                    <Input
                                        className="register-input"
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
                                        className="register-input"
                                        prefix={
                                            <Icon type="lock" style={{color: "rgba(0,0,0,.25)"}}/>
                                        }
                                        type="password"
                                        placeholder="密码"
                                    />
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator("telephone", {
                                    rules: [{
                                        validator: (rule, value, callback) => {
                                            if (value && !(/^1[34578]\d{9}$/.test(value))) {
                                                callback('请输入正确的手机号码');
                                            } else {
                                                callback();
                                            }
                                        }
                                    }]
                                })(
                                    <Input
                                        className="register-input"
                                        prefix={
                                            <Icon type="mobile" style={{color: "rgba(0,0,0,.25)"}}/>
                                        }
                                        placeholder="手机号码"
                                    />
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator("wechat", {})(
                                    <Input
                                        className="register-input"
                                        prefix={
                                            <Icon type="wechat" style={{color: "rgba(0,0,0,.25)"}}/>
                                        }
                                        placeholder="微信"
                                    />
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator("email", {
                                    rules: [{
                                        type: 'email', message: '请输入正确格式的邮箱',
                                    }],
                                })(
                                    <Input
                                        className="register-input"
                                        prefix={
                                            <Icon type="mail" style={{color: "rgba(0,0,0,.25)"}}/>
                                        }
                                        placeholder="邮箱"
                                    />
                                )}
                            </FormItem>
                            <FormItem style={{display: 'inline-block', width: '49.5%'}}>
                                {getFieldDecorator("gender", {
                                    initialValue: '1'
                                })(
                                    <div>
                                        <span style={{marginRight: 15}}>性别</span>
                                        <RadioGroup defaultValue={'1'}>
                                            <Radio value={'1'}>男</Radio>
                                            <Radio value={'2'}>女</Radio>
                                        </RadioGroup>
                                    </div>
                                )}
                            </FormItem>
                            <div style={{display: 'inline-block', width: '1%', paddingTop: 9, color: '#bfbfbf'}}>|</div>
                            <FormItem style={{display: 'inline-block', width: '49.5%'}}>
                                {getFieldDecorator("adminFlag", {
                                    initialValue: '2'
                                })(
                                    <div style={{textAlign: 'right'}}>
                                        <span style={{marginRight: 15}}>角色</span>
                                        <RadioGroup defaultValue={'2'}>
                                            <Radio value={'1'}>管理员</Radio>
                                            <Radio value={'2'}>普通</Radio>
                                        </RadioGroup>
                                    </div>
                                )}
                            </FormItem>
                            <FormItem>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="register-form-button"
                                >
                                    注册
                                </Button>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="goto-login-button"
                                    onClick={() => this.toPath("/")}
                                >
                                    返回登录页
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
    register_result: state.register_result
});

//映射dispatch到容器组件props
const mapDispatchToProps = dispatch => ({
    register: param => {
        dispatch({
            type: 'register',
            payload: param
        });
    }
});

const Register = Form.create()(RegisterForm);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Register));
