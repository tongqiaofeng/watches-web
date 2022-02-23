<template>
  <div class="msg-container" id="logistics-msg">
    <!-- <h1>商品发货</h1> -->
    <div class="back-button" @click="selecting">
      <div>
        <img src="../../assets/imgs/goback.png" />
      </div>
      <span>继续选择</span>
    </div>
    <div class="msg-info-first">
      <el-form label-width="150px">
        <el-form-item label="发货时间：">

          <el-date-picker
            class="input-style"
            v-model="logSendTime"
            type="date"
            placeholder="date"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="预计到达时间：">
          <el-date-picker
            class="input-style"
            v-model="arriveTime"
            type="date"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="到达仓库：">
          <el-select
            v-model="warehouse"
            placeholder="请选择"
            class="input-style"
          >
            <el-option
              v-for="(item, index) in warehouseList"
              :key="index"
              :label="item.name"
              :value="item.name"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div class="msg-freight">
      <el-form label-width="150px">
        <el-form-item label="运费：">
          <div style="display: flex;">
            <el-input
              v-model="freight"
              @input="freightChange"
              style="width: 50%;height: auto;line-height: 40px;"
            >
            </el-input>
            <el-select v-model="logCurrency">
              <el-option
                v-for="(item, index) in currencyList"
                :key="index"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </div>
        </el-form-item>
      </el-form>
      <div class="freight-container">
        <p>每块表分摊金额：</p>
        <table>
          <tr>
            <th>图片</th>
            <th>型号</th>
            <th>机芯号</th>
            <th>采购价</th>
            <th>
              <span style="width: 75%;margin: 0 auto;">运费</span>
            </th>
          </tr>
          <tr v-for="(item, index) in watchFreightList" :key="index">
            <td>

              <img
                v-image-preview
                :src="
                  item.buyWatchPics == null || item.buyWatchPics == ''
                    ? ''
                    : img +
                      '/img/watch/' +
                      (item.buyWatchPics || '').split('|')[0]
                "
                style="width: 100px;height: 100px;object-fit: cover;border-radius: 30px;"
              />
            </td>
            <td>
              <div>
                <span>{{ item.buyWatchBrand }}</span>
              </div>
              <div>
                <span>{{ item.buyWatchModel }}</span>
              </div>
            </td>
            <td>{{ item.buyWatchSn }}</td>
            <td>
              {{ item.buyWatchCurrency }}
              {{ formatNumberRgx(item.buyWatchPrice) }}
            </td>
            <td>
              <div
                style="width: 90%;margin: 0 auto;padding-left: 5px;border-bottom: 1px solid #000;display: flex;"
              >
                <input
                  type="text"
                  v-model="arries[index]"
                  class="freight-input"
                  @input="inputChange"
                />
                <i
                  slot="suffix"
                  style="color: #000;margin-right:5%;font-style:normal;"
                  >{{ logCurrency }}</i
                >
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="sure">
      <input
        class="sure-button"
        type="button"
        value="确认"
        @click="msgSubmit"
      />
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      logSendTime: new Date(),
      img: this.$store.state.baseUrl,
      arriveTime: "",
      warehouseList: [],
      warehouse: "",
      warehouseId: 1,
      freight: "", // 运费
      watchFreightList: "",
      arries: [],
      logWatch: [],
      x: 0,
      sum: 0,
      sum2: 0,
      sum3: 0,
      sum4: 0,
      id: 0,
      logMoneyEx: 0, // 每块表分摊金额
      mathes1: 0,
      mathes2: 0,
      rateArr: [], // 汇率
      price: 0,
      as: 0,

      currencyList: [],
      logCurrency: sessionStorage.getItem("companyLoginCurrency"),
    };
  },
  created() {
    this.handleWarehouse();
    this.handleCountryGet();
    console.log("999");
    // 要发货的手表列表
    this.watchFreightList = JSON.parse(sessionStorage.getItem("isSelected"));
    console.log(this.watchFreightList);
  },
  methods: {
    // 获取币种列表
    handleCountryGet() {
      this.$axios
        .post(this.$store.state.baseUrl + "/CountryGet")
        .then((res) => {
          console.log("国家列表");
          console.log(res);
          let list = [];
          for (let item of res.data) {
            if (list.indexOf(item.enCurrency) === -1) {
              list.push(item.enCurrency);
            }
          }
          this.currencyList = list;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 获得仓库列表
    handleWarehouse() {
      this.$axios
        .post(this.$store.state.baseUrl + "/WarehouseGet")
        .then((res) => {
          console.log("desf");
          console.log(res);
          this.warehouseList = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // 计算运费
    freightChange() {
      this.$axios
        .post(this.$store.state.baseUrl + "/RatesGet", {
          // source: item.buyWatchCurrency
          source: "CNY",
        })
        .then((res) => {
          console.log("汇率计算");
          console.log(res);
          this.rateArr = res.data;
          for (let arr of this.watchFreightList) {
            this.sum += arr.buyWatchPrice;
          }
          if (this.freight == 0) {
            this.arries = [];
            for (let i = 0; i < this.watchFreightList.length; i++) {
              this.arries.splice(i, 1, 0);
            }
          } else {
            if (this.watchFreightList.length == 1) {
              this.arries = [];
              for (let i = 0; i < this.watchFreightList.length; i++) {

                if (this.watchFreightList[i].buyWatchCurrency == "CNY") {
                  this.sum2 += Number(this.watchFreightList[i].buyWatchPrice);
                  console.log(
                    "7777755555---" + this.watchFreightList[i].buyWatchPrice
                  );
                }
              }
              if (this.watchFreightList.length == 2) {
                this.arries = [];
                this.mathes1 = 0;
                this.sum2 = 0;
                console.log("dddddddd");
                console.log(this.arries);
                for (let i = 0; i < this.watchFreightList.length; i++) {

                  if (this.watchFreightList[i].buyWatchCurrency !== "CNY") {
                    if (items.type == 0) {
                      if (
                        items.dest === this.watchFreightList[i].buyWatchCurrency
                      ) {
                        console.log(
                          "价格" + this.watchFreightList[i].buyWatchPrice
                        );
                        console.log("汇率" + items.rate);
                        this.sum2 +=
                          Number(this.watchFreightList[i].buyWatchPrice) *
                          Number(items.rate);
                        console.log("ggggggggggggg----" + this.sum2);
                      }
                    }
                  }
                }

              }
              console.log("999999999777777777---" + this.sum2);
              for (let i = 0; i < this.watchFreightList.length; i++) {
                this.arries.push(i);
              }
              console.log("数据");
              console.log(this.arries);
              for (let ite of this.rateArr) {
                console.log("sum2---" + this.sum2);
                for (let i = 0; i < this.watchFreightList.length; i++) {
                  if (this.watchFreightList[i].buyWatchCurrency == "CNY") {
                    this.mathes1 = Number(
                      (Number(this.watchFreightList[i].buyWatchPrice) /
                        this.sum2) *
                        this.freight
                    );
                    this.mathes1 = this.mathes1.toFixed(0);
                    // this.arries.push(this.mathes1);
                    this.arries.splice(i, 1, this.mathes1);
                    console.log(
                      i +
                        "位置" +
                        this.watchFreightList[i].buyWatchPrice +
                        "计算--" +
                        this.mathes2
                    );
                    console.log(this.arries);
                  } else if (
                    this.watchFreightList[i].buyWatchCurrency !== "CNY"
                  ) {
                    if (ite.type == 0) {
                      if (
                        ite.dest == this.watchFreightList[i].buyWatchCurrency
                      ) {
                        console.log("====-----" + ite.dest + "---" + ite.rate);
                        this.mathes1 = Number(
                          ((Number(this.watchFreightList[i].buyWatchPrice) *
                            Number(ite.rate)) /
                            this.sum2) *
                            this.freight
                        );
                        this.mathes1 = this.mathes1.toFixed(0);
                        // this.arries.push(this.mathes1);
                        this.arries.splice(i, 1, this.mathes1);
                        console.log(
                          i +
                            "位置" +
                            this.watchFreightList[i].buyWatchPrice +
                            "计算--" +
                            this.mathes2
                        );
                        console.log(this.arries);
                      }
                    }
                  }
                }
              }

              this.arries[this.arries.length - 1] = Number(
                this.freight - this.arries[0]
              );
            }
            if (this.watchFreightList.length > 2) {
              this.arries = [];
              this.mathes2 = 0;
              this.sum2 = 0;
              for (let i = 0; i < this.watchFreightList.length; i++) {
                if (this.watchFreightList[i].buyWatchCurrency == "CNY") {
                  this.sum2 += Number(this.watchFreightList[i].buyWatchPrice);
                  console.log(
                    "7777755555---" + this.watchFreightList[i].buyWatchPrice
                  );
                }
              }
              for (let items of this.rateArr) {
                for (let i = 0; i < this.watchFreightList.length; i++) {
                  if (this.watchFreightList[i].buyWatchCurrency !== "CNY") {
                    if (items.type == 0) {
                      if (
                        items.dest === this.watchFreightList[i].buyWatchCurrency
                      ) {
                        console.log(
                          "价格" + this.watchFreightList[i].buyWatchPrice
                        );
                        console.log("汇率" + items.rate);
                        this.sum2 += Number(
                          Number(this.watchFreightList[i].buyWatchPrice) *
                            Number(items.rate)
                        );
                      }
                    }
                  }
                  console.log('999999999999---' + this.sum2);
                }

                console.log("999999999999---" + this.sum2);
              }
              console.log(this.watchFreightList);
              for (let i = 0; i < this.watchFreightList.length; i++) {
                this.arries.push(i);
              }
              console.log("数据");
              console.log(this.arries);
              for (let items of this.rateArr) {
                for (let i = 0; i < this.watchFreightList.length; i++) {
                  if (this.watchFreightList[i].buyWatchCurrency == "CNY") {
                    this.mathes2 = Number(
                      (Number(this.watchFreightList[i].buyWatchPrice) /
                        Number(this.sum2)) *
                        Number(this.freight)
                    );
                    this.arries.splice(i, 1, this.mathes2.toFixed(0));
                    console.log(
                      i +
                        "位置" +
                        this.watchFreightList[i].buyWatchPrice +
                        "计算--" +
                        this.mathes2
                    );
                  } else if (
                    this.watchFreightList[i].buyWatchCurrency !== "CNY"
                  ) {
                    if (items.type == 0) {
                      if (
                        items.dest == this.watchFreightList[i].buyWatchCurrency
                      ) {
                        this.mathes2 = Number(
                          ((Number(this.watchFreightList[i].buyWatchPrice) *
                            Number(items.rate)) /
                            Number(this.sum2)) *
                            Number(this.freight)
                        );
                        // this.arries.push(this.mathes2.toFixed(0));
                        this.arries.splice(i, 1, this.mathes2.toFixed(0));
                        console.log(
                          i +
                            "位置" +
                            this.watchFreightList[i].buyWatchPrice +
                            "计算--" +
                            this.mathes2
                        );
                        console.log(this.arries);
                      }
                    }
                  }
                }
              }
              let sumYun = 0;
              for (let i = 0; i < this.arries.length - 1; i++) {
                sumYun += Number(this.arries[i]);
              }

              this.arries[this.arries.length - 1] = Number(
                this.freight - sumYun
              );
            }
          }
        });
    },
    // 继续选择要发货的商品
    selecting() {
      this.$emit("selecting", 0);
    },
    // 发货前确认运费
    verification() {
      this.sum3 = 0;
      for (let item of this.arries) {
        this.sum3 += Number(item);
      }
      console.log("打印运费");
      console.log(this.arries);
      console.log(this.sum3, this.freight);
      if (this.sum3 !== Number(this.freight)) {
        this.$message.error({
          message: "各表分摊运费的和与总运费不一致，请重新计算填写",
          showClose: true,
          duration: 2000,
        });
        return 1;
      }
      if (
        this.logSendTime == null ||
        this.arriveTime == null ||
        this.warehouse == "" ||
        this.freight == ""
      ) {
        this.$message.error({
          message: "数据不能为空，请检查数据填写",
          showClose: true,
          duration: 2000,
        });
        return 1;
      }
    },
    submit() {
      for (let item of this.warehouseList) {
        if (item.name == this.warehouse) {
          this.warehouseId = item.id;
        }
      }
      // console.log(this.warehouseId);
      let watchOne = {
        id: 0,
      };
      for (let index in this.watchFreightList) {
        let watchOne = {
          id: 0,
          logMoneyEx: 0,
        };

        watchOne.id = this.watchFreightList[index].id;
        watchOne.logMoneyEx = this.arries[index];
        this.logWatch.push(watchOne);
      }
      // console.log('pppp');
      // console.log(this.logWatch);
      const loading = this.$loading({
        lock: true,
        text: "数据提交中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      this.$axios
        .post(this.$store.state.baseUrl + "/LOGInsert", {
          logSendTime: this.shellDate(this.logSendTime),
          logArriveTime: this.shellDate(this.arriveTime),
          logWarehouseId: this.warehouseId,
          logWarehouse: this.warehouse,
          logMoney: this.freight,
          logCurrency: this.logCurrency,
          logWatch: this.logWatch,
        })
        .then((res) => {
          console.log("本次商品发货成功");
          loading.close();
          this.$emit(
            "logisticsMsg",
            "我是物流信息填写页面发过来的数据，请接收"
          );
          console.log(res);
          this.$message.success({
            message: "本次物流信息提交成功",
            showClose: true,
            duration: 2000,
          });
          this.$emit("selecting", 0);
          sessionStorage.setItem("isSelected", []);
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
          loading.close();
          this.$message.error({
            message: err.data.message,
            showClose: true,
            duration: 2000,
          });
        });
    },
    // 确认发货
    msgSubmit() {
      if (this.verification() !== 1) {
        this.submit();
      }
    },
    // 运费变化
    inputChange() {
      this.freight = 0;
      for (let item of this.arries) {
        console.log(item);
        if (item % 1 === 0) {
          this.freight += Number(item);
        } else {
          this.$message.error({
            message: "数据不能包含小数，请重新输入",
            showClose: true,
            duration: 2000,
          });
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.msg-container {
  width: 100%;
  margin: 0 auto;

  .back-button {
    width: 105px;
    height: 30px;
    margin-bottom: 20px;
    line-height: 37px;
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

  .msg-info-first,
  .msg-freight {
    width: 100%;
    padding: 40px 0;
    padding-bottom: 20px;
    // padding-left: 20px;
    background-color: #fff;
    border-radius: 30px;
  }

  .input-style {
    width: 50%;
  }

  .msg-freight {
    margin: 20px 0;

    .freight-container {
      width: 90%;
      margin: 0 auto;
      margin-top: 40px;
      padding: 30px;
      border: 1px solid #ddd;
      border-radius: 30px;

      td {
        padding: 20px 0;
        background-color: #f3fbf9;
        font-size: 15px;
      }
    }
  }

  .freight-input {
    width: 80%;
    height: 40px;
    border: 0;
    outline: none;
    background-color: transparent;
  }

  .sure {
    width: 95%;
    margin: 20px;
    text-align: right;

    .sure-button {
      width: 300px;
      height: 50px;
      background-color: #0c8563;
      color: #fff;
      border: 0;
      border-radius: 30px;
      outline: none;
      font-size: 16px;
      cursor: pointer;
    }
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
      width: 21%;
      text-align: center;
      border: 0;
    }
  }
}
</style>
<style lang="scss">
#logistics-msg {
  .el-input__suffix {
    width: 30%;
  }
}
</style>
