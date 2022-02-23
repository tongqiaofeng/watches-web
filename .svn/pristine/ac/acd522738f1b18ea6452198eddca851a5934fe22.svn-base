<template>
  <div>
    <!-- <h3>税金管理页面</h3> -->
    <div v-if="taxesSel.select == 0">
      <div v-show="taxesList.length == 0" style="text-align: center;">
        <p>{{msg}}</p>
      </div>
      <div v-show="taxesList.length !== 0" class="commission-container">
        <div class="container-top">
          <div class="font-style">
            <p class="style-top-left">{{unCheckTotal}}</p>
            未结笔数
          </div>
          <div class="font-style">
            <p class="style-top-center" style="color: #ea5b29;">{{formatNumberRgx(unCheckMoney) + ' ' + 'HKD'}}</p>
            未结金额
          </div>
          <div class="font-style">
            <p class="style-top-right">{{backStoreTotal}}</p>
            需返店城市
          </div>
        </div>
        <div>
          <table v-for="(item,index) in taxesList" :key="index" style="margin-bottom: 20px;">
            <tr>
              <th>采购单号</th>
              <th>{{item.type == 0 || item.type == 1 ? '采购时间' : '应退金额'}}</th>
              <th v-show="item.type == 0 || item.type == 2">{{item.type == 0 ? '返店退税' : (item.type == 2 ? '税金折损' : '')}}
              </th>
              <th>{{item.type == 0 || item.type == 1 ? '应退金额' : '实退金额'}}</th>
              <th>操作</th>
            </tr>
            <tr>
              <td>{{item.obj.buy_id}}</td>
              <td>
                {{item.type == 0 || item.type == 1 ? item.obj.buy_date : formatNumberRgx(item.obj.buy_taxMoney)  + ' ' + item.obj.buy_taxCurrency}}
              </td>
              <td v-show="item.type == 0 || item.type == 2">
                {{item.type == 0 ? (item.obj.city_CN == null || item.obj.city_CN == '' ? item.obj.country_CN : item.obj.city_CN + ' / ' + item.obj.country_CN) : (item.type == 2 ? '约 ' + item.obj.lostTax + ' %' : '')}}
              </td>
              <td>
                <!-- {{item.type == 0 || item.type == 1 ? (item.obj.buy_taxMoney == 0 ? '' : formatNumberRgx(item.obj.buy_taxMoney)  + ' ' + item.obj.buy_taxCurrency) : formatNumberRgx(item.obj.buy_taxRecvMoney)  + ' ' +item.obj.buy_taxRecvCurrency}} -->
                {{item.type == 0 || item.type == 1 ? formatNumberRgx(item.obj.buy_taxMoney)  + ' ' + item.obj.buy_taxCurrency : formatNumberRgx(item.obj.buy_taxRecvMoney)  + ' ' +item.obj.buy_taxRecvCurrency}}
              </td>
              <td>
                <el-tooltip class="item" effect="light" content="查看详细信息" placement="top-end">
                  <img src="../../assets/imgs/details.png" style="cursor: pointer;"
                    @click="checkDetails(item.obj.buy_id)" />
                </el-tooltip>
              </td>
            </tr>
          </table>
          <div style="width: 100%;height: 63px;">
            <div style="margin:15px 0;position:absolute;right:10%;">
              <el-pagination @current-change="handleCurrentChange" :current-page="page"
                layout="total, prev, pager, next, jumper" :total="total"></el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="taxesSel.select == 1">
      <Details @goback="goback" :detailsSelect="detailsSelect"></Details>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        msg: '数据加载中...',
        page: 1,
        pageNum: 10,
        total: 0,
        unCheckTotal: 0, // 未结笔数 
        unCheckMoney: 0, // 未结金额
        backStoreTotal: 0, // 需返店数量
        taxesList: [],
        detailsSelect: {
          id: 1,
          num: 0,
          buy_commState: 0
        },

      }
    },
    props: ["taxesSel"],
    mounted() {
      this.handleTaxes();
    },
    methods: {
      // 获取税金列表
      handleTaxes() {
        this.msg = '数据加载中...';
        this.$axios.post(this.$store.state.baseUrl + '/BuyOrderTaxList?java', {
          page: this.page,
          pageNum: this.pageNum
        }).then((res) => {
          console.log('税金列表');
          console.log(res);
          this.unCheckTotal = res.data.unCheckTotal;
          this.unCheckMoney = res.data.unCheckMoney.toFixed(2);
          this.backStoreTotal = res.data.backStoreTotal;
          this.total = res.data.total;
          this.taxesList = res.data.lists;
          if (this.taxesList.length == 0) {
            this.msg = '啊哦~暂无数据';
          }
        }).catch((err) => {
          console.log(err);
        })
      },
      // 查看详情
      checkDetails(id) {
        sessionStorage.setItem("buy_id", id);
        this.taxesSel.select = 1;
        this.detailsSelect.num = 2;
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
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.page = val;
        console.log(this.page);
        this.handleTaxes();
        (function smoothscroll() {
          var currentScroll =
            document.documentElement.scrollTop || document.body.scrollTop;
          if (currentScroll > 0) {
            window.requestAnimationFrame(smoothscroll);
            window.scrollTo(0, currentScroll - currentScroll / 5);
          }
        })();
      },
      goback(val) {
        console.log(val);
        this.taxesSel.select = 0;
        this.handleTaxes();
      },
    },
  }
</script>
<style lang="scss" scoped>
  .commission-container {
    width: 91%;
    margin: 0 auto;
    padding: 30px;
    background-color: #fff;
    border-radius: 30px;

    .container-top {
      margin-bottom: 30px;
      padding: 0 82px 20px 82px;
      display: flex;
      justify-content: space-between;

      .font-style {
        font-size: 16px;
        color: #c0c0c0;
        text-align: center;

        .style-top-left,
        .style-top-center,
        .style-top-right {
          font-size: 20px;
          font-weight: bold;
          color: #000;
        }
      }
    }
  }

  td {
    height: 60px;
    margin: 10px 0;
    padding: 20px 0;
    background-color: #f3fbf9;
    font-size: 15px;
    text-align: center;
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