<template>
  <div class="shipping-order-container">
    <!-- <h3>已入库/入库待售</h3> -->
    <div v-show="forAccountList.length == 0" ref="hello" style="text-align: center;">
      <p>{{hintMsg}}</p>
    </div>
    <div v-if="forAccountList.length !== 0">
      <div style="margin-left: 20px;">
        <p style="font-size: 18px;">{{'商品数量:  ' + ' ' + totalNum}}</p>
      </div>
      <div class="table-container">
        <table>
          <tr>
            <th>图片</th>
            <th>型号</th>
            <th>机芯号</th>
            <th>采购价</th>
            <th>入库时间</th>
          </tr>
        </table>
        <div v-for="(items,index) of forAccountList" :key="index">
          <table>
            <tr v-for="(item,index) of items.watch" :key="index" style="background-color: #f3fbf9;">
              <td>
                <img v-image-preview
                  :src="item.buyWatchPics == null || item.buyWatchPics == '' ? '' : img + '/img/watch/'+ item.buyWatchPics.split('|')[0]"
                  class="first-img" />
              </td>
              <td>
                <p>{{item.buyWatchBrand}}</p>
                <p>{{item.buyWatchModel}}</p>
              </td>
              <td>{{item.buyWatchSn}}</td>
              <td>{{item.buyWatchCurrency + ' ' + formatNumberRgx(item.buyWatchPrice)}}</td>
              <td>{{item.stockInTime}}</td>
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
</template>
<script>
  export default {
    data() {
      return {
        hintMsg: '数据加载中...',
        page: 1,
        pageNum: 10,
        keyword: '',
        total: 0,
        totalNum: 0,
        forAccountList: [],
        img: this.$store.state.baseUrl,
        dialogPurchaseVisible: false,
        purchaseOrder: [],

      }
    },
    created() {
      this.getForAccountList();
    },
    methods: {
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
              type: 3,
              keyword: this.keyword,
              userId: sessionStorage.getItem('purchaseUserId')
            })
            .then(res => {
              console.log("模糊搜索获取已入库商品列表");
              console.log(res);
              this.forAccountList = res.data.orders;
              this.total = res.data.watchTotal;
              this.totalNum = res.data.watchTotal;
              if (this.forAccountList.length == 0) {
                this.hintMsg = '啊哦~暂无数据'
              }
            });
        } else if (this.keyword == '') {
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
          type: 3,
          userId: sessionStorage.getItem('purchaseUserId')
        }).then((res) => {
          console.log('已入库商品列表');
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
  .shipping-order-container {
    width: 95%;
    margin: 0 auto;
    margin-top: 75px;

    .table-container {
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