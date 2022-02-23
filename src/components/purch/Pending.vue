<template>
  <div class="mypurchase-container" id="pending-container">
    <div v-if="selectSearch.msg == 0" class="pending-main-con">
      <div style="margin-top: 75px;">
        <div
          v-show="purchaseOrder.length == 0"
          ref="hello"
          style="text-align: center;"
        >
          <p>{{ hintMsg }}</p>
        </div>
        <div v-if="purchaseOrder.length !== 0">
          <div style="margin-left: 20px;">
            <p style="margin: 20px 0;font-size: 18px;">
              {{ "商品数量:  " + " " + totalNum }}
            </p>
          </div>
          <div
            v-for="(item, index) of purchaseOrder"
            :key="index"
            class="mypurchase-table"
          >
            <div class="purchase-row">
              <div>

                <span class="purchase-number"
                  >采购单号: {{ " " + item.buyId }}</span
                >
                <span class="purchase-date">采购日期: {{ item.buyDate }}</span>
              </div>
              <div>
                <el-tooltip
                  class="item"
                  effect="light"
                  content="删除采购单"
                  placement="top-end"
                >
                  <img
                    src="../../assets/imgs/delete.png"
                    style="margin-left: 30px;cursor: pointer;"
                    @click="deleteOrder(item.buyId)"
                  />
                </el-tooltip>
                <el-dialog
                  title="删除采购单"
                  :visible.sync="dialogDeleteOrderVisible"
                  center
                >
                  <div style="text-align: center;">
                    <p>确定删除该采购单？删除后不可恢复</p>
                  </div>
                  <div slot="footer">

                    <el-button @click="dialogDeleteOrderVisible = false"
                      >取 消</el-button
                    >
                    <el-button
                      type="primary"
                      @click="deleteOrderSure"
                      v-preventClick
                      >确 定</el-button
                    >
                  </div>
                </el-dialog>
              </div>
            </div>
            <div class="state-style">
              <div class="state-container">
                <div class="jump-div" @click="drawback1(item.buyId)">
                  <div style="margin-right: 10px;">
                    <img
                      class="jump-img"
                      :src="
                        watchInfoSelect(item.watch) == 1 ? watchimg1 : watchimg2
                      "
                    />
                  </div>
                  <span type="text" class="button-mypurchase one"
                    >手表信息</span
                  >
                </div>
                <div class="jump-div" @click="drawback2(item.buyId)">
                  <div style="margin-right: 10px;">
                    <img
                      class="jump-img"
                      :src="item.buyPayState == 1 ? watchimg1 : watchimg2"
                    />
                  </div>
                  <span type="text" class="button-mypurchase two">付款</span>
                </div>
                <div class="jump-div" @click="drawback3(item.buyId)">
                  <div style="margin-right: 10px;">
                    <img
                      class="jump-img"
                      :src="
                        item.buyTaxState == 1
                          ? watchimg1
                          : item.buyTaxState == 0
                          ? watchimg2
                          : watchimg3
                      "
                    />
                  </div>
                  <span type="text" class="button-mypurchase three">退税</span>
                </div>
                <div
                  class="jump-div"
                  @click="drawback5(item.buyId, item.buyCommState)"
                >
                  <div style="margin-right: 10px;">
                    <img
                      class="jump-img"
                      :src="
                        item.buyCommState == 1
                          ? watchimg1
                          : item.buyCommState == 0
                          ? watchimg2
                          : watchimg3
                      "
                    />
                  </div>
                  <span type="text" class="button-mypurchase three">佣金</span>
                </div>
                <div class="jump-div" @click="drawback4(item.buyId)">
                  <div style="margin-right: 10px;">
                    <img
                      class="jump-img"
                      :src="
                        item.buyFeeState == 1
                          ? watchimg1
                          : item.buyFeeState == 0
                          ? watchimg2
                          : watchimg3
                      "
                    />
                  </div>
                  <span type="text" class="button-mypurchase four">小费</span>
                </div>
              </div>
            </div>
            <div class="div-table">
              <table>
                <tr class="table-tr">
                  <th class="table-th first-img">图片</th>
                  <th class="table-th">型号</th>
                  <th class="table-th">机芯号</th>
                  <th class="table-th">采购价</th>
                  <th class="table-th">销售价</th>
                  <th class="table-th">状态</th>
                </tr>
                <tr
                  class="table-tr-container"
                  v-for="(content, indexs) of item.watch"
                  :key="indexs"
                >
                  <td>
                    <img
                      v-image-preview
                      :src="
                        content.buyWatchPics == null ||
                        content.buyWatchPics == ''
                          ? ''
                          : img +
                            '/img/watch/' +
                            content.buyWatchPics.split('|')[0]
                      "
                      class="first-img"
                    />
                  </td>
                  <td>

                    <p style="margin: 0;">{{ content.buyWatchBrand }}</p>
                    <p style="margin: 0;">{{ content.buyWatchModel }}</p>
                  </td>
                  <td>{{ content.buyWatchSn }}</td>
                  <td>

                    {{ content.buyWatchCurrency }}
                    {{ formatNumberRgx(content.buyWatchPrice) }}
                  </td>
                  <td>
                    {{
                      content.sellState == 0
                        ? "未销售"
                        : content.sellCurrency +
                          " " +
                          formatNumberRgx(content.sellMoney)
                    }}
                  </td>
                  <td>
                    <div
                      style="width: 100%;display: flex;justify-content: space-between;"
                    >
                      <div>

                        <div
                          @click="
                            shipped(content.logId, content.logState, index)
                          "
                          class="jump-div"
                        >
                          <div style="margin-top: 2px;">
                            <img
                              class="jump-img"
                              :src="
                                content.logState > 0 ? watchimgs1 : watchimgs2
                              "
                            />
                          </div>
                          <span type="text" class="button-mypurchase four"
                            >发货</span
                          >
                        </div>
                        <el-dialog
                          title="物流详细信息"
                          :visible.sync="dialogShippedVisible"
                        >
                          <div style="text-align: left;">
                            <div class="details-container">
                              <el-form label-width="130px">

                                <el-form-item
                                  label="预计到达时间："
                                  v-show="details.logState == 1"
                                >
                                  <el-date-picker
                                    v-model="details.logArriveTime"
                                    type="date"
                                    placeholder="date"
                                    class="input-style"
                                    readonly
                                  >
                                  </el-date-picker>
                                </el-form-item>
                                <el-form-item
                                  label="到达仓库时间："
                                  v-show="details.logState == 2"
                                >
                                  <el-date-picker
                                    v-model="details.logArriveTime"
                                    type="date"
                                    placeholder="date"
                                    class="input-style"
                                    readonly
                                  >
                                  </el-date-picker>
                                </el-form-item>
                                <el-form-item label="到达仓库：">
                                  <el-input
                                    v-model="details.logWarehouse"
                                    class="input-style"
                                    style="width: 60%;height: auto;line-height: 40px;"
                                    readonly
                                  >
                                  </el-input>
                                </el-form-item>
                                <el-form-item label="总运费：">
                                  <el-input
                                    v-model="details.logMoney"
                                    style="width: 60%;height: auto;line-height: 40px;"
                                    readonly
                                  >
                                    <i
                                      slot="suffix"
                                      style="color: #000;margin-right:5%;font-style:normal;"
                                      >{{ details.logCurrency }}</i
                                    >
                                  </el-input>
                                </el-form-item>
                              </el-form>
                              <div>
                                <div class="every-details">
                                  <div
                                    style="margin-bottom: 20px;font-size: 18px;"
                                  >
                                    <span>每块表详细信息：</span>
                                  </div>
                                  <table>
                                    <tr>
                                      <th class="table-th">图片</th>
                                      <th class="table-th">型号</th>
                                      <th class="table-th">机芯号</th>
                                      <th class="table-th">采购价</th>
                                      <th class="table-th">运费</th>
                                    </tr>

                                    <tr
                                      v-for="(items, index) in details.logWatch"
                                      :key="index"
                                    >
                                      <td>
                                        <img
                                          v-image-preview
                                          :src="
                                            items.buyWatchPics == null ||
                                            items.buyWatchPics == ''
                                              ? ''
                                              : img +
                                                '/img/watch/' +
                                                (
                                                  items.buyWatchPics || ''
                                                ).split('|')[0]
                                          "
                                          style="width: 100px;height: 100px;object-fit: cover;border-radius: 30px;"
                                        />
                                      </td>
                                      <td>
                                        <p>{{ items.buyWatchBrand }}</p>
                                        <p>{{ items.buyWatchModel }}</p>
                                      </td>
                                      <!-- <td>{{items.buyWatchBrand +'-'+ items.buyWatchModel}}</td> -->
                                      <td>{{ items.buyWatchSn }}</td>
                                      <td>
                                        {{ items.buyWatchCurrency }}
                                        {{
                                          formatNumberRgx(items.buyWatchPrice)
                                        }}
                                      </td>
                                      <td>
                                        <div
                                          style="width: 90%;margin: 0 auto;padding-left: 5px;border-bottom: 1px solid #000;display: flex;"
                                        >
                                          <input
                                            type="text"
                                            v-model="items.logMoneyEx"
                                            class="freight-input"
                                            readonly
                                          />
                                          <i
                                            slot="suffix"
                                            style="width: 50%;height: 40px;margin-right:5%;line-height: 40px;font-style:normal;color: #000;"
                                            >{{ details.logCurrency }}</i
                                          >
                                        </div>
                                      </td>
                                    </tr>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div slot="footer">
                            <el-button @click="dialogShippedVisible = false"
                              >取 消</el-button
                            >
                            <el-button
                              type="primary"
                              @click="dialogShippedVisible = false"
                              >确 定</el-button
                            >
                          </div>
                        </el-dialog>
                      </div>
                      <div>

                        <div
                          @click="comePurch(content, content.stockInTime)"
                          class="jump-div"
                        >
                          <div style="margin-top: 2px;">
                            <img
                              class="jump-img"
                              :src="
                                content.logState == 2 || content.logState > 2
                                  ? watchimgs1
                                  : watchimgs2
                              "
                            />
                          </div>
                          <span type="text" class="button-mypurchase four"
                            >入库</span
                          >
                        </div>
                        <el-dialog
                          title="入库时间"
                          :visible.sync="dialogPurchVisible"
                        >
                          <div style="text-align: left;">
                            <el-form label-width="120px">
                              <el-form-item label="入库时间：">

                                <el-input
                                  v-model="stockInTime"
                                  style="width: 50%;"
                                  readonly="readonly"
                                ></el-input>
                              </el-form-item>
                            </el-form>
                          </div>
                          <div slot="footer">
                            <el-button @click="dialogPurchVisible = false"
                              >取 消</el-button
                            >
                            <el-button
                              type="primary"
                              @click="dialogPurchVisible = false"
                              >确 定</el-button
                            >
                          </div>
                        </el-dialog>
                      </div>
                      <div>
                        <div
                          @click="
                            saleCome(
                              content.sellMoney,
                              content.sellCurrency,
                              content.sellState
                            )
                          "
                          class="jump-div"
                        >
                          <div style="margin-top: 2px;">

                            <img
                              class="jump-img"
                              :src="
                                content.sellState > 0 ? watchimgs1 : watchimgs2
                              "
                            />
                          </div>
                          <span type="text" class="button-mypurchase four"
                            >销售</span
                          >
                        </div>
                        <el-dialog
                          title="销售金额"
                          :visible.sync="dialogSaleVisible"
                        >
                          <el-form
                            label-width="120px"
                            style="text-align: left;"
                          >
                            <el-form-item label="销售金额：">
                              <el-input
                                v-model="sellMoney"
                                style="width: 50%;"
                                readonly="readonly"
                              >
                                <i
                                  slot="suffix"
                                  style="color: #000;margin-right:5%;font-style:normal;"
                                  >{{ sellCurrency }}</i
                                >
                              </el-input>
                            </el-form-item>
                          </el-form>
                          <div slot="footer">
                            <el-button @click="dialogSaleVisible = false"
                              >取 消</el-button
                            >
                            <el-button
                              type="primary"
                              @click="dialogSaleVisible = false"
                              >确 定</el-button
                            >
                          </div>
                        </el-dialog>
                      </div>
                      <div>

                        <div
                          @click="
                            finalStatement(
                              content.adminSettleOrderId,
                              content.adminSettleState
                            )
                          "
                          class="jump-div"
                        >
                          <div style="margin-top: 2px;">
                            <img
                              class="jump-img"
                              :src="
                                content.adminSettleState == 2
                                  ? watchimgs1
                                  : watchimgs2
                              "
                            />
                          </div>
                          <span type="text" class="button-mypurchase four"
                            >分红</span
                          >
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <div style="width: 100%;height: 63px;">
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
      </div>
    </div>
    <div>
      <Details
        v-if="selectSearch.msg == 1"
        @changeMsg="changeMsg"
        @goback="goback"
        :detailsSelect="detailsSelect"
      >
      </Details>
      <Bonus-details
        v-if="selectSearch.msg == 2"
        :purchaseBonusDetails="bonusDetails"
        @purchaseSelect="purchaseSelect"
      >
      </Bonus-details>
    </div>
  </div>
