<template>
  <div class="tip-container">
    <div class="drawback-top">
      <div class="top-form">
        <span class="top-span">是否有小费</span>
        <el-switch v-model="buyFeeState" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
      </div>
    </div>
    <div v-if="buyFeeState == true" class="tip-center">
      <el-form label-width="10%">
        <el-form-item label="小费日期：">

          <el-date-picker v-model="buyFeeTime" type="date" class="input-style"></el-date-picker>
        </el-form-item>
        <el-form-item label="小费金额：">
          <el-input v-model="buyFeeMoney" class="input-style">
            <i slot="suffix" style="color: #000;margin-right:5%;font-style:normal;">{{buyFeeCurrency}}</i>
          </el-input>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input type="textarea" :autosize="{ minRows: 6}" placeholder="请输入备注内容" v-model="buyFeeNote"
            class="input-style"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="drawback-submit">
      <el-button type="primary" @click="submitTip" v-preventClick>保 存</el-button>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {

        buyFeeState: true, // 是否有小费
        buyFeeTime: new Date(), // 小费时间
        buyFeeMoney: "", // 小费金额
        buyFeeCurrency: "", // 小费金额币种
        buyFeeNote: "" // 小费备注
      };
    },
    created() {
      this.acquire();
    },
    methods: {
      acquire() {
        this.$axios
          .post(this.$store.state.baseUrl + "/BuyOrderGet?java", {
            buyId: sessionStorage.getItem("buyId")
          })
          .then(res => {
            for (let item of res.data.watch) {

              this.buyFeeCurrency = item.buyWatchCurrency;
            };
            if (res.data.fee.buyFeeState == -1) {
              this.buyFeeState = false;
            } else if (res.data.fee.buyFeeState == 0 || res.data.fee.buyFeeState == 1) {
              this.buyFeeState = true;
              this.buyFeeTime = res.data.fee.buyFeeTime;
              this.buyFeeMoney = res.data.fee.buyFeeMoney;
              this.buyFeeNote = res.data.fee.buyFeeNote;
            }
          });
      },
      // 保存提交小费信息
      submitTip() {
        this.$axios
          .post(this.$store.state.baseUrl + "/BuyFeeSave", {

            buyId: sessionStorage.getItem("buyId"),
            buyFeeState: this.buyFeeState == true ? 1 : -1,
            buyFeeTime: this.buyFeeState == true ? this.shellDate(this.buyFeeTime) : "",
            buyFeeMoney: this.buyFeeState == true ? this.buyFeeMoney : "",
            buyFeeCurrency: this.buyFeeState == true ? this.buyFeeCurrency : "",
            buyFeeNote: this.buyFeeState == true ? this.buyFeeNote : ""
          })
          .then(res => {
            console.log("小费信息提交成功");
            console.log(res);
            this.$emit("listenTip", res.data.buyFeeState);
            this.$message.success({
              message: "小费信息保存成功",
              showClose: true,
              duration: 2000
            });
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
          .catch(err => {
            console.log(err);
            this.$message.error({
              message: err.data.message,
              showClose: true,
              duration: 2000
            });
          });
      }
    }
  };
</script>
<style lang="scss" scoped>
  .tip-container {
    width: 100%;

    .drawback-top {
      width: 100%;

      .top-form {
        width: 190px;
        height: 80px;
        padding-left: 40px;
        line-height: 80px;
        background-color: #fff;
        border-radius: 30px;

        .top-span {
          margin-right: 15px;
          font-size: 22px;
        }
      }
    }

    .tip-center {
      width: 100%;
      margin: 40px 0;
      padding: 40px 0;
      background-color: #fff;
      border-radius: 30px;

      .input-style {
        width: 50% !important;
      }
    }

    .drawback-submit {
      width: 100%;
      margin-top: 30px;
      text-align: right;

      img {
        cursor: pointer;
      }
    }
  }
</style>
<style lang="scss">
  .el-form-item__label {
    font-size: 16px;
  }
</style>