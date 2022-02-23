<template>
  <div>
    <!-- 借贷拨款-我的待办事项 -->
    <div v-show="appropriationUnHandleSelect.select == 0">
      <table v-for="(item,index) in list" :key="index" class="borrow-table">
        <tr>
          <th>对象</th>
          <th>原因/描述</th>
          <th>{{item.type == 1 ? '审核时间' : '转账时间'}}</th>

          <th>操作</th>
          <th>类型</th>
        </tr>
        <tr>
          <td>{{item.userNick}}</td>
          <td>{{item.describe}}</td>
          <td>{{item.time}}</td>
          <td>
            <div style="display: flex;justify-content: center;">
              <el-tooltip class="item" effect="light" content="处理该事项" placement="top-end">
                <img src="../../assets/imgs/update.png" style="width: 19px;height: 22px;cursor: pointer;"
                  @click="appropRecord(item.id,item.type)" />
              </el-tooltip>
              <p :style="item.id | filterRecord" class="recordCircle"></p>
            </div>
          </td>

          <td>
            <div
              style="width: 112px;height: 30px;line-height: 30px;margin: 0 auto;text-align: center;color: #fff;cursor: pointer;"
              :style="item.type | filterImg" @click="appropRecord(item.id,item.type)">
              {{item.type == 1 ? '向他打款' : '向我转账'}}</div>
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
    <div v-if="appropriationUnHandleSelect.select == 1">
      <div class="back-img" @click="gobackAppropUnList">
        <div>
          <img src="../../assets/imgs/goback.png" />
        </div>
        <span class="font">返回</span>
      </div>
      <div class="un-handle-msg">
        <p class="msg-top">
          {{formatNumberRgx(appropriationUnRecord.obj.subMoney) + ' ' +appropriationUnRecord.obj.currency}}</p>
        <div class="msg-main">
          <p>申请信息：</p>
          <div class="main-message">

            <p><span>申请人：</span><span>{{appropriationUnRecord.obj.operatorNick}}</span></p>
            <p><span>申请时间：</span><span>{{appropriationUnRecord.obj.subTime}}</span></p>
            <p><span>申请原因：</span><span>{{appropriationUnRecord.obj.describe}}</span></p>
            <div style="display: flex;">
              <span>收款账户：</span>
              <span v-show="appropriationUnRecord.obj.type == 1">现金</span>
              <p style="margin:0;" v-show="appropriationUnRecord.obj.type == 0">
                <span>{{appropriationUnRecord.obj.bankName + ' '}}</span>
                <span>{{appropriationUnRecord.obj.bankAccount + ' '}}</span>
                <button class="tag-read" :data-clipboard-text="appropriationUnRecord.obj.bankAccount"
                  @click="copy"></button>
              </p>
            </div>
          </div>
          <p>审核信息：</p>
          <div class="main-message">
            <p><span>审核人：</span><span>{{appropriationUnRecord.obj.checker}}</span></p>
            <p><span>审核时间：</span><span>{{appropriationUnRecord.obj.auditTime}}</span></p>
          </div>
          <p>操作：</p>
          <el-form class="main-message">
            <el-form-item label="支出港币金额：">
              <el-input v-model="money" style="width: 60%;height: auto;line-height: 40px;">
                <i slot="suffix" style="color: #000;margin-right:5%;font-style:normal;">HKD</i>
              </el-input>
            </el-form-item>
          </el-form>
        </div>
        <div style="text-align: center;">
          <p>
            <el-radio v-model="radio" label="1" style="color: red;">确认港币金额无误（提交后不可修改）</el-radio>
          </p>
          <el-button type="primary" @click="appropSubmit">
            已确认打款
          </el-button>
          <el-dialog title="提交审核结果" :visible.sync="dialogAppropSubmitVisible" center>
            <div style="text-align: center;">
              <p>确定通过该申请？确定后不可更改</p>
            </div>
            <div slot="footer">
              <el-button @click="dialogAppropSubmitVisible = false">取 消</el-button>
              <el-button type="primary" @click="appropSubmitSure" v-preventClick>确 定</el-button>
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
        total: 0,
        page: 1,
        pageNum: 10,
        list: [],
        appropId: 0,
        appropUnList: this.appropriationUnHandleList,
        appropriationUnRecord: {},
        money: '',
        dialogAppropSubmitVisible: false,
        radio: '',

      }
    },
    props: ['appropriationUnHandleList', 'appropriationUnHandleSelect'],
    filters: {
      filterRecord(id) {
        console.log(id);
        let circleList = JSON.parse(localStorage.getItem('appropUnHandle' + sessionStorage.getItem('userRecordId')));
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

      },
      filterImg(type) {
        switch (type) {
          case 1:
            return {
              backgroundColor: 'red'
            }
            case 2:
              return {
                backgroundColor: '#0c7063'
              }
        }
      }
    },
    mounted() {
      this.getList();
    },
    methods: {
      // 处理该事项
      appropRecord(id) {
        let list = JSON.parse(localStorage.getItem('appropUnHandle' + sessionStorage.getItem('userRecordId')));
        console.log(list);
        if (list == null) {
          list = [];
        }
        if (list.indexOf(id) === -1) {
          list.push(id);
        }
        localStorage.setItem('appropUnHandle' + sessionStorage.getItem('userRecordId'), JSON.stringify(list));
        let a1 = [];
        for (let item of this.appropriationUnHandleList) {
          a1.push(item.id);
        };
        let a2 = JSON.parse(localStorage.getItem('appropUnHandle' + sessionStorage.getItem('userRecordId')));
        // console.log(a1);
        // console.log(a2);
        if (a1.every(val => a2.includes(val))) {

          this.$emit('signPropUn', 0);
        } else {
          this.$emit('signPropUn', 1);
        }

        this.radio = '';
        this.money = '';
        this.appropId = id;
        this.$axios.post(this.url + '/borrowRecordInfo?java', {
          id: this.appropId,
          flag: 0
        }).then(res => {
          console.log('获取记录详情');
          console.log(res);
          this.appropriationUnRecord = res.data;
          console.log(this.appropriationUnRecord);
          this.appropriationUnHandleSelect.select = 1;
        }).catch(err => {
          console.log(err);
        })
      },
      // 确认打款
      appropSubmit() {
        if (this.money == '') {
          this.$message.error({
            message: '请输入打款金额',
            showClose: true,
            duration: 2000
          })
        } else if (this.radio == '') {
          this.$message.error({
            message: '请确认港币金额是否无误',
            showClose: true,
            duration: 2000
          })
        } else {
          this.dialogAppropSubmitVisible = true;
        }
      },
      // 确定提交
      appropSubmitSure() {
        this.$axios.post(this.url + '/financeCheckPay?java', {
          id: this.appropId,
          money: this.money
        }).then(res => {
          console.log('财务确认打款');
          console.log(res);
          this.$message.success({
            message: '该记录打款信息提交成功',
            showClose: true,
            duration: 2000
          });
          this.dialogAppropSubmitVisible = false;
          this.appropriationUnHandleSelect.select = 0;
          this.$emit('paySure', 0);
        }).catch(err => {
          console.log(err);
          this.$message.error({
            message: err.data.message,
            showClose: true,
            duration: 2000
          });
          this.dialogAppropSubmitVisible = false;
          this.appropriationUnHandleSelect.select = 0;
        })
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
      // 返回列表页
      gobackAppropUnList() {
        this.appropriationUnHandleSelect.select = 0;
      },
      // 分页处理数据
      getList() {
        console.log('分页数据');
        this.total = this.appropUnList.length;
        console.log(this.appropUnList);
        // es6过滤得到满足搜索条件的展示数据list
        this.list = this.appropUnList.filter((item, index) =>
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