<template>
  <div>
    <!-- 我的报销-待审核页面 -->
    <div v-if="checkPendingSel.select == 0">
      <div v-if="checkPendingList.length == 0" ref="reimburse" style="text-align: center;">
        <p>{{dataMsg}}</p>
      </div>
      <div v-if="checkPendingList.length !== 0">
        <table>
          <tr>
            <th>报销单号</th>
            <th>预估报销金额</th>
            <th>提交时间</th>
            <th>操作</th>
          </tr>
          <tr v-for="(item,index) in checkPendingList" :key="index">
            <td>{{item.bxNumber}}</td>
            <td>{{formatNumberRgx(item.sysCheckMoney)+ ' ' + item.settle_currency}}</td>
            <td>{{item.subTime}}</td>
            <td>
              <el-tooltip class="item" effect="light" content="查看详情" placement="top-end">
                <img src="../../assets/imgs/details.png" style="cursor:pointer;"
                  @click="checkPendingDetails(item.bxNumber)" />
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
    </div>
    <div v-if="checkPendingSel.select == 1">
      <div class="back-img" @click="gobackList">
        <div>
          <img src="../../assets/imgs/goback.png" />
        </div>
        <span class="font">返回</span>
      </div>
      <el-form label-width="130px" class="check-pending-details-list">
        <el-form-item label="报销单号：">
          <span>{{checkPendingDetailsMsg.bxNumber}}</span>
        </el-form-item>
        <el-form-item label="提交时间：">
          <span>{{checkPendingDetailsMsg.subTime}}</span>
        </el-form-item>
        <el-form-item label="预估报销金额：">
          <span>{{formatNumberRgx(checkPendingDetailsMsg.sysCheckMoney) + ' ' + checkPendingDetailsMsg.settle_currency}}</span>
        </el-form-item>
      </el-form>
      <div style="width: 95%;margin: 0 auto;">
        <p>消费记录：</p>
        <table v-for="(reim,index) in checkPendingDetailsMsg.data" :key="index">
          <tr>
            <th></th>
            <th>{{reim.type == 0 ? '行程名称' : '类型'}}</th>
            <th>{{reim.type == 0 ? '行程描述' : '描述'}}</th>
            <th>{{reim.type == 0 ? '起止时间' : '时间'}}</th>
            <th v-if="reim.type == 1">金额</th>
            <th>操作</th>
          </tr>
          <tr>
            <td>
              <img :src="reim.type == 0 ? img2 : img1" style="width: 25px;height: 25px;" />
            </td>
            <td>{{reim.type == 0 ? reim.obj.name : (reim.type == 1 ? reim.obj.type : '')}}</td>
            <td>{{reim.type == 0 ? reim.obj.des : (reim.type == 1 ? reim.obj.remark : '')}}</td>
            <td>
              <p v-if="reim.type == 0" style="margin: 0;">{{reim.obj.startTime}}</p>
              <p v-if="reim.type == 0" style="margin: 0;">至</p>
              <p v-if="reim.type == 0" style="margin: 0;">{{reim.obj.endTime}}</p>
              <p v-show="reim.type == 1">{{reim.obj.time}}</p>
            </td>
            <td v-show="reim.type == 1">{{formatNumberRgx(reim.obj.estimateMoney) + ' ' + reim.obj.currency}}</td>
            <td>
              <el-tooltip class="item" effect="light" content="查看详情" placement="top-end">
                <img src="../../assets/imgs/details.png" style="cursor:pointer;"
                  @click="updateReimburse(reim.type,reim.obj.id)" />
              </el-tooltip>
              <el-dialog title="非行程消费信息" :visible.sync="dialogUpdateReimburseVisible" center
                :close-on-press-escape="false" :close-on-click-modal="false">
                <div>
                  <div style="text-align: center;">
                    <p style="font-size: 17px;color: #0c8563;">{{formatNumberRgx(notEstimateMoney) + ' ' + notCurrency}}
                    </p>
                  </div>
                  <el-form label-width="120px">
                    <el-form-item label="日期：">
                      <span>{{notTime}}</span>
                    </el-form-item>
                    <el-form-item label="账单图片：">
                      <div style="display:flex;">
                        <div class="upload-imgs">
                          <div style="display:flex;position:relative;" id="delImg">
                            <div v-for="(imgurl,index) of imgurls" :key="index"
                              style="margin-left:10px;position:relative;">
                              <a v-show="imgurl !== ''" :href="isPdf(imgurl) === 0 ? 'javascript:;' :img + imgurl"
                                :target="isPdf(imgurl) === 0 ? '': '_blank'">
                                <img v-if="isPdf(imgurl) === 0 " v-image-preview :src="img + imgurl" width="100px"
                                  height="100px" style="border-radius:5px;object-fit:cover;" />
                                <img v-else :src="pdfImg" width="100px" height="100px"
                                  style="border-radius:5px;object-fit:cover;" />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </el-form-item>
                    <el-form-item label="备注：">
                      <span>{{notRemark}}</span>
                    </el-form-item>
                  </el-form>
                </div>
                <div slot="footer">
                  <el-button @click="dialogUpdateReimburseVisible = false">取 消</el-button>
                  <el-button type="primary" @click="dialogUpdateReimburseVisible = false">确 定</el-button>
                </div>
              </el-dialog>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div v-if="checkPendingSel.select == 2">
      <div class="back-img" @click="gobackDetails">
        <div>
          <img src="../../assets/imgs/goback.png" />
        </div>
        <span class="font">返回</span>
      </div>
      <div style="width: 95%;margin: 0 auto;margin-top: 20px;">
        <div style="margin-bottom: 15px;">
          <span>行程名称：</span>
          <span>{{name}}</span>
        </div>
        <div style="margin-bottom: 15px;">
          <span>预计起止时间：</span>
          <span>{{startTime2[0] +' ~ '+startTime2[1]}}</span>
        </div>
        <div style="margin-bottom: 15px;padding-bottom: 15px;border-bottom: 1px solid #ddd;">
          <span>行程描述：</span>
          <span>{{des}}</span>
        </div>

        <div>
          <div style="margin-top: 15px;">
            <span>预估报销金额：</span>
            <span>{{formatNumberRgx(sum) + ' ' + settle_currency}}</span>
          </div>
          <p style="margin: 0;font-size: 14px;color: #bbb;">实际报销费用以财务核算为准</p>
          <div v-if="records.length !== 0">
            <table>
              <tr>
                <th>类型</th>
                <th>金额</th>
                <th>时间</th>
                <th>操作</th>
              </tr>
              <tr v-for="(record,index) in records" :key="index">
                <td>{{record.type}}</td>
                <td>{{formatNumberRgx(record.estimateMoney) + ' ' + record.currency}}</td>
                <td>{{record.time}}</td>
                <td>
                  <el-tooltip class="item" effect="light" content="查看详情" placement="top-end">
                    <img src="../../assets/imgs/details.png" style="cursor:pointer;"
                      @click="updateRecord(record,index)" />
                  </el-tooltip>
                  <el-dialog title="记录详情" :visible.sync="dialogUpdateRecordVisible" center
                    :close-on-press-escape="false" :close-on-click-modal="false">
                    <div>
                      <div style="text-align: center;">
                        <p style="font-size: 17px;color: #0c8563;">{{formatNumberRgx(estimateMoney) + ' ' +currency}}
                        </p>
                      </div>
                      <el-form label-width="120px">
                        <el-form-item label="日期：">
                          <span>{{time}}</span>
                        </el-form-item>
                        <el-form-item label="账单图片：">
                          <div style="display:flex;">
                            <div class="upload-imgs">
                              <div style="display:flex;position:relative;" id="delImg">
                                <div v-for="(imgurl,index) of imgurls" :key="index"
                                  style="margin-left:10px;position:relative;">
                                  <a v-show="imgurl !== ''" :href="isPdf(imgurl) === 0 ? 'javascript:;' :img + imgurl"
                                    :target="isPdf(imgurl) === 0 ? '': '_blank'">
                                    <img v-if="isPdf(imgurl) === 0 " v-image-preview :src="img + imgurl" width="100px"
                                      height="100px" style="border-radius:5px;object-fit:cover;" />
                                    <img v-else :src="pdfImg" width="100px" height="100px"
                                      style="border-radius:5px;object-fit:cover;" />
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </el-form-item>
                        <el-form-item label="备注：">
                          <span>{{remark}}</span>
                        </el-form-item>
                      </el-form>
                    </div>
                    <div slot="footer">
                      <el-button @click="dialogUpdateRecordVisible = false">取 消</el-button>
                      <el-button type="primary" @click="dialogUpdateRecordVisible = false">确 定</el-button>
                    </div>
                  </el-dialog>
                </td>
              </tr>
            </table>
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
        pdfImg: require('../../assets/imgs/pdf.png'),
        dataMsg: '数据加载中...',
        img: this.$store.state.baseUrl,
        page: 1,
        pageNum: 10,
        total: 0,
        checkPendingList: [],
        checkPendingDetailsMsg: {},
        img1: require('../../assets/imgs/reim.png'),
        img2: require('../../assets/imgs/notReim.png'),
        dialogUpdateReimburseVisible: false,
        updateType: 0,
        updateId: 0,

        radioType: '',
        name: '', // 行程名称
        startTime2: [], // 行程开始时间
        des: '', // 行程描述
        type: '', // 记录详情类型
        records: [], // 记录列表

        time: '', // 记录日期
        estimateMoney: '', // 用户申报金额
        currencyList: [],
        currency: '', // 用户选择的币种
        imgurls: [],
        remark: '', // 账单备注
        sum: 0,

        dialogNotJourneyVisible: false,
        notType: '', // 非行程消费类型
        notTime: '', // 非行程消费日期
        notEstimateMoney: '', // 金额
        notCurrency: '', // 币种
        notRemark: '', // 备注
        dialogUpdateRecordVisible: false,

        settle_currency: '',
      }
    },
    props: ['checkPendingSel'],
    created() {
      this.handleReimburseList();
    },
    methods: {
      isPdf(img) {
        // console.log(img);
        if (img !== '' && img !== null) {
          if (img.indexOf('pdf') === -1) {
            return 0;
          } else {
            return 1;
          }
        }
      },
      // 获取待审核列表
      handleReimburseList() {
        this.checkPendingList = [];
        this.total = 0;
        this.dataMsg = '数据加载中...';
        this.$axios.post(this.$store.state.baseUrl + '/UserClaimFormList?java', {
          flag: 0,
          page: this.page,
          pageNum: this.pageNum
        }).then((res) => {
          console.log('获取待审核列表');
          console.log(res);
          this.checkPendingList = res.data.lists;
          this.total = res.data.total;
          if (this.checkPendingList.length == 0) {
            this.dataMsg = '啊哦~ 暂无数据';
          }
        }).catch((err) => {
          console.log(err);
        })
      },
      // 获取详细信息
      checkPendingDetails(bxNumber) {
        this.$axios.post(this.$store.state.baseUrl + '/ClaimFormInfo?java', {
          bxNumber: bxNumber
        }).then((res) => {
          console.log('待审核报销单详细信息');
          console.log(res);
          this.checkPendingDetailsMsg = res.data;
          this.checkPendingSel.select = 1;
        }).catch((err) => {
          console.log(err);
        });
        (function smoothscroll() {
          var currentScroll =
            document.documentElement.scrollTop || document.body.scrollTop;
          if (currentScroll > 0) {
            window.requestAnimationFrame(smoothscroll);
            window.scrollTo(0, currentScroll - currentScroll / 5);
          }
        })();
      },
      gobackList() {
        this.checkPendingSel.select = 0;
      },
      gobackDetails() {
        this.checkPendingSel.select = 1;
      },
      // 查看我的消费单
      updateReimburse(type, id) {
        console.log('修改');
        this.updateType = type;
        this.updateId = id;
        console.log(this.updateType, this.updateId);
        this.notType = '';
        this.notTime = '';
        this.notEstimateMoney = '';
        this.notCurrency = '';
        this.notRemark = '';

        this.imgurls = [];

        this.name = '';
        this.startTime2 = [];
        this.des = '';
        this.type = '';
        this.records = [];
        this.sum = 0;
        this.currency = '';
        if (this.updateType == 0) {
          this.checkPendingSel.select = 2;
          this.$axios.post(this.$store.state.baseUrl + '/TripInfo?java', {
            id: this.updateId
          }).then((res) => {
            console.log('行程详细信息');
            console.log(res);
            this.name = res.data.name;
            this.startTime2.push(res.data.startTime);
            this.startTime2.push(res.data.endTime);
            this.des = res.data.des;
            this.sum = res.data.sysCheckMoney;
            this.settle_currency = res.data.settle_currency;
            this.records = res.data.recordList;
            // for (let item of this.records) {
            //   console.log(item.sysCheckMoney);
            //   this.sum += Number(item.sysCheckMoney);
            //   console.log(this.sum);
            //   this.currency = item.currency;
            // }
          })
        } else if (this.updateType == 1) {
          this.dialogUpdateReimburseVisible = true;
          this.$axios.post(this.$store.state.baseUrl + '/RecordInfo?java', {
            id: this.updateId
          }).then((res) => {
            console.log('非行程消费记录详细信息');
            console.log(res);
            this.notType = res.data.type;
            this.notTime = res.data.time;
            this.notEstimateMoney = res.data.estimateMoney;
            this.notCurrency = res.data.currency;
            if (res.data.billPics !== '') {
              if (res.data.billPics.indexOf('|') !== -1) {
                this.imgurls = res.data.billPics.split('|');
              } else {
                this.imgurls.push(res.data.billPics);
              }
            } else {
              this.imgurls = [];
            }

            this.notRemark = res.data.remark;
          })
        };
        (function smoothscroll() {
          var currentScroll =
            document.documentElement.scrollTop || document.body.scrollTop;
          if (currentScroll > 0) {
            window.requestAnimationFrame(smoothscroll);
            window.scrollTo(0, currentScroll - currentScroll / 5);
          }
        })();
      },
      // 查看记录
      updateRecord(record, index) {
        this.dialogUpdateRecordVisible = true;
        console.log(record);
        this.updateIndex = index;
        this.radioType = '';
        this.time = '';
        this.estimateMoney = '';
        this.currency = '';
        this.imgurls = [];
        this.remark = '';
        console.log(record);
        this.radioType = record.type;
        this.time = record.time;
        this.estimateMoney = record.estimateMoney;
        this.currency = record.currency;
        if (record.billPics !== '') {
          if (record.billPics.indexOf('|') !== -1) {
            this.imgurls = record.billPics.split('|');
          } else {
            this.imgurls.push(record.billPics);
          }
        } else {
          this.imgurls = [];
        };
        this.remark = record.remark;
      },
      // 分页
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.page = val;
        this.handleReimburseList();
        (function smoothscroll() {
          var currentScroll =
            document.documentElement.scrollTop || document.body.scrollTop;
          if (currentScroll > 0) {
            window.requestAnimationFrame(smoothscroll);
            window.scrollTo(0, currentScroll - currentScroll / 5);
          }
        })();
      },
      formatNumberRgx(num) {
        // console.log(num);
        if (num !== undefined) {
          let parts = num.toString().split(".");
          parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          return parts.join(".");
        }
      }

    },
  }
</script>
<style lang="scss" scoped>
  .back-img {
    width: 75px;
    height: 45px;
    margin-left: 30px;
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

  .check-pending-details-list {
    width: 95%;
    margin: 0 auto;
    margin-top: 30px;
    border-bottom: 1px solid #ddd;
  }

  td {
    height: 60px;
    margin: 10px 0;
    padding: 20px 0;
    background-color: #f3fbf9;
    font-size: 15px;
    text-align: center;
  }

  .input-style {
    width: 70% !important;
  }

  table {
    width: 100%;
    margin-bottom: 20px;
    table-layout: fixed;
    border-collapse: separate;
    border-spacing: 0;

    tr {

      th,
      td {
        width: 25%;
        text-align: center;
        border: 0;
      }
    }
  }
</style>