<template>
  <div class="my-borrow-container" id="my-borrow">
    <!-- 我的借贷 -->
    <div v-show="myBorrowSelect.select == 0">
      <div style="display: flex;justify-content: flex-end;">
        <div class="addBtn" @click="addBorrow">
          <span class="add-style">
            <span>+</span> 新增记录
          </span>
        </div>
      </div>
      <div>
        <el-tabs type="border-card" v-model="addBorrowListActiveName" @tab-click="handleMyBorrowListClick">
          <el-tab-pane label="我的待办事项" name="backlog">
            <div slot="label" style="display: flex;justify-content: center;font-size: 15px;">我的待办事项
              <p style="margin-top: -10px;margin-left: 3px;">
                <img v-if="unHandleCircle == 1" src="../../assets/imgs/circle.png" style="width: 10px;height: 10px;" />
              </p>
            </div>
            <div v-if="unHandleList.length == 0" style="text-align: center;">
              <p>{{backlogMsg}}</p>
            </div>
            <div v-else>
              <Un-handle-list ref="unHandleList" :unHandleList="unHandleList" :unHandleSelect="unHandleSelect"
                @applyResult="applyResult" @signUn="signUn">
              </Un-handle-list>
            </div>
          </el-tab-pane>
          <el-tab-pane label="对方处理中" name="inhand">
            <div slot="label" style="display: flex;justify-content: center;font-size: 15px;">对方处理中
              <p style="margin-top: -10px;margin-left: 3px;">
                <img v-if="inHandleCircle == 1" src="../../assets/imgs/circle.png" style="width: 10px;height: 10px;" />
              </p>
            </div>
            <div v-if="inHandleList.length == 0" style="text-align: center;">
              <p>{{inhandMsg}}</p>
            </div>
            <div v-else>

              <In-handle-list ref="inHandleList" :inHandleList="inHandleList" @applyResult="applyResult"
                @signIn="signIn">
              </In-handle-list>
            </div>
          </el-tab-pane>
          <el-tab-pane label="已完成" name="offstocks">
            <div slot="label" style="display: flex;justify-content: center;font-size: 15px;">已完成
              <p style="margin-top: -10px;margin-left: 3px;">
                <img v-if="completedCircle == 1" src="../../assets/imgs/circle.png" style="width: 10px;height: 10px;" />
              </p>
            </div>
            <div v-if="completedList.length == 0" style="text-align: center;">
              <p>{{completedMsg}}</p>
            </div>
            <div v-else>

              <Completed-handle-list ref="completedHandleList" :completedList="completedList" @signCom="signCom">
              </Completed-handle-list>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>

    <div v-if="myBorrowSelect.select == 1">
      <div class="back-img" @click="gobackMain">
        <div>
          <img src="../../assets/imgs/goback.png" />
        </div>
        <span class="font">返回</span>
      </div>
      <el-tabs type="border-card" v-model="addBorrowActiveName" @tab-click="handleMyBorrowClick">
        <el-tab-pane label="向公司借款" name="company">
          <My-borrow-record ref="record" :recordSelect="addBorrowActiveName" :recordListData="recordListData"
            @recordSubmit="recordSubmit">
          </My-borrow-record>
        </el-tab-pane>
        <el-tab-pane label="向同事借款" name="fellow">
          <My-borrow-record ref="fellow_record" :recordSelect="addBorrowActiveName" :recordListData="recordListData"
            @recordSubmit="recordSubmit">
          </My-borrow-record>
        </el-tab-pane>
        <el-tab-pane label="向同事转账" name="transfer">
          <My-borrow-record ref="transfer_record" :recordSelect="addBorrowActiveName" :recordListData="recordListData"
            @recordSubmit="recordSubmit">
          </My-borrow-record>
        </el-tab-pane>
      </el-tabs>
    </div>

  </div>
