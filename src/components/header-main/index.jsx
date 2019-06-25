import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './index.less';
import MyButton from '../my-button/index';
import utils from '../../utils/storage-tools';
import { Modal } from 'antd';
import dayjs from 'dayjs';
import { reqWeather } from '../../api';

const { confirm } = Modal;


class HeaderMain extends Component {

  state = {
    date: Date.now(),
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

  }
  
  componentWillReceiveProps () {
    console.log(1);
  }

  async componentDidMount () {
    // setInterval(() => {
    //   this.setState({
    //     date: Date.now()
    //   })
    // },1000);
    const result = await reqWeather();
    const { dayPictureUrl, weather } = result[0].weather_data[0];
    this.setState({
      weather,
      weatherImg: dayPictureUrl
    })
  }

  render() {
    console.log(1);
    const { date, weather, weatherImg } = this.state;
    return(<div>
        <div className="header-main-top">
          <span>欢迎, {this.username}</span>
          <MyButton onClick={this.logout}>退出</MyButton>
        </div>
        <div className="header-main-bottom">
          <span className="header-main-left">用户管理</span>
          <div className="header-main-right">
            <span>{dayjs(date).format('YYYY-MM-DD HH:mm:ss')}</span>
            <img src={weatherImg} alt=""/>
            <span>{weather}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(HeaderMain);

