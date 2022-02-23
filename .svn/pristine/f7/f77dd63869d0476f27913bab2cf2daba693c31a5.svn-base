<template>
  <div class="shipping-container">
    <!-- 发货 -->
    <div v-show="shipping.msg == 0" id="search" style="margin-top: 75px;">
      <div v-show="shippingList.length == 0" ref="hello" style="text-align: center;">
        <p>{{hintMsg}}</p>
      </div>
      <div v-show="shippingList.length !== 0">
        <div style="margin-left: 20px;">
          <p style="margin-top: 0;margin-bottom: 20px;font-size: 18px;">
            <span>{{'商品数量:  ' + ' ' + totalNum + ' '}}</span>
            <span style="color: red;">(信息录入未完成的商品，不能进行发货)</span>
          </p>
        </div>
        <div class="sure">
          <input type="button" value="确 认" class="sure-button" @click="shippingSure">
        </div>
        <div v-for="(item,index) of shippingList" :key="index" class="mypurchase-table">
          <div class="purchase-row">
            <input class="selBtn" type="checkbox" v-model="hobby" :value="item"
              @change="purchaseCheckedChange($event,item,index)" @click="checkedClick(item,index)" :id="'all'+index">
            <p class="purchase-number">采购单号: {{"   " + item.buy_id}}</p>
            <p class="purchase-date">采购日期: {{item.buy_date}}</p>
          </div>
          <div class="div-table" :id="'check'+index">
            <table>
              <tr class="table-tr">
                <th class="table-th">选择发货</th>
                <th class="table-th first-img">图片</th>
                <th class="table-th">手表型号</th>
                <th class="table-th">机芯号</th>
                <th class="table-th">采购价</th>
                <th class="table-th">商品信息录入</th>
                <th class="table-th">操作</th>
              </tr>
              <tr v-for="(content,indexs) of item.watch" :key="indexs" class="table-tr-container">
                <td>
                  <input class="selBtn" type="checkbox" v-model="hobby" :value="content"
                    @change="checkedChange($event,content,index)"
                    :disabled="content.buy_watchState == 1 ? false : true">
                </td>
                <td style="padding: 20px;">
                  <img v-image-preview
                    :src="content.buy_watchPics == null || content.buy_watchPics == '' ? '' : img + '/img/watch/'+ (content.buy_watchPics || '').split('|')[0]"
                    style="width: 100px;height: 100px;object-fit: cover;" class="first-img" />
                </td>
                <td>
                  <p>{{content.buy_watchBrand}}</p>
                  <p>{{content.buy_watchModel}}</p>
                </td>
                <td>{{content.buy_watchSn}}</td>
                <td>{{content.buy_watchCurrency}} {{formatNumberRgx(content.buy_watchPrice)}}</td>
                <td>
                  <div style="display: flex;justify-content: center;">
                    <div>
                      <img :src="content.buy_watchState == 1 ? completeness1 : completeness2"
                        style="width: 20px;height: 20px;" />
                    </div>
                    <span style="margin-left: 3px;">{{content.buy_watchState == 1 ? "已完成" : "未完成"}}</span>
                  </div>
                </td>
                <td>
                  <el-button v-if="content.buy_watchState == 0" type="text" @click="fillMsg(item.buy_id)">完善信息
                  </el-button>
                  <el-button v-if="content.buy_watchState == 1" type="text" style="color: #c8c8c8;">无需填写</el-button>
                </td>
              </tr>
            </table>
          </div>
        </div>
        <div style="width: 100%;height: 80px;">
          <div style="margin:15px 0;position:absolute;left: 50px;">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page"
              layout="total, prev, pager, next, jumper" :total="total">
            </el-pagination>
          </div>
        </div>
      </div>

    </div>
    <div v-if="shipping.msg == 1">
      <Logistics-msg @logisticsMsg="logisticsMsg" @selecting="selecting"></Logistics-msg>
    </div>
    <div v-if="shipping.msg == 3">
      <Details @watchstate="changeMsg" @goback="goback" :detailsSelect="detailsSelect"></Details>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        hintMsg: '数据加载中...',
        keyword: '',
        img: this.$store.state.baseUrl,
        isChecked: [],
        shippingList: [],
        total: 0,
        page: 1,
        pageNum: 10,
        completeness1: require("../../assets/imgs/sureImg.png"),
        completeness2: require("../../assets/imgs/error.png"),
        detailsSelect: {
          id: 1,
          num: 0
        },
        hobby: [],
        filtrate: 2,
        totalNum: 0,

      }
    },
    created() {
      this.filtrate = this.shipping.filtrate;
      this.handleList();
    },
    props: ["shipping"],
    methods: {
      goback(val) {
        this.shipping.msg = 0;
        this.$emit('shippingState', 0);
        // this.handleList();
        console.log(this.keyword);
        this.stockInSearch();
      },
      // 本次发货完成后，重新加载页面
      logisticsMsg(val) {
        console.log("9999999999999999999");
        console.log(val);
        this.isChecked = [];
        // this.handleList();
        console.log(this.keyword);
        this.stockInSearch();
      },
      selecting(val) {
        this.shipping.msg = 0;
        this.$emit('shippingState', 0);
      },
      changeMsg(val) {
        this.handleList();
      },
      // 模糊查询
      stockInSearch() {
        if (this.keyword !== '') {
          this.shippingList = [];
          this.total = 0;
          this.totalNum = 0;
          this.hintMsg = '数据加载中...';
          this.$axios
            .post(this.$store.state.baseUrl + "/BuyOrderListEx", {
              page: this.page,
              pageNum: this.pageNum,
              type: this.filtrate,
              keyword: this.keyword
            })
            .then(res => {
              console.log("模糊搜索获取订单");
              console.log(res);
              this.shippingList = res.data.orders;
              console.log(this.shippingList);
              this.total = res.data.total;
              this.totalNum = res.data.watchTotal;
              if (this.shippingList.length == 0) {
                this.hintMsg = '啊哦~暂无数据'
              }
            });
        } else if (this.keyword == '') {
          this.page = 1;
          this.shippingList = [];
          this.total = 0;
          this.totalNum = 0;
          this.handleList();
        }
      },
      // 获取未发货商品列表
      handleList() {
        console.log('bbbbbbbbbb' + this.shipping.filtrate);
        this.hintMsg = '数据加载中...';
        this.$axios.post(this.$store.state.baseUrl + '/BuyOrderListEx', {
          page: this.page,
          pageNum: this.pageNum,
          type: this.filtrate
        }).then((res) => {
          console.log('pfgdgd');
          console.log(res);
          this.shippingList = res.data.orders;
          console.log(this.shippingList);
          this.total = res.data.total;
          this.totalNum = res.data.watchTotal;
          if (this.shippingList.length == 0) {
            this.hintMsg = '啊哦~暂无数据'
          }
        }).catch((err) => {
          console.log(err);
        })
      },
      // 选择发货商品
      checkedClick(content, index) {
        for (let item in content.watch) {
          if (content.watch[item].buy_watchState == 0) {
            console.log(document.getElementById('all' + index).checked);
            document.getElementById('all' + index).checked = false;
            this.$message.error({
              message: '该采购单下有手表信息未填写完成，不能全选，请填写手表信息',
              showClose: true,
              duration: 2000
            });
          }
        }
      },
      purchaseCheckedChange(e, content, index) {
        console.log('feng');
        console.log(e);
        console.log(content);
        for (let item in content.watch) {
          //单个每个复选按钮
          var chbs = document.getElementById('check' + index);
          chbs = chbs.querySelectorAll('table>tr>td:first-child>input');
          console.log(chbs);
          if (e.target.checked == true) {
            //4.修改元素
            for (let chb of chbs) {
              chb.checked = true;
            };
            console.log(JSON.stringify(this.isChecked).indexOf(JSON.stringify(content.watch[item])));
            if (JSON.stringify(this.isChecked).indexOf(JSON.stringify(content.watch[item])) === -1) {
              this.isChecked.push(content.watch[item]);
            }
          } else if (e.target.checked == false) {
            for (let chb of chbs) {
              chb.checked = false;
            };
            for (let i in this.isChecked) {
              if (this.isChecked[i].id == content.watch[item].id) {
                this.isChecked.splice(i, 1);
              }
            };
          };
        }

        sessionStorage.setItem("isSelected", JSON.stringify(this.isChecked));
        console.log('99000');
        console.log(this.isChecked);
      },
      checkedChange(e, content, index) {
        console.log('feng');
        console.log(e);
        console.log(content);
        console.log(index);
        let mainSelect = document.getElementById('all' + index);
        console.log(mainSelect);
        if (e.target.checked == true) {
          // if (this.isChecked.indexOf(content) === -1) {
          this.isChecked.push(content);
          // }
          var chbs = document.getElementById('check' + index);
          var unchecked = chbs.querySelector('table>tr>td:first-child>input:not(:checked)');
          if (unchecked == null) { //如果未选中的chb为空
            mainSelect.checked = true;
          } else {
            mainSelect.checked = false;
          }
        } else if (e.target.checked == false) {
          mainSelect.checked = false;
          for (let index in this.isChecked) {
            if (this.isChecked[index].id == content.id) {
              this.isChecked.splice(index, 1);

            }
          }
        }
        sessionStorage.setItem("isSelected", JSON.stringify(this.isChecked));
        console.log('99000');
        console.log(this.isChecked);
        // this.isChecked = [];
      },
      // 分页
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.page = val;
        console.log(this.page);
        if (this.keyword == '') {
          this.handleList();
        } else {
          this.stockInSearch();
        }
        // 换页回到顶部
        (function smoothscroll() {
          var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
          if (currentScroll > 0) {
            window.requestAnimationFrame(smoothscroll);
            window.scrollTo(0, currentScroll - (currentScroll / 5));
          }
        })()
        let selectedIs = document.getElementsByClassName("selBtn");
        for (let i = 0; i < selectedIs.length; i++) {
          selectedIs[i].checked = false;
        }
        console.log("hhhhhhhhh");
        console.log(selectedIs);
      },
      // 确认选择发货
      shippingSure() {
        console.log(this.isChecked);
        if (this.isChecked.length == 0) {
          this.$message.error({
            message: '请选择发货商品',
            showClose: true,
            duration: 2000
          })
        } else {
          this.shipping.msg = 1;
          this.$emit('shippingState', 1);
          console.log('2222');
          // 页面回到顶部
          (function smoothscroll() {
            var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
            if (currentScroll > 0) {
              window.requestAnimationFrame(smoothscroll);
              window.scrollTo(0, currentScroll - (currentScroll / 5));
            }
          })()
        }
      },
      // 完善信息
      fillMsg(buy_id) {
        console.log('完善信息id');
        console.log(buy_id);
        this.shipping.msg = 3;
        this.$emit('shippingState', 1);
        sessionStorage.setItem("buy_id", buy_id);
        console.log(buy_id);
        // 页面回到顶部
        (function smoothscroll() {
          var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
          if (currentScroll > 0) {
            window.requestAnimationFrame(smoothscroll);
            window.scrollTo(0, currentScroll - (currentScroll / 5));
          }
        })()
      }
    }
  }
