<template>
  <div id="have-account">
    <!-- <h3>已分红</h3> -->
    <div v-if="haveAccountNum.num == 0" class="have-account-container">
      <div v-show="haveAccountList.length == 0" style="text-align: center;">
        <p>{{hintMsg}}</p>
      </div>
 
      <div v-if="haveAccountList.length !== 0">
        <div style="margin-left: 20px;">
          <p style="font-size: 20px;">{{'商品数量:  ' + ' ' + totalNum}}</p>
        </div>
        <div class="account-table" v-for="(items,index) of haveAccountList" :key="index">
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
              <td>
                <img v-image-preview
                  :src="item.buyWatchPics == null || item.buyWatchPics == '' ? '' : img + '/img/watch/'+ item.buyWatchPics.split('|')[0]"
                  class="first-img" />
              </td>
              <td>{{item.buyWatchModel}}</td>
              <td>{{item.buyWatchSn}}</td>
              <td>{{item.buyWatchCurrency + ' ' + formatNumberRgx(item.buyWatchPrice)}}</td>
              <td>{{item.sellCurrency + ' ' + formatNumberRgx(item.sellMoney)}}</td>
              <td>
                <el-tooltip class="item" effect="light" content="查看分红单信息" placement="top-end">
                  <img src="../../assets/imgs/details.png" style="cursor: pointer;"
                    @click="getHaveBonus(item.adminSettleOrderId)" />
                </el-tooltip>
              </td>
            </tr>
          </table>
          <div style="width: 100%;height: 50px;">
            <div style="margin:15px 0;position:absolute;right:6%;">
              <el-pagination @current-change="handleCurrentChange" :current-page="page"
                layout="total, prev, pager, next, jumper" :total="total">
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="haveAccountNum.num == 1">
      <Bonus-details :purchaseBonusDetails="bonusDetails" @purchaseSelect="purchaseSelect"></Bonus-details>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        img: this.$store.state.baseUrl,
        page: 1,
        pageNum: 10,
 
        list: [],
        keyword: '',
        total: 0,
        totalNum: 0,
        haveAccountList: [],
        hintMsg: '数据加载中...',
        bonusDetails: {},

      }
    },
    props: {
      haveAccountNum: {
        type: Object
      },
    },
    created() {
      this.getHaveAccountList();
    },
    methods: {
      // 获取分红单信息
      getHaveBonus(adminSettleOrderId) {
        console.log(adminSettleOrderId);
        this.$axios.post(this.$store.state.baseUrl + '/purchaseBonusForm?java', {
          id: adminSettleOrderId
        }).then((res) => {
          console.log('分红单信息');
          console.log(res);
          this.bonusDetails = res.data;
          this.$emit('shippingState', 1);
          this.haveAccountNum.num = 1;
          (function smoothscroll() {
            let currentScroll =
              document.documentElement.scrollTop || document.body.scrollTop;
            if (currentScroll > 0) {
              window.requestAnimationFrame(smoothscroll);
              window.scrollTo(0, currentScroll - currentScroll / 5);
            }
          })();
        }).catch(err => {
          console.log(err);
        })
      },
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
              keyword: this.keyword,
              userId: sessionStorage.getItem('purchaseUserId')
            })
            .then(res => {
              console.log("模糊搜索获取已分红商品列表");
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
      // 获取已分红商品
      getHaveAccountList() {
        this.haveAccountList = [];
        this.hintMsg = '数据加载中...';
        this.$axios.post(this.$store.state.baseUrl + '/BuyOrderListEx', {
          page: this.page,
          pageNum: this.pageNum,
          type: 5,
          userId: sessionStorage.getItem('purchaseUserId')
        }).then((res) => {
          console.log('已分红商品列表');
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
      purchaseSelect(val) {
        this.haveAccountNum.num = val;
        this.$emit('shippingState', 0);
      },
      // 分页
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.page = val;
        console.log(this.page);
        if (this.keyword !== '') {
          this.stockInSearch();
        } else if (this.keyword == '') {
          this.getHaveAccountList();
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
  .have-account-container {
    width: 95%;
    margin: 0 auto;
    margin-top: 75px;
  }

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