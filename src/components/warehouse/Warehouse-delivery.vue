<template>
  <div class="reimbursement-admin-container" id="reimbursement-admin">
    <!-- <h1>仓库间发货</h1> -->
    <div v-if="wareDeliverySel.select == 0">
      <div style="display:flex;justify-content: flex-end;">
        <img
          src="../../assets/imgs/history.png"
          @click="pageChange"
          style="cursor: pointer;"
        />
        <!-- <el-button type="primary">历史物流</el-button> -->
      </div>
      <el-tabs
        type="border-card"
        v-model="activeName"
        @tab-click="handleTabsClick"
      >
        <el-tab-pane label="待选" name="one">
          <div
            style="text-align: center;"
            ref="reimburse"
            v-if="unDeliveryStockList.length == 0"
          >
            <p>{{ unDeliveryStockMsg }}</p>
          </div>
          <div v-else>
            <table>
              <tr>
                <th>图片</th>
                <th>品牌</th>
                <th>型号</th>
                <th>机芯号</th>
                <th>货号</th>
                <th>操作</th>
              </tr>
              <tr v-for="(items, index) in unDeliveryStockList" :key="index">
                <td>
                  <img
                    v-image-preview
                    :src="
                      items.watchPic == null || items.watchPic == ''
                        ? ''
                        : img +
                          '/img/watch/' +
                          (items.watchPic || '').split('|')[0]
                    "
                    style="width: 100px;height: 100px;object-fit: cover;border-radius: 30px;"
                  />
                </td>
                <td>{{ items.watchBrand }}</td>
                <td>{{ items.watchModel }}</td>
                <td>{{ items.buyWatchSn }}</td>
                <td>{{ items.stockNo }}</td>
                <td>
                  <el-tooltip
                    class="item"
                    effect="light"
                    content="选择该手表进行发货"
                    placement="top-end"
                  >
                    <img
                      src="../../assets/imgs/add.png"
                      style="cursor: pointer;"
                      @click="addWatch(items, index)"
                    />
                  </el-tooltip>
                  <el-tooltip
                    class="item"
                    style="margin-left: 30px;"
                    effect="light"
                    content="查看手表详情"
                    placement="top-end"
                  >
                    <img
                      src="../../assets/imgs/details.png"
                      style="cursor: pointer;"
                      @click="watchDetails(items.id)"
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
        </el-tab-pane>
        <el-tab-pane label="已选" name="two">
          <div
            slot="label"
            style="display: flex;justify-content: center;font-size: 15px;"
          >
            已选
            <p style="margin-top: -10px;margin-left: 3px;color: red;">
              {{ deliveryStockList.length }}
            </p>
          </div>
          <div v-if="activeName == 'two'">
            <div
              v-if="deliveryStockList.length == 0"
              ref="toConfirmed2"
              style="text-align: center;"
            >
              <p>{{ deliveryStockMsg }}</p>
            </div>
            <div v-else>
              <table>
                <tr>
                  <th>图片</th>
                  <th>品牌</th>
                  <th>型号</th>
                  <th>机芯号</th>
                  <th>货号</th>
                  <th>操作</th>
                </tr>
                <tr v-for="(items, index) in deliveryStockList" :key="index">
                  <td>
                    <img
                      v-image-preview
                      :src="
                        items.watchPic == null || items.watchPic == ''
                          ? ''
                          : img +
                            '/img/watch/' +
                            (items.watchPic || '').split('|')[0]
                      "
                      style="width: 100px;height: 100px;object-fit: cover;border-radius: 30px;"
                    />
                  </td>
                  <td>{{ items.watchBrand }}</td>
                  <td>{{ items.watchModel }}</td>
                  <td>{{ items.buyWatchSn }}</td>
                  <td>{{ items.stockNo }}</td>
                  <td>
                    <el-tooltip
                      class="item"
                      effect="light"
                      content="取消选择该手表"
                      placement="top-end"
                    >
                      <img
                        src="../../assets/imgs/delete.png"
                        style="cursor: pointer;"
                        @click="deleteWatch(items, index)"
                      />
                    </el-tooltip>
                    <el-tooltip
                      class="item"
                      style="margin-left: 30px;"
                      effect="light"
                      content="查看详情"
                      placement="top-end"
                    >
                      <img
                        src="../../assets/imgs/details.png"
                        style="cursor: pointer;"
                        @click="watchDetails(items.id)"
                      />
                    </el-tooltip>
                  </td>
                </tr>
              </table>
            </div>
            <el-button
              type="primary"
              style="width: 250px;position: fixed;bottom: 30px;right: 150px;border-radius: 30px;"
              @click="shipments"
              >发 货
            </el-button>
            <el-dialog
              title="商品发货"
              :visible.sync="dialogShipmentsVisible"
              center
              :close-on-press-escape="false"
              :close-on-click-modal="false"
              :modal-append-to-body="false"
              :append-to-body="false"
            >
              <el-form :model="formShipments">
                <el-form-item label="发货时间：" label-width="150px">
                  <el-date-picker
                    v-model="logSendTime"
                    type="date"
                    style="width: 60%;"
                    :clearable="false"
                  >
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="预计到达时间：" label-width="150px">
                  <el-date-picker
                    v-model="logArriveTime"
                    type="date"
                    style="width: 60%;"
                    :clearable="false"
                  >
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="到达仓库：" label-width="150px">
                  <el-select
                    v-model="warehouseId"
                    placeholder="请选择"
                    style="width: 60%;"
                  >
                    <el-option
                      v-for="ware in warehouseList"
                      :key="ware.id"
                      :label="ware.name"
                      :value="ware.id"
                    >
                      {{ ware.name }}
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-form>
              <div slot="footer">
                <el-button @click="dialogShipmentsVisible = false"
                  >取 消</el-button
                >
                <el-button type="primary" @click="shipmentsSure"
                  >确 定</el-button
                >
              </div>
            </el-dialog>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div v-if="wareDeliverySel.select == 1">
      <Product-list
        ref="productMy"
        :deliveryList="deliveryList"
        @goBackDelivery="goBackDelivery"
      ></Product-list>
    </div>
    <div v-if="wareDeliverySel.select == 2">
      <div class="back-img" @click="backHome">
        <div>
          <img src="../../assets/imgs/goback.png" />
        </div>
        <span class="font">返回</span>
      </div>
      <div style="text-align: center;" v-if="deliverHistoryList.length == 0">
        <p>{{ deliverHistoryMsg }}</p>
      </div>
      <div v-else>
        <table>
          <tr>
            <th>物流单号</th>
            <th>到达仓库</th>
            <th>发货时间</th>
            <th>物流状态</th>
            <th>操作</th>
          </tr>
          <tr v-for="(deliver, index) in deliverHistoryList" :key="index">
            <td>
              {{ deliver.logId }}
            </td>
            <td>{{ deliver.warehouseName }}</td>
            <td>{{ deliver.logSendTime }}</td>
            <td>
              <div style="display: flex;justify-content:center;">
                <span>{{
                  deliver.logState == 1 ? "运输中" : "已到达仓库"
                }}</span>
                <div style="margin-left: 5px;">
                  <img
                    :src="deliver.logState == 1 ? img1 : img2"
                    style="width: 20px;height: 20px;"
                  />
                </div>
              </div>
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
                  style="cursor: pointer;"
                  @click="deliverHistoryDetails(deliver.id)"
                />
              </el-tooltip>
              <el-dialog
                title="物流详情"
                :visible.sync="dialogDeliverHistoryVisible"
              >
                <div>
                  <div class="top-one">
                    <p class="line"></p>
                    <span>物流单详情</span>
                  </div>
                  <div>
                    <div class="wareEvery">
                      <div class="wareImg">
                        <img src="../../assets/imgs/type.png" />
                      </div>
                      <p class="wareId">物流单号</p>
                      <p class="wareName">{{ deliverHistoryDetail.logId }}</p>
                    </div>
                    <div class="wareEvery">
                      <div class="wareImg">
                        <img src="../../assets/imgs/ware.png" />
                      </div>
                      <p class="wareId">发货仓库</p>
                      <p class="wareName">
                        {{ deliverHistoryDetail.deliverWarehouseName }}
                      </p>
                    </div>
                    <div class="wareEvery">
                      <div class="wareImg">
                        <img src="../../assets/imgs/ware.png" />
                      </div>
                      <p class="wareId">接收仓库</p>
                      <p class="wareName">
                        {{ deliverHistoryDetail.warehouseName }}
                      </p>
                    </div>
                    <div class="wareEvery">
                      <div class="wareImg">
                        <img src="../../assets/imgs/dates.png" />
                      </div>
                      <p class="wareId">发货时间</p>
                      <p class="wareName">
                        {{ deliverHistoryDetail.logSendTime }}
                      </p>
                    </div>
                    <div class="wareEvery">
                      <div class="wareImg">
                        <img src="../../assets/imgs/dates.png" />
                      </div>
                      <p class="wareId">接收时间</p>
                      <p class="wareName">
                        {{ deliverHistoryDetail.logArriveTime }}
                      </p>
                    </div>
                  </div>
                  <div class="top-one" style="margin: 20px 0;">
                    <p class="line"></p>
                    <span>手表信息</span>
                  </div>
                  <div style="margin: 0 10px;">
                    <table>
                      <tr>
                        <th>图片</th>
                        <th>品牌</th>
                        <th>型号</th>
                        <th>机芯号</th>
                        <th>物流状态</th>
                      </tr>
                      <tr
                        v-for="(watch, index) in deliverHistoryDetail.watchList"
                        :key="index"
                      >
                        <td>
                          <img
                            v-image-preview
                            :src="
                              watch.watchPic == null || watch.watchPic == ''
                                ? ''
                                : img +
                                  '/img/watch/' +
                                  (watch.watchPic || '').split('|')[0]
                            "
                            style="width: 100px;height: 100px;object-fit: cover;border-radius: 30px;"
                          />
                        </td>
                        <td>{{ watch.watchBrand }}</td>
                        <td>{{ watch.watchModel }}</td>
                        <td>{{ watch.buyWatchSn }}</td>
                        <td>
                          <img
                            :src="watch.logState == 1 ? img1 : img2"
                            style="width: 20px;height: 20px;"
                          />
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
                <div slot="footer">
                  <el-button @click="dialogDeliverHistoryVisible = false"
                    >取 消</el-button
                  >
                  <el-button
                    type="primary"
                    @click="dialogDeliverHistoryVisible = false"
                    >确 定</el-button
                  >
                </div>
              </el-dialog>
            </td>
          </tr>
        </table>

        <div style="width: 100%;height: 50px;">
          <div style="margin:15px 0;position:absolute;right:6%;">
            <el-pagination
              @current-change="handleCurrentChange2"
              :current-page="page2"
              layout="total, prev, pager, next, jumper"
              :total="total2"
            >
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductList from "./Product-list.vue";
export default {
  components: {
    ProductList,
  },
  data() {
    return {
      img: this.$store.state.baseUrl,
      keyword: "",
      page: 1,
      pageNum: 10,
      total: 0,
      unDeliveryStockMsg: "数据加载中...",
      unDeliveryStockList: [],
      deliveryStockMsg: "啊哦~暂无数据",
      deliveryStockList: [],
      activeName: "one",
      warehouseList: [],
      watchDetailsId: "",
      deliveryList: {
        delivery: 0,
        isMe: 0,
      },
      formShipments: {},
      dialogShipmentsVisible: false,
      stockIdList: [],
      logSendTime: new Date(),
      logArriveTime: new Date(),
      warehouseId: "",
      deliverHistoryList: [],
      deliverHistoryMsg: "数据加载中...",
      page2: 1,
      pageNum2: 10,
      total2: 0,
      img1: require("../../assets/imgs/carImg.png"),
      img2: require("../../assets/imgs/sureImg.png"),
      deliverHistoryDetail: {},
      dialogDeliverHistoryVisible: false,
      sel: {
        sel: 0,
        name: "",
      },
    };
  },
  props: ["wareDeliverySel"],
  created() {
    this.stockInSearch();
  },
  methods: {
    // 历史详情
    deliverHistoryDetails(id) {
      this.$axios
        .post(this.$store.state.baseUrl + "/deliverHistoryInfo", {
          id: id,
        })
        .then((res) => {
          console.log("发货历史详情");
          console.log(res);
          this.deliverHistoryDetail = res.data;
          this.dialogDeliverHistoryVisible = true;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 发货历史
    pageChange() {
      this.wareDeliverySel.select = 2;
      this.sel.sel = 2;
      this.$emit("wareDeliveryKeyword", this.sel);
      this.$axios
        .post(this.$store.state.baseUrl + "/deliverHistoryList", {
          page: this.page2,
          pageNum: 10,
        })
        .then((res) => {
          console.log("发货历史列表");
          console.log(res);
          this.deliverHistoryList = res.data.list;
          this.total2 = res.data.total;
          if (this.deliverHistoryList.length == 0) {
            this.deliverHistoryMsg = "啊哦~暂无数据";
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    backHome() {
      this.wareDeliverySel.select = 0;
      this.sel.sel = 0;
      this.$emit("wareDeliveryKeyword", this.sel);
    },
    // 发货
    shipments() {
      if (this.deliveryStockList.length == 0) {
        this.$message.error({
          message: "请选择发货商品",
          showClose: true,
          duration: 2000,
        });
      } else {
        this.dialogShipmentsVisible = true;
        for (const ite of this.deliveryStockList) {
          this.stockIdList.push(ite.id);
        }
        console.log(this.stockIdList);
      }
    },
    // 确定发货
    shipmentsSure() {
      console.log(this.warehouseId);
      if (this.warehouseId == "") {
        this.$message.error({
          message: "请选择到达仓库",
          showClose: true,
          duration: 2000,
        });
      } else {
        this.$axios
          .post(this.$store.state.baseUrl + "/deliverGoods", {
            logSendTime: this.logSendTime,
            logArriveTime: this.logArriveTime,
            stockIdList: this.stockIdList,
            warehouseId: this.warehouseId,
          })
          .then((res) => {
            console.log("本次商品发货成功");
            console.log(res);
            this.$message.success({
              message: "本次物流信息提交成功",
              showClose: true,
              duration: 2000,
            });
            this.dialogShipmentsVisible = false;
            this.wareDeliverySel.select = 0;
            this.stockInSearch();
            this.deliveryStockList = [];
            // 页面回到顶部
            (function smoothscroll() {
              var currentScroll =
                document.documentElement.scrollTop || document.body.scrollTop;
              if (currentScroll > 0) {
                window.requestAnimationFrame(smoothscroll);
                window.scrollTo(0, currentScroll - currentScroll / 5);
              }
            })();
          })
          .catch((err) => {
            console.log(err);
            this.$message.error({
              message: err.data.message,
              showClose: true,
              duration: 2000,
            });
          });
      }
    },
    // 添加发货手表
    addWatch(item, index) {
      this.deliveryStockList.push(item);
      this.$message.success({
        message: "选择成功",
        showClose: true,
        duration: 1000,
      });
      this.unDeliveryStockList.splice(index, 1);
      if (this.unDeliveryStockList.length == 0) {
        this.unDeliveryStockMsg = "啊哦~暂无数据";
      }
      console.log("111111");
      console.log(this.deliveryStockList);
      console.log(this.unDeliveryStockList);
    },
    // 删除发货手表
    deleteWatch(item, index) {
      this.unDeliveryStockList.push(item);
      this.deliveryStockList.splice(index, 1);
      if (this.deliveryStockList.length == 0) {
        this.deliveryStockMsg = "啊哦~暂无数据";
      }
      console.log("33333333333");
      console.log(this.deliveryStockList);
      console.log(this.unDeliveryStockList);
    },
    // 查看手表详情
    watchDetails(id) {
      this.wareDeliverySel.select = 1;
      this.deliveryList.delivery = 1;
      this.deliveryList.isMe = 1;
      this.$nextTick(() => {
        this.$refs.productMy.inventoryInfo(id);
      });
    },
    goBackDelivery(val) {
      this.wareDeliverySel.select = val;
    },
    // 模糊搜索
    stockInSearch() {
      this.unDeliveryStockList = [];
      this.unDeliveryStockMsg = "数据加载中...";
      this.$axios
        .post(this.$store.state.baseUrl + "/unDeliveryStockList", {
          page: this.page,
          pageNum: this.pageNum,
          keyword: this.keyword,
        })
        .then((res) => {
          console.log("仓库间可发货");
          console.log(res);
          this.warehouseList = res.data.warehouseList;
          this.unDeliveryStockList = res.data.watchList;
          this.total = res.data.total;
          if (this.unDeliveryStockList.length == 0) {
            this.unDeliveryStockMsg = "啊哦~暂无数据";
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleTabsClick() {
      this.page = 1;
      this.keyword = "";
      this.sel.name = this.activeName;
      this.$emit("wareDeliveryKeyword", this.sel);
    },
    handleCurrentChange2(val) {
      console.log(`当前页: ${val}`);
      this.page2 = val;
      console.log(this.page);
      this.pageChange();
      (function smoothscroll() {
        var currentScroll =
          document.documentElement.scrollTop || document.body.scrollTop;
        if (currentScroll > 0) {
          window.requestAnimationFrame(smoothscroll);
          window.scrollTo(0, currentScroll - currentScroll / 5);
        }
      })();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page = val;
      console.log(this.page);
      this.stockInSearch();
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
.reimbursement-admin-container {
  width: 95%;
  margin: 0 auto;

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

  .top-one {
    display: flex;
    text-align: left;

    .line {
      width: 4px;
      height: 22px;
      margin: 0 10px;
      margin-top: -2px;
      background-color: orange;
    }
  }

  .wareEvery {
    margin-top: 20px;
    margin-left: 10px;
    display: flex;

    .wareImg {
      img {
        width: 20px;
        height: 20px;
      }
    }

    .wareId {
      margin: 1px 30px 0 20px;
    }

    .wareName {
      margin: 1px 0 0 0;
    }
  }

  table {
    width: 100%;
    table-layout: fixed;
    border-collapse: separate;
    border-spacing: 0;
    background-color: #fff;
    border-radius: 30px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;

    tr {
      th,
      td {
        width: 20%;
        text-align: center;
        border: 0;
      }

      td {
        padding: 20px 0;
      }
    }
  }
}
</style>
<style lang="scss">
#reimbursement-admin {
  .el-tabs__header {
    z-index: 0;
  }

  .el-checkbox__label {
    font-size: 15px;
  }

  .el-tabs--border-card {
    background: transparent;
    border: transparent;
    -webkit-box-shadow: none;
    box-shadow: none;
  }

  .el-tabs--border-card > .el-tabs__header {
    background-color: transparent;
    border-bottom: none;
    margin: 0;
  }

  .el-tabs--border-card > .el-tabs__header .el-tabs__item {
    background-color: #ddebec;
  }

  .el-tabs__item {
    width: 160px;
    height: 48px !important;
    line-height: 48px !important;
    font-size: 16px !important;
    text-align: center;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    color: #000;
  }

  .el-tabs__content {
    background-color: #fff;
  }

  .el-tabs--border-card
    > .el-tabs__header
    .el-tabs__item:not(.is-disabled):hover {
    color: #000;
  }

  .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
    color: #000;
    background-color: #fff;
    border-right-color: transparent;
    border-left-color: transparent;
  }

  .el-tabs--border-card > .el-tabs__content {
    padding: 20px 30px;
  }
}
</style>
