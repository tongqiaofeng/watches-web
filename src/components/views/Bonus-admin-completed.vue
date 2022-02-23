<template>
  <div>
    <!-- 分红管理 已完成 -->
    <div v-if="completedBonusSelect.select == 0">
      <table>
        <tr>
          <th>采购员</th>
          <th>分红单号</th>
          <th>利润</th>
          <th>时间</th>
          <th>操作</th>
        </tr>
        <tr v-for="(item, index) in list" :key="index">
          <td>
            <p>{{ item.nick }}</p>
          </td>
          <td>
            <p>{{ item.orderNo }}</p>
          </td>
          <td>
            <p>{{ formatNumberRgx(item.profit) + " " + item.currency }}</p>
          </td>
          <td>
            <p>{{ item.time }}</p>
          </td>
          <td>
            <el-tooltip
              class="item"
              effect="light"
              content="查看详细信息"
              placement="top-end"
            >
              <img
                src="../../assets/imgs/details.png"
                style="cursor: pointer;"
                @click="getBonusDetails(item.id)"
              />
            </el-tooltip>
          </td>
        </tr>
      </table>

      <div style="width: 100%;height: 50px;">
        <div style="margin:15px 0;position:absolute;right:6%;">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="page"
            layout="total, prev, pager, next, jumper"
            :total="total"
          >
          </el-pagination>
        </div>
      </div>
    </div>
    <div v-if="completedBonusSelect.select == 1">
      <div class="back-img" @click="gobackBonusList">
        <div>
          <img src="../../assets/imgs/goback.png" />
        </div>
        <span class="font">返回</span>
      </div>
      <div>
        <p
          :style="{ color: bonusDetails.allMoney > 0 ? '#0c7063' : 'red' }"
          class="text-style"
        >
          {{
            formatNumberRgx(bonusDetails.allMoney) + " " + bonusDetails.currency
          }}
        </p>
      </div>
      <div>
        <p>
          分红单号：<span>{{ bonusDetails.orderNo }}</span>
        </p>
        <p>
          时间：<span>{{ bonusDetails.time }}</span>
        </p>
      </div>
      <div>
        <p>分红金额：</p>
        <div style="margin-left: 20px;">
          <div class="bonus-every-style">
            <p>资金：</p>
            <p>
              {{
                formatNumberRgx(bonusDetails.bonusMsg.fundBonus) +
                  " " +
                  bonusDetails.currency
              }}
            </p>
          </div>
          <div class="bonus-every-style">
            <p>公司：</p>
            <p>
              {{
                formatNumberRgx(bonusDetails.bonusMsg.companyBonus) +
                  " " +
                  bonusDetails.currency
              }}
            </p>
          </div>
          <div class="bonus-every-style">
            <p>
              <span>{{ bonusDetails.bonusMsg.purchaseUserNick }}</span
              >采购员：
            </p>
            <p>
              {{
                formatNumberRgx(bonusDetails.bonusMsg.purchaseBonus) +
                  " " +
                  bonusDetails.currency
              }}
            </p>
          </div>
          <div
            class="bonus-every-style"
            v-for="(bonus, index) in bonusDetails.bonusMsg.sellList"
            :key="index"
          >
            <p>
              <span>{{ bonus.sellUserNick }}</span
              >销售员：
            </p>
            <p>
              {{
                formatNumberRgx(bonus.sellBonus) + " " + bonusDetails.currency
              }}
            </p>
          </div>
        </div>
      </div>
      <div style="margin-left: 20px;">
        <p>手表列表：</p>
        <div v-for="(watch, index) in bonusDetails.watchList" :key="index">
          <table>
            <tr>
              <th>图片</th>
              <th>型号</th>
              <th>销售员</th>
              <th>成本价</th>
              <th>销售价</th>
              <th>利润</th>
              <th>操作</th>
            </tr>
            <tr>
              <td>
                <img
                  v-image-preview
                  class="img-style"
                  :src="
                    watch.watchPic == null || watch.watchPic == ''
                      ? ''
                      : img + '/img/watch/' + watch.watchPic.split('|')[0]
                  "
                />
              </td>
              <td>
                <p>{{ watch.watchBrand }}</p>
                <p>{{ watch.watchModel }}</p>
              </td>
              <td>
                <span>{{ watch.sellUserNick }}</span>
              </td>
              <td>
                <span>{{
                  formatNumberRgx(watch.cost) + " " + bonusDetails.currency
                }}</span>
              </td>
              <td>
                <span>{{
                  formatNumberRgx(watch.sellMoney) + " " + bonusDetails.currency
                }}</span>
              </td>
              <td>
                <span>{{
                  formatNumberRgx(watch.profit) + " " + bonusDetails.currency
                }}</span>
              </td>
              <td>
                <el-tooltip
                  class="item"
                  effect="light"
                  content="查看详细信息"
                  placement="top-end"
                >
                  <img
                    src="../../assets/imgs/details.png"
                    style="cursor: pointer;"
                    @click="getWatchDetails(watch.id)"
                  />
                </el-tooltip>
                <el-dialog
                  title="手表详细信息"
                  :visible.sync="dialogWatchDetailsVisible"
                  center
                >
                  <div v-if="dialogWatchDetailsVisible == true">
                    <div
                      :style="{
                        color: watchDetailsCon.profit > 0 ? '#0c7063' : 'red',
                        margin: '10px 0',
                        fontSize: '18px',
                        textAlign: 'center',
                      }"
                    >
                      <span>{{ watchDetailsCon.profit > 0 ? "+ " : "" }}</span>
                      <span>{{ formatNumberRgx(watchDetailsCon.profit) }}</span>
                      <span> {{ watchDetailsCon.currency }}</span>
                    </div>
                    <div>
                      <p>手表：</p>
                      <div style="margin-left: 20px;">
                        <p>
                          品牌：<span>{{
                            watchDetailsCon.watch.watchBrand
                          }}</span>
                        </p>
                        <p>
                          型号：<span>{{
                            watchDetailsCon.watch.watchModel
                          }}</span>
                        </p>
                        <p>
                          等级：<span>{{
                            watchDetailsCon.watch.watchLevel
                          }}</span>
                        </p>
                        <p>
                          批发价：<span>{{
                            formatNumberRgx(watchDetailsCon.watch.price) +
                              " " +
                              watchDetailsCon.watch.marketCurrency
                          }}</span>
                        </p>
                      </div>
                    </div>
                    <div>
                      <p>采购：</p>
                      <div style="margin-left: 20px;">
                        <p>
                          采购员：<span>{{
                            watchDetailsCon.purchase.buyUserNick
                          }}</span>
                        </p>
                        <p>
                          采购日期：<span>{{
                            watchDetailsCon.purchase.buyDate
                          }}</span>
                        </p>
                        <p>
                          机芯号：<span>{{
                            watchDetailsCon.purchase.buyWatchSn
                          }}</span>
                        </p>
                        <p>
                          采购价格：
                          <span>{{
                            formatNumberRgx(
                              watchDetailsCon.purchase.buyWatchPrice
                            ) +
                              " " +
                              watchDetailsCon.purchase.buyWatchCurrency
                          }}</span>
                          <span
                            >（
                            {{
                              formatNumberRgx(
                                watchDetailsCon.purchase.buyWatchPriceHkd
                              ) +
                                " " +
                                watchDetailsCon.currency
                            }}
                            ）</span
                          >
                        </p>
                        <p>
                          应退税金额：
                          <span>{{
                            formatNumberRgx(
                              watchDetailsCon.purchase.buyTaxMoney
                            ) +
                              " " +
                              watchDetailsCon.purchase.buyTaxCurrency
                          }}</span>
                        </p>
                        <p>
                          实退税金额：
                          <span>{{
                            formatNumberRgx(
                              watchDetailsCon.purchase.buyTaxRecvMoney
                            ) +
                              " " +
                              watchDetailsCon.purchase.buyTaxRecvCurrency
                          }}</span>
                          <span
                            >（
                            {{
                              formatNumberRgx(
                                watchDetailsCon.purchase.buyTaxRecvMoneyHkd
                              ) +
                                " " +
                                watchDetailsCon.currency
                            }}
                            ）</span
                          >
                        </p>
                        <p>
                          小费：
                          <span>{{
                            watchDetailsCon.purchase.buyFeeMoney == 0
                              ? "无"
                              : formatNumberRgx(
                                  watchDetailsCon.purchase.buyFeeMoney
                                ) +
                                " " +
                                watchDetailsCon.purchase.buyWatchCurrency
                          }}</span>
                        </p>
                        <p>
                          佣金：
                          <span>{{
                            watchDetailsCon.purchase.buyCommMoney == 0
                              ? "无"
                              : formatNumberRgx(
                                  watchDetailsCon.purchase.buyCommMoney
                                ) +
                                " " +
                                watchDetailsCon.purchase.buyWatchCurrency
                          }}</span>
                        </p>
                        <p>
                          物流费：
                          <span>{{
                            formatNumberRgx(watchDetailsCon.purchase.logMoney) +
                              " " +
                              watchDetailsCon.currency
                          }}</span>
                        </p>
                        <p>
                          合计成本：
                          <span>{{
                            formatNumberRgx(watchDetailsCon.purchase.cost) +
                              " " +
                              watchDetailsCon.currency
                          }}</span>
                        </p>
                      </div>
                    </div>
                    <div>
                      <p>销售：</p>
                      <div style="margin-left: 20px;">
                        <p>
                          销售员：<span>{{
                            watchDetailsCon.sellUserNick
                          }}</span>
                        </p>
                        <p>
                          销售金额：<span>{{
                            formatNumberRgx(watchDetailsCon.sellMoney) +
                              " " +
                              watchDetailsCon.currency
                          }}</span>
                        </p>
                      </div>
                    </div>
                    <div>
                      <p>核算分红：</p>
                      <div style="margin-left: 20px;">
                        <p>
                          核算成本：<span>{{
                            formatNumberRgx(watchDetailsCon.checkCost) +
                              " " +
                              watchDetailsCon.currency
                          }}</span>
                        </p>
                        <div style="width: 60%;">
                          <div style="padding: 0 20px;" class="bonus-style">
                            <p>应分金额</p>
                            <p>实分金额</p>
                          </div>
                          <div class="bonus-style">
                            <p>
                              资金：{{
                                formatNumberRgx(
                                  watchDetailsCon.bonus.fundBonusMoney
                                ) +
                                  " " +
                                  watchDetailsCon.currency
                              }}
                            </p>
                            <p>
                              {{
                                formatNumberRgx(
                                  watchDetailsCon.bonus.fundRecvBonusMoney
                                ) +
                                  " " +
                                  watchDetailsCon.currency
                              }}
                            </p>
                          </div>
                          <div class="bonus-style">
                            <p>
                              公司：{{
                                formatNumberRgx(
                                  watchDetailsCon.bonus.companyBonusMoney
                                ) +
                                  " " +
                                  watchDetailsCon.currency
                              }}
                            </p>
                            <p>
                              {{
                                formatNumberRgx(
                                  watchDetailsCon.bonus.companyRecvBonusMoney
                                ) +
                                  " " +
                                  watchDetailsCon.currency
                              }}
                            </p>
                          </div>
                          <div class="bonus-style">
                            <p>
                              采购：{{
                                formatNumberRgx(
                                  watchDetailsCon.bonus.buyBonusMoney
                                ) +
                                  " " +
                                  watchDetailsCon.currency
                              }}
                            </p>
                            <p>
                              {{
                                formatNumberRgx(
                                  watchDetailsCon.bonus.buyRecvBonusMoney
                                ) +
                                  " " +
                                  watchDetailsCon.currency
                              }}
                            </p>
                          </div>
                          <div class="bonus-style">
                            <p>
                              销售：{{
                                formatNumberRgx(
                                  watchDetailsCon.bonus.sellBonusMoney
                                ) +
                                  " " +
                                  watchDetailsCon.currency
                              }}
                            </p>
                            <p>
                              {{
                                formatNumberRgx(
                                  watchDetailsCon.bonus.sellRecvBonusMoney
                                ) +
                                  " " +
                                  watchDetailsCon.currency
                              }}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div slot="footer">
                    <el-button @click="dialogWatchDetailsVisible = false"
                      >取 消</el-button
                    >
                    <el-button
                      type="primary"
                      @click="dialogWatchDetailsVisible = false"
                      >确 定</el-button
                    >
                  </div>
                </el-dialog>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      page: 1,
      pageNum: 10,
      total: 0,
      list: [],
      img: this.$store.state.baseUrl,
      bonusDetails: {}, // 分红单详情
      dialogWatchDetailBonusVisible: false,
      dialogDeleteBonusVisible: false,
      deleteId: 0,
      img1: require("../../assets/imgs/sureImg.png"),
      img2: require("../../assets/imgs/error.png"),
      watchDetailsCon: {},
      dialogWatchDetailsVisible: false,
    };
  },
  props: {
    completedBonusList: {
      type: Array,
      default: [],
    },
    completedBonusSelect: {
      type: Object,
      default: {},
    },
  },
  created() {
    this.getList();
  },
  methods: {
    // 获取分红单详细信息
    getBonusDetails(id) {
      this.$axios
        .post(this.$store.state.baseUrl + "/bonusForm?java", {
          id: id,
        })
        .then((res) => {
          console.log("获取分红单详细信息");
          console.log(res);
          this.bonusDetails = res.data;
          this.completedBonusSelect.select = 1;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // 查看手表详细信息
    getWatchDetails(id) {
      this.$axios
        .post(this.$store.state.baseUrl + "/watchInfoBonus?java", {
          id: id,
        })
        .then((res) => {
          console.log("手表详细信息");
          console.log(res);
          this.watchDetailsCon = res.data;
          this.dialogWatchDetailsVisible = true;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 返回列表
    gobackBonusList() {
      this.completedBonusSelect.select = 0;
    },
    // 分页处理数据
    getList() {
      console.log("分页数据");
      this.total = this.completedBonusList.length;
      console.log(this.completedBonusList);
      // es6过滤得到满足搜索条件的展示数据list
      this.list = this.completedBonusList.filter(
        (item, index) =>
          index < this.page * this.pageNum &&
          index >= this.pageNum * (this.page - 1)
      );
      console.log(this.list);
    },

    // 分页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page = val;
      this.getList();
      (function smoothscroll() {
        let currentScroll =
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
.back-img {
  width: 75px;
  height: 45px;
  margin-bottom: 30px;
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

.text-style {
  text-align: center;
  font-size: 18px;
}

.bonus-every-style {
  width: 400px;
  display: flex;
  justify-content: space-between;
}

.img-style {
  width: 100px;
  height: 100px;
  margin-left: 15px;
  border-radius: 30px;
  object-fit: cover;
}

.bonus-style {
  display: flex;
  justify-content: space-between;
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
