import React, {Component} from 'react';
import {Form, Input, Tree} from 'antd';
import menuList from '../../config/menu-config';
import PropTyeps from 'prop-types';

const Item = Form.Item;
const { TreeNode } = Tree;

class UpdateRoleForm extends Component {
  static propTypes = {
    name: PropTyeps.string.isRequired
  };
  state = {
    checkedKeys: []
  };


  onCheck = (checkedKeys) => {
    this.setState({ checkedKeys });
  };

  renderTreeNodes = data => data.map((item) => {
    if (item.children) {
      return (
        <TreeNode title={item.title} key={item.key} dataRef={item}>
          {
            this.renderTreeNodes(item.children)
          }
        </TreeNode>
      );
    }
    return <TreeNode {...item} />;
  });
  
  render () {
    const { getFieldDecorator } = this.props.form;
    
    return (
      <Form>
        <Item label='角色名称'>
          {
            getFieldDecorator(
              'name',
              {
                initialValue: this.props.name
              }
            )(
              <Input placeholder='请输入角色名称' disabled/>
            )
          }
        </Item>
        <Item>
          <Tree
            checkable
            onExpand={this.onExpand} //展开
            expandedKeys={this.state.expandedKeys}
            autoExpandParent={this.state.autoExpandParent}
            onCheck={this.onCheck} // 选中左边框时
            checkedKeys={this.state.checkedKeys}
            onSelect={this.onSelect} // 选中右边文字时
            selectedKeys={this.state.selectedKeys}
          >
            {this.renderTreeNodes(menuList)}
          </Tree>
        </Item>
      </Form>
    )
  }
}

export default Form.create()(UpdateRoleForm);