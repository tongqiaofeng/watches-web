<template>
  <div class="bonus-admin-container" id="bonus-admin">
    <!-- 财务 分红页面 -->
    <div>
      <el-tabs type="border-card" v-model="activeBonusName" @tab-click="handleBonusTabsClick">
        <el-tab-pane label="待打款" name="toRemit">
          <div v-if="unPayList.length == 0" style="text-align: center;">
            {{unPayMsg}}
          </div>
          <div v-if="unPayList.length !== 0">
            <Bonus-remit-un-pay :unPaySelect="unPaySelect" :unPayList="unPayList"
              @financeBonusChange="financeBonusChange"></Bonus-remit-un-pay>
          </div>
        </el-tab-pane>
        <el-tab-pane label="确认中" name="makeSure">
          <div v-if="inCheckList.length == 0" style="text-align: center;">
            {{inCheckMsg}}
          </div>
          <div v-if="inCheckList.length !== 0">
            <Bonus-remit-in-check :inCheckList="inCheckList"></Bonus-remit-in-check>
          </div>
        </el-tab-pane>
        <el-tab-pane label="已完成" name="offStocks">
          <div v-if="remitCompletedList.length == 0" style="text-align: center;">
            {{remitCompletedMsg}}
          </div>
          <div v-if="remitCompletedList.length !== 0">
            <Bonus-remit-in-check :inCheckList="remitCompletedList"></Bonus-remit-in-check>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        activeBonusName: 'toRemit',
        unPayList: [], // 待打款
        unPayMsg: '数据加载中...',
        unPaySelect: {
          select: 0
        },
        inCheckList: [],
        inCheckMsg: '数据加载中...',
        remitCompletedList: [],
        remitCompletedMsg: '数据加载中...',

      }
    },
    created() {
      this.getFinanceBonusList();
    },
    methods: {
      // 获取财务分红各项列表
      getFinanceBonusList() {
        this.$axios.post(this.$store.state.baseUrl + '/financeBonusList?java').then(res => {
          console.log('财务分红单列表');
          console.log(res);
          this.unPayList = res.data.unPayList;
          if (this.unPayList.length == 0) {
            this.unPayMsg = '啊哦~暂无数据'
          }

          this.inCheckList = res.data.inCheckList;
          if (this.inCheckList.length == 0) {
            this.inCheckMsg = '啊哦~暂无数据'
          }

          this.remitCompletedList = res.data.completedList;
          if (this.remitCompletedList.length == 0) {
            this.remitCompletedMsg = '啊哦~暂无数据'
          }
        }).catch(err => {
          console.log(err);
        })
      },
      financeBonusChange() {
        this.getFinanceBonusList();
      },
      handleBonusTabsClick() {
        this.unPaySelect.select = 0;
      },
    }
  }
</script>
<style lang="scss" scoped>
  .bonus-admin-container {
    width: 95%;
    margin: 0 auto;
  }

  .back-img {
    width: 75px;
    height: 45px;
    margin-left: 30px;
    margin-bottom: 30px;
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

  td {
    height: 60px;
    margin: 10px 0;
    padding: 20px 0;
    background-color: #f3fbf9;
    font-size: 15px;
    text-align: center;
  }

  .input-style {
    width: 70% !important;
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
<style lang="scss">
  #bonus-admin {
    .el-tabs__header {
      z-index: 0;
    }

    .el-checkbox__label {
      font-size: 15px;
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