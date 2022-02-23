<template>
  <div>
    <!-- 我的借贷-对方处理中 -->
    <table v-for="(item,index) in list" :key="index" class="borrow-table">
      <tr>
        <th>对象</th>
        <th>原因/描述</th>
        <th>{{item.type == 1 ? '申请时间' : (item.type == 2 ? '打款时间' : '转账时间')}}</th>
        <th>金额</th>
        <th>
          <div style="display: flex;justify-content: center;">
            操作
            <p :style="item.id | filterRecord" class="recordCircle"></p>
          </div>
        </th>
      </tr>
      <tr>
        <td>{{item.userNick}}</td>
        <td>{{item.describe}}</td>
        <td>{{item.time}}</td>
        <td>
          <p :style="{color: item.type == 1 ? '#0c7063' : 'red'}">
            {{item.type == 1 ? '+' +formatNumberRgx(item.money) + ' ' +item.currency : '-' +formatNumberRgx(item.money) + ' ' +item.currency}}
          </p>
        </td>
        <td>
          <el-tooltip class="item" effect="light" content="查看详情" placement="top-end">
            <img src="../../assets/imgs/details.png" style="cursor: pointer;"
              @click="inHandleViewDetails(item.id,item.type)" />
          </el-tooltip>

          <el-dialog title="记录详情" v-if="dialogRecordDetailsOneVisible == true"
            :visible.sync="dialogRecordDetailsOneVisible" center>
            <div>
              <div class="un-handle-msg">
                <p class="msg-top">{{formatNumberRgx(inHandleRecord.obj.subMoney) + ' ' +inHandleRecord.obj.currency}}
                </p>
                <div class="msg-main">
                  <p>申请信息：</p>
                  <div class="main-message">
                    <p><span>申请对象：</span><span>{{inHandleRecord.obj.userName}}</span></p>
                    <p><span>申请时间：</span><span>{{inHandleRecord.obj.subTime}}</span></p>
                    <p><span>申请原因：</span><span>{{inHandleRecord.obj.describe}}</span></p>
                    <div style="display: flex;">
                      <span>收款账户：</span>
                      <span v-show="inHandleRecord.obj.type == 1">现金</span>
                      <p style="margin:0;" v-show="inHandleRecord.obj.type == 0">
                        <span>{{inHandleRecord.obj.bankName + ' '}}</span>
                        <span>{{inHandleRecord.obj.bankAccount + ' '}}</span>
                        <button class="tag-read" :data-clipboard-text="inHandleRecord.obj.bankAccount"
                          @click="copyBankAccount"></button>
                      </p>
                    </div>
                  </div>
                  <p>状态：</p>
                  <div class="block main-message">
                    <el-timeline>
                      <el-timeline-item color="#0c7063" :timestamp="inHandleRecord.obj.subTime">
                        申请：
                      </el-timeline-item>
                      <el-timeline-item :color="inHandleRecord.obj.auditTime == null ? '' : '#0c7063'"
                        :timestamp="inHandleRecord.obj.auditTime == null ? (inHandleRecord.obj.userName == '公司' ? '等待对方审核' : '等待对方打款') : inHandleRecord.obj.auditTime">
                        审核：
                      </el-timeline-item>
                      <el-timeline-item v-if="inHandleRecord.obj.auditTime !== null" timestamp="等待对方打款">
                        打款：
                      </el-timeline-item>
                    </el-timeline>
                  </div>
                </div>
              </div>
            </div>
            <div slot="footer">
              <el-button @click="dialogRecordDetailsOneVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogRecordDetailsOneVisible = false">确 定</el-button>
            </div>
          </el-dialog>
          <el-dialog title="记录详情" v-if="dialogRecordDetailsTwoVisible == true"
            :visible.sync="dialogRecordDetailsTwoVisible" center>
            <div>
              <div class="un-handle-msg">
                <p class="msg-top">{{formatNumberRgx(inHandleRecord.obj.subMoney) + ' ' +inHandleRecord.obj.currency}}
                </p>
                <div class="msg-main">
                  <p>申请信息：</p>
                  <div class="main-message">
                    <p><span>申请对象：</span><span>{{inHandleRecord.obj.userName}}</span></p>
                    <p><span>申请时间：</span><span>{{inHandleRecord.obj.subTime}}</span></p>
                    <p><span>申请原因：</span><span>{{inHandleRecord.obj.describe}}</span></p>
                    <div style="display: flex;">
                      <span>收款账户：</span>
                      <span v-show="inHandleRecord.obj.type == 1">现金</span>
                      <p style="margin:0;" v-show="inHandleRecord.obj.type == 0">
                        <span>{{inHandleRecord.obj.bankName + ' '}}</span>
                        <span>{{inHandleRecord.obj.bankAccount + ' '}}</span>
                        <button class="tag-read" :data-clipboard-text="inHandleRecord.obj.bankAccount"
                          @click="copyBankAccount"></button>
                      </p>
                    </div>
                  </div>
                  <p>状态：</p>
                  <div class="block main-message">
                    <el-timeline>
                      <el-timeline-item color="#0c7063" :timestamp="inHandleRecord.obj.subTime">
                        申请：
                      </el-timeline-item>
                      <el-timeline-item color="#0c7063" :timestamp="inHandleRecord.obj.auditTime">
                        审核：
                      </el-timeline-item>
                      <el-timeline-item color="#0c7063" :timestamp="inHandleRecord.obj.payTime">
                        打款：
                      </el-timeline-item>
                      <el-timeline-item timestamp="等待对方确认收款">
                        收款：
                      </el-timeline-item>
                    </el-timeline>
                  </div>
                </div>
              </div>
            </div>

            <div slot="footer">
              <el-button @click="dialogRecordDetailsTwoVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogRecordDetailsTwoVisible = false">确 定</el-button>
            </div>
          </el-dialog>
          <el-dialog title="记录详情" v-if="dialogRecordDetailsThreeVisible == true"
            :visible.sync="dialogRecordDetailsThreeVisible" center>
            <div>
              <div class="un-handle-msg">
                <p class="msg-top">{{formatNumberRgx(inHandleRecord.obj.payMoney) + ' ' +inHandleRecord.obj.currency}}
                </p>
                <div class="msg-main">
                  <p>申请信息：</p>
                  <div class="main-message">
                    <p><span>转账人：</span><span>{{inHandleRecord.obj.userName}}</span></p>
                    <p><span>转账时间：</span><span>{{inHandleRecord.obj.payTime}}</span></p>
                    <p><span>转账描述：</span><span>{{inHandleRecord.obj.describe}}</span></p>
                    <div style="display: flex;">
                      <span>打款账户：</span>
                      <span v-show="inHandleRecord.obj.type == 1">现金</span>
                      <p style="margin:0;" v-show="inHandleRecord.obj.type == 0">
                        <span>{{inHandleRecord.obj.bankName + ' '}}</span>
                        <span>{{inHandleRecord.obj.bankAccount + ' '}}</span>
                        <button class="tag-read" :data-clipboard-text="inHandleRecord.obj.bankAccount"
                          @click="copyBankAccount"></button>
                      </p>
                    </div>
                  </div>
                  <p>状态：</p>
                  <div class="block main-message">
                    <el-timeline>
                      <el-timeline-item color="#0c7063" :timestamp="inHandleRecord.obj.payTime">
                        转账：
                      </el-timeline-item>
                      <el-timeline-item timestamp="等待对方确认收款">
                        收款：
                      </el-timeline-item>
                    </el-timeline>
                  </div>
                </div>
              </div>
            </div>

            <div slot="footer">
              <el-button @click="dialogRecordDetailsThreeVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogRecordDetailsThreeVisible = false">确 定</el-button>
            </div>
          </el-dialog>

          <el-tooltip class="item" effect="light" content="删除记录" placement="top-end">
            <img src="../../assets/imgs/delete.png" style="margin-left: 30px;cursor: pointer;"
              @click="deleteRecord(item.id,item.type)" />
          </el-tooltip>
          <el-dialog title="删除记录" :visible.sync="dialogDeleteRecordVisible" center>
            <div style="text-align: center;">
              <p>确定删除该记录？删除后不可恢复</p>
            </div>
            <div slot="footer">
              <el-button @click="dialogDeleteRecordVisible = false">取 消</el-button>
              <el-button type="primary" @click="deleteRecordSure">确 定</el-button>
            </div>
          </el-dialog>
        </td>
      </tr>
    </table>
    <div style="width: 100%;height: 50px;">
      <div style="margin:15px 0;position:absolute;right:6%;">
        <el-pagination @current-change="handleCurrentChange" :current-page="page"
          layout="total, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import Clipboard from 'clipboard';
  export default {
    data() {
      return {
        url: this.$store.state.baseUrl,
        total: 0,
        page: 1,
        pageNum: 10,
        list: [],
        inHandleRecord: {},
        dialogDeleteRecordVisible: false,
        deleteId: 0,
        deleteType: 0,
        dialogRecordDetailsOneVisible: false, // type为1时
        dialogRecordDetailsTwoVisible: false,
        dialogRecordDetailsThreeVisible: false,
      }
    },
    props: ['inHandleList'],
    filters: {
      filterRecord(id) {
        // console.log(id);
        let circleList = JSON.parse(localStorage.getItem('myBorrowInHandle' + sessionStorage.getItem('userRecordId')));
        // console.log(circleList);
        // console.log(typeof (circleList));
        if (circleList !== null) {
          // console.log(circleList.indexOf(id));
          if (circleList.indexOf(id) === -1) {
            return {
              backgroundColor: 'red'
            }
          } else {
            return {
              backgroundColor: 'transparent'
            }
          }
        } else {
          return {
            backgroundColor: 'red'
          }
        }
      }
    },
    created() {
      this.getList();
    },
    methods: {
      // 查看记录详情
      inHandleViewDetails(id, type) {
        let list = JSON.parse(localStorage.getItem('myBorrowInHandle' + sessionStorage.getItem('userRecordId')));
        console.log(list);
        if (list == null) {
          list = [];
        }
        if (list.indexOf(id) === -1) {
          list.push(id);
        }
        localStorage.setItem('myBorrowInHandle' + sessionStorage.getItem('userRecordId'), JSON.stringify(list));
        let a1 = [];
        for (let item of this.inHandleList) {
          a1.push(item.id);
        };
        let a2 = JSON.parse(localStorage.getItem('myBorrowInHandle' + sessionStorage.getItem('userRecordId')));
        // console.log(a1);
        // console.log(a2);
        if (a1.every(val => a2.includes(val))) {
          this.$emit('sign', 0);
        } else {
          this.$emit('sign', 1);
        }
        console.log(id, type);
        this.recordId = id;
        this.$axios.post(this.url + '/borrowRecordInfo?java', {
          id: this.recordId,
          flag: 1
        }).then(res => {
          console.log('获取对方处理中记录详情');
          console.log(res);
          this.inHandleRecord = res.data;
          console.log(this.inHandleRecord);
          switch (type) {
            case 1:
              this.dialogRecordDetailsOneVisible = true;
              break;
            case 2:
              this.dialogRecordDetailsTwoVisible = true;
              break;
            case 3:
              this.dialogRecordDetailsThreeVisible = true;
              break;
          };
        }).catch(err => {
          console.log(err);
        })
      },
      // 复制银行卡号
      copyBankAccount() {
        let clipboard = new Clipboard('.tag-read')
        clipboard.on('success', e => {
          this.$message.success({
            message: '复制成功',
            showClose: true,
            duration: 2000
          });
          console.log('复制成功')
          // 释放内存
          clipboard.destroy()
        })
        clipboard.on('error', e => {
          // 不支持复制
          this.$message.error({
            message: '复制失败，该浏览器不支持自动复制',
            showClose: true,
            duration: 2000
          });
          console.log('该浏览器不支持自动复制')
          // 释放内存
          clipboard.destroy()
        })
      },
      // 删除记录
      deleteRecord(id, type) {
        let list = JSON.parse(localStorage.getItem('myBorrowInHandle' + sessionStorage.getItem('userRecordId')));
        console.log(list);
        if (list == null) {
          list = [];
        }
        if (list.indexOf(id) === -1) {
          list.push(id);
        }
        localStorage.setItem('myBorrowInHandle' + sessionStorage.getItem('userRecordId'), JSON.stringify(list));
        let a1 = [];
        for (let item of this.inHandleList) {
          a1.push(item.id);
        };
        let a2 = JSON.parse(localStorage.getItem('myBorrowInHandle' + sessionStorage.getItem('userRecordId')));
        // console.log(a1);
        // console.log(a2);
        if (a1.every(val => a2.includes(val))) {
          this.$emit('sign', 0);
        } else {
          this.$emit('sign', 1);
        }
        this.deleteId = id;
        this.deleteType = type;
        if (this.deleteType == 2) {
          this.$message.error({
            message: '该记录为别人向你借款，你向别人打款，等带对方确认状态，不可删除',
            showClose: true,
            duration: 3000
          })
        } else {
          this.dialogDeleteRecordVisible = true;
        }
      },
      // 确定删除
      deleteRecordSure() {
        this.$axios.post(this.url + '/delBorrowRecord?java', {
          id: this.deleteId,
          type: this.deleteType
        }).then(res => {
          console.log('删除记录');
          console.log(res);
          this.$message.success({
            message: '删除该记录成功',
            showClose: true,
            duration: 2000
          });
          this.dialogDeleteRecordVisible = false;
          this.$emit('applyResult', 0);
        }).catch(err => {
          console.log(err);
          this.$message.success({
            message: err.data.message,
            showClose: true,
            duration: 2000
          });
          this.dialogDeleteRecordVisible = false;
        })
      },
      // 分页处理数据
      getList() {
        console.log('分页数据');
        this.total = this.inHandleList.length;
        console.log(this.inHandleList);
        // es6过滤得到满足搜索条件的展示数据list
        this.list = this.inHandleList.filter((item, index) =>
          index < this.page * this.pageNum && index >= this.pageNum * (this.page - 1)
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
  }
</script>

<style lang="scss" scoped>
  .recordCircle {
    width: 8px;
    height: 8px;
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
        background: url('../../assets/imgs/copy.png') no-repeat;
        background-size: cover;
        cursor: pointer;
      }
    }
  }

  .borrow-table tr:hover>td {
    background-color: #d7ebe7 !important;
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