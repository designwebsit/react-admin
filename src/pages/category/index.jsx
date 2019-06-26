import React, { Component } from 'react';
import { Card, Button, Icon, Table, Modal, message } from 'antd';
import MyButton from '../../components/my-button';
import { reqCategory, reqAddCategory } from '../../api';
import AddCategoryForm from './add-category-form';
import UpdataCategoryName from './updata-category-name';
class Category extends Component {

  state = {
    categories: [],
    isShowAddCategory: false,
    isShowUpdataCategoryName: false
  }
  category = {}

  componentDidMount = async () => {
    const result = await reqCategory(0);
    if (result.status === 0) {
      this.setState({
        categories: result.data
      })
    }
  }

  // 切换显示隐藏
  toggleDisplay = (stateName, statevalue) => {
    return () => {
      this.setState({
        [stateName]: statevalue
      })
    }
  }

  // 添加品类
  addCategory = () => {
    // 通过 wrappedComponentRef={(form) => this.addCategoryForm = form 拿到子组件的 ref
    // 就可以验证子组件的表单
    const { form } = this.addCategoryForm.props;
    form.validateFields(async (err, value) => {
      const { categoryName, parentId } = value;
      if (!err) {
        const result = await reqAddCategory(categoryName, parentId);
        if (result) {
          message.success('添加分类成功');
          // 如果是二级分类，就不用从新渲染展示，如果是一级就要
          if (result.data.parentId === '0') {
            this.setState({
              categories: [...this.state.categories, result.data]
            });
          }
          // 隐藏
          this.toggleDisplay('isShowAddCategory', false);
          // 清空数据
          form.resetFields(['categoryName', 'parentId']);
        }
      }
    })
  }

  // 点击修改名称保存数据并显示
  saveCategory = (category) => {
    return () => {
      this.category = category;
      this.setState({
        isShowUpdataCategoryName: true
      })
    }
  }

  // 修改品类名字
  upDataCategoryName = () => {
    console.log(1);
  }
  render() {
    const { categories, isShowAddCategory, isShowUpdataCategoryName} = this.state;
    const columns = [
      {
        title: '品类名称',
        dataIndex: 'name'
      },
      {
        title: '操作',
        // dataIndex: 'address',
        width: 300,
        // 如果没设 dataIndex，得到的参数数据是 dataSource
        render: (data) => {
          return <div>
            <MyButton onClick={this.saveCategory(data)}>修改名称</MyButton>
            <MyButton>查看其子品类</MyButton>
          </div>
        }
      },
    ];

    // const dataSource = [
    //   {
    //     name: '胡彦斌',
    //     age: 32,
    //     address: '西湖区湖底公园1号',
    //   },
    //   {
    //     key: '2',
    //     name: '胡彦祖',
    //     age: 42,
    //     address: '西湖区湖底公园1号',
    //   },
    // ];

    return(
        <Card title="一级列表分类" extra={<Button type="primary" onClick={this.toggleDisplay('isShowAddCategory', true)}><Icon type="plus"/>添加品类</Button>} >
          <Table columns={columns}
             bordered
             dataSource={categories}
             pagination={{
               pageSize: 3,
               defaultPageSize: 4,
               pageSizeOptions: ['3', '4', '5'],
               showSizeChanger: true,
               showQuickJumper: true
             }}
             rowKey= "_id"
          />
          {/*添加品类*/}
          <Modal
            title="添加分类"
            visible={isShowAddCategory}
            okText="确认"
            cancelText="取消"
            onOk={this.addCategory}
            onCancel={this.toggleDisplay('isShowAddCategory', false)}
          >
            <AddCategoryForm categories={categories} wrappedComponentRef={(form) => this.addCategoryForm = form} />
          </Modal>

          {/*修改分类名字*/}
          <Modal
            title="更新分类"
            visible={isShowUpdataCategoryName}
            okText="确认"
            cancelText="取消"
            onOk={this.upDataCategoryName}
            onCancel={this.toggleDisplay('isShowUpdataCategoryName',false)}
            width={250}
          >
            <UpdataCategoryName categoryName={this.category.name} wrappedComponentRef={(form) => this.upDataCategoryForm = form} />
          </Modal>
        </Card>

    );
  }
}

export default Category;

