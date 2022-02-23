<template>
  <div>
    <!-- <h3>销售价格详情页面</h3> -->
    <div class="details-center">
      <div class="back-img" @click="gobackAdmin">
        <div>
          <img src="../../assets/imgs/goback.png" />
        </div>
        <span class="font">返回</span>
      </div>
    </div>
    <div v-show="detailsList.length > 1" id="myChart" style="width: 80%;height: 400px;margin: 30px auto;"></div>
    <div v-if="detailsList.length == 0" style="text-align: center;">
      <p>暂无价格列表</p>
    </div>
    <div class="details-bottom" v-if="detailsList.length !== 0">
      <div style="display: flex;justify-content: space-around;margin-bottom: 20px;">
        <div>
          <span>最高：</span>
          <span>{{'HKD ' + formatNumberRgx(priceList[priceList.length - 1])}}</span>
        </div>
        <div>
          <span>最低：</span>
          <span>{{'HKD ' + formatNumberRgx(priceList[0])}}</span>
        </div>
      </div>
      <table>
        <tr>
          <th>价格</th>
          <th>趋势</th>
          <th>更新时间</th>
        </tr>
        <tr v-for="(item,index) in detailsList" :key="index">
          <td>{{"HKD " + formatNumberRgx(item.price)}}</td>
          <td>
            <!-- 数组最后一项不显示此内容，该判断条件也决定了数组的长度需大于1 -->
            <div v-if="index < detailsList.length-1">
              <img :src="tendency2(index)" style="width: 25px;height: 25px;" />
            </div>
          </td>
          <td>{{item.time}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
  let that;
  export default {
    data() {
      return {
        price: '',
        detailsList: [],
        dialogDeletPriceVisible: false,
        priceList: [],
        highest: 0,
        lowest: 0,
        tendencyImg: '',
        img1: require('../../assets/imgs/upPrice.png'),
        img2: require('../../assets/imgs/downPrice.png'),
        xList: [],
        yList: [],

      }
    },
    props: ["priceDetailsList"],
    created() {
      console.log("销售价详情页面");
      console.log(this.priceDetailsList);
      this.detailsList = this.priceDetailsList;
      this.xList = [];
      this.yList = [];
      if (this.detailsList.length > 1) {
        for (let item of this.detailsList) {
          this.xList.push(/\d{4}-\d{1,2}-\d{1,2}/g.exec(item.time));
          this.yList.push(item.price);
        }
      }
      this.xList.reverse();
      this.yList.reverse();
      this.judgePrice();
    },
    mounted() {
      this.drawLine();
    },
    methods: {
      tendency2(i) {
        console.log('比较大小');
        if (this.detailsList[i].price > this.detailsList[i + 1].price) {
          return require('../../assets/imgs/upPrice.png');
        } else {
          return require('../../assets/imgs/downPrice.png');
        }
      },
      // 返回价格列表
      gobackAdmin() {
        this.$emit('gobackPriceAdmin', 0);
      },
      // 绘制折线图
      drawLine() {
        // Vue 实现响应式并不是数据发生变化之后 DOM 立即变化，nextTick会保证其内的代码在DOM更新后执行
        this.$nextTick(() => {
          // 基于准备好的dom，初始化echarts实例
          let myChart = this.$echarts.init(document.getElementById('myChart'));
          myChart.resize();
          // 绘制图表
          myChart.setOption({
            title: {
              text: '销售价折线统计图',
              x: 'center'
            },
            tooltip: {},
            xAxis: {
              data: this.xList
            },
            yAxis: {},
            series: [{
              name: '销售价',
              type: 'line',
              data: this.yList
            }]
          });
          window.addEventListener("resize", function () {
            myChart.resize();
          })
        })

      },
      // 判断最高最低价格
      judgePrice() {
        this.priceList = [];
        for (let price of this.detailsList) {
          this.priceList.push(price.price);
        }
        console.log(this.priceList);
        this.priceList.sort((a, b) => {
          return a - b;
        })
      },
    },
  }
</script>
<style lang="scss" scoped>
  .details-center {
    width: 95%;
    margin: 0 auto;

    .back-img {
      width: 75px;
      height: 45px;
      line-height: 45px;
      display: flex;
      justify-content: space-between;
      cursor: pointer;

      div {
        margin-top: 5px;

        img {
          width: 30px;
          height: 25px;
        }
      }

      .font {
        font-size: 17px;
      }
    }
  }

  .details-bottom {
    width: 92%;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 30px;

    td {
      height: 60px;
      margin: 10px 0;
      padding: 20px 0;
      background-color: #f3fbf9;
      font-size: 15px;
    }
  }

  table {
    width: 100%;
    table-layout: fixed;
    border-collapse: separate;
    border-spacing: 0;

    tr {

      th,
      td {
        width: 20%;
        text-align: center;
        border: 0;
      }
    }
  }
</style>