</script>
<style lang="scss" scoped>
  .shipping-container {
    width: 100%;
    margin: 0 auto;

    .mypurchase-table {
      width: 100%;
      margin-bottom: 20px;
      background-color: #fff;
      border-radius: 20px;


      .purchase-row {
        padding-top: 30px;
        padding-left: 30px;
        display: flex;

        .purchase-number {
          margin: 0;
          margin-left: 20px;
          font-size: 18px;
          font-weight: bold;
        }

        .purchase-date {
          margin: 0;
          margin-left: 20px;
          color: #c8c8c8;
        }
      }


      .div-table {
        padding: 20px 30px;

        .table-tr {
          height: 40px;
          line-height: 40px;
          border-bottom: 0;

          .first-img {
            padding-left: 0;
          }

          .table-th {
            font-size: 17px;
            font-weight: normal;
          }
        }

        .table-tr-container {
          background-color: #fff;

          td {
            background-color: #f3fbf9;
            font-size: 15px;
          }

          .first-img {
            width: 100px;
            height: 100px;
            object-fit: cover;
            border-radius: 30px;
          }

          .jump-div {
            display: flex;
            cursor: pointer;

            .jump-img {
              width: 20px;
              height: 20px;
            }

            .button-mypurchase {
              border: 0;
              outline: none;
              color: #000;
            }
          }
        }
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
        width: 18%;
        text-align: center;
        border: 0;
      }
    }
  }

  input[type=checkbox] {
    width: 18px;
    height: 18px;
    cursor: pointer;
    position: relative;
    width: 15px;
    height: 15px;
    font-size: 15px;
  }

  input[type=checkbox]::after {
    position: absolute;
    top: 0;
    background-color: #fff;
    color: #000;
    width: 15px;
    height: 15px;
    display: inline-block;
    visibility: visible;
    padding-left: 0px;
    text-align: center;
    content: ' ';
    border: 1px solid #c8c8c8;
    border-radius: 3px
  }

  input[type=checkbox]:disabled::after {
    content: ' ';
    border: 1px solid #c8c8c8;
    border-radius: 3px;
    background-color: #ddd;
    cursor: not-allowed;
  }

  input[type=checkbox]:checked::after {
    content: "✓";
    font-size: 13px;
    font-weight: bolder;
  }

  .sure {
    width: 100%;
    position: fixed;
    top: 92%;
    left: 72%;

    .sure-button {
      width: 15%;
      height: 45px;
      background-color: #0c8563;
      color: #fff;
      border: 0;
      border-radius: 30px;
      outline: none;
      font-size: 15px;
      cursor: pointer;
    }
  }
</style>
<style lang="scss">
  // .el-checkbox__input.is-checked .el-checkbox__inner,
  // .el-checkbox__input.is-indeterminate .el-checkbox__inner {
  //   background-color: #2d4e65;
  //   border-color: #2d4e65;
  // }
</style>