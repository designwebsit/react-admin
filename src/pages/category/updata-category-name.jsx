import React, { Component } from 'react';
import { Form, Input } from 'antd';

const { Item } = Form;

class UpdataCategoryName extends Component{

  validator = (rule, value, callback) => {
    if (!value) return callback('请输入值');
    if (value === this.props.categoryName) return callback('两次别一样')
    callback();
  }
  
  render() {
    const { categoryName } = this.props;
    const { getFieldDecorator } = this.props.form;
    return(
      <Form>
        <Item>
          {
            getFieldDecorator(
              'updataName', {
                initialValue: categoryName,
                rules: [{
                  validator: this.validator
                }]
              }
            )(
              <Input />
            )
          }

        </Item>

      </Form>
    );
  }
}

export default Form.create()(UpdataCategoryName);