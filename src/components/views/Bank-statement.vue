<template>
  <div class="bank-statement-container">
    <!-- 银行卡管理 -->
    <div style="display: flex;justify-content: flex-end;">
      <div class="addBtn" @click="addBank" v-preventClick>
        <span class="add-style">
          <span>+</span> 新增银行卡
        </span>
      </div>
    </div>
    <el-dialog title="新增银行卡" :visible.sync="dialogAddBankVisible" center :close-on-press-escape="false"
      :close-on-click-modal="false">
      <div>
        <el-form label-width="130px">
          <el-form-item label="银行卡名称：" required>
            <el-autocomplete class="inline-input input-style" v-model="bankName" :fetch-suggestions="querySearch"
              placeholder="请输入内容" @select="handleSelect"></el-autocomplete>
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
    <div class="bank-statement-container-body">
      <div v-if="bankList.length == 0" style="text-align: center;">
        <p>{{bankMsg}}</p>
      </div>
      <div class="bank-table" v-else>
        <table>
          <tr>
            <th></th>
            <th>名称</th>
            <th>卡号</th>
            <th>操作</th>
          </tr>
          <tr v-for="(item,index) in bankList" :key="index">
            <td>
              <!-- <div :style="{backgroundImage: 'url(' +  url +  item.backGroundImage + ')', backgroundSize:'contain'}"> -->
              <img class="img-style" :src="item.logo == null || item.logo == '' ? '' :  url + item.logo" />
              <!-- </div> -->
            </td>
            <td>{{item.bankName}}</td>
            <td>
              <span>{{item.bankAccount}}</span>
              <button class="tag-read" :data-clipboard-text="item.bankAccount" @click="copy"></button>
            </td>
            <td>
              <el-tooltip class="item" effect="light" content="修改银行卡信息" placement="top-end">
                <img src="../../assets/imgs/update.png" style="margin-left: 30px;cursor:pointer;"
                  @click="bankUpdate(item)" />
              </el-tooltip>
              <el-dialog title="修改银行卡信息" :visible.sync="dialogUpdateBankVisible" center>
                <div>
                  <el-form label-width="130px">
                    <el-form-item label="银行卡名称：" required>
                      <el-autocomplete class="inline-input input-style" v-model="bankName"
                        :fetch-suggestions="querySearch" placeholder="请输入内容" @select="handleSelect"></el-autocomplete>
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
                  <el-button @click="dialogUpdateBankVisible = false">取 消</el-button>
                  <el-button type="primary" @click="bankUpdateSure" v-preventClick>确 定</el-button>
                </div>
              </el-dialog>
              <el-tooltip class="item" effect="light" content="删除银行卡信息" placement="top-end">
                <img src="../../assets/imgs/delete.png" style="margin-left: 30px;cursor:pointer;"
                  @click="bankDelete(item.id)" />
              </el-tooltip>
              <el-dialog title="删除银行卡信息" :visible.sync="dialogDeleteBankVisible" center>
                <div style="text-align: center;">
                  <p>确定删除该银行卡信息？删除后不可恢复</p>
                </div>
                <div slot="footer">
                  <el-button @click="dialogDeleteBankVisible = false">取 消</el-button>
                  <el-button type="primary" @click="bankDeleteSure" v-preventClick>确 定</el-button>
                </div>
              </el-dialog>
            </td>
          </tr>
        </table>
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
        dialogAddBankVisible: false,
        bankMsg: '数据加载中...',
        bankList: [],
        dialogUpdateBankVisible: false,
        dialogDeleteBankVisible: false,
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
        updateId: 0,
        deleteId: 0,

      }
    },
    created() {
      this.getbankCardList();
    },
    methods: {
      // 获取银行卡列表
      getbankCardList() {
        this.bankMsg = '数据加载中...';
        this.$axios.post(this.url + '/bankCardList?java').then(res => {
          console.log('获取银行卡列表');
          console.log(res);
          this.bankList = res.data;
          console.log(this.bankList);
          if (this.bankList.length == 0) {
            this.bankMsg = '啊哦~暂无数据';
          }
        }).catch(err => {
          console.log(err);
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
      // 增加银行卡
      addBank() {
        this.bankName = '';
        this.bankAccount = '';
        this.remark = '';
        this.dialogAddBankVisible = true;
      },
      // 银行卡名称选择
      querySearch(queryString, cb) {
        console.log(this.bankNameList);
        let restaurants = this.bankNameList;
        for (let items of restaurants) {
          items.value = items.name;
        }
        let results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        console.log(results);
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(item) {
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
            bankAccount: this.bankAccount.replace(/\s/g, ""),
            remark: this.remark
          }).then(res => {
            console.log('增加银行卡');
            console.log(res);
            this.$message.success({
              message: '新增银行卡成功',
              showClose: true,
              duration: 2000
            });
            this.dialogAddBankVisible = false;
            this.getbankCardList();
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
      // 修改银行卡信息
      bankUpdate(item) {
        this.updateId = item.id;
        this.bankName = item.bankName;
        this.bankAccount = item.bankAccount;
        this.remark = item.remark;
        this.dialogUpdateBankVisible = true;
      },
      // 确定修改
      bankUpdateSure() {
        if (this.bankName == '' || this.bankAccount == '') {
          this.$message.error({
            message: '数据不能为空，请检查数据填写',
            showClose: true,
            duration: 2000
          })
        } else {
          this.$axios.post(this.url + '/bankCardSave?java', {
            id: this.updateId,
            bankName: this.bankName,
            bankAccount: this.bankAccount,
            remark: this.remark
          }).then(res => {
            console.log('修改银行卡');
            console.log(res);
            this.$message.success({
              message: '修改银行卡信息成功',
              showClose: true,
              duration: 2000
            });
            this.dialogUpdateBankVisible = false;
            this.getbankCardList();
          }).catch(err => {
            console.log(err);
            this.$message.error({
              message: err.data.message,
              showClose: true,
              duration: 2000
            });
            this.dialogUpdateBankVisible = false;
          })
        }
      },
      // 删除银行卡信息
      bankDelete(id) {
        this.deleteId = id;
        this.dialogDeleteBankVisible = true;
      },
      // 确定删除
      bankDeleteSure() {
        this.$axios.post(this.url + '/delBankCard?java', {
          id: this.deleteId
        }).then(res => {
          console.log('删除银行卡');
          console.log(res);
          this.$message.success({
            message: '删除银行卡信息成功',
            showClose: true,
            duration: 2000
          });
          this.dialogDeleteBankVisible = false;
          this.getbankCardList();
        }).catch(err => {
          console.log(err);
          this.$message.error({
            message: err.data.message,
            showClose: true,
            duration: 2000
          });
          this.dialogDeleteBankVisible = false;
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
  .bank-statement-container {
    width: 95%;
    margin: 0 auto;

    .bank-statement-container-body {
      padding: 40px;
      background-color: #fff;
      border-radius: 30px;
    }

    .addBtn {
      width: 144px;
      height: 48px;
      margin-bottom: 20px;
      line-height: 48px;
      border-radius: 6px;
      text-align: center;
      cursor: pointer;
      background-color: #0c7063;

      .add-style {
        display: inline-block;
        font-size: 16px;
        color: #fff;
      }
    }

    .bank-table {
      width: 100%;

      .tag-read {
        width: 20px;
        height: 20px;
        margin-left: 5px;
        border: 0;
        background: url('../../assets/imgs/copy.png') no-repeat;
        background-size: cover;
        cursor: pointer;
      }

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

      .img-style {
        width: 70px;
        height: 70px;
        border-radius: 30px;
        object-fit: cover;
      }
    }

    .bank-table tr:hover>td {
      background-color: #d7ebe7 !important;
    }
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
      width: 25%;
      text-align: center;
    }
  }
</style>