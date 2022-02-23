<template>
  <div>
    <!-- <h3>批发价查询页面</h3> -->
    <div v-if="priceInquire.select == 0">
      <div v-show="dataMaketPriceList.length == 0" ref="hello" style="text-align: center;">
        <p>{{hintMsg}}</p>
      </div>
      <div v-if="dataMaketPriceList.length !== 0">
        <div class="price-admin-table">
          <table>
            <tr>
              <th>图片</th>
              <th>品牌</th>
              <th>型号</th>
              <th>手表等级</th>
              <th>批发价</th>
              <th>最近更新时间</th>
              <th>操作</th>
            </tr>
            <tr v-for="(item,index) of dataMaketPriceList" :key="index">
              <td>
                <img v-image-preview
                  :src="item.buy_watchPics == null || item.buy_watchPics == '' ? '' : img + '/img/watch/' + item.buy_watchPics.split('|')[0]"
                  class="img-style" />
              </td>
              <td>{{item.buy_watchBrand}}</td>
              <td>{{item.buy_watchModel}}</td>
              <td>
                <span>{{item.watchLevel}}</span>
              </td>
              <td>{{item.prices.length !== 0 ?  'HKD ' + formatNumberRgx(item.prices[0].price) : ''}}</td>
              <td>{{item.prices.length !== 0 ? item.prices[0].time : ''}}</td>
              <td>
                <el-tooltip class="item" effect="light" content="查看详情" placement="top-end">
                  <img src="../../assets/imgs/details.png" style="cursor:pointer;" @click="priceDetails(item)" />
                </el-tooltip>
              </td>
            </tr>
          </table>
        </div>
        <div style="width: 100%;height: 50px;">
          <div style="margin:15px 0;position:absolute;right:6%;">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page"
              layout="total, prev, pager, next, jumper" :total="total"></el-pagination>
          </div>
        </div>
      </div>
    </div>
    <div v-if="priceInquire.select == 1">
      <Price-inquire-details :priceDetailsList="priceDetailsList" @gobackPriceAdmin="gobackPriceAdmin">
      </Price-inquire-details>
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
        dataMaketPriceList: [],
        img: this.$store.state.baseUrl,
        priceDetailsList: {},
        img1: require('../../assets/imgs/error.png'),
        img2: require('../../assets/imgs/sureImg.png'),
        watchLevel: '1', // 手表等级
        dialogWatchLevelVisible: false,
        buy_watchId: 0, // 手表id

      }
    },
    props: ["priceInquire"],
    created() {
      this.handleDataMaketPriceList();
    },
    methods: {
      gobackPriceAdmin(val) {
        this.priceInquire.select = val;
        // this.handleDataMaketPriceList();
      },
      // 获取批发价列表
      handleDataMaketPriceList() {
        this.hintMsg = '数据加载中...';
        this.$axios.post(this.$store.state.baseUrl + '/DataMaketPriceList', {
          page: this.page,
          pageNum: this.pageNum
        }).then((res) => {
          console.log('批发价列表');
          console.log(res);
          this.total = res.data.total;
          this.dataMaketPriceList = res.data.watchs;
          if (this.dataMaketPriceList.length == 0) {
            this.hintMsg = "啊哦~ 暂无数据";
          }
        }).catch((err) => {
          console.log(err);
        })
      },
      // 模糊搜索
      stockInSearch() {
        console.log("关键字---" + this.keyword);
        if (this.keyword !== "") {
          console.log(this.page);
          this.dataMaketPriceList = [];
          this.hintMsg = '数据加载中...';
          this.$axios
            .post(this.$store.state.baseUrl + "/DataMaketPriceList", {
              page: this.page,
              pageNum: this.pageNum,
              keyword: this.keyword
            })
            .then(res => {
              console.log("模糊搜索待售商品");
              console.log(res);
              this.total = res.data.total;
              this.dataMaketPriceList = res.data.watchs;
              if (this.dataMaketPriceList.length == 0) {
                this.hintMsg = "啊哦~ 暂无数据";
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else if (this.keyword == "") {
          this.page = 1;
          this.dataMaketPriceList = [];
          this.handleDataMaketPriceList();
        }
      },
      // 查看详情
      priceDetails(item) {
        this.priceDetailsList = item;
        this.priceInquire.select = 1;
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
        this.page = 1;
        this.page = val;
        console.log(this.page);
        if (this.keyword !== "") {
          this.stockInSearch();
        } else if (this.keyword == "") {
          this.handleDataMaketPriceList();
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
  .price-admin-table {
    width: 90%;
    margin: 0 auto;
    padding: 20px 40px;
    background-color: #fff;
    border-radius: 30px;

    .img-style {
      width: 100px;
      height: 100px;
      object-fit: cover;
      border-radius: 30px;
    }

    td {
      height: 60px;
      margin: 10px 0;
      padding: 20px 0;
      background-color: #f3fbf9;
      font-size: 15px;
      text-align: center;
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
        width: 12.5%;
        text-align: center;
        border: 0;
      }
    }
  }
</style>