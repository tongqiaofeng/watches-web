<template>
  <div class="view-container" id="container">
    <!-- <h1>物流</h1> -->
    <div v-show="logisticsViewList.length == 0" ref="hello" style="margin-top: 100px;text-align: center;">
      <p>{{hintMsg}}</p>
    </div>
    <div v-if="logisticsViewList.length !== 0">
      <div class="view" v-for="(item,index) in logisticsViewList" :key="index">
        <div class="purchase-row">
          <span class="purchase-number">物流单号: {{" " + item.log_id}}</span>
          <span class="purchase-date">发货时间: {{item.log_sendTime}}</span>
        </div>
        <table class="view-table">
          <tr>
            <th>抵达仓库名称</th>
            <th>总运费金额</th>
            <th>物流状态</th>
            <th>操作</th>
          </tr>
          <tr>
            <td>{{item.log_warehouse}}</td>
            <td>{{'HKD '+formatNumberRgx(item.log_money)}}</td>
            <td>
              <div style="display: flex;justify-content:center;">
                <span>{{item.log_state == 1 ? "运输中" : "已到达仓库"}}</span>
                <div style="margin-left: 5px;">
                  <img :src="item.log_state == 1 ? img1 : img2" style="width: 20px;height: 20px;" />
                </div>
              </div>
            </td>
            <td>
              <el-tooltip class="item" effect="light" content="查看详细信息" placement="top-end">
                <img src="../../assets/imgs/details.png" style="cursor: pointer;" @click="viewDetails(item)" />
              </el-tooltip>
              <el-dialog title="详细物流信息" :visible.sync="dialogVisible">
                <div style="text-align: left;">
                  <div class="details-container">
                    <el-form label-width="130px">
                      <el-form-item label="预计到达时间：" v-if="details.log_state == 1">
                        <el-date-picker v-model="details.log_arriveTime" type="date" placeholder="date"
                          class="input-style" readonly></el-date-picker>
                      </el-form-item>
                      <el-form-item label="到达仓库时间：" v-if="details.log_state == 2">
                        <el-date-picker v-model="details.log_arriveTime" type="date" placeholder="date"
                          class="input-style" readonly></el-date-picker>
                      </el-form-item>
                      <el-form-item label="到达仓库：">
                        <el-input v-model="details.log_warehouse" class="input-style"
                          style="width: 60%;height: auto;line-height: 40px;" readonly></el-input>
                      </el-form-item>
                      <el-form-item label="总运费：">
                        <el-input v-model="details.log_money" style="width: 60%;height: auto;line-height: 40px;"
                          readonly>
                          <i slot="suffix" style="color: #000;margin-right:5%;font-style:normal;">HKD</i>
                        </el-input>
                      </el-form-item>
                    </el-form>
                    <div>
                      <div style="margin: 15px 0;font-size: 18px;">
                        <span>共 {{nums}} 块手表</span>
                        <!-- <span></span> -->
                      </div>
                      <div class="every-details">
                        <div style="font-size: 16px;">
                          <span>每块表详细信息：</span>
                        </div>
                        <table>
                          <tr>
                            <th class="table-th">图片</th>
                            <th class="table-th">型号</th>
                            <th class="table-th">机芯号</th>
                            <th class="table-th">采购价</th>
                            <th class="table-th">物流状态</th>
                            <th class="table-th">运费</th>
                          </tr>
                          <tr v-for="(items,index) in details.log_watch" :key="index">
                            <td>
                              <img v-image-preview
                                :src="items.buy_watchPics == null || items.buy_watchPics == '' ? '' : img + '/img/watch/'+ (items.buy_watchPics || '').split('|')[0]"
                                style="width: 100px;height: 100px;object-fit: cover;border-radius: 30px;" />
                            </td>
                            <td>
                              <div>
                                <span>{{items.buy_watchBrand}}</span>
                              </div>
                              <div>
                                <span>{{items.buy_watchModel}}</span>
                              </div>
                            </td>
                            <td>{{items.buy_watchSn}}</td>
                            <td>{{items.buy_watchCurrency}} {{formatNumberRgx(items.buy_watchPrice)}}</td>
                            <td>
                              <!-- <span>{{items.log_state == 1 ? "运输中" : "已到达仓库"}}</span> -->
                              <img :src="items.log_state == 2 || items.log_state > 2 ? img2 : img1" />
                            </td>
                            <td>
                              <div style="width: 100%;margin: 0 auto;border-bottom: 1px solid #000;display: flex;">
                                <input type="text" v-model="items.log_moneyEx" class="freight-input" readonly />
                                <i slot="suffix"
                                  style="width: 50%;height: 40px;line-height: 40px;font-style:normal;color: #000;">HKD</i>
                              </div>
                            </td>
                          </tr>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <div slot="footer">
                  <el-button @click="viewClick1">取 消</el-button>
                  <el-button type="primary" @click="viewClick2" v-preventClick>确 定</el-button>
                </div>
              </el-dialog>
            </td>
          </tr>
        </table>
      </div>
      <div style="width: 100%;height: 50px;">
        <div style="margin:15px 0;position:absolute;right:10%;">
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
        img: this.$store.state.baseUrl,
        total: 0,
        page: 1,
        pageNum: 10,
        dialogVisible: false,
        logisticsViewList: [],
        img1: require("../../assets/imgs/carImg.png"),
        img2: require("../../assets/imgs/sureImg.png"),
        details: {},
        nums: 0
      };
    },
    props: ["logisticsView"],
    mounted() {
      this.handleView();
      if (this.logisticsView.logisticsV == 1) {
        this.handleView();
      }
    },
    methods: {
      // 获取已发货的商品物流信息
      handleView() {
        this.hintMsg = '数据加载中...';
        this.$axios
          .post(this.$store.state.baseUrl + "/LOGList", {
            page: this.page,
            pageNum: this.pageNum
          })
          .then(res => {
            console.log("我是已发货商品");
            console.log(res);
            this.total = res.data.total;
            this.logisticsViewList = res.data.lst;
            if (this.logisticsViewList.length == 0) {
              this.hintMsg = "啊哦~暂无数据";
            }
          })
          .catch(err => {
            console.log(err);
          });
      },
      // 分页
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.page = val;
        console.log(this.page);
        this.handleView();
        // 换页回到顶部
        (function smoothscroll() {
          var currentScroll =
            document.documentElement.scrollTop || document.body.scrollTop;
          if (currentScroll > 0) {
            window.requestAnimationFrame(smoothscroll);
            window.scrollTo(0, currentScroll - currentScroll / 5);
          }
        })();
      },
      // 点击查看详情
      viewDetails(details) {
        console.log("要查看物流详情了哦");
        console.log(details);
        this.details = details;
        this.nums = this.details.log_watch.length;
        this.dialogVisible = true;
      },
      viewClick1() {
        this.handleView();
        this.dialogVisible = false;
      },
      viewClick2() {
        this.handleView();
        this.dialogVisible = false;
      }
    }
  };
