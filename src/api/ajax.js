import axios from 'axios';
import { message } from 'antd';

export default function (url, data, method) {

  // 判断传过来的 get 还是 post ，因为 axios get请求和 post请求不一样 所以要改一下
  let reqParams = data
  if(method.lowerCase === 'get') {
    reqParams = { params: data }
  }
  // return 回去的是 then 或 catch 的 promise 的 value 值，需在调用时加 await
  return axios[method](url, reqParams)
    .then((res) => {
    const { data } = res;
    if(!data.status) {
      return true;
    } else {
      message.error(data.msg);
    }
  }).catch((error) => {
    message.error('网络错误');
  });

}

