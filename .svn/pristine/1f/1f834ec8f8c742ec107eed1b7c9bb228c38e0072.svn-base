<template>
  <div class="for-account-container" id="for-account-container">
    <!-- <h3>待结算</h3> -->
    <div v-if="forAccountNum.num == 0" style="margin-top: 75px;">
      <div v-show="forAccountList.length == 0" ref="hello" style="text-align: center;">
        <p>{{hintMsg}}</p>
      </div>
      <div v-if="forAccountList.length !== 0">
        <div style="margin-left: 20px;">
          <p style="font-size: 18px;">{{'商品数量:  ' + ' ' + totalNum}}</p>
        </div>
        <div class="account-table">
          <table>
            <tr>
              <th>图片</th>
              <th>型号</th>
              <th>机芯号</th>
              <th>采购价</th>
              <th>销售价</th>
              <th>操作</th>
            </tr>
          </table>
          <div v-for="(items,index) of forAccountList" :key="index">
            <table>
              <tr v-for="(item,index) of items.watch" :key="index" style="background-color: #f3fbf9;">
                <td>
                  <img v-image-preview
                    :src="item.buy_watchPics == null || item.buy_watchPics == '' ? '' : img + '/img/watch/'+ item.buy_watchPics.split('|')[0]"
                    class="first-img" />
                </td>
                <td>
                  <p>{{item.buy_watchBrand}}</p>
                  <p>{{item.buy_watchModel}}</p>
                </td>
                <td>{{item.buy_watchSn}}</td>
                <td>{{item.buy_watchCurrency + ' ' + formatNumberRgx(item.buy_watchPrice)}}</td>
                <td>{{item.sell_state == 0 ? '未销售' : item.sell_currency + ' ' + formatNumberRgx(item.sell_money)}}</td>
                <td>
                  <el-tooltip class="item" effect="light" content="查看采购单信息" placement="top-end">
                    <img src="../../assets/imgs/details.png" style="cursor: pointer;"
                      @click="jumpPurchaseMsg(items.buy_id)" />
                  </el-tooltip>
                </td>
              </tr>
            </table>
          </div>
        </div>
        <div style="width: 100%;height: 63px;">
          <div style="margin:15px 0;position:absolute;right:6%;">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page"
              layout="total, prev, pager, next, jumper" :total="total"></el-pagination>
          </div>
        </div>
      </div>
    </div>
    <div v-if="forAccountNum.num == 1">
      <Details @changeMsg="changeMsg" @goback="goback" :detailsSelect="detailsSelect"></Details>
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
        forAccountList: [],
        img: this.$store.state.baseUrl,
        dialogPurchaseVisible: false,
        purchaseOrder: [],
        detailsSelect: {
          id: 1,
          num: 0
        },
        hintMsg: '数据加载中...',

      }
    },
    props: ['forAccountNum'],
    created() {
      this.getForAccountList();
    },
    methods: {
      // 数据改变
      changeMsg(val) {
        // this.getForAccountList();
      },
      // 返回到此页
      goback(val) {
        // this.getForAccountList();
        console.log(this.keyword);
        this.stockInSearch();
        this.forAccountNum.num = 0;
        this.$emit('shippingState', 0);
        // 页面回到顶部
        (function smoothscroll() {
          var currentScroll =
            document.documentElement.scrollTop || document.body.scrollTop;
          if (currentScroll > 0) {
            window.requestAnimationFrame(smoothscroll);
            window.scrollTo(0, currentScroll - currentScroll / 5);
          }
        })();
      },
      // 模糊搜索
      stockInSearch() {
        if (this.keyword !== '') {
          this.forAccountList = [];
          this.total = 0;
          this.totalNum = 0;
          this.hintMsg = '数据加载中...';
          this.$axios
            .post(this.$store.state.baseUrl + "/BuyOrderListEx", {
              page: this.page,
              pageNum: this.pageNum,
              type: 4,
              keyword: this.keyword
            })
            .then(res => {
              console.log("模糊搜索获取待结算商品列表");
              console.log(res);
              this.forAccountList = res.data.orders;
              this.total = res.data.watchTotal;
              this.totalNum = res.data.watchTotal;
              if (this.forAccountList.length == 0) {
                this.hintMsg = '啊哦~暂无数据'
              }
            });
        }
        if (this.keyword == '') {
          this.page = 1;
          this.forAccountList = [];
          this.total = 0;
          this.totalNum = 0;
          this.getForAccountList();
        }
      },
      // 获取待结算商品
      getForAccountList() {
        this.hintMsg = '数据加载中...';
        this.$axios.post(this.$store.state.baseUrl + '/BuyOrderListEx', {
          page: this.page,
          pageNum: this.pageNum,
          type: 4
        }).then((res) => {
          console.log('待结算商品列表');
          console.log(res);
          this.forAccountList = res.data.orders;
          this.total = res.data.watchTotal;
          this.totalNum = res.data.watchTotal;
          if (this.forAccountList.length == 0) {
            this.hintMsg = '啊哦~暂无数据'
          }
        }).catch((err) => {
          console.log(err);
        })
      },
      // 未结算，跳转到采购单信息
      jumpPurchaseMsg(buy_id) {
        console.log('采购单信息');
        console.log(buy_id);
        this.$emit('shippingState', 1);
        sessionStorage.setItem("buy_id", buy_id);
        console.log(sessionStorage.getItem("buy_id"));
        this.forAccountNum.num = 1;
        this.detailsSelect.num = 0;
      },
      // 分页
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.page = val;
        console.log(this.page);
        if (this.keyword !== '') {
          this.stockInSearch();
        } else if (this.keyword == '') {
          this.getForAccountList();
        }
        (function smoothscroll() {
          var currentScroll =
            document.documentElement.scrollTop || document.body.scrollTop;
          if (currentScroll > 0) {
            window.requestAnimationFrame(smoothscroll);
            window.scrollTo(0, currentScroll - currentScroll / 5);
          }
        })();
      },
    },
  }
</script>
<style lang="scss" scoped>
  .for-account-container {
    width: 100%;
    margin: 0 auto;

    .account-table {
      padding: 30px;
      background-color: #fff;
      border-radius: 30px;

      td {
        padding: 20px 0;

        .first-img {
          width: 100px;
          height: 100px;
          object-fit: cover;
          border-radius: 30px;
        }
      }
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
        width: 21%;
        text-align: center;
        border: 0;
      }
    }
  }
</style>
<style lang="scss">
  #for-account-container {
    .el-form-item__label {
      text-align: right;
    }

    .el-pagination__editor.el-input .el-input__inner {
      height: 28px;
    }
  }
</style>