</script>
<style lang="scss" scoped>
  .view-container {
    width: 95%;
    margin: 0 auto;
    padding-bottom: 20px;

    .view {
      width: 100%;
      margin-bottom: 20px;
      background-color: #fff;
      border-radius: 30px;

      .purchase-row {
        padding-top: 20px;
        padding-left: 30px;

        .purchase-number {
          font-size: 18px;
          font-weight: bold;
        }

        .purchase-date {
          margin-left: 20px;
          color: #c8c8c8;
        }
      }

      .view-table {
        width: 100%;
        padding: 30px;
        padding-bottom: 20px;
        padding-top: 20px;
        margin: 0 auto;

        td {
          padding: 20px 0;
          background-color: #f3fbf9;
          font-size: 15px;
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

    .freight-input {
      width: 90%;
      height: 40px;
      border: 0;
      outline: none;
      background-color: transparent;
      text-align: center;
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
        width: 16%; // 100/6
        text-align: center;
        border: 0;
      }
    }
  }
</style>
<style lang="scss">
  #container {

    .el-form-item::after,
    .el-form-item::before {
      display: none;
      content: "";
    }

    .el-form-item__content::after,
    .el-form-item__content::before {
      display: none;
      content: "";
    }

    .el-dialog__title {
      font-size: 20px;
    }
  }

  .vue-directive-image-previewer {
    z-index: 9999;
  }
</style>