<template>
  <div>
    <!-- 借贷审核-公司-我的待办事项 -->
    <div v-if="borrowUnSelect.select == 0">
      <table class="borrow-table">
        <tr>
          <th>对象</th>
          <th>原因/描述</th>
          <th>申请时间</th>
          <th>申请金额</th>
          <th>操作</th>
        </tr>
        <tr v-for="(item,index) in borrowUnList" :key="index">
          <td>{{item.userNick}}</td>
          <td>{{item.describe}}</td>
          <td>{{item.time}}</td>
          <td>
            <p>{{formatNumberRgx(item.money) + ' ' + item.currency}}</p>
          </td>
          <td>
            <div style="display: flex;justify-content: center;">
              <el-tooltip class="item" effect="light" content="处理该事项" placement="top-end">
                <img src="../../assets/imgs/update.png" style="width: 19px;height: 22px;cursor: pointer;"
                  @click="borrowDealMatters(item.id)" />
              </el-tooltip>
              <p :style="item.id | filterRecord" class="recordCircle"></p>
            </div>
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
    <div v-if="borrowUnSelect.select == 1">
      <div class="back-img" @click="gobackBorrowUnList">
        <div>
          <img src="../../assets/imgs/goback.png" />
        </div>
        <span class="font">返回</span>
      </div>
      <div class="un-handle-msg">
        <p class="msg-top">
          {{formatNumberRgx(borrowUnHandleRecord.obj.subMoney) + ' ' +borrowUnHandleRecord.obj.currency}}</p>
        <div class="msg-main">
          <p>申请信息：</p>
          <div class="main-message">
            <p><span>申请对象：</span><span>{{borrowUnHandleRecord.obj.userName}}</span></p>
            <p><span>申请时间：</span><span>{{borrowUnHandleRecord.obj.subTime}}</span></p>
            <p><span>申请原因：</span><span>{{borrowUnHandleRecord.obj.describe}}</span></p>
            <div style="display: flex;">
              <span>收款账户：</span>
              <span v-show="borrowUnHandleRecord.obj.type == 1">现金</span>
              <p style="margin:0;" v-show="borrowUnHandleRecord.obj.type == 0">
                <span>{{borrowUnHandleRecord.obj.bankName + ' '}}</span>
                <span>{{borrowUnHandleRecord.obj.bankAccount + ' '}}</span>
                <button class="tag-read" :data-clipboard-text="borrowUnHandleRecord.obj.bankAccount"
                  @click="copy"></button>
              </p>
            </div>
          </div>
          <p>操作：</p>
          <el-form class="main-message">
            <el-form-item>
              <el-radio-group v-model="flag">
                <el-radio label="通过申请"></el-radio>
                <el-radio label="拒绝申请"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="拒绝原因：" v-show="flag == '拒绝申请'" required>
              <el-input type="textarea" v-model="result" style="width: 60%;"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div style="text-align: center;">
          <el-button type="primary" @click="borrowResultSubmit">
            {{flag == '通过申请' || flag == '' ? '确认' : '拒绝申请'}}
          </el-button>
          <el-dialog title="提交审核结果" :visible.sync="dialogBorrowResultSubmitVisible" center>
            <div style="text-align: center;">
              <p>{{flag == '通过申请' ? '确定通过该申请？确定后不可更改' : '确定拒绝该申请？确定后不可更改'}}</p>
            </div>
            <div slot="footer">
              <el-button @click="dialogBorrowResultSubmitVisible = false">取 消</el-button>
              <el-button type="primary" @click="borrowResultSubmitSure" v-preventClick>确 定</el-button>
            </div>
          </el-dialog>
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
        url: this.$store.state.baseUrl,
        page: 1,
        pageNum: 10,
        total: 0,
        borrowUnList: [],
        borrowUnHandleRecord: {},
        flag: '',
        result: '',
        borrowId: 0,
        dialogBorrowResultSubmitVisible: false,

      }
    },
    props: ['borrowUnHandleList', 'borrowUnSelect'],
    filters: {
      filterRecord(id) {
        console.log(id);
        let circleList = JSON.parse(localStorage.getItem('auditUnHandle' + sessionStorage.getItem('userRecordId')));
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
    mounted() {
      this.getList();
    },
    methods: {
      // 处理该事项
      borrowDealMatters(id) {
        let list = JSON.parse(localStorage.getItem('auditUnHandle' + sessionStorage.getItem('userRecordId')));
        console.log(list);
        if (list == null) {
          list = [];
        }
        if (list.indexOf(id) === -1) {
          list.push(id);
        }
        localStorage.setItem('auditUnHandle' + sessionStorage.getItem('userRecordId'), JSON.stringify(list));
        let a1 = [];
        for (let item of this.borrowUnHandleList) {
          a1.push(item.id);
        };
        let a2 = JSON.parse(localStorage.getItem('auditUnHandle' + sessionStorage.getItem('userRecordId')));
        // console.log(a1);
        // console.log(a2);
        if (a1.every(val => a2.includes(val))) {
          this.$emit('signBorrow', 0);
        } else {
          this.$emit('signBorrow', 1);
        }

        this.borrowId = id;
        this.$axios.post(this.url + '/borrowRecordInfo?java', {
          id: this.borrowId,
          flag: 0
        }).then(res => {
          console.log('获取记录详情');
          console.log(res);
          this.borrowUnHandleRecord = res.data;
          console.log(this.borrowUnHandleRecord);
          this.borrowUnSelect.select = 1;
        }).catch(err => {
          console.log(err);
        })
      },
      // 提交结果
      borrowResultSubmit() {
        if (this.flag == '') {
          this.$message.error({
            message: '请选择是否通过该申请',
            showClose: true,
            duration: 2000
          })
        } else if (this.flag == '拒绝申请' && this.result == '') {
          this.$message.error({
            message: '请输入拒绝原因',
            showClose: true,
            duration: 2000
          })
        } else {
          this.dialogBorrowResultSubmitVisible = true;
        }
      },
      // 确定提交
      borrowResultSubmitSure() {
        let params = {};
        if (this.flag == '通过申请') {
          params = {
            id: this.borrowId,
            flag: 1,
          }
        } else {
          params = {
            id: this.borrowId,
            flag: -1,
            result: this.result
          }
        }
        this.$axios.post(this.url + '/auditBorrowRecord?java', params).then(res => {
          console.log('提交申请结果');
          console.log(res);
          this.$message.success({
            message: '提交该申请结果成功',
            showClose: true,
            duration: 2000
          });
          this.dialogBorrowResultSubmitVisible = false;
          this.borrowUnSelect.select = 0;
          this.$emit('borrowApplyResult', 0);
        }).catch(err => {
          console.log(err);
          this.$message.success({
            message: err.data.message,
            showClose: true,
            duration: 2000
          });
          this.dialogBorrowResultSubmitVisible = false;
          this.borrowUnSelect.select = 0;
        })
      },
      // 返回列表页
      gobackBorrowUnList() {
        this.borrowUnSelect.select = 0;
      },
      // 复制银行卡号
      copy() {
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
        this.total = this.borrowUnHandleList.length;
        console.log(this.borrowUnHandleList);
        // es6过滤得到满足搜索条件的展示数据list
        this.borrowUnList = this.borrowUnHandleList.filter((item, index) =>
          index < this.page * this.pageNum && index >= this.pageNum * (this.page - 1)
        );
        console.log(this.borrowUnList);
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
      background: url('../../assets/imgs/copy.png') no-repeat;
      background-size: cover;
      cursor: pointer;
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