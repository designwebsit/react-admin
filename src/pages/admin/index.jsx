import React, { Component } from 'react';
import { Layout, Breadcrumb } from 'antd';
import LeftNav from '../../components/left-nav/index';
import HeaderMain from '../../components/header-main/index';
const { Header, Content, Footer, Sider } = Layout;

export default class Index extends Component {
  state = {
    collapsed: false
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    return(
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <LeftNav collapsed={this.state.collapsed} />
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0, minHeight: 100}}>
            <HeaderMain />
          </Header>
          <Content style={{ margin: '25px 16px' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>欢迎使用硅谷后台管理系统</div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    )
  }
}

