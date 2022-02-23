<template>
  <div>
    <!-- 我的借贷-已完成 -->
    <div class="completed-top">
      <p>总共 {{total}} 条记录</p>
      <div>
        <el-tooltip class="item" effect="light" content="筛选" placement="top-end">
          <img src="../../assets/imgs/filtrate.png" style="cursor: pointer;" @click="deletedFiltrate" />
        </el-tooltip>
        <el-dialog title="筛选记录" :visible.sync="dialogCompletedFiltrateVisible" center>
          <div>
            <el-form label-width="120px">
              <el-form-item label="关键字：">
                <el-input v-model="keyword" placeholder="可输入昵称或描述进行搜索" class="input-style"></el-input>
              </el-form-item>
              <el-form-item>
                <el-checkbox v-model="expend">支出</el-checkbox>
                <el-checkbox v-model="income">收入</el-checkbox>
                <el-checkbox v-model="refused">被拒绝</el-checkbox>
              </el-form-item>
              <el-form-item label="开始时间：">
                <el-date-picker v-model="startTime" type="date"></el-date-picker>
              </el-form-item>
              <el-form-item label="结束时间：">
                <el-date-picker v-model="endTime" type="date"></el-date-picker>
              </el-form-item>
            </el-form>
          </div>
          <div slot="footer">
            <el-button @click="dialogCompletedFiltrateVisible = false">取 消</el-button>
            <el-button type="primary" @click="deletedFiltrateSure" v-preventClick>确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
    <div style="text-align: center;" v-show="completedRecordList.length == 0">
      <p>啊哦~暂无符合该条件的记录，请重新选择</p>
    </div>
    <div v-show="completedRecordList.length !== 0">
      <table v-for="(item,index) in list" :key="index" class="borrow-table">
        <tr>
          <th>对象</th>
          <th>原因/描述</th>
          <th>{{item.type == 1 ? '打款时间' : (item.type == 2 ? '拒绝时间' : (item.type == 3 ? '打款时间' : '转账时间'))}}</th>
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
            <p :style="{color: item.type == 1 ? '#0c7063' : (item.type == 2 ? '#aaa' : 'red')}">
              {{item.type == 1 ? '+' +formatNumberRgx(item.money) + ' ' +item.currency : (item.type == 2 ? formatNumberRgx(item.money) + ' ' +item.currency : '-' +formatNumberRgx(item.money) + ' ' +item.currency)}}
            </p>
          </td>
          <td>
            <el-tooltip class="item" effect="light" content="查看详情" placement="top-end">
              <img src="../../assets/imgs/details.png" style="cursor: pointer;"
                @click="deletedViewDetails(item.id,item.type)" />
            </el-tooltip>

            <el-dialog title="记录详情" v-if="dialogCompletedRecordDetailsOneVisible == true"
              :visible.sync="dialogCompletedRecordDetailsOneVisible" center>
              <div>
                <div class="un-handle-msg">
                  <p class="msg-top">
                    {{formatNumberRgx(completedHandleRecord.obj.subMoney) + ' ' +completedHandleRecord.obj.currency}}
                  </p>
                  <div class="msg-main">
                    <p>申请信息：</p>
                    <div class="main-message">
                      <p><span>申请对象：</span><span>{{completedHandleRecord.obj.userName}}</span></p>
                      <p><span>申请时间：</span><span>{{completedHandleRecord.obj.subTime}}</span></p>
                      <p><span>申请原因：</span><span>{{completedHandleRecord.obj.describe}}</span></p>
                      <div style="display: flex;">
                        <span>收款账户：</span>
                        <span v-show="completedHandleRecord.obj.type == 1">现金</span>
                        <p style="margin:0;" v-show="completedHandleRecord.obj.type == 0">
                          <span>{{completedHandleRecord.obj.bankName + ' '}}</span>
                          <span>{{completedHandleRecord.obj.bankAccount + ' '}}</span>
                          <button class="tag-read" :data-clipboard-text="completedHandleRecord.obj.bankAccount"
                            @click="copyBankAccount"></button>
                        </p>
                      </div>
                    </div>
                    <p>状态：</p>
                    <div class="block main-message">
                      <el-timeline>
                        <el-timeline-item color="#0c7063" :timestamp="completedHandleRecord.obj.subTime">
                          申请：
                        </el-timeline-item>
                        <el-timeline-item color="#0c7063" :timestamp="completedHandleRecord.obj.auditTime">
                          审核：
                        </el-timeline-item>
                        <el-timeline-item color="#0c7063" :timestamp="completedHandleRecord.obj.payTime">
                          打款：
                        </el-timeline-item>
                        <el-timeline-item color="#0c7063" :timestamp="completedHandleRecord.obj.checkTime">
                          我已收款：
                        </el-timeline-item>
                      </el-timeline>
                    </div>
                    <div v-show="completedHandleRecord.obj.userName == '公司'">
                      <p>打款金额：</p>
                      <div class="main-message">
                        <p style="color: red;">
                          <span>港币金额：</span><span>{{formatNumberRgx(completedHandleRecord.obj.payMoney) + ' ' +'HKD'}}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div slot="footer">
                <el-button @click="dialogCompletedRecordDetailsOneVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogCompletedRecordDetailsOneVisible = false">确 定</el-button>
              </div>
            </el-dialog>

            <el-dialog title="记录详情" v-if="dialogCompletedRecordDetailsTwoVisible == true"
              :visible.sync="dialogCompletedRecordDetailsTwoVisible" center>
              <div>
                <div class="un-handle-msg">
                  <p class="msg-top">
                    {{formatNumberRgx(completedHandleRecord.obj.subMoney) + ' ' +completedHandleRecord.obj.currency}}
                  </p>
                  <div class="msg-main">
                    <p>申请信息：</p>
                    <div class="main-message">
                      <p><span>申请对象：</span><span>{{completedHandleRecord.obj.userName}}</span></p>
                      <p><span>申请时间：</span><span>{{completedHandleRecord.obj.subTime}}</span></p>
                      <p><span>申请原因：</span><span>{{completedHandleRecord.obj.describe}}</span></p>
                      <div style="display: flex;">
                        <span>收款账户：</span>
                        <span v-show="completedHandleRecord.obj.type == 1">现金</span>
                        <p style="margin:0;" v-show="completedHandleRecord.obj.type == 0">
                          <span>{{completedHandleRecord.obj.bankName + ' '}}</span>
                          <span>{{completedHandleRecord.obj.bankAccount + ' '}}</span>
                          <button class="tag-read" :data-clipboard-text="completedHandleRecord.obj.bankAccount"
                            @click="copyBankAccount"></button>
                        </p>
                      </div>
                    </div>
                    <p>状态：</p>
                    <div class="block main-message">
                      <el-timeline>
                        <el-timeline-item color="#0c7063" :timestamp="completedHandleRecord.obj.subTime">
                          申请：
                        </el-timeline-item>
                        <el-timeline-item color="red" :timestamp="completedHandleRecord.obj.auditTime">
                          被拒绝：
                        </el-timeline-item>
                      </el-timeline>
                    </div>
                    <div>
                      <p>被拒绝原因：</p>
                      <div class="main-message">
                        <p>{{completedHandleRecord.obj.result}}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div slot="footer">
                <el-button @click="dialogCompletedRecordDetailsTwoVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogCompletedRecordDetailsTwoVisible = false">确 定</el-button>
              </div>
            </el-dialog>

            <el-dialog title="记录详情" v-if="dialogCompletedRecordDetailsThreeVisible == true"
              :visible.sync="dialogCompletedRecordDetailsThreeVisible" center>
              <div>
                <div class="un-handle-msg">
                  <p class="msg-top">
                    {{formatNumberRgx(completedHandleRecord.obj.subMoney) + ' ' +completedHandleRecord.obj.currency}}
                  </p>
                  <div class="msg-main">
                    <p>申请信息：</p>
                    <div class="main-message">
                      <p><span>申请对象：</span><span>{{completedHandleRecord.obj.userName}}</span></p>
                      <p><span>申请时间：</span><span>{{completedHandleRecord.obj.subTime}}</span></p>
                      <p><span>申请原因：</span><span>{{completedHandleRecord.obj.describe}}</span></p>
                      <div style="display: flex;">
                        <span>收款账户：</span>
                        <span v-show="completedHandleRecord.obj.type == 1">现金</span>
                        <p style="margin:0;" v-show="completedHandleRecord.obj.type == 0">
                          <span>{{completedHandleRecord.obj.bankName + ' '}}</span>
                          <span>{{completedHandleRecord.obj.bankAccount + ' '}}</span>
                          <button class="tag-read" :data-clipboard-text="completedHandleRecord.obj.bankAccount"
                            @click="copyBankAccount"></button>
                        </p>
                      </div>
                    </div>
                    <p>状态：</p>
                    <div class="block main-message">
                      <el-timeline>
                        <el-timeline-item color="#0c7063" :timestamp="completedHandleRecord.obj.subTime">
                          申请：
                        </el-timeline-item>
                        <el-timeline-item color="#0c7063" :timestamp="completedHandleRecord.obj.auditTime">
                          审核：
                        </el-timeline-item>
                        <el-timeline-item color="#0c7063" :timestamp="completedHandleRecord.obj.payTime">
                          打款：
                        </el-timeline-item>
                        <el-timeline-item color="#0c7063" :timestamp="completedHandleRecord.obj.checkTime">
                          对方已收款：
                        </el-timeline-item>
                      </el-timeline>
                    </div>
                  </div>
                </div>
              </div>
              <div slot="footer">
                <el-button @click="dialogCompletedRecordDetailsThreeVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogCompletedRecordDetailsThreeVisible = false">确 定</el-button>
              </div>
            </el-dialog>

            <el-dialog title="记录详情" v-if="dialogCompletedRecordDetailsFourVisible == true"
              :visible.sync="dialogCompletedRecordDetailsFourVisible" center>
              <div>
                <div class="un-handle-msg">
                  <p class="msg-top">
                    {{formatNumberRgx(completedHandleRecord.obj.payMoney) + ' ' +completedHandleRecord.obj.currency}}
                  </p>
                  <div class="msg-main">
                    <p>转账信息：</p>
                    <div class="main-message">
                      <p>
                        <span>转账人：</span><span>{{completedHandleRecord.obj.userName}}</span>
                      </p>
                      <p>
                        <span>转账时间：</span><span>{{completedHandleRecord.obj.payTime}}</span>
                      </p>
                      <p><span>转账描述：</span><span>{{completedHandleRecord.obj.describe}}</span></p>
                      <div style="display: flex;">
                        <span>收款账户：</span>
                        <span v-show="completedHandleRecord.obj.type == 1">现金</span>
                        <p style="margin:0;" v-show="completedHandleRecord.obj.type == 0">
                          <span>{{completedHandleRecord.obj.bankName + ' '}}</span>
                          <span>{{completedHandleRecord.obj.bankAccount + ' '}}</span>
                          <button class="tag-read" :data-clipboard-text="completedHandleRecord.obj.bankAccount"
                            @click="copyBankAccount"></button>
                        </p>
                      </div>
                    </div>
                    <p>状态：</p>
                    <div class="block main-message">
                      <el-timeline>
                        <el-timeline-item color="#0c7063" :timestamp="completedHandleRecord.obj.payTime">
                          转账：
                        </el-timeline-item>
                        <el-timeline-item color="#0c7063" :timestamp="completedHandleRecord.obj.checkTime">
                          对方已收款：
                        </el-timeline-item>
                      </el-timeline>
                    </div>
                  </div>
                </div>
              </div>
              <div slot="footer">
                <el-button @click="dialogCompletedRecordDetailsFourVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogCompletedRecordDetailsFourVisible = false">确 定</el-button>
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

  </div>
