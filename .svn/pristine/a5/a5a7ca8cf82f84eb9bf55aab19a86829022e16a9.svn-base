<template>
  <div>
    <!-- 我的借贷-新增记录 -->
    <el-form label-width="120px">
      <el-form-item label="用户列表：" required v-show="recordSelect !== 'company'">
        <el-select v-model="userId" placeholder="请选择用户" @change="changeNick">
          <el-option v-for="item of recordListData.userList" :key="item.id" :label="item.nick" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="recordSelect == 'transfer' ? '转账金额：' : '申请金额：'" required>
        <div style="width: 100%;">
          <el-input v-model="subMoney" placeholder="请输入" style="width: 30%;"></el-input>
          <el-select v-model="currency" style="width: 30%;" placeholder="请选择">
            <el-option v-for="(item,index) in currencyList" :key="index" :label="item" :value="item">
            </el-option>
          </el-select>
        </div>
      </el-form-item>
      <el-form-item :label="recordSelect == 'transfer' ? '支出方式：' : '收款方式：'" required>
        <el-radio-group v-model="type">
          <el-radio label="银行卡"></el-radio>
          <el-radio label="现金"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="银行卡号：" required v-show="type !== '现金'">
        <div style="width: 100%;display: flex;">
          <el-autocomplete class="input-style" v-model="bankAccount" :fetch-suggestions="querySearch"
            :trigger-on-focus="false" placeholder="可输入银行卡号进行查询" @select="handleSelect">
          </el-autocomplete>
          <div style="margin-top: 5px;">
            <el-tooltip class="item" effect="light" content="新增银行卡" placement="top-end">
              <img src="../../assets/imgs/peer.png" style="height: 35px;margin-left: 10px;cursor: pointer;"
                @click="addBank" />
            </el-tooltip>
            <el-dialog title="新增银行卡" :visible.sync="dialogAddBankVisible" center :close-on-press-escape="false"
              :close-on-click-modal="false">
              <div>
                <el-form label-width="130px">
                  <el-form-item label="银行卡名称：" required>
                    <el-autocomplete class="inline-input input-style" v-model="bankName"
                      :fetch-suggestions="queryBankNameSearch" placeholder="请输入内容" @select="handleBankNameSelect">
                    </el-autocomplete>
                  </el-form-item>
                  <el-form-item label="银行卡卡号：" required>
                    <el-input v-model="bankAccount" class="input-style"></el-input>
                  </el-form-item>
                  <el-form-item label="备注：">
                    <el-input type="textarea" v-model="remark" class="input-style"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div slot="footer">
                <el-button @click="dialogAddBankVisible = false">取 消</el-button>
                <el-button type="primary" @click="addBankSure" v-preventClick>确 定</el-button>
              </div>
            </el-dialog>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="申请原因：" required>
        <el-input type="textarea" v-model="describe" class="input-style"></el-input>
      </el-form-item>
    </el-form>
    <div class="submitButton">
      <el-button type="primary" @click="borrowRecordAdd" v-preventClick>申 请</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        url: this.$store.state.baseUrl,

        userId: '', // 用户
        subMoney: '', // 申请金额
        currency: '', // 币种
        type: '银行卡',

        bankAccount: '',
        bankId: 0,
        dialogAddBankVisible: false,
        bankNameList: [{
          name: '工商银行'
        }, {
          name: '中国银行'
        }, {
          name: '建设银行'
        }, {
          name: '招商银行'
        }, {
          name: '交通银行'
        }, {
          name: '农业银行'
        }, {
          name: '汇丰银行'
        }, {
          name: '花旗银行'
        }, {
          name: '恒生银行'
        }],
        bankName: '', // 银行卡名称
        bankAccount: '', // 卡号
        remark: '', // 备注
        describe: '',
        params: {},
      }
    },
    props: ['recordSelect', 'recordListData'],

    computed: {
      currencyList() {
        let list = [];
        for (let item of this.recordListData.countryList) {
          if (list.indexOf(item.enCurrency) === -1) {
            list.push(item.enCurrency);
          }
        };
        // console.log(list);
        return list;
      },
    },
    methods: {
      changeNick() {
        console.log(this.userId);
      },
      // 银行卡号选择
      querySearch(queryString, cb) {
        console.log(this.recordListData.bankList);
        let restaurants = this.recordListData.bankList;
        for (let items of restaurants) {
          items.value = items.bankName + ' ' + items.bankAccount;
          items.id = items.id;
        }
        let results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        console.log(results);
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.bankAccount.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(item) {
        console.log(item);
        this.bankAccount = item.value;
        this.bankId = item.id;
        console.log(this.bankAccount);
        console.log(this.bankId);
      },
      // 新增银行卡
      addBank() {
        this.bankName = '';
        this.bankAccount = '';
        this.remark = '';
        this.dialogAddBankVisible = true;
      },
      // 银行卡名称选择
      queryBankNameSearch(queryString, cb) {
        console.log(this.bankNameList);
        let restaurants = this.bankNameList;
        for (let items of restaurants) {
          items.value = items.name;
        }
        let results = queryString ? restaurants.filter(this.createBankNameFilter(queryString)) : restaurants;
        console.log(results);
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createBankNameFilter(queryString) {
        return (restaurant) => {
          return (restaurant.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleBankNameSelect(item) {
        console.log(item);
        this.bankName = item.value;
      },
      // 确定增加
      addBankSure() {
        if (this.bankName == '' || this.bankAccount == '') {
          this.$message.error({
            message: '数据不能为空，请检查数据填写',
            showClose: true,
            duration: 2000
          })
        } else {
          this.$axios.post(this.url + '/bankCardSave?java', {
            bankName: this.bankName,
            bankAccount: this.bankAccount,
            remark: this.remark
          }).then(res => {
            console.log('增加银行卡');
            console.log(res);
            this.bankAccount = res.data.bankName + ' ' + res.data.bankAccount;
            this.bankId = res.data.id;
            this.$message.success({
              message: '新增银行卡成功',
              showClose: true,
              duration: 2000
            });
            this.dialogAddBankVisible = false;
          }).catch(err => {
            console.log(err);
            this.$message.error({
              message: err.data.message,
              showClose: true,
              duration: 2000
            });
            this.dialogAddBankVisible = false;
          })
        }
      },
      // 数据验证
      borrowRecordAdd() {
        if (this.type == '银行卡') {
          if (this.subMoney == '' || this.currency == '' || this.bankAccount ==
            '' || this.describe == '') {
            this.$message.error({
              message: '数据不能为空，请检查数据填写',
              showClose: true,
              duration: 2000
            })
            return 1;
          };
        } else {
          if (this.subMoney == '' || this.currency == '' || this.describe ==
            '') {
            this.$message.error({
              message: '数据不能为空，请检查数据填写',
              showClose: true,
              duration: 2000
            })
            return 1;
          };
        }
        if (this.recordSelect == 'company') {
          this.params = {
            flag: 0,
            userId: 0,
            subMoney: this.subMoney,
            currency: this.currency,
            type: this.type == '银行卡' ? 0 : 1,
            id: this.type == '银行卡' ? this.bankId : '',
            describe: this.describe
          }
        } else {
          this.params = {
            flag: this.recordSelect == 'fellow' ? 0 : 1,
            userId: this.userId,
            subMoney: this.subMoney,
            currency: this.currency,
            type: this.type == '银行卡' ? 0 : 1,
            id: this.type == '银行卡' ? this.bankId : '',
            describe: this.describe
          }
        }
        console.log(this.params);
        this.verifyBorrow(this.params);
      },
      // 提交申请
      verifyBorrow(params) {
        this.$axios.post(this.url + '/borrowRecordAdd?java', params).then(res => {
          console.log('增加借贷记录');
          console.log(res);
          this.$message.success({
            message: '新增记录成功',
            showClose: true,
            duration: 2000
          });
          this.$emit('recordSubmit', 0);
        }).catch(err => {
          console.log(err);
          this.$message.error({
            message: err.data.message,
            showClose: true,
            duration: 2000
          });
          this.$emit('recordSubmit', 0);
        })
      },
      // 获取银行卡列表
      // getbankCardList() {
      //   this.bankMsg = '数据加载中...';
      //   this.$axios.post(this.url + '/bankCardList?java').then(res => {
      //     console.log('获取银行卡列表');
      //     console.log(res);
      //     this.bankNameList = res.data;
      //     console.log(this.bankList);
      //   }).catch(err => {
      //     console.log(err);
      //   })
      // },
    }
  }
</script>

<style lang="scss" scoped>
  .submitButton {
    width: 90%;
    margin-top: 60px;
    text-align: right;
  }

  .input-style {
    width: 60% !important;
  }
</style>