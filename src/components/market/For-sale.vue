<template>
  <div class="for-sale-container" id="for-sale-container">
    <!-- <h1>待售商品列表</h1> -->
    <div v-if="forSale.sale == 0">
      <div
        v-show="sellStockList.length == 0"
        ref="hello"
        style="text-align: center;"
      >
        <p>{{ hintMsg }}</p>
      </div>
      <div v-if="sellStockList.length !== 0">
        <div class="forSale-container">
          <table>
            <tr>
              <th>图片</th>
              <th>品牌</th>
              <th>型号</th>
              <th>库存</th>
              <th>手表参数</th>
              <th>操作</th>
            </tr>
            <tr v-for="(item, index) of sellStockList" :key="index">
              <td>
                <img
                  v-image-preview
                  :src="
                    item.buyWatchPics == null || item.buyWatchPics == ''
                      ? ''
                      : img +
                        '/img/watch/' +
                        (item.buyWatchPics || '').split('|')[0]
                  "
                  style="width: 100px;height: 100px;object-fit: cover;border-radius: 30px;"
                />
              </td>
              <td>{{ item.buyWatchBrand }}</td>
              <td>{{ item.buyWatchModel }}</td>
              <td>
                <p>总数：{{ item.watch.length }}</p>
                <p>采购中：{{ item | formatSaleNumRgx(0) }}</p>
                <p>已入库：{{ item | formatSaleNumRgx(2) }}</p>
              </td>
              <td>
                <el-tooltip
                  class="item"
                  effect="light"
                  content="查看详情"
                  placement="top-end"
                >
                  <img
                    src="../../assets/imgs/details.png"
                    style="cursor:pointer;"
                    @click="nottoquery(item.watch[0].buyWatchId)"
                  />
                </el-tooltip>
              </td>
              <td>
                <el-button type="text" @click="forSaleList(item)"
                  >查看待售列表</el-button
                >
              </td>
            </tr>
          </table>
        </div>
        <div style="width: 100%;height: 50px;">
          <div style="margin:15px 0;position:absolute;right:6%;">
            <el-pagination
              @current-change="handleCurrentChange"
              :current-page="page"
              layout="total, prev, pager, next, jumper"
              :total="total"
            ></el-pagination>
          </div>
        </div>
      </div>
    </div>
    <div v-if="forSale.sale == 1">
      <div class="for-sale-list-container" v-if="forSaleSel.select == 0">
        <div class="back-img" style="margin-top: 0;" @click="gobackForSale">
          <div>
            <img src="../../assets/imgs/goback.png" />
          </div>
          <span class="font">返回</span>
        </div>
        <table
          v-for="(item, index) of forSaleWatch.watch"
          :key="index"
          class="list-table"
        >
          <tr>
            <th>图片</th>
            <th>机芯号</th>
            <th>货号</th>
            <th v-if="item.logState == 1 || item.logState == 2">仓库</th>
            <th>保卡日期</th>
            <th>商品状态</th>
            <th v-if="item.logState == 0 || item.logState == 1">
              {{ item.logState == 0 ? "采购时间" : "预计到库时间" }}
            </th>
            <th>物流状态</th>
            <th>操作</th>
          </tr>
          <tr>
            <td>
              <img
                v-image-preview
                :src="
                  forSaleWatch.buyWatchPics == null ||
                  forSaleWatch.buyWatchPics == ''
                    ? ''
                    : img +
                      '/img/watch/' +
                      (forSaleWatch.buyWatchPics || '').split('|')[0]
                "
                style="width: 100px;height: 100px;object-fit: cover;border-radius: 30px;"
              />
            </td>
            <td>{{ item.buyWatchSn }}</td>
            <td>{{ item.stockNo }}</td>
            <td v-if="item.logState == 1 || item.logState == 2">
              {{ item.logWarehouse }}
            </td>
            <td>
              {{
                item.buyWatchCard == null || item.buyWatchCard == ""
                  ? "无"
                  : item.buyWatchCard
              }}
            </td>
            <td>
              <p>{{ item.watchState }}</p>
            </td>
            <td v-if="item.logState == 0 || item.logState == 1">
              {{
                item.logState == 0
                  ? item.buyDate
                  : item.logState == 1
                  ? item.logArriveTime
                  : ""
              }}
            </td>
            <td>
              {{
                item.logState == 0
                  ? "采购中"
                  : item.logState == 1
                  ? "运输中"
                  : "已入库"
              }}
            </td>
            <td>
              <el-button
                type="text"
                @click="sellWatch(item.id, index, item.logState)"
                >出售</el-button
              >
            </td>
          </tr>
        </table>
      </div>
      <div v-else class="for-sale-main">
        <For-sale-list :forSaleSel="forSaleSel" @goback001="goback001">
        </For-sale-list>
      </div>
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
      hintMsg: "数据加载中...",
      forSaleSel: {
        select: 0,
        buyWatchBrand: "",
        buyWatchModel: "",
        id: 0,
        watchIndex: 0,
        logState: 0,
      },
    };
  },
  props: ["forSale", "notoqyeryval"],
  mounted() {
    if (this.notoqyeryval.backval != 2) {
      if (this.forSale.sale == 0) {
        this.handleSellStockList();
      }
      this.page = 1;
      console.log(this.notoqyeryval);
      this.handleSellStockList(); //////
    }

    if (this.notoqyeryval.backval == 2) {
      // this.page = this.notoqyeryval.page;
      this.handleCurrentChange(this.notoqyeryval.page);
      console.log(this.notoqyeryval);
    }
  },
  // 库存各指标数据
  filters: {
    formatSaleNumRgx(watchArr, state) {
      let num1 = 0;
      let num2 = 0;
      for (let item of watchArr.watch) {
        if (state == 0) {
          if (item.logState == state || item.logState == 1) {
            // console.log("状态" + item.LogState);
            num1++;
          }
        }
        if (state == 2) {
          if (state == item.logState) {
            // console.log("状态" + item.LogState);
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
    },
  },
  methods: {
    // 出售商品
    sellWatch(id, index, logState) {
      this.forSaleSel.id = id;
      this.forSaleSel.logState = logState;
      console.log(this.forSaleSel.logState);
      this.forSaleSel.watchIndex = index;

      this.forSaleSel.select = 1;
    },
    //跳转至手表详情页面
    nottoquery(val) {
      console.log(val);
      this.$emit("nottoquery", 2, val, 0, this.page);
    },
    // 返回库存页
    gobackForSale() {
      this.forSale.sale = 0;
      // this.keyword = "";
      this.stockInSearch();
    },
    goback001(val) {
      this.forSaleSel.select = 0;
      if (val == 1) {
        this.sellOrderSaveSure();
      }
    },
    // 确定
    sellOrderSaveSure() {
      this.forSaleWatch.watch.splice(this.forSaleSel.watchIndex, 1);
      this.forSaleSel.select = 0;
      // this.keyword = "";
      console.log(this.forSaleWatch.watch);
      if (this.forSaleWatch.watch.length == 0) {
        this.gobackForSale();
      }
    },
    // 待售商品初始数据
    handleSellStockList() {
      this.hintMsg = "数据加载中...";
      this.$axios
        .post(this.$store.state.baseUrl + "/SellStockList", {
          page: this.page,
          pageNum: this.pageNum,
        })
        .then((res) => {
          console.log("待售商品列表");
          console.log(res);
          this.sellStockList = res.data.lst;
          this.total = res.data.total;
          if (this.sellStockList.length == 0) {
            this.hintMsg = "啊哦~ 暂无数据";
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 模糊搜索
    stockInSearch() {
      console.log("关键字---" + this.keyword);
      if (this.keyword !== "") {
        console.log(this.page);
        this.sellStockList = [];
        this.hintMsg = "数据加载中...";
        this.$axios
          .post(this.$store.state.baseUrl + "/SellStockList", {
            page: this.page,
            pageNum: this.pageNum,
            keyword: this.keyword,
          })
          .then((res) => {
            console.log("模糊搜索待售商品");
            console.log(res);
            this.total = res.data.total;
            this.sellStockList = res.data.lst;
            console.log(this.sellStockList);
            if (this.sellStockList.length == 0) {
              this.hintMsg = "啊哦~ 暂无数据";
            }
          })
          .catch((err) => {
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
      this.forSaleSel.buyWatchBrand = this.forSaleWatch.buyWatchBrand;
      this.forSaleSel.buyWatchModel = this.forSaleWatch.buyWatchModel;
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
    },
  },
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

  .for-sale-list-container {
    width: 95%;
    margin: 0 auto;

    .list-table {
      background-color: #fff;
      border-radius: 30px;
      margin: 20px 0;
      padding: 30px;
    }
  }

  .for-sale-main {
    width: 92%;
    margin: 0 auto;
    padding: 30px;
    padding-top: 5px;
    background-color: #fff;
    border-radius: 30px;
  }

  .back-img {
    width: 75px;
    height: 45px;
    margin: 23px;
    // margin-top: 0;
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
      width: 16%;
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
