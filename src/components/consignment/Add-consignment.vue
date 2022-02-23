<template>
  <div class="add-consignment-container">
    <!-- <h1>新增寄卖</h1> -->
    <div v-if="updateConsignmentSel.select == 0">
      <div v-if="addConsignmentSel.select == 0">
        <el-button type="primary" @click="addConsignment">新增寄卖</el-button>
        <div v-if="consignmentList.length > 0" class="pruducts-list">
          <table>
            <tr>
              <th class="table-th">寄卖单号</th>
              <th class="table-th">手表数量</th>
              <th class="table-th">寄卖日期</th>
              <th class="table-th">状态</th>
              <th class="table-th">操作</th>
            </tr>
            <tr v-for="(items, index) in consignmentList" :key="index">
              <td>
                <span>{{ items.orderNo }}</span>
              </td>
              <td>
                <span>{{ items.watchTotal }}</span>
              </td>
              <td>
                <span>{{ items.consignmentDate }}</span>
              </td>
              <td>
                <span>{{
                  items.state == 0
                    ? "运输中"
                    : items.state == 1
                    ? "出售中"
                    : items.state == 2
                    ? "已出售"
                    : "已完成"
                }}</span>
              </td>
              <td>
                <el-tooltip
                  class="item"
                  effect="light"
                  content="查看信息"
                  placement="top-end"
                >
                  <img
                    src="../../assets/imgs/details.png"
                    style="cursor:pointer;"
                    @click="updateConsignmentClick(items.id)"
                  />
                </el-tooltip>
                <el-tooltip
                  class="item"
                  effect="light"
                  content="删除"
                  placement="top-end"
                >
                  <img
                    src="../../assets/imgs/delete.png"
                    style="margin-left: 30px;cursor:pointer;"
                    @click="consignmentDel(items)"
                  />
                </el-tooltip>
                <el-dialog
                  title="提示"
                  :visible.sync="consignmentDelDialogVisible"
                  width="50%"
                  center
                >
                  <div style="text-align:center;">
                    <span>是否删除该寄卖单，删除后不能恢复</span>
                  </div>
                  <span slot="footer" class="dialog-footer">
                    <el-button @click="consignmentDelDialogVisible = false"
                      >取 消</el-button
                    >
                    <el-button
                      type="primary"
                      @click="consignmentDelSure"
                      v-preventClick
                      >确 定</el-button
                    >
                  </span>
                </el-dialog>
              </td>
            </tr>
          </table>

          <div style="width: 100%;height: 50px;padding-bottom: 30px;">
            <div style="margin:15px 0;position:absolute;right:6%;">
              <el-pagination
                @current-change="handleCurrentChange"
                :current-page="page"
                layout="total, prev, pager, next, jumper"
                :total="total"
              ></el-pagination>
            </div>
          </div>
        </div>
        <div v-else style="text-align: center;margin-top: 20px;">
          <p>{{ consignmentMsg }}</p>
        </div>
      </div>
      <div v-if="addConsignmentSel.select == 1">
        <div
          class="returnlastpage"
          style="margin-top: 0; "
          @click="backtoFirst"
        >
          <div>
            <img src="../../assets/imgs/goback.png" />
          </div>
          <span class="font">返回</span>
        </div>
        <el-form label-width="105px" inline>
          <el-form-item label="接收公司：" required>
            <el-select
              v-model="companyIdFirst"
              placeholder="请选择接收公司"
              @change="companyChange"
              value-key="id"
            >
              <el-option
                v-for="item in companyList"
                :key="item.id"
                :label="item.name"
                :value="item"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="接收仓库：" required>
            <el-select
              v-model="warehouseId"
              placeholder="请选择接收仓库"
              @focus="warehouseFocus"
              required
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
          <el-form-item label="销售员：" label-width="90px" required>
            <el-select v-model="saleId" placeholder="请选择销售员">
              <el-option
                v-for="item in saleList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="寄卖日期：" required>
            <el-date-picker
              style="width: 217px;"
              v-model="consignmentDate"
              type="date"
              placeholder="请选择寄卖日期"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </el-form>
        <div style="display: flex; justify-content: space-between;">
          <div @click="addWatch" class="add">
            <span class="add-style"> <span>+</span> 添加手表 </span>
          </div>
          <button class="top-search-button" @click="submitConsignment">
            寄 卖
          </button>
        </div>
        <div v-if="watchList.length > 0" class="pruducts-list">
          <table>
            <tr>
              <th class="table-th">图片</th>
              <th class="table-th">品牌型号</th>
              <th class="table-th">机芯号</th>
              <th class="table-th">寄卖价格</th>
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
                <p style="margin: 0;">{{ item.buyWatchSn }}</p>
              </td>
              <td>
                {{
                  formatNumberRgx(item.buyWatchPrice) +
                    " " +
                    item.buyWatchCurrency
                }}
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
                    <el-button type="primary" @click="delMessage" v-preventClick
                      >确 定</el-button
                    >
                  </span>
                </el-dialog>
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div v-if="addConsignmentSel.select == 2">
        <div
          class="returnlastpage"
          style="margin-top: 0; "
          @click="backtoSecond"
        >
          <div>
            <img src="../../assets/imgs/goback.png" />
          </div>
          <span class="font">返回</span>
        </div>
        <div>
          <el-form label-width="100px">
            <el-form-item label="手表型号:" required>
              <el-autocomplete
                style="width: 50%;"
                v-model="keyword"
                placeholder="请输入手表品牌、型号或机芯号"
                :fetch-suggestions="fetchSuggestions"
                :trigger-on-focus="false"
                @select="handleModel"
              ></el-autocomplete>
            </el-form-item>
            <el-form-item label="机芯号：">
              <el-input
                style="width: 50%;"
                v-model="watchSn"
                readonly
              ></el-input>
            </el-form-item>
            <el-form-item label="保卡日期：">
              <el-date-picker
                style="width: 50%;"
                v-model="watchDate"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="额外表带：">
              <el-input
                v-model="watchNum"
                @input="waychbandInput"
                style="width: 50%;"
                ><i
                  slot="suffix"
                  style="color: #000;margin-right:5%;font-style:normal;"
                  >条</i
                ></el-input
              >
            </el-form-item>
            <el-form-item label="配件：">
              <el-checkbox-group required>
                <el-checkbox-group v-model="watchParts" class="accessories">
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
            <el-form-item label="寄卖金额：">
              <div style="display: flex;">
                <el-input
                  v-model="buyWatchPrice"
                  style="width: 50%;"
                ></el-input>
                <el-select v-model="companyCurrency">
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
          </el-form>
          <div>
            <div class="top-form">
              <span class="top-span">是否全款：</span>
              <el-switch
                v-model="sellPayFull"
                active-color="#13ce66"
                inactive-color="#ff4949"
              ></el-switch>
            </div>
            <div v-if="sellPayFull == false" style="width: 65%;">
              <div
                style="margin: 20px;padding: 20px;border: 1px solid #000;border-radius: 30px;"
              >
                <p>定金：</p>
                <el-form label-width="120px">
                  <el-form-item label="付款日期：">
                    <el-date-picker
                      v-model="sellPayTime1"
                      type="date"
                      style="width: 90%;"
                      value-format="yyyy-MM-dd"
                      format="yyyy-MM-dd"
                    ></el-date-picker>
                  </el-form-item>
                  <el-form-item label="付款金额：">
                    <el-input
                      type="text"
                      v-model="sellPayMoney1"
                      style="width: 90%;"
                    >
                      <i
                        slot="suffix"
                        style="color: #000;margin-right:5%;font-style:normal;"
                        >{{ companyCurrency }}</i
                      >
                    </el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div
                style="margin: 20px;padding: 20px;border: 1px solid #000;border-radius: 30px;"
              >
                <p>尾款：</p>
                <el-form label-width="120px">
                  <el-form-item label="付款日期：">
                    <el-date-picker
                      v-model="sellPayTime2"
                      type="date"
                      style="width: 90%;"
                      value-format="yyyy-MM-dd"
                      format="yyyy-MM-dd"
                    ></el-date-picker>
                  </el-form-item>
                  <el-form-item label="付款金额：">
                    <el-input
                      type="text"
                      v-model="sellPayMoney2"
                      style="width: 90%;"
                    >
                      <i
                        slot="suffix"
                        style="color: #000;margin-right:5%;font-style:normal;"
                        >{{ companyCurrency }}</i
                      >
                    </el-input>
                  </el-form-item>
                </el-form>
              </div>
            </div>
            <div v-if="sellPayFull == true" style="width: 75%;">
              <div
                style="margin: 20px;padding: 20px;border: 1px solid #000;border-radius: 30px;"
              >
                <el-form label-width="120px">
                  <el-form-item label="付款日期：">
                    <el-date-picker
                      v-model="sellPayTime1"
                      type="date"
                      style="width: 50%;"
                      value-format="yyyy-MM-dd"
                      format="yyyy-MM-dd"
                    ></el-date-picker>
                  </el-form-item>
                  <el-form-item label="付款金额：">
                    <el-input
                      type="text"
                      v-model="sellPayMoney1"
                      style="width: 50%;"
                    >
                      <i
                        slot="suffix"
                        style="color: #000;margin-right:5%;font-style:normal;"
                        >{{ companyCurrency }}</i
                      >
                    </el-input>
                  </el-form-item>
                </el-form>
              </div>
            </div>
            <div style="margin: 20px;">
              <p>备注：</p>
              <el-input
                style="width: 50%;"
                type="textarea"
                v-model="sellNote"
                placeholder="请输入备注信息"
              ></el-input>
            </div>
          </div>
        </div>
        <div style="margin-top: 30px;text-align: center;">
          <el-button
            v-if="updateOrAdd == 0"
            type="primary"
            @click="watchSelSave"
            style="margin: 0 auto;"
            v-preventClick
            >保 存</el-button
          >
          <el-button
            v-if="updateOrAdd == 1"
            type="primary"
            @click="watchSelUpdate"
            style="margin: 0 auto;"
            v-preventClick
            >保 存</el-button
          >
        </div>
      </div>
    </div>
    <div v-if="updateConsignmentSel.select == 1">
      <div class="returnlastpage" style="margin-top: 0; " @click="goBack001">
        <div>
          <img src="../../assets/imgs/goback.png" />
        </div>
        <span class="font">返回</span>
      </div>
      <!-- <h1>修改寄卖单</h1> -->
      <p>接收公司：{{ conDetails.companyName }}</p>
      <p>寄卖日期：{{ conDetails.consignmentDate }}</p>
      <div style="display: flex;margin-top: 20px;">
        手表列表
        <div style="margin-left: 15px;">共{{ conWatchTotal }}块</div>
      </div>
      <div class="pruducts-list">
        <table>
          <tr>
            <th class="table-th">图片</th>
            <th class="table-th">品牌型号</th>
            <th class="table-th">机芯号</th>
            <th class="table-th">寄卖价格</th>
            <th class="table-th">状态</th>
          </tr>
          <tr v-for="(item, index) in conDetails.watchList" :key="index">
            <td>
              <img
                v-image-preview
                :src="
                  item.watchPic == null || item.watchPic == ''
                    ? ''
                    : img + '/img/watch/' + item.watchPic.split('|')[0]
                "
                style="width: 100px;height: 100px;object-fit: cover;border-radius: 30px;"
              />
            </td>
            <td>
              <p style="margin: 0;">{{ item.watchBrand }}</p>
              <p style="margin: 0;">{{ item.watchModel }}</p>
            </td>
            <td>
              <p style="margin: 0;">{{ item.buyWatchSn }}</p>
            </td>
            <td>
              {{
                formatNumberRgx(item.buyWatchPrice) +
                  " " +
                  item.buyWatchCurrency
              }}
            </td>
            <td>
              <span>{{
                item.state == 0
                  ? "运输中"
                  : item.state == 1
                  ? "出售中"
                  : item.state == 2
                  ? "已出售"
                  : "已完成"
              }}</span>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      img: this.$store.state.baseUrl,
      companyList: [],
      saleList: [],
      companyIdFirst: "",
      companyId: "",
      warehouseList: [],
      warehouseId: "",
      companyCurrencyFirst: "",
      saleId: "",
      consignmentDate: "",
      watchList: [],
      keyword: "",
      models: [],
      watchId: "",
      watchBrand: "",
      watchModel: "",
      watchSn: "",
      watchDate: "",
      watchNum: "",
      watchParts: [],
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
      buyWatchPrice: "",
      companyCurrency: "",
      currencyList: [],
      sellPayFull: false,
      sellPayTime1: "",
      sellPayMoney1: "",
      sellPayTime2: "",
      sellPayMoney2: "",
      sellNote: "",
      imgSels: "",
      centerDialogVisible: false,
      delid: "",

      updateIndex: "",
      updateOrAdd: 0,

      page: 1,
      total: 0,
      consignmentList: [],
      consignmentMsg: "数据加载中...",

      updateConsignmentSel: {
        select: 0,
      },
      updateConId: "",

      consignmentDelDialogVisible: false,
      delConsignmentId: "",
      conDetails: {},
      conWatchTotal: 0,
    };
  },
  props: ["addConsignmentSel"],
  created() {
    this.getCompanyMsg();
    this.getConsignmentList();
  },
  methods: {
    // 获取寄卖单详情
    getConsignmentDetails() {
      this.$axios
        .get(
          this.$store.state.baseUrl + "/consignmentInfo?id=" + this.updateConId
        )
        .then((res) => {
          console.log("寄卖单详情");
          console.log(res);
          this.conDetails = res.data;
          this.conWatchTotal = this.conDetails.watchList.length;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 修改寄卖单
    updateConsignmentClick(id) {
      console.log(id);
      this.updateConId = id;
      this.updateConsignmentSel.select = 1;
      this.getConsignmentDetails();
    },
    // 删除寄卖单
    consignmentDel(item) {
      if (item.isDelete == 0) {
        this.$message.error({
          message: "该寄卖单手表已收货，不可删除",
          showClose: true,
          duration: 2000,
        });
      } else {
        this.delConsignmentId = item.id;
        this.consignmentDelDialogVisible = true;
      }
    },
    // 确定删除
    consignmentDelSure() {
      this.$axios
        .get(
          this.$store.state.baseUrl +
            "/consignmentDelete?id=" +
            this.delConsignmentId
        )
        .then((res) => {
          console.log("删除寄卖单");
          console.log(res);
          this.$message.success({
            message: "寄卖单删除成功",
            showClose: true,
            duration: 2000,
          });
          this.consignmentDelDialogVisible = false;
          this.page = 1;
          this.getConsignmentList();
        })
        .catch((err) => {
          console.log(err);
          this.consignmentDelDialogVisible = false;
          this.$message.error({
            message: err.data.message,
            showClose: true,
            duration: 2000,
          });
        });
    },
    // 新增寄卖
    addConsignment() {
      this.companyIdFirst = "";
      this.companyId = "";
      this.warehouseId = "";
      this.saleId = "";
      this.consignmentDate = "";
      this.watchList = [];
      this.addConsignmentSel.select = 1;
    },
    // 添加手表
    addWatch() {
      if (
        this.companyIdFirst == "" ||
        this.companyId == "" ||
        this.warehouseId == "" ||
        this.saleId == "" ||
        this.consignmentDate == ""
      ) {
        this.$message.warning({
          message: "数据不能为空",
          showClose: true,
          duration: 2000,
        });
      } else {
        this.keyword = "";
        this.models = [];
        this.watchId = "";
        this.watchBrand = "";
        this.watchModel = "";
        this.watchSn = "";
        this.watchDate = "";
        this.watchNum = "";
        this.watchParts = [];
        this.buyWatchPrice = "";
        this.companyCurrency = this.companyCurrencyFirst;
        this.sellPayFull = false;
        this.sellPayTime1 = "";
        this.sellPayMoney1 = "";
        this.sellPayTime2 = "";
        this.sellPayMoney2 = "";
        this.sellNote = "";
        this.imgSels = "";

        this.addConsignmentSel.select = 2;
        this.updateOrAdd = 0;
        this.handleCountryGet();
      }
    },
    // 保存添加的手表
    watchSelSave() {
      console.log(this.watchBrand);
      if (this.watchBrand == "") {
        this.$message.warning({
          message: "请选择寄卖手表",
          showClose: true,
          duration: 2000,
        });
      } else if (this.buyWatchPrice == "") {
        this.$message.warning({
          message: "请输入寄卖价格",
          showClose: true,
          duration: 2000,
        });
      } else {
        if (this.sellPayFull == false) {
          if (this.sellPayMoney2 !== "" && this.sellPayMoney2 !== null) {
            if (
              Number(this.sellPayMoney2) + Number(this.sellPayMoney1) !==
              this.buyWatchPrice
            ) {
              this.$message.error({
                message:
                  "定金与尾款之和不等于寄卖金额，不能保存，请检查数据填写",
                showClose: true,
                duration: 2000,
              });
            } else {
              this.watchList.push({
                id: this.watchId,
                buyPics: this.imgSels,
                buyWatchBrand: this.watchBrand,
                buyWatchModel: this.watchModel,
                buyWatchPrice: this.buyWatchPrice,
                buyWatchCurrency: this.companyCurrency,
                buyWatchSn: this.watchSn,
                buyWatchCard: this.watchDate,
                buyWatchParts: this.watchParts.join("|"),
                buyWatchBand: this.watchNum,
                sellPayFull: this.sellPayFull == false ? 0 : 1,
                sellPayMoney1: this.sellPayMoney1,
                sellPayTime1: this.sellPayTime1,
                sellPayMoney2: this.sellPayMoney2,
                sellPayTime2: this.sellPayTime2,
                sellNote: this.sellNote,
              });
              this.addConsignmentSel.select = 1;
            }
          } else {
            this.watchList.push({
              id: this.watchId,
              buyPics: this.imgSels,
              buyWatchBrand: this.watchBrand,
              buyWatchModel: this.watchModel,
              buyWatchPrice: this.buyWatchPrice,
              buyWatchCurrency: this.companyCurrency,
              buyWatchSn: this.watchSn,
              buyWatchCard: this.watchDate,
              buyWatchParts: this.watchParts.join("|"),
              buyWatchBand: this.watchNum,
              sellPayFull: this.sellPayFull == false ? 0 : 1,
              sellPayMoney1: this.sellPayMoney1,
              sellPayTime1: this.sellPayTime1,
              sellPayMoney2: this.sellPayMoney2,
              sellPayTime2: this.sellPayTime2,
              sellNote: this.sellNote,
            });
            this.addConsignmentSel.select = 1;
          }
        } else if (this.sellPayFull == true) {
          if (this.sellPayMoney1 !== "" && this.sellPayMoney1 !== null) {
            if (Number(this.sellPayMoney1) !== this.buyWatchPrice) {
              this.$message.error({
                message: "定金不等于寄卖金额，不能保存，请检查数据填写",
                showClose: true,
                duration: 2000,
              });
            } else {
              this.watchList.push({
                id: this.watchId,
                buyPics: this.imgSels,
                buyWatchBrand: this.watchBrand,
                buyWatchModel: this.watchModel,
                buyWatchPrice: this.buyWatchPrice,
                buyWatchCurrency: this.companyCurrency,
                buyWatchSn: this.watchSn,
                buyWatchCard: this.watchDate,
                buyWatchParts: this.watchParts.join("|"),
                buyWatchBand: this.watchNum,
                sellPayFull: this.sellPayFull == false ? 0 : 1,
                sellPayMoney1: this.sellPayMoney1,
                sellPayTime1: this.sellPayTime1,
                sellNote: this.sellNote,
              });
              this.addConsignmentSel.select = 1;
            }
          } else {
            this.watchList.push({
              id: this.watchId,
              buyPics: this.imgSels,
              buyWatchBrand: this.watchBrand,
              buyWatchModel: this.watchModel,
              buyWatchPrice: this.buyWatchPrice,
              buyWatchCurrency: this.companyCurrency,
              buyWatchSn: this.watchSn,
              buyWatchCard: this.watchDate,
              buyWatchParts: this.watchParts.join("|"),
              buyWatchBand: this.watchNum,
              sellPayFull: this.sellPayFull == false ? 0 : 1,
              sellPayMoney1: this.sellPayMoney1,
              sellPayTime1: this.sellPayTime1,
              sellNote: this.sellNote,
            });
            this.addConsignmentSel.select = 1;
          }
        }
      }
    },
    // 修改手表信息
    updateWatch(item, index) {
      console.log(item);
      console.log(index);
      this.updateIndex = index;

      this.watchId = item.id;
      this.imgSels = item.buyPics;
      this.watchBrand = item.buyWatchBrand;
      this.watchModel = item.buyWatchModel;
      this.buyWatchPrice = item.buyWatchPrice;
      this.companyCurrency = item.buyWatchCurrency;
      this.watchSn = item.buyWatchSn;
      this.watchDate = item.buyWatchCard;
      this.watchParts = item.buyWatchParts.split("|");
      this.watchNum = item.buyWatchBand;
      this.sellPayFull = item.sellPayFull == 0 ? false : true;
      this.sellPayMoney1 = item.sellPayMoney1;
      this.sellPayTime1 = item.sellPayTime1;
      item.sellPayFull == false
        ? (this.sellPayMoney2 = item.sellPayMoney2)
        : (this.sellPayMoney2 = "");
      item.sellPayFull == false
        ? (this.sellPayTime2 = item.sellPayTime2)
        : (this.sellPayTime2 = "");
      this.sellNote = item.sellNote;

      this.addConsignmentSel.select = 2;
      this.updateOrAdd = 1;
    },
    // 保存修改信息
    watchSelUpdate() {
      let params = {};

      if (this.sellPayFull == false) {
        if (this.sellPayMoney2 !== "" && this.sellPayMoney2 !== null) {
          if (
            Number(this.sellPayMoney2) + Number(this.sellPayMoney1) !==
            this.buyWatchPrice
          ) {
            this.$message.error({
              message: "定金与尾款之和不等于寄卖金额，不能保存，请检查数据填写",
              showClose: true,
              duration: 2000,
            });
          }
        } else {
          params = {
            id: this.watchId,
            buyPics: this.imgSels,
            buyWatchBrand: this.watchBrand,
            buyWatchModel: this.watchModel,
            buyWatchPrice: this.buyWatchPrice,
            buyWatchCurrency: this.companyCurrency,
            buyWatchSn: this.watchSn,
            buyWatchCard: this.watchDate,
            buyWatchParts: this.watchParts.join("|"),
            buyWatchBand: this.watchNum,
            sellPayFull: this.sellPayFull == false ? 0 : 1,
            sellPayMoney1: this.sellPayMoney1,
            sellPayTime1: this.sellPayTime1,
            sellPayMoney2: this.sellPayMoney2,
            sellPayTime2: this.sellPayTime2,
            sellNote: this.sellNote,
          };
          this.watchList.splice(this.updateIndex, 1, params);
          this.addConsignmentSel.select = 1;
        }
      } else if (this.sellPayFull == true) {
        if (this.sellPayMoney1 !== "" && this.sellPayMoney1 !== null) {
          if (Number(this.sellPayMoney1) !== this.buyWatchPrice) {
            this.$message.error({
              message: "定金不等于寄卖金额，不能保存，请检查数据填写",
              showClose: true,
              duration: 2000,
            });
          }
        } else {
          params = {
            id: this.watchId,
            buyPics: this.imgSels,
            buyWatchBrand: this.watchBrand,
            buyWatchModel: this.watchModel,
            buyWatchPrice: this.buyWatchPrice,
            buyWatchCurrency: this.companyCurrency,
            buyWatchSn: this.watchSn,
            buyWatchCard: this.watchDate,
            buyWatchParts: this.watchParts.join("|"),
            buyWatchBand: this.watchNum,
            sellPayFull: this.sellPayFull == false ? 0 : 1,
            sellPayMoney1: this.sellPayMoney1,
            sellPayTime1: this.sellPayTime1,
            sellNote: this.sellNote,
          };
          this.watchList.splice(this.updateIndex, 1, params);
          this.addConsignmentSel.select = 1;
        }
      }
    },
    // 删除手表
    del(index) {
      console.log("222222222");
      console.log(index);
      this.delid = index;
      this.centerDialogVisible = true;
    },
    delMessage() {
      this.watchList.splice(this.delid, 1);
      this.centerDialogVisible = false;
    },
    // 手表型号
    fetchSuggestions(queryString, callback) {
      this.$axios
        .get(
          this.$store.state.baseUrl +
            "/stockInWatchList?keyword=" +
            this.keyword
        )
        .then((res) => {
          console.log(res);
          for (let item of res.data) {
            item.value = item.watchBrand + "-" + item.watchModel;
            item.id = item.id;
            item.watchBrand = item.watchBrand;
            item.watchModel = item.watchModel;
            item.watchModel = item.watchModel;
            item.buyWatchSn = item.buyWatchSn;
            item.buyWatchCard = item.buyWatchCard;
            item.buyWatchBand = item.buyWatchBand;
            item.buyWatchParts = item.buyWatchParts;
            item.watchPic = item.watchPic;
          }
          this.models = res.data;
          callback(this.models);
        });
    },
    handleModel(item) {
      this.watchId = item.id;
      this.watchBrand = item.watchBrand;
      this.watchModel = item.watchModel;
      this.watchSn = item.buyWatchSn;
      this.watchDate = item.buyWatchCard;
      this.watchNum = item.buyWatchBand;
      if (item.buyWatchParts !== "" && item.buyWatchParts !== null) {
        if (item.buyWatchParts.indexOf("|") !== -1) {
          this.watchParts = item.buyWatchParts.split("|");
        } else {
          this.watchParts.push(item.buyWatchParts);
        }
      }
      console.log(item);
      if (item.watchPic !== null) {
        this.imgSels = item.watchPic.split("|")[0];
      } else {
        this.imgSels = [];
      }
    },
    // 确定寄卖
    submitConsignment() {
      if (
        this.companyIdFirst == "" ||
        this.companyId == "" ||
        this.warehouseId == "" ||
        this.saleId == "" ||
        this.consignmentDate == ""
      ) {
        this.$message.warning({
          message: "数据不能为空",
          showClose: true,
          duration: 2000,
        });
      } else if (this.watchList.length == 0) {
        this.$message.warning({
          message: "请添加寄卖手表",
          showClose: true,
          duration: 2000,
        });
      } else {
        this.$axios
          .post(this.$store.state.baseUrl + "/consignmentSave", {
            companyId: this.companyId,
            warehouseId: this.warehouseId,
            saleId: this.saleId,
            consignmentDate: this.consignmentDate,
            watchList: this.watchList,
          })
          .then((res) => {
            console.log("新增寄卖");
            console.log(res);
            this.$message.success({
              message: "新增寄卖成功",
              showClose: true,
              duration: 2000,
            });
            this.addConsignmentSel.select = 0;
            this.page = 1;
            this.getConsignmentList();
          })
          .catch((err) => {
            console.log(err);
            this.$message.error({
              message: err.data.message,
              showClose: true,
              duration: 2000,
            });
          });
      }
    },
    // 获取寄卖单列表
    getConsignmentList() {
      this.consignmentMsg = "数据加载中...";
      this.$axios
        .get(
          this.$store.state.baseUrl +
            "/consignmentList?page=" +
            this.page +
            "&&pageNum=10"
        )
        .then((res) => {
          console.log("寄卖单列表");
          console.log(res);
          this.consignmentList = res.data.list;
          this.total = res.data.total;
          if (this.consignmentList.length == 0) {
            this.consignmentMsg = "啊哦~暂无数据";
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 验证额外表带数
    waychbandInput() {
      if (Math.floor(this.watchNum) !== Number(this.watchNum)) {
        this.$message.error({
          message: "输入内容只能为整型数字",
          showClose: true,
          duration: 2000,
        });
      }
    },
    // 分页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page = val;
      console.log(this.page);
      this.getConsignmentList();
      (function smoothscroll() {
        var currentScroll =
          document.documentElement.scrollTop || document.body.scrollTop;
        if (currentScroll > 0) {
          window.requestAnimationFrame(smoothscroll);
          window.scrollTo(0, currentScroll - currentScroll / 5);
        }
      })();
    },
    backtoFirst() {
      this.addConsignmentSel.select = 0;
    },
    backtoSecond() {
      this.addConsignmentSel.select = 1;
    },
    goBack001() {
      console.log("99999999999");
      this.addConsignmentSel.select = 0;
      this.updateConsignmentSel.select = 0;
    },
    // 公司选择
    companyChange(e) {
      console.log("公司");
      console.log(e);
      this.companyId = e.id;
      this.companyCurrencyFirst = e.currency;
      this.warehouseList = e.warehouseList;
    },
    // 接收仓库
    warehouseFocus() {
      if (this.companyIdFirst == "" || this.companyIdFirst == null) {
        this.$message.warning({
          message: "请选择接收公司",
          showClose: true,
          duration: 2000,
        });
      }
    },
    // 获取接收公司、仓库及销售人员列表
    getCompanyMsg() {
      this.$axios
        .post(this.$store.state.baseUrl + "/companyMsgGet")
        .then((res) => {
          console.log("接收公司、仓库及销售人员列表");
          console.log(res);
          this.companyList = res.data.companyList;
          this.saleList = res.data.saleList;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 获取币种列表
    handleCountryGet() {
      this.$axios
        .post(this.$store.state.baseUrl + "/CountryGet")
        .then((res) => {
          console.log("国家列表");
          console.log(res);
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
  },
};
</script>

<style lang="scss" scoped>
.add-consignment-container {
  width: 92%;
  margin: 0 auto;
  padding: 30px 20px;
  border-radius: 30px;
  background-color: #fff;

  .pruducts-list {
    padding-top: 20px;

    .table-th {
      font-size: 17px;
      font-weight: normal;
    }

    td {
      padding: 20px;
      font-size: 15px;
      background-color: #f3fbf9;
    }
  }

  table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;

    th {
      height: 50px;
    }
  }

  tr {
    th,
    td {
      width: 20%;
      text-align: center;
    }
  }

  .returnlastpage {
    width: 75px;
    height: 33px;
    line-height: 33px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
  }

  .returnlastpage img {
    width: 30px;
    height: 25px;
  }

  .returnlastpage div {
    margin-top: 5px;
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
}
</style>
