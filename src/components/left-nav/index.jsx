import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { Menu, Icon } from 'antd';
import './index.less';
import logo from '../../assets/images/logo.png';
import menuList from '../../config/menu-config';
const { SubMenu, Item } = Menu;

class LeftNav extends Component {

  static p = {
    collapsed: PropTypes.bool.isRequired
  }

  createMenu = (item) => {
    return <Item key={item.key}>
      <Link to={item.key}>
        <Icon type={item.icon} />
        <span>{item.title}</span>
      </Link>
    </Item>
  }

  componentWillMount = () => {
    const { pathname } = this.props.location;
    this.menu = menuList.map((menu) => {
      // 判断是几级菜单
      const children = menu.children;
      if (children) {
        return <SubMenu
          key={menu.key}
          title={
            <span>
              <Icon type={menu.icon} />
              <span>{menu.title}</span>
            </span>
          }
        >
          {
            children.map((item) => {
              if(item.key === pathname) {
                this.openKey = menu.key
              }
              return this.createMenu(item);
            })
          }
        </SubMenu>
      } else {
        return this.createMenu(menu);
      }
    });
    this.selectKey = pathname;
  }

  render() {
    const { collapsed } = this.props;
    return( <div>
      <Link className="left-nav-logo" to="/home">
        <img src={logo} alt="logo"/>
        <h1 style={{ display: collapsed ? 'none' : 'block' }}>硅谷后台</h1>
      </Link>
      <Menu theme="dark" defaultSelectedKeys={[this.selectKey]} defaultOpenKeys={[this.openKey]} mode="inline">
        { this.menu }
        {/*<Item key="home">
          <Link to="home">
            <Icon type="home" />
            <span>首页</span>
          </Link>
        </Item>
        <SubMenu
          key="sub1"
          title={
            <span>
              <Icon type="appstore" />
              <span>商品</span>
            </span>
          }
        >
          <Item key="bars">
            <Link to="category">
              <Icon type="category" />
              <span>品类管理</span>
            </Link>
          </Item>
          <Item key="tool">
            <Link to="product">
              <Icon type="product" />
              <span>商品管理</span>
            </Link>
          </Item>
        </SubMenu>
        <Item key="user">
          <Icon type="user" />
          <span>用户管理</span>
        </Item>
        <Item key="safety">
          <Icon type="safety" />
          <span>权限管理</span>
        </Item>
        <SubMenu
          key="sub2"
          title={
            <span>
              <Icon type="area-chart" />
              <span>图形图标</span>
            </span>
          }
        >
          <Item key="bar">
            <Icon type="bar-chart" />
            <span>柱形图</span>
          </Item>
          <Item key="line">
            <Icon type="line-chart" />
            <span>折线图</span>
          </Item>
          <Item key="pie">
            <Icon type="pie-chart" />
            <span>饼图</span>
          </Item>
        </SubMenu> */}
      </Menu>
    </div>
    );
  }
}

export default withRouter(LeftNav);
