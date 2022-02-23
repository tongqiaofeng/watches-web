<template>
  <div class="watchinfo-container">
    <div class="watchinfo">
      <table>
        <tr class="first-tr">
          <th>信息录入进度</th>
          <th>图片</th>
          <th>手表型号</th>
          <th>机芯号</th>
          <th>采购价</th>
          <th>操作</th>
        </tr>
        <tr v-for="(con,index) of buy_watch" :key="index" class="second-tr">
          <td>
            <img :src="con.buy_watchState == 1 ? watchimg1 : watchimg2" />
          </td>
          <td>
            <div>
              <img v-image-preview
                :src="con.buy_watchPics == null || con.buy_watchPics == '' ? '' : img + '/img/watch/'+ (con.buy_watchPics || '').split('|')[0]"
                style="width: 100px;height: 100px;object-fit: cover;" class="img" />
            </div>
          </td>
          <td>
            <div>
              <span>{{con.buy_watchBrand}}</span>
            </div>
            <div>
              <span>{{con.buy_watchModel}}</span>
            </div>
          </td>
          <td>{{con.buy_watchSn}}</td>
          <td>{{con.buy_watchCurrency+" "+formatNumberRgx(con.buy_watchPrice)}}</td>
          <td>
            <el-tooltip class="item" effect="light" content="修改信息" placement="top-end">
              <img src="../../assets/imgs/update.png" @click="editCatch(con)" style="cursor: pointer;" />
            </el-tooltip>
            <el-dialog title="手表信息" :visible.sync="dialogFormVisible" center :close-on-press-escape="false"
              :close-on-click-modal="false">
              <el-form label-width="120px">
                <el-form-item label="机芯号：">
                  <el-input placeholder="请输入机芯号" v-model="buy_watchSn" class="input-style"></el-input>
                </el-form-item>
                <el-form-item label="保卡日期：">
                  <el-date-picker v-model="buy_watchCard" type="date" placeholder="选择日期" class="input-style">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="配件：">
                  <el-checkbox-group required>
                    <el-checkbox-group v-model="accessory" class="accessories">
                      <el-checkbox v-for="accessory in accessories" :label="accessory" :key="accessory">{{accessory}}
                      </el-checkbox>
                    </el-checkbox-group>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item label="额外表带：">
                  <el-input placeholder="请输入额外表带数" type="text" v-model="buy_watchBand" class="input-style">
                    <i slot="suffix" style="color: #000;margin-right:5%;font-style:normal;">条</i>
                  </el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="messageSure" v-preventClick>保 存</el-button>
              </div>
            </el-dialog>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        img: this.$store.state.baseUrl,
        buy_watch: [], // 手表信息
        buy_watchtype: '', // 手表型号
        buy_watchSn: '', //机芯号
        buy_watchCard: new Date(), //采购保卡日期
        buy_watchParts: '', //采购配件
        accessory: [],
        accessories: ['保卡', '说明书', '普通表盒', '调针', '拆卸工具', '额外表带套', '表膜', '二维码', 'U盘', '后盖', '便携盒', '特殊表盒'],
        buy_watchBand: '', //采购额外表带数
        dialogFormVisible: false,
        id: 0,
        watchimg1: require("../../assets/imgs/sureImg.png"),
        watchimg2: require("../../assets/imgs/error.png"),
      }
    },
    created() {
      this.obtain();
      // 页面回到顶部
      (function smoothscroll() {
        var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
        if (currentScroll > 0) {
          window.requestAnimationFrame(smoothscroll);
          window.scrollTo(0, currentScroll - (currentScroll / 5));
        }
      })()
    },
    methods: {
      // 获取对应采购单号的手表信息
      obtain() {
        console.log('我是手表信息修改页面');
        console.log(this.watchid);
        this.$axios.post(this.$store.state.baseUrl + '/BuyOrderGet?java', {
          buy_id: sessionStorage.getItem("buy_id")
        }).then((res) => {
          console.log('手表详细信息');
          console.log(res);
          this.buy_watch = res.data.watch;
          console.log(this.buy_watch);
        })
      },
      // 编辑
      editCatch(con) {
        this.dialogFormVisible = true;
        console.log('111');
        console.log(con);
        this.buy_watchSn = con.buy_watchSn;
        this.buy_watchCard = con.buy_watchCard;
        this.accessory = con.buy_watchParts.split("|");
        this.buy_watchBand = con.buy_watchBand;
        this.id = con.id;
      },
      // 确认保存编辑的手表信息
      messageSure() {
        // console.log(this.accessory);
        this.buy_watchParts = '';
        for (let item of this.accessory) {
          this.buy_watchParts += item + '|';
        }
        this.$axios.post(this.$store.state.baseUrl + '/BuyWatchModify', {
          id: this.id,
          buy_watchSn: this.buy_watchSn,
          buy_watchCard: this.shellDate(this.buy_watchCard),
          buy_watchParts: this.buy_watchParts,
          buy_watchBand: this.buy_watchBand
        }).then((res) => {
          console.log('buhao2222');
          console.log(res.data.buy_watchState);
          this.$emit("listenWatchInfo", res.data.buy_watchState);
          this.$message.success({
            message: '手表信息上传成功',
            showClose: true,
            duration: 2000
          })
          this.dialogFormVisible = false;
          this.obtain();
          // 页面回到顶部
          (function smoothscroll() {
            var currentScroll =
              document.documentElement.scrollTop || document.body.scrollTop;
            if (currentScroll > 0) {
              window.requestAnimationFrame(smoothscroll);
              window.scrollTo(0, currentScroll - currentScroll / 5);
            }
          })();
        })
      },
    }
  }
</script>
<style lang="scss" scoped>
  .watchinfo-container {
    width: 100%;
    margin: 0 auto;
    margin-top: 20px;
    background-color: #fff;
    border-radius: 30px;

    .watchinfo {
      padding: 0;

      .first-tr {
        height: 40px;
        line-height: 40px;
        color: #000;

        th {
          font-size: 16px;
          font-weight: normal;
        }

      }

      .second-tr {
        td {
          padding: 15px;
          font-size: 15px;
          background-color: #f3fbf9;
        }

        .img {
          width: 100px;
          height: 100px;
          object-fit: cover;
          border-radius: 30px;
        }

        .input-style {
          width: 50% !important;
        }

        .accessories {
          width: 90%;
        }
      }
    }

  }

  tr {
    margin-bottom: 5px;

    th,
    td {
      width: 16%;
      text-align: center;
    }
  }
</style>
<style lang="scss">
  .el-form-item::after,
  .el-form-item::before {
    display: none;
    content: "";
  }

  .el-form-item__content::after,
  .el-form-item__content::before {
    display: none;
    content: "";
  }
</style>