<template>
  <div class="recover-consignment-container">
    <!-- <h1>返还寄卖</h1> -->
    <div v-if="pageSelect.select == 0">
      <div style="display: flex;justify-content: space-between;">
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
        <el-button type="primary" @click="recoverConsignment"
          >返还寄卖</el-button
        >
      </div>
      <div v-if="backOrderList.length == 0" style="text-align: center;">
        <p>{{ backOrderListMsg }}</p>
      </div>
      <div v-else>
        <div style="display: flex;margin-top: 20px;">
          手表列表
          <div style="margin-left: 15px;">共{{ total2 }}块</div>
        </div>
        <div class="pruducts-list">
          <table>
            <tr>
              <th>返还单号</th>
              <th>手表数量</th>
              <th>返还日期</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
            <tr v-for="(con, index) in backOrderList" :key="index">
              <td>{{ con.orderNo }}</td>
              <td>{{ con.watchTotal }}</td>
              <td>{{ con.createTime }}</td>
              <td>
                {{
                  con.state == 0
                    ? "待返还"
                    : con.state == 1
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
                    @click="updateRecoverConsignmentMsg(con.id)"
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
                    @click="consignmentDelete(con)"
                  />
                </el-tooltip>
                <el-dialog
                  title="提示"
                  :visible.sync="dialogConsignmentDeleteVisible"
                  width="50%"
                  center
                >
                  <div style="text-align:center;">
                    <span>确定删除该返还单？</span>
                  </div>
                  <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogConsignmentDeleteVisible = false"
                      >取 消</el-button
                    >
                    <el-button
                      type="primary"
                      @click="consignmentDeleteSure"
                      v-preventClick
                      >确 定</el-button
                    >
                  </span>
                </el-dialog>
              </td>
            </tr>
          </table>
        </div>
        <div style="width: 100%;height: 50px;padding-bottom: 30px;">
          <div style="margin:15px 0;position:absolute;right:6%;">
            <el-pagination
              @current-change="handleCurrentChange2"
              :current-page="page2"
              layout="total, prev, pager, next, jumper"
              :total="total2"
            ></el-pagination>
          </div>
        </div>
      </div>
    </div>
    <div v-if="pageSelect.select == 1">
      <div
        class="returnlastpage"
        style="margin-top: 0; "
        @click="goBackAction01"
      >
        <div>
          <img src="../../assets/imgs/goback.png" />
        </div>
        <span class="font">返回</span>
      </div>
      <div>
        <span>寄卖公司：</span>
        <el-select v-model="id" @change="companyChange">
          <el-option
            v-for="item in companyBackList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div>
      <div v-if="watchList.length == 0" style="text-align: center;">
        <p>{{ watchListMsg }}</p>
      </div>
      <div v-else>
        <div style="display: flex;margin-top: 20px;">
          手表列表
          <div style="margin-left: 15px;">共{{ total }}块</div>
        </div>
        <div class="pruducts-list">
          <table>
            <tr>
              <th>选择返还</th>
              <th class="table-th">图片</th>
              <th class="table-th">品牌型号</th>
              <th class="table-th">机芯号</th>
              <th class="table-th">寄卖价格</th>
            </tr>
            <tr v-for="(item, index) in watchList" :key="index">
              <td>
                <input
                  class="selBtn"
                  type="checkbox"
                  v-model="hobby"
                  :value="item"
                  @change="checkedChange($event, item, index)"
                />
              </td>
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
        <div class="sure">
          <input
            type="button"
            value="确 认"
            class="sure-button"
            @click="recoverConsignmentSure"
          />
          <el-dialog
            title="返还手表"
            :visible.sync="dialogRecoverConsignmentVisible"
            center
            :close-on-press-escape="false"
            :close-on-click-modal="false"
            :modal-append-to-body="false"
            :append-to-body="false"
          >
            <div style="text-align: center;">
              <p style="font-size: 16px;">确定返还手表？</p>
            </div>
            <div slot="footer">
              <el-button @click="dialogRecoverConsignmentVisible = false"
                >取 消</el-button
              >
              <el-button type="primary" @click="recoverConsignmentOk"
                >确 定</el-button
              >
            </div>
          </el-dialog>
        </div>
      </div>
    </div>
    <div v-if="pageSelect.select == 3">
      <div
        class="returnlastpage"
        style="margin-top: 0; "
        @click="goBackAction02"
      >
        <div>
          <img src="../../assets/imgs/goback.png" />
        </div>
        <span class="font">返回</span>
      </div>
      <div>
        <p>公司：{{ backOrderInfoDetails.companyName }}</p>
        <p>时间：{{ backOrderInfoDetails.createTime }}</p>
        <div style="display: flex;margin-top: 20px;">
          手表列表
          <div style="margin-left: 15px;">
            共{{ backOrderInfoDetails.total }}块
          </div>
        </div>
        <div class="pruducts-list">
          <table>
            <tr>
              <th>图片</th>
              <th>品牌型号</th>
              <th>机芯号</th>
              <th>寄卖价格</th>
              <th>状态</th>
            </tr>
            <tr
              v-for="(item, index) in backOrderInfoDetails.watchList"
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
                {{
                  formatNumberRgx(item.buyWatchPrice) +
                    " " +
                    item.buyWatchCurrency
                }}
              </td>
              <td>
                {{
                  item.state == 0
                    ? "待返还"
                    : item.state == 1
                    ? "运输中"
                    : "已完成"
                }}
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
      pageSelect: {
        select: 0,
      },
      companyBackList: [],
      id: "",

      watchList: [],
      watchListMsg: "数据加载中...",
      page: 1,
      total: 0,

      companyList: [],
      stateList: [],
      companyId: "",
      state: "",
      page2: 1,
      total2: 0,
      backOrderList: [],
      backOrderListMsg: "数据加载中...",

      isChecked: [],
      hobby: [],
      dialogRecoverConsignmentVisible: false,

      backOrderInfoId: "",
      backOrderInfoDetails: {},

      watchOneOrSecond: 0,
      dialogConsignmentDeleteVisible: false,
      deleteId: "",
    };
  },
  created() {
    this.getCompanyStateList();
    this.getCompanyStateBackList();
  },
  methods: {
    // 删除返还单
    consignmentDelete(item) {
      console.log(item);
      this.deleteId = item.id;
      this.dialogConsignmentDeleteVisible = true;
    },
    // 确定删除
    consignmentDeleteSure() {
      this.dialogConsignmentDeleteVisible = false;
      this.$axios
        .post(this.$store.state.baseUrl + "/backOrderDelete", {
          id: Number(this.deleteId),
        })
        .then((res) => {
          console.log("删除返还单");
          console.log(res);
          this.$message.success({
            message: "删除成功",
            showClose: true,
            duration: 2000,
          });
          this.getMyConsignmentSelect();
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
    // 修改返还单
    updateRecoverConsignmentMsg(id) {
      console.log(id);
      this.backOrderInfoId = id;
      this.$axios
        .get(
          this.$store.state.baseUrl +
            "/backOrderInfo?id=" +
            this.backOrderInfoId
        )
        .then((res) => {
          console.log("返还单详情");
          console.log(res);
          this.backOrderInfoDetails = res.data;
          this.pageSelect.select = 3;
          this.watchOneOrSecond = 1;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 公司/状态变化
    selectChange() {
      this.page = 1;
      this.getMyConsignmentSelect();
    },
    // 获取返还寄卖单列表
    getMyConsignmentSelect() {
      this.backOrderListMsg = "数据加载中...";
      this.$axios
        .get(
          this.$store.state.baseUrl +
            "/backOrderList?companyId=" +
            this.companyId +
            "&&state=" +
            this.state +
            "&&page=" +
            this.page2 +
            "&&pageNum=10"
        )
        .then((res) => {
          console.log("返还寄卖");
          console.log(res);
          this.total2 = res.data.total;
          this.backOrderList = res.data.list;
          if (this.backOrderList.length == 0) {
            this.backOrderListMsg = "啊哦~ 暂无数据";
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 返还寄卖
    recoverConsignment() {
      this.watchOneOrSecond = 0;
      this.pageSelect.select = 1;
      this.id = this.companyBackList[0].id;
      this.page = 1;
      this.getCallableWatchList();
    },
    // 确定返还
    recoverConsignmentSure() {
      if (this.isChecked.length == 0) {
        this.$message.error({
          message: "请选择返还手表",
          showClose: true,
          duration: 2000,
        });
      } else {
        this.dialogRecoverConsignmentVisible = true;
      }
    },
    // 二次确认返还
    recoverConsignmentOk() {
      this.dialogRecoverConsignmentVisible = false;
      this.$axios
        .post(this.$store.state.baseUrl + "/callInWatch", {
          idList: this.isChecked,
        })
        .then((res) => {
          console.log("返还寄卖");
          console.log(res);
          this.$message.success({
            message: "返还成功",
            showClose: true,
            duration: 2000,
          });
          this.companyChange();
        })
        .catch((err) => {
          this.$message.error({
            message: err.data.message,
            showClose: true,
            duration: 2000,
          });
        });
    },
    companyChange() {
      this.page = 1;
      this.getCallableWatchList();
    },
    // 获取可返还寄卖手表
    getCallableWatchList() {
      this.watchListMsg = "数据加载中...";
      this.$axios
        .get(
          this.$store.state.baseUrl +
            "/callableWatchList?id=" +
            this.id +
            "&&page=" +
            this.page +
            "&&pageNum=10"
        )
        .then((res) => {
          console.log("可返还手表");
          console.log(res);
          this.total = res.data.total;
          this.watchList = res.data.watchList;
          if (this.watchList.length == 0) {
            this.watchListMsg = "啊哦~ 暂无数据";
          }
        });
    },
    // 选择返还手表
    checkedChange(e, content, index) {
      console.log("feng");
      console.log(e);
      console.log(content);
      console.log(index);
      if (e.target.checked == true) {
        this.isChecked.push(content.id);
      } else if (e.target.checked == false) {
        for (let index in this.isChecked) {
          if (this.isChecked[index] == content.id) {
            this.isChecked.splice(index, 1);
          }
        }
      }
      sessionStorage.setItem("isSelected", JSON.stringify(this.isChecked));
      console.log("99000");
      console.log(this.isChecked);
    },
    // 分页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page = val;
      console.log(this.page);
      this.getCallableWatchList();

      (function smoothscroll() {
        var currentScroll =
          document.documentElement.scrollTop || document.body.scrollTop;
        if (currentScroll > 0) {
          window.requestAnimationFrame(smoothscroll);
          window.scrollTo(0, currentScroll - currentScroll / 5);
        }
      })();

      let selectedIs = document.getElementsByClassName("selBtn");
      for (let i = 0; i < selectedIs.length; i++) {
        selectedIs[i].checked = false;
      }
      console.log("hhhhhhhhh");
      console.log(selectedIs);
    },
    handleCurrentChange2(val) {
      console.log(`当前页: ${val}`);
      this.page2 = val;
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
          let a = res.data.companyList;
          a.shift();
          this.companyBackList = a;
          this.stateList = res.data.stateList;
          this.state = this.stateList[0].id;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    goBackAction01() {
      this.pageSelect.select = 0;
      this.page = 1;
      this.companyId = this.companyList[0].id;
      this.state = this.stateList[0].id;
      this.getMyConsignmentSelect();
    },
    goBackAction02() {
      this.pageSelect.select = 0;
    },
  },
};
</script>

<style lang="scss" scoped>
.recover-consignment-container {
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

  .sure {
    width: 100%;
    position: fixed;
    top: 92%;
    left: 72%;

    .sure-button {
      width: 15%;
      height: 45px;
      background-color: #0c8563;
      color: #fff;
      border: 0;
      border-radius: 30px;
      outline: none;
      font-size: 15px;
      cursor: pointer;
    }
  }

  input[type="checkbox"] {
    width: 18px;
    height: 18px;
    cursor: pointer;
    position: relative;
    width: 15px;
    height: 15px;
    font-size: 15px;
  }

  input[type="checkbox"]::after {
    position: absolute;
    top: 0;
    background-color: #fff;
    color: #000;
    width: 15px;
    height: 15px;
    display: inline-block;
    visibility: visible;
    padding-left: 0px;
    text-align: center;
    content: " ";
    border: 1px solid #c8c8c8;
    border-radius: 3px;
  }

  input[type="checkbox"]:disabled::after {
    content: " ";
    border: 1px solid #c8c8c8;
    border-radius: 3px;
    background-color: #ddd;
    cursor: not-allowed;
  }

  input[type="checkbox"]:checked::after {
    content: "✓";
    font-size: 13px;
    font-weight: bolder;
  }
}
</style>
