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

// 请求一级分类
export const reqCategory = (parentId) => ajax('/manage/category/list',{parentId}, 'get');

// 添加一级 以及 二级分类
export const reqAddCategory = (categoryName, parentId) => ajax('/manage/category/add',{categoryName, parentId}, 'post');
