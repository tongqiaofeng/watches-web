<template>
  <div class="rate-query-container">
    <!-- <h3>汇率查询页面</h3> -->
    <div class="rate-query" v-if="rateQuerySel.select == 0">
      <div class="rate-query-top">
        <div>
          <span>日期：</span>
          <el-date-picker v-model="time" type="date" style="width:230px" @change="dateChange" value-format="yyyy-MM-dd">
          </el-date-picker>
        </div>
        <div v-show="rateAuthority[9] == 1" style="display: flex;cursor: pointer;" @click="rateCalc">
          <img src="../../assets/imgs/calc.png" style="height: 45px;" />
        </div>
        <el-dialog title="价格计算器" :visible.sync="dialogCalcVisible" center :close-on-press-escape="false"
          :close-on-click-modal="false">
          <div class="rate-calc">
            <div class="calc-top">
              <div>
                <el-date-picker v-model="calcTime" type="date" style="width: 50%;" @change="dateChange2"
                  value-format="yyyy-MM-dd">
                </el-date-picker>
                <el-button type="primary" @click="handleRateCalcResult" class="calc-button">计算</el-button>
              </div>
              <p style="width: 40%;margin: 20px auto;text-align: left;">
                <span>{{1 + ' ' + selectCurrency + ' = '}}</span>
                <span>{{selectRate + ' CNY'}}</span>
              </p>
              <p style="width: 40%;margin: 0 auto;text-align: left;">
                <span>{{1 + ' CNY' + ' = '}}</span>
                <span>{{selectHKD + ' HKD'}}</span>
              </p>
            </div>
            <div class="calc-center">
              <h4 style="margin-bottom: 0;">结果：</h4>
              <div>
                <div style="display: flex;">
                  <p style="width: 130px;margin-top: 0;text-align: right;">税后价格：</p>
                  <span>{{VATInc}}</span>
                </div>
                <div style="display: flex;">
                  <p style="width: 130px;margin-top: 0;text-align: right;">最终人民币：</p>
                  <span>{{CNYFinal}}</span>
                </div>
                <div style="display: flex;">
                  <p style="width: 130px;margin-top: 0;text-align: right;">最终港币：</p>
                  <span>{{HKDFinal}}</span>
                </div>
              </div>
            </div>
            <div class="calc-bottom">
              <el-form label-width="100px">
                <el-form-item label="地区：">
                  <div style="display: flex;">
                    <el-select class="input-style" v-model="country" @change="countryChange">
                      <el-option v-for="(item,index) in countryList" :key="index" :label="item.cnName"
                        :value="item.cnName">
                      </el-option>
                    </el-select>
                    <div style="margin-top: 10px;margin-left: 5px;">
                      <img src="../../assets/imgs/position.png" style="width: 25px;height: 25px;cursor: pointer;"
                        @click="countryPosition" />
                    </div>
                  </div>
                </el-form-item>
                <el-form-item label="价格：">
                  <el-input v-model="price" class="input-style" placeholder="请输入">
                    <i slot="suffix" style="color: #000;margin-right:5%;font-style:normal;">{{selectCurrency}}</i>
                  </el-input>
                </el-form-item>
              </el-form>
              <el-form :inline="true" label-width="100px">
                <el-form-item label="退税：">
                  <el-radio-group v-model="rateSymbol">
                    <el-radio label="x"></el-radio>
                    <el-radio label="÷"></el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="">
                  <el-input v-model="rateNum" placeholder="请输入" class="input-style"></el-input>
                </el-form-item>
              </el-form>
              <el-form label-width="100px">
                <el-form-item label="退税折损：">
                  <el-input v-model="breakage" class="input-style">
                    <i slot="suffix" style="color: #000;margin-right:5%;font-style:normal;">%</i>
                  </el-input>
                </el-form-item>
                <el-form-item label="折扣：">
                  <el-input v-model="discount" class="input-style">
                    <i slot="suffix" style="color: #000;margin-right:5%;font-style:normal;">个点</i>
                  </el-input>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <div slot="footer">
            <el-button @click="dialogCalcVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogCalcVisible = false">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      <div>
        <div v-show="dataRateList.length !== 0">
          <p>银行汇率：<span>{{time1}}</span></p>
          <div class="rate-query-center">
            <table>
              <tr>
                <th>币种</th>
                <th>汇率</th>
                <th>操作</th>
              </tr>
              <tr v-for="(rate,index) in dataRateList" :key="index">
                <td v-show="rate.type == 0">
                  {{rate.currencyCn + ' ' + rate.currencyEn}}
                </td>
                <td v-show="rate.type == 0">
                  <span>{{rate.rate}}</span>
                  <img v-show="rate.change !== 0" :src="rate.change == 1 ? img1 : img2"
                    style="width: 25px;height: 25px;" />
                </td>
                <td v-show="rate.type == 0">
                  <el-tooltip class="item" effect="light" content="查看汇率变化曲线图" placement="top-end">
                    <img :src="rate.change == 1 ? upImg : (rate.change == -1 ? downImg : noImg)" style="cursor:pointer;"
                      @click="rateLine(rate.type,rate.currencyEn)" />
                  </el-tooltip>
                </td>
              </tr>
            </table>
          </div>
          <p>钱庄汇率：<span>{{time2}}</span></p>
          <div class="rate-query-center">
            <table>
              <tr>
                <th>货币</th>
                <th>汇率</th>
                <th>操作</th>
              </tr>
              <tr v-for="(rate,index) in dataRateList" :key="index">
                <td v-if="rate.type == 2">
                  {{rate.currencyCn + ' -> ' + '人民币'}}
                </td>
                <td v-if="rate.type == 2">
                  <div style="display: flex;justify-content: center;">
                    <div style="display: flex;justify-content: center;">
                      <input type="text" v-model="rate.rate" class="freight-input"
                        :readonly="rateAuthority[8] == 1 ? false : true" @change="rateInput($event)" />
                      <div style="margin-top: 15px;margin-left: 5px;cursor: pointer;">
                        <img src="../../assets/imgs/preserve.png" v-if="rateAuthority[8] == 1"
                          @click="rateInputChange" />
                      </div>
                    </div>
                    <div style="margin-top: 10px;">
                      <img v-show="rate.change !== 0" :src="rate.change == 1 ? img1 : img2"
                        style="width: 25px;height: 25px;margin-left: 5px;" />
                    </div>
                  </div>
                </td>
                <td v-if="rate.type == 2">
                  <el-tooltip class="item" effect="light" content="查看汇率变化曲线图" placement="top-end">
                    <img :src="rate.change == 1 ? upImg : (rate.change == -1 ? downImg : noImg)" style="cursor:pointer;"
                      @click="rateLine(rate.type,rate.currencyEn)" />
                  </el-tooltip>
                </td>
              </tr>
            </table>
          </div>
          <p>现钞汇率</p>
          <div class="rate-query-center">
            <table>
              <tr>
                <th>货币</th>
                <th>买入价</th>
                <th>卖出价</th>
                <th>操作</th>
              </tr>
              <tr v-for="(rate,index) in dataRateList" :key="index">
                <td v-show="rate.currencyCn !== '港币' && rate.type == 0">
                  {{rate.currencyCn + ' -> ' + '港币'}}
                </td>
                <td v-show="rate.currencyCn !== '港币' && rate.type == 0">
                  <span>{{(rate.rate/moneyShopRate).toFixed(5)}}</span>
                </td>
                <td v-show="rate.currencyCn !== '港币' && rate.type == 0">
                  <span>{{(Number(rate.rate/moneyShopRate + 0.003)).toFixed(5)}}</span>
                </td>
                <td v-show="rate.currencyCn !== '港币' && rate.type == 0">
                  <el-tooltip class="item" effect="light" content="查看汇率变化曲线图" placement="top-end">
                    <img src="../../assets/imgs/line.png" style="cursor:pointer;"
                      @click="rateLineOof(rate.currencyEn)" />
                  </el-tooltip>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div v-if="rateQuerySel.select == 1">
      <div class="goback">
        <div class="back-img" @click="gobackList">
          <div>
            <img src="../../assets/imgs/goback.png" />
          </div>
          <span class="font">返回</span>
        </div>
      </div>
      <div id="myChart" style="width: 95%;height: 500px;margin: 0 auto;margin-top: 50px;"></div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        img1: require('../../assets/imgs/upPrice.png'),
        img2: require('../../assets/imgs/downPrice.png'),
        upImg: require('../../assets/imgs/up-line.png'),
        noImg: require('../../assets/imgs/line.png'),
        downImg: require('../../assets/imgs/down-line.png'),
        time: '',
        dataRateList: [],
        dataRateHistoryList: [],
        xList: [],
        yList: [],
        yList2: [],
        updateRate: 0,
        moneyShopRate: 0,
        dialogCalcVisible: false,
        calcRateList: [],
        calcTime: '',
        selectCurrency: '',
        selectRate: '',
        selectHKD: '',
        VATInc: '', // 税后价格
        CNYFinal: '', // 最终人民币
        HKDFinal: '', // 最终港币
        countryList: [],
        country: '', // 国家
        price: '', // 价格
        rateSymbol: '', // 退税运算符号
        rateNum: '', // 退税数值
        breakage: 10, // 退税折损
        discount: 0, // 折扣

        time1: '',
        time2: '',
        moneyShopHistory: [],
        rateAuthority: [],

      }
    },
    props: ["rateQuerySel"],
    created() {
      this.role = sessionStorage.getItem('role');
      this.rateAuthority = sessionStorage.getItem('authority').split('|');
      this.handleDataRatesGet();
      this.handleCountryGet();
    },
    methods: {
      // 时间查询汇率
      handleDataRatesGet() {
        console.log(this.time);
        this.dataRateList = [];
        this.$axios.post(this.$store.state.baseUrl + '/DataRatesGet?java', {
          time: this.time
        }).then((res) => {
          console.log('时间查询汇率');
          console.log(res);
          // this.time = res.data.time;
          this.dataRateList = res.data;
          for (let item of this.dataRateList) {
            if (item.type === 2) {
              this.moneyShopRate = item.rate;
              this.time2 = item.time;
              if (this.time !== '') {
                if (item.time !== this.time) {
                  this.$message.warning({
                    message: '此日期汇率数据不完整，已为您展示最近完整数据',
                    showClose: true,
                    duration: 5000
                  })
                };
              };
            } else if (item.type === 0) {
              this.time1 = item.time;
            }
          };
          console.log(this.moneyShopRate);
        }).catch((err) => {
          console.log(err);
        })
      },
      // 汇率查询
      dateChange() {
        this.dataRateList = [];
        this.handleDataRatesGet();
      },
      // 钱庄汇率改变
      rateInput(e) {
        console.log(e.target.value);
        this.updateRate = e.target.value;
      },
      // 确定修改钱庄汇率
      rateInputChange() {
        let date = new Date();
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        let d = date.getDate();
        m = m < 10 ? ('0' + m) : m;
        d = d < 10 ? ('0' + d) : d;
        let times = y + '-' + m + '-' + d;
        this.$axios.post(this.$store.state.baseUrl + '/DataRateSave?java', {
          time: times,
          rate: this.updateRate
        }).then((res) => {
          console.log('修改钱庄汇率');
          console.log(res);
          this.$message.success({
            message: '汇率修改成功',
            showClose: true,
            duration: 2000
          });
          this.handleDataRatesGet();
          (function smoothscroll() {
            var currentScroll =
              document.documentElement.scrollTop || document.body.scrollTop;
            if (currentScroll > 0) {
              window.requestAnimationFrame(smoothscroll);
              window.scrollTo(0, currentScroll - currentScroll / 5);
            }
          })();
        }).catch((err) => {
          console.log(err);
        })
      },
      // 币种历史汇率
      rateLine(type, currency) {
        console.log(type, currency);
        this.dataRateHistoryList = [];
        this.xList = [];
        this.yList = [];
        (function smoothscroll() {
          var currentScroll =
            document.documentElement.scrollTop || document.body.scrollTop;
          if (currentScroll > 0) {
            window.requestAnimationFrame(smoothscroll);
            window.scrollTo(0, currentScroll - currentScroll / 5);
          }
        })();
        this.$axios.post(this.$store.state.baseUrl + '/DataRateHisGet?java', {
          currency: currency,
          type: type
        }).then((res) => {
          console.log('币种历史汇率');
          console.log(res);
          this.dataRateHistoryList = res.data;
          for (let item of this.dataRateHistoryList) {
            this.xList.push(item.time);
            this.yList.push(item.rate);
          };
          // console.log(this.xList);
          // console.log(this.yList);
          this.rateQuerySel.select = 1;
          // Vue 实现响应式并不是数据发生变化之后 DOM 立即变化，nextTick会保证其内的代码在DOM更新后执行
          this.$nextTick(() => {
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById('myChart'));
            myChart.resize();
            // 绘制图表
            myChart.setOption({
              title: {
                text: '汇率变化曲线图',
                x: 'center'
              },
              tooltip: {},
              xAxis: {
                data: this.xList
              },
              yAxis: {},
              series: [{
                name: '汇率',
                type: 'line',
                data: this.yList
              }]
            });
            window.addEventListener("resize", function () {
              myChart.resize();
            })
          })
        }).catch((err) => {
          console.log(err);
        })
      },
      // 现钞历史汇率
      rateLineOof(currency) {
        console.log(currency);
        this.moneyShopHistory = [];
        this.xList = [];
        this.yList = [];
        this.yList2 = [];
        (function smoothscroll() {
          var currentScroll =
            document.documentElement.scrollTop || document.body.scrollTop;
          if (currentScroll > 0) {
            window.requestAnimationFrame(smoothscroll);
            window.scrollTo(0, currentScroll - currentScroll / 5);
          }
        })();
        this.$axios.post(this.$store.state.baseUrl + '/DataRateHistory?java', {
          currency: currency,
        }).then((res) => {
          console.log('现钞历史汇率');
          console.log(res);
          this.moneyShopHistory = res.data;
          for (let item of this.moneyShopHistory) {
            this.xList.push(item.time);
            this.yList.push(Number(item.bankRate / item.underBankRate).toFixed(5));
            this.yList2.push(Number((Number(item.bankRate / item.underBankRate) + 0.003)).toFixed(5));
          };
          this.rateQuerySel.select = 1;
          (function smoothscroll() {
            var currentScroll =
              document.documentElement.scrollTop || document.body.scrollTop;
            if (currentScroll > 0) {
              window.requestAnimationFrame(smoothscroll);
              window.scrollTo(0, currentScroll - currentScroll / 5);
            }
          })();
          if (this.yList.length !== 0 && this.yList2.length !== 0) {
            this.oofLine();
          }
        }).catch((err) => {
          console.log(err);
        })
      },
      // 现钞汇率变化曲线图
      oofLine() {
        // Vue 实现响应式并不是数据发生变化之后 DOM 立即变化，nextTick会保证其内的代码在DOM更新后执行
        this.$nextTick(() => {
          // 基于准备好的dom，初始化echarts实例
          let myChart = this.$echarts.init(document.getElementById('myChart'));
          myChart.resize();
          // 绘制图表
          myChart.setOption({
            title: {
              text: '汇率变化曲线图',
              x: '10%'
            },
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              x: '70%',
              textStyle: {
                color: '#000',
                fontSize: '16px'
              },
              icon: 'rect',
              itemWidth: 20,
              itemHeight: 15,
              data: ['买入价', '卖出价'],
            },
            xAxis: {
              data: this.xList
            },
            yAxis: {},
            series: [{
                name: '买入价',
                type: 'line',
                data: this.yList
              },
              {
                name: '卖出价',
                type: 'line',
                data: this.yList2
              }
            ]
          });
          window.addEventListener("resize", function () {
            myChart.resize();
          })
        })
      },
      // 返回列表页
      gobackList() {
        this.rateQuerySel.select = 0;
      },
      // 汇率计算器
      rateCalc() {
        this.calcTime = '';
        this.dateChange2();

        this.VATInc = ''; // 税后价格
        this.CNYFinal = ''; // 最终人民币
        this.HKDFinal = ''; // 最终港币
        this.price = ''; // 价格
        // this.rateSymbol = 'x'; // 退税运算符号
        // this.rateNum = ''; // 退税数值
        // this.breakage = 10; // 退税折损
        // this.discount = 0; // 折扣

        this.dialogCalcVisible = true;
      },
      // 计算器时间查询汇率
      dateChange2() {
        this.calcRateList = [];
        this.$axios.post(this.$store.state.baseUrl + '/DataRatesGet?java', {
          time: this.calcTime
        }).then((res) => {
          console.log('时间查询汇率');
          console.log(res);
          this.calcRateList = res.data;
          for (let item of this.calcRateList) {
            if (item.type == 2) {
              console.log(item.rate);
              this.selectHKD = Number(Number(1 / item.rate) + 0.003).toFixed(5);
            } else if (item.type == 0) {
              this.calcTime = item.time;
            }
          };
          if (this.country !== '') {
            this.countryChange();
          };
        }).catch((err) => {
          console.log(err);
        })
      },
      // 定位获得当前国家
      countryPosition() {
        console.log(navigator.geolocation);
        if (navigator.geolocation) {
          console.log("h5 定位中");
          navigator.geolocation.getCurrentPosition(function (position) {
            if (typeof position.address !== "undefined") {
              console.log('h5定位成功；');
              this.country = position.address.country;
              this.countryChange();
            }
            console.log(this.country);
          }, function (error) {
            console.log('h5定位失败；');
          })
        }
      },
      // 国家选择
      countryChange() {
        this.price = '';
        this.VATInc = '';
        this.CNYFinal = '';
        this.HKDFinal = '';
        for (let item of this.countryList) {
          // console.log(item);
          // console.log(this.country);
          if (this.country == item.cnName) {
            console.log('国家选择');
            console.log(item);
            this.selectCurrency = item.enCurrency;
            if (item.taxType == 0) {
              this.rateSymbol = 'x';
            } else if (item.taxType == 1) {
              this.rateSymbol = '÷';
            } else {
              this.rateSymbol = '';
            };
            if (item.taxRate == 0) {
              this.rateNum = '';
            } else {
              this.rateNum = item.taxRate;
            };
          };
          console.log(this.rateSymbol);
        };
        console.log(this.selectCurrency);
        this.selectRate = 0;
        for (let item of this.calcRateList) {
          console.log(item);
          if (item.currencyEn == this.selectCurrency) {
            this.selectRate = item.rate;
          };
        };
        if (this.country == '中国') {
          this.selectRate = 1;
        };
        if (this.selectRate == 0) {
          this.$message.error({
            message: '暂无该地区此时间对应汇率',
            showClose: true,
            duration: 2000
          })
        }
        console.log(this.selectRate);
      },
      // 计算结果
      handleRateCalcResult() {
        if (this.breakage == '') {
          this.breakage = 0;
        };
        if (this.discount == '') {
          this.discount = 0;
        };
        // 税后价格
        if (this.rateSymbol == 'x') {
          this.VATInc = Number((this.price - this.price * this.rateNum) * (this.breakage / 100) + this.price * this
            .rateNum).toFixed(3);
        } else if (this.rateSymbol == '÷') {
          this.VATInc = Number((this.price - this.price / this.rateNum) * (this.breakage / 100) + this.price / this
            .rateNum).toFixed(3);
        };
        // 最终人民币
        this.CNYFinal = Number(this.VATInc * this.selectRate * (100 - this.discount) / 100).toFixed(3);
        // 最终港币
        this.HKDFinal = Number(this.CNYFinal * (1 / this.selectHKD + 0.003)).toFixed(3);
        console.log(this.VATInc);
        console.log(this.CNYFinal);
        console.log(this.HKDFinal);
        if (this.rateNum !== '') {
          for (let item of this.countryList) {
            // console.log(item);
            // console.log(this.country);
            if (this.country == item.cnName) {
              item.taxRate = this.rateNum;
              console.log(item);
            };
            console.log(this.rateSymbol);
          };
        }
      },
      // 获取所有国家
      handleCountryGet() {
        this.$axios.post(this.$store.state.baseUrl + '/CountryGet?java').then((res) => {
          console.log('国家列表');
          console.log(res);
          this.countryList = res.data;
        })
      },
    },
  }
