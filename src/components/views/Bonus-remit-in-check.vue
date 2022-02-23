<template>
  <div>
    <!-- <h2>财务 确认中/已完成</h2> -->
    <table>
      <tr>
        <th>分红单号</th>
        <th>时间</th>
        <th>总金额</th>
        <th>操作</th>
      </tr>
      <tr v-for="(item, index) in list" :key="index">
        <td>
          <p>{{ item.orderNo }}</p>
        </td>
        <td>
          <p>{{ item.time }}</p>
        </td>
        <td>
          <p>{{ formatNumberRgx(item.allMoney) + " " + item.currency }}</p>
        </td>
        <td>
          <el-tooltip
            class="item"
            effect="light"
            content="查看详情"
            placement="top-end"
          >
            <img
              src="../../assets/imgs/details.png"
              style="cursor: pointer;"
              @click="operateInCheck(item.id)"
            />
          </el-tooltip>
          <el-dialog
            title="分红单详情"
            :visible.sync="dialogInCheckBonusDetailsVisible"
            center
          >
            <div>
              <div>
                <p
                  :style="{
                    color: inCheckBonusDetails.allMoney > 0 ? '#0c7063' : 'red',
                  }"
                  class="text-style"
                >
                  {{
                    formatNumberRgx(inCheckBonusDetails.allMoney) +
                      " " +
                      inCheckBonusDetails.currency
                  }}
                </p>
              </div>
              <div>
                <p>
                  分红单号：<span>{{ inCheckBonusDetails.orderNo }}</span>
                </p>
                <p>
                  时间：<span>{{ inCheckBonusDetails.time }}</span>
                </p>
              </div>
              <div
                class="user-list-style"
                v-for="(user, index) in inCheckBonusDetails.userList"
                :key="index"
              >
                <p>
                  {{
                    user.type == 1
                      ? "资金方"
                      : user.type == 2
                      ? "公司"
                      : user.type == 3
                      ? user.nick + "采购员"
                      : user.nick + "销售员"
                  }}
                </p>
                <div class="money-img-style">
                  <img :src="user.state == 1 ? imgSign1 : imgSign2" />
                </div>
                <div>
                  <p v-show="user.type == 3">
                    成本金额：<span>{{
                      formatNumberRgx(user.cost) +
                        " " +
                        inCheckBonusDetails.currency
                    }}</span>
                  </p>
                  <p>
                    分红金额：<span>{{
                      formatNumberRgx(user.bonusMoney) +
                        " " +
                        inCheckBonusDetails.currency
                    }}</span>
                  </p>
                  <p v-show="user.type == 3 || user.type == 4">
                    抵扣债务金额：<span>{{
                      formatNumberRgx(user.deductMoney) +
                        " " +
                        inCheckBonusDetails.currency
                    }}</span>
                  </p>
                  <p>
                    打款金额：<span>{{
                      formatNumberRgx(user.payMoney) +
                        " " +
                        inCheckBonusDetails.currency
                    }}</span>
                  </p>
                  <p>
                    打款时间：<span>{{ user.payTime }}</span>
                  </p>
                  <p v-show="user.state == 2">
                    确认时间：<span>{{ user.recvTime }}</span>
                  </p>
                </div>
              </div>
            </div>
            <div slot="footer">
              <el-button @click="dialogInCheckBonusDetailsVisible = false"
                >取 消</el-button
              >
              <el-button
                type="primary"
                @click="dialogInCheckBonusDetailsVisible = false"
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
export default {
  data() {
    return {
      page: 1,
      pageNum: 10,
      total: 0,
      list: [],
      inCheckId: 0,
      inCheckBonusDetails: {},
      dialogInCheckBonusDetailsVisible: false,
      imgSign1: require("../../assets/imgs/inCheck.png"),
      imgSign2: require("../../assets/imgs/checked.png"),
    };
  },
  props: {
    inCheckList: {
      type: Array,
    },
  },
  created() {
    this.getList();
  },
  methods: {
    // 获取分红单信息
    operateInCheck(id) {
      this.inCheckId = id;
      this.$axios
        .post(this.$store.state.baseUrl + "/financeBonusForm?java", {
          id: this.inCheckId,
        })
        .then((res) => {
          console.log("分红单信息");
          console.log(res);
          this.inCheckBonusDetails = res.data;
          this.dialogInCheckBonusDetailsVisible = true;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 分页处理数据
    getList() {
      console.log("分页数据");
      this.total = this.inCheckList.length;
      console.log(this.inCheckList);
      // es6过滤得到满足搜索条件的展示数据list
      this.list = this.inCheckList.filter(
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
.user-list-style {
  width: 500px;
  margin-top: 10px;
  padding: 0 20px;
  border: 1px solid #ddd;
  position: relative;

  .money-img-style {
    position: absolute;
    top: 0;
    right: 0;
  }
}

.text-style {
  text-align: center;
  font-size: 18px;
}

td {
  height: 60px;
  margin: 10px 0;
  padding: 20px 0;
  background-color: #f3fbf9;
  font-size: 15px;
  text-align: center;
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
