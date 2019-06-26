import React, { Component } from 'react';
import { Form, Input, Select  } from 'antd';
import PropTypes from 'prop-types';

const { Item } = Form;
const { Option } = Select;

class AddCategoryForm extends Component{

  static propTypes = {
    categories: PropTypes.array.isRequired
  };

  validator = (rule, value, callback) => {
    if (!value) return callback('请输东西')
    const result = this.props.categories.find((item) => {
      if (value === item.name) {
        return true
      }
    });
    if (result) return callback('已有分类');
    callback();
  }
  
  render() {
    console.log(this.props);
    const { getFieldDecorator } = this.props.form;
    return(
      <Form>
        <Item label="所属分类">
          {
            getFieldDecorator(
              'parentId', {
                initialValue: '0'
              }
            )(
              <Select style={{ width: '100%' }}>
                <Option value="0" key="0">一级分类</Option>
                {
                  this.props.categories.map((item) => <Option value={item._id} key={item._id}>{item.name}</Option>)
                }
              </Select>
            )
          }

        </Item>
        <Item label="分类名称">
          {
            getFieldDecorator(
              'categoryName',{
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

export default Form.create()(AddCategoryForm);