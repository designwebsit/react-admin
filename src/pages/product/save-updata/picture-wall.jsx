import React, { Component } from 'react';
import { Upload, Icon, Modal } from 'antd';


class PicturesWall extends Component {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: this.props.imgs.map((img, index) => {
      return {
        uid: -index,
        name: img,
        status: 'done',
        url: `http://localhost:5000/upload/${img}`,
      }
    })
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  handleChange = async ({ file, fileList }) => {
    this.setState({ fileList });
  } 

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action="/manage/img/upload"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          // 请求参数
          data={{
            id: this.props.id
          }}
          name="image"
        >
          {fileList.length >= 3 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

export default PicturesWall