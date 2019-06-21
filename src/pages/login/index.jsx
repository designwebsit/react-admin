import React, { Component } from 'react';
import './index.less';
import img from '../../assets/images/logo.png';
import LoginForm from '../../components/login-form/index';

export default class Login extends Component {

  handleSubmit = (e) => {
    e.preventDefault();
  }

  render() {
    return(
      <div id="login">
        <header className="login-header">
          <h1 className="login-logo">
            <a href="javascript:;" >
              <img src={img} alt="asd"/>
            </a>
          </h1>
          <p className="logo-text">React项目: 后台管理系统</p>
        </header>
        <div className="login-form">
          <h2>用户登录</h2>
          <LoginForm />
        </div>
      </div>
    )
  }
}