</template>
<script>
  export default {
    data() {
      return {
        url: this.$store.state.baseUrl,
        backlogMsg: '数据加载中...',
        addBorrowActiveName: 'company',
        addBorrowListActiveName: 'backlog',
        recordListData: {
          countryList: [],
          userList: [],
          bankList: [],
        },
        unHandleList: [], // 我的待办事项
        unHandleSelect: {
          select: 0
        },
        unHandleCircle: 0,
        inHandleList: [], // 对方处理中
        inhandMsg: '数据加载中...',
        inHandleCircle: 0,
        completedList: [], // 已完成
        completedCircle: 0,
        completedMsg: '数据加载中...',

      }
    },
    props: ["myBorrowSelect"],
    mounted() {
      this.handleCountryGet();
      this.handlebankCardList();
      this.handleUserListInfo();
      this.handleBorrowList();
    },
    methods: {

      signUn(val) {
        this.unHandleCircle = val;
      },
      signIn(val) {
        this.inHandleCircle = val;
      },
      signCom(val) {
        this.completedCircle = val;
      },
      // 新增记录
      addBorrow() {
        this.addBorrowActiveName = 'company';

        this.myBorrowSelect.select = 1;
        this.handleMyBorrowClick();
      },
      // 添加记录成功或失败
      recordSubmit(result) {
        this.myBorrowSelect.select = result;
        this.handleBorrowList().then(() => {
          // this.$refs.unHandleList.page = 1;
          // this.$refs.unHandleList.getList();
          this.$refs.inHandleList.page = 1;
          this.$refs.inHandleList.getList();
          // this.$refs.completedHandleList.page = 1;
          // this.$refs.completedHandleList.getList();
        })
      },
      // 新增记录tab切换
      handleMyBorrowClick() {
        console.log(this.addBorrowActiveName);
        if (this.addBorrowActiveName == 'company') {

          this.$nextTick(() => {
            this.$refs.record.userId = '';
            this.$refs.record.subMoney = '';
            this.$refs.record.type = '银行卡';
            this.$refs.record.bankAccount = '';
            this.$refs.record.id = '';
            this.$refs.record.describe = '';
          })
        } else if (this.addBorrowActiveName == 'fellow') {
          this.$nextTick(() => {
            this.$refs.fellow_record.userId = '';
            this.$refs.fellow_record.subMoney = '';
            this.$refs.fellow_record.type = '银行卡';
            this.$refs.fellow_record.bankAccount = '';
            this.$refs.fellow_record.id = '';
            this.$refs.fellow_record.describe = '';
          })
        } else {
          this.$nextTick(() => {
            this.$refs.transfer_record.userId = '';
            this.$refs.transfer_record.subMoney = '';
            this.$refs.transfer_record.type = '银行卡';
            this.$refs.transfer_record.bankAccount = '';
            this.$refs.transfer_record.id = '';
            this.$refs.transfer_record.describe = '';
          })
        }
      },
      // 列表项tab切换
      handleMyBorrowListClick() {
        if (this.addBorrowListActiveName == 'backlog') {
          this.unHandleSelect.select = 0;
          if (this.unHandleList.length !== 0) {
            this.$refs.unHandleList.page = 1;
            this.$refs.unHandleList.getList();
          }

        } else if (this.addBorrowListActiveName == 'inhand') {
          if (this.inHandleList.length !== 0) {
            this.$refs.inHandleList.page = 1;
            this.$refs.inHandleList.getList();
          }
        } else {
          if (this.completedList.length !== 0) {
            this.$nextTick(() => {
              this.$refs.completedHandleList.completedRecordList = this.completedList;
              this.$refs.completedHandleList.page = 1;
              this.$refs.completedHandleList.getList();
              this.$refs.completedHandleList.keyword = '';
              this.$refs.completedHandleList.expend = true; // 支出
              this.$refs.completedHandleList.income = true; // 收入
              this.$refs.completedHandleList.refused = true; // 被拒绝
              this.$refs.completedHandleList.startTime = '';
              this.$refs.completedHandleList.endTime = '';
            })
          }
        }
      },
      gobackMain() {
        this.myBorrowSelect.select = 0;
      },
      // 获取我的借贷列表
      async handleBorrowList() {
        this.backlogMsg = '数据加载中...';
        this.inhandMsg = '数据加载中...';
        this.completedMsg = '数据加载中...';
        await this.$axios.post(this.url + '/borrowList?java').then(res => {
          console.log('获取我的借贷列表');
          console.log(res);
          this.unHandleList = res.data.unHandleList;
          if (this.unHandleList.length == 0) {
            this.backlogMsg = '啊哦~暂无数据'
          } else {
            let a5 = [];
            for (let item of this.unHandleList) {
              a5.push(item.id);
            };
            let a6 = JSON.parse(localStorage.getItem('myBorrowUnHandle' + sessionStorage.getItem(
              'userRecordId')));
            // console.log(a5);
            // console.log(a6);
            if (a6 == null || this.unHandleList.length == 0) {
              this.unHandleCircle = 1;
            } else {
              if (a5.every(val => a6.includes(val))) {
                this.unHandleCircle = 0;
              } else {
                this.unHandleCircle = 1;
              }
            }
          }


          this.inHandleList = res.data.inHandleList;
          if (this.inHandleList.length == 0) {
            this.inhandMsg = '啊哦~暂无数据'
          } else {
            let a3 = [];
            for (let item of this.inHandleList) {
              a3.push(item.id);
            };
            let a4 = JSON.parse(localStorage.getItem('myBorrowInHandle' + sessionStorage.getItem(
              'userRecordId')));
            // console.log(a3);
            // console.log(a4);
            if (a4 == null || this.inHandleList.length == 0) {
              this.inHandleCircle = 1;
            } else {
              if (a3.every(val => a4.includes(val))) {
                this.inHandleCircle = 0;
              } else {
                this.inHandleCircle = 1;
              }
            }
          }


          this.completedList = res.data.completedList;
          if (this.completedList.length == 0) {
            this.completedMsg = '啊哦~暂无数据';
          } else {
            let a1 = [];
            for (let item of this.completedList) {
              a1.push(item.id);
            };
            let a2 = JSON.parse(localStorage.getItem('myBorrowCompleted' + sessionStorage.getItem(
              'userRecordId')));
            // console.log(a1);
            // console.log(a2);
            if (a2 == null || this.completedList.length == 0) {
              this.completedCircle = 1;
            } else {
              if (a1.every(val => a2.includes(val))) {
                this.completedCircle = 0;
              } else {
                this.completedCircle = 1;
              }
            }
          }


        }).catch(err => {
          console.log(err);
        })
      },
      // 提交申请结果成功
      applyResult() {
        this.handleBorrowList().then(() => {
          this.$refs.unHandleList.page = 1;
          this.$refs.unHandleList.getList();
          this.$refs.inHandleList.page = 1;
          this.$refs.inHandleList.getList();
          this.$refs.completedHandleList.page = 1;
          this.$refs.completedHandleList.getList();
        })
      },
      // 获取币种列表
      handleCountryGet() {
        this.$axios.post(this.url + '/CountryGet').then((res) => {
          console.log('国家列表');
          console.log(res);
          this.recordListData.countryList = res.data;
        }).catch(err => {
          console.log(err);
        })
      },
      // 获取银行卡列表
      handlebankCardList() {
        this.$axios.post(this.url + '/bankCardList?java').then(res => {
          console.log('获取银行卡列表');
          console.log(res);
          this.recordListData.bankList = res.data;

          console.log(this.recordListData.bankList);
        }).catch(err => {
          console.log(err);
        })
      },
      // 获取用户列表
      handleUserListInfo() {
        this.$axios.post(this.url + '/userListInfo?java').then(res => {
          console.log('获取用户列表');
          console.log(res);
          this.recordListData.userList = res.data;
        }).catch(err => {
          console.log(err);
        })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .my-borrow-container {
    width: 95%;
    margin: 0 auto;
    // padding: 40px;
    padding-top: 0;

    .addBtn {
      width: 144px;
      height: 48px;
      margin-bottom: 20px;
      line-height: 48px;
      border-radius: 6px;
      text-align: center;
      cursor: pointer;
      background-color: #0c7063;

      .add-style {
        display: inline-block;
        font-size: 16px;
        color: #fff;
      }
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
  }

  .input-style {
    width: 60% !important;
  }
</style>
<style lang="scss">
  #my-borrow {
    .el-form-item .el-form-item {
      margin-bottom: 20px;
    }

    .el-tabs--border-card {
      background: transparent;
      border: transparent;
      -webkit-box-shadow: none;
      box-shadow: none;
    }

    .el-tabs--border-card>.el-tabs__header {
      background-color: transparent;
      border-bottom: none;
      margin: 0;
    }

    .el-tabs--border-card>.el-tabs__header .el-tabs__item {
      background-color: #ddebec;
    }

    .el-tabs__item {
      width: 160px;
      height: 48px !important;
      line-height: 48px !important;
      font-size: 16px !important;
      text-align: center;
      border-top-left-radius: 20px;
      border-top-right-radius: 20px;
      color: #000;
    }

    .el-tabs__content {
      background-color: #fff;
    }

    .el-tabs--border-card>.el-tabs__header .el-tabs__item:not(.is-disabled):hover {
      color: #000;
    }

    .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active {
      color: #000;
      background-color: #FFF;
      border-right-color: transparent;
      border-left-color: transparent;
    }


    .el-tabs--border-card>.el-tabs__content {
      padding: 20px 30px;
    }
  }
</style>