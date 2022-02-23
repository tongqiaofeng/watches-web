<template>
  <div class="echartbox" id="echartbox">
    <div class="echart1" id="echart1">
      <div class="echart-report">
        <span class="header-t">采购报表</span>
        <!-- <img src="../../assets/imgs/add.png" alt="" class="xchart" @click="xchart"> -->
      </div>
      <div v-if="isshow!=true">
        <div class="echart2" id="echart2">
          <el-form label-width="100px" class="echart-input" id="report-input" ref="form">
            <div class="typebutton">
              <button class="xybox" @click="xcharttype" v-if="isshows == 1" type="button"
                style="background-color: #0c7063;color: #fff;">
                <div class="xy">金额</div>
              </button>
              <button class="xybox" @click="xcharttype" v-else type="button"
                style="background-color:  #d7ebe7;color: #0c7063;">
                <div class="xy">金额</div>
              </button>
              <button class="xybox" @click="charttype" v-if="isshows == 2" type="button"
                style="background-color: #0c7063;color: #fff;">
                <div class="xy">数量</div>
              </button>
              <button class="xybox" @click="charttype" v-else type="button"
                style="background-color:  #d7ebe7;color: #0c7063;">
                <div class="xy">数量</div>
              </button>
            </div>
            <el-form-item label="统计时间:" style="width:50%">
              <button type="button" class="buttontype" plain @click="month"
                v-if="typecolor==2||typecolor==1">按月</button>
              <button type="button" class="buttontype" plain @click="month" v-else
                style="background:#d7ebe7;flood-color:#d7ebe7; outline: none; color: #0c7063;">按月</button>
              <button type="button" class="buttontype" plain @click="quarter" v-if="typecolor==3">按季度</button>
              <button type="button" class="buttontype" plain @click="quarter" v-else
                style="background:#d7ebe7;flood-color:#d7ebe7; outline: none; color: #0c7063;">按季度</button>
              <button type="button" class="buttontype" plain @click="year" v-if="typecolor==4">按年</button>
              <button type="button" class="buttontype" plain @click="year" v-else
                style="background:#d7ebe7;flood-color:#d7ebe7; outline: none; color: #0c7063;">按年</button>
            </el-form-item>
          </el-form>
        </div>
        <div class="chart">
          <chart v-if="isshows==1" ref="chart" :options="orgOptions" :auto-resize="true" id="chart"
            style="width: 95%; height: 500px;"></chart>
          <chart v-else ref="chart" :options="orgOptionsnum" :auto-resize="true" id="chart"
            style="width: 95%; height: 500px;"></chart>
        </div>
      </div>
      <Report-xchart v-if="isshow==true"></Report-xchart>
    </div>
  </div>
</template>

