<template>
  <div class="Xcharts">
    <div class="Xchartbigbox">
      <div class="buttonbox">
        <div class="button">
          <button
            class="xybox"
            @click="xchartchange"
            v-if="isshow == 1"
            style="background-color: #0c7063;color: #fff;"
          >
            <div class="xy">横向对比</div>
          </button>
          <button
            class="xybox"
            @click="xchartchange"
            v-else
            style="background-color: #fff;color: #0c7063;"
          >
            <div class="xy">横向对比</div>
          </button>
          <button
            class="xybox"
            @click="ychart"
            v-if="isshow == 2"
            style="background-color: #0c7063;color: #fff;"
          >
            <div class="xy">纵向对比</div>
          </button>
          <button
            class="xybox"
            @click="ychart"
            v-else
            style="background-color: #fff;color: #0c7063;"
          >
            <div class="xy">纵向对比</div>
          </button>
        </div>
        <div class="typebutton">
          <button
            class="xybox"
            @click="xcharttype"
            v-if="isshows == 1"
            style="background-color: #0c7063;color: #fff;"
          >
            <div class="xy">金额</div>
          </button>
          <button
            class="xybox"
            @click="xcharttype"
            v-else
            style="background-color:  #fff;color: #0c7063;"
          >
            <div class="xy">金额</div>
          </button>
          <button
            class="xybox"
            @click="charttype"
            v-if="isshows == 2"
            style="background-color: #0c7063;color: #fff;"
          >
            <div class="xy">数量</div>
          </button>
          <button
            class="xybox"
            @click="charttype"
            v-else
            style="background-color:  #fff;color: #0c7063;"
          >
            <div class="xy">数量</div>
          </button>
        </div>
      </div>
      <!-- 横向 -->
      <div class="xchartbox" v-if="isshow == 1">
        <el-form style="width: 50%;margin-left: 16px;" v-if="isshow == 1">
          <el-form-item
            label="起止日期:"
            :rules="[{ required: true, message: '销售员不能为空' }]"
          >
            <el-date-picker
              type="daterange"
              v-model="monthtime"
              @change="getMyDatemonth()"
              value-format="yyyy-MM-dd"
              range-separator="~"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width: 76%;"
            >
            </el-date-picker>
          </el-form-item>
        </el-form>
        <div class="xchartimg">
          <chart
            v-if="isshows == 1"
            ref="chart"
            :options="option"
            :auto-resize="true"
            id="chart"
            style="width: 100%; height: 500px;"
          ></chart>
          <chart
            v-else
            ref="chart"
            :options="optionnum"
            :auto-resize="true"
            id="chartnum"
            style="width: 100%; height: 500px;"
          ></chart>
        </div>
      </div>
      <!-- 纵向 -->
      <div class="ychart" v-if="isshow == 2">
        <el-form
          label-width="100px"
          class="ycharttop"
          id="report-input"
          ref="form"
        >
          <el-form-item
            label="销售员:"
            style="width: 50%;"
            :rules="[{ required: true, message: '销售员不能为空' }]"
          >
            <el-select
              v-model="value3"
              filterable
              placeholder="请选择"
              style="width: 90%;"
              @change="currentSel"
              value-key="id"
            >
              <el-option
                v-for="item in salerlist.salesList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
                style="width: 500px;"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="统计时间:" style="width:50%">
            <button
              type="button"
              class="buttontype"
              plain
              @click="month"
              v-if="typecolor == 2 || typecolor == 1"
            >
              按月
            </button>
            <button
              type="button"
              class="buttontype"
              plain
              @click="month"
              v-else
              style="background:#d7ebe7;flood-color:#d7ebe7; color: #0c7063; outline: none;"
            >
              按月
            </button>
            <button
              type="button"
              class="buttontype"
              plain
              @click="quarter"
              v-if="typecolor == 3"
            >
              按季度
            </button>
            <button
              type="button"
              class="buttontype"
              plain
              @click="quarter"
              v-else
              style="background:#d7ebe7;flood-color:#d7ebe7;  color: #0c7063;outline: none;"
            >
              按季度
            </button>
            <button
              type="button"
              class="buttontype"
              plain
              @click="year"
              v-if="typecolor == 4"
            >
              按年
            </button>
            <button
              type="button"
              class="buttontype"
              plain
              @click="year"
              v-else
              style="background:#d7ebe7;flood-color:#d7ebe7;  color: #0c7063;"
            >
              按年
            </button>
          </el-form-item>
        </el-form>
        <div class="xchartimg">
          <chart
            v-if="isshows == 1"
            ref="chart"
            :options="orgOptions"
            :auto-resize="true"
            id="chart"
            style="width: 95%; height: 500px;"
          ></chart>
          <chart
            v-else
            ref="chart"
            :options="orgOptionsnum"
            :auto-resize="true"
            id="chart"
            style="width: 95%; height: 500px;"
          ></chart>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      option: {},
      optionnum: {},
      isshow: 1,
      isshows: 1,
      typecolor: 1,
      orgOptions: {},
      orgOptionsnum: {},
      mytime1: "",
      mytime2: "",
      typenum: "",
      value3: this.datanews.nick,
      salerid: this.datanews.id,
      monthtime: [],
      buyernick: {
        name: "",
        id: "",
      },
      salerlist: {
        purchaserList: [],
        salesList: [],
      },
      flagSale: 0,
      thisyear: "",
      moment: "",
    };
  },
  props: ["datanews"],

  created() {
    this.$axios
      .post(this.$store.state.baseUrl + "/buyerSalesmanList", {
        type: 3,
      })
      .then((res) => {
        this.salerlist.purchaserList = res.data.purchaserList;
        this.salerlist.salesList = res.data.salesList;
        this.flagSale = res.data.flag;
      });
  },
  methods: {
    xchartchange() {
      this.isshow = 1; //isshow控制横向、纵向按钮的背景显示
      this.isshows = 1; //isshows控制金额、数量按钮的功能切换
    },
    ychart() {
      this.isshow = 2;
      this.isshows = 1;
    },
    xcharttype() {
      this.isshows = 1;
    },
    charttype() {
      this.isshows = 2;
    },
    // mounted默认横向柱状图
    mountxchat() {
      console.log(this.monthtime[0] + "  " + this.monthtime[1]);
      this.$axios
        .post(this.$store.state.baseUrl + "/salesHistogramBroadWise", {
          startTime: this.monthtime[0],
          endTime: this.monthtime[1],
        })
        .then((res) => {
          console.log(res.data);
          const X = [];
          const Y = [];
          const Y2 = [];
          let temp = new Object();
          let temps = new Object();
          if (this.isshows == 1) {
            for (let index = 0; index < res.data.length - 1; index++) {
              if (res.data[index].money > res.data[index + 1].money) {
                temp = res.data[index];
                res.data[index] = res.data[index + 1];
                res.data[index + 1] = temp;
              }
            }
          } else {
            for (let index = 0; index < res.data.length - 1; index++) {
              if (res.data[index].total > res.data[index + 1].total) {
                temps = res.data[index];
                res.data[index] = res.data[index + 1];
                res.data[index + 1] = temps;
              }
            }
          }

          // 横向柱状图
          if (res) {
            for (const i of res.data) {
              X.push(i.nick);
            }
            for (const j of res.data) {
              Y.push(j.money);
            }
            for (const q of res.data) {
              Y2.push(q.total);
            }
            this.option = {
              //金额柱状图
              tooltip: {
                trigger: "axis",
                backgroundColor: "#fff", //背景色
                padding: [5, 15, 5, 15], //边距
                borderColor: "#DDDDDF", //边框颜色
                borderWidth: 1, //边框线宽度
                textStyle: {
                  //文字样式
                  color: "#6A6A6A",
                  decoration: "none",
                  fontFamily: "Verdana, sans-serif",
                },
                extraCssText: "text-align: left;", //文字对齐方式
                formatter: function(params) {
                  //格式化函数
                  return (
                    "销售员" +
                    ":" +
                    params[0].name +
                    "<br/>" +
                    params[0].seriesName +
                    ":" +
                    params[0].value
                  );
                },
              },
              xAxis: {
                name: "金额（" + res.data[0].currency + "）",
                type: "value",
              },
              yAxis: {
                type: "category",
                data: X,
                name: "销售员",
              },
              legend: {
                data: ["金额"], //小样--显示柱体信息
              },
              series: [
                {
                  name: "金额",
                  type: "bar",
                  data: Y,
                  stack: "总量",
                  barWidth: 30 + "px",
                  color: "#d7ebe7",
                },
              ],
            };
            this.optionnum = {
              //数量柱状图
              tooltip: {
                trigger: "axis",
                backgroundColor: "#fff", //背景色
                padding: [5, 15, 5, 15], //边距
                borderColor: "#DDDDDF", //边框颜色
                borderWidth: 1, //边框线宽度
                textStyle: {
                  //文字样式
                  color: "#6A6A6A",
                  decoration: "none",
                  fontFamily: "Verdana, sans-serif",
                },
                extraCssText: "text-align: left;", //文字对齐方式
                formatter: function(params) {
                  //格式化函数
                  return (
                    "销售员" +
                    ":" +
                    params[0].name +
                    "<br/>" +
                    params[0].seriesName +
                    ":" +
                    params[0].value
                  );
                },
              },
              xAxis: {
                name: "销售数量",
                type: "value",
              },
              yAxis: {
                type: "category",
                data: X,
                name: "销售员",
              },
              legend: {
                data: ["数量"],
              },

              series: [
                {
                  name: "数量",
                  type: "bar",
                  data: Y2,
                  stack: "总量",
                  barWidth: 30 + "px",
                  color: "#d7ebe7",
                },
              ],
            };
          }
        })
        .catch((err) => {
          console.log("xchart mounted错误");
        });
    },
    // 横向对比
    getMyDatemonth() {
      this.mytime1 = this.monthtime[0];
      this.mytime2 = this.monthtime[1];
      this.$emit("backtime", this.mytime1, this.mytime2);
      console.log(this.mytime1, this.mytime2);
      this.$axios
        .post(this.$store.state.baseUrl + "/histogramBroadWise", {
          startTime: this.mytime1,
          endTime: this.mytime2,
        })
        .then((res) => {
          console.log("横向对比");
          console.log(res.data);

          let temp = new Object();
          for (let index = 0; index < res.data.length - 1; index++) {
            if (res.data[index].money > res.data[index + 1].money) {
              temp = res.data[index];
              res.data[index] = res.data[index + 1];
              res.data[index + 1] = temp;
            }
          }
          const X = [];
          const Y = [];
          const Y2 = [];
          // 横向柱状图
          if (res) {
            for (const i of res.data) {
              X.push(i.nick);
            }
            for (const j of res.data) {
              Y.push(j.money);
            }
            for (const q of res.data) {
              Y2.push(q.total);
              console.log(Y2);
            }
            this.option = {
              tooltip: {
                trigger: "axis",
                backgroundColor: "#fff", //背景色
                padding: [5, 15, 5, 15], //边距
                borderColor: "#DDDDDF", //边框颜色
                borderWidth: 1, //边框线宽度
                textStyle: {
                  //文字样式
                  color: "#6A6A6A",
                  decoration: "none",
                  fontFamily: "Verdana, sans-serif",
                },
                extraCssText: "text-align: left;", //文字对齐方式
                formatter: function(params) {
                  //格式化函数
                  return (
                    "销售员" +
                    ":" +
                    params[0].name +
                    "<br/>" +
                    params[0].seriesName +
                    ":" +
                    params[0].value +
                    "<br/>"
                  );
                },
              },
              xAxis: {
                name: "金额（" + res.data[0].currency + "）",
                type: "value",
              },
              yAxis: {
                type: "category",
                data: X,
                name: "销售员",
              },
              legend: {
                data: ["金额"],
              },
              series: [
                {
                  name: "金额",
                  type: "bar",
                  data: Y,
                  stack: "总量",
                  barWidth: 30 + "px",
                  color: "#d7ebe7",
                },
              ],
            };
            this.optionnum = {
              tooltip: {
                trigger: "axis",
                backgroundColor: "#fff", //背景色
                padding: [5, 15, 5, 15], //边距
                borderColor: "#DDDDDF", //边框颜色
                borderWidth: 1, //边框线宽度
                textStyle: {
                  //文字样式
                  color: "#6A6A6A",
                  decoration: "none",
                  fontFamily: "Verdana, sans-serif",
                },
                extraCssText: "text-align: left;", //文字对齐方式
                formatter: function(params) {
                  //格式化函数
                  return (
                    "销售员" +
                    ":" +
                    params[0].name +
                    "<br/>" +
                    params[0].seriesName +
                    ":" +
                    params[0].value +
                    "<br/>"
                  );
                },
              },
              xAxis: {
                name: "销售数量",
                type: "value",
              },
              yAxis: {
                type: "category",
                data: X,
                name: "销售员",
              },
              legend: {
                data: ["销售数量"],
              },
              series: [
                {
                  name: "销售数量",
                  type: "bar",
                  data: Y2,
                  stack: "总量",
                  barWidth: 30 + "px",
                  color: "#d7ebe7",
                },
              ],
            };
          }
        })
        .catch((err) => {
          console.log("reporlist错误");
        });
    },
    // mounted默认纵向柱状图
    mountychart() {
      console.log("默认" + this.salerid);
      this.$axios
        .post(this.$store.state.baseUrl + "/salesHistogramEndWise", {
          id: this.salerid,
          type: 1,
        })
        .then((res) => {
          const X = [];
          const Y = [];
          const Y2 = [];
          console.log(res.data);
          if (res) {
            for (const i of res.data) {
              X.push(i.time);
            }
            for (const j of res.data) {
              Y.push(j.money);
            }
            for (const q of res.data) {
              Y2.push(q.total);
            }
            this.orgOptions = {
              tooltip: {
                trigger: "axis",
                backgroundColor: "#fff", //背景色
                padding: [5, 15, 5, 15], //边距
                borderColor: "#DDDDDF", //边框颜色
                borderWidth: 1, //边框线宽度
                textStyle: {
                  //文字样式
                  color: "#6A6A6A",
                  decoration: "none",
                  fontFamily: "Verdana, sans-serif",
                },
                extraCssText: "text-align: left;", //文字对齐方式
                formatter: function(params) {
                  return (
                    "时间" +
                    ":" +
                    params[0].name +
                    "<br/>" +
                    params[0].seriesName +
                    ":" +
                    params[0].value
                  );
                },
              },
              xAxis: {
                name: "时间",
                type: "category",
                data: X,
              },
              yAxis: {
                name: "金额（" + res.data[0].currency + "）",
                type: "value",
              },
              legend: {
                data: ["金额"],
              },
              series: [
                {
                  name: "金额",
                  data: Y,
                  type: "bar",
                  smooth: true,
                  stack: "总量",
                  barWidth: 30 + "px",
                  color: "#0c7063",
                  label: {
                    normal: {
                      position: "insideBottom",
                      textStyle: {
                        color: "#000",
                      },
                    },
                  },
                },
              ],
            };
            this.orgOptionsnum = {
              tooltip: {
                trigger: "axis",
                backgroundColor: "#fff", //背景色
                padding: [5, 15, 5, 15], //边距
                borderColor: "#DDDDDF", //边框颜色
                borderWidth: 1, //边框线宽度
                textStyle: {
                  //文字样式
                  color: "#6A6A6A",
                  decoration: "none",
                  fontFamily: "Verdana, sans-serif",
                },
                extraCssText: "text-align: left;", //文字对齐方式
                formatter: function(params) {
                  return (
                    "时间" +
                    ":" +
                    params[0].name +
                    "<br/>" +
                    params[0].seriesName +
                    ":" +
                    params[0].value
                  );
                },
              },
              xAxis: {
                name: "时间",
                type: "category",
                data: X,
              },
              yAxis: {
                name: "销售数量",
                type: "value",
              },
              legend: {
                data: ["销售数量"],
              },
              series: [
                {
                  name: "销售数量",
                  data: Y2,
                  type: "bar",
                  smooth: true,
                  stack: "总量",
                  barWidth: 30 + "px",
                  color: "#0c7063",
                  label: {
                    normal: {
                      position: "insideBottom",
                      textStyle: {
                        color: "#000",
                      },
                    },
                  },
                },
              ],
            };
          }
        });
    },
    // 纵向柱状图
    typenumchart() {
      console.log(this.buyerid);
      const X = [];
      const Y = [];
      const Y2 = [];
      this.$axios
        .post(this.$store.state.baseUrl + "/salesHistogramEndWise", {
          id: this.buyerid,
          type: this.typenum,
        })
        .then((res) => {
          console.log(res.data);
          if (res) {
            for (const i of res.data) {
              X.push(i.time);
            }
            for (const j of res.data) {
              Y.push(j.money);
            }
            for (const q of res.data) {
              Y2.push(q.total);
            }
            // 纵向柱状图
            this.orgOptions = {
              tooltip: {
                trigger: "axis",
                backgroundColor: "#fff", //背景色
                padding: [5, 15, 5, 15], //边距
                borderColor: "#DDDDDF", //边框颜色
                borderWidth: 1, //边框线宽度
                textStyle: {
                  //文字样式
                  color: "#6A6A6A",
                  decoration: "none",
                  fontFamily: "Verdana, sans-serif",
                },
                extraCssText: "text-align: left;", //文字对齐方式
                formatter: function(params) {
                  return (
                    "时间" +
                    ":" +
                    params[0].name +
                    "<br/>" +
                    params[0].seriesName +
                    ":" +
                    params[0].value +
                    "<br/>"
                  );
                },
              },
              xAxis: {
                name: "时间",
                type: "category",
                data: X,
              },
              yAxis: {
                name: "金额（" + res.data[0].currency + "）",
                type: "value",
              },
              legend: {
                data: ["金额"],
              },
              series: [
                {
                  name: "金额",
                  data: Y,
                  type: "bar",
                  smooth: true,
                  stack: "总量",
                  barWidth: 30 + "px",
                  color: "#0c7063",
                  label: {
                    normal: {
                      position: "insideBottom",
                      textStyle: {
                        color: "#000",
                      },
                    },
                  },
                },
              ],
            };
            this.orgOptionsnum = {
              tooltip: {
                trigger: "axis",
                backgroundColor: "#fff", //背景色
                padding: [5, 15, 5, 15], //边距
                borderColor: "#DDDDDF", //边框颜色
                borderWidth: 1, //边框线宽度
                textStyle: {
                  //文字样式
                  color: "#6A6A6A",
                  decoration: "none",
                  fontFamily: "Verdana, sans-serif",
                },
                extraCssText: "text-align: left;", //文字对齐方式
                formatter: function(params) {
                  return (
                    "时间" +
                    ":" +
                    params[0].name +
                    "<br/>" +
                    params[0].seriesName +
                    ":" +
                    params[0].value +
                    "<br/>"
                  );
                },
              },
              xAxis: {
                name: "时间",
                type: "category",
                data: X,
              },
              yAxis: {
                name: "销售数量",
                type: "value",
              },
              legend: {
                data: ["销售数量"],
              },
              series: [
                {
                  name: "销售数量",
                  data: Y2,
                  type: "bar",
                  smooth: true,
                  stack: "总量",
                  barWidth: 30 + "px",
                  color: "#0c7063",
                  label: {
                    normal: {
                      position: "insideBottom",
                      textStyle: {
                        color: "#000",
                      },
                    },
                  },
                },
              ],
            };
          }
        });
    },
    // 按月
    month() {
      this.typenum = 1;
      console.log(this.buyerid);
      this.typenumchart();
      this.typecolor = 2;
    },
    // 按季度
    quarter() {
      this.typenum = 2;
      this.typenumchart();
      this.typecolor = 3;
    },
    // 按年
    year() {
      this.typenum = 3;
      this.typenumchart();
      this.typecolor = 4;
    },
    // 获取销售员id
    currentSel(selval) {
      this.buyerid = selval;
      this.typenumchart();
      let obj = {};
      obj = this.salerlist.salesList.find((item) => {
        //面遍历的数据源
        return item.id === selval; //筛选出匹配数据
      });
      this.buyernick.name = obj.nick;
      this.buyernick.id = obj.id;
      this.$emit("backnick", this.buyernick.name, this.buyernick.id);
    },
  },
  mounted() {
    this.monthtime = [this.datanews.startT, this.datanews.endT];
    // console.log(this.monthtime);
    // 调用默认横向柱状图
    this.mountxchat();

    // // 默认纵向柱状图
    this.mountychart();
  },
};
</script>
<style lang="scss" scoped>
.Xcharts {
  width: 100%;
  margin: 0 auto;
  padding: 0 0 30px 0;
  font-size: 16px;
  background-color: #fff;
  border-radius: 30px;
  font-family: "微软雅黑";
}

