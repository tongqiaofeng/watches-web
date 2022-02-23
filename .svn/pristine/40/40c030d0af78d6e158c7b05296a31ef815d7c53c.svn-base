<template>
  <div class="not-outbound-container" id="not-outbound">
    <!-- <h1>未出库商品列表页</h1> -->
    <div v-if="notOutbound.nots == 0">
      <div v-if="notOutbound.select == 2" class="not-outbound-top">
        <div class="radio-select">
          <el-radio v-model="filtrate1" label="0" border @change="getStockListAllList2">全部：采购中+已入库</el-radio>
          <el-radio v-model="filtrate1" label="1" border @change="getStockList3">采购中</el-radio>
          <el-radio v-model="filtrate1" label="2" border @change="getStockList4">已入库</el-radio>
        </div>
      </div>
      <div v-if="notOutbound.select == 1" class="not-outbound-top">
        <div class="radio-select">
          <el-radio v-model="filtrate" label="0" border @change="getStockListAllList1">全部：采购中+已入库</el-radio>
          <el-radio v-model="filtrate" label="1" border @change="getStockList1">采购中</el-radio>
          <el-radio v-model="filtrate" label="2" border @change="getStockList2">已入库</el-radio>
        </div>
      </div>
      <div v-show="notOrders.notOutboundList1.length == 0" style="margin-top: 80px;text-align: center;">
        <p>{{hintMsg}}</p>
      </div>
      <div v-if="notOrders.notOutboundList1.length !== 0" style="margin-top: 80px;">
        <div style="margin-left: 5%;">
          <p style="font-size: 18px;">{{'商品数量: ' + ' ' + notOrders.totalNum1}}</p>
        </div>
        <div class="not-container">
          <table>
            <tr>
              <th>图片</th>
              <th>品牌型号</th>
              <th>库存</th>
              <th>操作</th>
            </tr>
            <tr v-for="(item,index) of notOrders.notOutboundList1" :key="index">
              <td>
                <img v-image-preview
                  :src="item.buy_watchPics == null || item.buy_watchPics == '' ? '' : img + '/img/watch/'+ item.buy_watchPics.split('|')[0]"
                  class="first-img" />
              </td>
              <td>
                <div>
                  <p>{{item.buy_watchBrand}}</p>
                </div>
                <div>
                  <p>{{item.buy_watchModel}}</p>
                </div>
              </td>
              <td>
                <p>总数：{{item.watch.length}}</p>
                <p v-if="filtrate == 0">采购中：{{item | formatPurchNumRgx(0)}}</p>
                <p v-if="filtrate == 0">已入库：{{item | formatPurchNumRgx(2)}}</p>
                <p>已出售：{{item | formatPurchNumRgx(1)}}</p>
              </td>
              <td>
                <el-tooltip class="item" effect="light" content="查看详情" placement="top-end">
                  <img src="../../assets/imgs/details.png" style="cursor:pointer;" @click="notDetails(item.watch)" />
                </el-tooltip>
              </td>
            </tr>
          </table>
          <div style="width: 100%;height: 63px;">
            <div style="margin:15px 0;position:absolute;right:6%;">
              <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page"
                layout="total, prev, pager, next, jumper" :total="notOrders.total1"></el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="notOutbound.nots == 1">
      <Product-list :deliveryList="deliveryList" :watchList="watchList" @gobackNotOutbound="gobackNotOutbound"
        @stockRemoval="stockRemoval"></Product-list>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        hintMsg: '数据加载中...',
        filtrate1: "0",
        filtrate: "0",
        keyword: "",
        page: 1,
        pageNum: 10,
        // notOutboundList: this.notOrders.notOutboundList1,
        // total: this.notOrders.total1,
        // totalNum: this.notOrders.totalNum1,
        img: this.$store.state.baseUrl,
        paretsList: [],
        deliveryList: {
          id: 1,
          delivery: 0
        },
        watchList: [],
        num1: 0,
        num: 0
      };
    },
    props: ["notOutbound", "notOrders"],
    mounted() {
      this.getStockListAllList1();
    },
    // 库存各指标数据
    filters: {
      formatPurchNumRgx: function (watchArr, state) {
        let num1 = 0;
        let num2 = 0;
        let num3 = 0;
        for (let item of watchArr.watch) {
          if (state == 0) {
            if (item.LOG_state == state || item.LOG_state == 1) {
              // console.log("状态" + item.LOG_state);
              num1++;
            }
          }
          if (state == 2) {
            if (state == item.LOG_state) {
              // console.log("状态" + item.LOG_state);
              num2++;
            }
          }
          if (state == 1) {
            if (state == item.sell_state) {
              // console.log("销售状态" + item.sell_state);
              num3++;
            }
          }
        }
        if (state == 0) {
          return num1;
        }
        if (state == 2) {
          return num2;
        }
        if (state == 1) {
          return num3;
        }
      }
    },
    methods: {
      gobackNotOutbound(val) {
        console.log(val);
        this.notOutbound.nots = val;
        this.notOutbound.select = 1;
      },
      stockRemoval(val) {
        this.notOutbound.nots = val;
        this.notOutbound.select = 1;
      },
      // 模糊搜索
      stockInSearch() {
        console.log(this.keyword);
        if (this.keyword !== "") {
          console.log(this.keyword);
          console.log("类型" + this.filtrate);
          this.notOrders.notOutboundList1 = [];
          this.notOrders.total1 = 0;
          this.notOrders.totalNum1 = 0;
          this.hintMsg = '数据加载中...';
          this.$axios
            .post(this.$store.state.baseUrl + "/StockList", {
              page: this.page,
              pageNum: this.pageNum,
              type: this.filtrate,
              keyword: this.keyword
            })
            .then(res => {
              console.log("模糊搜索获取订单");
              console.log(res);
              // this.notOutboundList = [];
              // this.total = 0;
              // this.totalNum = 0;
              this.notOrders.notOutboundList1 = res.data.lst;
              this.notOrders.total1 = res.data.total;
              this.notOrders.totalNum1 = res.data.watchTotal;
              if (this.notOrders.notOutboundList1.length == 0) {
                this.hintMsg = "啊哦~暂无数据";
              };
              (function smoothscroll() {
                var currentScroll =
                  document.documentElement.scrollTop || document.body.scrollTop;
                if (currentScroll > 0) {
                  window.requestAnimationFrame(smoothscroll);
                  window.scrollTo(0, currentScroll - currentScroll / 5);
                }
              })();
            });
        } else if (this.keyword == "") {
          console.log(this.keyword);
          this.notOrders.notOutboundList1 = [];
          this.notOrders.total1 = 0;
          this.notOrders.totalNum1 = 0;
          this.getStockListAllList();
        }
      },
      // 获取未出库所有商品列表
      getStockListAllList1() {
        console.log(this.filtrate);
        this.$emit('notKeywordChan', '');
        this.notOutbound.select = 1;
        this.page = 1;
        this.keyword = "";
        this.notOrders.notOutboundList1 = [];
        this.notOrders.total1 = 0;
        this.notOrders.totalNum1 = 0;
        this.stockInSearch();
      },
      getStockListAllList() {
        console.log(this.filtrate);
        this.hintMsg = '数据加载中...';
        this.$axios
          .post(this.$store.state.baseUrl + "/StockList", {
            page: this.page,
            pageNum: this.pageNum,
            type: this.filtrate
          })
          .then(res => {
            console.log("未出库商品列表");
            console.log(res);
            this.notOrders.notOutboundList1 = res.data.lst;
            this.notOrders.total1 = res.data.total;
            this.notOrders.totalNum1 = res.data.watchTotal;
            if (this.notOrders.notOutboundList1.length == 0) {
              this.hintMsg = "啊哦~暂无数据";
            };
            (function smoothscroll() {
              var currentScroll =
                document.documentElement.scrollTop || document.body.scrollTop;
              if (currentScroll > 0) {
                window.requestAnimationFrame(smoothscroll);
                window.scrollTo(0, currentScroll - currentScroll / 5);
              }
            })();
          })
          .catch(err => {
            console.log(err);
          });
      },
      // 采购中
      getStockList1() {
        console.log(this.filtrate);
        this.$emit('notKeywordChan', '');
        this.notOutbound.select = 1;
        this.page = 1;
        this.keyword = "";
        this.notOrders.notOutboundList1 = [];
        this.notOrders.total1 = 0;
        this.notOrders.totalNum1 = 0;
        this.stockInSearch();
      },
      // 已入库
      getStockList2() {
        console.log(this.filtrate);
        this.$emit('notKeywordChan', '');
        this.notOutbound.select = 1;
        this.page = 1;
        this.keyword = "";
        this.notOrders.notOutboundList1 = [];
        this.notOrders.total1 = 0;
        this.notOrders.totalNum1 = 0;
        this.stockInSearch();
      },
      getStockListAllList2() {
        this.$emit('notKeywordChan', '');
        this.filtrate1 = "0";
        this.notOutbound.select = 1;
        this.filtrate = "0";
        this.getStockListAllList1();
      },
      getStockList3() {
        this.$emit('notKeywordChan', '');
        this.filtrate1 = "0";
        this.notOutbound.select = 1;
        this.filtrate = "1";
        this.getStockList1();
      },
      getStockList4() {
        this.$emit('notKeywordChan', '');
        this.filtrate1 = "0";
        this.notOutbound.select = 1;
        this.filtrate = "2";
        this.getStockList2();
      },
      // 分页
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.page = val;
        console.log(this.page);
        if (this.keyword !== "") {
          this.stockInSearch();
        } else if (this.keyword == "") {
          this.getStockListAllList();
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
      // 查看此品牌下的手表列表
      notDetails(watchs) {
        console.log("查看详情");
        this.watchList = watchs;
        console.log(this.watchList);
        this.notOutbound.nots = 1;
        this.deliveryList.delivery = 0;
        // 页面回到顶部
        (function smoothscroll() {
          var currentScroll =
            document.documentElement.scrollTop || document.body.scrollTop;
          if (currentScroll > 0) {
            window.requestAnimationFrame(smoothscroll);
            window.scrollTo(0, currentScroll - currentScroll / 5);
          }
        })();
      }
    }
  };
