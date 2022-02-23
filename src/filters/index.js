const imgFilter = function (type, name) {
  // console.log(type, name);
  if (type === 0) {
    return require('../assets/imgs/type-04.png')
  } else if (type === 1) {
    switch (name) {
      case '交通':
        return require('../assets/imgs/type-05.png');
      case '住宿':
        return require('../assets/imgs/type-11.png');
      case '餐饮':
        return require('../assets/imgs/type-01.png');
      case '工资支出':
        return require('../assets/imgs/type-02.png');
      case '公司运营':
        return require('../assets/imgs/type-03.png');
      case '经费拨款':
        return require('../assets/imgs/type-07.png');
      case '接待购物':
        return require('../assets/imgs/type-06.png');
      case '其他':
        return require('../assets/imgs/type-08.png');
    }
  }
}

export {
  imgFilter
}