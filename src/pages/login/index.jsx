import React, { Component } from 'react';
import './index.less';
import { reqLogin } from '../../api';
import img from '../../assets/images/logo.png';
import { Form, Icon, Input, Button } from 'antd';
import  utils  from '../../utils/storage-tools';
const Item = Form.Item;


 class Login extends Component {

   // 自定义校验密码
   checkPassword = (rule, value, callback) => {
     const name = rule.fullField === 'username' ? '用户名' : '密码' ;
     if(!value) {
       callback(`请输入${name}`);
     } else if (value.length < 4) {
       callback(`${name}不能少于6位`)
     } else if (value.length > 11) {
       callback(`${name}不能大于11位`)
     } else if ( !(/[a-zA-Z0-9]+/.test(value)) ) {
       callback(`${name}只能填下划线数字字母`)
     } else {
       callback();
     }
   }

   // 处理请求
   handleSubmit = (e) => {
     e.preventDefault();
     this.props.form.validateFields(async (error, value) => {
       if (!error) {
         const { username, password } = value;
         // 请求登录
         const result = await reqLogin(username, password);
         // 登录成功
         if (result.status === 0) {
           utils.setLoginItem(result.data);
           this.props.history.replace('/');
         } else {
           // 登录失败 重置密码
           this.props.form.resetFields(['password'])
         }
       } else {
         console.log(error);
       }
     });
   }

  render() {
    const { getFieldDecorator } = this.props.form;
    return(
      <div id="login">
        <header className="login-header">
          <img src={img} alt="asd"/>
          <h1>React项目: 后台管理系统</h1>
        </header>
        <div className="login-content">
          <h2>用户登录</h2>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Item>
              {
                getFieldDecorator('username', {
                    // rules: [
                    //   { required: true, message: '请输入账号' },
                    //   { max: 11, message: '不能超过11位'},
                    //   { min: 6, message: '不能低于6位'}
                    //   ],
                    rules: [{validator: this.checkPassword}]
                  }
                )(<Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Username" autoComplete="off" />)
              }
            </Item>
            <Item>
              {
                getFieldDecorator('password', {
                  rules: [
                    { validator: this.checkPassword }
                  ],
                })(<Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="Password"
                />)
              }
            </Item>
            <Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
            </Item>
          </Form>
        </div>
      </div>
    )
  }
}

export default Form.create()(Login);