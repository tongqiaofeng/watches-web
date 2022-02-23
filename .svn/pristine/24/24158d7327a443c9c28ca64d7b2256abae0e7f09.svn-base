<template>
  <div>
    <!-- 小费管理页面 -->
    <div v-if="tipSel.select == 0" class="tip-admin-container">
      <div class="tip-admin-top">
        <el-form label-width="100px" style="display: flex;">
          <el-form-item label="开始时间：">
            <el-date-picker v-model="startTime" type="date" placeholder="请选择开始时间" value-format="yyyy-MM-dd"
              class="input-style" style="width: 70%;">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间：">
            <el-date-picker v-model="endTime" type="date" placeholder="请选择结束时间" value-format="yyyy-MM-dd"
              class="input-style" style="width: 70%;"></el-date-picker>
          </el-form-item>
        </el-form>
        <el-button type="primary" style="width: 100px;height: 40px;font-size: 14px;" @click="filtrateMsgSure"
          v-preventClick>筛 选
        </el-button>
      </div>
      <div v-show="feeList.length == 0" style="text-align: center;">
        <p>{{msg}}</p>
      </div>
      <div v-show="feeList.length !== 0">
        <p>小费总金额：{{formatNumberRgx(moneyTotal) + ' ' + 'HKD'}}</p>
        <table>
          <tr>
            <th>小费金额</th>
            <th>小费时间</th>
            <th>类型</th>
            <th>操作</th>
          </tr>
          <tr v-for="(item,index) in feeList" :key="index">
            <td>{{formatNumberRgx(item.feeMoney) + ' ' + item.feeCurrency}}</td>
            <td>{{item.feeTime}}</td>
            <td>{{item.type == 0 ? '非补录' : '补录'}}</td>
            <td>
              <el-tooltip class="item" effect="light" content="查看详细信息" placement="top-end">
                <img src="../../assets/imgs/details.png" style="cursor: pointer;"
                  @click="checkDetails(item.buy_id,item.bxNumber)" />
              </el-tooltip>
            </td>
          </tr>
        </table>
        <div style="width: 100%;height: 63px;">
          <div style="margin:15px 0;position:absolute;right:10%;">
            <el-pagination @current-change="handleCurrentChange" :current-page="page"
              layout="total, prev, pager, next, jumper" :total="total"></el-pagination>
          </div>
        </div>
      </div>
    </div>
    <div v-if="tipSel.select == 1">
      <Details @goback="goback" :detailsSelect="detailsSelect"></Details>
    </div>
    <div v-if="tipSel.select == 2" class="tip-admin-container">
      <div class="back-img" @click="goback">
        <div>
          <img src="../../assets/imgs/goback.png" />
        </div>
        <span class="font">返回</span>
      </div>
      <div class="claimInfo">
        <div class="details-top">
          <p>报销单号：<span>{{toConfirmedDetails.bxNumber}}</span></p>
          <p>提交时间：<span>{{toConfirmedDetails.subTime}}</span></p>
          <p>审核时间：<span>{{toConfirmedDetails.auditTime == null ? '未审核' : toConfirmedDetails.auditTime}}</span></p>
          <p>完成时间：<span>{{toConfirmedDetails.checkTime == null ? '未完成' : toConfirmedDetails.checkTime}}</span></p>
        </div>
        <div class="details-top" style="margin: 30px auto;">
          <p>
            预估报销金额：<span>{{formatNumberRgx(toConfirmedDetails.sysCheckMoney) + ' ' + toConfirmedDetails.settle_currency}}</span>
          </p>
          <p>
            核算报销金额：<span>{{formatNumberRgx(toConfirmedDetails.checkMoney) + ' ' + toConfirmedDetails.settle_currency}}</span>
          </p>
        </div>
        <div class="details-main">
          <p>消费记录：</p>
          <table v-for="(reim,index) in toConfirmedDetails.data" :key="index">
            <tr>
              <th></th>
              <th>
                <span>{{reim.type == 0 ? '行程名称' : '类型'}}</span>
              </th>
              <th>预估报销金额</th>
              <th>核算报销金额</th>
              <th>
                <span>{{reim.type == 0 ? '起止时间' : '时间'}}</span>
              </th>
              <th>操作</th>
            </tr>
            <tr>
              <td>
                <img :src="reim.type == 0 ? img2 : img1" style="width: 25px;height: 25px;" />
              </td>
              <td>{{reim.type == 0 ? reim.obj.name : reim.obj.type}}</td>
              <td>{{formatNumberRgx(reim.obj.sysCheckMoney) + ' ' + toConfirmedDetails.settle_currency}}</td>
              <td>{{formatNumberRgx(reim.obj.checkMoney) + ' ' + toConfirmedDetails.settle_currency}}</td>
              <td>
                <p v-if="reim.type == 0" style="margin: 0;">{{reim.obj.startTime}}</p>
                <p v-if="reim.type == 0" style="margin: 0;">至</p>
                <p v-if="reim.type == 0" style="margin: 0;">{{reim.obj.endTime}}</p>
                <p v-if="reim.type == 1">{{reim.obj.time}}</p>
              </td>
              <td>
                <el-tooltip class="item" effect="light" content="查看详情" placement="top-end">
                  <img src="../../assets/imgs/details.png" style="cursor:pointer;"
                    @click="lookOver(reim.type,reim.obj.id)" />
                </el-tooltip>
                <el-dialog title="非行程记录信息" :visible.sync="dialogUnReimbursementVisible" center>
                  <div>
                    <p style="text-align: center;">
                      <span
                        style="font-size: 17px;color: #0c8563;">{{formatNumberRgx(unJourneyInfo.estimateMoney) + ' ' + unJourneyInfo.currency}}</span>
                    </p>
                    <p>
                      <span>日期： <span>{{unJourneyInfo.time}}</span></span>
                    </p>
                    <div>
                      <span>账单图片：</span>
                      <div style="display:flex;position:relative;" id="delImg">
                        <div v-for="(imgurl,index) of imgurls" :key="index" style="margin-left:10px;position:relative;">
                          <img v-show="imgurl !== ''" :src="img + imgurl" width="100px" height="100px"
                            style="border-radius:5px;object-fit:cover;" />
                        </div>
                      </div>
                    </div>
                    <p>
                      <span>备注： <span>{{unJourneyInfo.remark}}</span></span>
                    </p>
                    <div style="margin-top: 20px;border-top: 1px solid #ddd;">
                      <p>财务核算：</p>
                      <div style="padding-left: 15px;display: flex;justify-content: space-between;">
                        <p>汇率：<span>{{unJourneyInfo.rate}}</span></p>
                        <img src="../../assets/imgs/calc.png" style="height: 35px;cursor: pointer;" @click="jumpRate" />
                      </div>
                      <p style="margin-top: 0;padding-left: 15px;">
                        汇率日期：<span>{{unJourneyInfo.rateTime}}</span>
                      </p>
                      <p style="padding-left: 15px;">
                        预估报销金额：<span>{{formatNumberRgx(unJourneyInfo.sysCheckMoney) + ' ' + unJourneyInfo.settle_currency}}</span>
                      </p>
                      <p style="padding-left: 15px;">
                        核算报销金额：<span>{{formatNumberRgx(unJourneyInfo.checkMoney) + ' ' + unJourneyInfo.settle_currency}}</span>
                      </p>
                    </div>
                  </div>
                  <div slot="footer">
                    <el-button @click="dialogUnReimbursementVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dialogUnReimbursementVisible = false">确 认</el-button>
                  </div>
                </el-dialog>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <div v-if="tipSel.select == 3" class="tip-admin-container">
      <div class="back-img" @click="gobackReimDetails">
        <div>
          <img src="../../assets/imgs/goback.png" />
        </div>
        <span class="font">返回</span>
      </div>
      <div class="details-top">
        <p>
          <span>行程名称：<span>{{journeyInfo.name}}</span></span>
        </p>
        <p>
          <span>起止时间：<span>{{journeyInfo.startTime + ' ~ ' + journeyInfo.endTime}}</span></span>
        </p>
        <p>
          <span>行程描述：<span>{{journeyInfo.des}}</span></span>
        </p>
      </div>
      <div class="details-top" style="margin-top: 30px;">
        <table>
          <tr>
            <th>类型</th>
            <th>预估报销金额</th>
            <th>核算报销金额</th>
            <th>时间</th>
            <th>操作</th>
          </tr>
          <tr v-for="(every,index) in journeyInfo.recordList" :key="index">
            <td>{{every.type}}</td>
            <td>
              {{formatNumberRgx(every.sysCheckMoney) + ' ' + journeyInfo.settle_currency}}
            </td>
            <td>
              {{formatNumberRgx(every.checkMoney) + ' ' + journeyInfo.settle_currency}}
            </td>
            <td>{{every.time}}</td>
            <td>
              <el-tooltip class="item" effect="light" content="查看详情" placement="top-end">
                <img src="../../assets/imgs/details.png" style="cursor:pointer;" @click="recordDetails(every)" />
              </el-tooltip>
              <el-dialog title="记录详情" :visible.sync="dialogRecordDetailsVisible" center>
                <div>
                  <p style="text-align: center;">
                    <span
                      style="font-size: 17px;color: #0c8563;">{{formatNumberRgx(recordDetailsMsg.estimateMoney) + ' ' + recordDetailsMsg.currency}}</span>
                  </p>
                  <p>
                    <span>日期： <span>{{recordDetailsMsg.time}}</span></span>
                  </p>
                  <div>
                    <span>账单图片：</span>
                    <div style="display:flex;position:relative;" id="delImg">
                      <div v-for="(imgurl,index) of imgurls" :key="index" style="margin-left:10px;position:relative;">
                        <img v-show="imgurl !== ''" :src="img + imgurl" width="100px" height="100px"
                          style="border-radius:5px;object-fit:cover;" />
                      </div>
                    </div>
                  </div>
                  <p>
                    <span>备注： <span>{{recordDetailsMsg.remark}}</span></span>
                  </p>
                  <div style="margin-top: 20px;border-top: 1px solid #ddd;">
                    <p>财务核算：</p>
                    <div style="padding-left: 15px;display: flex;justify-content: space-between;">
                      <p>汇率：<span>{{recordDetailsMsg.rate}}</span></p>
                      <img src="../../assets/imgs/calc.png" style="height: 35px;cursor: pointer;" @click="jumpRate" />
                    </div>
                    <p style="margin-top: 0;padding-left: 15px;">
                      汇率日期：<span>{{recordDetailsMsg.rateTime}}</span>
                    </p>
                    <p style="padding-left: 15px;">
                      预估报销金额：<span>{{formatNumberRgx(recordDetailsMsg.sysCheckMoney) + ' ' + journeyInfo.settle_currency}}</span>
                    </p>
                    <p style="padding-left: 15px;">
                      核算报销金额：<span>{{formatNumberRgx(recordDetailsMsg.checkMoney) + ' ' + journeyInfo.settle_currency}}</span>
                    </p>
                  </div>
                </div>
                <div slot="footer">
                  <el-button @click="dialogRecordDetailsVisible = false">取 消</el-button>
                  <el-button type="primary" @click="dialogRecordDetailsVisible = false">确 认</el-button>
                </div>
              </el-dialog>
            </td>
          </tr>
        </table>
      </div>
      <div class="details-top">
        <p>财务核算：</p>
        <p style="margin-left: 20px;">
          预估报销金额：<span>{{formatNumberRgx(journeyInfo.sysCheckMoney) + ' ' + journeyInfo.settle_currency}}</span>
        </p>
        <p style="margin-left: 20px;">
          核算报销金额：<span>{{formatNumberRgx(journeyInfo.checkMoney) + ' ' + journeyInfo.settle_currency}}</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        msg: '数据加载中...',
        page: 1,
        pageNum: 10,
        startTime: '',
        endTime: '',
        total: 0,
        feeList: [],
        moneyTotal: 0,
        detailsSelect: {
          id: 1,
          num: 0
        },

        img: this.$store.state.baseUrl,
        img1: require('../../assets/imgs/reim.png'),
        img2: require('../../assets/imgs/notReim.png'),
        toConfirmedDetails: {},
        dialogUnReimbursementVisible: false,
        journeyInfo: {},
        recordDetailsMsg: {},
        dialogRecordDetailsVisible: false,
        imgurls: [],
        unJourneyInfo: {},
        dialogUnReimbursementVisible: false,

      }
    },
    props: ["tipSel"],
    created() {
      this.getFeeList();
    },
    methods: {
      // 获取小费列表
      getFeeList() {
        this.msg = '数据加载中...';
        this.$axios.post(this.$store.state.baseUrl + '/FeeList?java', {
          page: this.page,
          pageNum: this.pageNum,
          startTime: this.startTime,
          endTime: this.endTime
        }).then((res) => {
          console.log('小费列表');
          console.log(res);
          this.total = res.data.total;
          this.feeList = res.data.lists;
          this.moneyTotal = res.data.money.toFixed(2);
          if (this.feeList.length == 0) {
            this.msg = '啊哦~暂无数据';
          };
        }).catch(err => {
          console.log(err);
        })
      },
      // 筛选列表
      filtrateMsgSure() {
        this.page = 1;
        this.getFeeList();
      },
      // 查看详情
      checkDetails(id, bxNumber) {
        if (id !== null && id !== "") {
          console.log(id);
          sessionStorage.setItem("buy_id", id);
          this.tipSel.select = 1;
          this.detailsSelect.num = 3;
        } else if (bxNumber !== null && bxNumber !== "") {
          this.$axios.post(this.$store.state.baseUrl + '/ClaimFormInfo?java', {
            bxNumber: bxNumber
          }).then(res => {
            console.log('报销单详情');
            console.log(res);
            this.toConfirmedDetails = res.data;
            this.tipSel.select = 2;
          }).catch(err => {
            console.log(err);
          })
        }
        (function smoothscroll() {
          var currentScroll =
            document.documentElement.scrollTop || document.body.scrollTop;
          if (currentScroll > 0) {
            window.requestAnimationFrame(smoothscroll);
            window.scrollTo(0, currentScroll - currentScroll / 5);
          }
        })();
      },
      // 获取行程/非行程详细信息
      lookOver(type, id) {
        console.log(type);
        console.log(id);
        if (type == 0) {
          this.$axios.post(this.$store.state.baseUrl + '/TripInfo?java', {
            id: id
          }).then((res) => {
            console.log('行程信息');
            console.log(res);
            this.journeyInfo = res.data;
            this.tipSel.select = 3;
          }).catch((err) => {
            console.log(err);
          });
        } else if (type == 1) {
          this.$axios.post(this.$store.state.baseUrl + '/RecordInfo?java', {
            id: id
          }).then((res) => {
            console.log('非行程信息');
            console.log(res);
            this.unJourneyInfo = res.data;
            console.log(this.unJourneyInfo);
            this.imgurls = [];
            if (this.unJourneyInfo.billPics !== null && this.unJourneyInfo.billPics !== '') {
              if (this.unJourneyInfo.billPics.indexOf('|') !== -1) {
                this.imgurls = this.unJourneyInfo.billPics.split('|');
              } else {
                this.imgurls.push(this.unJourneyInfo.billPics);
              }
            } else {
              this.imgurls = [];
            };
            this.dialogUnReimbursementVisible = true;
          }).catch((err) => {
            console.log(err);
          });
        }
      },
      // 查看行程信息记录详情
      recordDetails(every) {
        this.recordDetailsMsg = every;
        console.log(this.recordDetailsMsg);
        this.imgurls = [];
        if (this.recordDetailsMsg.billPics !== null && this.recordDetailsMsg.billPics !== '') {
          if (this.recordDetailsMsg.billPics.indexOf('|') !== -1) {
            this.imgurls = this.recordDetailsMsg.billPics.split('|');
          } else {
            this.imgurls.push(this.recordDetailsMsg.billPics);
          }
        } else {
          this.imgurls = [];
        };
        this.dialogRecordDetailsVisible = true;
      },
      // 跳转汇率查询页面
      jumpRate() {
        console.log('跳转');
        this.$emit('rateCalcJump', 11);
      },
      gobackReimDetails() {
        this.tipSel.select = 2;
      },
      // 分页
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.page = val;
        console.log(this.page);
        this.getFeeList();
        (function smoothscroll() {
          var currentScroll =
            document.documentElement.scrollTop || document.body.scrollTop;
          if (currentScroll > 0) {
            window.requestAnimationFrame(smoothscroll);
            window.scrollTo(0, currentScroll - currentScroll / 5);
          }
        })();
      },
      goback(val) {
        console.log(val);
        this.tipSel.select = 0;
        this.getFeeList();
      },
    },
  }
</script>
<style lang="scss" scoped>
  .tip-admin-container {
    width: 91%;
    margin: 0 auto;
    padding: 30px;
    background-color: #fff;
    border-radius: 30px;

    .tip-admin-top {
      display: flex;
      // justify-content: space-between;
    }

    .details-top {
      width: 96%;
      margin: 0 auto;
    }

    .details-main {
      width: 96%;
      margin: 0 auto;
      border-top: 1px solid #ddd;
      padding-top: 20px;
    }

    table {
      width: 100%;
      table-layout: fixed;
      border-collapse: separate;
      border-spacing: 0;

      td {
        height: 60px;
        margin: 10px 0;
        padding: 20px 0;
        background-color: #f3fbf9;
        font-size: 15px;
        text-align: center;
      }

      th,
      td {
        width: 16%;
        text-align: center;
        border: 0;
      }
    }

    .back-img {
      width: 75px;
      height: 45px;
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

    .claimInfo {
      margin-top: 25px;
    }
  }
</style>