<template>
  <div class="debt-statistics-container">
    <!-- <p>债务统计-公司</p> -->
    <div v-show="debtCompanySelect.select == 0">
      <div v-if="allNum == 0" class="debt-person">
        <p>{{personMsg}}</p>
      </div>
      <div v-else>
        <div style="text-align: right;">
          <el-button type="primary" style="width: 100px;height: 40px;font-size: 14px;" v-preventClick @click="allDebt">
            账单流水</el-button>
        </div>
        <div class="debt-person">
          <p style="font-size: 18px;font-weight: bold;"
            :style="{color: (companyAllDebt.allMoney > 0 ? '#0c8563' : 'red')}">
            <span>{{formatNumberRgx(companyAllDebt.allMoney) + ' '}}</span>
            <span>HKD</span>
          </p>
          <p style="color: #c0c0c0;">{{companyAllDebt.allMoney > 0 ? '待收款' : '待还款'}}</p>
        </div>
        <div class="person-table">
          <table>
            <tr>
              <th>对象</th>
              <th>金额</th>
              <th>操作</th>
            </tr>
            <tr v-for="(item,index) in companyAllDebt.list" :key="index">
              <td>
                <span>{{item.userId == 0 ? '公司' : item.nick}}</span>
              </td>
              <td>
                <span
                  :style="{color: (item.money > 0 ? '#0c8563' : 'red')}">{{item.money > 0 ? '待收：' : '待还：'}}{{item.money + ' '}}</span>
                <span style="font-size: 12px;">HKD</span>
              </td>
              <td>
                <el-tooltip class="item" effect="light" content="查看详情" placement="top-end">
                  <img src="../../assets/imgs/details.png" style="cursor: pointer;" @click="personDetails(item.userId)"
                    v-preventClick />
                </el-tooltip>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <div v-show="debtCompanySelect.select == 1">
      <div class="back-img" @click="gobackPersonList">
        <div>
          <img src="../../assets/imgs/goback.png" />
        </div>
        <span class="font">返回</span>
      </div>
      <Debt-company-bill ref="debtCompanyAllBill" :completedList="singleList"></Debt-company-bill>
    </div>
    <div v-show="debtCompanySelect.select == 2">
      <div class="single-top">
        <div class="back-img" @click="gobackPersonList" v-preventClick>
          <div>
            <img src="../../assets/imgs/goback.png" />
          </div>
          <span class="font">返回</span>
        </div>
        <el-button type="primary" style="width: 100px;height: 40px;font-size: 14px;" @click="singleAllCurrencyDebt"
          v-preventClick>账单流水
        </el-button>
      </div>
      <div class="debt-person">
        <span :style="{color: (singleDebt.allMoney > 0 ? '#0c8563' : 'red')}">
          <span>{{singleDebt.allMoney > 0 ? '待收：' : '待还：'}}</span>
          <span>{{formatNumberRgx(singleDebt.allMoney) + ' '}}</span>
        </span>
        <span style="font-size: 12px;">HKD</span>
      </div>
      <div class="person-table">
        <div v-for="(item,index) in singleDebt.list" :key="index" class="table-every">
          <div></div>
          <div :style="{color: (item.money > 0 ? '#0c8563' : 'red')}" class="every-main">
            <div>
              {{item.money > 0 ? '待收：' : '待还：'}}
            </div>
            <div class="main-money">
              <p style="lineHeight: 40px;">{{item.money + ' ' + item.currency}}
              </p>
            </div>
          </div>
          <div class="person-table-img">
            <img src="../../assets/imgs/right.png" @click="getSingleBill(item.currency)" v-preventClick />
          </div>
        </div>
      </div>
    </div>
    <div v-show="debtCompanySelect.select == 3">
      <div class="back-img" @click="gobackPersonSingleList" v-preventClick>
        <div>
          <img src="../../assets/imgs/goback.png" />
        </div>
        <span class="font">返回</span>
      </div>
      <Debt-company-bill ref="debtCompanyBill" :completedList="singleList"></Debt-company-bill>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        url: this.$store.state.baseUrl,
        personMsg: '数据加载中...',
        companyAllDebt: {},
        allNum: 0,
        singleDebt: {},
        personId: 0,
        singleList: [],

      }
    },
    props: ['debtCompanySelect'],
    created() {
      this.handleAllDebt();
    },
    methods: {
      // 获取公司总债务列表
      handleAllDebt() {
        this.$axios.post(this.url + '/allDebt?java', {
          type: 1
        }).then(res => {
          console.log('公司总债务列表');
          console.log(res);
          this.companyAllDebt = res.data;
          this.allNum = this.companyAllDebt.list.length;
          if (this.allNum == 0) {
            this.personMsg = '啊哦~暂无债务';
          }
        }).catch(err => {
          console.log(err);
        })
      },
      // 查看总流水
      allDebt() {
        this.$axios.post(this.url + '/companyStatementList?java', {
          flag: 2
        }).then(res => {
          console.log('总债务列表');
          console.log(res);
          this.singleList = res.data;
          this.debtCompanySelect.select = 1;
          this.$refs.debtCompanyAllBill.completedRecordList = this.singleList;
          this.$refs.debtCompanyAllBill.page = 1;
          this.$refs.debtCompanyAllBill.getList();
          this.$refs.debtCompanyAllBill.keyword = '';
          this.$refs.debtCompanyAllBill.flag = ['支出', '收入'];
          this.$refs.debtCompanyAllBill.startTime = '';
          this.$refs.debtCompanyAllBill.endTime = '';
        }).catch(err => {
          console.log(err);
        })
      },
      // 查看与该用户不同币种的债务列表
      personDetails(userId) {
        this.personId = userId;
        this.$axios.post(this.url + '/singleDebt?java', {
          userId: this.personId,
          flag: 0
        }).then(res => {
          console.log('单个债务列表');
          console.log(res);
          this.singleDebt = res.data;
          this.debtCompanySelect.select = 2;
        }).catch(err => {
          console.log(err);
        })
      },
      // 获取与该用户的所有流水
      singleAllCurrencyDebt() {
        this.$axios.post(this.url + '/companyStatementList?java', {
          userId: this.personId
        }).then(res => {
          console.log('与该用户的所有流水');
          console.log(res);
          this.singleList = res.data;
          this.debtCompanySelect.select = 3;
          this.$refs.debtCompanyBill.completedRecordList = this.singleList;
          this.$refs.debtCompanyBill.page = 1;
          this.$refs.debtCompanyBill.getList();
          this.$refs.debtCompanyBill.userId = this.personId;
          this.$refs.debtCompanyBill.currency = '';
          this.$refs.debtCompanyBill.keyword = '';
          this.$refs.debtCompanyBill.flag = ['支出', '收入'];
          this.$refs.debtCompanyBill.startTime = '';
          this.$refs.debtCompanyBill.endTime = '';
        }).catch(err => {
          console.log(err);
        })
      },
      // 获取与该用户某一币种的流水
      getSingleBill(currency) {
        this.$axios.post(this.url + '/companyStatementList?java', {
          userId: this.personId,
          currency: currency
        }).then(res => {
          console.log('与该用户当前币种的所有流水');
          console.log(res);
          this.singleList = res.data;
          this.debtCompanySelect.select = 3;
          this.$refs.debtCompanyBill.completedRecordList = this.singleList;
          this.$refs.debtCompanyBill.page = 1;
          this.$refs.debtCompanyBill.getList();
          this.$refs.debtCompanyBill.userId = this.personId;
          this.$refs.debtCompanyBill.currency = currency;
          this.$refs.debtCompanyBill.keyword = '';
          this.$refs.debtCompanyBill.flag = ['支出', '收入'];
          this.$refs.debtCompanyBill.startTime = '';
          this.$refs.debtCompanyBill.endTime = '';
        }).catch(err => {
          console.log(err);
        })
      },
      // 返回总债务列表
      gobackPersonList() {
        this.debtCompanySelect.select = 0;
      },
      // 返回个人债务列表
      gobackPersonSingleList() {
        this.debtCompanySelect.select = 2;
      },
    }
  }