</script>
<style lang="scss" scoped>
  .not-outbound-container {
    width: 100%;

    .not-outbound-top {
      // width: 80%;
      // margin: 20px auto;
      // margin-top: 0;
      // display: flex;
      // justify-content: space-around;
      width: 100%;
      background-color: #fff;

      .radio-select {
        width: 81%;
        padding: 20px;
        position: fixed;
        top: 80px;
        left: 324px;
        background-color: #fff;
        border-top: 1px solid #f3fbf9;
        display: flex;
        justify-content: space-around;
        z-index: 1;
      }
    }

    .not-container {
      width: 92%;
      margin: 0 auto;
      padding: 30px;
      background-color: #fff;
      border-radius: 30px;

      td {
        height: 60px;
        padding: 10px 0;
        background-color: #f3fbf9;
        font-size: 15px;
      }

      .first-img {
        width: 100px;
        height: 100px;
        border-radius: 30px;
        object-fit: cover;
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
        width: 25%;
        text-align: center;
        border: 0;
      }
    }
  }
</style>
<style lang="scss">
  #not-outbound {
    .el-pagination button:disabled {
      color: #c0c4cc;
      background-color: transparent;
      cursor: not-allowed;
    }

    div .el-pager li {
      background-color: transparent !important;
    }

    .el-pagination .btn-next,
    .el-pagination .btn-prev {
      background: center center no-repeat transparent;
    }

    .el-radio.is-bordered {
      padding: 12px 30px 0 20px;
      border-radius: 30px;
      border: 1px solid #dcdfe6;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      height: 40px;
    }

    .el-radio.is-bordered.is-checked {
      border-color: #409EFF;
    }
  }
</style>