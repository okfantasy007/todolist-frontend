import React, {Component} from "react";
import "./index.less";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {Layout} from "antd";
import SettingDefaultPage from "@/containers/settingDefaultPage";
import HeaderZone from "@/layout/headerZone";

const {Content} = Layout;

const smallWindowFlag = window.screen.width < 1920;

class SettingPage extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {

  }

  render() {
    return (
      <div>
        <Layout className="setting">
          <HeaderZone/>
          <Layout style={{padding: smallWindowFlag ? '0 12%' : '0 22%', margin: 0}}>
            <Content style={{background: "#fff", padding: 30}} className="content">
              <SettingDefaultPage/>
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}

//映射state到容器组件props
const mapStateToProps = state => ({
});

//映射dispatch到容器组件props
const mapDispatchToProps = dispatch => ({

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SettingPage));
