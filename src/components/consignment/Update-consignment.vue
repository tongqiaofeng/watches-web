<template>
  <div>
    <div v-if="updateConsignmentSel.detaSel == 1">
      <div
        class="returnlastpage"
        style="margin-top: 0; "
        @click="backToConList"
      >
        <div>
          <img src="../../assets/imgs/goback.png" />
        </div>
        <span class="font">返回</span>
      </div>
      <div style="text-align: left;">
        <p>寄卖日期：{{ watchDetails.consignmentDate }}</p>
        <p>手表型号：{{ watchDetails.watchModel }}</p>
        <p>机芯号：{{ watchDetails.buyWatchSn }}</p>
        <p>保卡日期：{{ watchDetails.buyWatchCard }}</p>
        <p>额外表带：{{ watchDetails.buyWatchBand + "条" }}</p>
        <p>配件：{{ watchDetails.buyWatchParts }}</p>
        <div style="display: flex;">
          <div style="display: flex;">
            <p style="line-height: 10px;">寄卖金额：</p>
            <el-input
              v-model="watchDetails.buyWatchPrice"
              style="width: 300px;"
              :disabled="
                watchDetails.state == 0 || watchDetails.state == 1
                  ? false
                  : true
              "
              ><i
                slot="suffix"
                style="margin-right:5%;color: #000;font-style:normal;line-height: 40px;"
                >{{ watchDetails.buyWatchCurrency }}</i
              ></el-input
            >
          </div>
          <div style="margin-left: 50px;">
            <img
              src="../../assets/imgs/down-line.png"
              title="价格历史曲线"
              style="cursor: pointer;"
              @click="priceHistory"
            />
          </div>
        </div>
        <div>
          <div class="top-form">
            <span class="top-span">是否全款：</span>
            <el-switch
              v-model="watchDetails.sellPayFull"
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
          </div>
          <div v-if="watchDetails.sellPayFull == false" style="width: 65%;">
            <div
              style="margin: 20px;padding: 20px;border: 1px solid #000;border-radius: 30px;"
            >
              <p>定金：</p>
              <el-form label-width="120px">
                <el-form-item label="付款日期：">
                  <el-date-picker
                    v-model="watchDetails.sellPayTime1"
                    type="date"
                    style="width: 90%;"
                    value-format="yyyy-MM-dd"
                    format="yyyy-MM-dd"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item label="付款金额：">
                  <el-input
                    type="text"
                    v-model="watchDetails.sellPayMoney1"
                    style="width: 90%;"
                  >
                    <i
                      slot="suffix"
                      style="color: #000;margin-right:5%;font-style:normal;"
                      >{{ watchDetails.buyWatchCurrency }}</i
                    >
                  </el-input>
                </el-form-item>
              </el-form>
            </div>
            <div
              style="margin: 20px;padding: 20px;border: 1px solid #000;border-radius: 30px;"
            >
              <p>尾款：</p>
              <el-form label-width="120px">
                <el-form-item label="付款日期：">
                  <el-date-picker
                    v-model="watchDetails.sellPayTime2"
                    type="date"
                    style="width: 90%;"
                    value-format="yyyy-MM-dd"
                    format="yyyy-MM-dd"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item label="付款金额：">
                  <el-input
                    type="text"
                    v-model="watchDetails.sellPayMoney2"
                    style="width: 90%;"
                  >
                    <i
                      slot="suffix"
                      style="color: #000;margin-right:5%;font-style:normal;"
                      >{{ watchDetails.buyWatchCurrency }}</i
                    >
                  </el-input>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <div v-if="watchDetails.sellPayFull == true" style="width: 75%;">
            <div
              style="margin: 20px;padding: 20px;border: 1px solid #000;border-radius: 30px;"
            >
              <el-form label-width="120px">
                <el-form-item label="付款日期：">
                  <el-date-picker
                    v-model="watchDetails.sellPayTime1"
                    type="date"
                    style="width: 50%;"
                    value-format="yyyy-MM-dd"
                    format="yyyy-MM-dd"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item label="付款金额：">
                  <el-input
                    type="text"
                    v-model="watchDetails.sellPayMoney1"
                    style="width: 50%;"
                  >
                    <i
                      slot="suffix"
                      style="color: #000;margin-right:5%;font-style:normal;"
                      >{{ watchDetails.buyWatchCurrency }}</i
                    >
                  </el-input>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <div style="margin: 20px;">
            <p>备注：</p>
            <el-input
              style="width: 50%;"
              type="textarea"
              v-model="watchDetails.sellNote"
              placeholder="请输入备注信息"
            ></el-input>
          </div>
        </div>
        <div style="text-align: center;">
          <el-button type="primary" @click="updateConsignmentWatchSave"
            >保 存</el-button
          >
        </div>
      </div>
    </div>
    <div v-if="updateConsignmentSel.detaSel == 2">
      <div class="returnlastpage" style="margin-top: 0; " @click="backToSel1">
        <div>
          <img src="../../assets/imgs/goback.png" />
        </div>
        <span class="font">返回</span>
      </div>
      <div>
        <div
          id="myPriceChart"
          style="width: 95%;height: 500px;margin: 0 auto;margin-top: 50px;"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      img: this.$store.state.baseUrl,
      updateWatchId: "",
      watchDetails: {},

      params: {},
      dataRateHistoryList: [],
      xList: [],
      yList: [],

      submitData: {},
    };
  },
  props: ["updateConsignmentSel"],
  created() {
    this.updateWatchMsg();
  },
  methods: {
    // 价格历史曲线
    priceHistory() {
      this.dataRateHistoryList = [];
      this.xList = [];
      this.yList = [];
      this.$axios
        .get(
          this.$store.state.baseUrl +
            "/consignmentPriceHis?id=" +
            this.updateWatchId
        )
        .then((res) => {
          console.log("价格历史曲线");
          console.log(res);
          this.dataRateHistoryList = res.data;
          this.updateConsignmentSel.detaSel = 2;

          for (let item of this.dataRateHistoryList) {
            this.xList.push(item.time);
            this.yList.push(item.price);
          }
          // console.log(this.xList);
          // console.log(this.yList);

          // Vue 实现响应式并不是数据发生变化之后 DOM 立即变化，nextTick会保证其内的代码在DOM更新后执行
          this.$nextTick(() => {
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(
              document.getElementById("myPriceChart")
            );
            myChart.resize();
            // 绘制图表
            myChart.setOption({
              title: {
                text: "价格变化曲线图",
                x: "center",
              },
              tooltip: {
                trigger: "axis",
                axisPointer: {
                  // 坐标轴指示器，坐标轴触发有效
                  type: "line", // 默认为直线，可选为：'line' | 'shadow'
                },
              },
              xAxis: {
                data: this.xList,
              },
              yAxis: {
                name: "价格（" + res.data[0].currency + "）",
                type: "value",
              },
              series: [
                {
                  name: "价格",
                  type: "line",
                  data: this.yList,
                },
              ],
            });
            window.addEventListener("resize", function() {
              myChart.resize();
            });
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 修改寄卖手表
    updateWatchMsg() {
      this.updateWatchId = this.updateConsignmentSel.updateWatchId;
      this.$axios
        .get(
          this.$store.state.baseUrl +
            "/consignmentWatchInfo?id=" +
            this.updateWatchId
        )
        .then((res) => {
          console.log("手表信息");
          console.log(res);
          this.watchDetails = res.data;
          this.watchDetails.sellPayFull == 0
            ? (this.watchDetails.sellPayFull = false)
            : (this.watchDetails.sellPayFull = true);
          if (this.watchDetails.sellPayTime1 == "0000-00-00") {
            this.watchDetails.sellPayTime1 = "";
          }
          if (this.watchDetails.sellPayTime2 == "0000-00-00") {
            this.watchDetails.sellPayTime2 = "";
          }
          if (this.watchDetails.sellPayMoney1 == 0) {
            this.watchDetails.sellPayMoney1 = "";
          }
          if (this.watchDetails.sellPayMoney2 == 0) {
            this.watchDetails.sellPayMoney2 = "";
          }
          this.updateConsignmentSel.detaSel = 1;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    verify() {
      console.log(this);
      if (this.watchDetails.sellPayFull == false) {
        if (
          this.watchDetails.sellPayMoney2 !== "" &&
          this.watchDetails.sellPayMoney2 !== null
        ) {
          if (
            Number(this.watchDetails.sellPayMoney2) +
              Number(this.watchDetails.sellPayMoney1) !==
            this.watchDetails.buyWatchPrice
          ) {
            this.$message.error({
              message: "定金与尾款之和不等于寄卖金额，不能保存，请检查数据填写",
              showClose: true,
              duration: 2000,
            });
            return 1;
          }
        }

        this.params = {
          id: this.updateWatchId,
          buyWatchPrice: this.watchDetails.buyWatchPrice,
          buyWatchCurrency: this.watchDetails.buyWatchCurrency,
          sellPayFull: this.watchDetails.sellPayFull == false ? 0 : 1,
          sellPayMoney1: this.watchDetails.sellPayMoney1,
          sellPayTime1: this.watchDetails.sellPayTime1,
          sellPayMoney2: this.watchDetails.sellPayMoney2,
          sellPayTime2: this.watchDetails.sellPayTime2,
          sellNote: this.watchDetails.sellNote,
        };
      } else if (this.watchDetails.sellPayFull == true) {
        if (
          this.watchDetails.sellPayMoney1 !== "" &&
          this.watchDetails.sellPayMoney1 !== null
        ) {
          if (
            Number(this.watchDetails.sellPayMoney1) !==
            this.watchDetails.buyWatchPrice
          ) {
            this.$message.error({
              message: "付款金额不等于寄卖金额，不能保存，请检查数据填写",
              showClose: true,
              duration: 2000,
            });
            return 1;
          }
        }

        this.params = {
          id: this.updateWatchId,
          buyWatchPrice: this.watchDetails.buyWatchPrice,
          buyWatchCurrency: this.watchDetails.buyWatchCurrency,
          sellPayFull: this.watchDetails.sellPayFull == false ? 0 : 1,
          sellPayMoney1: this.watchDetails.sellPayMoney1,
          sellPayTime1: this.watchDetails.sellPayTime1,
          sellNote: this.watchDetails.sellNote,
        };
      }
    },
    // 确定修改
    updateConsignmentWatchSave() {
      if (this.verify() !== 1) {
        console.log(this.params);
        this.$axios
          .post(
            this.$store.state.baseUrl + "/consignmentWatchSave",
            this.params
          )
          .then((res) => {
            console.log("修改寄卖单手表信息");
            console.log(res);
            this.$message.success({
              message: "修改成功",
              showClose: true,
              duration: 2000,
            });
            this.$emit("backToConList", 0);
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

    // 返回
    backToConList() {
      this.$emit("backToConList", 1);
    },

    backToSel1() {
      this.updateConsignmentSel.detaSel = 1;
      console.log("99997777777777", this.updateConsignmentSel);
    },
  },
};
</script>

<style lang="scss" scoped>
.returnlastpage {
  width: 75px;
  height: 33px;
  line-height: 33px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
}

.returnlastpage img {
  width: 30px;
  height: 25px;
}

.returnlastpage div {
  margin-top: 5px;
}

.top-form {
  width: 190px;
  height: 80px;
  line-height: 80px;
  background-color: #fff;
  border-radius: 30px;

  .top-span {
    margin-right: 15px;
    font-size: 22px;
  }
}
</style>
