<template>
  <div>
    <!-- 借贷拨款-对方处理中 -->
    <table class="borrow-table">
      <tr>
        <th>对象</th>
        <th>原因/描述</th>
        <th>打款时间</th>
        <th>打款金额</th>
        <th>操作</th>
      </tr>

      <tr v-for="(item, index) in list" :key="index">
        <td>{{ item.userNick }}</td>
        <td>{{ item.describe }}</td>
        <td>{{ item.time }}</td>
        <td>
          <span style="color: red;">{{
            "-" + formatNumberRgx(item.money) + " " + item.currency
          }}</span>
        </td>
        <td>
          <div style="display: flex;justify-content: center;">
            <el-tooltip
              class="item"
              effect="light"
              content="查看详情"
              placement="top-end"
            >
              <img
                src="../../assets/imgs/details.png"
                style="width: 25px;height: 17px;cursor: pointer;"
                @click="appropRecord(item.id)"
              />
            </el-tooltip>
            <p :style="item.id | filterRecord" class="recordCircle"></p>
          </div>
          <el-dialog
            title="记录详情"
            v-if="dialogAppropInHandleVisible == true"
            :visible.sync="dialogAppropInHandleVisible"
            center
          >
            <div>
              <div class="un-handle-msg">
                <p class="msg-top">
                  {{
                    formatNumberRgx(appropriationInRecord.obj.subMoney) +
                      " " +
                      appropriationInRecord.obj.currency
                  }}
                </p>
                <div class="msg-main">
                  <p>申请信息：</p>
                  <div class="main-message">

                    <p>
                      <span>申请人：</span
                      ><span>{{ appropriationInRecord.obj.operatorNick }}</span>
                    </p>
                    <p>
                      <span>申请时间：</span
                      ><span>{{ appropriationInRecord.obj.subTime }}</span>
                    </p>
                    <p>
                      <span>申请原因：</span
                      ><span>{{ appropriationInRecord.obj.describe }}</span>
                    </p>
                    <div style="display: flex;">
                      <span>收款账户：</span>
                      <span v-show="appropriationInRecord.obj.type == 1"
                        >现金</span
                      >
                      <p
                        style="margin:0;"
                        v-show="appropriationInRecord.obj.type == 0"
                      >
                        <span>{{
                          appropriationInRecord.obj.bankName + " "
                        }}</span>
                        <span>{{
                          appropriationInRecord.obj.bankAccount + " "
                        }}</span>
                        <button
                          class="tag-read"
                          :data-clipboard-text="
                            appropriationInRecord.obj.bankAccount
                          "
                          @click="copyBankAccount"
                        ></button>
                      </p>
                    </div>
                  </div>
                  <p>状态：</p>
                  <div class="block main-message">
                    <el-timeline>

                      <el-timeline-item
                        :color="
                          appropriationInRecord.obj.checkTime == null
                            ? '#aaa'
                            : '#0c7063'
                        "
                        :timestamp="
                          appropriationInRecord.obj.checkTime == null
                            ? ''
                            : appropriationInRecord.obj.checkTime
                        "
                      >
                        {{
                          appropriationInRecord.obj.checkTime == null
                            ? "等待对方确认收款"
                            : "对方已收款："
                        }}
                      </el-timeline-item>
                      <el-timeline-item
                        color="#0c7063"
                        :timestamp="appropriationInRecord.obj.payTime"
                      >
                        打款：
                      </el-timeline-item>
                      <el-timeline-item
                        color="#0c7063"
                        :timestamp="appropriationInRecord.obj.auditTime"
                      >
                        审核：
                      </el-timeline-item>
                      <el-timeline-item
                        color="#0c7063"
                        :timestamp="appropriationInRecord.obj.subTime"
                      >
                        申请：
                      </el-timeline-item>
                    </el-timeline>
                  </div>
                  <div>
                    <p>打款金额：</p>
                    <div class="main-message">
                      <p style="color: orange;">

                        <span>港币金额：</span
                        ><span>{{
                          formatNumberRgx(appropriationInRecord.obj.payMoney) +
                            " " +
                            "HKD"
                        }}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div slot="footer">

              <el-button @click="dialogAppropInHandleVisible = false"
                >取 消</el-button
              >
              <el-button
                type="primary"
                @click="dialogAppropInHandleVisible = false"
                >确 定</el-button
              >
            </div>
          </el-dialog>
        </td>
      </tr>
    </table>


    <div style="width: 100%;height: 50px;">
      <div style="margin:15px 0;position:absolute;right:6%;">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="page"
          layout="total, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>

