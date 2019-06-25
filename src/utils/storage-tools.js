const USER_KEY = 'USER_KEY';
const USER_TIME = 'USER_TIME';
// 过期时间
const EXPIRES_IN = 1000 * 3600 * 24 * 7;
// const EXPIRES_IN = 1000 * 5;
export default {
  setLoginItem (data) {
    localStorage.setItem(USER_KEY, JSON.stringify(data));
    localStorage.setItem(USER_TIME, Date.now());
  },
  getLoginItem () {
    const time = localStorage.getItem(USER_TIME);
    if (Date.now() - time > EXPIRES_IN) {
      // 过期了
      this.removeItem();
      return false;
    }
    // 没过期
    return JSON.parse(localStorage.getItem(USER_KEY));

  },

  removeItem () {
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(USER_TIME);
  }
}