import React, { Component } from 'react';
import { Card, Button, Icon, Table, Modal, message } from 'antd';
import MyButton from '../../components/my-button';
import { reqCategory, reqAddCategory, reqUpdataCategoryName } from '../../api';
import AddCategoryForm from './add-category-form';
import UpdataCategoryName from './updata-category-name';
class Category extends Component {

  state = {
    pageItem: 4,
    categories: [],
    subCategories: [],
    isShowAddCategory: false,
    isShowUpdataCategoryName: false,
    isShowSubCategory: false
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

          // 公共配置
          const options = {
            isShowAddCategory: false,
          }
          // 如果是二级分类，就不用从新渲染展示，如果是一级就要
          if (result.data.parentId === '0') {
            options.categories = [...this.state.categories, result.data];
          } else if (this.state.isShowSubCategory && this.category._id === result.data.parentId){
            options.subCategories = [...this.state.subCategories, result.data];
          }

          // 统一处理
          this.setState(options);
          // 清空数据
          form.resetFields(['categoryName', 'parentId'])
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

  // 隐藏修改品类名字框
  hideUpdataCategoryName = () => {
    const { form } = this.upDataCategoryForm.props;
    this.setState({
      isShowUpdataCategoryName: false
    });
    form.resetFields(['categoryName'])
  }

  // 修改品类名字
  upDataCategoryName = () => {
    const { form } = this.upDataCategoryForm.props;
    const { parentId, _id } = this.category;

    const reqUpdata = (categoryType) => {
      form.validateFields(async (err, value) => {
        if (!err) {
          const result = await reqUpdataCategoryName(_id, value.categoryName);
          if (result) {
            const newCategories = this.state[categoryType].map((item) => {
              if (item._id === _id) {
                item.name = value.categoryName;
                return item;
              }
              return item;
            });
            // 更新categories，清空表单的值，并且隐藏
            form.resetFields(['categoryName']);
            message.success('更新分类名称成功~', 2);
            this.setState({
              [categoryType]: newCategories,
              isShowUpdataCategoryName: false
            })
          }
        }
      });
    }

    if (parentId === '0') {
      reqUpdata('categories');
    } else {
      reqUpdata('subCategories');
    }
  }

  // 查看子品类
  showSubCategory = (category) => {
    return async () => {
      const result = await reqCategory(category._id);
      if (result.status === 0){
        // 用于点击查看子品类时的 title
        this.category = category;
        this.setState({
          subCategories: result.data,
          isShowSubCategory: true
        });
      }
    }
  }

  // 返回一级分类列表
  goBack = () => {
    this.setState({
      isShowSubCategory: false
    })
  }

  // 当页的数量在变化时的回调
  onShowSizeChange = (currentPage, size) => {
    // 配置每一页多少条
    this.setState({
      pageItem: size
    })
  }

  render() {
    const { categories, isShowAddCategory, isShowUpdataCategoryName, isShowSubCategory, subCategories} = this.state;
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
            {
              isShowSubCategory ? null : <MyButton onClick={this.showSubCategory(data)}>查看其子品类</MyButton>
            }
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
      <Card title={isShowSubCategory ? <div><MyButton onClick={this.goBack}>一级分类</MyButton> <Icon type="arrow-right" /> {this.category.name} </div> : "一级分类列表"}
            extra={<Button type="primary" onClick={this.toggleDisplay('isShowAddCategory', true)}><Icon type="plus"/>添加品类</Button>} >
        <Table columns={columns}
           bordered
           dataSource={isShowSubCategory ? subCategories : categories}
           pagination={{
             pageSize: this.state.pageItem,
             pageSizeOptions: ['3', '4', '5'],
             showSizeChanger: true,
             showQuickJumper: true,
             onShowSizeChange: this.onShowSizeChange
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

        {/*修改分类名字弹框*/}
        <Modal
          title="更新分类"
          visible={isShowUpdataCategoryName}
          okText="确认"
          cancelText="取消"
          onOk={this.upDataCategoryName}
          onCancel={this.hideUpdataCategoryName}
          width={250}
        >
          <UpdataCategoryName categoryName={this.category.name} wrappedComponentRef={(form) => this.upDataCategoryForm = form} />
        </Modal>
      </Card>
    );
  }
}

export default Category;

