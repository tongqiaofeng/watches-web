<template>
  <div>
    <!-- <h1>结算单页面</h1> -->
    <div v-show="buySettleOrderList.length == 0" ref="hello" style="text-align: center;">
      <!-- <p>{{hintMsg}}</p> -->
      <p v-if="buySettleOrderList.length == 0">啊哦~暂无数据</p>
    </div>
    <div v-if="buySettleOrderList.length !== 0">
      <table>
        <tr>
          <th>结算单号</th>
          <th>创建时间</th>
          <th>金额</th>
          <th>状态</th>
          <th>查看详情</th>
        </tr>
        <tr v-for="(item,index) of buySettleOrderList" :key="index">
          <td>{{item.orderNo}}</td>
          <td>{{item.createTime}}</td>
          <td>{{formatNumberRgx(item.money) + ' ' + HKD}}</td>
          <td>
            <img :src="item.state == 0 ? img1 : (item.state == 1 ? img2 : img3)" />
            <span>{{item.state == 0 ? '未打款' : (item.state == 1 ? '等待收款人确认' : '已完成')}}</span>
          </td>
          <td></td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        hintMsg: '数据加载中...',
        total: 0,
        buySettleOrderList: [],
        img1: require('../../assets/imgs/error.png'),
        img2: require('../../assets/imgs/warning.png'),
        img3: require('../../assets/imgs/sureImg.png'),

      }
    },
    mounted() {
      this.getBuySettleOrderList();
    },
    methods: {
      // 获取结算单列表
      getBuySettleOrderList() {
        this.hintMsg = '数据加载中...';
        this.$axios.post(this.$store.state.baseUrl + '/BuySettleOrderList').then((res) => {
          console.log('结算单列表');
          console.log(res);
          if (this.buySettleOrderList.length == 0) {
            this.hintMsg = '啊哦~暂无数据'
          }
        }).catch((err) => {
          console.log(err);
        })
      },
    }
  }
</script>
<style lang="scss" scoped>

</style>