<template>
  <div>
    <!-- 我的借贷-我的待办事项 -->
    <div v-if="unHandleSelect.select == 0">
      <table v-for="(item,index) in list" :key="index" class="borrow-table">
        <tr>
          <th>对象</th>
          <th>原因/描述</th>
          <th>{{item.type == 1 ? '申请时间' : (item.type == 2 ? '打款时间' : '转账时间')}}</th>
          <th>类型</th>
          <!-- <th>是否读取</th> -->
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
            <p>{{item.type == 1 ? '向我借款' : (item.type == 2 ? '我的借款' : '向我转账')}}</p>
          </td>
          <!-- <td>{{item.id | isRead}}</td> -->
          <td>
            <el-tooltip class="item" effect="light" content="处理该事项" placement="top-end">
              <img src="../../assets/imgs/update.png" style="cursor: pointer;"
                @click="dealMatters(item.id,item.type)" />
            </el-tooltip>
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
    <div v-else-if="unHandleSelect.select == 1">
      <div class="back-img" @click="gobackUnList" v-preventClick>
        <div>
          <img src="../../assets/imgs/goback.png" />
        </div>
        <span class="font">返回</span>
      </div>
      <div class="un-handle-msg">
        <p class="msg-top">{{formatNumberRgx(unHandleRecord.obj.subMoney) + ' ' +unHandleRecord.obj.currency}}</p>
        <div class="msg-main">
          <p>申请信息：</p>
          <div class="main-message">
            <p><span>申请对象：</span><span>{{unHandleRecord.obj.userName}}</span></p>
            <p><span>申请时间：</span><span>{{unHandleRecord.obj.subTime}}</span></p>
            <p><span>申请原因：</span><span>{{unHandleRecord.obj.describe}}</span></p>
            <div style="display: flex;">
              <span>收款账户：</span>
              <span v-show="unHandleRecord.obj.type == 1">现金</span>
              <p style="margin:0;" v-show="unHandleRecord.obj.type == 0">
                <span>{{unHandleRecord.obj.bankName + ' '}}</span>
                <span>{{unHandleRecord.obj.bankAccount + ' '}}</span>
                <button class="tag-read" :data-clipboard-text="unHandleRecord.obj.bankAccount" @click="copy"></button>
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
          <el-button type="primary" @click="resultSubmit">
            {{flag == '通过申请' || flag == '' ? '通过并已打款' : '拒绝申请'}}
          </el-button>
          <el-dialog title="提交申请结果" :visible.sync="dialogResultSubmitVisible" center>
            <div style="text-align: center;">
              <p>{{flag == '通过申请' ? '确定通过该申请并已向对方打款？确定后不可更改' : '确定拒绝该申请？确定后不可更改'}}</p>
            </div>
            <div slot="footer">
              <el-button @click="dialogResultSubmitVisible = false">取 消</el-button>
              <el-button type="primary" @click="resultSubmitSure" v-preventClick>确 定</el-button>
            </div>
          </el-dialog>
        </div>
      </div>
    </div>
    <div v-else-if="unHandleSelect.select == 2">
      <div class="back-img" @click="gobackUnList" v-preventClick>
        <div>
          <img src="../../assets/imgs/goback.png" />
        </div>
        <span class="font">返回</span>
      </div>
      <div class="un-handle-msg">
        <p class="msg-top">{{formatNumberRgx(unHandleRecord.obj.subMoney) + ' ' +unHandleRecord.obj.currency}}</p>
        <div class="msg-main">
          <p>申请信息：</p>
          <div class="main-message">
            <p><span>申请对象：</span><span>{{unHandleRecord.obj.userName}}</span></p>
            <p><span>申请时间：</span><span>{{unHandleRecord.obj.subTime}}</span></p>
            <p><span>申请原因：</span><span>{{unHandleRecord.obj.describe}}</span></p>
            <div style="display: flex;">
              <span>收款账户：</span>
              <span v-show="unHandleRecord.obj.type == 1">现金</span>
              <p style="margin:0;" v-show="unHandleRecord.obj.type == 0">
                <span>{{unHandleRecord.obj.bankName + ' '}}</span>
                <span>{{unHandleRecord.obj.bankAccount + ' '}}</span>
                <button class="tag-read" :data-clipboard-text="unHandleRecord.obj.bankAccount" @click="copy"></button>
              </p>
            </div>
          </div>
          <p>状态：</p>
          <div class="block main-message">
            <el-timeline>
              <el-timeline-item color="#0c7063" :timestamp="unHandleRecord.obj.subTime">
                申请：
              </el-timeline-item>
              <el-timeline-item color="#0c7063" :timestamp="unHandleRecord.obj.auditTime">
                审核：
              </el-timeline-item>
              <el-timeline-item color="#0c7063" :timestamp="unHandleRecord.obj.payTime">
                打款：
              </el-timeline-item>
              <el-timeline-item>
                收款
              </el-timeline-item>
            </el-timeline>
          </div>
          <div v-show="unHandleRecord.obj.userName == '公司'">
            <p>打款金额：</p>
            <div class="main-message">
              <p><span>港币金额：</span><span>{{formatNumberRgx(unHandleRecord.obj.payMoney) + ' HKD'}}</span></p>
            </div>
          </div>
        </div>
        <div style="text-align: center;">
          <p style="color: red;">提示：如没有收到相应转账，请不要点击“确认收款”，并与转账人联系</p>
          <el-button type="primary" @click="dialogCollectionConfirmationVisible = true">确认收款</el-button>
          <el-dialog title="确认收款" :visible.sync="dialogCollectionConfirmationVisible" center>
            <div style="text-align: center;">
              <p>确定收到相应转账？确认后不可修改</p>
            </div>
            <div slot="footer">
              <el-button @click="dialogCollectionConfirmationVisible = false">取 消</el-button>
              <el-button type="primary" @click="collectionConfirmationSure" v-preventClick>确 定</el-button>
            </div>
          </el-dialog>
        </div>
      </div>
    </div>
    <div v-else-if="unHandleSelect.select == 3">
      <div class="back-img" @click="gobackUnList" v-preventClick>
        <div>
          <img src="../../assets/imgs/goback.png" />
        </div>
        <span class="font">返回</span>
      </div>
      <div class="un-handle-msg">
        <p class="msg-top">{{formatNumberRgx(unHandleRecord.obj.payMoney) + ' ' +unHandleRecord.obj.currency}}</p>
        <div class="msg-main">
          <p>转账信息：</p>
          <div class="main-message">
            <p><span>转账人：</span><span>{{unHandleRecord.obj.userName}}</span></p>
            <p><span>转账时间：</span><span>{{unHandleRecord.obj.payTime}}</span></p>
            <p><span>转账描述：</span><span>{{unHandleRecord.obj.describe}}</span></p>
            <div style="display: flex;">
              <span>打款账户：</span>
              <span v-show="unHandleRecord.obj.type == 1">现金</span>
              <p style="margin:0;" v-show="unHandleRecord.obj.type == 0">
                <span>{{unHandleRecord.obj.bankName + ' '}}</span>
                <span>{{unHandleRecord.obj.bankAccount + ' '}}</span>
                <button class="tag-read" :data-clipboard-text="unHandleRecord.obj.bankAccount" @click="copy"></button>
              </p>
            </div>
          </div>
        </div>
        <div style="margin-top: 40px;text-align: center;">
          <p style="color: red;">提示：如没有收到相应转账，请不要点击“确认收款”，并与转账人联系</p>
          <el-button type="primary" @click="dialogCollectionConfirmationVisible = true">确认收到款</el-button>
          <el-dialog title="确认收款" :visible.sync="dialogCollectionConfirmationVisible" center>
            <div style="text-align: center;">
              <p>确定收到相应转账？确认后不可修改</p>
            </div>
            <div slot="footer">
              <el-button @click="dialogCollectionConfirmationVisible = false">取 消</el-button>
              <el-button type="primary" @click="collectionConfirmationSure" v-preventClick>确 定</el-button>
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
        total: 0,
        page: 1,
        pageNum: 10,
        list: [],
        url: this.$store.state.baseUrl,
        recordId: '',
        unHandleRecord: {},
        flag: '',
        result: '',
        dialogResultSubmitVisible: false,
        dialogCollectionConfirmationVisible: false,
      }
    },
    props: ['unHandleList', 'unHandleSelect'],
    filters: {
      filterRecord(id) {
        console.log(id);
        let circleList = JSON.parse(localStorage.getItem('myBorrowUnHandle' + sessionStorage.getItem('userRecordId')));
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
    created() {
      this.getList();
    },
    methods: {
      // 获取记录详情
      dealMatters(id, type) {
        let list = JSON.parse(localStorage.getItem('myBorrowUnHandle' + sessionStorage.getItem('userRecordId')));
        console.log(list);
        if (list == null) {
          list = [];
        }
        if (list.indexOf(id) === -1) {
          list.push(id);
        }
        localStorage.setItem('myBorrowUnHandle' + sessionStorage.getItem('userRecordId'), JSON.stringify(list));
        let a1 = [];
        for (let item of this.unHandleList) {
          a1.push(item.id);
        };
        let a2 = JSON.parse(localStorage.getItem('myBorrowUnHandle' + sessionStorage.getItem('userRecordId')));
        // console.log(a1);
        // console.log(a2);
        if (a1.every(val => a2.includes(val))) {
          this.$emit('sign', 0);
        } else {
          this.$emit('sign', 1);
        }

        this.recordId = id;
        this.$axios.post(this.url + '/borrowRecordInfo?java', {
          id: this.recordId,
          flag: 1
        }).then(res => {
          console.log('获取记录详情');
          console.log(res);
          this.unHandleRecord = res.data;
          console.log(this.unHandleRecord);
          switch (type) {
            case 1:
              this.flag = '';
              this.result = '';
              this.unHandleSelect.select = 1;
              break;
            case 2:
              this.unHandleSelect.select = 2;
              break;
            case 3:
              this.unHandleSelect.select = 3;
              break;
          };
          // 页面回到顶部
          (function smoothscroll() {
            var currentScroll =
              document.documentElement.scrollTop || document.body.scrollTop;
            if (currentScroll > 0) {
              window.requestAnimationFrame(smoothscroll);
              window.scrollTo(0, currentScroll - currentScroll / 5);
            }
          })();
        }).catch(err => {
          console.log(err);
        })
      },
      // 返回列表
      gobackUnList() {
        this.unHandleSelect.select = 0;
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
      // 提交申请结果
      resultSubmit() {
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
          this.dialogResultSubmitVisible = true;
        }
      },
      // 确定提交
      resultSubmitSure() {
        let params = {};
        if (this.flag == '通过申请') {
          params = {
            id: this.recordId,
            flag: 1,
          }
        } else {
          params = {
            id: this.recordId,
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
          this.dialogResultSubmitVisible = false;
          this.unHandleSelect.select = 0;
          this.$emit('applyResult', 0);
        }).catch(err => {
          console.log(err);
          this.$message.success({
            message: err.data.message,
            showClose: true,
            duration: 2000
          });
          this.dialogResultSubmitVisible = false;
          this.unHandleSelect.select = 0;
        })
      },
      // 确认收款
      collectionConfirmationSure() {
        this.$axios.post(this.url + '/checkAccount?java', {
          id: this.recordId
        }).then(res => {
          console.log('确认收款');
          console.log(res);
          this.$message.success({
            message: '确认收款成功',
            showClose: true,
            duration: 2000
          });
          this.dialogCollectionConfirmationVisible = false;
          this.unHandleSelect.select = 0;
          this.$emit('applyResult', 0);
        }).catch(err => {
          console.log(err);
          this.$message.success({
            message: err.data.message,
            showClose: true,
            duration: 2000
          });
          this.dialogCollectionConfirmationVisible = false;
          this.unHandleSelect.select = 0;
        })
      },
      // 分页处理数据
      getList() {
        console.log('分页数据');
        this.total = this.unHandleList.length;
        console.log(this.unHandleList);
        // es6过滤得到满足搜索条件的展示数据list
        this.list = this.unHandleList.filter((item, index) =>
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

  .borrow-table tr:hover>td {
    background-color: #d7ebe7 !important;
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