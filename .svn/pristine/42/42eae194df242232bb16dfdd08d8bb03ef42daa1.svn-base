<template>
  <div class="on-sale-container">
    <!-- <h1>进行中的销售</h1> -->
    <div class="onSale-container" v-if="onSaleSel.select == 0">
      <div class="onSale-top">
        <p style="margin: 0;font-size: 18px;">销售单数量：{{' ' + count}}</p>
      </div>
      <div v-show="sellPendOrderList.length == 0" class="container-null">
        <p>{{hintMsg}}</p>
      </div>
      <div v-if="sellPendOrderList.length !== 0">
        <div v-for="(item,index) of sellPendOrderList" :key="index" class="onSale-center">
          <div>
            <span class="purchase-number">销售单号: {{" " + item.sell_orderId}}</span>
            <span class="purchase-date">销售日期: {{item.sell_time}}</span>
          </div>
          <div class="purchase-row" style="padding-right: 50%;display: flex;justify-content: space-between;">
            <div style="text-align: center;">
              <p style="margin: 0;" v-if="item.buy_date !== null">{{item.buy_date}}</p>
              <p v-if="item.buy_date == null" style="margin-top: 20px;"></p>
              <div style="height: 40px; line-height: 40px;">
                <img :src="item.log_state > 0 || item.log_state == 0 ? img1 : img2" class="img-style" />
                <span>采购</span>
              </div>
            </div>
            <div style="text-align: center;">
              <p style="margin: 0;" v-if="item.log_sendTime !== null">{{item.log_sendTime}}</p>
              <p v-if="item.log_sendTime == null" style="margin-top: 20px;"></p>
              <div style="height: 40px; line-height: 40px;">
                <img :src="item.log_state > 1 || item.log_state == 1 ? img1 : img2" class="img-style" />
                <span>运输</span>
              </div>
            </div>
            <div style="text-align: center;">
              <p style="margin: 0;" v-if="item.stock_inTime !== null">{{item.stock_inTime}}</p>
              <p v-if="item.stock_inTime == null" style="margin-top: 20px;"></p>
              <div style="height: 40px; line-height: 40px;">
                <img :src="item.log_state > 2 || item.log_state == 2 ? img1 : img2" class="img-style" />
                <span>入库</span>
              </div>
            </div>
            <div style="text-align: center;">
              <p style="margin: 0;" v-if="item.stock_outTime !== null">{{item.stock_outTime}}</p>
              <p v-if="item.stock_outTime == null" style="margin-top: 20px;"></p>
              <div style="height: 40px; line-height: 40px;">
                <img :src="item.log_state == 3 ? img1 : img2" class="img-style" />
                <span>出库</span>
              </div>
            </div>
            <div style="text-align: center;">
              <p style="margin-top: 20px;"></p>
              <div style="height: 40px; line-height: 40px;">
                <img :src="item.sell_payState == 2 ? img1 : img2" class="img-style" />
                <span>收款</span>
              </div>
            </div>
          </div>
          <div class="div-table">
            <table>
              <tr class="table-tr">
                <th class="table-th first-img">图片</th>
                <th class="table-th">品牌</th>
                <th class="table-th">型号</th>
                <th class="table-th">客户名称</th>
                <th class="table-th">销售金额</th>
                <th class="table-th">操作</th>
              </tr>
              <tr class="table-tr-container">
                <td>
                  <img v-image-preview
                    :src="item.buy_watchPics == null || item.buy_watchPics == '' ? '' : img + '/img/watch/'+ (item.buy_watchPics || '').split('|')[0]"
                    style="width: 100px;height: 100px;border-radius: 30px;object-fit: cover;" />
                </td>
                <td>{{item.buy_watchBrand}}</td>
                <td>{{item.buy_watchModel}}</td>
                <td>{{item.sell_custom}}</td>
                <td>{{item.sell_currency + ' ' + formatNumberRgx(item.sell_money)}}</td>
                <td>
                  <el-tooltip class="item" effect="light" content="修改查看信息" placement="top-end">
                    <img src="../../assets/imgs/update.png" style="cursor: pointer;" @click="details(item)" />
                  </el-tooltip>
                  <el-tooltip class="item" effect="light" content="删除" placement="top-end">
                    <img src="../../assets/imgs/delete.png" style="margin-left: 30px;cursor: pointer;"
                      @click="delet(item.id)" />
                  </el-tooltip>
                  <el-dialog title="取消销售单" :visible.sync="salesTicketDialogVisible" :append-to-body="true"
                    :close-on-press-escape="false" :close-on-click-modal="false" width="50%" center>
                    <div style="text-align: center;">
                      <p style="font-size: 16px;">确定删除该销售单？删除后不可恢复</p>
                    </div>
                    <span slot="footer" class="dialog-footer">
                      <el-button @click="salesTicketDialogVisible = false" style="margin-left: 35%;">取 消</el-button>
                      <el-button type="primary" @click="deletSure" v-preventClick>确 定</el-button>
                    </span>
                  </el-dialog>
                </td>
              </tr>
            </table>
          </div>
        </div>
        <div style="width: 100%;height: 63px;">
          <div style="margin:15px 0;position:absolute;right:6%;">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page"
              layout="total, prev, pager, next, jumper" :total="total"></el-pagination>
          </div>
        </div>
      </div>
    </div>
    <div v-if="onSaleSel.select == 1" class="onSale-details">
      <div class="back-img" @click="gobackOnSaleList">
        <div>
          <img src="../../assets/imgs/goback.png" />
        </div>
        <span class="font">返回</span>
      </div>
      <div style="text-align: left;">
        <div>
          <el-form label-width="120px">
            <el-form-item label="型号：">
              <span>{{buy_watchBrand +' - '+ buy_watchModel}}</span>
            </el-form-item>
            <el-form-item label="销售日期：">
              <el-date-picker v-model="sell_time" type="date" class="input-style"></el-date-picker>
            </el-form-item>
            <el-form-item label="销售金额：">
              <el-input type="text" v-model="sell_money" class="input-style">
                <i slot="suffix" style="color: #000;margin-right:5%;font-style:normal;">{{sell_currency}}</i>
              </el-input>
            </el-form-item>
            <el-form-item label="客户名称：">
              <el-input v-model="sell_custom" class="input-style" @focus="clientSelect"></el-input>
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
                  <el-date-picker v-model="sell_payTime1" type="date" class="input-style">
                  </el-date-picker>
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
                  <el-date-picker v-model="sell_payTime2" type="date" class="input-style">
                  </el-date-picker>
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
                  <el-date-picker v-model="sell_payTime1" type="date" class="input-style">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="付款金额：">
                  <el-input type="text" v-model="sell_payMoney1" class="input-style">
                    <i slot="suffix" style="color: #000;margin-right:5%;font-style:normal;">HKD</i>
                  </el-input>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <div style="margin: 30px;">
            <p>备注：</p>
            <el-input type="textarea" v-model="sell_note" placeholder="请输入备注信息" class="input-style"></el-input>
          </div>
          <!--  v-if="sell_stockOutToken !== ''" -->
          <div v-if="logState == 2 || logState == 3">
            <div style="text-align: center;" id="qrcode2">
              <vue-qr :logoSrc="config.logo" :text="config.value" :size="150" :margin="0"></vue-qr>
              <p>提货二维码</p>
            </div>
          </div>
        </div>
      </div>
      <div style="margin-top: 40px;text-align: center;">
        <el-button type="primary" @click="updateSure" v-preventClick>确定修改</el-button>
      </div>
    </div>
    <div v-if="onSaleSel.select == 2" class="onSale-details">
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
                prefix-icon="el-icon-search" v-model="keyword2" @input="stockInSearch2">
              </el-input>
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
                    <el-input v-model="name" placeholder="请输入客户名称" class="input-style">
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
  import VueQr from "vue-qr";
  export default {
    components: {
      VueQr
    },
    data() {
      return {
        img1: require("../../assets/imgs/sureImg.png"),
        img2: require("../../assets/imgs/error.png"),
        count: 0,
        page: 1,
        pageNum: 10,
        keyword: "",
        total: 0,
        sellPendOrderList: [], // 进行中的销售单
        img: this.$store.state.baseUrl,
        salesTicketDialogVisible: false,
        updateDialogVisible: false,
        buy_watchBrand: "",
        buy_watchModel: "",
        updateId: 0,
        deletId: 0,
        sell_time: new Date(), // 销售日期
        sell_money: "", // 销售金额
        sell_currency: "", // 币种
        sell_customId: 0, // 客户id
        sell_custom: "", // 客户名称
        sell_payFull: false, // 是否全款   0:非全款 1:全款
        sell_payMoney1: "", // 第一次付款（定金）
        sell_payTime1: new Date(), // 第一次付款（定金）时间
        sell_payMoney2: "", // 第二次付款（尾款）（sell_payFull为1时，该内容不传）
        sell_payTime2: new Date(), // 第二次付款（尾款）时间（sell_payFull为1时，该内容不传）
        sell_note: "", // 备注
        sell_stockOutToken: "", // 用于生成二维码
        stock_outTime: "", // 出库时间
        sell_sendUserNick: "", // 送货人
        config: {
          value: "",
          logo: ""
        },
        logState: "",

        hintMsg: '数据加载中...',
        dataMsg: '数据加载中...',
        keyword2: '',
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
    props: ["onSaleSel"],
    created() {
      this.handlePeerList();
      this.handleCountry();
      this.handleBrand();
    },
    mounted() {
      this.getSellPendOrderCount();
      this.handleSellPendOrderList();
    },
    methods: {
      gobackForSaleList() {
        this.onSaleSel.select = 1;
      },
      // 进行中的销售单数量
      getSellPendOrderCount() {
        this.$axios
          .post(this.$store.state.baseUrl + "/SellPendOrderCount")
          .then(res => {
            console.log("进行中的销售单数量");
            console.log(res);
            this.count = res.data.count;
            this.$emit('getSellPendOrderCount', this.count);
          })
          .catch(err => {
            console.log(err);
          });
      },
      // 进行中的销售单
      handleSellPendOrderList() {
        this.hintMsg = '数据加载中...';
        this.$axios
          .post(this.$store.state.baseUrl + "/SellPendOrderList", {
            page: this.page,
            pageNum: this.pageNum
          })
          .then(res => {
            console.log("进行中的销售单");
            console.log(res);
            this.total = res.data.total;
            this.sellPendOrderList = res.data.lst;
            if (this.sellPendOrderList.length == 0) {
              this.hintMsg = "啊哦~ 暂无数据";
            }
          })
          .catch(err => {
            console.log(err);
          });
      },
      // 模糊搜索
      stockInSearch() {
        console.log(this.keyword);
        if (this.keyword !== "") {
          this.sellPendOrderList = [];
          this.count = 0;
          this.total = 0;
          this.hintMsg = '数据加载中...';
          this.$axios
            .post(this.$store.state.baseUrl + "/SellPendOrderList", {
              page: this.page,
              pageNum: this.pageNum,
              keyword: this.keyword
            })
            .then(res => {
              console.log("模糊搜索进行中的销售单");
              console.log(res);
              this.sellPendOrderList = res.data.lst;
              this.count = res.data.total;
              this.total = res.data.total;
              if (this.sellPendOrderList.length == 0) {
                this.hintMsg = "啊哦~ 暂无数据";
              }
              console.log(this.sellPendOrderList);
            })
            .catch(err => {
              console.log(err);
            });
        } else if (this.keyword == "") {
          this.page = 1;
          this.sellPendOrderList = [];
          this.count = 0;
          this.total = 0;
          this.getSellPendOrderCount();
          this.handleSellPendOrderList();
        }
      },
      gobackOnSaleList() {
        this.onSaleSel.select = 0;
      },
      // 选择客户
      clientSelect() {
        this.onSaleSel.select = 2;
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
      stockInSearch2() {
        console.log(this.keyword2);
        console.log(this.dataPeerList);
        if (this.keyword2 !== '') {
          this.dataPeerList.map((item) => {
            console.log(item);
            if (item.name.indexOf(this.keyword2) > -1) {
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
            });
            this.dialogAddPeerVisible = false;
            loading.close();
            // this.handlePeerList();
            this.sell_customId = res.data.id;
            this.sell_custom = res.data.name;
            this.onSaleSel.select = 1;
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
        this.onSaleSel.select = 1;
      },
      // 修改销售单信息
      details(item) {
        console.log(item);
        console.log("修改销售单信息");
        console.log(document.getElementById("qrcode2"));
        this.logState = item.log_state;
        this.updateId = item.id;
        this.buy_watchBrand = item.buy_watchBrand;
        this.buy_watchModel = item.buy_watchModel;
        this.sell_time = item.sell_time;
        this.sell_money = item.sell_money;
        this.sell_currency = item.sell_currency;
        this.sell_customId = item.sell_customId;
        this.sell_custom = item.sell_custom;
        if (item.sell_payFull == 0) {
          this.sell_payFull = false;
          this.sell_payMoney1 = item.sell_payMoney1;
          this.sell_payTime1 = item.sell_payTime1;
          if (item.sell_payMoney2 == 0) {
            this.sell_payMoney2 = '';
          } else {
            this.sell_payMoney2 = item.sell_payMoney2;
          }
          if (item.sell_payTime2 == '0000-00-00') {
            this.sell_payTime2 = new Date();
          } else {
            this.sell_payTime2 = item.sell_payTime2;
          }
        } else if (item.sell_payFull == 1) {
          this.sell_payFull = true;
          if (item.sell_payMoney1 == 0) {
            this.sell_payMoney1 = '';
          } else {
            this.sell_payMoney1 = item.sell_payMoney1;
          }
          this.sell_payTime1 = item.sell_payTime1;
        }
        this.sell_note = item.sell_note;
        this.sell_stockOutToken = item.sell_stockOutToken;
        this.stock_outTime = item.stock_outTime;
        this.sell_sendUserNick = item.sell_sendUserNick;
        this.config.value = item.sell_stockOutToken;
        console.log(this.sell_stockOutToken);
        this.onSaleSel.select = 1;
        (function smoothscroll() {
          var currentScroll =
            document.documentElement.scrollTop || document.body.scrollTop;
          if (currentScroll > 0) {
            window.requestAnimationFrame(smoothscroll);
            window.scrollTo(0, currentScroll - currentScroll / 5);
          }
        })();
      },
      // 确认修改前数据的验证
      sellOrderSave1() {
        console.log("新增销售单");
        console.log(this.sell_payFull);
        if (this.sell_custom == '') {
          this.$message.error({
            message: '请选择销售客户',
            showClose: true,
            duration: 2000
          });
          return 3;
        }
        if (this.sell_payFull == false) {
          this.paramsSave = {
            id: this.updateId,
            sell_time: this.shellDate(this.sell_time),
            sell_money: this.sell_money,
            sell_customId: this.sell_customId,
            sell_custom: this.sell_custom,
            sell_payFull: 0,
            sell_payMoney1: this.sell_payMoney1,
            sell_payTime1: this.shellDate(this.sell_payTime1),
            sell_payMoney2: this.sell_payMoney2,
            sell_payTime2: this.shellDate(this.sell_payTime2),
            sell_note: this.sell_note
          };
          if (this.sell_payMoney2 !== "") {
            let sum = Number(this.sell_payMoney1) + Number(this.sell_payMoney2);
            console.log(sum);
            if (sum == this.sell_money) {
              // this.sellOrderSave();
              return 1;
            } else {
              this.$message.error({
                message: "定金金额与尾款金额的和不等于销售金额，不能保存，请重新填写"
              });
              return 2;
            }
          } else {
            console.log("ddddddddddd");
            return 1;
            // this.sellOrderSave();
          }
        }
        if (this.sell_payFull == true) {
          this.paramsSave = {
            id: this.updateId,
            sell_time: this.shellDate(this.sell_time),
            sell_money: this.sell_money,
            sell_customId: this.sell_customId,
            sell_custom: this.sell_custom,
            sell_payFull: 1,
            sell_payMoney1: this.sell_payMoney1,
            sell_payTime1: this.shellDate(this.sell_payTime1),
            sell_note: this.sell_note
          };
          if (this.sell_payMoney1 !== "") {
            if (this.sell_payMoney1 == this.sell_money) {
              return 1;
              // this.sellOrderSave();
            } else if (this.sell_payMoney1 !== this.sell_money) {
              this.$message.error({
                message: "付款金额与销售金额不等，不能保存，请重新填写"
              });
              return 3;
            }
          } else {
            return 1;
            // this.sellOrderSave();
          }
        }
      },
      // 确认修改
      updateSure(id) {
        console.log("ffff");
        console.log(this.paramsSave);
        console.log(this.sellOrderSave1());
        if (this.sellOrderSave1() == 1) {
          this.$axios
            .post(this.$store.state.baseUrl + "/SellOrderSave", this.paramsSave)
            .then(res => {
              console.log("修改销售单");
              console.log(res);
              this.$message.success({
                message: "修改销售单成功",
                showClose: true,
                duration: 2000
              });
              this.sell_stockOutToken = res.data.sell_stockOutToken;
              console.log(this.sell_stockOutToken);
              // this.keyword = "";
              this.onSaleSel.select = 0;
              // this.handleSellPendOrderList();
              this.stockInSearch();
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
      },
      // 删除销售单
      delet(id) {
        this.deletId = id;
        this.salesTicketDialogVisible = true;
      },
      // 确认删除销售单
      deletSure() {
        console.log(this.deletId);
        this.$axios
          .post(this.$store.state.baseUrl + "/SellOrderDel", {
            id: this.deletId
          })
          .then(res => {
            console.log("删除销售单");
            console.log(res);
            this.$message.success({
              message: "删除销售单成功",
              showClose: true,
              duration: 2000
            });
            this.keyword = "";
            this.salesTicketDialogVisible = false;
            this.stockInSearch();
          })
          .catch(err => {
            console.log(err);
            this.$message.error({
              message: err.data.message,
              showClose: true,
              duration: 2000
            });
          });
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
          this.handleSellPendOrderList();
        } else if (this.keyword !== '') {
          this.stockInSearch();
        }
        (function smoothscroll() {
          var currentScroll =
            document.documentElement.scrollTop || document.body.scrollTop;
          if (currentScroll > 0) {
            window.requestAnimationFrame(smoothscroll);
            window.scrollTo(0, currentScroll - currentScroll / 5);
          }
        })();
      }
    }
  };
</script>
<style lang="scss" scoped>
  .on-sale-container {
    width: 100%;

    .container-null {
      margin-top: 100px;
      text-align: center;
    }

    .onSale-container {
      width: 95%;
      margin: 0 auto;

      .onSale-top {
        padding-left: 20px;
        // display: flex;
      }

      .onSale-center {
        margin-top: 20px;
        padding: 30px;
        background-color: #fff;
        border-radius: 30px;
      }
    }
  }

  .onSale-details {
    width: 92%;
    margin: 0 auto;
    padding: 30px;
    padding-top: 5px;
    border-radius: 30px;
    background-color: #fff;
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

      td {
        background-color: #f3fbf9;
      }
    }
  }

  .back-img {
    width: 75px;
    height: 45px;
    margin: 20px;
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

  .purchase-row {
    padding-top: 30px;
  }

  .purchase-number {
    font-size: 18px;
    font-weight: bold;
  }

  .purchase-date {
    margin-left: 30px;
    color: #c8c8c8;
  }

  .img-style {
    width: 15px;
    height: 15px;
  }

  .div-table {
    padding: 0;

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
    }
  }

  .top-form {
    width: 190px;
    height: 40px;
    padding-left: 30px;
    line-height: 40px;
    background-color: #fff;
    border-radius: 30px;

    .top-span {
      margin-right: 15px;
      font-size: 23px;
    }
  }

  .input-style {
    width: 70% !important;
  }

  td {
    height: 60px;
    margin: 10px 0;
    padding: 20px 0;
    background-color: #f3fbf9;
    font-size: 15px;
  }

  table {
    width: 100%;
    table-layout: fixed;
    border-collapse: separate;
    border-spacing: 0;

    tr {

      th,
      td {
        width: 20%;
        text-align: center;
        border: 0;
      }
    }
  }
</style>
<style lang="scss">
  // #onsale-container {
  .el-pagination button:disabled {
    color: #c0c4cc;
    background-color: transparent;
    cursor: not-allowed;
  }

  div .el-pager li {
    background-color: transparent !important;
  }

  .el-pagination .btn-next,
  .el-pagination .btn-prev {
    background: center center no-repeat transparent;
    background-size: 16px;
    cursor: pointer;
    margin: 0;
    color: #303133;
  }

  .el-form-item__label {
    font-size: 16px;
    text-align: right !important;
  }

  .el-pagination__editor.el-input .el-input__inner {
    height: 28px;
  }

  .el-input__suffix {
    width: 30%;
  }

  .el-dialog {
    border-radius: 30px;
  }

  .el-input__inner {
    height: 45px;
    line-height: 45px;
    border-radius: 30px;
  }

  .el-button--primary {
    color: #fff;
    background-color: #0c8563 !important;
    border-color: #0c8563 !important;
  }

  .el-button {
    width: 20%;
    height: 48px;
    border-radius: 6px;
    font-size: 16px;
  }

  .el-button+.el-button {
    margin-left: 10%;
  }

  // }
</style>