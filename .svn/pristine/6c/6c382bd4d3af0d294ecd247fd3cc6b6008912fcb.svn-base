<template>
  <div>
    <!-- <h1>待售品牌手表</h1> -->
    <div class="for-sale-list-container" v-if="forSaleSel.select == 0">
      <div class="back-img" style="margin-top: 0;" @click="gobackForSale">
        <div>
          <img src="../../assets/imgs/goback.png" />
        </div>
        <span class="font">返回</span>
      </div>
      <table v-for="(item,index) of forSaleWatchList.watch" :key="index" class="list-table">
        <tr>
          <th>图片</th>
          <th>货号</th>
          <th v-if="item.log_state == 1 || item.log_state == 2">仓库</th>
          <th>保卡日期</th>
          <th>商品状态</th>
          <th v-if="item.log_state == 0 || item.log_state == 1">{{item.log_state == 0 ? '采购时间' : '预计到库时间'}}</th>
          <th>状态</th>
          <th>操作</th>
        </tr>
        <tr>
          <td>
            <!-- item.watchPics -->
            <img v-image-preview
              :src="forSaleWatchList.buy_watchPics == null || forSaleWatchList.buy_watchPics == '' ? '' : img + '/img/watch/'+ (forSaleWatchList.buy_watchPics || '').split('|')[0]"
              style="width: 100px;height: 100px;object-fit: cover;border-radius: 30px;" />
          </td>
          <td>{{item.stock_No}}</td>
          <td v-if="item.log_state == 1 || item.log_state == 2">{{item.log_warehouse}}</td>
          <td>{{item.buy_watchCard}}</td>
          <td>
            <p>{{item.watchState}}</p>
          </td>
          <td v-if="item.log_state == 0 || item.log_state == 1">
            {{item.log_state == 0 ? item.buy_date : (item.log_state == 1 ? item.log_arriveTime: '')}}</td>
          <td>{{item.log_state == 0 ? '采购中' : (item.log_state == 1 ? '运输中' : '已入库')}}</td>
          <td>
            <el-button type="text" @click="sellWatch(item.id,index,item.log_state)">出售</el-button>
          </td>
        </tr>
      </table>
    </div>
    <div v-if="forSaleSel.select == 1" class="for-sale-main">
      <div class="back-img" @click="gobackList">
        <div>
          <img src="../../assets/imgs/goback.png" />
        </div>
        <span class="font">返回</span>
      </div>
      <div style="text-align: left;">
        <div>
          <el-form label-width="120px">
            <el-form-item label="型号：">
              <span>{{forSaleWatchList.buy_watchBrand +'-'+ forSaleWatchList.buy_watchModel}}</span>
            </el-form-item>
            <el-form-item label="销售日期：">
              <el-date-picker v-model="sell_time" type="date" class="input-style"></el-date-picker>
            </el-form-item>
            <el-form-item label="销售金额：">
              <el-input type="text" v-model="sell_money" class="input-style">
                <i slot="suffix" style="color: #000;margin-right:5%;font-style:normal;">HKD</i>
              </el-input>
            </el-form-item>
            <el-form-item label="客户名称：">
              <el-input v-model="sell_custom" placeholder="点击选择客户" @focus="clientSelect" class="input-style">
              </el-input>
            </el-form-item>
          </el-form>
        </div>
        <div>
          <div class="top-form">
            <span class="top-span">是否全款：</span>
            <el-switch v-model="sell_payFull" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </div>
          <div v-if="sell_payFull == false" style="width: 75%;">
            <div style="margin: 20px;padding: 20px;border: 1px solid #000;border-radius: 30px;">
              <p>定金：</p>
              <el-form label-width="120px">
                <el-form-item label="付款日期：">
                  <el-date-picker v-model="sell_payTime1" type="date" class="input-style"></el-date-picker>
                </el-form-item>
                <el-form-item label="付款金额：">
                  <el-input type="text" v-model="sell_payMoney1" class="input-style">
                    <i slot="suffix" style="color: #000;margin-right:5%;font-style:normal;">HKD</i>
                  </el-input>
                </el-form-item>
              </el-form>
            </div>
            <div style="margin: 20px;padding: 20px;border: 1px solid #000;border-radius: 30px;">
              <p>尾款：</p>
              <el-form label-width="120px">
                <el-form-item label="付款日期：">
                  <el-date-picker v-model="sell_payTime2" type="date" class="input-style"></el-date-picker>
                </el-form-item>
                <el-form-item label="付款金额：">
                  <el-input type="text" v-model="sell_payMoney2" class="input-style">
                    <i slot="suffix" style="color: #000;margin-right:5%;font-style:normal;">HKD</i>
                  </el-input>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <div v-if="sell_payFull == true" style="width: 75%;">
            <div style="margin: 20px;padding: 20px;border: 1px solid #000;border-radius: 30px;">
              <el-form label-width="120px">
                <el-form-item label="付款日期：">
                  <el-date-picker v-model="sell_payTime1" type="date" class="input-style"></el-date-picker>
                </el-form-item>
                <el-form-item label="付款金额：">
                  <el-input type="text" v-model="sell_payMoney1" class="input-style">
                    <i slot="suffix" style="color: #000;margin-right:5%;font-style:normal;">HKD</i>
                  </el-input>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <div style="margin: 20px;">
            <p>备注：</p>
            <el-input class="input-style" type="textarea" v-model="sell_note" placeholder="请输入备注信息"></el-input>
          </div>
        </div>
        <!-- <div v-if="logState == 2"> -->
        <div v-if="logState == 2 && options.text !== ''" style="text-align: center;">
          <div v-qr="options" v-if="options"></div>
          <p>提货二维码</p>
        </div>
        <!-- </div> -->
        <div style="margin-top: 30px;text-align: center;">
          <el-button type="primary" @click="sellOrderSave" style="margin: 0 auto;" v-preventClick>保 存</el-button>
        </div>
      </div>
    </div>
    <div v-if="forSaleSel.select == 2" class="for-sale-main">
      <div class="peer-container">
        <!-- <h3>贸易商管理</h3> -->
        <div class="peer-top">
          <div class="back-img" style="margin-left: 0;" @click="gobackForSaleList">
            <div>
              <img src="../../assets/imgs/goback.png" />
            </div>
            <span class="font">返回</span>
          </div>
          <div class="peer-top-right">
            <div class="stockSearch">
              <!-- 型号：模糊查找    品牌：全匹配class="el-input__inner" -->
              <el-input style="font-size: 14px;" placeholder="可输入客户名称进行查找" class="input-search"
                prefix-icon="el-icon-search" v-model="keyword" @input="stockInSearch"></el-input>
            </div>
            <div class="addBtn">
              <el-button @click="addPeer" class="add-btn">
                <i class="add-i">+</i>
                添加客户
              </el-button>
              <el-dialog title="新增客户" :visible.sync="dialogAddPeerVisible" center :close-on-press-escape="false"
                :close-on-click-modal="false">
                <el-form label-width="120px">
                  <el-form-item label="类型：" required>
                    <el-radio-group v-model="type">
                      <el-radio :label="0">贸易商公司</el-radio>
                      <el-radio :label="1">贸易商个体</el-radio>
                      <el-radio :label="2">散客</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="名称：" required>
                    <el-input v-model="name" placeholder="请输入" class="input-style">
                    </el-input>
                  </el-form-item>
                  <el-form-item label="国家：" required>
                    <el-select v-model="country" placeholder="请选择" class="input-style">
                      <el-option v-for="(coun,index) of countryList" :key="index" :label="coun.cnName"
                        :value="coun.cnName">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="主营品牌：" required v-show="type !== 2">
                    <el-checkbox-group v-model="sellBrandList">
                      <el-checkbox :label="brand.name" v-for="(brand, index) of watchBrandList" :key="index">
                      </el-checkbox>
                    </el-checkbox-group>
                  </el-form-item>
                  <el-form-item label="备注：">
                    <el-input type="textarea" v-model="contactType" placeholder="请输入备注信息" class="input-style">
                    </el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer">
                  <el-button @click="dialogAddPeerVisible = false">取 消</el-button>
                  <el-button type="primary" @click="surePeerAdd" v-preventClick>确 定</el-button>
                </div>
              </el-dialog>
            </div>
          </div>

        </div>
        <div class="peer-table">
          <div v-show="dataPeerList.length == 0" ref="listes" style="text-align: center;">
            <p>{{dataMsg}}</p>
          </div>
          <div v-if="dataPeerList.length !== 0">
            <table>
              <tr>
                <th>名称</th>
                <th>类型</th>
                <th>操作</th>
              </tr>
              <tr v-for="(item,index) of dataPeerList" :key="index">
                <td>{{item.name}}</td>
                <td>{{item.type == 0 ? '贸易商公司' : (item.type == 1 ? '贸易商个体' : '散客')}}</td>
                <td>
                  <p type="text" style="color: #0aa1ed;cursor: pointer;" @click="addPurchase(item)">
                    选择该客户
                  </p>
                </td>
              </tr>
            </table>
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
        forSaleWatchList: this.forSaleWatch,
        id: 0,
        dialogSaleListVisible: false,
        sell_time: new Date(), // 销售日期
        sell_money: "", // 销售金额
        sell_customId: 0, // 客户id
        sell_custom: "", // 客户名称
        sell_payFull: false, // 是否全款   0:非全款 1:全款
        sell_payMoney1: "", // 第一次付款（定金）
        sell_payTime1: new Date(), // 第一次付款（定金）时间
        sell_payMoney2: "", // 第二次付款（尾款）（sell_payFull为1时，该内容不传）
        sell_payTime2: new Date(), // 第二次付款（尾款）时间（sell_payFull为1时，该内容不传）
        sell_note: "", // 备注
        paramsSave: {},
        sell_stockOutToken: "", // 出库验证码(该值用于生成出库二维码)
        options: {
          text: "",
          render: "canvas",
          width: 150,
          height: 150,
          typeNumber: -1,
          correctLevel: 2,
          background: "#ffffff",
          foreground: "#000000"
        },
        watchIndex: 0,
        logState: 0,

        dataMsg: '数据加载中...',
        keyword: '',
        dataPeerList: [],
        dataPeerList2: [],
        dataPeerList3: [],
        dialogAddPeerVisible: false,
        name: '', // 贸易商名称
        type: 0, // 类型
        country: '中国香港', // 国家
        countryList: [],
        contactType: '', // 备注
        watchBrandList: [],
        sellBrandList: [], // 所选择的主营品牌
        sellBrand: '', // 主营品牌


      };
    },
    props: ["forSaleWatch", "forSaleSel"],
    created() {
      this.handlePeerList();
      this.handleCountry();
      this.handleBrand();
    },
    methods: {
      // 返回库存页
      gobackForSale() {
        this.$emit("gobackForSale", 0);
      },
      gobackForSaleList() {
        this.forSaleSel.select = 1;
      },
      gobackList() {
        this.forSaleSel.select = 0;
      },
      // 出售商品
      sellWatch(id, index, logState) {
        this.id = id;
        this.logState = logState;
        console.log(this.logState);
        this.watchIndex = index;

        this.sell_time = new Date();
        this.sell_money = "";
        this.sell_custom = "";
        this.sell_payFull = true;
        this.sell_payMoney1 = "";
        this.sell_payTime1 = new Date();
        this.sell_payMoney2 = "";
        this.sell_payTime2 = new Date();
        this.sell_note = "";
        this.forSaleSel.select = 1;
      },
      // 选择客户
      clientSelect() {
        this.forSaleSel.select = 2;
      },
      // 获取同行列表
      handlePeerList() {
        this.dataMsg = '数据加载中...';
        this.$axios
          .post(this.$store.state.baseUrl + "/DataPeerList")
          .then(res => {
            console.log("客户列表");
            console.log(res);
            this.dataPeerList3 = res.data.peers;
            this.dataPeerList = this.dataPeerList3;
            console.log(this.dataPeerList);
            if (this.dataPeerList.length == 0) {
              this.dataMsg = '啊哦~暂无数据';
            }
          })
          .catch(err => {
            console.log(err);
          });
      },
      // 模糊搜索
      stockInSearch() {
        console.log(this.keyword);
        console.log(this.dataPeerList);
        if (this.keyword !== '') {
          this.dataPeerList.map((item) => {
            console.log(item);
            if (item.name.indexOf(this.keyword) > -1) {
              return this.dataPeerList2.push(item);
            }
          });
          this.dataPeerList = [];
          this.dataPeerList = this.dataPeerList2;
          if (this.dataPeerList.length == 0) {
            this.dataMsg = '啊哦~暂无数据';
          }
          this.dataPeerList2 = [];
          return this.dataPeerList;
        } else {
          this.dataPeerList = this.dataPeerList3;
        }
      },
      // 增加贸易商
      addPeer() {
        // this.peerSelect.select = 1;
        this.dialogAddPeerVisible = true;
        this.name = '';
        this.type = 0;
        this.country = '中国香港'; // 国家
        this.contactType = ''; // 备注
        this.sellBrandList = []; // 所选择的主营品牌
        this.sellBrand = ''; // 主营品牌
      },
      // 获取所有国家
      handleCountry() {
        this.$axios.post(this.$store.state.baseUrl + '/CountryGet').then((res) => {
          console.log('所有国家');
          console.log(res);
          this.countryList = res.data;
        }).catch((err) => {
          console.log(err);
        })
      },
      // 获取所有品牌
      handleBrand() {
        this.$axios.post(this.$store.state.baseUrl + '/DataWatchBrandList').then((res) => {
          console.log('品牌列表');
          console.log(res);
          this.watchBrandList = res.data;
        })
      },
      // 提交前数据的验证
      sellBrandChange() {
        // 主营品牌
        console.log(this.sellBrandList);
        this.sellBrand = this.sellBrandList.join('|');
        console.log(this.sellBrand);
        if (this.type !== 2) {
          if (this.name == '' || this.country == '' || this.sellBrand == '') {
            this.$message.error({
              message: '数据不能为空，请检查数据填写',
              showClose: true,
              duration: 2000
            })
            return 1;
          }
        } else {
          if (this.name == '' || this.country == '') {
            this.$message.error({
              message: '数据不能为空，请检查数据填写',
              showClose: true,
              duration: 2000
            })
            return 1;
          }
        }

      },
      // 确定增加贸易商
      surePeerAdd() {
        if (this.sellBrandChange() !== 1) {
          const loading = this.$loading({
            lock: true,
            text: '数据提交中...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
          this.$axios.post(this.$store.state.baseUrl + '/DataPeerSave', {
            name: this.name,
            type: this.type,
            country: this.country,
            contactType: this.contactType,
            sellBrand: this.sellBrand
          }).then((res) => {
            console.log('增加贸易商');
            console.log(res);
            this.$message.success({
              message: '新增贸易商成功',
              showClose: true,
              duration: 2000
            })
            this.dialogAddPeerVisible = false;
            loading.close();
            // this.handlePeerList();
            this.sell_customId = res.data.id;
            this.sell_custom = res.data.name;
            this.forSaleSel.select = 1;
            this.handlePeerList();
          }).catch((err) => {
            loading.close();
            this.$message.error({
              message: err.data.message,
              showClose: true,
              duration: 2000
            })
          })
        }
      },
      // 选择该客户
      addPurchase(item) {
        console.log(item);
        this.sell_customId = item.id;
        this.sell_custom = item.name;
        this.forSaleSel.select = 1;
      },
      // 新增销售单前数据的验证
      sellOrderSave1() {
        console.log("新增销售单");
        console.log(this.sell_payFull);
        if (this.sell_custom == '') {
          this.$message.error({
            message: '请选择客户',
            showClose: true,
            duration: 2000
          });
          return 3;
        }
        if (this.sell_payFull == false) {
          this.paramsSave = {
            id: this.id,
            sell_time: this.shellDate(this.sell_time),
            sell_money: Number(this.sell_money),
            sell_customId: this.sell_customId,
            sell_custom: this.sell_custom,
            sell_payFull: 0,
            sell_payMoney1: this.sell_payMoney1,
            sell_payTime1: this.sell_payTime1 == "" ? "" : this.shellDate(this.sell_payTime1),
            sell_payMoney2: this.sell_payMoney2,
            sell_payTime2: this.sell_payMoney2 == "" ? "" : this.shellDate(this.sell_payTime2),
            sell_note: this.sell_note
          };
          return 1;
        }
        if (this.sell_payFull == true) {
          this.paramsSave = {
            id: this.id,
            sell_time: this.shellDate(this.sell_time),
            sell_money: Number(this.sell_money),
            sell_customId: this.sell_customId,
            sell_custom: this.sell_custom,
            sell_payFull: 1,
            sell_payMoney1: this.sell_payMoney1,
            sell_payTime1: this.sell_payTime1 == "" ? "" : this.shellDate(this.sell_payTime1),
            sell_note: this.sell_note
          };
          if (this.sell_payMoney1 !== "") {
            if (this.sell_payMoney1 == this.sell_money) {
              return 1;
            } else if (this.sell_payMoney1 !== this.sell_money) {
              this.$message.error({
                message: "付款金额与销售金额不等，不能保存，请重新填写"
              });
              return 3;
            }
          } else {
            return 1;
          }
        }
      },
      // 新增销售单
      sellOrderSave() {
        console.log("ffff");
        console.log(this.paramsSave);
        if (this.sellOrderSave1() == 1) {
          const loading = this.$loading({
            lock: true,
            text: '数据提交中...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
          this.$axios.post(this.$store.state.baseUrl + "/SellOrderSave", this.paramsSave).then(res => {
            console.log("新增销售单");
            console.log(res);
            this.$message.success({
              message: "新增销售单成功",
              showClose: true,
              duration: 2000
            });
            loading.close();
            if (res.data !== "") {
              this.sell_stockOutToken = res.data.sell_stockOutToken;
              console.log(this.sell_stockOutToken);
              if (this.logState == 2) {
                this.options.text = this.sell_stockOutToken;
              } else {
                this.options.text = "";
              };
              this.sellOrderSaveSure();
            }
          }).catch(err => {
            console.log(err);
            loading.close();
            this.$message.error({
              message: err.data.message,
              showClose: true,
              duration: 2000
            });
          });
        }
      },
      // 确定
      sellOrderSaveSure() {
        this.forSaleWatchList.watch.splice(this.watchIndex, 1);
        this.forSaleSel.select = 0;
        // this.keyword = "";
        console.log(this.forSaleWatchList.watch);
        if (this.forSaleWatchList.watch.length == 0) {
          this.$emit("gobackForSale", 0);
        }
      }
    }
  };
</script>
<style lang="scss" scoped>
  .for-sale-list-container {
    width: 95%;
    margin: 0 auto;

    .list-table {
      background-color: #fff;
      border-radius: 30px;
      margin: 20px 0;
      padding: 30px;
    }
  }

  .back-img {
    width: 75px;
    height: 45px;
    margin: 23px;
    // margin-top: 0;
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

  .peer-container {
    width: 100%;

    .peer-top {
      display: flex;
      justify-content: space-between;

      .peer-top-right {
        display: flex;

        .stockSearch {
          width: 350px;
          margin: 30px 0;
          margin-right: 20px;
        }

        .addBtn {
          margin: 30px 0;

          .add-btn {
            width: 120px;
            height: 40px !important;
            font-size: 14px !important;
            background-color: #0c8563;
            color: #fff;

            .add-i {
              margin-right: 10px;
            }
          }
        }
      }
    }

    .peer-table {
      background-color: #fff;
      border-radius: 30px;
    }
  }

  td {
    height: 60px;
    margin: 10px 0;
    padding: 20px 0;
    background-color: #f3fbf9;
    font-size: 15px;
  }

  .for-sale-main {
    width: 92%;
    margin: 0 auto;
    padding: 30px;
    padding-top: 5px;
    background-color: #fff;
    border-radius: 30px;
  }

  .top-form {
    width: 190px;
    height: 80px;
    padding-left: 30px;
    line-height: 80px;
    background-color: #fff;
    border-radius: 30px;

    .top-span {
      margin-right: 15px;
      font-size: 22px;
    }
  }

  .input-style {
    width: 70% !important;
  }

  table {
    width: 100%;
    table-layout: fixed;
    border-collapse: separate;
    border-spacing: 0;

    tr {

      th,
      td {
        width: 12%;
        text-align: center;
        border: 0;
      }
    }
  }
</style>