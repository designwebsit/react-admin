import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Layout } from 'antd';
import LeftNav from '../../components/left-nav/index';
import HeaderMain from '../../components/header-main/index';
import utils from '../../utils/storage-tools';
import { reqValidateUserInfo } from '../../api';

import Home from '../home';
import Category from '../category';
import Product from '../product';
import User from '../user';
import Role from '../role';
import Line from '../charts/line';
import Bar from '../charts/bar';
import Pie from '../charts/pie';

const { Header, Content, Footer, Sider } = Layout;

export default class Index extends Component {
  state = {
    collapsed: false,
    // 是否成功跳到主页面，默认不成功，需验证用户
    success: false,
    loading: true
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
      // 用户存在
      if (result.status === 0) {
        this.setState({
          success: true,
          loading: false
        });
        return;
      }
    }
    this.props.history.replace('/login');
  }

  render() {
    const { loading, success } = this.state;
    if (loading) return <div>loading</div>
    if (!success) return null;
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
              <Route path="/product" component={Product}/>
              <Route path="/user" component={User}/>
              <Route path="/role" component={Role}/>
              <Route path="/charts/line" component={Line}/>
              <Route path="/charts/bar" component={Bar}/>
              <Route path="/charts/pie" component={Pie}/>
              <Redirect to="/home" />
            </Switch>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    )
  }
}

