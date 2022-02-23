<template>
  <div id="have-account" style="margin-top: 75px;">
    <!-- <h3>已结算</h3> -->
    <div v-show="haveAccountList.length == 0" ref="hello" style="text-align: center;">
      <p>{{hintMsg}}</p>
    </div>
    <div v-if="haveAccountList.length !== 0">
      <div style="margin-left: 20px;">
        <p style="font-size: 20px;">{{'商品数量:  ' + ' ' + totalNum}}</p>
      </div>
      <div v-for="(item,index) of haveAccountList" :key="index">
        <table>
          <tr>
            <th>图片</th>
            <th>型号</th>
            <th>机芯号</th>
            <th>采购价</th>
            <th>销售价</th>
            <th>操作</th>
          </tr>
          <tr v-for="(item,index) of items.watch" :key="index">
            <td class="first-td">
              <img v-image-preview
                :src="item.buy_watchPics == null || item.buy_watchPics == '' ? '' : img + '/img/watch/'+ item.buy_watchPics.split('|')[0]"
                class="first-img" />
            </td>
            <td>{{item.buy_watchModel}}</td>
            <td>{{item.buy_watchSn}}</td>
            <td>{{item.buy_watchCurrency + ' ' + formatNumberRgx(item.buy_watchPrice)}}</td>
            <td>{{item.sell_state == 0 ? '未销售' : item.sell_currency + ' ' + formatNumberRgx(item.sell_money)}}</td>
            <td class="last-td">
              <el-button type="text">查看结算单详情</el-button>
            </td>
          </tr>
        </table>
      </div>

    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        page: 1,
        pageNum: 10,
        keyword: '',
        total: 0,
        totalNum: 0,
        haveAccountList: [],
        hintMsg: '数据加载中...',

      }
    },
    created() {
      this.getHaveAccountList();
    },
    methods: {
      // 模糊搜索
      stockInSearch() {
        if (this.keyword !== '') {
          this.haveAccountList = [];
          this.total = 0;
          this.totalNum = 0;
          this.hintMsg = '数据加载中...';
          this.$axios
            .post(this.$store.state.baseUrl + "/BuyOrderListEx", {
              page: this.page,
              pageNum: this.pageNum,
              type: 5,
              keyword: this.keyword
            })
            .then(res => {
              console.log("模糊搜索获取已结算商品列表");
              console.log(res);
              this.haveAccountList = res.data.orders;
              this.total = res.data.watchTotal;
              this.totalNum = res.data.watchTotal;
              if (this.haveAccountList.length == 0) {
                this.hintMsg = '啊哦~暂无数据'
              }
            });
        }
        if (this.keyword == '') {
          this.page = 1;
          this.haveAccountList = [];
          this.total = 0;
          this.totalNum = 0;
          this.getHaveAccountList();
        }
      },
      // 获取待结算商品
      getHaveAccountList() {
        this.hintMsg = '数据加载中...';
        this.$axios.post(this.$store.state.baseUrl + '/BuyOrderListEx', {
          page: this.page,
          pageNum: this.pageNum,
          type: 5
        }).then((res) => {
          console.log('已结算商品列表');
          console.log(res);
          this.haveAccountList = res.data.orders;
          this.total = res.data.watchTotal;
          this.totalNum = res.data.watchTotal;
          if (this.haveAccountList.length == 0) {
            this.hintMsg = '啊哦~暂无数据'
          }
        }).catch((err) => {
          console.log(err);
        })
      },
    },
  }
</script>
<style lang="scss" scoped>
  .first-td {
    padding: 30px;
    padding-left: 0;
    padding-right: 0;
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;

    .first-img {
      width: 100px;
      height: 100px;
      object-fit: cover;
      border-radius: 30px;
    }
  }

  .last-td {
    border-top-right-radius: 30px;
    border-bottom-right-radius: 30px;
  }

  table {
    width: 100%;
    table-layout: fixed;
    border-collapse: separate;
    border-spacing: 0 20px;

    tr {

      th,
      td {
        width: 21%;
        text-align: center;
        border: 0;
      }
    }
  }
</style>
<style lang="scss">
  #have-account {
    .el-form-item__label {
      text-align: right;
    }

    .el-pagination__editor.el-input .el-input__inner {
      height: 28px;
    }
  }
</style>