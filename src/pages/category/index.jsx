import React, { Component } from 'react';
import { Card, Button, Icon, Table, Divider, Tag } from 'antd';
import MyButton from '../../components/my-button';
import { reqCategory } from '../../api';

class Category extends Component {

  state = {
    categories: []
  }
  componentDidMount = async () => {
    const result = await reqCategory(0);
    if (result.status === 0) {
      this.setState({
        categories: result.data
      })
    }
    console.log(result.data);
  }

  render() {
    const columns = [
      {
        title: '品类名称',
        dataIndex: 'name'
      },
      {
        title: '操作',
        dataIndex: 'address',
        width: 300,
        render: () => {
          return <div>
            <MyButton>修改名称</MyButton>
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
        <Card title="一级列表分类" extra={<Button type="primary"><Icon type="plus" />更多</Button>} >
          <Table columns={columns}
             bordered
             dataSource={this.state.categories}
             pagination={{
               pageSize: 3,
               defaultPageSize: 4,
               pageSizeOptions: ['1','2'],
               showSizeChanger: true,
               showQuickJumper: true
             }}
          />
        </Card>

    );
  }
}

export default Category;

