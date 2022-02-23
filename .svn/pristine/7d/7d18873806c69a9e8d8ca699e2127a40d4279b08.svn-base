<template>
  <div id="have-container" class="have-outbound-container-main">
    <!-- <h1>已出库商品列表页</h1> -->
    <div v-if="haveBound.have == 0">
      <div>
        <div v-show="stockOutList.length == 0" ref="hello" style="margin-top: 60px;text-align: center;">
          <p>{{hintMsg}}</p>
        </div>
        <div v-if="stockOutList.length !== 0">
          <div style="font-size: 18px;">
            <p style="margin-top: 0;">商品数量： {{total}}</p>
          </div>
          <div class="have-outbound-container">
            <table>
              <tr>
                <th>手表图片</th>
                <th>手表品牌</th>
                <th>手表型号</th>
                <th>手表数量</th>
                <th>操作</th>
              </tr>
              <tr v-for="(item,index) of stockOutList" :key="index">
                <td>
                  <img v-image-preview
                    :src="item.buy_watchPics == null || item.buy_watchPics == '' ? '' : img + '/img/watch/'+ (item.buy_watchPics || '').split('|')[0]"
                    style="width: 100px;height: 100px;object-fit: cover;border-radius: 30px;" class="first-img" />
                </td>
                <td>{{item.buy_watchBrand}}</td>
                <td>{{item.buy_watchModel}}</td>
                <td>{{item.watch.length}}</td>
                <td>
                  <el-tooltip class="item" effect="light" content="查看详细信息" placement="top-end">
                    <img src="../../assets/imgs/details.png" style="cursor:pointer;"
                      @click="haveOutboundDetails(item.watch)" />
                  </el-tooltip>
                </td>
              </tr>
            </table>
            <div style="width: 100%;height: 63px;">
              <div style="margin:15px 0;position:absolute;right:6%;">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                  :current-page="page" layout="total, prev, pager, next, jumper" :total="total"></el-pagination>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="haveBound.have == 1">
      <div class="back-img" @click="gobackNotOutbound">
        <div>
          <img src="../../assets/imgs/goback.png" />
        </div>
        <span class="font">返回</span>
      </div>
      <table class="have-outbound-container">
        <tr>
          <th>图片</th>
          <th>出库时间</th>
          <th>货号</th>
          <th>机芯号</th>
          <th>提货人</th>
        </tr>
        <tr v-for="(items,index) of haveOutboundDetailsList" :key="index">
          <td>
            <img v-image-preview
              :src="items.watchPics == null || items.watchPics == '' ? '' : img + '/img/watch/'+ (items.watchPics || '').split('|')[0]"
              style="width: 100px;height: 100px;object-fit: cover;border-radius: 30px;" class="first-img" />
          </td>
          <td>{{items.stock_outTime}}</td>
          <td>{{items.stock_No}}</td>
          <td>{{items.buy_watchSn}}</td>
          <td>{{items.sell_sendUserNick}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        hintMsg: '数据加载中...',
        keyword: '',
        page: 1,
        pageNum: 10,
        img: this.$store.state.baseUrl,
        total: 0,
        stockOutList: [], // 已出库库存列表
        haveOutboundDetailsList: [], // 详细信息
        buy_watchPics: '',

      }
    },
    props: ["haveBound"],
    mounted() {
      this.getStocOutkList();
    },
    methods: {
      // 模糊搜索
      stockInSearch() {
        if (this.keyword !== '') {
          this.stockOutList = [];
          this.total = 0;
          this.hintMsg = '数据加载中...';
          this.$axios
            .post(this.$store.state.baseUrl + "/StockOutList", {
              page: this.page,
              pageNum: this.pageNum,
              keyword: this.keyword
            })
            .then(res => {
              console.log("模糊搜索获取已出库商品");
              console.log(res);
              this.stockOutList = res.data.lst;
              this.total = res.data.total;
              if (this.stockOutList.length == 0) {
                this.hintMsg = '啊哦~ 暂无数据'
              }
            });
        } else if (this.keyword == '') {
          this.stockOutList = [];
          this.total = 0;
          this.page = 1;
          this.getStocOutkList();
        }
      },
      // 获取已出库库存列表
      getStocOutkList() {
        this.stockOutList = [];
        this.total = 0;
        this.hintMsg = '数据加载中...';
        this.$axios.post(this.$store.state.baseUrl + '/StockOutList', {
          page: this.page,
          pageNum: this.pageNum
        }).then((res) => {
          console.log('已出库库存列表');
          console.log(res);
          this.total = res.data.total;
          this.stockOutList = res.data.lst;
          if (this.stockOutList.length == 0) {
            this.hintMsg = '啊哦~ 暂无数据'
          }
          console.log(this.stockOutList);
        }).catch((err) => {
          console.log(err);
        })
      },
      // 查看该品牌下的手表
      haveOutboundDetails(details) {
        this.haveOutboundDetailsList = details;
        this.haveBound.have = 1;
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
          this.getStocOutkList();
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
      // 返回
      gobackNotOutbound() {
        this.haveBound.have = 0;
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

  }
</script>
<style lang="scss" scoped>
  .have-outbound-container-main {
    width: 95%;
    margin: 0 auto;

    .have-outbound-container {
      padding: 30px;
      background-color: #fff;
      border-radius: 30px;
    }

    .back-img {
      width: 75px;
      height: 45px;
      margin-bottom: 20px;
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

      td {
        height: 60px;
        padding: 10px 0;
        background-color: #f3fbf9;
        font-size: 15px;
      }
    }
  }
</style>
<style lang="scss">
  #have-container {
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
  }
</style>