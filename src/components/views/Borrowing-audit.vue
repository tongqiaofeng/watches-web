<template>
  <div class="borrowing-audit-container">
    <el-tabs type="border-card" v-model="borrowingActiveName" @tab-click="handleBorrowingClick">
      <el-tab-pane label="我的待办事项" name="borrowingBacklog">
        <div slot="label" style="display: flex;font-size: 15px;">我的待办事项
          <p style="margin-top: -10px;margin-left: 3px;">
            <img src="../../assets/imgs/circle.png" style="width: 10px;height: 10px;" />
          </p>
        </div>
        <div v-if="borrowUnHandleList.length == 0" style="text-align: center;">
          <p>{{borrowUnHandleMsg}}</p>
        </div>
        <div v-else>
          <Borrow-un-handle ref="borrowUnHandle" :borrowUnHandleList="borrowUnHandleList"
            :borrowUnSelect="borrowUnSelect" @borrowApplyResult="borrowApplyResult">
          </Borrow-un-handle>
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

      }
    },
    created() {
      this.handleCompanyBorrowList();
    },
    methods: {
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
          };

          this.borrowCompletedList = res.data.completedList;
          if (this.borrowCompletedList.length == 0) {
            this.borrowCompletedMsg = '啊哦~暂无数据';
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

      },
    }
  }
</script>

<style lang="scss" scoped>
  .borrowing-audit-container {
    width: 90%;
    margin: 0 auto;
    padding: 40px;
    padding-top: 20px;
    background-color: #fff;
    border-radius: 30px;
  }
</style>