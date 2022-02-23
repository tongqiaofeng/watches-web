<template>
  <div>
    <!-- <h3>批发价管理页面</h3> -->
    <div v-if="priceAdmin.select == 0">
      <div style="width: 95%;margin: 0 auto;">
        <p style="margin-top: 0;margin-bottom: 20px;color: red;">说明：在批发价变化时，应该及时更新系统。系统会将未设置等级或超过30天未更新批发价的手表标注为红色</p>
      </div>
      <div v-show="priceAdmin.dataMaketPriceList.length == 0" ref="hello" style="text-align: center;">
        <p>{{dataMsg}}</p>
      </div>
      <div v-if="priceAdmin.dataMaketPriceList.length !== 0">
        <div class="price-admin-table">
          <table>
            <tr>
              <th>图片</th>
              <th>品牌</th>
              <th>型号</th>
              <th>手表等级</th>
              <th>批发价</th>
              <th>最近更新时间</th>
              <th>是否需要设置内容</th>
              <th>操作</th>
            </tr>
            <tr v-for="(item,index) of priceAdmin.dataMaketPriceList" :key="index">
              <td>
                <img v-image-preview
                  :src="item.buy_watchPics == null || item.buy_watchPics == '' ? '' : img + '/img/watch/' + item.buy_watchPics.split('|')[0]"
                  class="img-style" />
              </td>
              <td>{{item.buy_watchBrand}}</td>
              <td>{{item.buy_watchModel}}</td>
              <td>
                <div style="display: flex;justify-content: center;">
                  <span>{{item.watchLevel}}</span>
                  <div>
                    <img src="../../assets/imgs/update.png"
                      style="width: 20px; height: 23px;margin-left: 10px;cursor: pointer;"
                      @click="updateWatchLevel(item.buy_watchId)" />
                  </div>
                  <el-dialog title="修改手表等级" :visible.sync="dialogWatchLevelVisible">
                    <div>
                      <el-radio-group v-model="watchLevel">
                        <el-radio label="1"></el-radio>
                        <el-radio label="2"></el-radio>
                        <el-radio label="3"></el-radio>
                        <el-radio label="4"></el-radio>
                      </el-radio-group>
                    </div>
                    <div slot="footer">
                      <el-button @click="dialogWatchLevelVisible = false">取 消</el-button>
                      <el-button type="primary" @click="updateWatchLevelSure" v-preventClick>确 定</el-button>
                    </div>
                  </el-dialog>
                </div>
              </td>
              <td>{{item.prices.length !== 0 ?  'HKD ' + formatNumberRgx(item.prices[0].price) : '无'}}</td>
              <td>{{item.prices.length !== 0 ? item.prices[0].time : '无'}}</td>
              <td>
                <span :class="item.flag == 0 ? 'red' : 'green'">{{item.flag == 0 ? '是' : '否'}}</span>
              </td>
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
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
              :current-page="priceAdmin.page" layout="total, prev, pager, next, jumper" :total="priceAdmin.total">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
    <div v-if="priceAdmin.select == 1">
      <Price-admin-details :priceDetailsList="priceDetailsList" @gobackPriceAdmin="gobackPriceAdmin">
      </Price-admin-details>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        dataMsg: '数据加载中...',
        page: this.priceAdmin.page,
        pageNum: 10,
        keyword: this.priceAdmin.keyword,
        total: this.priceAdmin.total,
        dataMaketPriceList: this.priceAdmin.dataMaketPriceList,
        img: this.$store.state.baseUrl,
        priceDetailsList: {},
        img1: require('../../assets/imgs/error.png'),
        img2: require('../../assets/imgs/sureImg.png'),
        watchLevel: '1', // 手表等级
        dialogWatchLevelVisible: false,
        buy_watchId: 0, // 手表id

      }
    },
    props: ["priceAdmin"],
    created() {
      this.handleDataMaketPriceList();
    },
    methods: {
      gobackPriceAdmin(val) {
        this.priceAdmin.select = val;
        // this.priceAdmin.keyword = '';
        this.priceAdmin.page = 1;
        if (this.priceAdmin.keyword !== "") {
          this.stockInSearch();
        } else {
          this.handleDataMaketPriceList();
        };
        let count = sessionStorage.getItem('maketPriceCount');
        this.$emit('priceCount', count);
      },
      // 获取批发价列表
      handleDataMaketPriceList() {
        this.dataMsg = '数据加载中...';
        this.$axios.post(this.$store.state.baseUrl + '/DataMaketPriceList', {
          page: this.priceAdmin.page,
          pageNum: this.pageNum
        }).then((res) => {
          console.log('批发价列表');
          console.log(res);
          this.priceAdmin.total = res.data.total;
          this.priceAdmin.dataMaketPriceList = res.data.watchs;
          if (this.priceAdmin.dataMaketPriceList.length == 0) {
            this.dataMsg = "啊哦~ 暂无数据";
          }
        }).catch((err) => {
          console.log(err);
        })
      },
      // 模糊搜索
      stockInSearch() {
        console.log("关键字---" + this.priceAdmin.keyword);
        if (this.priceAdmin.keyword !== "") {
          console.log(this.priceAdmin.page);
          this.priceAdmin.dataMaketPriceList = [];
          this.dataMsg = '数据加载中...';
          this.$axios
            .post(this.$store.state.baseUrl + "/DataMaketPriceList", {
              page: this.priceAdmin.page,
              pageNum: this.pageNum,
              keyword: this.priceAdmin.keyword
            })
            .then(res => {
              console.log("模糊搜索待售商品");
              console.log(res);
              this.priceAdmin.total = res.data.total;
              this.priceAdmin.dataMaketPriceList = res.data.watchs;
              if (this.priceAdmin.dataMaketPriceList.length == 0) {
                this.dataMsg = "啊哦~ 暂无数据";
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else if (this.priceAdmin.keyword == "") {
          this.priceAdmin.page = 1;
          this.priceAdmin.dataMaketPriceList = [];
          this.handleDataMaketPriceList();
        }
      },
      // 查看详情
      priceDetails(item) {
        this.priceDetailsList = item;
        this.priceAdmin.select = 1;
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
      // 修改手表等级
      updateWatchLevel(watchid) {
        this.watchLevel = '1';
        this.buy_watchId = watchid;
        console.log(this.buy_watchId);
        this.dialogWatchLevelVisible = true;
      },
      // 确定修改
      updateWatchLevelSure() {
        console.log(this.watchLevel);
        this.$axios.post(this.$store.state.baseUrl + '/DataWatchLevelModify', {
          id: this.buy_watchId,
          watchLevel: this.watchLevel
        }).then((res) => {
          console.log('修改手表等级');
          console.log(res);
          this.$message.success({
            message: '修改手表等级成功',
            showClose: true,
            duration: 2000
          });
          this.dialogWatchLevelVisible = false;
          this.priceAdmin.page = 1;
          if (this.priceAdmin.keyword !== '') {
            this.stockInSearch();
          } else {
            this.handleDataMaketPriceList();
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
        this.priceAdmin.page = val;
        console.log(this.priceAdmin.page);
        if (this.priceAdmin.keyword !== "") {
          this.stockInSearch();
        } else if (this.priceAdmin.keyword == "") {
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

    th {
      height: 50px;
      line-height: 50px;
      background-color: #d7ebe7;
    }

    td {
      height: 60px;
      margin: 10px 0;
      padding: 10px 0;
      background-color: #f3fbf9;
      font-size: 15px;
      text-align: center;
    }
  }

  .red {
    color: red;
  }

  .green {
    color: #0c8563;
  }

  .price-admin-table>table>tr:hover>td {
    background-color: #d7ebe7 !important;
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