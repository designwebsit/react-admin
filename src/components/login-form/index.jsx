import React, {Component} from 'react';

import { Form, Icon, Input, Button } from 'antd';
const Item = Form.Item;

class LoginForm extends Component {

  // 自定义校验密码
  checkPassword = (rule, value, callback) => {
    if(!value.trim()) {
      callback('请输入密码');
    } else if (value.length < 6) {
      callback('不能少于6位')
    } else if (value.length > 11) {
      callback('不能大于11位')
    } else {
      callback();
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return(
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Item>
          {
            getFieldDecorator('username', {
              rules: [
                { required: true, message: '请输入账号' },
                { max: 11, message: '不能超过11位'},
                { min: 6, message: '不能低于6位'}
                ],
            })
            (<Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username" />)
          }
        </Item>
        <Item>
          {
            getFieldDecorator('password', {
              rules: [
                { validator: this.checkPassword }
              ],
            })
            (<Input
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
    );
  }
}

export default Form.create()(LoginForm) ;
