import React, { Component } from 'react';
import './index.less';
import { reqProductList, updateProductStatus } from "../../../api";
import MyButton from '../../../components/my-button';
import { Card, Select, Input, Button, Icon, Table  } from 'antd';
const { Option } = Select;

class Index extends Component {

  state = {
    productList: [],
    total: 0,
    loading: true
  }

  getProduct = async (page, pageSize) => {
    this.setState({
      loading: true
    });
    const result = await reqProductList(page, pageSize);
    const { list, total } = result.data;
    if (result.status === 0) {
      this.setState({
        productList: list,
        total,
        loading: false
      })
    }
  }

  async componentDidMount () {
   this.getProduct(1, 4)
  }
  
  showAddProduct = () => {
    this.props.history.push('/product/saveupdata');
  }

  showUpdateProduct = (product) => {
    return () => {
      this.props.history.push('/product/saveupdata', product);
    }
  }

  // 页数变化时
  onPageChange = async (page, pageSize) => {
    this.getProduct(page, pageSize);
  }
  onShowSizeChange = (a, b) => {
    console.log(a, b);
  }
  
  // 修改上下架
  updateProductStatus =  (product) => {
    return async () => {
      const _id = product._id;
      const status = 3 - product.status;
      const options = {
        productId: _id,
        status
      }
      const result = await updateProductStatus(options);
      if (result.status === 0) {
        this.setState({
          productList: this.state.productList.map((item) => {
            if (item._id === _id) {
              console.log(item);
              return {...item, status}
            }
            return item
          })
        })
      }
    }
  }

  render() {
    const columns = [
      {
        title: '商品名称',
        dataIndex: 'name',
      },
      {
        title: '商品描述',
        dataIndex: 'desc',
      },
      {
        title: '价格',
        dataIndex: 'price',
      },
      {
        title: '状态',
        render: (product) => {
          return product.status === 1
            ? <div><Button type="primary" onClick={this.updateProductStatus(product)}>上架</Button> &nbsp;&nbsp;&nbsp;<span>已下架</span></div>
            : <div><Button type="primary" onClick={this.updateProductStatus(product)}>下架</Button> &nbsp;&nbsp;&nbsp;<span>在售</span></div>
        },
        className: 'product-status'
      },
      {
        title: '操作',
        render: (data) => {
          return <div>
            <MyButton>详情</MyButton>
            <MyButton onClick={this.showUpdateProduct(data)}>修改</MyButton>
          </div>
        }
      }
    ]
    const { productList, total, loading } = this.state;
    return(<Card title={
      <div>
        <Select defaultValue="name">
          <Option value="name">根据商品名称</Option>
          <Option value="dec">根据商品描述</Option>
        </Select>
        <Input className="search-ipt" placeholder="关键字" />
        <Button type="primary">搜索</Button>
      </div> }
      extra={<Button type="primary" onClick={this.showAddProduct}><Icon type="plus" />添加产品</Button>}
      >
      <Table dataSource={productList}
        columns={columns}
        bordered
        rowKey="_id"
        pagination={{
          pageSize: 4,
          pageSizeOptions: ['4', '6', '8'],
          showSizeChanger: true,
          total,
          onChange: this.onPageChange,
          onShowSizeChange: this.getProduct
        }}
        loading={loading}

        />

    </Card>
    );
  }
}

export default Index;