</template>
<script>

export default {
  inject: ["reload"],
  data() {
    return {
      // numSelect: 0,
      hintMsg: "数据加载中...",
      page: 1,
      pageNum: 10,
      total: 0,
      keyword: "",
      dialogPayment: false,
      dialogDrawback: false,
      purchaseOrder: [], //采购单列表
      watchimg1: require("../../assets/imgs/sureImg.png"),
      watchimg2: require("../../assets/imgs/error.png"),
      watchimg3: require("../../assets/imgs/noContainer.png"),
      watchimgs1: require("../../assets/imgs/myYes.png"),
      watchimgs2: require("../../assets/imgs/myNot.png"),
      watches: [],
      fee: {},
      pay: {},
      tax: {},
      select: 0,
      selectSum: 0,
      img: this.$store.state.baseUrl,
      watchstate: 0,
      detailsSelect: {
        id: 1,
        num: 0,
        buyCommState: 0,
      },
      dialogShippedVisible: false,
      details: {},
      shipping: {
        id: 1,
        msg: 0,
        filtrate: "0",
      },
      watchType: 0,
      totalNum: 0,
      forAccountNum: {
        id: 1,
        num: 0,
      },
      stockInTime: "", // 入库时间
      dialogPurchVisible: false,
      sellMoney: 0,
      sellCurrency: "",
      dialogSaleVisible: false,
      deleteOrderId: "",
      dialogDeleteOrderVisible: false,

      bonusDetails: {},
    };
  },
  created() {
    this.getBuyOrderAllList();
  },
  watch: {
    watchstate: "handleList",
  },
  props: ["selectSearch"],
  methods: {
    // 模糊搜索
    stockInSearch() {
      console.log(this.keyword);
      if (this.keyword !== "") {
        console.log("类型" + this.filtrate);
        this.purchaseOrder = [];
        this.total = 0;
        this.totalNum = 0;
        this.hintMsg = "数据加载中...";
        this.$axios
          .post(this.$store.state.baseUrl + "/BuyOrderListEx", {
            page: this.page,
            pageNum: this.pageNum,

            type: 1,
            keyword: this.keyword,
            userId: sessionStorage.getItem("purchaseUserId"),
          })
          .then((res) => {
            console.log("模糊搜索获取订单");
            console.log(res);
            this.purchaseOrder = res.data.orders;
            this.total = res.data.total;
            this.totalNum = res.data.watchTotal;

            if (this.purchaseOrder.length == 0) {
              this.hintMsg = "啊哦~暂无数据";
            }
          });
      } else if (this.keyword == "") {
        this.page = 1;

        this.purchaseOrder = [];
        this.total = 0;
        this.totalNum = 0;
        this.getBuyOrderAllList();
      }
    },
    // 全部订单
    getBuyOrderAllList() {
      console.log(this.filtrate);
      this.hintMsg = "数据加载中...";
      this.$axios
        .post(this.$store.state.baseUrl + "/BuyOrderListEx", {
          page: this.page,
          pageNum: this.pageNum,
          type: 1,
          userId: sessionStorage.getItem("purchaseUserId"),
        })
        .then((res) => {
          console.log("获取订单");
          console.log(res);
          this.purchaseOrder = res.data.orders;
          this.total = res.data.total;
          this.totalNum = res.data.watchTotal;
          console.log(this.purchaseOrder);
          if (this.purchaseOrder.length == 0) {
            this.hintMsg = "啊哦~暂无数据";
          }
          // this.page = 1;
        });
    },
    getBuyOrderAllList1() {
      this.selectSearch.msg = 0;

      console.log("待处理" + this.filtrate);
      this.page = 1;
      this.keyword = "";
      this.stockInSearch();
    },
    // 删除采购单
    deleteOrder(id) {
      this.deleteOrderId = id;
      console.log(this.deleteOrderId);
      this.dialogDeleteOrderVisible = true;
    },
    // 确定删除
    deleteOrderSure() {
      this.$axios
        .post(this.$store.state.baseUrl + "/BuyOrderDel", {
          buyId: this.deleteOrderId,
        })
        .then((res) => {
          console.log("删除采购单");
          console.log(res);
          this.dialogDeleteOrderVisible = false;
          this.$message.success({
            message: "删除该采购单成功",
            showClose: true,
            duration: 2000,
          });
          this.stockInSearch();
        })
        .catch((err) => {
          console.log(err);
          this.$message.error({
            message: err.data.message,
            showClose: true,

            duration: 2000,
          });
          this.dialogDeleteOrderVisible = false;
        });
    },
    // 数据改变
    changeMsg(val) {
      // this.getBuyOrderAllList();
    },
    // 返回到此页
    goback(val) {
      // this.getBuyOrderAllList();
      console.log(this.keyword);
      this.stockInSearch();
      this.selectSearch.msg = 0;
      this.$emit("pendingNum", 0);
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
    // 商品信息状态判断
    watchInfoSelect(watch) {
      // console.log('商品信息状态判断');
      // console.log(watch);
      let state = watch.some((item) => item.buyWatchState == 0);
      // console.log(state);
      if (state) {
        return 0;
      } else {
        return 1;
      }
    },
    drawback1(id) {
      sessionStorage.setItem("buyId", id);
      console.log(sessionStorage.getItem("buyId"));
      console.log("tongfeng");
      this.detailsSelect.num = 0;
      this.selectSearch.msg = 1;
      this.$emit("pendingNum", 1);
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
    drawback2(id) {
      sessionStorage.setItem("buyId", id);
      console.log(sessionStorage.getItem("buyId"));
      console.log("tongfeng");
      this.detailsSelect.num = 1;
      this.selectSearch.msg = 1;
      this.$emit("pendingNum", 1);
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
    drawback3(id) {
      sessionStorage.setItem("buyId", id);
      console.log(sessionStorage.getItem("buyId"));
      console.log("tongfeng");
      this.detailsSelect.num = 2;
      this.selectSearch.msg = 1;
      this.$emit("pendingNum", 1);
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
    drawback5(id, buyCommState) {
      sessionStorage.setItem("buyId", id);
      console.log(sessionStorage.getItem("buyId"));
      this.detailsSelect.buyCommState = buyCommState;
      this.detailsSelect.num = 4;
      this.selectSearch.msg = 1;
      this.$emit("pendingNum", 1);
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
    drawback4(id) {
      sessionStorage.setItem("buyId", id);
      console.log(sessionStorage.getItem("buyId"));
      console.log("tongfeng");
      this.detailsSelect.num = 3;
      this.selectSearch.msg = 1;
      this.$emit("pendingNum", 1);
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
    // 是否已发货
    shipped(logId, shippedState, index) {
      console.log(logId + "--" + shippedState);
      if (shippedState !== 0) {
        this.$axios
          .post(this.$store.state.baseUrl + "/LOGInfo", {
            logId: logId,
          })
          .then((res) => {
            console.log("根据物流单获取物流信息");
            console.log(res);
            this.details = res.data;
            this.dialogShippedVisible = true;
          });
      } else if (shippedState == 0) {
        this.$message.error({
          message: "商品未发货，暂无物流信息",
          showClose: true,
          duration: 2000,
        });
      }
    },
    // 是否已入库
    comePurch(content, stockInTime) {
      console.log(content);
      this.stockInTime = stockInTime;
      if (this.stockInTime == "" || this.stockInTime == null) {
        this.$message.error({
          message: "商品未入库",
          showClose: true,
          duration: 2000,
        });
      } else if (this.stockInTime !== "") {
        this.dialogPurchVisible = true;
      }
    },
    // 是否已销售
    saleCome(sellMoney, sellCurrency, state) {
      this.sellMoney = sellMoney;
      this.sellCurrency = sellCurrency;
      console.log(this.sellMoney);
      console.log(this.sellCurrency);
      if (state == 0) {
        this.$message.error({
          message: "该商品销售未完成，暂时无法查看销售信息",
          showClose: true,
          duration: 2000,
        });
      } else {
        this.dialogSaleVisible = true;
      }
    },
    // 是否已分红
    //                 分红单id             分红状态
    finalStatement(adminSettleOrderId, adminSettleState) {
      console.log(adminSettleOrderId, adminSettleState);
      if (adminSettleState !== 2) {
        this.$message.error({
          message: "该商品分红未完成，暂时无法查看分红单信息",
          showClose: true,
          duration: 2000,
        });
      } else {
        this.$axios
          .post(this.$store.state.baseUrl + "/purchaseBonusForm?java", {
            id: adminSettleOrderId,
          })
          .then((res) => {
            console.log("分红单信息");
            console.log(res);
            this.bonusDetails = res.data;
            this.selectSearch.msg = 2;
            // 页面回到顶部
            (function smoothscroll() {
              var currentScroll =
                document.documentElement.scrollTop || document.body.scrollTop;
              if (currentScroll > 0) {
                window.requestAnimationFrame(smoothscroll);
                window.scrollTo(0, currentScroll - currentScroll / 5);
              }
            })();
          });
      }
    },
    purchaseSelect(val) {
      console.log(val);
      this.selectSearch.msg = 0;
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
      if (this.keyword !== "") {
        this.stockInSearch();
      } else if (this.keyword == "") {
        this.getBuyOrderAllList();
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
};
</script>
<style lang="scss" scoped>
.mypurchase-container {
  width: 100%;
  margin: 0 auto;

  .pending-main-con {
    width: 95%;
    margin: 0 auto;
  }

  .freight-input {
    width: 90%;
    height: 40px;
    border: 0;
    outline: none;
    background-color: transparent;
    text-align: center;
  }

  .mypurchase-table {
    width: 100%;
    margin-bottom: 20px;
    background-color: #fff;
    border-radius: 20px;


    .purchase-row {
      padding-top: 30px;
      padding-left: 30px;
      padding-right: 30px;
      display: flex;
      justify-content: space-between;

      .purchase-number {
        font-size: 18px;
        font-weight: bold;
      }

      .purchase-date {
        margin-left: 30px;
        color: #c8c8c8;
      }
    }

    .div-table {
      padding: 30px;
      padding-bottom: 20px;
      padding-top: 0;

      .table-tr {
        height: 40px;
        line-height: 40px;
        border-bottom: 0;

        .first-img {
          padding-left: 0;
        }

        .table-th {
          font-size: 17px;
          font-weight: normal;
        }
      }

      .table-tr-container {
        background-color: #fff;

        td {
          padding: 20px 0;
          background-color: #f3fbf9;
          font-size: 15px;
        }

        .first-img {
          width: 100px;
          height: 100px;
          object-fit: cover;
          border-radius: 30px;
        }

        .jump-div {
          margin-top: 10px;
          cursor: pointer;
          display: flex;

          .jump-img {
            width: 15px;
            height: 15px;
          }

          .details-container {
            .every-details {
              .table-th {
                font-size: 16px;
              }
            }
          }
        }
      }
    }
  }
}

.button-mypurchase {
  border: 0;
  outline: none;
  color: #000;
}


.state-style {
  padding: 30px;

  .state-container {
    width: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;

    .jump-div {
      display: flex;
      cursor: pointer;

      .jump-img {
        width: 20px;
        height: 20px;
      }
    }
  }
}

.input-style {
  width: 60% !important;
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

.color1 {
  color: #23c75e;
}

.color2 {
  color: #f22b1a;
}
</style>
<style lang="scss">
#pending-container {
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

  .el-radio.is-bordered {
    padding: 12px 30px 0 20px;
    border-radius: 30px;
    border: 1px solid #dcdfe6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    height: 40px;
  }

  .vue-directive-image-previewer {
    z-index: 10000;
  }
}
</style>
