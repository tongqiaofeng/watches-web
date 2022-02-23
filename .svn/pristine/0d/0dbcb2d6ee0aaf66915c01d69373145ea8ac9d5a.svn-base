<template>
  <div class="details-container">
    <div class="details">
      <div class="details-top">
        <div class="details-bar">
          <div class="goback">
            <div class="back-img" @click="goback">
              <img src="../../assets/imgs/goback.png" @click="goback" />
            </div>
            <div class="goback-line"></div>
          </div>
          <ul class="menu">
            <li ref="msg" style="color:#000;">
              <div style="width: 100px;" class="menu-div-one" @click="watchInfo">
                <div class="menu-div-two">
                  <img class="jump-img" :src="watchstate == 1 ? watchimg1 : watchimg2" />
                </div>
                <span>手表信息</span>
              </div>
              <div v-show="detailsSelect.num == 0" class="line"></div>
            </li>
            <li ref="pay">
              <div class="menu-div-one" @click="payPage">
                <div class="menu-div-two">
                  <img class="jump-img" :src="paystate == 1 ? watchimg1 : watchimg2" />
                </div>
                <span>付款</span>
              </div>
              <div v-show="detailsSelect.num == 1" class="line"></div>
            </li>
            <li ref="drawback">
              <div class="menu-div-one" @click="drawbackPage">
                <div class="menu-div-two">
                  <img class="jump-img"
                    :src="drawbackstate == 1 ? watchimg1 : (drawbackstate == 0 ? watchimg2 : watchimg3)" />
                </div>
                <span>退税</span>
              </div>
              <div v-show="detailsSelect.num == 2" class="line"></div>
            </li>
            <!--  commission -->
            <li ref="commission">
              <div class="menu-div-one" @click="commissionPage">
                <div class="menu-div-two">
                  <img class="jump-img"
                    :src="commissionstate == 1 ? watchimg1 : (commissionstate == 0 ? watchimg2 : watchimg3)" />
                </div>
                <span>佣金</span>
              </div>
              <div v-show="detailsSelect.num == 4" class="line"></div>
            </li>
            <li ref="tip">
              <div class="menu-div-one" @click="tipPage">
                <div class="menu-div-two">
                  <img class="jump-img" :src="tipstate == 1 ? watchimg1 : (tipstate == 0 ? watchimg2 : watchimg3)" />
                </div>
                <span>小费</span>
              </div>
              <div v-show="detailsSelect.num == 3" class="line"></div>
            </li>
          </ul>
        </div>
      </div>
      <div class="main-info">
        <div class="info">
          <div v-if="detailsSelect.num == 0" class="watch-info">
            <div class="info-top">
              <div class="info-top-main">采购日期：
                <div class="main-container">
                  {{buy_date}}
                </div>
              </div>
              <div v-show="storeId > 0" style="display: flex;">
                <div class="store-name">店铺名称：
                  <div>
                    {{storeName}}
                  </div>
                </div>
                <div class="store-name">详情地址：
                  <div>
                    <span>{{storeAddr}}</span>
                    <el-tooltip class="item" effect="light" content="到这里" placement="top-end">
                      <img src="../../assets/imgs/goHere.png"
                        style="width: 20px;height: 20px;margin-left: 20px;cursor: pointer;" @click="goHere" />
                    </el-tooltip>
                  </div>
                </div>
              </div>
              <div v-show="storeId < 0" style="display: flex;">
                <div class="store-name">贸易商名称：
                  <div>
                    {{storeName}}
                  </div>
                </div>
                <div class="store-name">贸易商联系方式：
                  <div>
                    {{storeAddr == null || storeAddr == '' ? '无' : storeAddr}}
                  </div>
                </div>
              </div>
            </div>
            <Watch-info @listenWatchInfo="listenWatch"></Watch-info>
          </div>
          <Pay-page v-if="detailsSelect.num == 1" @listenPay="listenPay"></Pay-page>
          <Drawback-page v-if="detailsSelect.num == 2" @listenDrawback="listenDrawback"></Drawback-page>
          <Commission-page v-if="detailsSelect.num == 4" @listenCommission="listenCommission"></Commission-page>
          <Tip-page v-if="detailsSelect.num == 3" @listenTip="listenTip"></Tip-page>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
  export default {
    inject: ['reload'],
    data() {
      return {
        watches: [],
        watchstate: 0,
        paystate: 0,
        drawbackstate: 0,
        commissionstate: this.detailsSelect.buy_commState, // 佣金状态
        tipstate: 0,
        watchimg1: require("../../assets/imgs/sureImg.png"),
        watchimg2: require("../../assets/imgs/error.png"),
        watchimg3: require("../../assets/imgs/noContainer.png"),
        buy_date: '', // 采购日期
        storeId: 0, // 店铺id
        storeName: '', // 店铺名称
        storeAddr: '', // 店铺地址
        storeGPS: '', // 店铺GPS坐标
      }
    },
    mounted() {
      // console.log('传递个哦来的');
      // console.log(this.detailsSelect.num);
      if (this.detailsSelect.num == 0) {
        this.watchInfo()
      } else if (this.detailsSelect.num == 1) {
        this.payPage();
      } else if (this.detailsSelect.num == 2) {
        this.drawbackPage();
      } else if (this.detailsSelect.num == 4) {
        this.commissionPage();
      } else if (this.detailsSelect.num == 3) {
        this.tipPage();
      }
      this.detailState();
    },
    props: ["detailsSelect"],
    // watch: {
    //   watchstate() {
    //     this.$emit("changeMsg", this.watchstate);
    //   },
    //   paystate() {
    //     this.$emit("changeMsg", this.paystate);
    //   },
    //   drawbackstate() {
    //     this.$emit("changeMsg", this.drawbackstate);
    //   },
    //   tipstate() {
    //     this.$emit("changeMsg", this.tipstate);
    //   }
    // },
    methods: {
      // 返回我的采购商品列表页
      goback() {
        this.$emit("goback", 0);
        this.$emit('shippingState', 0);
        this.$emit("backbuy",0)
        

      },
      listenWatch(watchstate) {
        // console.log('详细信息填写页面');
        // console.log(watchstate);
        this.$emit("watchstate", watchstate);
        // this.watchstate = watchstate;
        this.detailState();
      },
      listenPay(paystate) {
        // console.log("详细信息付款");
        this.paystate = paystate;
      },
      listenDrawback(drawbackstate) {
        // console.log('详细信息填写页面退税');
        console.log(drawbackstate);
        this.drawbackstate = drawbackstate;
      },
      listenCommission(val) {
        this.commissionstate = val;
      },
      listenTip(tipstate) {
        this.tipstate = tipstate;
      },
      // 获取采购单详细信息
      detailState() {
        // console.log('获取采购单详细信息id');
        // console.log(sessionStorage.getItem("buy_id"));
        this.$axios.post(this.$store.state.baseUrl + '/BuyOrderGet?java', {
          buy_id: sessionStorage.getItem("buy_id")
        }).then((res) => {
          console.log('获取采购单详细信息');
          console.log(res.data);
          this.commissionstate = res.data.buy_commState;
          this.watches = res.data.watch;
          let ss = [];
          for (let state of this.watches) {
            // console.log('woshiyige粉刷匠');
            // console.log(state);
            ss.push(state.buy_watchState);
          }
          if (ss.indexOf(0) !== -1) {
            this.watchstate = 0;
          } else {
            this.watchstate = 1;
          }
          sessionStorage.setItem("watchstate", this.watchstate);
          // console.log(this.watchstate);
          // console.log('ffffffffffffffff');
          this.paystate = res.data.pay.buy_payState;
          this.drawbackstate = res.data.tax.buy_taxState;
          this.tipstate = res.data.fee.buy_feeState;
          this.buy_date = res.data.buy_date;
          this.storeId = res.data.storeId;
          this.storeName = res.data.storeName;
          this.storeAddr = res.data.storeAddr;
          this.storeGPS = res.data.storeGPS;
          // console.log(res.data);
          console.log('各数据状态');
          console.log(this.watchstate + "~~" + this.paystate + "~~" + this.drawbackstate + "~~" + this
            .commissionstate + "~~" + this.tipstate);
        })
      },
      // 到这里
      goHere() {
        if (this.storeGPS !== null && this.storeGPS !== '') {
          window.open('https://www.google.com/maps/dir/?api=1&language=zh-CN&origin=&destination=' + this.storeGPS,
            '_blank');
        } else {
          this.$message.error({
            message: '该店铺位置信息为空，无法为您规划路线',
            showClose: true,
            duration: 2000
          })
        }
      },
      watchInfo() {
        this.detailsSelect.num = 0;
        this.$refs.msg.style.color = "#000";
        this.$refs.pay.style.color = "#b7d6d1";
        this.$refs.drawback.style.color = "#b7d6d1";
        this.$refs.commission.style.color = "#b7d6d1";
        this.$refs.tip.style.color = "#b7d6d1";
      },
      payPage() {
        this.detailsSelect.num = 1;
        this.$refs.msg.style.color = "#b7d6d1";
        this.$refs.pay.style.color = "#000";
        this.$refs.drawback.style.color = "#b7d6d1";
        this.$refs.commission.style.color = "#b7d6d1";
        this.$refs.tip.style.color = "#b7d6d1";
      },
      drawbackPage() {
        this.detailsSelect.num = 2;
        this.$refs.msg.style.color = "#b7d6d1";
        this.$refs.pay.style.color = "#b7d6d1";
        this.$refs.drawback.style.color = "#000";
        this.$refs.commission.style.color = "#b7d6d1";
        this.$refs.tip.style.color = "#b7d6d1";
      },
      commissionPage() {
        this.detailsSelect.num = 4;
        this.$refs.msg.style.color = "#b7d6d1";
        this.$refs.pay.style.color = "#b7d6d1";
        this.$refs.drawback.style.color = "#b7d6d1";
        this.$refs.commission.style.color = "#000";
        this.$refs.tip.style.color = "#b7d6d1";
      },
      tipPage() {
        this.detailsSelect.num = 3;
        this.$refs.msg.style.color = "#b7d6d1";
        this.$refs.pay.style.color = "#b7d6d1";
        this.$refs.drawback.style.color = "#b7d6d1";
        this.$refs.commission.style.color = "#b7d6d1";
        this.$refs.tip.style.color = "#000";
      }
    },
  }