</script>
<style lang="scss" scoped>
  .rate-query-container {
    width: 100%;

    .rate-query {
      width: 95%;
      margin: 0 auto;

      .rate-query-top {
        width: 95%;
        margin: 0 auto;
        padding: 20px 40px;
        display: flex;
        justify-content: space-between;
        background-color: #fff;
        border-radius: 30px;
      }

      .rate-query-center {
        margin: 20px 0;
        padding: 20px 30px;
        background-color: #fff;
        border-radius: 30px;

        th {
          height: 50px;
          line-height: 50px;
          background-color: #d7ebe7;
        }

        td {
          padding: 20px;
          background-color: #f3fbf9;
          border-bottom: 1px solid #d7ebe7;

          .freight-input {
            width: 40%;
            height: 40px;
            border: 0;
            border-bottom: 1px solid #ddd;
            outline: none;
            background-color: transparent;
            text-align: center;
          }
        }
      }
    }

    .goback {
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

    .rate-calc {
      // width: 80%;
      // margin: 0 auto;
      // background-color: #fff;
      // border-radius: 30px;

      .calc-top {
        // width: 50%;
        margin: 0 auto;
        text-align: center;

        .calc-button {
          width: 110px;
          height: 40px !important;
          margin-left: 20px;
          font-size: 14px !important;
        }
      }

      .calc-center {
        width: 70%;
        margin: 30px auto;
        margin-bottom: 0;
        padding: 0 30px;
        border: 1px solid #ddd;
        border-radius: 30px;
      }

      .calc-bottom {
        // width: 60%;
        margin: 0 auto;
        padding: 30px;
      }
    }
  }

  .input-style {
    width: 90%;
  }

  table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
  }

  tr {

    th,
    td {
      width: 20%;
      text-align: center;
    }
  }
</style>