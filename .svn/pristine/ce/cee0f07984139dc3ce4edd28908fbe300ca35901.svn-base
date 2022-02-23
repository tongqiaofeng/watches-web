<template>
  <div class="borrowing-audit-container" id="borrow-audit">
    <!-- 借贷审核-公司 -->
    <el-tabs type="border-card" v-model="borrowingActiveName" @tab-click="handleBorrowingClick">
      <el-tab-pane label="我的待办事项" name="borrowingBacklog">
        <div slot="label" style="display: flex;justify-content: center;font-size: 15px;">我的待办事项
          <p style="margin-top: -10px;margin-left: 3px;">
            <img v-if="borrowingBacklogCircle == 1" src="../../assets/imgs/circle.png"
              style="width: 10px;height: 10px;" />
          </p>
        </div>
        <div v-if="borrowUnHandleList.length == 0" style="text-align: center;">
          <p>{{borrowUnHandleMsg}}</p>
        </div>
        <div v-else>
          <Borrow-un-handle ref="borrowUnHandle" :borrowUnHandleList="borrowUnHandleList"
            :borrowUnSelect="borrowUnSelect" @borrowApplyResult="borrowApplyResult" @signBorrowUn="signBorrowUn">
          </Borrow-un-handle>
        </div>
      </el-tab-pane>
      <el-tab-pane label="已完成" name="borrowingCompleted">
        <div slot="label" style="display: flex;justify-content: center;font-size: 15px;">已完成
          <p style="margin-top: -10px;margin-left: 3px;">
            <img v-if="borrowingCompletedCircle == 1" src="../../assets/imgs/circle.png"
              style="width: 10px;height: 10px;" />
          </p>
        </div>
        <div v-if="borrowCompletedList.length == 0" style="text-align: center;">
          <p>{{borrowCompletedMsg}}</p>
        </div>
        <div v-else>
          <Borrow-completed ref="borrowCompleted" :borrowCompletedList="borrowCompletedList" @signBorrow="signBorrow">
          </Borrow-completed>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        url: this.$store.state.baseUrl,
        borrowingActiveName: 'borrowingBacklog',
        borrowUnHandleList: [],
        borrowUnHandleMsg: '数据加载中...',
        borrowCompletedList: [],
        borrowCompletedMsg: '数据加载中...',
        borrowUnSelect: {
          select: 0
        },
        borrowingBacklogCircle: 0,
        borrowingCompletedCircle: 0,

      }
    },
    created() {
      this.handleCompanyBorrowList();
    },
    methods: {
      signBorrowUn(val) {
        this.borrowingBacklogCircle = val;
      },
      signBorrow(val) {
        this.borrowingCompletedCircle = val;
      },
      // 获取借贷审核列表
      async handleCompanyBorrowList() {
        this.borrowUnHandleMsg = '数据加载中...';
        this.borrowCompletedMsg = '数据加载中...';
        await this.$axios.post(this.url + '/companyBorrowList?java').then(res => {
          console.log('获取借贷审核列表');
          console.log(res);
          this.borrowUnHandleList = res.data.unHandleList;
          if (this.borrowUnHandleList.length == 0) {
            this.borrowUnHandleMsg = '啊哦~暂无数据'
          } else {
            let a1 = [];
            for (let item of this.borrowUnHandleList) {
              a1.push(item.id);
            };
            let a2 = JSON.parse(localStorage.getItem('auditUnHandle' + sessionStorage.getItem('userRecordId')));
            // console.log(a1);
            // console.log(a2);
            if (a2 == null || this.borrowUnHandleList.length == 0) {
              this.borrowingBacklogCircle = 1;
            } else {
              if (a1.every(val => a2.includes(val))) {
                this.borrowingBacklogCircle = 0;
              } else {
                this.borrowingBacklogCircle = 1;
              }
            }
          }

          this.borrowCompletedList = res.data.completedList;
          if (this.borrowCompletedList.length == 0) {
            this.borrowCompletedMsg = '啊哦~暂无数据';
          } else {
            let a3 = [];
            for (let item of this.borrowCompletedList) {
              a3.push(item.id);
            };
            let a4 = JSON.parse(localStorage.getItem('auditCompleted' + sessionStorage.getItem('userRecordId')));
            // console.log(a3);
            // console.log(a4);
            if (a4 == null || this.borrowCompletedList.length == 0) {
              this.borrowingCompletedCircle = 1;
            } else {
              if (a3.every(val => a4.includes(val))) {
                this.borrowingCompletedCircle = 0;
              } else {
                this.borrowingCompletedCircle = 1;
              }
            }
          }
        }).catch(err => {
          console.log(err);
        })
      },
      // 提交数据成功
      borrowApplyResult() {
        this.handleCompanyBorrowList().then(() => {
          this.$refs.borrowUnHandle.page = 1;
          this.$refs.borrowUnHandle.getList();
        })
      },
      // tab项切换
      handleBorrowingClick() {
        if (this.borrowingActiveName == 'borrowingBacklog') {
          if (this.borrowUnHandleList.length !== 0) {
            this.$refs.borrowUnHandle.page = 1;
            this.$refs.borrowUnHandle.getList();
          }
        } else if (this.borrowingActiveName == 'borrowingCompleted') {
          if (this.borrowCompletedList.length !== 0) {
            this.$refs.borrowCompleted.completedRecordList = this.borrowCompletedList;
            this.$refs.borrowCompleted.page = 1;
            this.$refs.borrowCompleted.getList();
            this.$refs.borrowCompleted.keyword = '';
            this.$refs.borrowCompleted.flag = ['通过', '拒绝'];
            this.$refs.borrowCompleted.startTime = '';
            this.$refs.borrowCompleted.endTime = '';
          }

        }
      },
    }
  }
</script>

<style lang="scss" scoped>
  .borrowing-audit-container {
    width: 95%;
    margin: 0 auto;
  }
</style>
<style lang="scss">
  #borrow-audit {
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