import ajax from './ajax';
import jsonp from 'jsonp';
import { message } from 'antd';
// export default function (username, password) {
//   return ajax('/login', {username, password}, 'post')
// }

export const reqLogin = (username, password) => ajax('/login', {username, password}, 'post');

// 验证用户
export const reqValidateUserInfo = (id) => ajax('/validate/user', {id}, 'post');

// 请求天气
export const reqWeather = () => {
  let cancle = null;
  const promise = new Promise((resolve, reject) => {
    cancle = jsonp('http://api.map.baidu.com/telematics/v3/weather?location=深圳&output=json&ak=3p49MVra6urFRGOT9s8UBWr2', {}, (err, data) => {
      if (!err) {
        resolve(data.results);
      } else {
        message.error('请求天气失败');
        reject()
      }
    })
  });
  return {cancle, promise}
};

// 请求一级分类 或者 二级分类
export const reqCategory = (parentId) => ajax('/manage/category/list',{parentId}, 'get');

// 添加一级 或者 二级分类
export const reqAddCategory = (categoryName, parentId) => ajax('/manage/category/add',{categoryName, parentId}, 'post');

// 修改一级分类名字 或者 二级分类名字
export const reqUpdataCategoryName = (categoryId, categoryName) => ajax('/manage/category/update', {categoryId, categoryName}, 'post');

// 获取商品分页列表
export const reqProductList = (pageNum, pageSize) => ajax('/manage/product/list', {pageNum, pageSize}, 'get');

// 添加商品
export const reqAddProduct = (options) => ajax('/manage/product/add', options, 'post');

// 更新商品
export const reqUpdataProduct = (options) => ajax ('/manage/product/update', options, 'post');

// 获取角色列表
export const reqGetRoles = () => ajax('/manage/role/list', {}, 'get');

// 更新上下架状态
export const updateProductStatus = (options) => ajax('/manage/product/updateStatus', options, 'post');

// 添加角色
export const reaAddRole = (name) => ajax('/manage/role/add', {name}, 'post');

// 修改角色
export const reqUpdateRole = (options) => ajax('/manage/role/update', options, 'post');

