<template>
  <div class="purchase-bonus-admin-container" id="purchase-bonus-admin">
    <!-- 采购 我的分红页面 -->
    <div>
      <el-tabs type="border-card" v-model="activeBonusName" @tab-click="handleBonusTabsClick">
        <el-tab-pane label="待收款" name="forCollection">
          <div v-if="unCompletedList.length == 0" style="text-align: center;">
            {{unCompletedMsg}}
          </div>
          <div v-if="unCompletedList.length !== 0">
            <Purchase-bonus-for-collection :unCompletedSelect="unCompletedSelect" :unCompletedList="unCompletedList"
              @checkChange="checkChange">
            </Purchase-bonus-for-collection>
          </div>
        </el-tab-pane>
        <el-tab-pane label="已完成" name="offStocks">
          <div v-if="purchaseCompletedList.length == 0" style="text-align: center;">
            {{purchaseCompletedMsg}}
          </div>
          <div v-if="purchaseCompletedList.length !== 0">
            <Purchase-bonus-completed :purchaseCompletedSelect="purchaseCompletedSelect"
              :purchaseCompletedList="purchaseCompletedList">
            </Purchase-bonus-completed>
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
        activeBonusName: 'forCollection',
        unCompletedList: [],
        unCompletedSelect: {
          select: 0,
          isPurchaseOrSell: 'sell'
        },
        unCompletedMsg: '数据加载中...',

        purchaseCompletedList: [],
        purchaseCompletedSelect: {
          select: 0,
          isPurchaseOrSell: 'sell'
        },
        purchaseCompletedMsg: '数据加载中...',
      }
    },
    created() {
      this.getPurchaseBonusList();
    },
    methods: {
      // 获取采购分红单列表
      getPurchaseBonusList() {
        this.unCompletedList = [];
        this.unCompletedMsg = '数据加载中...';
        this.purchaseCompletedList = [];
        this.purchaseCompletedMsg = '数据加载中...';
        this.$axios.post(this.$store.state.baseUrl + '/bonusList?java', {
          flag: 1
        }).then(res => {
          console.log('采购分红单列表');
          console.log(res);
          this.unCompletedList = res.data.unCompletedList;
          if (this.unCompletedList.length == 0) {
            this.unCompletedMsg = '啊哦~暂无数据'
          }

          this.purchaseCompletedList = res.data.completedList;
          if (this.purchaseCompletedList.length == 0) {
            this.purchaseCompletedMsg = '啊哦~暂无数据'
          }
        }).catch(err => {
          console.log(err);
        })
      },
      handleBonusTabsClick() {
        this.unCompletedSelect.select = 0;
        this.purchaseCompletedSelect.select = 0;
      },
      checkChange(val) {
        this.getPurchaseBonusList();
        this.unCompletedSelect.select = val;
      },
    }
  }
</script>
<style lang="scss" scoped>
  .purchase-bonus-admin-container {
    width: 95%;
    margin: 0 auto;
  }
</style>
<style lang="scss">
  #purchase-bonus-admin {
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