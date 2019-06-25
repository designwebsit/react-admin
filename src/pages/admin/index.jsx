import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';
import LeftNav from '../../components/left-nav/index';
import HeaderMain from '../../components/header-main/index';
import utils from '../../utils/storage-tools';
import { reqValidateUserInfo } from '../../api';

import Home from '../home';
import Category from '../category';

const { Header, Content, Footer, Sider } = Layout;

export default class Index extends Component {
  state = {
    collapsed: false
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  componentWillMount = async () => {
    const user = utils.getLoginItem();
    if (user) {
      // 验证用户id 是否正确
      const result = await reqValidateUserInfo(user._id);
      if (result.status === 0) {
        return;
      }
    }
    this.props.history.replace('/login');
  }

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
            <Switch>
              <Route path="/home" component={Home}/>
              <Route path="/category" component={Category}/>
            </Switch>

          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    )
  }
}

