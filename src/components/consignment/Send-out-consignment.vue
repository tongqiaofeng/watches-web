<template>
  <div class="send-out-consignment-container">
    <!-- <h1>送出寄卖</h1> -->
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
      <div v-if="watchList.length == 0" style="text-align: center;">
        <p>{{ watchListMsg }}</p>
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
            已收到总金额：
            <span style="font-size: 18px;">{{
              formatNumberRgx(payAllMoney) + " " + comCurrency
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
              <th class="table-th">已收到金额</th>
              <th class="table-th">操作</th>
            </tr>
            <tr v-for="(item, index) in watchList" :key="index">
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
                <el-tooltip
                  class="item"
                  effect="light"
                  content="修改查看信息"
                  placement="top-end"
                >
                  <img
                    src="../../assets/imgs/details.png"
                    style="cursor:pointer;"
                    @click="updateWatchMsg(item.id)"
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
    <div v-else>
      <Update-consignment
        :updateConsignmentSel="updateConsignmentSel"
        @backToConList="backToConList"
      ></Update-consignment>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      img: this.$store.state.baseUrl,
      companyId: "",
      state: "",
      keyword: "",
      page: 1,
      total: 0,
      watchListMsg: "数据加载中...",
      watchList: [],
      companyList: [],
      stateList: [],

      updateConsignmentSel: {
        select: 0,
        updateWatchId: "",
        detaSel: 0,
        isButton: 0,
      },

      consignmentAllMoney: "",
      payAllMoney: "",
      comCurrency: sessionStorage.getItem("companyLoginCurrency"),
    };
  },
  created() {
    this.getCompanyStateList();
  },
  methods: {
    // 修改寄卖手表
    updateWatchMsg(id) {
      this.updateConsignmentSel.select = 1;
      this.updateConsignmentSel.updateWatchId = id;
      this.updateConsignmentSel.detaSel = 1;
    },
    // 公司/状态变化
    selectChange() {
      this.page = 1;
      this.keyword = "";
      this.$emit("radioSel", "");
      this.getMyConsignmentSelect();
    },
    // 获取送出寄卖列表
    getMyConsignmentSelect() {
      this.watchListMsg = "数据加载中...";
      this.$axios
        .post(this.$store.state.baseUrl + "/myConsignment", {
          companyId: this.companyId,
          state: this.state,
          keyword: this.keyword,
          page: this.page,
          pageNum: 10,
        })
        .then((res) => {
          console.log("送出寄卖");
          console.log(res);
          this.total = res.data.total;
          this.watchList = res.data.watchList;
          this.consignmentAllMoney = res.data.consignmentAllMoney;
          this.payAllMoney = res.data.payAllMoney;
          if (this.watchList.length == 0) {
            this.watchListMsg = "啊哦~ 暂无数据";
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
      this.getMyConsignmentSelect();
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
      this.state = this.stateList[0].id;
      this.getMyConsignmentSelect();
    },
    backToConList(val) {
      this.updateConsignmentSel.select = 0;
      if (val == 0) {
        this.getMyConsignmentSelect();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.send-out-consignment-container {
  width: 92%;
  margin: 0 auto;
  padding: 30px 20px;
  border-radius: 30px;
  background-color: #fff;
}
</style>
