import React, { Component } from 'react';
import { Card, Button, Table, Radio, Modal, message } from 'antd';
import dayjs from 'dayjs';
import { reqGetRoles, reaAddRole, reqUpdateRole } from '../../api';
import utils from '../../utils/storage-tools';

import AddRoleForm from './add-role-form';
import UpdateRoleForm from './update-role-form';

const RadioGroup = Radio.Group;

class Role extends Component {

  state = {
    value: '',  //单选的默认值，也就是选中的某个角色的id值
    roles: [],
    //权限数组
    isShowAddRoleModal: false, //是否展示创建角色的标识
    isShowUpdateRoleModal: false, //是否展示设置角色的标识
    isDisabled: true
  }

  // 获取角色
  getRole = async () => {
    const result = await reqGetRoles();
    if (result.status === 0 ) {
      this.setState({
        roles: result.data
      });
    }
  }
  componentDidMount () {
    this.getRole();
  }

  // 单选框改变时
  onRadioChange = (e) => {
    // console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
      isDisabled: false
    });
  }

  toggleDisplay = (stateName, stateValue) => {
    return () => this.setState({[stateName]: stateValue})
  }
  
  //创建角色的回调函数
  addRole = () => {
    const { form } = this.addRoleForm.props;
    form.validateFields(async (error, values) => {
      if (!error) {
        const result = await reaAddRole(values.name);
        if (result.status === 0) {
          this.getRole();
          this.setState({
            isShowAddRoleModal: false
          });
          console.log(result);
          form.resetFields(['name']);
        }
      }
    })
  }
  //设置角色权限的回调函数
  updateRole = async () => {
    const _id = this.state.value;
    const auth_name = utils.getLoginItem().username;
    const menus = this.updateRoleForm.state.checkedKeys;

    const result = await reqUpdateRole({_id, auth_name, menus });
    if (result.status === 0) {
      message.success('更新chengg');
      this.getRole();
      this.setState({
        isShowUpdateRoleModal: false
      })
    }
  }
  
  render () {
    const { roles, value, isDisabled, isShowAddRoleModal, isShowUpdateRoleModal } = this.state;

    const columns = [
      {
      dataIndex: '_id',
      render: (id) => {
        return <Radio value={id} />
      }
    },
      {
      title: '角色名称',
      dataIndex: 'name',
    }, {
      title: '创建时间',
      dataIndex: 'create_time',
      render: (time) => dayjs(time).format('YYYY-MM-DD HH:mm:ss')
    }, {
      title: '授权时间',
      dataIndex: 'auth_time',
      render: (time) => time && dayjs(time).format('YYYY-MM-DD HH:mm:ss')
      }, {
      title: '授权人',
      dataIndex: 'auth_name',
    }
    ];

    const role = roles.find((item) => item._id === value );
    
    return (
      <Card
        title={
          <div>
            <Button type='primary' onClick={this.toggleDisplay('isShowAddRoleModal', true)}>创建角色</Button> &nbsp;&nbsp;
            <Button type='primary' disabled={isDisabled} onClick={this.toggleDisplay('isShowUpdateRoleModal', true)}>设置角色权限</Button>
          </div>
        }
      >
        <RadioGroup onChange={this.onRadioChange} value={value} style={{width: '100%'}}>
          <Table
            columns={columns}
            dataSource={roles}
            bordered
            rowKey='_id'
            pagination={{
              defaultPageSize: 5,
              showSizeChanger: true,
              pageSizeOptions: ['5', '10', '15', '20'],
              showQuickJumper: true,
            }}
          />
        </RadioGroup>
  
        <Modal
          title="创建角色"
          visible={isShowAddRoleModal}
          onOk={this.addRole}
          onCancel={this.toggleDisplay('isShowAddRoleModal', false)}
          okText='确认'
          cancelText='取消'
        >
          <AddRoleForm wrappedComponentRef={(form) => this.addRoleForm = form}/>
        </Modal>
  
        <Modal
          title="设置角色权限"
          visible={isShowUpdateRoleModal}
          onOk={this.updateRole}
          onCancel={this.toggleDisplay('isShowUpdateRoleModal', false)}
          okText='确认'
          cancelText='取消'
        >
          <UpdateRoleForm name={role ? role.name : ''} wrappedComponentRef={(form) => this.updateRoleForm = form}/>
        </Modal>
        
      </Card>
    )
  }
}

export default Role
