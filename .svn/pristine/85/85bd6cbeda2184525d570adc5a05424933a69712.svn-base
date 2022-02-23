<template>
  <div class="bonus-admin-container" id="bonus-admin">
    <!-- 管理员 分红页面 -->
    <div>
      <el-tabs type="border-card" v-model="activeBonusAdminName" @tab-click="handleBonusAdminTabsClick">
        <el-tab-pane label="待分红" name="toShare">
          <div v-if="unBonusList.length == 0" style="text-align: center;">
            {{unBonusMsg}}
          </div>
          <div v-if="unBonusList.length !== 0">
            <Bonus-admin-un :unBonusList="unBonusList" :unBonusSelect="unBonusSelect" @bonusChange="bonusChange">
            </Bonus-admin-un>
          </div>
        </el-tab-pane>
        <el-tab-pane label="确认中" name="makeSure">
          <div v-if="inBonusList.length == 0" style="text-align: center;">
            {{inBonusMsg}}
          </div>
          <div v-if="inBonusList.length !== 0">
            <Bonus-admin-in :inBonusList="inBonusList" :inBonusSelect="inBonusSelect" @bonusChange="bonusChange">
            </Bonus-admin-in>
          </div>
        </el-tab-pane>
        <el-tab-pane label="已完成" name="offStocks">
          <div v-if="completedBonusList.length == 0" style="text-align: center;">
            {{completedBonusMsg}}
          </div>
          <div v-if="completedBonusList.length !== 0">
            <Bonus-admin-completed :completedBonusList="completedBonusList"
              :completedBonusSelect="completedBonusSelect">
            </Bonus-admin-completed>
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
        activeBonusAdminName: 'toShare',
        unBonusList: [],
        unBonusSelect: {
          select: 0
        },
        unBonusMsg: '数据加载中...',
        inBonusList: [],
        inBonusSelect: {
          select: 0
        },
        inBonusMsg: '数据加载中...',
        completedBonusList: [],
        completedBonusSelect: {
          select: 0
        },
        completedBonusMsg: '数据加载中...',
      }
    },
    created() {
      this.getAdminBonusList();
    },
    methods: {
      // 获取分红列表
      getAdminBonusList() {
        this.unBonusList = [];
        this.unBonusMsg = '数据加载中...';
        this.inBonusList = [];
        this.inBonusMsg = '数据加载中...';
        this.$axios.post(this.$store.state.baseUrl + '/adminBonusList?java').then(res => {
          console.log('管理员分红列表');
          console.log(res);
          this.unBonusList = res.data.unBonusList;
          if (this.unBonusList.length == 0) {
            this.unBonusMsg = '啊哦~ 暂无数据'
          }

          this.inBonusList = res.data.inBonusList;
          if (this.inBonusList.length == 0) {
            this.inBonusMsg = '啊哦~ 暂无数据'
          }

          this.completedBonusList = res.data.completedBonusList;
          if (this.completedBonusList.length == 0) {
            this.completedBonusMsg = '啊哦~ 暂无数据'
          }
        }).catch(err => {
          console.log(err);
        })
      },
      // 生成分红单重新获取数据
      bonusChange() {
        this.getAdminBonusList();
        this.unBonusSelect.select = 0;
        this.inBonusSelect.select = 0;
      },
      // tab切换
      handleBonusAdminTabsClick() {
        this.unBonusSelect.select = 0;
        this.inBonusSelect.select = 0;
        this.completedBonusSelect.select = 0;
      },
    }
  }
</script>
<style lang="scss" scoped>
  .bonus-admin-container {
    width: 95%;
    margin: 0 auto;
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