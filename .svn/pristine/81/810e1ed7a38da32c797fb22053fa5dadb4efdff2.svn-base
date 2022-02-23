<template>
  <div class="for-sale-container" id="for-sale-container">
    <!-- <h1>待售商品列表</h1> -->
    <div v-if="forSale.sale == 0">
      <div v-show="sellStockList.length == 0" ref="hello" style="text-align: center;">
        <p>{{hintMsg}}</p>
      </div>
      <div v-if="sellStockList.length !== 0">
        <div class="forSale-container">
          <table>
            <tr>
              <th>图片</th>
              <th>品牌</th>
              <th>型号</th>
              <th>库存</th>
              <th>操作</th>
            </tr>
            <tr v-for="(item,index) of sellStockList" :key="index">
              <td>
                <img v-image-preview
                  :src="item.buy_watchPics == null || item.buy_watchPics == '' ? '' : img + '/img/watch/'+ (item.buy_watchPics || '').split('|')[0]"
                  style="width: 100px;height: 100px;object-fit: cover;border-radius: 30px;" />
              </td>
              <td>{{item.buy_watchBrand}}</td>
              <td>{{item.buy_watchModel}}</td>
              <td>
                <p>总数：{{item.watch.length}}</p>
                <p>采购中：{{item | formatSaleNumRgx(0)}}</p>
                <p>已入库：{{item | formatSaleNumRgx(2)}}</p>
              </td>
              <td>
                <el-button type="text" @click="forSaleList(item)">查看待售列表</el-button>
              </td>
            </tr>
          </table>
        </div>
        <div style="width: 100%;height: 50px;">
          <div style="margin:15px 0;position:absolute;right:6%;">
            <el-pagination @current-change="handleCurrentChange" :current-page="page"
              layout="total, prev, pager, next, jumper" :total="total"></el-pagination>
          </div>
        </div>
      </div>
    </div>
    <div v-if="forSale.sale == 1">
      <For-sale-list :forSaleWatch="forSaleWatch" :forSaleSel="forSaleSel" @gobackForSale="gobackForSale">
      </For-sale-list>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        img: this.$store.state.baseUrl,
        keyword: "",
        page: 1,
        pageNum: 10,
        total: 0,
        sellStockList: [], // 可出售库存列表
        forSaleWatch: "",
        hintMsg: '数据加载中...',
        forSaleSel: {
          select: 0
        },

      };
    },
    props: ["forSale"],
    mounted() {
      this.handleSellStockList();
      if (this.forSale.sale == 0) {
        this.handleSellStockList();
      }
    },
    // 库存各指标数据
    filters: {
      formatSaleNumRgx(watchArr, state) {
        let num1 = 0;
        let num2 = 0;
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
        }
        if (state == 0) {
          return num1;
        }
        if (state == 2) {
          return num2;
        }
      }
    },
    methods: {
      gobackForSale(val) {
        this.forSale.sale = val;
        // this.keyword = "";
        this.stockInSearch();
      },
      // 待售商品初始数据
      handleSellStockList() {
        this.hintMsg = '数据加载中...';
        this.$axios
          .post(this.$store.state.baseUrl + "/SellStockList", {
            page: this.page,
            pageNum: this.pageNum
          })
          .then(res => {
            console.log("待售商品列表");
            console.log(res);
            this.sellStockList = res.data.lst;
            this.total = res.data.total;
            if (this.sellStockList.length == 0) {
              this.hintMsg = "啊哦~ 暂无数据";
            }
          })
          .catch(err => {
            console.log(err);
          });
      },
      // 模糊搜索
      stockInSearch() {
        console.log("关键字---" + this.keyword);
        if (this.keyword !== "") {
          console.log(this.page);
          this.sellStockList = [];
          this.hintMsg = '数据加载中...';
          this.$axios
            .post(this.$store.state.baseUrl + "/SellStockList", {
              page: this.page,
              pageNum: this.pageNum,
              keyword: this.keyword
            })
            .then(res => {
              console.log("模糊搜索待售商品");
              console.log(res);
              this.total = res.data.total;
              this.sellStockList = res.data.lst;
              console.log(this.sellStockList);
              if (this.sellStockList.length == 0) {
                this.hintMsg = "啊哦~ 暂无数据";
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else if (this.keyword == "") {
          this.page = 1;
          this.sellStockList = [];
          this.handleSellStockList();
        }
      },
      // 分页
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.page = val;
        console.log(this.page);
        if (this.keyword !== "") {
          this.stockInSearch();
        } else if (this.keyword == "") {
          this.handleSellStockList();
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
      // 此品牌手表待售列表
      forSaleList(saleList) {
        this.forSaleWatch = saleList;
        console.log("待售手表");
        console.log(this.forSaleWatch);
        this.forSale.sale = 1;
        this.forSaleSel.select = 0;
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
  .for-sale-container {
    width: 100%;

    .forSale-container {
      width: 92%;
      margin: 0 auto;
      // margin-bottom: 25px;
      padding: 30px;
      background-color: #fff;
      border-radius: 30px;
    }

    td {
      height: 60px;
      margin: 10px 0;
      padding: 20px 0;
      background-color: #f3fbf9;
      font-size: 15px;
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
        width: 20%;
        text-align: center;
        border: 0;
      }
    }
  }
</style>
<style lang="scss">
  #for-sale-container {
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
      background-size: 16px;
      cursor: pointer;
      margin: 0;
      color: #303133;
    }

    .el-form-item__label {
      text-align: right;
    }

    .el-pagination__editor.el-input .el-input__inner {
      height: 28px;
    }
  }
</style>