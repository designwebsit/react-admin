import React, { Component } from 'react';
import { Form, Input } from 'antd';

const Item = Form.Item;

class AddRoleForm extends Component {

  validator = (rule, value, callback) => {
    if (!value) return callback('请输入值');
    callback();
  }
  
  render () {
    const { getFieldDecorator } = this.props.form;
    
    return (
      <Form>
        <Item label='角色名称' labelCol={{span: 6}}  wrapperCol={{span: 15}}>
          {
            getFieldDecorator(
              'name',{
                rules: [{
                  validator: this.validator
                }]
              }
            )(
              <Input placeholder='请输入角色名称'/>
            )
          }
        </Item>
      </Form>
    )
  }
}

export default Form.create()(AddRoleForm)