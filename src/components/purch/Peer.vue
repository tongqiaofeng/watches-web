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
                  <el-date-picker
                    style="width: 100%;"
                    v-model="buyDate"
                    type="date"
                    placeholder="选择日期"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="贸易商" required>
                  <div style="width: 100%;display: flex;">
                    <el-autocomplete
                      class="inline-input"
                      style="width: 100%;"
                      v-model="keyword"
                      :fetch-suggestions="querySearchAsync"
                      placeholder="可输入同行名称进行搜索"
                      @select="handleSelect"
                      clearable
                      @clear="searchHandle"
                      @blur="price"
                    >
                    </el-autocomplete>
                    <div style="margin-top: 5px;">
                      <el-tooltip
                        class="item"
                        effect="light"
                        content="新增贸易商"
                        placement="top-end"
                      >
                        <img
                          src="../../assets/imgs/peer.png"
                          style="height: 35px;margin-left: 10px;cursor: pointer;"
                          @click="addPeerJump"
                        />
                      </el-tooltip>
                    </div>
                    <el-dialog
                      title="新增贸易商"
                      :visible.sync="dialogAddPeerVisible"
                      center
                      :close-on-press-escape="false"
                      :close-on-click-modal="false"
                    >
                      <el-form label-width="120px">
                        <el-form-item label="名称：" required>
                          <el-input
                            v-model="name"
                            placeholder="请输入贸易商名称"
                            class="input-style"
                          ></el-input>
                        </el-form-item>
                        <el-form-item label="类型：" required>
                          <el-radio-group v-model="type">
                            <el-radio :label="0">贸易商公司</el-radio>
                            <el-radio :label="1">贸易商个体</el-radio>
                          </el-radio-group>
                        </el-form-item>
                        <el-form-item label="国家：" required>
                          <el-select
                            v-model="countryPrice"
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
                        <el-form-item label="主营品牌：" required>
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
                        <el-button
                          type="primary"
                          @click="surePeerAdd"
                          v-preventClick
                          >确 定</el-button
                        >
                      </div>
                    </el-dialog>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="12">
                <el-form-item label="是否直接入库" label-width="130px">
                  <el-switch
                    @change="choosewarehouse"
                    v-model="stockvalue"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                  >
                  </el-switch>
                </el-form-item>
              </el-col>
              <el-col :span="12" v-if="stockvalue == true">
                <el-form-item label="仓库名称">
                  <el-select
                    v-model="warehouseid"
                    placeholder="请选择入库仓库"
                    value-key="id"
                  >
                    <el-option
                      v-for="item in warehouseList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div style="display: flex; justify-content: space-between;">
            <div @click="addWatch" class="add">
              <span class="add-style"> <span>+</span> 添加手表 </span>
            </div>
            <el-dialog
              title="手表信息"
              :visible.sync="dialogFormVisible"
              center
              @close="closeDialog"
              :close-on-press-escape="false"
              :close-on-click-modal="false"
              style="padding: 20px 30px;"
            >
              <el-form label-width="100px">
                <div class="watchseachbox">
                  <el-form-item label="手表品牌:" style="margin-top:20px">
                    <el-autocomplete
                      class="inline-input input-style"
                      v-model="watchBrand"
                      :fetch-suggestions="handleBrandcallback"
                      placeholder="请输入手表品牌（默认全部，可以不输入）"
                      @select="handleSelectbrand"
                    ></el-autocomplete>
                  </el-form-item>
                  <el-form-item
                    label="手表型号:"
                    style="margin-top:-2px"
                    required
                  >
                    <el-input
                      v-model="model"
                      style="width:70%"
                      placeholder="请输入手表型号"
                      :trigger-on-focus="false"
                    >
                    </el-input>
                    <el-button
                      style="border: 1px solid #DCDFE6;cursor: pointer;padding: 10px 18px;border-radius: 6px; background-color: white;margin-left:10px;width: 98px;font-size: 14px;"
                      @click="fetchSuggestions"
                      >搜索手表</el-button
                    >
                  </el-form-item>
                </div>
                <el-table
                  :data="models"
                  v-if="models.length > 0"
                  style="width: 100%;margin:auto;margin-bottom: 22px;"
                  highlight-current-row
                  height="30vh"
                  border
                  @current-change="handleModel"
                  ref="multipleTable"
                >
                  <el-table-column prop="brand" label="品牌"> </el-table-column>
                  <el-table-column prop="model" label="型号"> </el-table-column>
                  <el-table-column prop="pics" label="图片">
                    <template slot-scope="scope">
                      <div style="height:140px">
                        <img
                          :src="img + '/img/watch/' + scope.row.pics"
                          alt=""
                          style=" width: 100%; height: 100%; object-fit: contain;"
                        />
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
                <el-form-item label="采购价格:" required>
                  <div style="display: flex;">
                    <el-input
                      placeholder="请输入采购价格"
                      type="text"
                      v-model="buyWatchPrice"
                      class="input-style"
                      @input="watchprice"
                    >
                    </el-input>
                    <el-select v-model="buyWatchCurrency">
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
                <el-form-item label="机芯号:">
                  <el-input
                    placeholder="请输入机芯号"
                    v-model="buyWatchSn"
                    class="input-style"
                  ></el-input>
                </el-form-item>
                <el-form-item label="保卡日期:">
                  <el-date-picker
                    v-model="buyWatchCard"
                    type="date"
                    placeholder="选择日期"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item label="配件:">
                  <el-checkbox-group required>
                    <el-checkbox-group v-model="accessory" class="accessories">
                      <el-checkbox
                        v-for="accessory in accessories"
                        :label="accessory"
                        :key="accessory"
                        >{{ accessory }}
                      </el-checkbox>
                    </el-checkbox-group>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item label="额外表带:">
                  <el-input
                    placeholder="请输入额外表带数"
                    type="text"
                    v-model="buyWatchBand"
                    class="input-style"
                    @input="waychbandInput"
                  >
                    <i
                      slot="suffix"
                      style="color: #000;margin-right:5%;font-style:normal;"
                      >条</i
                    >
                  </el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogfalse">取 消</el-button>

                <el-button type="primary" @click="messageSure" v-preventClick
                  >保 存</el-button
                >
              </div>
            </el-dialog>
            <button class="top-search-button" @click="submitPurchase">
              提 交
            </button>
            <el-dialog
              title="提示"
              :visible.sync="addDialog"
              width="45%"
              center
            >
              <div style="text-align:center;">
                <span>采购单已提交到系统中</span>
              </div>
              <span slot="footer" class="dialog-footer">
                <el-button @click="addNew" style="width: 35%;margin-right:10px;"
                  >添加新的采购单</el-button
                >
                <el-button
                  @click="complete"
                  style="width: 35%;background:#0c8563;color:#fff;"
                  >继续完善该采购单</el-button
                >
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
              <tr v-for="(item, index) in watchList" :key="index">
                <td>
                  <img
                    v-image-preview
                    :src="
                      item.buyPics == null || item.buyPics == ''
                        ? ''
                        : img + '/img/watch/' + item.buyPics
                    "
                    style="width: 100px;height: 100px;object-fit: cover;border-radius: 30px;"
                  />
                </td>
                <td>
                  <p style="margin: 0;">{{ item.buyWatchBrand }}</p>
                  <p style="margin: 0;">{{ item.buyWatchModel }}</p>
                </td>
                <td>
                  {{ item.buyWatchCurrency }}
                  {{ formatNumberRgx(item.buyWatchPrice) }}
                </td>
                <td>
                  <el-tooltip
                    class="item"
                    effect="light"
                    content="修改查看信息"
                    placement="top-end"
                  >
                    <img
                      src="../../assets/imgs/details.png"
                      style="cursor:pointer;"
                      @click="updateWatch(item, index)"
                    />
                  </el-tooltip>
                  <el-dialog
                    title="手表信息"
                    @close="closeDialog"
                    v-if="dialogUpdateWatchVisible"
                    :visible.sync="dialogUpdateWatchVisible"
                    center
                    :close-on-press-escape="false"
                    :close-on-click-modal="false"
                  >
                    <el-form label-width="120px">
                      <div class="watchseachbox">
                        <el-form-item label="手表品牌:" style="margin-top:20px">
                          <el-autocomplete
                            class="inline-input input-style"
                            v-model="watchBrand"
                            :fetch-suggestions="handleBrandcallback"
                            placeholder="请输入手表品牌（默认全部）"
                            @select="handleSelectbrand"
                          ></el-autocomplete>
                          <!-- <el-select v-model="watchBrand">
                    <el-option v-for="(item, index) in watchBrandList"
                               :key="item.name"
                               :label="item.name"
                               :value="item.name">
                    </el-option>
                  </el-select> -->
                        </el-form-item>
                        <el-form-item
                          label="手表型号:"
                          style="margin-top:-2px"
                          required
                        >
                          <el-input
                            v-model="model"
                            style="width:70%"
                            placeholder="请输入手表型号"
                            :trigger-on-focus="false"
                          >
                          </el-input>
                          <el-button
                            style="border: 1px solid #DCDFE6;cursor: pointer;padding: 10px 18px;border-radius: 6px; margin-left:10px;background-color: white;width: 98px;
    font-size: 14px;"
                            @click="fetchSuggestions"
                            >搜索手表</el-button
                          >
                        </el-form-item>
                      </div>
                      <el-table
                        :data="models"
                        v-if="models.length > 0"
                        style="width: 100%;margin:auto;margin-bottom: 22px;"
                        highlight-current-row
                        height="30vh"
                        border
                        @current-change="handleModel"
                        ref="multipleTable"
                      >
                        <el-table-column prop="brand" label="品牌">
                        </el-table-column>
                        <el-table-column prop="model" label="型号">
                        </el-table-column>
                        <el-table-column prop="pics" label="图片">
                          <template slot-scope="scope">
                            <div style="height:140px">
                              <img
                                :src="img + '/img/watch/' + scope.row.pics"
                                alt=""
                                style=" width: 100%; height: 100%; object-fit: contain;"
                              />
                            </div>
                          </template>
                        </el-table-column>
                      </el-table>
                      <el-form-item label="采购价格:" required>
                        <div style="display: flex;">
                          <el-input
                            placeholder="请输入采购价格"
                            type="text"
                            v-model="buyWatchPrice"
                            class="input-style"
                            @input="watchprice"
                          >
                          </el-input>
                          <el-select v-model="buyWatchCurrency">
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
                      <el-form-item label="机芯号：">
                        <el-input
                          placeholder="请输入机芯号"
                          v-model="buyWatchSn"
                          class="input-style"
                        ></el-input>
                      </el-form-item>
                      <el-form-item label="保卡日期：">
                        <el-date-picker
                          v-model="buyWatchCard"
                          type="date"
                          placeholder="选择日期"
                          class="input-style"
                        >
                        </el-date-picker>
                      </el-form-item>
                      <el-form-item label="配件：">
                        <el-checkbox-group required>
                          <el-checkbox-group
                            v-model="accessory"
                            class="accessories"
                          >
                            <el-checkbox
                              v-for="accessory in accessories"
                              :label="accessory"
                              :key="accessory"
                            >
                              {{ accessory }}
                            </el-checkbox>
                          </el-checkbox-group>
                        </el-checkbox-group>
                      </el-form-item>
                      <el-form-item label="额外表带：">
                        <el-input
                          placeholder="请输入额外表带数"
                          type="text"
                          v-model="buyWatchBand"
                          class="input-style"
                          @input="waychbandInput"
                        >
                          <i
                            slot="suffix"
                            style="color: #000;margin-right:5%;font-style:normal;"
                            >条</i
                          >
                        </el-input>
                      </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                      <el-button @click="dialogUpdateWatchVisible = false"
                        >取 消</el-button
                      >
                      <el-button
                        type="primary"
                        @click="messageSureUpdate"
                        v-preventClick
                        >保 存</el-button
                      >
                    </div>
                  </el-dialog>
                  <el-tooltip
                    class="item"
                    effect="light"
                    content="删除"
                    placement="top-end"
                  >
                    <img
                      src="../../assets/imgs/delete.png"
                      style="margin-left: 30px;cursor:pointer;"
                      @click="del(index)"
                    />
                  </el-tooltip>
                  <el-dialog
                    title="提示"
                    :visible.sync="centerDialogVisible"
                    width="50%"
                    center
                  >
                    <div style="text-align:center;">
                      <span>是否删除该手表信息，删除后不能恢复</span>
                    </div>
                    <span slot="footer" class="dialog-footer">
                      <el-button @click="centerDialogVisible = false"
                        >取 消</el-button
                      >
                      <el-button
                        type="primary"
                        @click="delMessage"
                        v-preventClick
                        >确 定</el-button
                      >
                    </span>
                  </el-dialog>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <div v-if="purchaseSelect.nums == 1">
        <Details
          @goback="goback"
          :detailsSelect="detailsSelect"
          style="width: 100%;margin: 0 auto;"
        ></Details>
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
      buyDate: new Date(), //采购日期
      buyWatch: [], //采购手表列表
      store: "", //采购店铺名称
      dialogFormVisible: false,
      centerDialogVisible: false,
      dialogUpdateWatchVisible: false,
      dialogVisible: false,
      addDialog: false,
      stockvalue: false,
      buyStoreId: 0, //采购店铺id
      country: "",
      keyword: "", //采购关键字
      buyWatch: "", //采购手表列表
      model: "",
      models: [],
      myBrand: "",
      myModel: "",
      buyWatchId: "", //采购手表id
      buyWatchPrice: "", //采购价格
      buyWatchCurrency: "", //价格币种
      buyWatchSn: "", //机芯号
      buyWatchCard: new Date(), //采购保卡日期
      buyWatchParts: "", //采购配件
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
        "特殊表盒",
      ],
      buyWatchBand: "", //采购额外表带数
      watch: {},
      watchList: [],
      buyId: 0, //采购单id
      buyWatchState: 0, //手表完成状态
      buyWatchpics: "", //手表图片
      delid: 0,
      watchid: 0,
      detailsSelect: {
        id: 1,
        num: 0,
      },
      pics: [],
      imgSels: "",
      imgpeer: "",
      num: 0,
      updateIndex: 0,
      chooseimgshow: false,
      dialogAddPeerVisible: false,
      name: "", // 贸易商名称
      type: 0, // 类型
      countryPrice: "中国香港", // 国家
      countryList: [],
      contactType: "", // 联系方式
      watchBrandList: [{ name: "全部", series: "" }],
      sellBrandList: [], // 所选择的主营品牌
      sellBrand: "", // 主营品牌
      watchBrand: "",
      currencyList: [],
      warehouseid: "",
      warehouseList: [],
    };
  },
  props: ["purchaseSelect"],
  mounted() {
    this.handleCountry();
    this.handleBrand();
    this.keyword = sessionStorage.getItem("peerContainer");
    this.store = sessionStorage.getItem("peerContainer");
    sessionStorage.setItem("peerContainer", "");
    this.buyStoreId = sessionStorage.getItem("peerId");
    sessionStorage.setItem("peerId", "");
    this.country = sessionStorage.getItem("peerCountry");
    sessionStorage.setItem("peerCountry", "");
  },

  methods: {
    goback(val) {
      this.purchaseSelect.nums = val;
      this.buyDate = new Date();
      this.store = "";
      this.keyword = "";
      this.model = "";
      this.buyWatchCurrency = "";
      this.watchList = [];
    },
    // 日期 型号 价格 必须
    searchHandle() {
      this.store = "";
      console.log(this.store);
    },
    // 贸易商选择
    querySearchAsync(queryString, callback) {
      if (queryString == "") {
        this.store = "";
      }
      if (this.keyword == "") {
        this.$axios
          .post(this.$store.state.baseUrl + "/DataPeerList")
          .then((res) => {
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
          .catch((err) => {
            console.log(err);
          });
      } else {
        console.log("9999999999");
        console.log(this.dataPeerList);
        console.log(this.keyword);
        for (let item of this.dataPeerList) {
          console.log("匹配");
          console.log(item);
          if (this.keyword !== "") {
            if (item.name.indexOf(this.keyword) !== -1) {
              item.value = item.name;
              item.id = item.id;
              item.CountryCn = item.country;
            } else {
              item.value = "";
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
      this.buyStoreId = 0;
      this.buyStoreId = item.id;
      this.country = item.CountryCn;
      this.store = "";
      this.store = item.value;
      item.value = "";
    },
    // 新增贸易商
    addPeerJump() {
      this.dialogAddPeerVisible = true;
    },
    // 增加贸易商
    addPeer() {
      this.dialogAddPeerVisible = true;
      this.name = "";
      this.type = 0;
      this.countryPrice = "中国香港"; // 国家
      this.contactType = ""; // 联系方式
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
    handleSelectbrand(item) {
      this.handleSelect = item.value;
    },
    // 获取所有品牌
    handleBrand() {
      this.$axios
        .post(this.$store.state.baseUrl + "/DataWatchBrandList")
        .then((res) => {
          console.log("品牌列表");
          console.log(res);
          // this.watchBrandList=res.data
          this.watchBrandList = this.watchBrandList.concat(res.data);
        });
    },
    //获取所有仓库
    choosewarehouse() {
      if (this.stockvalue == true) {
        this.$axios
          .get(this.$store.state.baseUrl + "/companyWarehouseList")
          .then((res) => {
            this.warehouseList = res.data;
            console.log(res);
          });
      } else {
        this.warehouseid = "";
      }
    },
    handleBrandcallback(queryString, cb) {
      let restaurants = this.watchBrandList;
      for (let items of restaurants) {
        items.value = items.name;
      }
      console.log(queryString);
      let results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    // 提交前数据的验证
    sellBrandChange() {
      // 主营品牌
      console.log(this.sellBrandList);
      this.sellBrand = this.sellBrandList.join("|");
      console.log(this.sellBrand);
      if (this.name == "" || this.countryPrice == "" || this.sellBrand == "") {
        this.$message.error({
          message: "数据不能为空，请检查数据填写",
          showClose: true,
          duration: 2000,
        });
        return 1;
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
            country: this.countryPrice,
            contactType: this.contactType,
            sellBrand: this.sellBrand,
          })
          .then((res) => {
            console.log("增加贸易商");
            console.log(res);

            this.buyStoreId = res.data.id;
            this.store = res.data.name;
            this.keyword = res.data.name;
            this.country = res.data.country;
            this.price();
            this.$message.success({
              message: "新增贸易商成功",
              showClose: true,
              duration: 2000,
            });
            this.dialogAddPeerVisible = false;
            loading.close();
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
    // 添加手表
    addWatch() {
      console.log(this.buyDate);
      console.log(this.store);
      this.watchBrand = "";
      if (this.buyDate == null) {
        this.$message.error({
          message: "采购日期不能为空",
          showClose: true,
          duration: 2000,
        });
      } else if (this.store == "" || this.store == undefined) {
        this.$message.error({
          message: "贸易商不能为空",
          showClose: true,
          duration: 2000,
        });
      } else if (this.stockvalue == true && this.warehouseid == "") {
        this.$message.error({
          message: "入库仓库不能为空",
          showClose: true,
          duration: 2000,
        });
      } else {
        this.dialogFormVisible = true;
      }
      this.price();
      this.model = "";
      this.watch = {};
      this.buyWatchId = "";
      this.buyWatchPrice = "";
      this.buyWatchSn = "";
      this.accessory = [];
      this.buyWatchParts = "";
      this.buyWatchBand = "";
      this.buyWatchBrand = "";
      this.buyWatchModel = "";
    },
    closeDialog() {
      this.models = [];
      // this.watchBrand='全部'
    },
    // 手表型号
    fetchSuggestions() {
      console.log(this.model);
      this.models = [];

      // let bb=
      this.$axios
        .post(this.$store.state.baseUrl + "/WatchSearch", {
          brand: this.watchBrand == "全部" ? "" : this.watchBrand,
          model: this.model,
        })
        .then((res) => {
          console.log(res);
          for (let item of res.data) {
            item.pics = item.pics.split("|")[0];
            item.id = item.id;
            item.brand = item.brand;
            item.model = item.model;
            if (this.models.length < 30) {
              this.models.push(item);
            }
          }
          if (this.models.length <= 0) {
            this.$message.warning({
              message: "暂无数据，请检查查询条件是否错误",
              showClose: true,
            });
          }
          console.log(this.models);
        });
    },

    handleModel(item) {
      this.buyWatchId = item.id;
      this.myBrand = item.brand;
      this.myModel = item.model;
      this.model = item.model;
      console.log(item);
      if (item.pics !== null) {
        this.imgSels = item.pics.split("|")[0];
      } else {
        this.imgSels = [];
      }
      this.models = [];
    },
    // 采购价格
    watchprice() {
      if (this.buyWatchPrice < 0) {
        this.$message.error({
          message: "价格不能为负，请重新输入",
          showClose: true,
          duration: 2000,
        });
      }
    },
    // 价格币种
    price() {
      this.$axios
        .post(this.$store.state.baseUrl + "/CountryGet")
        .then((res) => {
          console.log("价格币种");
          console.log(res);
          console.log(this.country);
          for (let item of res.data) {
            // console.log(this.country);
            if (this.country == item.cnName) {
              this.buyWatchCurrency = item.enCurrency;
            }
          }
        });
    },
    // 验证数据是否为空
    verify() {
      console.log("111");
      console.log(this.buyDate);
      if (this.buyWatchId == "") {
        this.$message.error({
          message: "手表型号不能为空",
          showClose: true,
          duration: 2000,
        });
        return 1;
      } else if (this.buyWatchPrice == "") {
        this.$message.error({
          message: "采购价格不能为空",
          showClose: true,
          duration: 2000,
        });
        return 1;
      } else if (this.stockvalue == true && this.buyWatchSn == "") {
        this.$message.error({
          message: "直接入库时，机芯号不能为空",
          showClose: true,
          duration: 2000,
        });
        return 1;
      } else {
        return 2;
      }
    },
    dialogfalse() {
      (this.dialogFormVisible = false),
        // this.watchBrand='全部',
        (this.models = []);
    },
    // 确认保存手表信息
    messageSure() {
      if (this.verify() == 2) {
        // console.log(this.accessory);
        // this.buyWatchParts = '';
        console.log(this.buyWatchCard);
        this.buyWatchParts = this.accessory.join("|");
        if (
          this.buyWatchId == "" ||
          this.buyWatchPrice == "" ||
          this.buyWatchCurrency == "" ||
          this.buyWatchSn == "" ||
          this.buyWatchCard == "" ||
          this.buyWatchParts == "" ||
          this.buyWatchBand == "" ||
          this.buyWatchBrand == "" ||
          this.buyWatchModel == ""
        ) {
          this.buyWatchState = 0;
        } else {
          this.buyWatchState = 1;
        }
        this.watch = {
          buyWatchId: this.buyWatchId,
          buyWatchPrice: this.buyWatchPrice,
          buyWatchCurrency: this.buyWatchCurrency,
          buyWatchSn: this.buyWatchSn,
          buyWatchCard: this.shellDate(this.buyWatchCard),
          buyWatchParts: this.buyWatchParts,
          buyWatchBand: this.buyWatchBand,
          buyWatchBrand: this.myBrand,
          buyWatchModel: this.myModel,
          buyWatchState: this.buyWatchState,
          buyPics: this.imgSels,
          // buyWatchpics: this.$store.state.imgUrl
        };
        this.watchList.push(this.watch);
        // console.log(this.watchList);
        // console.log(this.shellDate(this.buyDate));
        this.watch = {};

        this.dialogFormVisible = false;
        this.buyWatchPrice = "";
        this.buyWatchSn = "";
        this.accessory = [];
        this.buyWatchParts = "";
        this.buyWatchBand = "";
        this.buyWatchBrand = "";
        this.buyWatchModel = "";
        // this.watchBrand='全部'
        console.log(this.pics);
      }
    },
    // 修改手表信息
    updateWatch(item, index) {
      console.log(item);
      console.log(index);
      this.updateIndex = index;
      this.buyWatchId = item.buyWatchId;
      this.dialogUpdateWatchVisible = true;
      this.model = item.buyWatchModel;
      this.buyWatchCurrency = item.buyWatchCurrency;
      this.buyWatchPrice = item.buyWatchPrice;
      this.buyWatchSn = item.buyWatchSn;
      this.buyWatchCard = item.buyWatchCard;
      this.accessory = item.buyWatchParts.split("|");
      this.buyWatchBand = item.buyWatchBand;
      this.buyWatchBrand = item.buyWatchBrand;
      (this.myBrand = item.buyWatchBrand),
        (this.myModel = item.buyWatchModel),
        (this.watchBrand = item.buyWatchBrand),
        (this.imgSels = item.buyPics);
    },
    // 确认修改
    messageSureUpdate() {
      this.buyWatchParts = this.accessory.join("|");
      if (
        this.buyWatchId == "" ||
        this.buyWatchPrice == "" ||
        this.buyWatchCurrency == "" ||
        this.buyWatchSn == "" ||
        this.buyWatchCard == "" ||
        this.buyWatchParts == "" ||
        this.buyWatchBand == "" ||
        this.buyWatchBrand == "" ||
        this.buyWatchModel == ""
      ) {
        this.buyWatchState = 0;
      } else {
        this.buyWatchState = 1;
      }
      this.watch = {
        buyWatchId: this.buyWatchId,
        buyWatchPrice: this.buyWatchPrice,
        buyWatchCurrency: this.buyWatchCurrency,
        buyWatchSn: this.buyWatchSn,
        buyWatchCard: this.shellDate(this.buyWatchCard),
        buyWatchParts: this.buyWatchParts,
        buyWatchBand: this.buyWatchBand,
        buyWatchBrand: this.myBrand,
        buyWatchModel: this.myModel,
        buyWatchState: this.buyWatchState,
        buyPics: this.imgSels,
        // buyWatchpics: this.$store.state.imgUrl
      };
      this.watchList.splice(this.updateIndex, 1, this.watch);
      // console.log(this.watch);
      // console.log(this.watchList);
      // console.log(this.shellDate(this.buyDate));
      this.watch = {};
      this.dialogUpdateWatchVisible = false;
      this.buyWatchPrice = "";
      this.buyWatchSn = "";
      this.accessory = [];
      this.buyWatchParts = "";
      this.buyWatchBand = "";
      this.buyWatchBrand = "";
      this.buyWatchModel = "";
      console.log(this.pics);
    },
    // 验证额外表带数
    waychbandInput() {
      if (Math.floor(this.buyWatchBand) !== Number(this.buyWatchBand)) {
        this.$message.error({
          message: "输入内容只能为整型数字",
          showClose: true,
          duration: 2000,
        });
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
      console.log(this.watchList);
      let watchListbuyWatchSn = true;
      let buyWatchSnname = "";
      this.watchList.forEach((element) => {
        if (element.buyWatchSn == "") {
          watchListbuyWatchSn = false;
          buyWatchSnname = element.buyWatchBrand + "-" + element.buyWatchModel;
          console.log("false");
        }
      });
      if (this.buyWatch.length == 0) {
        this.$message.error({
          message: "请添加手表信息",
          showClose: true,
          duration: 2000,
        });
        return 1;
      } else if (this.stockvalue == true && watchListbuyWatchSn == false) {
        this.$message.error({
          message: buyWatchSnname + "  机芯号为空,请完善机芯号",
          showClose: true,
          duration: 2000,
        });
        return 1;
      }
    },
    submitPurchase() {
      console.log(this.watchList);
      this.buyWatch = this.watchList;
      if (this.stockvalue == true && this.warehouseid == "") {
        this.$message.error({
          message: "入库仓库不能为空",
          showClose: true,
          duration: 2000,
        });
      } else {
        if (this.submitWatches() !== 1) {
          const loading = this.$loading({
            lock: true,
            text: "数据提交中...",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)",
          });
          console.log(this.buyStoreId);
          this.$axios
            .post(this.$store.state.baseUrl + "/BuyOrderInsert", {
              buyDate: this.shellDate(this.buyDate),
              buyStoreId: this.buyStoreId,
              buyWatch: this.buyWatch,
              warehouseId: this.warehouseid,
            })
            .then((res) => {
              console.log("添加采购单");
              console.log(res);
              this.watchid = res.data.buyId;
              loading.close();
              sessionStorage.setItem("buyId", "");
              sessionStorage.setItem("buyId", res.data.buyId);
              console.log("zzzz");
              console.log(sessionStorage.getItem("buyId"));
              this.addDialog = true;
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
      }
    },
    // 添加新的采购单
    addNew() {
      this.addDialog = false;
      this.buyDate = new Date();
      this.keyword = "";
      this.model = "";
      this.buyWatchCurrency = "";
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
    },
  },
};
</script>
<style lang="scss" scoped>
.purchase-container {
  width: 100%;

  .purchase-center {
    width: 95%;
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
.watchseachbox {
  border: 1px solid #dadbdb;
  margin-bottom: 22px;
  border-radius: 4px;
}
#peer-container {
  .buyWatchBand {
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