</template>

<script>
  import Clipboard from 'clipboard';
  export default {
    data() {
      return {
        total: 0,
        page: 1,
        pageNum: 10,
        list: [],
        completedRecordList: this.completedList,
        url: this.$store.state.baseUrl,
        dialogCompletedFiltrateVisible: false,
        keyword: '', // 关键字
        expend: true, // 支出
        income: true, // 收入
        refused: true, // 被拒绝
        startTime: '', // 开始时间
        endTime: '', // 拒绝时间
        completedHandleRecord: {},
        dialogCompletedRecordDetailsOneVisible: false,
        dialogCompletedRecordDetailsTwoVisible: false,
        dialogCompletedRecordDetailsThreeVisible: false,
        dialogCompletedRecordDetailsFourVisible: false,

      }
    },
    props: ['completedList'],
    filters: {
      filterRecord(id) {
        console.log(id);
        let circleList = JSON.parse(localStorage.getItem('myBorrowCompleted' + sessionStorage.getItem('userRecordId')));
        console.log(circleList);
        console.log(typeof (circleList));
        if (circleList !== null) {
          console.log(circleList.indexOf(id));
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
    // created() {
    //   localStorage.clear();
    // },
    methods: {
      // 已完成记录列表筛选
      deletedFiltrate() {
        this.dialogCompletedFiltrateVisible = true;
      },
      // 确定筛选
      deletedFiltrateSure() {
        this.$axios.post(this.url + '/completedBorrowList?java', {
          keyword: this.keyword,
          expend: this.expend == true ? 1 : 0,
          income: this.income == true ? 1 : 0,
          refused: this.refused == true ? 1 : 0,
          startTime: this.startTime,
          endTime: this.endTime
        }).then(res => {
          console.log('筛选已完成记录');
          console.log(res);
          this.completedRecordList = res.data;
          this.dialogCompletedFiltrateVisible = false;
          this.getList();
        }).catch(err => {
          console.log(err);
          this.$message.success({
            message: err.data.message,
            showClose: true,
            duration: 2000
          });

        })
      },
      // 查看记录详情
      deletedViewDetails(id, type) {
        let list = JSON.parse(localStorage.getItem('myBorrowCompleted' + sessionStorage.getItem('userRecordId')));
        console.log(list);
        if (list == null) {
          list = [];
        }
        if (list.indexOf(id) === -1) {
          list.push(id);
        }
        localStorage.setItem('myBorrowCompleted' + sessionStorage.getItem('userRecordId'), JSON.stringify(list));
        let a1 = [];
        for (let item of this.completedList) {
          a1.push(item.id);
        };
        let a2 = JSON.parse(localStorage.getItem('myBorrowCompleted' + sessionStorage.getItem('userRecordId')));
        // console.log(a1);
        // console.log(a2);
        if (a1.every(val => a2.includes(val))) {
          this.$emit('sign', 0);
        } else {
          this.$emit('sign', 1);
        }
        console.log(id, type);
        this.$axios.post(this.url + '/borrowRecordInfo?java', {
          id: id,
          flag: 1
        }).then(res => {
          console.log('获取记录详情');
          console.log(res);
          this.completedHandleRecord = res.data;
          console.log(this.completedHandleRecord);
          switch (type) {
            case 1:
              this.dialogCompletedRecordDetailsOneVisible = true;
              break;
            case 2:
              this.dialogCompletedRecordDetailsTwoVisible = true;
              break;
            case 3:
              this.dialogCompletedRecordDetailsThreeVisible = true;
              break;
            case 4:
              this.dialogCompletedRecordDetailsFourVisible = true;
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
      // 分页处理数据
      getList() {
        console.log('分页数据');
        this.total = this.completedRecordList.length;
        console.log(this.completedRecordList);
        // es6过滤得到满足搜索条件的展示数据list
        this.list = this.completedRecordList.filter((item, index) =>
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
    }
  }
</script>

<style lang="scss" scoped>
  .recordCircle {
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }

  .completed-top {
    display: flex;
    justify-content: space-between;

    p {
      margin: 0;
    }
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