import Clipboard from "clipboard";
export default {
  data() {
    return {
      url: this.$store.state.baseUrl,
      total: 0,
      page: 1,
      pageNum: 10,
      list: [],
      appropriationInRecord: {},
      dialogAppropInHandleVisible: false,
    };
  },
  props: ["appropriationInHandleList"],
  filters: {
    filterRecord(id) {
      console.log(id);
      let circleList = JSON.parse(
        localStorage.getItem(
          "appropInHandle" + sessionStorage.getItem("userRecordId")
        )
      );
      console.log(circleList);
      console.log(typeof circleList);
      if (circleList !== null) {
        console.log(circleList.indexOf(id));
        if (circleList.indexOf(id) === -1) {
          return {
            backgroundColor: "red",
          };
        } else {
          return {
            backgroundColor: "transparent",
          };
        }
      } else {
        return {
          backgroundColor: "red",
        };
      }
    },
  },
  created() {
    console.log(this.appropriationInHandleList);
  },
  // mounted() {
  //   this.getList();
  // },
  methods: {
    // 查看记录详情
    appropRecord(id) {
      let list = JSON.parse(
        localStorage.getItem(
          "appropInHandle" + sessionStorage.getItem("userRecordId")
        )
      );
      console.log(list);
      if (list == null) {
        list = [];
      }
      if (list.indexOf(id) === -1) {
        list.push(id);
      }
      localStorage.setItem(
        "appropInHandle" + sessionStorage.getItem("userRecordId"),
        JSON.stringify(list)
      );
      let a1 = [];
      for (let item of this.appropriationInHandleList) {
        a1.push(item.id);
      }
      let a2 = JSON.parse(
        localStorage.getItem(
          "appropInHandle" + sessionStorage.getItem("userRecordId")
        )
      );
      // console.log(a1);
      // console.log(a2);
      if (a1.every((val) => a2.includes(val))) {
        this.$emit("signPropIn", 0);
      } else {
        this.$emit("signPropIn", 1);
      }

      this.$axios
        .post(this.url + "/borrowRecordInfo?java", {
          id: id,
          flag: 0,
        })
        .then((res) => {
          console.log("获取记录详情");
          console.log(res);
          this.appropriationInRecord = res.data;
          console.log(this.appropriationInRecord);
          this.dialogAppropInHandleVisible = true;

        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 复制银行卡号
    copyBankAccount() {
      let clipboard = new Clipboard(".tag-read");
      clipboard.on("success", (e) => {
        this.$message.success({
          message: "复制成功",
          showClose: true,
          duration: 2000,
        });
        console.log("复制成功");
        // 释放内存
        clipboard.destroy();
      });
      clipboard.on("error", (e) => {
        // 不支持复制
        this.$message.error({
          message: "复制失败，该浏览器不支持自动复制",
          showClose: true,
          duration: 2000,
        });
        console.log("该浏览器不支持自动复制");
        // 释放内存
        clipboard.destroy();
      });
    },
    // 分页处理数据
    getList() {
      console.log("分页数据");
      this.total = this.appropriationInHandleList.length;
      console.log(this.appropriationInHandleList);
      // es6过滤得到满足搜索条件的展示数据list
      this.list = this.appropriationInHandleList.filter(
        (item, index) =>
          index < this.page * this.pageNum &&
          index >= this.pageNum * (this.page - 1)
      );
      console.log(this.list);
    },
    // 分页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page = val;
      this.getList();
      (function smoothscroll() {
        let currentScroll =
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
.recordCircle {
  width: 8px;
  height: 8px;
  margin: 0;
  margin-left: 3px;
  border-radius: 50%;
}

.borrow-table {
  width: 100%;
  margin-top: 20px;

  th {
    height: 50px;
    line-height: 50px;
    background-color: #d7ebe7;
  }

  td {
    padding: 20px;
    background-color: #f3fbf9;
    border-bottom: 1px solid #d7ebe7;
  }
}

.back-img {
  width: 75px;
  height: 45px;
  margin-bottom: 15px;
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

.un-handle-msg {
  .msg-top {
    text-align: center;
  }

  .msg-main {
    padding-left: 30px;

    .main-message {
      padding-left: 20px;
      color: #606266;
    }
  }

  .tag-read {
    width: 20px;
    height: 20px;
    margin-left: 5px;
    border: 0;
    background: url("../../assets/imgs/copy.png") no-repeat;
    background-size: cover;
    cursor: pointer;
  }
}

.borrow-table tr:hover > td {
  background-color: #d7ebe7 !important;
}

.input-style {
  width: 60% !important;
}

table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
}

tr {
  th,
  td {
    width: 20%;
    text-align: center;
  }
}
</style>
