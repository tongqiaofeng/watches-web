<template>
  <div class="tip-container">
    <div class="drawback-top">
      <div class="top-form">
        <span class="top-span">是否有小费</span>
        <el-switch v-model="buy_feeState" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
      </div>
    </div>
    <div v-if="buy_feeState == true" class="tip-center">
      <el-form label-width="10%">
        <el-form-item label="小费日期：">
          <el-date-picker v-model="buy_feeTime" type="date" class="input-style"></el-date-picker>
        </el-form-item>
        <el-form-item label="小费金额：">
          <el-input v-model="buy_feeMoney" class="input-style">
            <i slot="suffix" style="color: #000;margin-right:5%;font-style:normal;">{{buy_feeCurrency}}</i>
          </el-input>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input type="textarea" :autosize="{ minRows: 6}" placeholder="请输入备注内容" v-model="buy_feeNote"
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
        buy_feeState: true, // 是否有小费
        buy_feeTime: new Date(), // 小费时间
        buy_feeMoney: "", // 小费金额
        buy_feeCurrency: "", // 小费金额币种
        buy_feeNote: "" // 小费备注
      };
    },
    created() {
      this.acquire();
    },
    methods: {
      acquire() {
        this.$axios
          .post(this.$store.state.baseUrl + "/BuyOrderGet?java", {
            buy_id: sessionStorage.getItem("buy_id")
          })
          .then(res => {
            for (let item of res.data.watch) {
              this.buy_feeCurrency = item.buy_watchCurrency;
            };
            if (res.data.fee.buy_feeState == -1) {
              this.buy_feeState = false;
            } else if (res.data.fee.buy_feeState == 0 || res.data.fee.buy_feeState == 1) {
              this.buy_feeState = true;
              this.buy_feeTime = res.data.fee.buy_feeTime;
              this.buy_feeMoney = res.data.fee.buy_feeMoney;
              this.buy_feeNote = res.data.fee.buy_feeNote;
            }
          });
      },
      // 保存提交小费信息
      submitTip() {
        this.$axios
          .post(this.$store.state.baseUrl + "/BuyFeeSave", {
            buy_id: sessionStorage.getItem("buy_id"),
            buy_feeState: this.buy_feeState == true ? 1 : -1,
            buy_feeTime: this.buy_feeState == true ? this.shellDate(this.buy_feeTime) : "",
            buy_feeMoney: this.buy_feeState == true ? this.buy_feeMoney : "",
            buy_feeCurrency: this.buy_feeState == true ? this.buy_feeCurrency : "",
            buy_feeNote: this.buy_feeState == true ? this.buy_feeNote : ""
          })
          .then(res => {
            console.log("小费信息提交成功");
            console.log(res);
            this.$emit("listenTip", res.data.buy_feeState);
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