<template>
  <div>
    <!-- <h3>批发价查询页面</h3> -->
    <div v-if="priceInquire.select == 0">
      <div class="report-screen">
        <div class="report-checked">
          <el-checkbox
            v-model="checked1"
            @change="notputinto"
            class="el-checkbox__label"
            >未设置</el-checkbox
          >
          <el-checkbox
            v-model="checked2"
            @change="alreadyinto"
            class="el-checkbox__label"
            >已设置</el-checkbox
          >
        </div>
        <div class="report-sort">
          <div class="time-sort" @click="timechange" style="cursor: pointer;">
            <span>入库时间 </span>
            <div class="caret" v-if="updownshow == true">
              <i class="el-icon-caret-top" v-if="dispalytype == 2"></i
              ><i class="el-icon-caret-bottom" v-if="dispalytype == 1"></i>
            </div>
          </div>
          <div class="price-sort" @click="controltime" style="cursor: pointer;">
            <span>设置时间 </span>
            <div class="caret" v-if="updownshow == false">
              <i class="el-icon-caret-top" v-if="dispalytype2 == 1"></i
              ><i class="el-icon-caret-bottom" v-if="dispalytype2 == 2"></i>
            </div>
          </div>
        </div>
      </div>
      <div v-if="list.length !== 0">
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
            <tr v-for="(item, index) of list" :key="index">
              <td>
                <img
                  v-image-preview
                  :src="
                    item.buyWatchPics == null || item.buyWatchPics == ''
                      ? ''
                      : img + '/img/watch/' + item.buyWatchPics.split('|')[0]
                  "
                  class="img-style"
                />
              </td>
              <td>{{ item.buyWatchBrand }}</td>
              <td>{{ item.buyWatchModel }}</td>
              <td>
                <span>{{ item.watchLevel }}</span>
              </td>
              <td>
                {{
                  item.prices.length !== 0
                    ? companyLoginCurrency +
                      " " +
                      formatNumberRgx(item.prices[0].price)
                    : "暂无"
                }}
              </td>
              <td>
                {{ item.prices.length !== 0 ? item.prices[0].time : "暂无" }}
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
                    @click="priceDetails(item)"
                  />
                </el-tooltip>
              </td>
            </tr>
          </table>
        </div>
        <div style="width: 100%;height: 50px;">
          <div style="margin:15px 0;position:absolute;right:6%;">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="page"
              layout="total, prev, pager, next, jumper"
              :total="total"
            ></el-pagination>
          </div>
        </div>
      </div>
      <div v-show="list.length == 0" ref="hello" style="text-align: center;">
        <p>{{ hintMsg }}</p>
      </div>
    </div>
    <div v-if="priceInquire.select == 1">
      <Price-inquire-details
        :priceDetailsList="priceDetailsList"
        @gobackPriceAdmin="gobackPriceAdmin"
      >
      </Price-inquire-details>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      companyLoginCurrency: sessionStorage.getItem("companyLoginCurrency"),
      hintMsg: "数据加载中...",
      page: 1,
      pageNum: 10,
      keyword: "",
      total: 0,
      dataMaketPriceList: [],
      img: this.$store.state.baseUrl,
      priceDetailsList: {},
      img1: require("../../assets/imgs/error.png"),
      img2: require("../../assets/imgs/sureImg.png"),
      watchLevel: "1", // 手表等级
      dialogWatchLevelVisible: false,
      buyWatchId: 0, // 手表id
      checked1: false,
      checked2: true,
      updownshow: true,
      dispalytype: 1,
      dispalytype2: 1,
      num: 1,
      num2: 1,
      temporarylist: [],
      resdata: [],
      list: [],
    };
  },
  props: ["priceInquire"],
  created() {
    this.handleDataMaketPriceList();
  },
  methods: {
    notputinto() {
      //复选框-- 未设置
      // console.log(this.checked1);
      this.Conditionalscreening();
    },
    alreadyinto() {
      //复选框-- 已设置
      this.Conditionalscreening();
    },
    timechange() {
      //入库时间升降序
      this.updownshow = true;
      this.InTimechange();
    },
    controltime() {
      //设置时间升降序
      this.updownshow = false;
      this.Settimechange();
    },
    gobackPriceAdmin(val) {
      this.priceInquire.select = val;
      // this.handleDataMaketPriceList();
    },
    // 获取批发价列表
    handleDataMaketPriceList() {
      this.hintMsg = "数据加载中...";
      this.$axios
        .post(this.$store.state.baseUrl + "/DataMaketPriceList", {
          page: this.page,
          // pageNum: this.pageNum,
          pageNum: "",
        })
        .then((res) => {
          console.log("批发价列表");
          console.log(res);
          console.log(res.data.watchs);
          this.total = res.data.total;
          this.resdata = res.data;
          this.dataMaketPriceList = res.data.watchs;
          this.Conditionalscreening();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    Conditionalscreening() {
      if (this.keyword == "") {
        this.dataMaketPriceList = this.resdata.watchs;
      } else {
        //搜索关键字不为空
        this.dataMaketPriceList = this.temporarylist2;
      }
      if (this.checked1 == true && this.checked2 == true) {
        this.temporarylist = [];
        this.temporarylist = this.dataMaketPriceList;
      } else if (this.checked1 == true && this.checked2 == false) {
        this.temporarylist = [];
        this.dataMaketPriceList.forEach((item) => {
          if (item.prices.length == 0) {
            this.temporarylist.push(item);
          }
        });
      } else if (this.checked1 == false && this.checked2 == true) {
        this.temporarylist = [];
        this.dataMaketPriceList.forEach((item) => {
          if (item.prices.length != 0) {
            this.temporarylist.push(item);
          }
        });
      } else if (this.checked1 == false && this.checked2 == false) {
        this.temporarylist = [];
      }
      this.dataMaketPriceList = this.temporarylist;
      console.log(this.temporarylist);
      this.total = this.temporarylist.length;
      if (this.updownshow == true) {
        if (this.dispalytype == 1) {
          console.log("dis1==1--------num2=2");
          this.num = 1;
        } else {
          //保证升降序和和之前一致
          this.num = 2;
          console.log("dis1==2--------num2=1");
        }
        this.InTimechange();
      } else {
        if (this.dispalytype2 == 1) {
          console.log("dis2==1--------num2=2");
          this.num2 = 1;
        } else {
          //保证升降序和和之前一致
          this.num2 = 2;
          console.log("dis2==2--------num2=1");
        }
        this.Settimechange();
      }
    },
    InTimechange() {
      //0入库时间升降序
      let atime, btime;
      this.dataMaketPriceList.sort((a, b) => {
        atime = a.stockLastInTime;
        btime = b.stockLastInTime;
        let aTime = new Date(atime).getTime();
        let bTime = new Date(btime).getTime();
        // return bTime - aTime //  默认
        if (this.num % 2 == 0) {
          this.dispalytype = 2;
          // console.log("jiangxu");
          return aTime - bTime; //日期降序  默认
        } else {
          this.dispalytype = 1;
          // console.log("shengxu");
          return bTime - aTime; //日期升序
        }
      });
      this.page = 1;
      this.getList();
      this.num++;
    },
    Settimechange() {
      //设置时间升降序
      let atime, btime;
      this.dataMaketPriceList.sort((a, b) => {
        atime = a.prices.length !== 0 ? a.prices[0].time : 0;
        btime = b.prices.length !== 0 ? b.prices[0].time : 0;
        let aTime = new Date(atime).getTime();
        let bTime = new Date(btime).getTime();
        if (this.num2 % 2 == 0) {
          this.dispalytype2 = 2;
          return bTime - aTime; //
        } else {
          this.dispalytype2 = 1;
          return aTime - bTime; //默认
        }
      });
      this.page = 1;
      this.getList();
      this.num2++;
    },
    // 数据条数分页处理
    getList() {
      console.log("默认分页数据----10条/每页" + this.dataMaketPriceList.length);
      this.list = this.dataMaketPriceList.filter(
        (item, index) =>
          index < this.page * this.pageNum &&
          index >= this.pageNum * (this.page - 1)
      );
      if (this.list.length == 0) {
        this.hintMsg = "啊哦~ 暂无数据";
      }
      console.log(this.list);
    },
    // 模糊搜索
    stockInSearch() {
      console.log("关键字---" + this.keyword);
      if (this.keyword !== "") {
        console.log(this.page);
        this.dataMaketPriceList = [];
        this.hintMsg = "数据加载中...";
        this.$axios
          .post(this.$store.state.baseUrl + "/DataMaketPriceList", {
            page: this.page,
            pageNum: this.pageNum,
            keyword: this.keyword,
          })
          .then((res) => {
            console.log("模糊搜索待售商品");
            console.log(res);
            this.total = res.data.total;
            this.temporarylist2 = res.data.watchs;
            this.Conditionalscreening();
          })
          .catch((err) => {
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
      // this.page = 1;
      this.page = val;
      console.log(this.page);
      if (this.keyword !== "") {
        this.stockInSearch();
      } else {
        this.getList();
      }
      // else if (this.keyword == "") {
      //     this.handleDataMaketPriceList();
      // }
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

.report-screen {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  width: 90%;
  margin: 20px auto;
}

.report-checked {
  width: 36%;
  display: flex;
  justify-content: space-between;
  color: #000;
}

.report-sort {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  width: 36%;
}

.time-sort,
.price-sort {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;
  font-weight: 16px;
  font-weight: bold;
  width: 80px;
}

.el-icon-d-caret {
  line-height: 22px;
  margin-left: 16px;
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
