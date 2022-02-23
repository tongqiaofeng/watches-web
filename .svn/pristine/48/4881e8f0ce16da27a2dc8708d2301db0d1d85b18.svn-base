<template>
  <div class="peer-container">
    <!-- <h3>贸易商管理</h3> -->
    <div class="peer-table">
      <div class="addBtn" @click="addPeer">
        <span class="add-style">
          <span>+</span> {{peerAuthority[9] == 1 ? '新增贸易商' : '新增客户'}}
        </span>
      </div>
      <el-dialog :title="peerAuthority[9] == 1 ? '新增贸易商' : '新增客户'" :visible.sync="dialogAddPeerVisible" center
        :close-on-press-escape="false" :close-on-click-modal="false">
        <el-form label-width="120px">
          <el-form-item label="类型：" required>
            <el-radio-group v-model="type">
              <el-radio :label="0">贸易商公司</el-radio>
              <el-radio :label="1">贸易商个体</el-radio>
              <el-radio :label="2" v-show="peerAuthority[10] == 1">散客</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="名称：" required>
            <el-input v-model="name" :placeholder="peerAuthority[9] == 1 ? '请输入贸易商名称' : '请输入客户名称'" class="input-style">
            </el-input>
          </el-form-item>
          <el-form-item label="国家：" required>
            <el-select v-model="country" placeholder="请选择" class="input-style">
              <el-option v-for="(coun,index) of countryList" :key="index" :label="coun.cnName" :value="coun.cnName">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="主营品牌：" required v-show="type !== 2">
            <el-checkbox-group v-model="sellBrandList">
              <el-checkbox :label="brand.name" v-for="(brand, index) of watchBrandList" :key="index"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="备注：">
            <el-input type="textarea" v-model="contactType" placeholder="请输入备注信息" class="input-style"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button @click="dialogAddPeerVisible = false">取 消</el-button>
          <el-button type="primary" @click="surePeerAdd" v-preventClick>确 定</el-button>
        </div>
      </el-dialog>
      <div v-show="dataPeerList.length == 0" ref="listes" style="text-align: center;">
        <p>{{dataMsg}}</p>
      </div>
      <div v-if="dataPeerList.length !== 0">
        <table>
          <tr>
            <th>名称</th>
            <th>类型</th>
            <th>操作</th>
          </tr>
          <tr v-for="(item,index) of list" :key="index">
            <td>{{item.name}}</td>
            <td>{{item.type == 0 ? '贸易商公司' : (item.type == 1 ? '贸易商个体' : '散客')}}</td>
            <td>
              <el-tooltip class="item" effect="light" content="修改查看信息" placement="top-end">
                <img src="../../assets/imgs/details.png" style="cursor:pointer;" @click="updatePeer(item)" />
              </el-tooltip>
              <el-dialog :title="peerAuthority[9] == 1 ? '修改贸易商信息' : '修改客户信息'" center
                :visible.sync="dialogUpdatePeerVisible">
                <el-form label-width="120px">
                  <el-form-item label="类型：" required>
                    <el-radio-group v-model="type">
                      <el-radio :label="0">贸易商公司</el-radio>
                      <el-radio :label="1">贸易商个体</el-radio>
                      <el-radio :label="2" v-show="peerAuthority[10] == 1">散客</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="名称：" required>
                    <el-input v-model="name" :placeholder="peerAuthority[9] == 1 ? '请输入贸易商名称' : '请输入客户名称'"
                      class="input-style">
                    </el-input>
                  </el-form-item>
                  <el-form-item label="国家：" required>
                    <el-select v-model="country" placeholder="请选择" class="input-style">
                      <el-option v-for="(coun,index) of countryList" :key="index" :label="coun.cnName"
                        :value="coun.cnName">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="主营品牌：" required v-show="type !== 2">
                    <el-checkbox-group v-model="sellBrandList">
                      <el-checkbox :label="brand.name" v-for="(brand, index) of watchBrandList" :key="index">
                      </el-checkbox>
                    </el-checkbox-group>
                  </el-form-item>
                  <el-form-item label="备注：">
                    <el-input type="textarea" v-model="contactType" placeholder="请输入备注信息" class="input-style">
                    </el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer">
                  <el-button @click="dialogUpdatePeerVisible = false">取 消</el-button>
                  <el-button type="primary" @click="updatePeerSure" v-preventClick>确 定</el-button>
                </div>
              </el-dialog>
              <el-tooltip class="item" effect="light" content="删除信息" placement="top-end">
                <img src="../../assets/imgs/delete.png" style="margin-left: 30px;cursor:pointer;"
                  @click="deletPeer(item.id)" />
              </el-tooltip>
              <el-dialog :title="peerAuthority[9] == 1 ? '删除贸易商' : '删除客户'" center
                :visible.sync="dialogDeletPeerVisible">
                <div style="text-align: center;">
                  <span style="font-size: 16px;">是否删除该贸易商，删除后不可恢复</span>
                </div>
                <div slot="footer">
                  <el-button @click="dialogDeletPeerVisible = false">取 消</el-button>
                  <el-button type="primary" @click="deletPeerSure" v-preventClick>确 定</el-button>
                </div>
              </el-dialog>
              <el-tooltip class="item" effect="light" content="新建采购单" placement="top-end">
                <img src="../../assets/imgs/add.png" style="margin-left: 30px;cursor:pointer;"
                  v-if="peerAuthority[9] == 1" @click="addPurchase(item)" />
              </el-tooltip>
            </td>
          </tr>
        </table>
        <div style="width: 100%;height: 50px;" v-show="this.keyword == ''">
          <div style="margin:15px 0;position:absolute;right:6%;">
            <el-pagination @current-change="handleCurrentChange" :current-page="page"
              layout="total, prev, pager, next, jumper" :total="total">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        dataMsg: '数据加载中...',
        keyword: '',
        dataPeerList: [],
        dataPeerList2: [],
        dataPeerList3: [],
        dialogAddPeerVisible: false,
        name: '', // 贸易商名称
        type: 0, // 类型
        country: '中国香港', // 国家
        countryList: [],
        contactType: '', // 备注
        watchBrandList: [],
        sellBrandList: [], // 所选择的主营品牌
        sellBrand: '', // 主营品牌
        deletId: 0,
        dialogDeletPeerVisible: false,
        updateId: 0,
        dialogUpdatePeerVisible: false,
        page: 1,
        total: 0,
        list: [],
        pageNum: 10,

        peerAuthority: []

      }
    },
    created() {
      this.handlePeerList();
      this.peerAuthority = sessionStorage.getItem('authority').split('|');
      this.handleCountry();
      this.handleBrand();
    },
    methods: {
      // 获取同行列表
      handlePeerList() {
        this.dataMsg = '数据加载中...';
        this.page = 1;
        this.$axios
          .post(this.$store.state.baseUrl + "/DataPeerList")
          .then(res => {
            console.log("贸易商");
            console.log(res);
            this.dataPeerList3 = res.data.peers;
            this.dataPeerList = this.dataPeerList3;
            console.log(this.dataPeerList);
            if (this.dataPeerList.length == 0) {
              this.dataMsg = '啊哦~暂无数据';
            };
            this.getList();
          })
          .catch(err => {
            console.log(err);
            this.$message.error({
              message: '暂无贸易商信息',
              showClose: true,
              duration: 2000
            });
          });
      },
      // 模糊搜索
      stockInSearch() {
        console.log(this.keyword);
        console.log(this.dataPeerList);
        if (this.keyword !== '') {
          this.dataPeerList.map((item) => {
            console.log(item);
            if (item.name.indexOf(this.keyword) > -1) {
              return this.dataPeerList2.push(item);
            }
          });
          this.list = [];
          this.list = this.dataPeerList2;
          if (this.list.length == 0) {
            this.dataMsg = '啊哦~暂无数据';
          }
          this.dataPeerList2 = [];
          return this.list;
        } else {
          this.dataPeerList = this.dataPeerList3;
          this.page = 1;
          this.getList();
        }
      },
      // 分页处理数据
      getList() {
        console.log('分页数据');
        this.total = this.dataPeerList.length;
        console.log(this.dataPeerList);
        // es6过滤得到满足搜索条件的展示数据list
        this.list = this.dataPeerList.filter((item, index) =>
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
      // 增加贸易商
      addPeer() {
        // this.peerSelect.select = 1;
        this.dialogAddPeerVisible = true;
        this.name = '';
        this.type = 0;
        this.country = '中国香港'; // 国家
        this.contactType = ''; // 备注
        this.sellBrandList = []; // 所选择的主营品牌
        this.sellBrand = ''; // 主营品牌
      },
      // 获取所有国家
      handleCountry() {
        this.$axios.post(this.$store.state.baseUrl + '/CountryGet').then((res) => {
          console.log('所有国家');
          console.log(res);
          this.countryList = res.data;
        }).catch((err) => {
          console.log(err);
        })
      },
      // 获取所有品牌
      handleBrand() {
        this.$axios.post(this.$store.state.baseUrl + '/DataWatchBrandList').then((res) => {
          console.log('品牌列表');
          console.log(res);
          this.watchBrandList = res.data;
        })
      },
      // 提交前数据的验证
      sellBrandChange() {
        // 主营品牌
        console.log(this.sellBrandList);
        this.sellBrand = this.sellBrandList.join('|');
        console.log(this.sellBrand);
        if (this.type !== 2) {
          if (this.name == '' || this.country == '' || this.sellBrand == '') {
            this.$message.error({
              message: '数据不能为空，请检查数据填写',
              showClose: true,
              duration: 2000
            })
            return 1;
          }
        } else {
          if (this.name == '' || this.country == '') {
            this.$message.error({
              message: '数据不能为空，请检查数据填写',
              showClose: true,
              duration: 2000
            })
            return 1;
          }
        }

      },
      // 确定增加贸易商
      surePeerAdd() {
        if (this.sellBrandChange() !== 1) {
          const loading = this.$loading({
            lock: true,
            text: '数据提交中...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
          this.$axios.post(this.$store.state.baseUrl + '/DataPeerSave', {
            name: this.name,
            type: this.type,
            country: this.country,
            contactType: this.contactType,
            sellBrand: this.sellBrand
          }).then((res) => {
            console.log('增加贸易商');
            console.log(res);
            this.$message.success({
              message: '新增贸易商成功',
              showClose: true,
              duration: 2000
            })
            this.dialogAddPeerVisible = false;
            loading.close();
            this.handlePeerList();
          }).catch((err) => {
            loading.close();
            this.$message.error({
              message: err.data.message,
              showClose: true,
              duration: 2000
            })
          })
        }
      },
      // 查看/修改贸易商
      updatePeer(item) {
        this.name = '';
        this.type = 0;
        this.country = ''; // 国家
        this.contactType = ''; // 备注
        this.sellBrandList = []; // 所选择的主营品牌
        this.sellBrand = ''; // 主营品牌
        console.log(item);
        this.updateId = item.id;
        this.name = item.name;
        this.type = item.type;
        this.country = item.country;
        this.contactType = item.contactType;
        if (item.sellBrand !== '' || item.sellBrand !== null) {
          this.sellBrandList = item.sellBrand.split('|');
        } else {
          this.sellBrandList = [];
        }
        this.dialogUpdatePeerVisible = true;
      },
      // 确定
      updatePeerSure() {
        if (this.sellBrandChange() !== 1) {
          console.log(this.country);
          this.$axios.post(this.$store.state.baseUrl + '/DataPeerSave', {
            id: this.updateId,
            name: this.name,
            type: this.type,
            country: this.country,
            contactType: this.contactType,
            sellBrand: this.sellBrand
          }).then((res) => {
            console.log('修改贸易商');
            console.log(res);
            this.$message.success({
              message: '修改贸易商成功',
              showClose: true,
              duration: 2000
            })
            this.dialogUpdatePeerVisible = false;
            this.handlePeerList();
          }).catch((err) => {
            this.$message.error({
              message: err.data.message,
              showClose: true,
              duration: 2000
            })
          })
        }
      },
      // 删除贸易商
      deletPeer(id) {
        this.deletId = id;
        this.dialogDeletPeerVisible = true;
      },
      // 确定
      deletPeerSure() {
        this.$axios.post(this.$store.state.baseUrl + '/DataPeerDel', {
          id: this.deletId
        }).then((res) => {
          console.log('删除贸易商');
          console.log(res);
          this.$message.success({
            message: '删除该贸易商成功',
            showClose: true,
            duration: 2000
          });
          this.dialogDeletPeerVisible = false;
          this.handlePeerList();
        }).catch((err) => {
          this.$message.error({
            message: err.data.message,
            showClose: true,
            duration: 2000
          })
        })
      },
      // 新建采购单
      addPurchase(item) {
        sessionStorage.setItem('peerContainer', item.name);
        sessionStorage.setItem('peerId', item.id);
        sessionStorage.setItem('peerCountry', item.country);
        this.$emit('peerSel', 3);
      },
    },
  }
</script>
<style lang="scss" scoped>
  .peer-container {
    width: 100%;

    .peer-table {
      width: 90%;
      margin: 0 auto;
      padding: 40px;
      background-color: #fff;
      border-radius: 30px;

      .addBtn {
        width: 144px;
        height: 48px;
        margin-bottom: 30px;
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
  }

  .input-style {
    width: 60%;
  }

  table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
  }

  tr {

    th,
    td {
      width: 33%;
      text-align: center;
    }
  }
</style>
<style lang="scss">
  .el-radio-group {
    line-height: 50px;
  }
</style>