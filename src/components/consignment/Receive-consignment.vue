<template>
  <div class="receive-consignment-container">
    <!-- <h1>收到寄卖</h1> -->
    <div v-if="updateConsignmentSel.select == 0">
      <el-form inline label-width="60px">
        <el-form-item label="公司：">
          <el-select
            v-model="companyId"
            placeholder="请选择公司"
            @change="selectChange"
          >
            <el-option
              v-for="item in companyList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态：">
          <el-select
            v-model="state"
            placeholder="请选择公司"
            @change="selectChange"
          >
            <el-option
              v-for="item in stateList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div
        v-if="myRcivedConsignmentList.length == 0"
        style="text-align: center;"
      >
        <p>{{ myRcivedConsignmentMsg }}</p>
      </div>
      <div v-else>
        <div style="display: flex;">
          <div>
            寄卖总金额：
            <span style="font-size: 18px;">{{
              formatNumberRgx(consignmentAllMoney) + " " + comCurrency
            }}</span>
          </div>
          <div style="margin-left: 100px;">
            已支付总金额：
            <span style="font-size: 18px;">{{
              formatNumberRgx(payAllMoney) + " " + comCurrency
            }}</span>
          </div>
          <div style="margin-left: 100px;">
            已出售总金额：
            <span style="font-size: 18px;">{{
              formatNumberRgx(saleAllMoney) + " " + comCurrency
            }}</span>
          </div>
        </div>
        <div style="display: flex;margin-top: 20px;">
          手表列表
          <div style="margin-left: 15px;">共{{ total }}块</div>
        </div>
        <div class="pruducts-list">
          <table>
            <tr>
              <th class="table-th">图片</th>
              <th class="table-th">品牌型号</th>
              <th class="table-th">机芯号</th>
              <th class="table-th">寄卖价格</th>
              <th class="table-th">状态</th>
              <th class="table-th">结算状态</th>
              <th class="table-th">寄卖金额</th>
              <th class="table-th">已支付金额</th>
              <th class="table-th">已出售金额</th>
              <th class="table-th">操作</th>
            </tr>
            <tr v-for="(item, index) in myRcivedConsignmentList" :key="index">
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
                    : ""
                }}</span>
              </td>
              <td>
                <span>{{ item.state2 == 3 ? "未结算" : "已结算" }}</span>
              </td>
              <td>
                {{ formatNumberRgx(item.consignmentMoney) + " " + comCurrency }}
              </td>
              <td>
                {{ formatNumberRgx(item.payMoney) + " " + comCurrency }}
              </td>
              <td>
                {{ formatNumberRgx(item.saleMoney) + " " + comCurrency }}
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
                    @click="updateWatchMsg(item)"
                  />
                </el-tooltip>
              </td>
            </tr>
          </table>
        </div>
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
    </div>
    <div v-if="updateConsignmentSel.select == 1">
      <Sale-consignment
        :updateConsignmentSel="updateConsignmentSel"
        @backToConList="backToConList"
      ></Sale-consignment>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      img: this.$store.state.baseUrl,
      companyList: [],
      stateList: [],
      companyId: "",
      state: "",
      keyword: "",
      page: 1,
      total: 0,
      myRcivedConsignmentList: [],
      myRcivedConsignmentMsg: "数据加载中...",

      updateConsignmentSel: {
        select: 0,
        updateWatchId: "",
        detaSel: 0,
        isButton: 1,
      },

      consignmentAllMoney: "",
      payAllMoney: "",
      saleAllMoney: "",
      comCurrency: sessionStorage.getItem("companyLoginCurrency"),
    };
  },
  created() {
    this.getCompanyStateList();
  },
  methods: {
    backToConList(val) {
      this.updateConsignmentSel.select = 0;
      if (val == 0) {
        this.getMyRcivedConsignmentList();
      }
    },
    // 手表详情
    updateWatchMsg(item) {
      console.log(item);
      if (item.state == 0 || item.state == 1) {
        this.updateConsignmentSel.isButton = 1;
      } else {
        this.updateConsignmentSel.isButton = 0;
      }
      this.updateConsignmentSel.select = 1;
      this.updateConsignmentSel.updateWatchId = item.id;
      this.updateConsignmentSel.detaSel = 1;

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
    // 公司/状态变化
    selectChange() {
      this.page = 1;
      this.keyword = "";
      this.$emit("radioSel", "");
      this.getMyRcivedConsignmentList();
    },
    // 获取收到寄卖列表
    getMyRcivedConsignmentList() {
      this.myRcivedConsignmentMsg = "数据加载中...";
      this.$axios
        .get(
          this.$store.state.baseUrl +
            "/myReceivedConsignment?companyId=" +
            this.companyId +
            "&&state=" +
            this.state +
            "&&keyword=" +
            this.keyword +
            "&&page=" +
            this.page +
            "&&pageNum=10"
        )
        .then((res) => {
          console.log("收到寄卖列表");
          console.log(res);
          this.total = res.data.total;
          this.myRcivedConsignmentList = res.data.watchList;
          this.consignmentAllMoney = res.data.consignmentAllMoney;
          this.payAllMoney = res.data.payAllMoney;
          this.saleAllMoney = res.data.saleAllMoney;
          if (this.myRcivedConsignmentList.length == 0) {
            this.myRcivedConsignmentMsg = "啊哦~ 暂无数据";
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 分页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page = val;
      console.log(this.page);
      this.getMyRcivedConsignmentList();

      (function smoothscroll() {
        var currentScroll =
          document.documentElement.scrollTop || document.body.scrollTop;
        if (currentScroll > 0) {
          window.requestAnimationFrame(smoothscroll);
          window.scrollTo(0, currentScroll - currentScroll / 5);
        }
      })();
    },
    // 获取公司及状态列表
    getCompanyStateList() {
      this.$axios
        .post(this.$store.state.baseUrl + "/companyStateList")
        .then((res) => {
          console.log("公司及状态列表");
          console.log(res);
          this.companyList = res.data.companyList;
          this.stateList = res.data.stateList;
          this.dataAgo();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    dataAgo() {
      this.companyId = this.companyList[0].id;
      this.state = this.stateList[2].id;
      this.getMyRcivedConsignmentList();
    },
  },
};
</script>

<style lang="scss" scoped>
.receive-consignment-container {
  width: 92%;
  margin: 0 auto;
  padding: 30px 20px;
  border-radius: 30px;
  background-color: #fff;
}
</style>
