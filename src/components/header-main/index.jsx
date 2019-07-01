import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './index.less';
import MyButton from '../my-button/index';
import utils from '../../utils/storage-tools';
import { Modal } from 'antd';
import dayjs from 'dayjs';
import { reqWeather } from '../../api';
import menuList from '../../config/menu-config';
const { confirm } = Modal;


class HeaderMain extends Component {

  state = {
    sysTime: Date.now(),
    weather: '晴',
    weatherImg: 'http://api.map.baidu.com/images/weather/day/qing.png'
  }

  logout = () => {
    confirm({
      title: '您确认要退出登录吗?',
      cancelText: '取消',
      okText: '确认',
      onOk: () => {
        utils.removeItem();
        this.props.history.replace('/login')
      }
    });
  }

  componentWillMount () {
    // 初始化用户名
    const { username } = utils.getLoginItem();
    this.username = username;
    this.title = this.getTitle(this.props);
  }
  
  componentWillReceiveProps (nextProps) {
    this.title = this.getTitle(nextProps);
  }

  async componentDidMount () {
    this.timer = setInterval(() => {
      this.setState({
        sysTime: Date.now()
      })
    },1000);
    const { cancle, promise } = reqWeather();
    this.cancle = cancle;
    const result = await promise;
    const { dayPictureUrl, weather } = result[0].weather_data[0];
    this.setState({
      weather,
      weatherImg: dayPictureUrl
    })
  }

  // 获取 title
  getTitle = (props) => {
    let { pathname } = props.location;

    // 处理商品的路由显示 title 问题
    const reg = /^\/product\//;
    const result = reg.test(pathname);
    if (result) {
      pathname = pathname.slice(0,8);
    }
    for (let i = 0; i < menuList.length; i++) {
      if (menuList[i].children) {
        for (let j = 0; j < menuList[i].children.length; j++) {
          if (pathname === menuList[i].children[j].key) {
            return menuList[i].children[j].title;
          }
        }
      } else {
        if (pathname === menuList[i].key ) {
          return menuList[i].title;
        }
      }
    }
  }

  componentWillUnmount () {
    //  发送的 ajax 要在关闭前取消掉   一下 jsonp 的取消
    this.cancle();
    // 定时器也同上 得取消
    clearInterval(this.timer)
  }

  render() {
    const { sysTime, weather, weatherImg } = this.state;
    return(<div>
        <div className="header-main-top">
          <span>欢迎, {this.username}</span>
          <MyButton onClick={this.logout}>退出</MyButton>
        </div>
        <div className="header-main-bottom">
          <span className="header-main-left">{this.title}</span>
          <div className="header-main-right">
            <span>{dayjs(sysTime).format('YYYY-MM-DD HH:mm:ss')}</span>
            <img src={weatherImg} alt=""/>
            <span>{weather}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(HeaderMain);