.Xchartbigbox {
  width: 90%;
  margin: 0 auto;
}

.buttonbox {
  margin-left: 20px;
  height: 80px;
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  background-color: #d7ebe7;
  justify-content: start;
  outline: none;
}

.buttonbox button {
  outline: none;
}

.buttonbox .el-form-item {
  margin-top: 22px;
}

.buttonbox .button {
  width: 50%;
}

.buttontype {
  width: 144px;
  height: 48px;
  border-radius: 6px;
  font-size: 16px;
  color: #fff;
  margin-right: 4%;
  background-color: #0c7063;
  border-color: #0c7063;
  outline: none;
  border: none;
  cursor: pointer;
}

.xybox {
  width: 144px;
  border-radius: 2px;
  background-color: #f3fbf9;
  border: 1px solid rgb(179, 178, 178);
  margin: 20px auto;
  border: none;
  font-size: 16px;
  color: #2c3e50;
}

.xybox:first-of-type {
  margin-left: 60px;
}

.xybox:hover {
  background-color: #d7ebe7;
}

.xy {
  box-shadow: grey;
  height: 48px;
  line-height: 48px;
  margin: auto;
}

.xchartbox {
  width: 90%;
  margin-left: 10px;
  padding-top: 20px;
  margin: 16px 0;
}

.ychart {
  width: 100%;
}

.ychart .el-form-item {
  margin-top: 22px;
}

.ychart-input {
  display: flex;
  flex-wrap: nowrap;
}

.ycharttop {
  margin: 16px 0;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
}
</style>
