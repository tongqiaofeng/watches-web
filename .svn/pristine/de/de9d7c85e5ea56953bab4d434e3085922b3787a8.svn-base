<template>
  <div class="product-list-container">
    <div class="product-container">
      <div v-if="deliveryList.delivery == 0">
        <div class="back-img" @click="gobackNotOutbound">
          <div>
            <img src="../../assets/imgs/goback.png" />
          </div>
          <span class="font">返回</span>
        </div>
        <div v-if="productWatchList">
          <div v-for="(items,index) of productWatchList" :key="index" class="product-table">
            <table>
              <tr>
                <th>图片</th>
                <th>保卡日期</th>
                <th>状态</th>
                <th>物流状态</th>
                <th>销售状态</th>
                <th>
                  {{items.sell_state == 1 ? '销售员' : (items.log_state == 0 ? '采购时间' : (items.log_state == 1 ? '预计到达时间' : ''))}}
                </th>
                <th>库存信息</th>
              </tr>
              <tr>
                <td>
                  <img v-image-preview
                    :src="items.watchPics == null || items.watchPics == '' ? '' : img + '/img/watch/'+ (items.watchPics || '').split('|')[0]"
                    class="first-img" />
                </td>
                <td>{{items.buy_watchCard}}</td>
                <td>
                  <div v-for="(stateCon,index) of items.watchState.split('|')" :key="index">
                    <p>{{stateCon}}</p>
                  </div>
                </td>
                <td>
                  {{items.log_state == 0 ? '采购中' : (items.log_state == 1 ? '运输中' : '已入库')}}
                </td>
                <td>
                  {{items.sell_state == 1 ? '已出售' : '未出售'}}
                </td>
                <td>
                  {{items.sell_state == 1 ? items.sell_userNick : (items.log_state == 0 ? items.buy_date : (items.log_state == 1 ? items.log_arriveTime : ''))}}
                </td>
                <td>
                  <div v-show="items.log_state !== 2">
                    <span style="font-size: 15px;">当前商品未入库，暂无库存信息</span>
                  </div>
                  <div v-show="items.log_state == 2">
                    <span @click="inventoryInfo(items.id)"
                      style="font-size: 15px;color: #0aa1ed;cursor: pointer;">查看库存信息</span>
                  </div>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <div v-if="deliveryList.delivery == 1" class="list-details">
        <!-- 手表库存信息页 -->
        <div class="back-img" @click="gobackDeliveryOne">
          <div>
            <img src="../../assets/imgs/goback.png" />
          </div>
          <span class="font">返回</span>
        </div>
        <div style="margin: 0 auto;display: flex;justify-content: center;" class="style-margin">
          <!--  + '/img/watch/' -->
          <div v-for="(imgurl,index) in imgs" :key="index" style="margin-right: 5px;">
            <img v-show="imgurl !== ''" :src="img +  imgurl" style="width: 150px;height: 150px;object-fit: cover;"
              class="first-img" />
          </div>
        </div>
        <div class="list-top">
          <div class="style-margin">
            <span>
              货号：
              <span>{{stockwatchinfo.stock_No}}</span>
            </span>
          </div>
          <div class="style-margin" style="display: flex;">
            <span>仓库货架号：</span>
            <span style="margin: 0 30px 0 10px;">{{stockwatchinfo.stock_shelfNo_A}}</span>
            <img src="../../assets/imgs/update.png" style="width: 20px;height: 20px;margin-right: 0.5%;" />
            <span @click="updateStockShelfNoA" style="cursor: pointer;color: #0aa1ed;font-size: 15px;">修改</span>
            <el-dialog title="修改货架号" :visible.sync="dialogShelfNoAVisible" center>
              <div>
                <el-form label-width="120px">
                  <el-form-item label="新的货架号：">
                    <el-input v-model="stock_shelfNo_A"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div slot="footer">
                <el-button @click="dialogShelfNoAVisible = false">取 消</el-button>
                <el-button type="primary" @click="ShelfNoASure" v-preventClick>确 定</el-button>
              </div>
            </el-dialog>
          </div>
          <div class="style-margin" v-if="stockwatchinfo == 1">
            <span>
              出售状态：
              <span>已被 {{stockwatchinfo.sell_userNick}} 出售</span>
            </span>
          </div>
        </div>
        <div class="list-center">
          <div>
            <div style="margin: 30px 0;display: flex;justify-content: space-between;">
              <div style="width: 33%;display: flex;">
                <span>品牌：</span>
                <span>{{stockwatchinfo.buy_watchBrand}}</span>
              </div>
              <div style="width: 33%;display: flex;">
                <span>型号：</span>
                <span>{{stockwatchinfo.buy_watchModel}}</span>
              </div>
              <div style="width: 33%;display: flex;">
                <span>库存：</span>
                <span>{{stockwatchinfo.watch_Num}}</span>
              </div>
            </div>
            <div style="display: flex;justify-content: space-between;">
              <div style="width: 33%;display: flex;">
                <span>机芯号：</span>
                <span>{{stockwatchinfo.buy_watchSn}}</span>
              </div>
              <div style="width: 33%;display: flex;">
                <span>保卡日期：</span>
                <span>{{stockwatchinfo.buy_watchCard}}</span>
              </div>
              <div style="width: 33%;display: flex;">
                <span>状态：</span>
                <div style="display: flex;">
                  <div v-for="(con,index) of watchState" :key="index">
                    <div class="state" v-if="con !== ''">
                      <span style="font-size: 13px;">{{con}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <el-form label-width="120px" style="margin: 20px 0; text-align: center;">
              <el-row>
                <el-col :span="12">
                  <el-button
                    style="width: 300px;margin-top: 30px;background-color:#f3fbf9;border:1px solid #f3fbf9;font-size: 14px;color:#2c3e50;"
                    @click="checkWatch">查看与此手表同型号的未出库的手表</el-button>
                </el-col>
                <el-col :span="12">
                  <el-button type="primary" @click="getQRCode" v-preventClick
                    style="width: 300px;margin-top: 30px;font-size: 14px;">
                    打印二维码</el-button>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        img: this.$store.state.baseUrl,
        productWatchList: this.watchList,
        dialogShelfNoAVisible: false,
        id: "", // 手表在进销存库中的id
        stock_shelfNo_A: "", // 新的手表仓库货架号
        dialogVisible: false,
        stockwatchinfo: {}, //手表库存信息
        watchState: [],
        imgs: [],
        watchid: 0, // 手表id
        stockWatchList: [], // 同型号手表
        buy_watchBrand: '',
        buy_watchModel: '',
        stock_No: '',
        stock_NoCrc: '',

      };
    },
    props: ["deliveryList", "watchList"],
    methods: {
      // 返回上一层
      gobackNotOutbound() {
        this.$emit("gobackNotOutbound", 0);
      },
      // 获取手表库存信息
      inventoryInfo(id) {
        console.log("55555");
        console.log(id);
        this.id = id;
        this.imgs = [];
        this.$axios
          .post(this.$store.state.baseUrl + "/Stockwatchinfo", {
            id: this.id
          })
          .then(res => {
            console.log("手表库存信息");
            console.log(res);
            this.stockwatchinfo = res.data;
            this.watchState = this.stockwatchinfo.watchState.split("|");
            // 手表id  buy_watchId 用于获取同品牌未出库手表列表
            this.watchid = this.stockwatchinfo.buy_watchId;
            if (this.stockwatchinfo.stock_inPic !== '' && this.stockwatchinfo.stock_inPic !== null) {
              if (this.stockwatchinfo.stock_inPic.indexOf('|') !== -1) {
                this.imgs = this.stockwatchinfo.stock_inPic.split("|");
              } else {
                this.imgs.push(this.stockwatchinfo.stock_inPic);
              }
            }
            console.log(this.imgs);
            this.buy_watchBrand = this.stockwatchinfo.buy_watchBrand;
            this.buy_watchModel = this.stockwatchinfo.buy_watchModel;
            this.stock_No = this.stockwatchinfo.stock_No;
            this.stock_NoCrc = this.stockwatchinfo.stock_NoCrc;
            this.deliveryList.delivery = 1;
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
          });
      },
      // 返回手表列表
      gobackDeliveryOne() {
        this.deliveryList.delivery = 0;
      },
      // 修改货架号
      updateStockShelfNoA() {
        this.stock_shelfNo_A = '';
        this.dialogShelfNoAVisible = true;
      },
      // 确认修改货架号
      ShelfNoASure() {
        this.$axios
          .post(this.$store.state.baseUrl + "/StockShelfNoModify", {
            id: this.id,
            stock_shelfNo_A: this.stock_shelfNo_A
          })
          .then(res => {
            console.log("修改货架号");
            console.log(res);
            this.$message.success({
              message: "货架号修改成功",
              showClose: true,
              duration: 2000
            });
            this.stockwatchinfo.stock_shelfNo_A = this.stock_shelfNo_A;
            this.dialogShelfNoAVisible = false;
          })
          .catch(err => {
            console.log(err);
          });
      },
      // 获取未出库的同型号手表的列表
      checkWatch() {
        console.log(this.watchid);
        this.$axios
          .post(this.$store.state.baseUrl + "/StockWatchList", {
            buy_watchId: this.watchid
          })
          .then(res => {
            console.log(res);
            this.stockWatchList = res.data;
            this.productWatchList = this.stockWatchList;
            console.log(this.productWatchList);
            this.deliveryList.delivery = 0;
            // sessionStorage.setItem('watchList', JSON.stringify(this.stockWatchList));
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
          });
      },
      //生成分享二维码
      getQRCode() {
        this.$axios.post('http://127.0.0.1:8079', {
          CMD: "1",
          CMDDATA: this.buy_watchBrand + '`' + this.buy_watchModel + '`' + this.stock_No + '-A`' + this.stock_No +
            '-A|' + this.stock_NoCrc
        }).then((res) => {
          console.log(res);
          this.$message.success({
            message: '条码打印成功',
            showClose: true,
            duration: 2000
          })
        }).catch((err) => {
          console.log(err);
          this.$message.error({
            message: err.data.message,
            showClose: true,
            duration: 2000
          })
        })
      },
    }
  };
