import React, {Component} from "react";
import "./index.less";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {Form, Input, Radio, message, Rate} from "antd";

const FormItem = Form.Item;

const RadioGroup = Radio.Group;

const defaultPageSize = 5;

class AddTaskPageForm extends Component {
  constructor() {
    super();
    this.state = {
      initialValue: {}
    };
  }

  componentWillMount() {
    const {initialValues} = this.props;
    this.setState({
      initialValue: initialValues
    });
  }

  componentDidMount() {
    console.log("addTaskPage componentDidMount");
    this.props.fetchAddTaskModalFuncs({
      handleSubmit: this.handleSubmit
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.add_task_result.success !== this.props.add_task_result.success) {
      const {add_task_result} = nextProps;
      const {hideModal, fetchUnfinishedList, setPageNo} = this.props;
      if (add_task_result.success === true) {
        message.success("新增成功");
        hideModal();
        fetchUnfinishedList({
          pageNo: 1,
          pageSize: defaultPageSize
        });
        setPageNo(1, 1);
      } else if (add_task_result.success === false) {
        message.error(add_task_result.msg || "新增失败");
      }
    }
    if (nextProps.update_task_result.success !== this.props.update_task_result.success) {
      const {update_task_result} = nextProps;
      const {hideModal, fetchUnfinishedList, fetchFinishedList, setPageNo} = this.props;
      if (update_task_result.success === true) {
        message.success("修改成功");
        hideModal();
        fetchUnfinishedList({
          pageNo: 1,
          pageSize: defaultPageSize
        });
        fetchFinishedList({
          pageNo: 1,
          pageSize: defaultPageSize
        });
        setPageNo(1, 1);
        setPageNo(1, 2);
      } else if (update_task_result.success === false) {
        message.error(update_task_result.msg || "修改失败");
      }
    }
  }

  toPath = path => {
    this.props.history.push(path);
  };

  handleSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const {editFlag, addTask, updateTask} = this.props;
        const {initialValue} = this.state;
        if (editFlag === "add") {
          if (!values.taskLevel) {
            values.taskLevel = '1';
          }
          if (!values.taskConf) {
            values.taskConf = 5;
          }
          addTask(values);
        } else if (editFlag === "update") {
          values.id = initialValue.id;
          updateTask(values);
        }
      }
    });
  };

  handleTaskConfChange = (val) => {
    const {form} = this.props;
    form.setFieldsValue({
      taskConf: val
    });
  };


  render() {
    const {initialValue} = this.state;
    const {editFlag} = this.props;
    const {getFieldDecorator} = this.props.form;
    return (
      <div>
        <Form className="register-form">
          <FormItem>
            {getFieldDecorator("taskTitle", {
              initialValue: initialValue.task_title,
              rules: [
                {required: true, message: "请输入标题"}]
            })(
              <Input
                className="register-input"
                placeholder="标题"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator("taskDesc", {
              initialValue: initialValue.task_desc
            })(
              <Input
                className="register-input"
                placeholder="描述"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator("taskLevel", {})(
              <div>
                <span style={{marginRight: 15}}>优先级</span>
                <RadioGroup defaultValue={editFlag === "add" ? '1' : initialValue.task_level}>
                  <Radio value={'1'}>低</Radio>
                  <Radio value={'2'}>中</Radio>
                  <Radio value={'3'}>高</Radio>
                </RadioGroup>
              </div>
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator("taskConf", {})(
              <div>
                <span style={{marginRight: 15}}>信心指数</span>
                <Rate count={10} defaultValue={editFlag === "add" ? 5 : initialValue.task_conf}
                      onChange={this.handleTaskConfChange}></Rate>
              </div>
            )}
          </FormItem>
          {
            editFlag === "update" && initialValue.task_status === "2" &&
            <FormItem>
              {getFieldDecorator("taskStatus", {})(
                <div style={{textAlign: 'left'}}>
                  <span style={{marginRight: 15}}>状态</span>
                  <RadioGroup defaultValue={initialValue.task_status}>
                    <Radio value={'2'}>未完成</Radio>
                    <Radio value={'1'}>已完成</Radio>
                  </RadioGroup>
                </div>
              )}
            </FormItem>
          }
        </Form>
      </div>
    );
  }
}

//映射state到容器组件props
const mapStateToProps = state => ({
  add_task_result: state.add_task_result,
  update_task_result: state.update_task_result
});

//映射dispatch到容器组件props
const mapDispatchToProps = dispatch => ({
  addTask: param => {
    dispatch({
      type: 'add_task',
      payload: param
    });
  },
  updateTask: param => {
    dispatch({
      type: 'update_task',
      payload: param
    });
  }
});

const AddTaskPage = Form.create()(AddTaskPageForm);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AddTaskPage));
