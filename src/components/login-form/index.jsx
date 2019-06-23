import React, {Component} from 'react';
import axios from 'axios';
import { Form, Icon, Input, Button } from 'antd';
const Item = Form.Item;

class LoginForm extends Component {


  
  render() {
    const { getFieldDecorator } = this.props.form;
  }
}

export default Form.create()(LoginForm) ;