</script>
<style lang="scss" scoped>
  .product-list-container {
    width: 100%;

    .product-container {
      width: 95%;
      margin: 0 auto;

      .back-img {
        width: 75px;
        height: 45px;
        margin-bottom: 20px;
        line-height: 45px;
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

      .product-table {
        margin-bottom: 20px;
        padding: 30px;
        background-color: #fff;
        border-radius: 30px;
      }

      td {
        height: 60px;
        margin: 10px 0;
        padding: 10px;
        background-color: #f3fbf9;
        font-size: 15px;
      }

      .first-img {
        width: 100px;
        height: 100px;
        border-radius: 30px;
        object-fit: cover;
      }

      .list-details {
        padding: 20px 30px;
        background-color: #fff;
        border-radius: 30px;

        .style-margin {
          margin: 15px 0;
        }

        .list-top {
          border-bottom: 2px solid #000;
        }

        .list-center {
          .state {
            width: 40px;
            height: 20px;
            margin: 0 5px;
            line-height: 16.5px;
            text-align: center;
            background-color: #0aa1ed;
            border: 1px solid #0aa1ed;
            border-radius: 5px;
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
        width: 21%;
        text-align: center;
        border: 0;
      }
    }
  }
</style>
<style lang="scss">
  .el-form-item__label {
    text-align: left;
  }
</style>