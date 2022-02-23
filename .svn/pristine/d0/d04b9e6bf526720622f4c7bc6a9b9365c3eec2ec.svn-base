<template>
  <div>
    <!-- <h3>佣金页面</h3> -->
    <div class="drawback-top">
      <div class="top-form">
        <span class="top-span">是否有佣金</span>
        <el-switch v-model="buy_commState" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
      </div>
    </div>
    <div class="comm-main" v-show="buy_commState == true">
      <div v-for="(item,index) in commissionList" :key="index" class="commTable">
        <h4>{{item.buy_watchBrand + ' - ' + item.buy_watchModel}}</h4>
        <p>
          不含税价： {{formatNumberRgx(item.buy_noTaxMoney)}}
          <span>{{item.buy_commCurrency == null ? '' : item.buy_commCurrency}}</span>
        </p>
        <el-form label-width="120px">
          <el-form-item label="佣金比例：">
            <!-- :disabled="item.buy_noTaxMoney == 0 ? true : false" -->
            <el-input v-model="commSubmitList[index].commProp" class="input-style"
              @focus="judgeNoTax(item.buy_noTaxMoney)" @input="propChange(item.buy_noTaxMoney,item.id,index)">
              <i slot="suffix" style="color: #000;margin-right:5%;font-style:normal;">%</i>
            </el-input>
          </el-form-item>
          <el-form-item label="佣金金额：">
            <el-input v-model="commSubmitList[index].buy_commMoney" class="input-style"
              @focus="judgeNoTax(item.buy_noTaxMoney)" @input="moneyChange(item.buy_noTaxMoney,item.id,index)">
              <i slot="suffix"
                style="color: #000;margin-right:5%;font-style:normal;">{{item.buy_commCurrency == null ? '' : item.buy_commCurrency}}</i>
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="sum-style">
        <span>佣金总金额：<span>{{commSum + ' ' + currency}}</span></span>
      </div>
      <div>
        <span>是否有已收到佣金</span>
        <el-switch v-model="buy_commStateOn" active-color="#13ce66" inactive-color="#ff4949" style="margin-left: 10px;">
        </el-switch>
      </div>
    </div>
    <div style="width: 100%;margin-top: 50px;text-align: right;">
      <el-button type="primary" @click="commissionSubmit" v-preventClick>保 存</el-button>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        commissionList: [],
        buy_commState: true, // 是否有佣金
        commSubmitList: [],
        commProp: '', // 佣金比例
        buy_commMoney: '', // 佣金金额
        commSum: '', // 佣金总金额
        buy_commStateOn: false, // 是否有已收到佣金
        currency: '',
        NoTaxMoney: 0, // 不含税价

      }
    },
    mounted() {
      this.handleCommission();
    },
    methods: {
      // 获取佣金信息
      handleCommission() {
        this.$axios.post(this.$store.state.baseUrl + '/BuyOrderGet?java', {
          buy_id: sessionStorage.getItem("buy_id")
        }).then((res) => {
          console.log('获取佣金信息');
          console.log(res);
          if (res.data.buy_commState == -1) {
            this.buy_commState = false;
          } else if (res.data.buy_commState == 0) {
            this.buy_commState = true;
            this.buy_commStateOn = false;
          } else if (res.data.buy_commState == 1) {
            this.buy_commState = true;
            this.buy_commStateOn = true;
          }
          this.commissionList = res.data.watch;
          this.commSum = 0;
          console.log(this.commissionList);
          for (let i = 0; i < this.commissionList.length; i++) {
            this.commSubmitList.push({
              id: this.commissionList[i].id,
              commProp: this.commissionList[i].buy_commMoney == 0 || this.commissionList[i].buy_commMoney ==
                null ? '' : Number(this.commissionList[i]
                  .buy_commMoney / this.commissionList[i].buy_noTaxMoney *
                  100)
                .toFixed(2),
              buy_commMoney: this.commissionList[i].buy_commMoney == 0 || this.commissionList[i]
                .buy_commMoney == null ? '' : this.commissionList[i]
                .buy_commMoney
            });
            console.log(this.commissionList[i].buy_commMoney);
            this.commSum += Number(this.commissionList[i].buy_commMoney);
            console.log(this.commSum);
          };
          this.commSum = this.commSum.toFixed(2);
          for (let item of this.commissionList) {
            if (item.buy_commCurrency !== null) {
              this.currency = item.buy_commCurrency;
            } else {
              this.currency = '';
            }
          }
        }).catch((err) => {
          console.log(err);
        })
      },
      // 判断是否可录入佣金
      judgeNoTax(buy_noTaxMoney) {
        console.log(buy_noTaxMoney);
        if (buy_noTaxMoney == 0 || buy_noTaxMoney === null) {
          this.$message.warning({
            message: '录入退税信息后，方可录入佣金信息',
            showClose: true,
            duration: 2000
          })
        }
      },
      // 佣金比例变化
      propChange(NoTaxMoney, id, index) {
        this.commSubmitList[index].buy_commMoney = Number(NoTaxMoney * (this.commSubmitList[index].commProp / 100))
          .toFixed(2);
        console.log(this.commSubmitList[index].buy_commMoney);
        this.commSubmitList.splice(index, 1, {
          id: id,
          commProp: this.commSubmitList[index].commProp,
          buy_commMoney: this.commSubmitList[index].buy_commMoney
        });
        console.log(this.commSubmitList);
        this.commSum = 0;
        for (let items of this.commSubmitList) {
          this.commSum += Number(items.buy_commMoney);
        };
        this.commSum = this.commSum.toFixed(2);
      },
      // 佣金金额变化
      moneyChange(NoTaxMoney, id, index) {
        this.commSubmitList[index].commProp = Number(this.commSubmitList[index].buy_commMoney / NoTaxMoney * 100)
          .toFixed(2);
        console.log(this.commSubmitList[index].commProp);
        this.commSubmitList.splice(index, 1, {
          id: id,
          commProp: this.commSubmitList[index].commProp,
          buy_commMoney: this.commSubmitList[index].buy_commMoney
        });
        console.log(this.commSubmitList);
        this.commSum = 0;
        for (let items of this.commSubmitList) {
          this.commSum += Number(items.buy_commMoney);
        };
        this.commSum = this.commSum.toFixed(2);
      },
      // 保存佣金信息
      commissionSubmit() {
        let params = {};
        if (this.buy_commState == true) {
          params = {
            buy_id: sessionStorage.getItem("buy_id"),
            buy_commState: this.buy_commState == false ? -1 : (this.buy_commStateOn == true ? 1 : 0),
            buy_comm: this.commSubmitList
          }
        } else {
          params = {
            buy_id: sessionStorage.getItem("buy_id"),
            buy_commState: this.buy_commState == false ? -1 : (this.buy_commStateOn == true ? 1 : 0),
          }
        }
        this.$axios.post(this.$store.state.baseUrl + '/BuyCommSave?java', params).then((res) => {
          console.log('提交佣金信息');
          console.log(res);
          this.$message.success({
            message: '佣金信息提交成功',
            showClose: true,
            duration: 2000
          });
          this.$emit("listenCommission", res.data.buy_commState);
          // 页面回到顶部
          (function smoothscroll() {
            var currentScroll =
              document.documentElement.scrollTop || document.body.scrollTop;
            if (currentScroll > 0) {
              window.requestAnimationFrame(smoothscroll);
              window.scrollTo(0, currentScroll - currentScroll / 5);
            }
          })();
        }).catch((err) => {
          this.$message.error({
            message: err.message,
            showClose: true,
            duration: 2000
          })
        });
      },
    },
  }
</script>
<style lang="scss" scoped>
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

  .comm-main {
    margin-top: 30px;
    padding: 30px;
    padding-left: 40px;
    background-color: #fff;
    border-radius: 30px;

    .commTable {
      width: 60%;
      margin: 20px 0;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 30px;
    }

    .sum-style {
      width: 60%;
      margin-bottom: 30px;
      // text-align: right;
    }
  }
</style>