<script>
  export default {
    name: "HelloWorld",
    data() {
      return {
        isshow: false,
        isshows: 1,
        orgOptions: {},
        orgOptionsnum: {},
        typecolor: 1,
        value: "",
        typecolor: 1,
        typenum: 1,
        options: [{
            value: "选项1",
            label: "全公司",
          },
          {
            value: "选项2",
            label: "采购员1",
          },
          {
            value: "选项3",
            label: "采购员2",
          },
          {
            value: "选项4",
            label: "采购员3",
          },
        ],
      };
    },
    props: ["buyerlimit"],
    mounted() {
      // 默认纵向柱状图
      this.typenumchart()
    },

    methods: {
      xcharttype() {
        this.isshows = 1;
      },
      charttype() {
        this.isshows = 2;
      },
      // 获取采购员id
      currentSel(selval) {
        this.buyerid = selval;
      },

      // 按月
      month() {
        this.typenum = 1;
        this.typenumchart();
        this.typecolor = 2
      },
      // 按季度
      quarter() {

        this.typenum = 2;
        this.typenumchart();
        this.typecolor = 3
      },
      // 按年
      year() {
        this.typenum = 3;
        this.typenumchart();
        this.typecolor = 4
      },
      typenumchart() {
        const X = [];
        const Y = [];
        const Y2 = [];
        // console.log(this.buyerlimit.id);
        this.$axios
          .post(this.$store.state.baseUrl + "/histogramEndwise", {
            id: this.buyerlimit.id,
            type: this.typenum,
          })
          .then((res) => {
            const X = [];
            const Y = [];
            const Y2 = [];
            const Y3 = [];
            const Y4 = [];
            const J1 = [];
            const J2 = [];
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
              for (const a of res.data) {
                Y3.push(a.sellMoney);
              }
              for (const b of res.data) {
                Y4.push(b.unSellMoney);
              }
              for (const c of res.data) {
                J1.push(c.sellTotal);
              }
              for (const d of res.data) {
                J2.push(d.unSellTotal);
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
                  formatter: function (params) {
                    let num = params[0].value + params[1].value;
                    return (
                      "时间" + ":" + params[0].name +
                      "<br/>" +
                      "总金额" + ":" +
                      num +
                      "<br/>" +
                      params[0].seriesName +
                      ":" +
                      params[0].value +
                      "<br/>" +
                      params[1].seriesName +
                      ":" +
                      params[1].value
                    );
                  },
                },
                xAxis: {
                  name: "时间",
                  type: "category",
                  data: X,
                },
                yAxis: {
                  name: "金额（HKD）",
                  type: "value",
                },
                legend: {
                  data: ["未销售金额", "已销售金额"]
                },
                series: [{
                    name: "未销售金额",
                    data: Y4,
                    type: "bar",
                    smooth: true,
                    stack: "总量",
                    barWidth: 30 + "px",
                    color: "#0c7063",
                    label: {
                      normal: {
                        position: "insideBottom",
                        textStyle: {
                          color: "#000"
                        },
                      },
                    },
                  },
                  {
                    name: "已销售金额",
                    data: Y3,
                    type: "bar",
                    smooth: true,
                    stack: "总量",
                    barWidth: 30 + "px",
                    color: "#d7ebe7",
                    label: {
                      normal: {
                        position: "insideBottom",
                        textStyle: {
                          color: "#000"
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
                  formatter: function (params) {
                    let num = params[0].value + params[1].value;
                    return (
                      "时间" + ":" + params[0].name +
                      "<br/>" +
                      "总数量" + ":" +
                      num +
                      "<br/>" +
                      params[0].seriesName +
                      ":" +
                      params[0].value +
                      "<br/>" +
                      params[1].seriesName +
                      ":" +
                      params[1].value
                    );
                  },
                },
                xAxis: {
                  name: "时间",
                  type: "category",
                  data: X,
                },
                yAxis: {
                  name: "采购数量",
                  type: "value",
                },
                legend: {
                  data: ["未销售数量", "已销售数量"]
                },
                series: [{
                    name: "未销售数量",
                    data: J2,
                    type: "bar",
                    smooth: true,
                    stack: "总量",
                    barWidth: 30 + "px",
                    color: "#0c7063",
                    label: {
                      normal: {
                        position: "insideBottom",
                        textStyle: {
                          color: "#000"
                        },
                      },
                    },
                  },
                  {
                    name: "已销售数量",
                    data: J1,
                    type: "bar",
                    smooth: true,
                    stack: "总量",
                    barWidth: 30 + "px",
                    color: "#d7ebe7",
                    label: {
                      normal: {
                        position: "insideBottom",
                        textStyle: {
                          color: "#000"
                        },
                      },
                    },
                  },
                ],
              };
            }
          });
      }
    }
  }
</script>
<style lang="scss" scoped>
  .echartbox {
    width: 100%;
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
    border: none;
    outline: none;
    cursor: pointer;
  }

  .typebutton {
    margin-right: 20%;

  }

  .xy {
    box-shadow: grey;

    height: 48px;
    line-height: 48px;

    margin: auto;
  }

  .xybox {
    width: 110px;
    border-radius: 2px;
    background-color: #f3fbf9;
    border: 1px solid rgb(179, 178, 178);
    /* margin: 20px auto; */
    border: none;
    outline: none;
    font-size: 16px;
    color: #2c3e50;
  }

  .xybox:first-of-type {
    margin-left: 30px;
  }

  .xybox:hover {
    background-color: #d7ebe7;
  }

  .echart1 {
    width: 95%;
    margin: 0 auto;
    /* padding: 50px 0 30px 0; */
    font-size: 16px;
    background-color: #fff;
    border-radius: 30px;
    font-family: "微软雅黑";
  }

  .echart2 {
    /* margin-left: 20px; */
    width: 90%;
    margin: auto;
  }

  .echart-input {
    display: flex;
    flex-wrap: nowrap;
  }

  .chart {
    margin: 20px auto;
    width: 100%;
    margin-left: 20px;
  }

  .echart-report {
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap;
    width: 90%;
    margin: 0 auto;
    height: 64px;
    line-height: 64px;
    padding: 0 30px 20px;
    color: #2c3e50;
  }

  .xchart {
    width: 20px;
    height: 20px;
  }

  .header-t {
    font-size: 18px;
    margin-left: 30px;
    font-weight: bold;
  }
</style>