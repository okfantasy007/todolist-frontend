import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {Layout, message} from "antd";
import "./index.less";
import DefaultPage from "@/containers/defaultPage";
import HeaderZone from "@/layout/headerZone";

const {Content} = Layout;

const smallWindowFlag = window.screen.width < 1920;

class Home extends Component {

  constructor() {
    super();
    this.state = {
    }
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {
    console.log("componentWillReceiveProps");

    if(nextProps.logout_result !== this.props.logout_result) {
      const {logout_result} = nextProps;
      if (logout_result.logout_success) {
        message.success("登出成功");
        window.socketConnected && window.socketConnected.emit('logout_disconnect');
        localStorage.clear();
        this.props.history.push('/login');
      } else {
        message.error("登出失败");
      }
    }
  }

	componentWillUnmount() {

	}

  logout = () => {
    const {logout} = this.props;
    logout();
  };

  render() {
    return (
      <Layout className="home">
        <HeaderZone homeMode={true}/>
        <Layout style={{padding: smallWindowFlag ? '0 12%' : '0 22%', margin: 0}}>
          <Content style={{background: "#fff", padding: 30}} className="content">
            <DefaultPage/>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

//映射state到容器组件props
const mapStateToProps = state => ({
  login_result: state.login_result,
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
)(withRouter(Home));