</script>

<style lang="scss" scoped>
  .debt-statistics-container {
    width: 90%;
    margin: 0 auto;
    padding: 20px 30px 30px;
    background-color: #fff;
    border-radius: 30px;

    .debt-person {
      margin-top: 10px;
      text-align: center;
    }

    .person-table {
      width: 100%;
      margin-top: 40px;

      th {
        height: 50px;
        line-height: 50px;
        background-color: #d7ebe7;
      }

      td {
        padding: 20px;
        background-color: #f3fbf9;
        border-bottom: 1px solid #d7ebe7;
      }

      .table-every {
        width: 500px;
        margin: 0 auto;
        margin-top: 20px;
        height: 40px;
        line-height: 40px;
        padding: 15px;
        display: flex;
        justify-content: space-between;
        border: 1px solid #aaa;
        border-radius: 5px;

        .every-main {
          display: flex;

          .main-money {
            height: 40px;
            line-height: 40px;
          }

          p {
            height: 20px;
            line-height: 20px;
            margin: 0;
          }
        }

        .person-table-img {
          line-height: 50px;

          img {
            width: 20px;
            height: 20px;
            cursor: pointer;
          }
        }
      }
    }

    .person-table tr:hover>td {
      background-color: #d7ebe7 !important;
    }

    .single-top {
      display: flex;
      justify-content: space-between;
    }

    .back-img {
      width: 75px;
      height: 45px;
      margin-bottom: 15px;
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

    .un-handle-msg {
      .msg-top {
        text-align: center;
      }

      .msg-main {
        padding-left: 30px;

        .main-message {
          padding-left: 20px;
          color: #606266;
        }
      }

      .tag-read {
        width: 20px;
        height: 20px;
        margin-left: 5px;
        border: 0;
        background: url('../../assets/imgs/copy.png') no-repeat;
        background-size: cover;
        cursor: pointer;
      }
    }

    .input-style {
      width: 60% !important;
    }

    table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 0;
    }

    tr {

      th,
      td {
        width: 33%;
        text-align: center;
      }
    }
  }
</style>