<template>
  <div class="returned-consignment-container">
    <!-- <h1>待返还寄卖</h1> -->
    <div v-if="select == 0">
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
      <div v-if="total == 0" style="text-align: center;">
        <p>{{ returnedConsignmentMsg }}</p>
      </div>
      <div v-else>
        <table>
          <tr>
            <th>返还单号</th>
            <th>手表数量</th>
            <th>返还日期</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
          <tr v-for="(item, index) in returnedConsignmentList" :key="index">
            <td>{{ item.orderNo }}</td>
            <td>{{ item.watchTotal }}</td>
            <td>{{ item.createTime }}</td>
            <td>
              {{
                item.state == 0
                  ? "待返还"
                  : item.state == 1
                  ? "运输中"
                  : "已完成"
              }}
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
                  @click="returnConsignmentClick(item.id)"
                />
              </el-tooltip>
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
    </div>
    <div v-if="select == 1">
      <div class="returnlastpage" style="margin-top: 0; " @click="backtoList">
        <div>
          <img src="../../assets/imgs/goback.png" />
        </div>
        <span class="font">返回</span>
      </div>
      <div>
        <p>公司：{{ consignmentDetails.companyName }}</p>
        <p>时间：{{ consignmentDetails.createTime }}</p>
        <div style="display: flex;margin-top: 20px;">
          手表列表
          <div style="margin-left: 15px;">
            共{{ consignmentDetails.total }}块
          </div>
        </div>
        <div style="margin-top: 15px;">
          <table>
            <tr>
              <th>图片</th>
              <th>品牌型号</th>
              <th>机芯号</th>
              <th>状态</th>
            </tr>
            <tr
              v-for="(item, index) in consignmentDetails.watchList"
              :key="index"
            >
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
                <span>{{
                  item.state == 1 ? "运输中" : item.state == 2 ? "已完成" : ""
                }}</span>
                <el-button
                  type="text"
                  v-if="item.state == 0"
                  @click="returnedConsignmentWatch(item.id)"
                  >确认返还</el-button
                >
                <el-dialog
                  title="提示"
                  :visible.sync="dialogReturnedConsignmentWatchVisible"
                  width="50%"
                  center
                >
                  <div style="text-align:center;">
                    <span>确定返还该手表？</span>
                  </div>
                  <span slot="footer" class="dialog-footer">
                    <el-button
                      @click="dialogReturnedConsignmentWatchVisible = false"
                      >取 消</el-button
                    >
                    <el-button
                      type="primary"
                      @click="returnedConsignmentWatchSure"
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
      page: 1,
      total: 0,

      returnedConsignmentList: [],
      returnedConsignmentMsg: "数据加载中...",

      consignmentId: "",
      select: 0,
      consignmentDetails: {},

      watchId: "",
      dialogReturnedConsignmentWatchVisible: false,
    };
  },
  created() {
    this.getCompanyStateList();
    this.getCompanyStateBackList();
    this.getUnBackOrderList();
  },
  methods: {
    // 返还手表
    returnedConsignmentWatch(id) {
      console.log(id);
      this.watchId = id;
      this.dialogReturnedConsignmentWatchVisible = true;
    },
    // 确定
    returnedConsignmentWatchSure() {
      this.dialogReturnedConsignmentWatchVisible = false;
      this.$axios
        .post(this.$store.state.baseUrl + "/checkBack", {
          id: this.watchId,
        })
        .then((res) => {
          console.log("返还手表");
          console.log(res);
          this.$message.success({
            message: "提交成功",
            showClose: true,
            duration: 2000,
          });
          this.returnConsignmentClick(this.consignmentId);
        })
        .catch((err) => {
          console.log(err);
          this.$message.error({
            message: err.data.message,
            showClose: true,
            duration: 2000,
          });
        });
    },
    // 返还单详情
    returnConsignmentClick(id) {
      this.consignmentId = id;
      this.$axios
        .get(
          this.$store.state.baseUrl + "/backOrderInfo?id=" + this.consignmentId
        )
        .then((res) => {
          console.log("返还单详情");
          console.log(res);
          this.consignmentDetails = res.data;
          this.select = 1;

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
        .catch((err) => {
          console.log(err);
        });
    },
    backtoList() {
      this.select = 0;
      this.getUnBackOrderList();
    },
    // 公司/状态变化
    selectChange() {
      this.page = 1;
      this.getUnBackOrderList();
    },
    // 获取待返还寄卖单列表
    getUnBackOrderList() {
      this.returnedConsignmentMsg = "数据加载中...";
      this.$axios
        .get(
          this.$store.state.baseUrl +
            "/unBackOrderList?companyId=" +
            this.companyId +
            "&&state=" +
            this.state +
            "&&page=" +
            this.page +
            "&&pageNum=10"
        )
        .then((res) => {
          console.log("待返还寄卖单列表");
          console.log(res);
          this.returnedConsignmentList = res.data.list;
          this.total = res.data.total;
          if (this.returnedConsignmentList.length == 0) {
            this.returnedConsignmentMsg = "啊哦~ 暂无数据";
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
      this.getUnBackOrderList();

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
          console.log("公司及状态列表1");
          console.log(res);
          this.companyList = res.data.companyList;
          this.companyId = this.companyList[0].id;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getCompanyStateBackList() {
      this.$axios
        .post(this.$store.state.baseUrl + "/companyStateBackList")
        .then((res) => {
          console.log("公司及状态列表2");
          console.log(res);
          this.stateList = res.data.stateList;
          this.state = this.stateList[0].id;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.returned-consignment-container {
  width: 92%;
  margin: 0 auto;
  padding: 30px 20px;
  border-radius: 30px;
  background-color: #fff;

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
}
</style>
