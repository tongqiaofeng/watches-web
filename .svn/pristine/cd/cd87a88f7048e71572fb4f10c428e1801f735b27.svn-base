<template>
  <div id="completed-container">
    <!-- <h1>已完成销售</h1> -->
    <div class="for-sale-list-container">
      <div>
        <div v-show="forSaleWatchList.length == 0" style="margin-top: 100px; text-align: center;">
          <p>{{hintMsg}}</p>
        </div>
        <div v-if="forSaleWatchList.length !== 0">
          <div v-for="(item,index) of forSaleWatchList" :key="index" class="completed-table">
            <div>
              <span class="purchase-number">销售单号: {{" " + item.sell_orderId}}</span>
              <span class="purchase-date">销售日期: {{item.sell_time}}</span>
            </div>
            <table class="list-table">
              <tr>
                <th>图片</th>
                <th>品牌</th>
                <th>型号</th>
                <th>客户名称</th>
                <th>销售金额</th>
                <th>操作</th>
              </tr>
              <tr>
                <td>
                  <img v-image-preview
                    :src="item.buy_watchPics == null || item.buy_watchPics == '' ? '' : img + '/img/watch/'+ (item.buy_watchPics || '').split('|')[0]"
                    style="width: 100px;height: 100px;object-fit: cover;border-radius: 30px;" />
                </td>
                <td>
                  <p>{{item.buy_watchBrand}}</p>
                </td>
                <td>
                  <p>{{item.buy_watchModel}}</p>
                </td>
                <td>{{item.sell_custom}}</td>
                <td>{{item.sell_currency +" "+ formatNumberRgx(item.sell_money)}}</td>
                <td>
                  <el-tooltip class="item" effect="light" content="查看详细信息" placement="top-end">
                    <img src="../../assets/imgs/details.png" style="cursor: pointer;" @click="sellWatch(item)" />
                  </el-tooltip>
                  <el-dialog title="详细信息" :visible.sync="dialogSaleListVisible" center>
                    <div style="text-align: left;">
                      <div>
                        <el-form label-width="120px">
                          <el-form-item label="型号：">
                            <span>{{detailsInfo.buy_watchBrand +' - '+ detailsInfo.buy_watchModel}}</span>
                          </el-form-item>
                          <el-form-item label="销售日期：">
                            <el-date-picker v-model="sell_time" type="date" class="input-style" readonly>
                            </el-date-picker>
                          </el-form-item>
                          <el-form-item label="销售金额：">
                            <el-input type="text" v-model="sell_money" class="input-style" readonly>
                              <i slot="suffix"
                                style="color: #000;margin-right:5%;font-style:normal;">{{sell_currency}}</i>
                            </el-input>
                          </el-form-item>
                          <el-form-item label="客户名称：">
                            <el-input v-model="sell_custom" class="input-style" readonly></el-input>
                          </el-form-item>
                        </el-form>
                      </div>
                      <div>
                        <div class="top-form">
                          <span class="top-span">是否全款：</span>
                          <el-switch v-model="sell_payFull" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
                        </div>
                        <div v-if="sell_payFull == false">
                          <div style="margin: 20px;padding: 20px;border: 1px solid #000;border-radius: 30px;">
                            <p>定金：</p>
                            <el-form label-width="120px">
                              <el-form-item label="付款日期：">
                                <el-date-picker v-model="sell_payTime1" type="date" class="input-style" readonly>
                                </el-date-picker>
                              </el-form-item>
                              <el-form-item label="付款金额：">
                                <el-input type="text" v-model="sell_payMoney1" class="input-style" readonly>
                                  <i slot="suffix" style="color: #000;margin-right:5%;font-style:normal;">HKD</i>
                                </el-input>
                              </el-form-item>
                            </el-form>
                          </div>
                          <div style="margin: 20px;padding: 20px;border: 1px solid #000;border-radius: 30px;">
                            <p>尾款：</p>
                            <el-form label-width="120px">
                              <el-form-item label="付款日期：">
                                <el-date-picker v-model="sell_payTime2" type="date" class="input-style" readonly>
                                </el-date-picker>
                              </el-form-item>
                              <el-form-item label="付款金额：">
                                <el-input type="text" v-model="sell_payMoney2" class="input-style" readonly>
                                  <i slot="suffix" style="color: #000;margin-right:5%;font-style:normal;">HKD</i>
                                </el-input>
                              </el-form-item>
                            </el-form>
                          </div>
                        </div>
                        <div v-if="sell_payFull == true">
                          <div style="margin: 20px;padding: 20px;border: 1px solid #000;border-radius: 30px;">
                            <el-form label-width="120px">
                              <el-form-item label="付款日期：">
                                <el-date-picker v-model="sell_payTime1" type="date" class="input-style" readonly>
                                </el-date-picker>
                              </el-form-item>
                              <el-form-item label="付款金额：">
                                <el-input type="text" v-model="sell_payMoney1" class="input-style" readonly>
                                  <i slot="suffix" style="color: #000;margin-right:5%;font-style:normal;">HKD</i>
                                </el-input>
                              </el-form-item>
                            </el-form>
                          </div>
                        </div>
                        <div style="margin: 30px;">
                          <p>备注：</p>
                          <el-input type="textarea" v-model="sell_note" placeholder="请输入备注信息" readonly></el-input>
                        </div>
                      </div>
                      <div style="margin-bottom: 40px;">
                        <el-form label-width="120px">
                          <el-form-item label="出库日期：">
                            <el-date-picker v-model="stock_outTime" class="input-style" readonly></el-date-picker>
                          </el-form-item>
                          <el-form-item label="送货人：">
                            <span>{{sell_sendUserNick}}</span>
                          </el-form-item>
                        </el-form>
                      </div>
                    </div>
                    <div slot="footer">
                      <el-button @click="dialogSaleListVisible = false">取 消</el-button>
                      <el-button type="primary" @click="dialogSaleListVisible = false">确 定</el-button>
                    </div>
                  </el-dialog>
                </td>
              </tr>
            </table>
          </div>
          <div style="width: 100%;height: 50px;padding-bottom: 30px;">
            <div style="margin:15px 0;position:absolute;right:6%;">
              <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page"
                layout="total, prev, pager, next, jumper" :total="total"></el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        keyword: "",
        img: this.$store.state.baseUrl,
        page: 1,
        pageNum: 10,
        forSaleWatchList: [],
        total: 0,
        detailsInfo: {},
        dialogSaleListVisible: false,
        sell_time: new Date(), // 销售日期
        sell_money: "", // 销售金额
        sell_currency: "", // 币种
        sell_custom: "", // 客户名称
        sell_payFull: false, // 是否全款   0:非全款 1:全款
        sell_payMoney1: "", // 第一次付款（定金）
        sell_payTime1: new Date(), // 第一次付款（定金）时间
        sell_payMoney2: "", // 第二次付款（尾款）（sell_payFull为1时，该内容不传）
        sell_payTime2: new Date(), // 第二次付款（尾款）时间（sell_payFull为1时，该内容不传）
        sell_note: "", // 备注
        stock_outTime: "", // 出库时间
        sell_sendUserNick: "", // 送货人

        hintMsg: '数据加载中',

      };
    },
    mounted() {
      this.getSellOrderList();
    },
    methods: {
      // 已完成销售列表
      getSellOrderList() {
        this.forSaleWatchList = [];
        this.total = 0;
        this.hintMsg = "数据加载中...";
        this.$axios
          .post(this.$store.state.baseUrl + "/SellOrderList", {
            page: this.page,
            pageNum: this.pageNum
          })
          .then(res => {
            console.log("已完成销售");
            console.log(res);
            this.forSaleWatchList = res.data.lst;
            this.total = res.data.total;
            if (this.forSaleWatchList.length == 0) {
              this.hintMsg = "啊哦~ 暂无数据";
            }
          });
      },
      // 模糊搜索
      stockInSearch() {
        if (this.keyword !== "") {
          this.forSaleWatchList = [];
          this.hintMsg = "数据加载中...";
          this.$axios
            .post(this.$store.state.baseUrl + "/SellOrderList", {
              page: this.page,
              pageNum: this.pageNum,
              keyword: this.keyword
            })
            .then(res => {
              console.log("模糊搜索已售商品");
              console.log(res);
              this.forSaleWatchList = res.data.lst;
              this.total = res.data.total;
              console.log(this.forSaleWatchList);
              if (this.forSaleWatchList.length == 0) {
                this.hintMsg = "啊哦~ 暂无数据";
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else if (this.keyword == "") {
          this.page = 1;
          this.forSaleWatchList = [];
          this.getSellOrderList();
        }
      },
      // 详细信息
      sellWatch(item) {
        console.log("详细信息");
        console.log(item);
        this.detailsInfo = item;
        this.sell_time = item.sell_time;
        this.sell_money = item.sell_money;
        this.sell_currency = item.sell_currency;
        this.sell_custom = item.sell_custom;
        if (item.sell_payFull == 0) {
          this.sell_payFull = false;
          this.sell_payMoney1 = item.sell_payMoney1;
          this.sell_payTime1 = item.sell_payTime1;
          this.sell_payMoney2 = item.sell_payMoney2;
          this.sell_payTime2 = item.sell_payTime2;
        } else if (item.sell_payFull == 1) {
          this.sell_payFull = true;
          this.sell_payMoney1 = item.sell_payMoney1;
          this.sell_payTime1 = item.sell_payTime1;
        }
        this.sell_note = item.sell_note;
        this.stock_outTime = item.stock_outTime;
        this.sell_sendUserNick = item.sell_sendUserNick;
        this.dialogSaleListVisible = true;
        // this.forSaleListSelect.list = 1;
      },
      // 分页
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.page = val;
        console.log(this.page);
        if (this.keyword == '') {
          this.getSellOrderList();
        } else if (this.keyword !== '') {
          this.stockInSearch();
        }
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
  .for-sale-list-container {
    width: 95%;
    margin: 0 auto;

    .completed-table {
      padding: 30px;
      margin-bottom: 20px;
      border-radius: 30px;
      background-color: #fff;
    }

    .purchase-number {
      font-size: 18px;
      font-weight: bold;
    }

    .purchase-date {
      margin-left: 30px;
      color: #c8c8c8;
    }

    .input-style {
      width: 70% !important;
    }

    .list-table {
      margin-top: 20px;
    }
  }

  td {
    height: 60px;
    margin: 10px 0;
    padding: 20px 0;
    background-color: #f3fbf9;
    font-size: 15px;
  }

  .top-form {
    width: 190px;
    height: 60px;
    padding-left: 30px;
    line-height: 60px;
    background-color: #fff;
    border-radius: 30px;

    .top-span {
      margin-right: 15px;
      font-size: 23px;
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
        width: 12%;
        text-align: center;
        border: 0;
      }
    }
  }
</style>
<style lang="scss">
  #completed-container {
    .el-pagination button:disabled {
      color: #c0c4cc;
      background-color: transparent;
      cursor: not-allowed;
    }

    .el-form-item__label {
      text-align: right;
    }

    .el-pagination__editor.el-input .el-input__inner {
      height: 28px;
    }
  }
</style>