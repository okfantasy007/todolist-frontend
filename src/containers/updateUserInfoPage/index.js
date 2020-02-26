import React, {Component} from "react";
import "./index.less";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {Icon, Form, Input, Radio, message, Modal} from "antd";

const FormItem = Form.Item;

const RadioGroup = Radio.Group;

const defaultPageSize = 5;

class UpdateUserInfoPageForm extends Component {
	constructor() {
		super();
		this.state = {
			initialValue: {},
			submitValue: {},
			secondsToGo: 5,
			modalVisible: false,
			tipText: ""
		};
	}

	componentWillMount() {
		const {initialValues} = this.props;
		this.setState({
			initialValue: initialValues
		});
	}

	componentDidMount() {
		console.log("updateUserInfoPage componentDidMount");
		this.props.fetchUpdateUserInfoModalFuncs({
			handleSubmit: this.handleSubmit
		});
	}

	componentWillReceiveProps(nextProps) {
		const {update_user_info_result} = nextProps;
		if (update_user_info_result.success !== this.props.update_user_info_result.success) {
			if (update_user_info_result.success) {
				const {submitValue} = this.state;
				const {initialValues, hideModal, fetchOwnerList, setPageNo, showReLoginModal} = this.props;
				message.success("修改成功");
				hideModal();

				if (update_user_info_result.relogin) {
					return showReLoginModal("检测到您的密码有变更，");
				}

				fetchOwnerList({
					pageNo: 1,
					pageSize: defaultPageSize
				});
				setPageNo(1, 1);
				if (submitValue.userName !== initialValues.user_name) {
					return showReLoginModal("检测到您的用户名有变更，");
				}
				if (initialValues.admin_flag === '1' && submitValue.adminFlag !== initialValues.admin_flag) {
					return showReLoginModal("检测到您的角色有变更，");
				}
			} else if (update_user_info_result.success === false) {
				message.error(update_user_info_result.msg || "修改失败");
			}
		}
	}


	toPath = path => {
		this.props.history.push(path);
	};

	handleSubmit = () => {
		this.props.form.validateFields((err, values) => {
			if (!err) {
				const {updateUserInfo} = this.props;
				const {initialValue} = this.state;
				//首先判断旧密码是否正确
				// if (values.oldPassword !== initialValue.password) {
				//   return message.warning("旧密码错误");
				// } else {
				//   //如果新密码不为空，说明用户不修改密码
				//   if (values.newPassword && values.oldPassword === values.newPassword) {
				//     return message.warning("新密码不能与旧密码相同");
				//   }
				// }
				this.setState({
					submitValue: values
				});
				values.id = initialValue.id;
				updateUserInfo(values);
			}
		});
	};

	render() {
		const {initialValue, modalVisible, tipText} = this.state;
		const {getFieldDecorator} = this.props.form;
		return (
			<div>
				<Form className="register-form">
					<FormItem>
						{getFieldDecorator("userName", {
							initialValue: initialValue.user_name,
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
						{getFieldDecorator("oldPassword", {
							//initialValue: initialValue.password,
							rules: [{required: true, message: "请输入旧密码"}]
						})(
							<Input
								className="register-input"
								prefix={
									<Icon type="lock" style={{color: "rgba(0,0,0,.25)"}}/>
								}
								type="password"
								placeholder="旧密码"
							/>
						)}
					</FormItem>
					<FormItem>
						{getFieldDecorator("newPassword", {
							// initialValue: initialValue.password,
							// rules: [{required: true, message: "请输入新密码"}]
						})(
							<Input
								className="register-input"
								prefix={
									<Icon type="lock" style={{color: "rgba(0,0,0,.25)"}}/>
								}
								type="password"
								placeholder="新密码"
							/>
						)}
					</FormItem>
					<FormItem>
						{getFieldDecorator("telephone", {
							initialValue: initialValue.telephone,
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
						{getFieldDecorator("wechat", {
							initialValue: initialValue.wechat,
						})(
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
							initialValue: initialValue.email,
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
							initialValue: initialValue.gender,
						})(
							<div>
								<span style={{marginRight: 15}}>性别</span>
								<RadioGroup defaultValue={initialValue.gender}>
									<Radio value={'1'}>男</Radio>
									<Radio value={'2'}>女</Radio>
								</RadioGroup>
							</div>
						)}
					</FormItem>
					{
						initialValue.admin_flag === '1' &&
						(
							<span>
                <div style={{display: 'inline-block', width: '1%', paddingTop: 9, color: '#bfbfbf'}}>|</div>
                <FormItem style={{display: 'inline-block', width: '49.5%'}}>
                  {getFieldDecorator("adminFlag", {
										initialValue: initialValue.admin_flag,
									})(
										<div style={{textAlign: 'right'}}>
											<span style={{marginRight: 15}}>角色</span>
											<RadioGroup defaultValue={initialValue.admin_flag}>
												<Radio value={'1'}>管理员</Radio>
												<Radio value={'2'}>普通</Radio>
											</RadioGroup>
										</div>
									)}
                </FormItem>
              </span>
						)
					}
				</Form>
				<Modal
					title="确认"
					visible={modalVisible}
					maskClosable={false}
					footer={null}
					closable={false}
				>
					{tipText}
				</Modal>
			</div>
		);
	}
}

//映射state到容器组件props
const mapStateToProps = state => ({
	update_user_info_result: state.update_user_info_result
});

//映射dispatch到容器组件props
const mapDispatchToProps = dispatch => ({
	updateUserInfo: param => {
		dispatch({
			type: 'update_user_info',
			payload: param
		});
	},
});

const UpdateUserInfoPage = Form.create()(UpdateUserInfoPageForm);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(UpdateUserInfoPage));
