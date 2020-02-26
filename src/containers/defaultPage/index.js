import React, {Component} from "react";
import "./index.less";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {message, Table, Modal, Tooltip} from "antd";
import AddTaskPage from '@/containers/addTaskPage';
import redCirclePath from '@/assets/images/red-circle.png';
import orangeCirclePath from '@/assets/images/orange-circle.png';
import greenCirclePath from '@/assets/images/green-circle.png';

const defaultPageSize = 5;

class DeFaultPage extends Component {
  constructor() {
    super();
    this.state = {
      unfinishedCurrent: 1,
      unfinishedTotal: 0,
      unfinishedItems: [],
      finishedCurrent: 1,
      finishedTotal: 0,
      finishedItems: [],
      adminOtherCurrent: 1,
      adminOtherTotal: 0,
      adminOtherItems: [],
      modalVisible: false,
      addTaskModalFuncs: null,
      initialValues: {},
      editFlag: "add",
      selectedRowKeys1: [],
      selectedRowKeys2: [],
      selectedTaskIdsStr1: "",
      selectedTaskIdsStr2: "",
      deleteFlag: "",
      deleteSureModalVisible: false,
			markSureModalVisible: false,
			markTaskInfo: {}
    };
  }

  componentDidMount() {
    const userInfo = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : {};
    const {fetchUnfinishedList, fetchFinishedList, fetchAdminOtherList} = this.props;
    fetchUnfinishedList({
      pageNo: 1,
      pageSize: defaultPageSize
    });
    fetchFinishedList({
      pageNo: 1,
      pageSize: defaultPageSize
    });
    userInfo && userInfo.admin_flag === '1' && fetchAdminOtherList({
      pageNo: 1,
      pageSize: defaultPageSize
    });
    console.log("测试jenkins");
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.fetch_unfinished_list_result !== this.props.fetch_unfinished_list_result) {
      const {fetch_unfinished_list_result} = nextProps;
      if (fetch_unfinished_list_result.success) {
				let list = fetch_unfinished_list_result.items;
				if (fetch_unfinished_list_result.items && fetch_unfinished_list_result.items.length > 0) {
					for (let i = 0; i < list.length; i++) {
						list[i].key = i;
					}
				}
				this.setState({
					unfinishedItems: list,
					unfinishedTotal: fetch_unfinished_list_result.totalCount,
					selectedRowKeys1: [],
					selectedRowKeys2: []
				});
			}
    }

    if (nextProps.fetch_finished_list_result !== this.props.fetch_finished_list_result) {
      const {fetch_finished_list_result} = nextProps;
      if (fetch_finished_list_result.success) {
				let list = fetch_finished_list_result.items;
				if (list && list.length > 0) {
					for (let i = 0; i < list.length; i++) {
						list[i].key = i;
					}
				}
				this.setState({
					finishedItems: list,
					finishedTotal: fetch_finished_list_result.totalCount,
					selectedRowKeys1: [],
					selectedRowKeys2: []
				});
			}
    }

    if (nextProps.fetch_admin_other_list_result !== this.props.fetch_admin_other_list_result) {
      const {fetch_admin_other_list_result} = nextProps;
      if (fetch_admin_other_list_result.success) {
				let list = fetch_admin_other_list_result.items;
				if (list && list.length > 0) {
					for (let i = 0; i < list.length; i++) {
						list[i].key = i;
					}
				}
				this.setState({
					adminOtherItems: list,
					adminOtherTotal: fetch_admin_other_list_result.totalCount
				});
			}
    }

    if (nextProps.delete_tasks_result.success !== this.props.delete_tasks_result.success) {
      const {delete_tasks_result, fetchUnfinishedList, fetchFinishedList} = nextProps;
      const {deleteFlag} = this.state;
      if (delete_tasks_result.success === true) {
        message.success("删除成功");
        if (deleteFlag === "unfinished") {
          fetchUnfinishedList({
            pageNo: 1,
            pageSize: defaultPageSize
          });
          this.setPageNo(1, 1);
          this.setState({
            selectedRowKeys1: []
          });
        } else if (deleteFlag === "finished") {
          fetchFinishedList({
            pageNo: 1,
            pageSize: defaultPageSize
          });
          this.setPageNo(1, 2);
          this.setState({
            selectedRowKeys2: []
          });
        }
      } else if (delete_tasks_result.success === false) {
        message.error(delete_tasks_result.msg || "删除失败");
      }
    }