</script>
<style lang="scss" scoped>
  .border-style {
    border: 1px solid #0c8563;
  }

  .details-container {
    width: 95%;
    margin: 0 auto;

    .details {
      width: 100%;
      margin: 0 auto;

      .details-top {
        width: 83%;
        position: fixed;
        top: 80px;
        left: 324px;
        background-color: #fff;
        border-top: 1px solid #f3fbf9;
        z-index: 1;
      }
    }

    .details-bar {
      // margin-bottom: 50px;
      display: flex;
      justify-content: space-around;

      .goback {
        height: 60px;
        margin: 0 50px 0 50px;
        line-height: 60px;
        display: flex;
        justify-content: space-between;

        .back-img {
          width: 30px;
          margin-top: 7px;
          margin-right: 30px;
          cursor: pointer;
        }

        .goback-line {
          width: 2px;
          background-color: #f1f1f1;
          height: 30px;
          margin-top: 16px;
        }
      }



      .menu {
        width: 100%;
        margin: 0;
        padding-left: 0;
        padding-right: 50px;
        display: flex;
        justify-content: space-between;


        .menu-div-one {
          width: 80px;
          margin: 0 auto;
          display: flex;
        }

        .menu-div-two {
          height: 30px;
          margin-top: 3px;
          margin-right: 10px;
        }

        li {
          width: 200px;
          height: 60px;
          line-height: 60px;
          display: inline-block;
          list-style: none;
          color: #fff;
          font-size: 16px;
          text-align: center;
          cursor: pointer;
        }

        .jump-img {
          width: 20px;
          height: 20px;
        }

        .line {
          width: 200px;
          height: 2px;
          margin: 0 auto;
          background-color: #0c8563;
        }
      }
    }

    .main-info {
      width: 100%;
      margin-top: 70px;

      .info {
        width: 100%;
        margin-left: auto;
        margin-right: auto;

        .watch-info {
          padding: 30px;
          background-color: #fff;
          border-radius: 30px;

          .info-top {
            width: 100%;
            display: flex;

            .info-top-main {
              margin: 0;
              display: flex;
              line-height: 48px;

              .main-container {
                height: 46px;
                padding: 0 20px;
                line-height: 48px;
                border: 1px solid #b7d6d1;
                border-radius: 5px;
                text-align: left;
              }
            }

            .store-name {
              margin-left: 40px;
              display: flex;
              line-height: 48px;
            }

            .store-name>div {
              height: 46px;
              padding: 0 20px;
              line-height: 48px;
              border: 1px solid #b7d6d1;
              border-radius: 5px;
              text-align: left;
            }
          }
        }
      }
    }
  }
</style>