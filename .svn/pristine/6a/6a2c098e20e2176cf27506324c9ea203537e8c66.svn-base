<template>
  <div>
    <!-- <h3>市场价格详情页面</h3> -->
    <div class="details-center">
      <div class="back-img" @click="gobackAdmin">
        <div>
          <img src="../../assets/imgs/goback.png" />
        </div>
        <span class="font">返回</span>
      </div>
    </div>
    <div v-show="detailsList.length > 1" id="myChart" style="width: 80%;height: 400px;margin: 30px auto;"></div>
    <div style="width: 50%;margin: 30px auto;display: flex;" v-show="bazaarAuthority[26] == 1">
      <el-input v-model="price" placeholder="请输入市场价格"></el-input>
      <el-button type="primary" @click="priceAdd" v-preventClick
        style="width: 100px;height: 40px;margin-left: 10px;font-size: 14px;">增
        加</el-button>
    </div>
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
          <th v-show="bazaarAuthority[26] == 1">操作</th>
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
          <td v-show="bazaarAuthority[26] == 1">
            <el-tooltip class="item" effect="light" content="删除信息" placement="top-end">
              <img src="../../assets/imgs/delete.png" style="cursor:pointer;" @click="deletPrice(item.id)" />
            </el-tooltip>
            <el-dialog title="删除市场价格" :visible.sync="dialogDeletPriceVisible">
              <div style="text-align: center;">
                <p>确定删除该市场价格？删除后不可恢复</p>
              </div>
              <div slot="footer">
                <el-button @click="dialogDeletPriceVisible = false">取 消</el-button>
                <el-button type="primary" @click="deletPriceSure" v-preventClick>确 定</el-button>
              </div>
            </el-dialog>
          </td>
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
        watchId: 0,
        detailsList: [],
        dialogDeletPriceVisible: false,
        priceId: 0,
        priceList: [],
        highest: 0,
        lowest: 0,
        tendencyImg: '',
        img1: require('../../assets/imgs/upPrice.png'),
        img2: require('../../assets/imgs/downPrice.png'),
        xList: [],
        yList: [],
        bazaarAuAuthority: [],

      }
    },
    props: ["priceDetailsList"],
    created() {
      console.log("批发价详情页面");
      console.log(this.priceDetailsList);
      this.bazaarAuthority = sessionStorage.getItem('authority').split('|');
      this.watchId = this.priceDetailsList.id;
      this.detailsList = this.priceDetailsList.bazaarPrices;
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
      // 增加市场价格
      priceAdd() {
        if (this.price == '') {
          this.$message.error({
            message: '请输入市场价格',
            showClose: true,
            duration: 2000
          })
        } else {
          this.$axios.post(this.$store.state.baseUrl + '/DataMaketPriceAdd', {
            id: this.watchId,
            price: this.price,
            flag: 2
          }).then((res) => {
            console.log('增加市场价格');
            console.log(res);
            this.$message.success({
              message: '增加市场价格成功',
              showClose: true,
              duration: 2000
            })
            this.detailsList = res.data;
            this.judgePrice();
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
            this.drawLine();
            this.price = '';
          }).catch((err) => {
            console.log(err);
          })
        }
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
              text: '市场价折线统计图',
              x: 'center'
            },
            tooltip: {},
            xAxis: {
              data: this.xList
            },
            yAxis: {},
            series: [{
              name: '市场价',
              type: 'line',
              data: this.yList
            }]
          });
          window.addEventListener("resize", function () {
            myChart.resize();
          })
        })

      },
      // 删除市场价格
      deletPrice(id) {
        console.log(id);
        this.priceId = id;
        this.dialogDeletPriceVisible = true;
      },
      // 确定删除
      deletPriceSure() {
        this.$axios.post(this.$store.state.baseUrl + '/DataMaketPriceDel', {
          id: this.priceId,
          watchId: this.watchId
        }).then((res) => {
          console.log('删除价格');
          console.log(res);
          this.detailsList = res.data;
          this.$message.success({
            message: '删除该市场价格成功',
            showClose: true,
            duration: 2000
          });
          this.judgePrice();
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
          this.drawLine();
          this.dialogDeletPriceVisible = false;
        }).catch((err) => {
          console.log(err);
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