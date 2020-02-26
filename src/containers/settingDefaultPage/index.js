import React, {Component} from "react";
import "./index.less";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {message, Table, Modal, Tooltip} from "antd";
import UpdateUserInfoPage from '@/containers/updateUserInfoPage';

const defaultPageSize = 5;

class SettingDefaultPage extends Component {
  constructor() {
    super();
    this.state = {
      ownerCurrent: 1,
      ownerTotal: 0,
      ownerItems: [],
      userAdminOtherCurrent: 1,
      userAdminOtherTotal: 0,
      userAdminOtherItems: [],
      modalVisible: false,
      updateUserInfoModalFuncs: null,
      initialValues: {},
      selectedRowKeys: [],
      selectedTaskIdsStr: "",
      deleteFlag: "",
      deleteSureModalVisible: false,
      reloginModalVisible: false,
      reloginTipText: "检测到用户敏感信息变化...",
      secondsToGo: 5,
			deleteUser: {},
      deleteUserId: "",
			switchSureModalVisible: false,
			switchAdminUserId: "",
			switchAdminUserName: ""
    };
  }

  componentDidMount() {
    const userInfo = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : {};
    const {fetchOwnerList, fetchUserAdminOtherList} = this.props;
    fetchOwnerList({
      pageNo: 1,
      pageSize: defaultPageSize
    });
    userInfo && userInfo.admin_flag === '1' && fetchUserAdminOtherList({
      pageNo: 1,
      pageSize: defaultPageSize
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.fetch_owner_list_result !== this.props.fetch_owner_list_result) {
      const {fetch_owner_list_result} = nextProps;
      if (fetch_owner_list_result.success) {
				let list = fetch_owner_list_result.items;
				if (fetch_owner_list_result.items && fetch_owner_list_result.items.length > 0) {
					for (let i = 0; i < list.length; i++) {
						list[i].key = i;
					}
				}
				this.setState({
					ownerItems: list,
					ownerTotal: fetch_owner_list_result.totalCount,
				});
			}
    }

    if (nextProps.fetch_user_admin_other_list_result !== this.props.fetch_user_admin_other_list_result) {
      const {fetch_user_admin_other_list_result} = nextProps;
      if (fetch_user_admin_other_list_result.success) {
				let list = fetch_user_admin_other_list_result.items;
				if (list && list.length > 0) {
					for (let i = 0; i < list.length; i++) {
						list[i].key = i;
					}
				}
				this.setState({
					userAdminOtherItems: list,
					userAdminOtherTotal: fetch_user_admin_other_list_result.totalCount,
					selectedRowKeys: []
				});
			}
    }

    if (nextProps.delete_user_accounts_result.success !== this.props.delete_user_accounts_result.success) {
      const {delete_user_accounts_result, fetchUserAdminOtherList} = nextProps;
      if (delete_user_accounts_result.success === true) {
        message.success("删除成功");
        fetchUserAdminOtherList({
          pageNo: 1,
          pageSize: defaultPageSize
        });
        this.setPageNo(1, 2);
      } else if (delete_user_accounts_result.success === false) {
        message.error(delete_user_accounts_result.msg || "删除失败");
      }
    }

    if (nextProps.default_update_user_info_result.success !== this.props.default_update_user_info_result.success) {
      const {default_update_user_info_result} = nextProps;
      const {fetchUserAdminOtherList} = this.props;
      const {userAdminOtherCurrent} = this.state;
      if (default_update_user_info_result.success === true) {
        message.success("切换成功");
        fetchUserAdminOtherList({
          pageNo: userAdminOtherCurrent,
          pageSize: defaultPageSize
        });
      } else if (default_update_user_info_result.success === false) {
        message.error("切换失败");
      }
    }
  }

  handlePageNoChange = (pageNo, type) => {
    const {
      fetchOwnerList,
      fetchUserAdminOtherList,
    } = this.props;
    if (type === 1) {
      fetchOwnerList({
        pageNo,
        pageSize: defaultPageSize
      });
      this.setState({
        ownCurrent: pageNo
      });
    } else if (type === 2) {
      fetchUserAdminOtherList({
        pageNo,
        pageSize: defaultPageSize
      });
      this.setState({
        userAdminOtherCurrent: pageNo
      });
    }
  };

  hideModal = () => {
    this.setState({
      modalVisible: !this.state.modalVisible
    });
  };

  handleModalOk = () => {
    const {updateUserInfoModalFuncs} = this.state;
    updateUserInfoModalFuncs && updateUserInfoModalFuncs.handleSubmit();
  };

  fetchUpdateUserInfoModalFuncs = (updateUserInfoModalFuncs) => {
    this.setState({
      updateUserInfoModalFuncs
    });
  };

  updateUserInfo = (userInfo) => {
    this.setState({
      initialValues: userInfo,
      modalVisible: !this.state.modalVisible
    });
  };

  showDeleteSureModal = (user) => {
    this.setState({
			deleteUser: user,
      deleteSureModalVisible: !this.state.deleteSureModalVisible
    });
  };

  hideDeleteSureModal = () => {
    this.setState({
      deleteSureModalVisible: !this.state.deleteSureModalVisible
    });
  };

  handleDeleteSureModalOk = () => {
    this.setState({
      deleteSureModalVisible: !this.state.deleteSureModalVisible
    });
    this.deleteUser();
  };

  deleteUser = () => {
    const {deleteUser} = this.state;
    const {deleteUserAccounts} = this.props;
    deleteUserAccounts({
      id: deleteUser.id,
			userName: deleteUser.user_name
    });
  };

  setPageNo = (pageNo, type) => {
    //获取自己的用户信息列表
    if (type === 1) {
      this.setState({
        ownerCurrent: pageNo
      });
    } else if (type === 2) {//获取其他同事的用户信息列表
      this.setState({
        userAdminOtherCurrent: pageNo
      });
    }
  };

  showReLoginModal = (text) => {
    this.setState({
      reloginModalVisible: !this.state.reloginModalVisible
    }, () => {
      let timer = setInterval(() => {
        if (this.state.secondsToGo < 1) {
          clearInterval(timer);
          this.setState({
            reloginModalVisible: !this.state.reloginModalVisible
          }, () => {
            this.props.history.push('/login');
          });
          return;
        }
        this.setState({
          reloginTipText: text + this.state.secondsToGo + '秒后将为您跳转至登录页',
          secondsToGo: this.state.secondsToGo - 1
        });
      }, 1000);
    });
  };

  switchAdminSureModal = (user) => {
  	const {switchSureModalVisible} = this.state;
  	this.setState({
			switchAdminUserId: user.id,
			switchAdminUserName: user.user_name,
			switchSureModalVisible: !switchSureModalVisible
		});
  };

	hideSwitchSureModal = () => {
		this.setState({
			switchAdminUserId: "",
			switchAdminUserName: "",
			switchSureModalVisible: !this.state.switchSureModalVisible
		});
	};

	handleSwitchSureModalOk = () => {
		this.setState({
			switchSureModalVisible: !this.state.switchSureModalVisible
		});
		this.switchAdminRole();
	};

  switchAdminRole = () => {
  	const {switchAdminUserId} = this.state;
		const {updateUserInfo} = this.props;
		updateUserInfo({
			id: switchAdminUserId,
			adminFlag: '1'
		});
	};

  render() {
    const userInfo = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : {};
    const {
      ownerItems,
      userAdminOtherCurrent, userAdminOtherTotal, userAdminOtherItems,
      modalVisible,
      initialValues, reloginModalVisible, reloginTipText,
      deleteSureModalVisible,
			deleteUser,
			switchSureModalVisible,
			switchAdminUserName
    } = this.state;

    const {fetchOwnerList, fetchUserAdminOtherList} = this.props;

    /*
    `id` int(32) NOT NULL AUTO_INCREMENT,
    `user_name` varchar(255) NOT NULL,
    `password` varchar(255) NOT NULL,
    `gender` enum('1','2') DEFAULT '1',
    `telephone` varchar(255) DEFAULT NULL,
    `wechat` varchar(255) DEFAULT NULL,
    `email` varchar(255) DEFAULT NULL,
    `register_time` timestamp NULL DEFAULT NULL,
    `update_time` timestamp NULL DEFAULT NULL,
    `last_login_time` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    `admin_flag` enum('1','2') DEFAULT '2',
     */

    const columns = [{
      title: '用户名',
      dataIndex: 'user_name',
      key: 'user_name',
      width: '9%',
    }, {
      title: '性别',
      dataIndex: 'gender',
      key: 'gender',
      width: '7%',
      render: (text, record, index) => (
        record.gender === '1' ? '男' : '女'
      )
    }, {
      title: '手机号码',
      dataIndex: 'telephone',
      key: 'telephone',
      width: '12%',
    }, {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
      width: '13%',
    }, {
      title: '注册时间',
      dataIndex: 'register_time',
      key: 'register_time',
      width: '13%',
    }, {
      title: '最近修改时间',
      dataIndex: 'update_time',
      key: 'update_time',
      width: '13%',
    }, {
      title: '最近登陆时间',
      dataIndex: 'last_login_time',
      key: 'last_login_time',
      width: '13%',
    }, {
      title: '角色',
      dataIndex: 'admin_flag',
      key: 'admin_flag',
      width: '10%',
      render: (text, record, index) => (
        record.admin_flag === '1' ? '管理员' : '普通'
      )
    }, {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      width: '10%',
      render: (text, record, index) => (
        <div>
          {
            userInfo.admin_flag === '1' && record.admin_flag === '2' &&
            <Tooltip placement="top" title="切换为管理员角色">
              <i style={{fontSize: 20}} className="iconfont icon-web-icon- todolist-icon" onClick={() => this.switchAdminSureModal(record)}></i>
            </Tooltip>
          }
          {
            userInfo.id === record.id &&
            <Tooltip placement="top" title="修改">
              <i style={{fontSize: 20}} className="iconfont icon-bianji todolist-icon" onClick={(e) => {
                this.updateUserInfo(ownerItems[index]);
              }}></i>
            </Tooltip>
          }
          {
            userInfo.id !== record.id && record.admin_flag === '2' &&
            <i style={{fontSize: 20}} className="iconfont icon-shanchu todolist-delete-icon"
               onClick={(e) => {
                 this.showDeleteSureModal(record);
               }}>
            </i>
          }
        </div>
      )
    }];

    return (
      <div className="setting-default">
        <div style={{marginBottom: 20}}>
          <h1 className="under-border">我的用户信息</h1>
          <Table
            style={{
              background: "#fff"
            }}
            columns={columns}
            dataSource={
              ownerItems
            }
            pagination={false}
            // pagination={{
            //   pageSize: defaultPageSize,
            //   current: ownerCurrent,
            //   total: ownerTotal,
            //   onChange: (pageNo) => this.handlePageNoChange(pageNo, 1)
            // }}
          ></Table>
        </div>
        {
          userInfo.admin_flag === '1' && <div>
            <h1 className="under-border">其他同事的用户信息</h1>
            <Table
              style={{
                background: "#fff"
              }}
              columns={columns}
              dataSource={userAdminOtherItems}
              pagination={{
                pageSize: defaultPageSize,
                current: userAdminOtherCurrent,
                total: userAdminOtherTotal,
                onChange: (pageNo) => this.handlePageNoChange(pageNo, 2)
              }}
            ></Table>
          </div>
        }
        {
          modalVisible &&
          <Modal
            title="修改用户信息"
            visible={modalVisible}
            maskClosable={false}
            onOk={this.handleModalOk}
            onCancel={this.hideModal}
            okText="保存"
            cancelText="取消"
          >
            <UpdateUserInfoPage
              initialValues={initialValues}
              fetchUpdateUserInfoModalFuncs={(updateUserInfoModalFuncs) => this.fetchUpdateUserInfoModalFuncs(updateUserInfoModalFuncs)}
              fetchOwnerList={(params) => fetchOwnerList(params)}
              fetchUserAdminOtherList={(params) => fetchUserAdminOtherList(params)}
              setPageNo={(pageNo, type) => this.setPageNo(pageNo, type)}
              showReLoginModal={(text) => this.showReLoginModal(text)}
              handleModalOk={this.handleModalOk}
              hideModal={this.hideModal}
            />
          </Modal>
        }
        <Modal
          title="温馨提醒"
          visible={reloginModalVisible}
          maskClosable={false}
          footer={null}
          closable={false}
					className="delete-sure"
        >
          {reloginTipText}
        </Modal>
        <Modal
          title="确认"
          visible={deleteSureModalVisible}
          maskClosable={false}
          onOk={this.handleDeleteSureModalOk}
          onCancel={this.hideDeleteSureModal}
          okText="确定"
          cancelText="取消"
					className="delete-sure"
        >
					{
						deleteUser.id ? `确定要删除当前用户账号（${deleteUser.user_name}）？`:"确定要删除当前用户账号？"
					}
        </Modal>
				<Modal
					title="确认"
					visible={switchSureModalVisible}
					maskClosable={false}
					onOk={this.handleSwitchSureModalOk}
					onCancel={this.hideSwitchSureModal}
					okText="确定"
					cancelText="取消"
					className="delete-sure"
				>
					{
						switchAdminUserName ? `确定将该账号（${switchAdminUserName}）切换为管理员角色？`:"确定将该账号切换为管理员角色？"
					}
				</Modal>
      </div>
    );
  }
}

//映射state到容器组件props
const mapStateToProps = state => ({
  fetch_owner_list_result: state.fetch_owner_list_result,
  fetch_user_admin_other_list_result: state.fetch_user_admin_other_list_result,
  delete_user_accounts_result: state.delete_user_accounts_result,
  default_update_user_info_result: state.default_update_user_info_result
});

//映射dispatch到容器组件props
const mapDispatchToProps = dispatch => ({
  fetchOwnerList: param => {
    dispatch({
      type: 'fetch_owner_list',
      payload: param
    });
  },
  fetchUserAdminOtherList: param => {
    dispatch({
      type: 'fetch_user_admin_other_list',
      payload: param
    });
  },
  deleteUserAccounts: param => {
    dispatch({
      type: 'delete_user_accounts',
      payload: param
    });
  },
  updateUserInfo: param => {
    dispatch({
      type: 'default_update_user_info',
      payload: param
    });
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SettingDefaultPage));