    if (nextProps.default_update_task_result.success !== this.props.default_update_task_result.success) {
      const {default_update_task_result, fetchUnfinishedList, fetchFinishedList} = nextProps;
      if (default_update_task_result.success === true) {
        message.success("标记成功");
        fetchUnfinishedList({
          pageNo: 1,
          pageSize: defaultPageSize
        });
        fetchFinishedList({
          pageNo: 1,
          pageSize: defaultPageSize
        });
        this.setPageNo(1, 1);
        this.setState({
          selectedRowKeys1: [],
          selectedRowKeys2: []
        });
        this.setPageNo(1, 2);
      } else if (default_update_task_result.success === false) {
        message.error("标记失败");
      }
    }
  }

  handlePageNoChange = (pageNo, type) => {
    const {
      fetchUnfinishedList,
      fetchFinishedList,
      fetchAdminOtherList
    } = this.props;
    if (type === 1) {
      fetchUnfinishedList({
        pageNo,
        pageSize: defaultPageSize
      });
      this.setState({
        unfinishedCurrent: pageNo
      });
    } else if (type === 2) {
      fetchFinishedList({
        pageNo,
        pageSize: defaultPageSize
      });
      this.setState({
        finishedCurrent: pageNo
      });
    } else if (type === 3) {
      fetchAdminOtherList({
        pageNo,
        pageSize: defaultPageSize
      });
      this.setState({
        adminOtherCurrent: pageNo
      });
    }
  };

  hideModal = () => {
    this.setState({
      modalVisible: !this.state.modalVisible
    });
  };

  handleModalOk = () => {
    const {addTaskModalFuncs} = this.state;
    addTaskModalFuncs && addTaskModalFuncs.handleSubmit();
  };

  fetchAddTaskModalFuncs = (addTaskModalFuncs) => {
    this.setState({
      addTaskModalFuncs
    });
  };

  addTask = () => {
    this.setState({
      editFlag: "add",
      initialValues: {},
      modalVisible: !this.state.modalVisible
    })
  };

  updateTask = (task) => {
    this.setState({
      editFlag: "update",
      initialValues: task,
      modalVisible: !this.state.modalVisible
    });
  };

  showDeleteSureModal = (type) => {
    const {selectedTaskIdsStr1, selectedTaskIdsStr2} = this.state;
    if (type === 1) {
      if (!selectedTaskIdsStr1) {
        message.info("请至少勾选一条记录");
      } else {
        this.setState({
          deleteFlag: "unfinished",
          deleteSureModalVisible: !this.state.deleteSureModalVisible
        });
      }
    } else if (type === 2) {
      if (!selectedTaskIdsStr2) {
        message.info("请至少勾选一条记录");
      } else {
        this.setState({
          deleteFlag: "finished",
          deleteSureModalVisible: !this.state.deleteSureModalVisible
        });
      }
    }
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
    this.deleteTasks();
  };

  deleteTasks = () => {
    const {selectedTaskIdsStr1, selectedTaskIdsStr2, deleteFlag} = this.state;
    const {deleteTasks} = this.props;
    if (deleteFlag === "unfinished") {
      if (!selectedTaskIdsStr1) {
        message.info("请至少勾选一条记录");
      } else {
        // this.setState({
        //   deleteFlag: "unfinished"
        // });
        deleteTasks({
          id: selectedTaskIdsStr1
        });
      }
    } else if (deleteFlag === "finished") {
      if (!selectedTaskIdsStr2) {
        message.info("请至少勾选一条记录");
      } else {
        // this.setState({
        //   deleteFlag: "finished"
        // });
        deleteTasks({
          id: selectedTaskIdsStr2
        });
      }
    }
  };

  setPageNo = (pageNo, type) => {
    //获取未完成任务列表
    if (type === 1) {
      this.setState({
        unfinishedCurrent: pageNo
      });
    } else if (type === 2) {//获取已完成任务列表
      this.setState({
        finishedCurrent: pageNo
      });
    }
  };

  fetchSelectedTaskIdsStrByRowIds = (selectedRows, type) => {
    let selectedTaskIds = [];
    if (selectedRows && selectedRows.length > 0) {
      selectedTaskIds = selectedRows.map((item, index) => {
        return item.id;
      });
    }
    let selectedTaskIdsStr = "";
    if (selectedTaskIds.length > 0) {
      selectedTaskIdsStr = selectedTaskIds.join(",");
    }
    if (type === 1) {
      this.setState({
        selectedTaskIdsStr1: selectedTaskIdsStr
      }, () => {
        console.log('this.state.selectedTaskIdsStr1', this.state.selectedTaskIdsStr1);
      });
    } else if (type === 2) {
      this.setState({
        selectedTaskIdsStr2: selectedTaskIdsStr
      }, () => {
        console.log('this.state.selectedTaskIdsStr2', this.state.selectedTaskIdsStr2);
      });
    }
  };

  onSelectChange = (selectedRowKeys, selectedRows, type) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    console.log('type: ', type);
    if (type === 1) {
      this.setState({
        selectedRowKeys1: selectedRowKeys
      });
    } else if (type === 2) {
      this.setState({
        selectedRowKeys2: selectedRowKeys
      });
    }
    this.fetchSelectedTaskIdsStrByRowIds(selectedRows, type);
  };

	hideMarkSureModal = () => {
		this.setState({
			markSureModalVisible: !this.state.markSureModalVisible
		});
	};

	handleMarkSureModalOk = () => {
		this.setState({
			markSureModalVisible: !this.state.markSureModalVisible
		});
		this.markFinished();
	};

	showMarkSureModal = (task) => {
		task.taskStatus = '1';
		task.taskTitle = task.task_title;
		this.setState({
			markTaskInfo: task,
			markSureModalVisible: !this.state.markSureModalVisible
		});
	};

  markFinished = () => {
  	const {markTaskInfo} = this.state;
    const {updateTask} = this.props;
    updateTask(markTaskInfo);
  };

  renderTaskLevel = (taskLevel) => {
    let res = "";
    if (taskLevel === '1') {
      res = <span><img src={greenCirclePath} alt="" style={{width: 11, height: 11, marginRight: 5}}></img>低</span>;
    } else if (taskLevel === '2') {
      res = <span><img src={orangeCirclePath} alt="" style={{width: 11, height: 11, marginRight: 5}}></img>中</span>;
    } else if (taskLevel === '3') {
      res = <span><img src={redCirclePath} alt="" style={{width: 11, height: 11, marginRight: 5}}></img>高</span>;
    }
    return res;
  };

  render() {
    const userInfo = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : {};
    const {
      unfinishedItems, unfinishedTotal, unfinishedCurrent,
      finishedItems, finishedTotal, finishedCurrent,
      adminOtherItems, adminOtherTotal, adminOtherCurrent,
      modalVisible, initialValues, editFlag,
      selectedRowKeys1,
      selectedRowKeys2,
      deleteSureModalVisible,
			markSureModalVisible,
			markTaskInfo
    } = this.state;

    const {fetchUnfinishedList, fetchFinishedList, fetchAdminOtherList} = this.props;

    const rowSelection1 = {
      selectedRowKeys: selectedRowKeys1,
      onChange: (selectedRowKeys, selectedRows) => {
        this.onSelectChange(selectedRowKeys, selectedRows, 1);
      },
    };

    const rowSelection2 = {
      selectedRowKeys: selectedRowKeys2,
      onChange: (selectedRowKeys, selectedRows) => {
        this.onSelectChange(selectedRowKeys, selectedRows, 2);
      },
    };

    const columns1 = [{
      title: '标题',
      dataIndex: 'task_title',
      key: 'task_title',
      width: '24%'
    }, {
      title: '描述',
      dataIndex: 'task_desc',
      key: 'task_desc',
      width: '40%'
    }, {
      title: '优先级',
      dataIndex: 'task_level',
      key: 'task_level',
      width: '8%',
      render: (text, record, index) => (
        this.renderTaskLevel(record.task_level)
      )
    }, {
      title: '信心指数',
      dataIndex: 'task_conf',
      key: 'task_conf',
      width: '10%',
    }, {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      width: '10%',
      render: (text, record, index) => (
        <div>
          {
            record.task_status === '2' &&
            (
              <Tooltip placement="top" title="标记为已完成">
                <i style={{fontSize: 20}} className="iconfont icon-biaojiwancheng todolist-icon"
                   onClick={() => this.showMarkSureModal(record)}></i>
              </Tooltip>
            )
          }
          <Tooltip placement="top" title="修改">
            <i style={{fontSize: 20}} className="iconfont icon-bianji todolist-icon" onClick={(e) => {
              this.updateTask(record);
            }}></i>
          </Tooltip>
        </div>
      )
    }];

    const columns2 = [
			{
				title: '用户名',
				dataIndex: 'user_name',
				key: 'user_name',
			}
		].concat(columns1.slice(0, 4).concat({
      title: '状态',
      dataIndex: 'task_status',
      key: 'task_status',
			width: 80,
      render: (text, record, index) => (
        record.task_status === '1' ? '已完成' : '未完成'
      )
    }));

    return (
      <div className="default-page">
        <div>
          <h1 className="under-border">我的TODOLIST</h1>
          <div style={{marginBottom: 20}}>
            <div>
              <span style={{fontSize: 17, fontWeight: 600, color: 'rgb(248, 124, 99)'}}>未完成</span>
              <span className="fr">
                <i style={{fontSize: 20, marginRight: unfinishedTotal > 0 ? "10px":"0px"}} className="iconfont icon-xinzeng1 todolist-icon" onClick={this.addTask}></i>
								{
									unfinishedTotal > 0 &&
									<i style={{fontSize: 20}} className="iconfont icon-shanchu todolist-delete-icon"
										 onClick={() => this.showDeleteSureModal(1)}></i>
								}
              </span>
            </div>
            <Table
              style={{
                background: "#fff"
              }}
              columns={columns1}
              dataSource={
                unfinishedItems
              }
              rowSelection={rowSelection1}
              pagination={{
                pageSize: defaultPageSize,
                current: unfinishedCurrent,
                total: unfinishedTotal,
                onChange: (pageNo) => this.handlePageNoChange(pageNo, 1)
              }}
            ></Table>
          </div>
          <div>
            <div>
              <span style={{fontSize: 17, fontWeight: 600, color: 'rgb(108, 223, 133)'}}>已完成</span>
              {/*<Button type={"primary"} style={{float: 'right'}} onClick={() => this.showDeleteSureModal(2)}>
                删除
              </Button>*/}
              <i style={{fontSize: 20}} className="iconfont icon-shanchu todolist-delete-icon fr"
                 onClick={() => this.showDeleteSureModal(2)}></i>
            </div>
            <Table
              style={{
                background: "#fff"
              }}
              columns={columns1}
              dataSource={finishedItems}
              rowSelection={rowSelection2}
              pagination={{
                pageSize: defaultPageSize,
                current: finishedCurrent,
                total: finishedTotal,
                onChange: (pageNo) => this.handlePageNoChange(pageNo, 2)
              }}
            ></Table>
          </div>
        </div>
        {
          userInfo.admin_flag === '1' &&
					<div style={adminOtherTotal > 0 ? (finishedTotal > 0 ? {} : {marginTop: 21}) : {marginTop: 21}}>
            <h1 className="under-border">其他同事的TODOLIST</h1>
            <Table
              style={{
                background: "#fff"
              }}
              columns={columns2}
              dataSource={adminOtherItems}
              pagination={{
                pageSize: defaultPageSize,
                current: adminOtherCurrent,
                total: adminOtherTotal,
                onChange: (pageNo) => this.handlePageNoChange(pageNo, 3)
              }}
            ></Table>
          </div>
        }
        {
          modalVisible &&
          <Modal
            title={editFlag === "add" ? "新增任务" : "修改任务"}
            visible={modalVisible}
            maskClosable={false}
            onOk={this.handleModalOk}
            onCancel={this.hideModal}
            okText={editFlag === "add" ? "提交" : "保存"}
            cancelText="取消"
          >
            <AddTaskPage
              editFlag={editFlag}
              initialValues={initialValues}
              fetchAddTaskModalFuncs={(addTaskModalFuncs) => this.fetchAddTaskModalFuncs(addTaskModalFuncs)}
              fetchUnfinishedList={(params) => fetchUnfinishedList(params)}
              fetchFinishedList={(params) => fetchFinishedList(params)}
              fetchAdminOtherList={(params) => fetchAdminOtherList(params)}
              setPageNo={(pageNo, type) => this.setPageNo(pageNo, type)}
              handleModalOk={this.handleModalOk}
              hideModal={this.hideModal}
            />
          </Modal>
        }
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
          确定要删除所选任务？
        </Modal>
				<Modal
					title="确认"
					visible={markSureModalVisible}
					maskClosable={false}
					onOk={this.handleMarkSureModalOk}
					onCancel={this.hideMarkSureModal}
					okText="确定"
					cancelText="取消"
					className="delete-sure"
				>
					{
						(markTaskInfo && markTaskInfo.task_title) ?
							`确定将任务 [${markTaskInfo.task_title}] 切换为已完成状态？`
							:
							"确定切换为已完成状态？"
					}
				</Modal>
      </div>
    );
  }
}

//映射state到容器组件props
const mapStateToProps = state => ({
  fetch_unfinished_list_result: state.fetch_unfinished_list_result,
  fetch_finished_list_result: state.fetch_finished_list_result,
  fetch_admin_other_list_result: state.fetch_admin_other_list_result,
  delete_tasks_result: state.delete_tasks_result,
  default_update_task_result: state.default_update_task_result
});

//映射dispatch到容器组件props
const mapDispatchToProps = dispatch => ({
  fetchUnfinishedList: param => {
    dispatch({
      type: 'fetch_unfinished_list',
      payload: param
    });
  },
  fetchFinishedList: param => {
    dispatch({
      type: 'fetch_finished_list',
      payload: param
    });
  },
  fetchAdminOtherList: param => {
    dispatch({
      type: 'fetch_admin_other_list',
      payload: param
    });
  },
  deleteTasks: param => {
    dispatch({
      type: 'delete_tasks',
      payload: param
    });
  },
  updateTask: param => {
    dispatch({
      type: 'default_update_task',
      payload: param
    });
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(DeFaultPage));
