<template>
  <div>
    <!-- <h1>待售品牌手表</h1> -->
    <div v-if="forSaleSel.select == 1">
      <div class="back-img" @click="gobackList">
        <div>
          <img src="../../assets/imgs/goback.png" />
        </div>
        <span class="font">返回</span>
      </div>
      <div style="text-align: left;">
        <div>
          <el-form label-width="95px">
            <el-form-item label="型号：">
              <span>{{
                forSaleSel.buyWatchBrand + "-" + forSaleSel.buyWatchModel
              }}</span>
            </el-form-item>
            <el-form-item label="销售日期：">
              <el-date-picker
                v-model="sellTime"
                type="date"
                class="input-style"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="销售金额：">
              <div style="display: flex;">
                <el-input type="text" v-model="sellMoney" class="input-style">
                </el-input>
                <el-select v-model="sellCurrency">
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
            <el-form-item label="客户名称：">
              <el-input
                v-model="sellCustom"
                placeholder="点击选择客户"
                @focus="clientSelect"
                class="input-style"
              >
              </el-input>
            </el-form-item>
          </el-form>
        </div>
        <div>
          <div class="top-form" style="width: 210px;">
            <span class="top-span">是否直接出库：</span>
            <el-switch
              v-model="watchflag"
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
          </div>
          <div class="top-form">
            <span class="top-span">是否全款：</span>
            <el-switch
              v-model="sellPayFull"
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
          </div>
          <div v-if="sellPayFull == false" style="width: 75%;">
            <div
              style="margin: 20px 0 20px 0;padding: 20px;border: 1px solid #000;border-radius: 30px;"
            >
              <p>定金：</p>
              <el-form label-width="120px">
                <el-form-item label="付款日期：">
                  <el-date-picker
                    v-model="sellPayTime1"
                    type="date"
                    class="input-style"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item label="付款金额：">
                  <el-input
                    type="text"
                    v-model="sellPayMoney1"
                    class="input-style"
                  >
                    <i
                      slot="suffix"
                      style="color: #000;margin-right:5%;font-style:normal;"
                      >{{ sellCurrency }}</i
                    >
                  </el-input>
                </el-form-item>
              </el-form>
            </div>
            <div
              style="margin: 0 0 20px 0;padding: 20px;border: 1px solid #000;border-radius: 30px;"
            >
              <p>尾款：</p>
              <el-form label-width="120px">
                <el-form-item label="付款日期：">
                  <el-date-picker
                    v-model="sellPayTime2"
                    type="date"
                    class="input-style"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item label="付款金额：">
                  <el-input
                    type="text"
                    v-model="sellPayMoney2"
                    class="input-style"
                  >
                    <i
                      slot="suffix"
                      style="color: #000;margin-right:5%;font-style:normal;"
                      >{{ sellCurrency }}</i
                    >
                  </el-input>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <div v-if="sellPayFull == true" style="width: 75%;">
            <div
              style="margin: 20px 0 20px 0;padding: 20px;border: 1px solid #000;border-radius: 30px;"
            >
              <el-form label-width="120px">
                <el-form-item label="付款日期：">
                  <el-date-picker
                    v-model="sellPayTime1"
                    type="date"
                    class="input-style"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item label="付款金额：">
                  <el-input
                    type="text"
                    v-model="sellPayMoney1"
                    class="input-style"
                  >
                    <i
                      slot="suffix"
                      style="color: #000;margin-right:5%;font-style:normal;"
                      >{{ sellCurrency }}</i
                    >
                  </el-input>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <div style="margin: 20px 0 20px 0;">
            <p>备注：</p>
            <el-input
              class="input-style"
              type="textarea"
              v-model="sellNote"
              placeholder="请输入备注信息"
            ></el-input>
          </div>
        </div>
        <div
          v-if="forSaleSel.logState == 2 && options.text !== ''"
          style="text-align: center;"
        >
          <div v-qr="options" v-if="options"></div>
          <p>提货二维码</p>
        </div>
        <!-- </div> -->
        <div style="margin-top: 30px;text-align: center;">
          <el-button
            type="primary"
            @click="sellOrderSave"
            style="margin: 0 auto;"
            v-preventClick
            >保 存</el-button
          >
        </div>
      </div>
    </div>
    <div v-if="forSaleSel.select == 2">
      <div class="peer-container">
        <!-- <h3>贸易商管理</h3> -->
        <div class="peer-top">
          <div
            class="back-img"
            style="margin-left: 0;"
            @click="gobackForSaleList"
          >
            <div>
              <img src="../../assets/imgs/goback.png" />
            </div>
            <span class="font">返回</span>
          </div>
          <div class="peer-top-right">
            <div class="stockSearch">
              <!-- 型号：模糊查找    品牌：全匹配class="el-input__inner" -->
              <el-input
                style="font-size: 14px;"
                placeholder="可输入客户名称进行查找"
                class="input-search"
                prefix-icon="el-icon-search"
                v-model="keyword"
                @input="stockInSearch"
              ></el-input>
            </div>
            <div class="addBtn">
              <el-button @click="addPeer" class="add-btn">
                <i class="add-i">+</i>
                添加客户
              </el-button>
              <el-dialog
                title="新增客户"
                :visible.sync="dialogAddPeerVisible"
                center
                :close-on-press-escape="false"
                :close-on-click-modal="false"
              >
                <el-form label-width="120px">
                  <el-form-item label="类型：" required>
                    <el-radio-group v-model="type">
                      <el-radio :label="0">贸易商公司</el-radio>
                      <el-radio :label="1">贸易商个体</el-radio>
                      <el-radio :label="2">散客</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="名称：" required>
                    <el-input
                      v-model="name"
                      placeholder="请输入"
                      class="input-style"
                    >
                    </el-input>
                  </el-form-item>
                  <el-form-item label="国家：" required>
                    <el-select
                      v-model="country"
                      placeholder="请选择"
                      class="input-style"
                    >
                      <el-option
                        v-for="(coun, index) of countryList"
                        :key="index"
                        :label="coun.cnName"
                        :value="coun.cnName"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="主营品牌：" required v-show="type !== 2">
                    <el-checkbox-group v-model="sellBrandList">
                      <el-checkbox
                        :label="brand.name"
                        v-for="(brand, index) of watchBrandList"
                        :key="index"
                      >
                      </el-checkbox>
                    </el-checkbox-group>
                  </el-form-item>
                  <el-form-item label="备注：">
                    <el-input
                      type="textarea"
                      v-model="contactType"
                      placeholder="请输入备注信息"
                      class="input-style"
                    >
                    </el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer">
                  <el-button @click="dialogAddPeerVisible = false"
                    >取 消</el-button
                  >
                  <el-button type="primary" @click="surePeerAdd" v-preventClick
                    >确 定</el-button
                  >
                </div>
              </el-dialog>
            </div>
          </div>
        </div>
        <div class="peer-table">
          <div
            v-show="dataPeerList.length == 0"
            ref="listes"
            style="text-align: center;"
          >
            <p>{{ dataMsg }}</p>
          </div>
          <div v-if="dataPeerList.length !== 0">
            <table>
              <tr>
                <th>名称</th>
                <th>类型</th>
                <th>操作</th>
              </tr>
              <tr v-for="(item, index) of dataPeerList" :key="index">
                <td>{{ item.name }}</td>
                <td>
                  {{
                    item.type == 0
                      ? "贸易商公司"
                      : item.type == 1
                      ? "贸易商个体"
                      : "散客"
                  }}
                </td>
                <td>
                  <p
                    type="text"
                    style="color: #0aa1ed;cursor: pointer;"
                    @click="addPurchase(item)"
                  >
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

      dialogSaleListVisible: false,
      sellTime: new Date(), // 销售日期
      sellMoney: "", // 销售金额
      sellCustomId: 0, // 客户id
      sellCustom: "", // 客户名称
      sellPayFull: false, // 是否全款   0:非全款 1:全款
      sellPayMoney1: "", // 第一次付款（定金）
      sellPayTime1: new Date(), // 第一次付款（定金）时间
      sellPayMoney2: "", // 第二次付款（尾款）（sellPayFull为1时，该内容不传）
      sellPayTime2: new Date(), // 第二次付款（尾款）时间（sellPayFull为1时，该内容不传）
      watchflag:false,
      sellNote: "", // 备注
      paramsSave: {},
      sellStockOutToken: "", // 出库验证码(该值用于生成出库二维码)
      options: {
        text: "",
        render: "canvas",
        width: 150,
        height: 150,
        typeNumber: -1,
        correctLevel: 2,
        background: "#ffffff",
        foreground: "#000000",
      },

      dataMsg: "数据加载中...",
      keyword: "",
      dataPeerList: [],
      dataPeerList2: [],
      dataPeerList3: [],
      dialogAddPeerVisible: false,
      name: "", // 贸易商名称
      type: 0, // 类型
      country: "中国香港", // 国家
      countryList: [],
      contactType: "", // 备注
      watchBrandList: [],
      sellBrandList: [], // 所选择的主营品牌
      sellBrand: "", // 主营品牌

      currencyList: [],
      sellCurrency: sessionStorage.getItem("companyLoginCurrency"),
    };
  },
  props: ["forSaleSel"],
  created() {
    console.log("传参");
    console.log(this.forSaleSel);
    this.handlePeerList();
    this.handleCountry();
    this.handleBrand();
  },
  methods: {
    gobackForSaleList() {
      this.forSaleSel.select = 1;
    },
    gobackList() {
      this.$emit("goback001", 0);
    },

    // 选择客户
    clientSelect() {
      console.log("666666666");
      this.forSaleSel.select = 2;
      console.log(this.forSaleSel);
    },
    // 获取同行列表
    handlePeerList() {
      this.dataMsg = "数据加载中...";
      this.$axios
        .post(this.$store.state.baseUrl + "/DataPeerList")
        .then((res) => {
          console.log("客户列表");
          console.log(res);
          this.dataPeerList3 = res.data.peers;
          this.dataPeerList = this.dataPeerList3;
          console.log(this.dataPeerList);
          if (this.dataPeerList.length == 0) {
            this.dataMsg = "啊哦~暂无数据";
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 模糊搜索
    stockInSearch() {
      console.log(this.keyword);
      console.log(this.dataPeerList);
      if (this.keyword !== "") {
        this.dataPeerList.map((item) => {
          console.log(item);
          if (item.name.indexOf(this.keyword) > -1) {
            return this.dataPeerList2.push(item);
          }
        });
        this.dataPeerList = [];
        this.dataPeerList = this.dataPeerList2;
        if (this.dataPeerList.length == 0) {
          this.dataMsg = "啊哦~暂无数据";
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
      this.name = "";
      this.type = 0;
      this.country = "中国香港"; // 国家
      this.contactType = ""; // 备注
      this.sellBrandList = []; // 所选择的主营品牌
      this.sellBrand = ""; // 主营品牌
    },
    // 获取所有国家
    handleCountry() {
      this.$axios
        .post(this.$store.state.baseUrl + "/CountryGet")
        .then((res) => {
          console.log("所有国家");
          console.log(res);
          this.countryList = res.data;
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
    // 获取所有品牌
    handleBrand() {
      this.$axios
        .post(this.$store.state.baseUrl + "/DataWatchBrandList")
        .then((res) => {
          console.log("品牌列表");
          console.log(res);
          this.watchBrandList = res.data;
        });
    },
    // 提交前数据的验证
    sellBrandChange() {
      // 主营品牌
      console.log(this.sellBrandList);
      this.sellBrand = this.sellBrandList.join("|");
      console.log(this.sellBrand);
      if (this.type !== 2) {
        if (this.name == "" || this.country == "" || this.sellBrand == "") {
          this.$message.error({
            message: "数据不能为空，请检查数据填写",
            showClose: true,
            duration: 2000,
          });
          return 1;
        }
      } else {
        if (this.name == "" || this.country == "") {
          this.$message.error({
            message: "数据不能为空，请检查数据填写",
            showClose: true,
            duration: 2000,
          });
          return 1;
        }
      }
    },
    // 确定增加贸易商
    surePeerAdd() {
      if (this.sellBrandChange() !== 1) {
        const loading = this.$loading({
          lock: true,
          text: "数据提交中...",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        });
        this.$axios
          .post(this.$store.state.baseUrl + "/DataPeerSave", {
            name: this.name,
            type: this.type,
            country: this.country,
            contactType: this.contactType,
            sellBrand: this.sellBrand,
          })
          .then((res) => {
            console.log("增加贸易商");
            console.log(res);
            this.$message.success({
              message: "新增贸易商成功",
              showClose: true,
              duration: 2000,
            });
            this.dialogAddPeerVisible = false;
            loading.close();
            // this.handlePeerList();
            this.sellCustomId = res.data.id;
            this.sellCustom = res.data.name;
            this.forSaleSel.select = 1;
            this.handlePeerList();
          })
          .catch((err) => {
            loading.close();
            this.$message.error({
              message: err.data.message,
              showClose: true,
              duration: 2000,
            });
          });
      }
    },
    // 选择该客户
    addPurchase(item) {
      console.log(item);
      this.sellCustomId = item.id;
      this.sellCustom = item.name;
      this.forSaleSel.select = 1;
    },
    // 新增销售单前数据的验证
    sellOrderSave1() {
      console.log("新增销售单");
      console.log(this.sellPayFull);
      if (this.sellCustom == "") {
        this.$message.error({
          message: "请选择客户",
          showClose: true,
          duration: 2000,
        });
        return 3;
      }
      if (this.sellPayFull == false) {
        this.paramsSave = {
          id: this.forSaleSel.id,
          sellTime: this.shellDate(this.sellTime),
          sellMoney: Number(this.sellMoney),
          sellCurrency: this.sellCurrency,
          sellCustomId: this.sellCustomId,
          sellCustom: this.sellCustom,
          sellPayFull: 0,
          sellPayMoney1: this.sellPayMoney1,
          sellPayTime1: this.shellDate(this.sellPayTime1),
          sellPayMoney2: this.sellPayMoney2,
          sellPayTime2: this.shellDate(this.sellPayTime2),
          sellNote: this.sellNote,
          flag:this.watchflag==false?0:1,
        };
        return 1;
      }
      if (this.sellPayFull == true) {
        this.paramsSave = {
          id: this.forSaleSel.id,
          sellTime: this.shellDate(this.sellTime),
          sellMoney: Number(this.sellMoney),
          sellCurrency: this.sellCurrency,
          sellCustomId: this.sellCustomId,
          sellCustom: this.sellCustom,
          sellPayFull: 1,
          sellPayMoney1: this.sellPayMoney1,
          sellPayTime1: this.shellDate(this.sellPayTime1),
          sellNote: this.sellNote,
          flag:this.watchflag==false?0:1,
        };
        if (this.sellPayMoney1 !== "") {
          if (this.sellPayMoney1 == this.sellMoney) {
            return 1;
          } else if (this.sellPayMoney1 !== this.sellMoney) {
            this.$message.error({
              message: "付款金额与销售金额不等，不能保存，请重新填写",
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
          text: "数据提交中...",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        });
        this.$axios
          .post(this.$store.state.baseUrl + "/SellOrderSave", this.paramsSave)
          .then((res) => {
            console.log("新增销售单");
            console.log(res);
            this.$message.success({
              message: "新增销售单成功",
              showClose: true,
              duration: 2000,
            });
            loading.close();
            if (res.data !== "") {
              this.sellStockOutToken = res.data.sellStockOutToken;
              console.log(this.sellStockOutToken);
              if (this.forSaleSel.logState == 2) {
                this.options.text = this.sellStockOutToken;
              } else {
                this.options.text = "";
              }
              this.$emit("goback001", 1);
            }
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

      }
    },
  },
};
</script>
<style lang="scss" scoped>
.back-img {
  width: 75px;
  height: 45px;
  margin-bottom: 10px;
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

.top-form {
  width: 190px;
  height: 80px;
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
