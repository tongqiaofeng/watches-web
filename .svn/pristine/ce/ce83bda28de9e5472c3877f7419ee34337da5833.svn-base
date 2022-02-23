exports.install = function (Vue, options) {
  // 日期转换
  Vue.prototype.shellDate = function (dates) {
    console.log(dates);
    if (dates !== '') {
      let date = new Date(dates);
      let y = date.getFullYear();
      let m = date.getMonth() + 1;
      let d = date.getDate();
      m = m < 10 ? ('0' + m) : m;
      d = d < 10 ? ('0' + d) : d;
      return y + '-' + m + '-' + d;
    } else {
      return "";
    }
  };
  // 千分价格
  Vue.prototype.formatNumberRgx = function (num) {
    // console.log(num);
    if (num !== null && num !== undefined) {
      let parts = num.toString().split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts.join(".");
    } else {
      return 0;
    }
  };
  Vue.prototype.formatStringRgx = function (param) {
    // console.log(param);
    let str = param.substring(0, param.length - 9);
    // console.log(str);
    return str;
  };
};