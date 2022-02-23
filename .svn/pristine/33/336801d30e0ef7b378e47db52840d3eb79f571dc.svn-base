<template>
  <div class="purchase-container" id="peer-container">
    <!-- <h1>贸易商新增采购</h1> -->
    <div class="purchase-center">
      <div class="purchase-form" v-if="purchaseSelect.nums == 0">
        <div class="purchase">
          <el-form label-width="100px">
            <el-row :gutter="24">
              <el-col :span="12">
                <el-form-item label="采购日期" required>
                  <el-date-picker style="width: 100%;" v-model="buy_date" type="date" placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="贸易商" required>
                  <div style="width: 100%;display: flex;">
                    <el-autocomplete class="inline-input" style="width: 100%;" v-model="keyword"
                      :fetch-suggestions="querySearchAsync" placeholder="可输入同行名称进行搜索" @select="handleSelect"
                      @blur="price">
                    </el-autocomplete>
                    <div style="margin-top: 5px;">
                      <el-tooltip class="item" effect="light" content="新增贸易商" placement="top-end">
                        <img src="../../assets/imgs/peer.png" style="height: 35px;margin-left: 10px;cursor: pointer;"
                          @click="addPeerJump" />
                      </el-tooltip>
                    </div>
                    <el-dialog title="新增贸易商" :visible.sync="dialogAddPeerVisible" center :close-on-press-escape="false"
                      :close-on-click-modal="false">
                      <el-form label-width="120px">
                        <el-form-item label="名称：" required>
                          <el-input v-model="name" placeholder="请输入贸易商名称" class="input-style"></el-input>
                        </el-form-item>
                        <el-form-item label="类型：" required>
                          <el-radio-group v-model="type">
                            <el-radio :label="0">贸易商公司</el-radio>
                            <el-radio :label="1">贸易商个体</el-radio>
                          </el-radio-group>
                        </el-form-item>
                        <el-form-item label="国家：" required>
                          <el-select v-model="countryPrice" placeholder="请选择" class="input-style">
                            <el-option v-for="(coun,index) of countryList" :key="index" :label="coun.cnName"
                              :value="coun.cnName">
                            </el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item label="主营品牌：" required>
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
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div style="display: flex; justify-content: space-between;">
            <div @click="addWatch" class="add">
              <span class="add-style">
                <span>+</span> 添加手表
              </span>
            </div>
            <el-dialog title="手表信息" :visible.sync="dialogFormVisible" center :close-on-press-escape="false"
              :close-on-click-modal="false" style="padding: 20px 30px;">
              <el-form label-width="100px">
                <el-form-item label="手表型号:" required>
                  <el-autocomplete v-model="model" placeholder="请输入手表品牌、型号或昵称简称" :fetch-suggestions="fetchSuggestions"
                    :trigger-on-focus="false" @select="handleModel"></el-autocomplete>
                </el-form-item>
                <el-form-item label="采购价格:" required>
                  <el-input placeholder="请输入采购价格" type="text" v-model="buy_watchPrice" class="input-style"
                    @input="watchprice">
                    <i slot="suffix" style="color: #000;margin-right:5%;font-style:normal;">{{buy_watchCurrency}}</i>
                  </el-input>
                </el-form-item>
                <el-form-item label="机芯号:">
                  <el-input placeholder="请输入机芯号" v-model="buy_watchSn" class="input-style"></el-input>
                </el-form-item>
                <el-form-item label="保卡日期:">
                  <el-date-picker v-model="buy_watchCard" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="配件:">
                  <el-checkbox-group required>
                    <el-checkbox-group v-model="accessory" class="accessories">
                      <el-checkbox v-for="accessory in accessories" :label="accessory" :key="accessory">{{accessory}}
                      </el-checkbox>
                    </el-checkbox-group>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item label="额外表带:">
                  <el-input placeholder="请输入额外表带数" type="text" v-model="buy_watchBand" class="input-style"
                    @input="waychbandInput">
                    <i slot="suffix" style="color: #000;margin-right:5%;font-style:normal;">条</i>
                  </el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="messageSure" v-preventClick>保 存</el-button>
              </div>
            </el-dialog>
            <button class="top-search-button" @click="submitPurchase">提 交</button>
            <el-dialog title="提示" :visible.sync="addDialog" width="45%" center>
              <div style="text-align:center;">
                <span>采购单已提交到系统中</span>
              </div>
              <span slot="footer" class="dialog-footer">
                <el-button @click="addNew" style="width: 35%;margin-right:10px;">添加新的采购单</el-button>
                <el-button @click="complete" style="width: 35%;background:#0c8563;color:#fff;">继续完善该采购单</el-button>
              </span>
            </el-dialog>
          </div>
          <div v-show="watchList.length !== 0" class="pruducts-list">
            <table>
              <tr>
                <th class="table-th">图片</th>
                <th class="table-th">手表型号</th>
                <th class="table-th">采购价格</th>
                <th class="table-th">操作</th>
              </tr>
              <tr v-for="(item,index) in watchList" :key="index">
                <td>
                  <img v-image-preview
                    :src="item.buy_pics == null || item.buy_pics == '' ? '' : img + '/img/watch/'+ item.buy_pics"
                    style="width: 100px;height: 100px;object-fit: cover;border-radius: 30px;" />
                </td>
                <td>
                  <p style="margin: 0;">{{item.buy_watchBrand}}</p>
                  <p style="margin: 0;">{{item.buy_watchModel}}</p>
                </td>
                <td>{{item.buy_watchCurrency}} {{formatNumberRgx(item.buy_watchPrice)}}</td>
                <td>
                  <el-tooltip class="item" effect="light" content="修改查看信息" placement="top-end">
                    <img src="../../assets/imgs/details.png" style="cursor:pointer;" @click="updateWatch(item,index)" />
                  </el-tooltip>
                  <el-dialog title="手表信息" :visible.sync="dialogUpdateWatchVisible" center :close-on-press-escape="false"
                    :close-on-click-modal="false">
                    <el-form label-width="120px">
                      <el-form-item label="手表型号:" required>
                        <el-autocomplete v-model="model" placeholder="请输入手表品牌、型号或昵称简称"
                          :fetch-suggestions="fetchSuggestions" :trigger-on-focus="false" @select="handleModel">
                        </el-autocomplete>
                      </el-form-item>
                      <el-form-item label="采购价格:" required>
                        <el-input placeholder="请输入采购价格" type="text" v-model="buy_watchPrice" class="input-style"
                          @input="watchprice">
                          <i slot="suffix"
                            style="color: #000;margin-right:5%;font-style:normal;">{{buy_watchCurrency}}</i>
                        </el-input>
                      </el-form-item>
                      <el-form-item label="机芯号：">
                        <el-input placeholder="请输入机芯号" v-model="buy_watchSn" class="input-style"></el-input>
                      </el-form-item>
                      <el-form-item label="保卡日期：">
                        <el-date-picker v-model="buy_watchCard" type="date" placeholder="选择日期" class="input-style">
                        </el-date-picker>
                      </el-form-item>
                      <el-form-item label="配件：">
                        <el-checkbox-group required>
                          <el-checkbox-group v-model="accessory" class="accessories">
                            <el-checkbox v-for="accessory in accessories" :label="accessory" :key="accessory">
                              {{accessory}}
                            </el-checkbox>
                          </el-checkbox-group>
                        </el-checkbox-group>
                      </el-form-item>
                      <el-form-item label="额外表带：">
                        <el-input placeholder="请输入额外表带数" type="text" v-model="buy_watchBand" class="input-style"
                          @input="waychbandInput">
                          <i slot="suffix" style="color: #000;margin-right:5%;font-style:normal;">条</i>
                        </el-input>
                      </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                      <el-button @click="dialogUpdateWatchVisible = false">取 消</el-button>
                      <el-button type="primary" @click="messageSureUpdate" v-preventClick>保 存</el-button>
                    </div>
                  </el-dialog>
                  <el-tooltip class="item" effect="light" content="删除" placement="top-end">
                    <img src="../../assets/imgs/delete.png" style="margin-left: 30px;cursor:pointer;"
                      @click="del(index)" />
                  </el-tooltip>
                  <el-dialog title="提示" :visible.sync="centerDialogVisible" width="50%" center>
                    <div style="text-align:center;">
                      <span>是否删除该手表信息，删除后不能恢复</span>
                    </div>
                    <span slot="footer" class="dialog-footer">
                      <el-button @click="centerDialogVisible = false">取 消</el-button>
                      <el-button type="primary" @click="delMessage" v-preventClick>确 定</el-button>
                    </span>
                  </el-dialog>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <div v-if="purchaseSelect.nums == 1">
        <Details @goback="goback" :detailsSelect="detailsSelect"></Details>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        img: this.$store.state.baseUrl,
        dataPeerList: [], //所有同行
        buy_date: new Date(), //采购日期
        buy_watch: [], //采购手表列表
        store: "", //采购店铺名称
        dialogFormVisible: false,
        centerDialogVisible: false,
        dialogUpdateWatchVisible: false,
        dialogVisible: false,
        addDialog: false,
        buy_storeId: 0, //采购店铺id
        country: "",
        keyword: "", //采购关键字
        buy_watch: "", //采购手表列表
        model: "",
        models: [],
        myBrand: "",
        myModel: "",
        buy_watchId: "", //采购手表id
        watch_model: "",
        buy_watchPrice: "", //采购价格
        buy_watchCurrency: "", //价格币种
        buy_watchSn: "", //机芯号
        buy_watchCard: new Date(), //采购保卡日期
        buy_watchParts: "", //采购配件
        accessory: [],
        accessories: [
          "保卡",
          "说明书",
          "普通表盒",
          "调针",
          "拆卸工具",
          "额外表带套",
          "表膜",
          "二维码",
          "U盘",
          "后盖",
          "便携盒",
          "特殊表盒"
        ],
        buy_watchBand: "", //采购额外表带数
        watch: {},
        watchList: [],
        buy_id: 0, //采购单id
        buy_watchState: 0, //手表完成状态
        buy_watchpics: "", //手表图片
        delid: 0,
        watchid: 0,
        detailsSelect: {
          id: 1,
          num: 0
        },
        pics: [],
        imgSels: '',
        num: 0,
        updateIndex: 0,
        dialogAddPeerVisible: false,
        name: '', // 贸易商名称
        type: 0, // 类型
        countryPrice: '中国香港', // 国家
        countryList: [],
        contactType: '', // 联系方式
        watchBrandList: [],
        sellBrandList: [], // 所选择的主营品牌
        sellBrand: '', // 主营品牌

      };
    },
    props: ["purchaseSelect"],
    mounted() {
      this.handleCountry();
      this.handleBrand();
      this.keyword = sessionStorage.getItem('peerContainer');
      this.store = sessionStorage.getItem('peerContainer');
      sessionStorage.setItem('peerContainer', '');
      this.buy_storeId = sessionStorage.getItem('peerId');
      sessionStorage.setItem('peerId', '');
      this.country = sessionStorage.getItem('peerCountry');
      sessionStorage.setItem('peerCountry', '');
    },
    methods: {
      goback(val) {
        this.purchaseSelect.nums = val;
        this.buy_date = new Date();
        this.keyword = '';
        this.model = '';
        this.buy_watchCurrency = '';
        this.watchList = [];
      },
      // 日期 型号 价格 必须
      // 贸易商选择
      querySearchAsync(queryString, callback) {
        if (this.keyword == '') {
          this.$axios
            .post(this.$store.state.baseUrl + "/DataPeerList")
            .then(res => {
              // console.log("feng");
              // console.log(res);
              for (let item of res.data.peers) {
                item.value = item.name;
                item.id = item.id;
                item.CountryCn = item.country;
              }
              this.dataPeerList = res.data.peers;
              console.log(this.dataPeerList);
              callback(this.dataPeerList);
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log('9999999999');
          console.log(this.dataPeerList);
          console.log(this.keyword);
          for (let item of this.dataPeerList) {
            console.log('匹配');
            console.log(item);
            if (this.keyword !== '') {
              if (item.name.indexOf(this.keyword) !== -1) {
                item.value = item.name;
                item.id = item.id;
                item.CountryCn = item.country;
              } else {
                item.value = '';
              }
            } else {
              item.value = item.name;
            }
          }
          callback(this.dataPeerList);
        }
      },
      handleSelect(item) {
        console.log("restnhjnjn");
        console.log(item);
        console.log(item.CountryCn);
        console.log(item.id);
        this.buy_storeId = 0;
        this.buy_storeId = item.id;
        this.country = item.CountryCn;
        this.store = '';
        this.store = item.value;
        item.value = '';
      },
      // 新增贸易商
      addPeerJump() {
        this.dialogAddPeerVisible = true;
      },
      // 增加贸易商
      addPeer() {
        this.dialogAddPeerVisible = true;
        this.name = '';
        this.type = 0;
        this.countryPrice = '中国香港'; // 国家
        this.contactType = ''; // 联系方式
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
        if (this.name == '' || this.countryPrice == '' || this.sellBrand == '') {
          this.$message.error({
            message: '数据不能为空，请检查数据填写',
            showClose: true,
            duration: 2000
          })
          return 1;
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
            country: this.countryPrice,
            contactType: this.contactType,
            sellBrand: this.sellBrand
          }).then((res) => {
            console.log('增加贸易商');
            console.log(res);
            this.buy_storeId = res.data.id;
            this.store = res.data.name;
            this.keyword = res.data.name;
            this.country = res.data.country;
            this.price();
            this.$message.success({
              message: '新增贸易商成功',
              showClose: true,
              duration: 2000
            });
            this.dialogAddPeerVisible = false;
            loading.close();
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
      // 添加手表
      addWatch() {
        console.log(this.buy_date);
        console.log(this.store);
        if (this.buy_date == null) {
          this.$message.error({
            message: "采购日期不能为空",
            showClose: true,
            duration: 2000
          })
        } else if (this.store == "" || this.store == undefined) {
          this.$message.error({
            message: "贸易商不能为空",
            showClose: true,
            duration: 2000
          })
        } else {
          this.dialogFormVisible = true;
        };
        this.price();
        this.watch = {};
        this.buy_watchPrice = "";
        this.buy_watchSn = "";
        this.accessory = [];
        this.buy_watchParts = '';
        this.buy_watchBand = "";
        this.buy_watchBrand = "";
        this.buy_watchModel = "";
      },
      // 手表型号
      fetchSuggestions(queryString, callback) {
        this.$axios
          .post(this.$store.state.baseUrl + "/WatchSearch", {
            keyword: this.model
          }).then(res => {
            console.log(res);
            for (let item of res.data) {
              item.value = item.brand + "-" + item.model;
              item.id = item.id;
              item.brand = item.brand;
              item.model = item.model;
              item.pics = item.pics;
            }
            this.models = res.data;
            callback(this.models);
          });
      },
      handleModel(item) {
        this.buy_watchId = item.id;
        this.myBrand = item.brand;
        this.myModel = item.model;
        this.value = item.value;
        console.log(item);
        if (item.pics !== null) {
          this.imgSels = item.pics.split('|')[0];
        } else {
          this.imgSels = [];
        }
      },
      // 采购价格
      watchprice() {
        if (this.buy_watchPrice < 0) {
          this.$message.error({
            message: '价格不能为负，请重新输入',
            showClose: true,
            duration: 2000
          })
        }
      },
      // 价格币种
      price() {
        this.$axios.post(this.$store.state.baseUrl + "/CountryGet").then(res => {
          console.log('价格币种');
          console.log(res);
          console.log(this.country);
          for (let item of res.data) {
            // console.log(this.country);
            if (this.country == item.cnName) {
              this.buy_watchCurrency = item.enCurrency;
            }
          }
        });
      },
      // 验证数据是否为空
      verify() {
        console.log("111");
        console.log(this.buy_date);
        if (this.buy_watchId == "") {
          this.$message.error({
            message: "手表型号不能为空",
            showClose: true,
            duration: 2000
          })
          return 1;
        } else if (this.buy_watchPrice == "") {
          this.$message.error({
            message: "采购价格不能为空",
            showClose: true,
            duration: 2000
          })
          return 1;
        } else {
          return 2;
        }
      },
      // 确认保存手表信息
      messageSure() {
        if (this.verify() == 2) {
          // console.log(this.accessory);
          // this.buy_watchParts = '';
          for (let item of this.accessory) {
            this.buy_watchParts += item + "|";
          }
          if (
            this.buy_watchId == "" ||
            this.buy_watchPrice == "" ||
            this.buy_watchCurrency == "" ||
            this.buy_watchSn == "" ||
            this.buy_watchCard == "" ||
            this.buy_watchParts == "" ||
            this.buy_watchBand == "" ||
            this.buy_watchBrand == "" ||
            this.buy_watchModel == ""
          ) {
            this.buy_watchState = 0;
          } else {
            this.buy_watchState = 1;
          }
          this.watch = {
            buy_watchId: this.buy_watchId,
            buy_watchPrice: this.buy_watchPrice,
            buy_watchCurrency: this.buy_watchCurrency,
            buy_watchSn: this.buy_watchSn,
            buy_watchCard: this.shellDate(this.buy_watchCard),
            buy_watchParts: this.buy_watchParts,
            buy_watchBand: this.buy_watchBand,
            buy_watchBrand: this.myBrand,
            buy_watchModel: this.myModel,
            buy_watchState: this.buy_watchState,
            buy_pics: this.imgSels
            // buy_watchpics: this.$store.state.imgUrl
          };
          this.watchList.push(this.watch);
          // console.log(this.watchList);
          // console.log(this.shellDate(this.buy_date));
          this.watch = {};
          this.dialogFormVisible = false;
          this.buy_watchPrice = "";
          this.buy_watchSn = "";
          this.accessory = [];
          this.buy_watchParts = '';
          this.buy_watchBand = "";
          this.buy_watchBrand = "";
          this.buy_watchModel = "";
          console.log(this.pics);
        }
      },
      // 修改手表信息
      updateWatch(item, index) {
        console.log(item);
        console.log(index);
        this.updateIndex = index;
        this.dialogUpdateWatchVisible = true;
        this.model = item.buy_watchBrand + '-' + item.buy_watchModel;
        this.buy_watchPrice = item.buy_watchPrice;
        this.buy_watchSn = item.buy_watchSn;
        this.buy_watchCard = item.buy_watchCard;
        this.accessory = item.buy_watchParts.split("|");
        this.buy_watchBand = item.buy_watchBand;
      },
      // 确认修改
      messageSureUpdate() {
        for (let item of this.accessory) {
          this.buy_watchParts += item + "|";
        }
        if (
          this.buy_watchId == "" ||
          this.buy_watchPrice == "" ||
          this.buy_watchCurrency == "" ||
          this.buy_watchSn == "" ||
          this.buy_watchCard == "" ||
          this.buy_watchParts == "" ||
          this.buy_watchBand == "" ||
          this.buy_watchBrand == "" ||
          this.buy_watchModel == ""
        ) {
          this.buy_watchState = 0;
        } else {
          this.buy_watchState = 1;
        }
        this.watch = {
          buy_watchId: this.buy_watchId,
          buy_watchPrice: this.buy_watchPrice,
          buy_watchCurrency: this.buy_watchCurrency,
          buy_watchSn: this.buy_watchSn,
          buy_watchCard: this.shellDate(this.buy_watchCard),
          buy_watchParts: this.buy_watchParts,
          buy_watchBand: this.buy_watchBand,
          buy_watchBrand: this.myBrand,
          buy_watchModel: this.myModel,
          buy_watchState: this.buy_watchState,
          buy_pics: this.imgSels
          // buy_watchpics: this.$store.state.imgUrl
        };
        this.watchList.splice(this.updateIndex, 1, this.watch);
        // console.log(this.watchList);
        // console.log(this.shellDate(this.buy_date));
        this.watch = {};
        this.dialogUpdateWatchVisible = false;
        this.buy_watchPrice = "";
        this.buy_watchSn = "";
        this.accessory = [];
        this.buy_watchParts = "";
        this.buy_watchBand = "";
        this.buy_watchBrand = "";
        this.buy_watchModel = "";
        console.log(this.pics);
      },
      // 验证额外表带数
      waychbandInput() {
        if (Math.floor(this.buy_watchBand) !== Number(this.buy_watchBand)) {
          this.$message.error({
            message: '输入内容只能为整型数字',
            showClose: true,
            duration: 2000
          })
        }
      },
      // 删除手表信息
      del(index) {
        console.log("222222222");
        console.log(index);
        this.delid = index;
        this.centerDialogVisible = true;
      },
      delMessage() {
        this.watchList.splice(this.delid, 1);
        this.pics.splice(this.delid, 1);
        this.centerDialogVisible = false;
      },
      // 提交
      submitWatches() {
        if (this.buy_watch.length == 0) {
          this.$message.error({
            message: '请添加手表信息',
            showClose: true,
            duration: 2000
          })
          return 1;
        }
      },
      submitPurchase() {
        this.buy_watch = this.watchList;
        if (this.submitWatches() !== 1) {
          const loading = this.$loading({
            lock: true,
            text: '数据提交中...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
          console.log(this.buy_storeId);
          this.$axios
            .post(this.$store.state.baseUrl + "/BuyOrderInsert", {
              buy_date: this.shellDate(this.buy_date),
              buy_storeId: this.buy_storeId,
              buy_watch: this.buy_watch
            })
            .then(res => {
              console.log('添加采购单');
              console.log(res);
              this.watchid = res.data.buy_id;
              loading.close();
              sessionStorage.setItem("buy_id", "");
              sessionStorage.setItem("buy_id", res.data.buy_id);
              console.log("zzzz");
              console.log(sessionStorage.getItem("buy_id"));
              this.addDialog = true;
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
      // 添加新的采购单
      addNew() {
        this.addDialog = false;
        this.buy_date = new Date();
        this.keyword = '';
        this.model = '';
        this.buy_watchCurrency = '';
        this.watchList = [];
        // 页面回到顶部
        (function smoothscroll() {
          var currentScroll =
            document.documentElement.scrollTop || document.body.scrollTop;
          if (currentScroll > 0) {
            window.requestAnimationFrame(smoothscroll);
            window.scrollTo(0, currentScroll - currentScroll / 5);
          }
        })();
      },
      // 完善该采购单信息
      complete() {
        this.addDialog = false;
        this.purchaseSelect.nums = 1;
        // 页面回到顶部
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
  .purchase-container {
    width: 100%;

    .purchase-center {
      width: 100%;
      margin: 0 auto;
      // margin-top: 50px;

      .purchase-form {
        width: 95%;
        margin: 0 auto;
        padding: 50px 0 30px 0;
        background-color: #fff;
        border-radius: 15px;

        .purchase {
          width: 90%;
          margin: 0 auto;

          .pruducts-list {
            padding-top: 20px;

            .table-th {
              // padding-bottom: 20px;
              color: #000;
              font-size: 17px;
              font-weight: normal;
            }

            td {
              padding: 20px;
              background-color: #f3fbf9;
              font-size: 15px;
            }

            .first-td {
              // padding: 30px;
              border-top-left-radius: 30px;
              border-bottom-left-radius: 30px;
            }

            .last-td {
              border-top-right-radius: 30px;
              border-bottom-right-radius: 30px;
            }
          }

          .add {
            width: 144px;
            height: 48px;
            margin: 20px 0;
            line-height: 48px;
            border-radius: 6px;
            text-align: center;
            cursor: pointer;
            background-color: #0c7063;

            .add-style {
              display: inline-block;
              font-size: 16px;
              color: #fff;
            }
          }

          .top-search-button {
            width: 110px;
            height: 48px;
            margin-top: 20px;
            background-color: #0c7063;
            color: #fff;
            outline: none;
            border: none;
            border-radius: 6px;
            font-size: 16px;
            cursor: pointer;
          }
        }
      }
    }

    .input-style {
      width: 60% !important;
    }

    .accessories {
      width: 90%;
    }
  }

  .input-style {
    width: 60%;
  }

  table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
  }

  tr {

    th,
    td {
      width: 21%;
      text-align: center;
    }
  }
</style>
<style lang="scss">
  #peer-container {
    .buy_watchBand {
      right: 10%;
    }

    .el-form-item .el-form-item {
      margin-bottom: 20px;
    }

    .el-date-editor.el-input,
    .el-date-editor.el-input__inner {
      width: 60%;
    }

    .el-autocomplete {
      width: 60%;
    }

    .el-form-item__label {
      width: 10%;
    }

    .el-input__suffix {
      width: 15%;
    }

    .el-input__inner {
      height: 45px;
      border-radius: 30px;
    }

    .el-input__prefix,
    .el-input__suffix {
      top: 2px;
    }

    .el-dialog--center .el-dialog__footer {
      text-align: center;
    }
  }
</style>