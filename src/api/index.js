import ajax from './ajax';

// export default function (username, password) {
//   return ajax('/login', {username, password}, 'post')
// }

export default (username, password) => ajax('/login', {username, password}, 'post');
