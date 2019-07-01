import React, { Component } from 'react';
import './index.less';
import { Card, Icon, Form, Input, Cascader, InputNumber, Button, message } from 'antd';
import { reqCategory, reqUpdataProduct } from "../../../api";
import RichTextEditor from './rich-text-editor';
import { convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { reqAddProduct } from "../../../api";
import PictureWall from './picture-wall';
const { Item } = Form;

class SaveUpdata extends Component {

  state = {
    options: []
  };
  richTextEditorRef = React.createRef();

  getCategory = async (id) => {
    const result = await reqCategory(id);
    if (result.status === 0) {
      if (id === 0 ) {
        const newOptions = result.data.map((item) => {
          return {
            value: item._id,
            label: item.name,
            isLeaf: false,
          }
        });
        this.setState({
          options: newOptions
        })
      } else {
        // 获取二级分类数据，为了修改页面的分类数据的显示
        this.setState({
          options: this.state.options.map((item) => {
            if (item.value === id) {
              item.children = result.data.map((item) => {
                return {
                  value: item._id,
                  label: item.name
                }
              })
            }
            return item;
          })
        })
      }
    }
  }

  async componentDidMount () {
    this.getCategory(0);

    // 判断是否从修改进来的，如果是则有 product
    const product = this.props.location.state;
    if (product) {
      this.getCategory(product.pCategoryId);
      const { pCategoryId, categoryId } = product;
      this.categoriesId = [pCategoryId, categoryId];
    }
  }

  loadData = async (selectedOptions) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;

    const result = await reqCategory(targetOption.value);
    if (result.status === 0) {
      targetOption.loading = false;
      const targetOptionChildren = result.data.map((item) => {
        return {
          label: item.name,
          value: item._id
        }
      });
      targetOption.children = targetOptionChildren;
      this.setState({
        options: [...this.state.options],
      });
    }


  }

  // 添加或修改
  handleSubmit = (e) => {
    e.preventDefault();

    this.props.form.validateFields(async (error, values, callback) => {
      if (!error) {
        const { editorState } = this.richTextEditorRef.current.state;
        const text = draftToHtml(convertToRaw(editorState.getCurrentContent()));

        const { category, name, price, desc } = values;
        const categoryId = category[1];
        const pCategoryId = category[0];
        const product = this.props.location.state;
        const options = {
          categoryId,
          pCategoryId,
          name,
          price,
          desc,
          detail: text
        };

        let promise = null;
        // 发送请求
        if (product) {
          options._id = product._id;
          promise = reqUpdataProduct(options);
        } else {
          promise = reqAddProduct(options);
        }
        const result = await promise;
        if (result.status === 0 ) {
          this.props.history.push('/product/index');
        }
        message.success('添加成功');
      }
    })
  }

  // 退回
  goBack = () => {
    this.props.history.goBack();
  }
  
  render() {
    // Form 表单配置
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 3 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 10 },
      },
    };

    const { getFieldDecorator } = this.props.form;

    // 判断是否是修改进来的
    const product = this.props.location.state;

    return(<Card title={ <div className="product-title"><Icon type="arrow-left" className='arrow-icon' onClick={this.goBack} /> <span>添加商品</span> </div>    }>
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Item label="商品名称">
          {
            getFieldDecorator(
              'name',{
                rules: [{
                  required: true, message: '请输入商品名称'
                }],
                initialValue: product ? product.name : null
              }
            )(
              <Input placeholder="请输入商品名称" />
            )
          }
        </Item>
        <Item label="商品描述">
          {
            getFieldDecorator(
              'desc',
              {
                rules: [
                  {required: true, message: '请输入商品描述'}
                ],
                initialValue: product ? product.desc : null
              }
            )(
              <Input placeholder="请输入商品描述"/>
            )
          }
        </Item>
        <Item label="选择分类">
          {
            getFieldDecorator(
              'category',
              {
                rules: [
                  {required: true, message: '请选择分类'}
                ],
                initialValue: this.categoriesId
              }
            )(
              <Cascader
                options={this.state.options}
                loadData={this.loadData}
                onChange={this.onChange}
                changeOnSelect
                placeholder=""
              />
            )
          }
        </Item>
        <Item label="商品价格">
          {
            getFieldDecorator(
              'price',
              {
                rules: [
                  {required: true, message: '请输入商品价格'}
                ],
                initialValue: product ? product.price : null
              }
            )(
              <InputNumber
                formatter={value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value.replace(/￥\s?|(,*)/g, '')}
                className="input-number" />
            )
          }
        </Item>
        <Item label="商品图片" >
          <PictureWall imgs={product ? product.imgs : []} id={product ? product._id : ''} />
        </Item>
        <Item label="商品详情" wrapperCol={{span: 20}}>
          <RichTextEditor ref={this.richTextEditorRef} detail={product ? product.detail : ''} />
        </Item>
        <Item>
          <Button type="primary" className="add-product-btn" htmlType="submit">提交</Button>
        </Item>
      </Form>
    </Card>
    );
  }
}

export default Form.create()(SaveUpdata);

