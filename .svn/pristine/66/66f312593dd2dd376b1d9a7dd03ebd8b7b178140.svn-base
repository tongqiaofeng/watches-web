<template>
  <div id="un-reim-style">
    <!-- 我的报销-未报销页面 -->
    <div v-if="unReimbursementSel.select == 0">
      <div v-if="unReimbursementList.length == 0" ref="unReim" style="text-align: center;">
        <p>{{hintMsg}}</p>
      </div>
      <div v-if="unReimbursementList.length !== 0">
        <table v-for="(reim,index) in unReimbursementList" :key="index">
          <tr>
            <th>
              <input class="selBtn" type="checkbox" v-model="hobby" :value="reim" @change="checkedChange($event,reim)">
            </th>
            <th>{{reim.type == 0 ? '行程名称' : '类型'}}</th>
            <th>{{reim.type == 0 ? '行程描述' : '描述'}}</th>
            <th>{{reim.type == 0 ? '起止时间' : '时间'}}</th>
            <th v-show="reim.type == 1">金额</th>
            <th>操作</th>
          </tr>
          <tr>
            <td>
              <img :src="reim.type | imgFilter(reim.data.type)" style="width: 40px;height: 40px;" />
            </td>
            <td>{{reim.type == 0 ? reim.data.name : (reim.type == 1 ? reim.data.type : '')}}</td>
            <td>{{reim.type == 0 ? reim.data.des : (reim.type == 1 ? reim.data.remark : '')}}</td>
            <td>
              <p v-if="reim.type == 0" style="margin: 0;">{{reim.data.startTime}}</p>
              <p v-if="reim.type == 0" style="margin: 0;">至</p>
              <p v-if="reim.type == 0" style="margin: 0;">{{reim.data.endTime}}</p>
              <p v-if="reim.type == 1">{{reim.data.time}}</p>
            </td>
            <td v-if="reim.type == 1">
              {{price(reim.data.estimateMoney) + ' ' + reim.data.currency}}
            </td>
            <td>
              <el-tooltip class="item" effect="light" content="查看详情" placement="top-end">
                <img src="../../assets/imgs/details.png" style="cursor:pointer;"
                  @click="updateReimburse(reim.type,reim.data.id)" />
              </el-tooltip>
              <el-dialog title="修改非行程消费" :visible.sync="dialogUpdateReimburseVisible" center
                :close-on-press-escape="false" :close-on-click-modal="false">
                <div>
                  <div class="not-type">
                    <p style="height: 20px;margin: 0;line-height: 20px;font-size: 17px;text-align: center;">类型</p>
                    <div>
                      <el-radio-group v-model="notType" style="display: flex;justify-content: space-around;">
                        <div>
                          <el-radio-button label="交通" style="display: block;margin-top: 10px;">
                            <div class="radio-button-style">
                              <div>
                                <img src="../../assets/imgs/type-05.png" />
                              </div>
                              <span style="font-size: 15px;">交通</span>
                            </div>
                          </el-radio-button>
                          <el-radio-button label="工资支出" style="display: block;margin-top: 10px;">
                            <div class="radio-button-style">
                              <div>
                                <img src="../../assets/imgs/type-02.png" />
                              </div>
                              <span style="font-size: 15px;">工资支出</span>
                            </div>
                          </el-radio-button>
                          <el-radio-button label="接待购物" style="display: block;margin-top: 10px;">
                            <div class="radio-button-style">
                              <div>
                                <img src="../../assets/imgs/type-06.png" />
                              </div>
                              <span style="font-size: 15px;">接待购物</span>
                            </div>
                          </el-radio-button>
                        </div>
                        <div>
                          <el-radio-button label="住宿" style="display: block;margin-top: 10px;">
                            <div class="radio-button-style">
                              <div>
                                <img src="../../assets/imgs/type-11.png" />
                              </div>
                              <span style="font-size: 15px;">住宿</span>
                            </div>
                          </el-radio-button>
                          <el-radio-button label="公司运营" style="display: block;margin-top: 10px;">
                            <div class="radio-button-style">
                              <div>
                                <img src="../../assets/imgs/type-03.png" />
                              </div>
                              <span style="font-size: 15px;">公司运营</span>
                            </div>
                          </el-radio-button>
                          <el-radio-button label="其他" style="display: block;margin-top: 10px;">
                            <div class="radio-button-style">
                              <div>
                                <img src="../../assets/imgs/type-08.png" />
                              </div>
                              <span style="font-size: 15px;">其他</span>
                            </div>
                          </el-radio-button>
                        </div>
                        <div>
                          <el-radio-button label="餐饮" style="display: block;margin-top: 10px;">
                            <div class="radio-button-style">
                              <div>
                                <img src="../../assets/imgs/type-01.png" />
                              </div>
                              <span style="font-size: 15px;">餐饮</span>
                            </div>
                          </el-radio-button>
                          <el-radio-button label="经费拨款" style="display: block;margin-top: 10px;">
                            <div class="radio-button-style">
                              <div>
                                <img src="../../assets/imgs/type-07.png" />
                              </div>
                              <span style="font-size: 15px;">经费拨款</span>
                            </div>
                          </el-radio-button>
                        </div>
                      </el-radio-group>
                    </div>
                  </div>
                  <el-form label-width="120px">
                    <el-form-item label="日期：" required>
                      <el-date-picker v-model="notTime" type="date" value-format="yyyy-MM-dd" class="input-style">
                      </el-date-picker>
                    </el-form-item>
                    <el-form-item label="金额：" required>
                      <el-input v-model="notEstimateMoney" type="text" class="input-style"></el-input>
                      <el-select v-model="notCurrency" placeholder="请选择">
                        <el-option v-for="(item,index) in currencyList" :key="index" :label="item" :value="item">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="账单图片：">
                      <div style="display:flex;">
                        <div class="upload-imgs">
                          <div class="add">
                            <form enctype="multipart/form-data">
                              <!--name="img" accept="image/*"  -->
                              <input @change="inputChange($event)" type="file" class="inputUpload" multiple />
                              <i class="el-icon-plus addIcon"></i>
                            </form>
                          </div>
                          <div style="display:flex;position:relative;" id="delImg">
                            <div v-for="(imgurl,index) of imgurls" :key="index"
                              style="margin-left:10px;position:relative;">
                              <span v-show="imgurl !== ''" class="spanStyle" @click="delImage(index)">x</span>
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
                    <el-form-item label="备注：" required>
                      <el-input type="textarea" v-model="notRemark"></el-input>
                    </el-form-item>
                  </el-form>
                </div>
                <div slot="footer">
                  <el-button @click="dialogUpdateReimburseVisible = false">取 消</el-button>
                  <el-button type="primary" @click="updateReimburseSure" v-preventClick>确 定</el-button>
                </div>
              </el-dialog>
            </td>
          </tr>
        </table>
        <div class="reimBtn">
          <el-button type="primary" style="width: 100%;" @click="createReimbursement" v-preventClick>生成报销单</el-button>
        </div>
        <div style="width: 100%;height: 50px;margin-top: 30px;">
          <el-pagination @current-change="handleCurrentChange" :current-page="page"
            layout="total, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
    <div v-if="unReimbursementSel.select == 1">
      <div class="back-img" @click="gobackList">
        <div>
          <img src="../../assets/imgs/goback.png" />
        </div>
        <span class="font">返回</span>
      </div>
      <div class="add-container">
        <el-form label-width="140px">
          <el-form-item label="行程名称：" required>
            <el-input v-model="name" class="input-style"></el-input>
          </el-form-item>
          <el-form-item label="预计起止时间：" required>
            <el-date-picker v-model="startTime2" type="daterange" range-separator="至" start-placeholder="开始日期"
              end-placeholder="结束日期" value-format="yyyy-MM-dd" class="input-style">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="行程描述：" required>
            <el-input v-model="des" type="textarea" class="input-style"></el-input>
          </el-form-item>
        </el-form>
        <div>
          <div style="margin-top: 15px;">
            <span>预估总费用：</span>
            <span>{{formatNumberRgx(sum) + ' ' + currency}}</span>
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
                  <el-tooltip class="item" effect="light" content="修改信息" placement="top-end">
                    <img src="../../assets/imgs/update.png" style="cursor:pointer;"
                      @click="updateRecord(record,index)" />
                  </el-tooltip>
                  <el-dialog title="修改记录" :visible.sync="dialogUpdateRecordVisible" center
                    :close-on-press-escape="false" :close-on-click-modal="false">
                    <div>
                      <div class="not-type">
                        <p style="height: 20px;margin: 0;line-height: 20px;font-size: 17px;text-align: center;">类型</p>
                        <div>
                          <el-radio-group v-model="updateType" style="display: flex;justify-content: space-around;">
                            <div>
                              <el-radio-button label="交通" style="display: block;margin-top: 10px;">
                                <div class="radio-button-style">
                                  <div>
                                    <img src="../../assets/imgs/type-05.png" />
                                  </div>
                                  <span style="font-size: 15px;">交通</span>
                                </div>
                              </el-radio-button>
                              <el-radio-button label="人工" style="display: block;margin-top: 10px;">
                                <div class="radio-button-style">
                                  <div>
                                    <img src="../../assets/imgs/type-09.png" />
                                  </div>
                                  <span style="font-size: 15px;">人工</span>
                                </div>
                              </el-radio-button>
                            </div>
                            <div>
                              <el-radio-button label="住宿" style="display: block;margin-top: 10px;">
                                <div class="radio-button-style">
                                  <div>
                                    <img src="../../assets/imgs/type-11.png" />
                                  </div>
                                  <span style="font-size: 15px;">住宿</span>
                                </div>
                              </el-radio-button>
                              <el-radio-button label="小费" style="display: block;margin-top: 10px;">
                                <div class="radio-button-style">
                                  <div>
                                    <img src="../../assets/imgs/type-10.png" />
                                  </div>
                                  <span style="font-size: 15px;">小费</span>
                                </div>
                              </el-radio-button>
                            </div>
                            <div>
                              <el-radio-button label="餐饮" style="display: block;margin-top: 10px;">
                                <div class="radio-button-style">
                                  <div>
                                    <img src="../../assets/imgs/type-01.png" />
                                  </div>
                                  <span style="font-size: 15px;">餐饮</span>
                                </div>
                              </el-radio-button>
                              <el-radio-button label="其他" style="display: block;margin-top: 10px;">
                                <div class="radio-button-style">
                                  <div>
                                    <img src="../../assets/imgs/type-08.png" />
                                  </div>
                                  <span style="font-size: 15px;">其他</span>
                                </div>
                              </el-radio-button>
                            </div>
                          </el-radio-group>
                        </div>
                      </div>
                      <el-form label-width="120px">
                        <el-form-item label="日期：" required>
                          <el-date-picker v-model="time" type="date" value-format="yyyy-MM-dd" class="input-style"
                            placeholder="请选择日期">
                          </el-date-picker>
                        </el-form-item>
                        <el-form-item label="金额：" required>
                          <el-input v-model="estimateMoney" type="text" class="input-style"></el-input>
                          <el-select v-model="currency" placeholder="请选择">
                            <el-option v-for="(item,index) in currencyList" :key="index" :label="item" :value="item">
                            </el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item label="账单图片：">
                          <div style="display:flex;">
                            <div class="upload-imgs">
                              <div class="add">
                                <form enctype="multipart/form-data">
                                  <!-- name="img" accept="image/*" -->
                                  <input @change="inputChange($event)" type="file" class="inputUpload" multiple />
                                  <i class="el-icon-plus addIcon"></i>
                                </form>
                              </div>
                              <div style="display:flex;position:relative;" id="delImg">
                                <div v-for="(imgurl,index) of imgurls" :key="index"
                                  style="margin-left:10px;position:relative;">
                                  <span v-show="imgurl !== ''" class="spanStyle" @click="delImage(index)">x</span>
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
                        <el-form-item label="备注：" required>
                          <el-input type="textarea" v-model="remark"></el-input>
                        </el-form-item>
                      </el-form>
                    </div>
                    <div slot="footer">
                      <el-button @click="dialogUpdateRecordVisible = false">取 消</el-button>
                      <el-button type="primary" @click="updateRecordSure" v-preventClick>保 存</el-button>
                    </div>
                  </el-dialog>
                </td>
              </tr>
            </table>
          </div>
        </div>
        <div>
          <el-button type="primary" @click="updateJourneySure" v-preventClick
            style="width: 15%;margin-top: 40px;margin-right: 2%;position: fixed;bottom: 35px;right: 10%;">保 存
          </el-button>
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
        hintMsg: '数据加载中...',
        img: this.$store.state.baseUrl,
        page: 1,
        pageNum: 10,
        total: 0,
        unReimbursementList: [],
        hobby: [],
        tripIds: [],
        unTripIds: [],

        updateType: 0,
        updateId: 0,

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
        dialogUpdateRecordVisible: false,
        updateIndex: 0,

        dialogNotJourneyVisible: false,
        notType: '', // 非行程消费类型
        notTime: '', // 非行程消费日期
        notEstimateMoney: '', // 金额
        notCurrency: '', // 币种
        notRemark: '', // 备注
        dialogUpdateReimburseVisible: false,
        dialogDeleteReimVisible: false,
        recordId: '',

      }
    },
    props: ['unReimbursementSel'],
    filters: {
      imgFilter(type, name) {
        console.log(type, name);
        if (type === 0) {
          return require('../../assets/imgs/type-04.png')
        } else if (type === 1) {
          switch (name) {
            case '交通':
              return require('../../assets/imgs/type-05.png');
            case '住宿':
              return require('../../assets/imgs/type-11.png');
            case '餐饮':
              return require('../../assets/imgs/type-01.png');
            case '工资支出':
              return require('../../assets/imgs/type-02.png');
            case '公司运营':
              return require('../../assets/imgs/type-03.png');
            case '经费拨款':
              return require('../../assets/imgs/type-07.png');
            case '接待购物':
              return require('../../assets/imgs/type-06.png');
            case '其他':
              return require('../../assets/imgs/type-08.png');
          }
        }
      }
    },
    created() {
      this.handleUnReimbursementList();
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
      // 获取未报销消费列表
      handleUnReimbursementList() {
        this.hintMsg = '数据加载中...';
        this.$axios.post(this.$store.state.baseUrl + '/UnReimburseList?java', {
          page: this.page,
          pageNum: this.pageNum
        }).then((res) => {
          console.log('可报销列表');
          console.log(res);
          this.unReimbursementList = res.data.lists;
          this.total = res.data.total;
          if (this.unReimbursementList.length == 0) {
            this.hintMsg = '啊哦~暂无数据';
          }
        }).catch((err) => {
          console.log(err);
        })
      },
      gobackList() {
        this.unReimbursementSel.select = 0;
        this.handleUnReimbursementList();
      },
      // 修改查看我的消费单
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
          this.$axios.post(this.$store.state.baseUrl + '/TripInfo?java', {
            id: this.updateId
          }).then((res) => {
            console.log('行程详细信息');
            console.log(res);
            this.name = res.data.name;
            if (res.data.startTime !== null && res.data.endTime !== null) {
              this.startTime2.push(res.data.startTime);
              this.startTime2.push(res.data.endTime);
            } else {
              this.startTime2 = [];
            };
            this.des = res.data.des;
            this.records = res.data.recordList;
            for (let item of this.records) {
              console.log(item.estimateMoney);
              this.sum += Number(item.estimateMoney);
              console.log(this.sum);
              this.currency = item.currency;
            };
            this.unReimbursementSel.select = 1;
          })
        } else if (this.updateType == 1) {
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
            this.dialogUpdateReimburseVisible = true;
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
      // 确定修改行程信息
      updateJourneySure() {
        console.log(this.startTime2);
        if (this.name == '' && this.startTime2 == '' && this.des == '' && this.records.length !== 0) {
          this.$axios.post(this.$store.state.baseUrl + '/TripSave?java', {
            id: this.updateId,
            name: this.name,
            startTime: this.startTime2[0],
            endTime: this.startTime2[1],
            des: this.des,
            records: this.records
          }).then((res) => {
            console.log('修改行程信息');
            console.log(res);
            this.$message.success({
              message: '修改行程消费成功',
              showClose: true,
              duration: 2000
            });
            this.unReimbursementSel.select = 0;
            this.handleUnReimbursementList();
          }).catch((err) => {
            console.log(err);
            this.$message.error({
              message: err.message,
              showClose: true,
              duration: 2000
            });
            this.unReimbursementSel.select = 0;
            this.handleUnReimbursementList();
          })
        } else {
          this.$message.error({
            message: '请添加行程记录',
            showClose: true,
            duration: 2000
          });
        }
      },
      // 修改记录
      updateRecord(record, index) {
        this.dialogUpdateRecordVisible = true;
        this.updateIndex = index;
        this.updateType = '';
        this.time = '';
        this.estimateMoney = '';
        this.currency = '';
        this.imgurls = [];
        this.remark = '';
        console.log(record);
        this.recordId = record.id;
        this.updateType = record.type;
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
      // 确定修改记录
      updateRecordSure() {
        console.log(this.type);
        if (this.time !== '' && this.estimateMoney !== '' && this.currency !== '' && this.remark !== '') {
          this.records.splice(this.updateIndex, 1, {
            id: this.recordId,
            type: this.updateType,
            time: this.time,
            estimateMoney: this.estimateMoney,
            currency: this.currency,
            billPics: this.imgurls.join("|"),
            remark: this.remark
          });
          console.log(this.records);
          this.dialogUpdateRecordVisible = false;
          this.sum = 0;
          for (let item of this.records) {
            this.sum += Number(item.estimateMoney);
          };
          this.$message.success({
            message: '修改记录成功',
            showClose: true,
            duration: 2000
          })
        } else {
          this.$message.error({
            message: '数据不能为空，请检查数据填写',
            showClose: true,
            duration: 2000
          })
        }
      },
      // 确定修改非行程信息
      updateReimburseSure() {
        if (this.notType == '' || this.notTime == '' || this.notEstimateMoney == '' || this.notCurrency == '' || this
          .notRemark == '') {
          this.$message.error({
            message: '数据不能为空，请检查数据填写',
            showClose: true,
            duration: 2000
          })
        } else {
          this.$axios.post(this.$store.state.baseUrl + '/RecordSave?java', {
            id: this.updateId,
            type: this.notType,
            time: this.notTime,
            estimateMoney: this.notEstimateMoney,
            currency: this.notCurrency,
            billPics: this.imgurls.join('|'),
            remark: this.notRemark
          }).then((res) => {
            console.log('修改非行程记录');
            console.log(res);
            this.$message.success({
              message: '修改非行程记录成功',
              showClose: true,
              duration: 2000
            });
            this.dialogUpdateReimburseVisible = false;
            this.handleUnReimbursementList();
          }).catch((err) => {
            console.log(err);
            this.$message.error({
              message: err.message,
              showClose: true,
              duration: 2000
            });
            this.dialogUpdateReimburseVisible = false;
          })
        }
      },
      // 上传图片
      inputChange(e) {
        let file = e.target.files[0];
        let that = this;
        if (file === undefined) {
          return
        }
        if (file.size / 1024 > 1025) { // 文件大于1M（根据需求更改），进行压缩上传
          this.photoCompress(file, { // 调用压缩图片方法
            quality: 0.7
          }, function (base64Codes) {
            // console.log("压缩后：" + base.length / 1024 + " " + base);
            let bl = that.base64UrlToBlob(base64Codes)
            // file.append('file', bl, 'file_' + Date.parse(new Date()) + '.jpg') // 文件对象
            that.uploadLice(bl) // 请求图片上传接口
          })
        } else { // 小于等于1M 原图上传
          this.uploadLice(file)
        }
      },

      // base64 转 Blob 格式 和file格式
      base64UrlToBlob(urlData) {
        let arr = urlData.split(','),
          mime = arr[0].match(/:(.*?);/)[1], // 去掉url的头，并转化为byte
          bstr = atob(arr[1]), // 处理异常,将ascii码小于0的转换为大于0
          n = bstr.length,
          u8arr = new Uint8Array(n)
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n)
        }
        // 转blob
        // return new Blob([u8arr], {type: mime})
        let filename = Date.parse(new Date()) + '.jpg'
        // 转file
        return new File([u8arr], filename, {
          type: mime
        })
      },
      /*压缩图片
      file：文件(类型是图片格式)，
      obj：文件压缩后对象width， height， quality(0-1)
      callback：容器或者回调函数
      */
      photoCompress(file, obj, callback) {
        let that = this
        let ready = new FileReader()
        /* 开始读取指定File对象中的内容. 读取操作完成时,返回一个URL格式的字符串. */
        ready.readAsDataURL(file)
        ready.onload = function () {
          let re = this.result
          that.canvasDataURL(re, obj, callback) // 开始压缩
        }
      },
      /* 利用canvas数据化图片进行压缩 */
      /* 图片转base64 */
      canvasDataURL(path, obj, callback) {
        let img = new Image()
        img.src = path
        img.onload = function () {
          let that = this // 指到img
          // 默认按比例压缩
          let w = that.width,
            h = that.height,
            scale = w / h
          w = obj.width || w
          h = obj.height || (w / scale)
          let quality = 0.7 // 默认图片质量为0.7
          // 生成canvas
          let canvas = document.createElement('canvas')
          let ctx = canvas.getContext('2d')

          // 创建属性节点
          let anw = document.createAttribute('width')
          anw.nodeValue = w
          let anh = document.createAttribute('height')
          anh.nodeValue = h
          canvas.setAttributeNode(anw)
          canvas.setAttributeNode(anh)
          // 铺底色
          ctx.fillStyle = "#fff";
          ctx.fillRect(0, 0, w, h);
          ctx.drawImage(that, 0, 0, w, h)

          // 图像质量
          if (obj.quality && obj.quality >= 1 && obj.quality < 0) {
            quality = obj.quality
          }
          // quality值越小，所绘制出的图像越模糊
          let base64 = canvas.toDataURL('image/jpeg', quality)
          // 回调函数返回base64的值
          callback(base64)
        }
      },
      //  返回file文件，调用接口执行上传
      uploadLice(file) {
        console.log(file)
        let formdata1 = new FormData(); //创建form对象
        formdata1.append("img", file); //通过append向form对象添加数据
        this.uploadImg(formdata1);
      },
      uploadImg(formdata) {
        this.$axios
          .post(this.$store.state.baseUrl + "/imgrecv", formdata)
          .then(res => {
            if (res.status == 200) {
              this.$message.success({
                message: "图片上传成功",
                showClose: true,
                duration: 2000
              });
            }
            console.log(res);
            let imgurl = res.data.imgurl;
            if (this.imgurls.indexOf(imgurl) == -1) {
              this.imgurls.push(imgurl);
            }
          })
          .catch(err => {
            console.log(err);
            this.$message.error({
              message: err.message,
              showClose: true,
              duration: 2000
            });
          });
      },
      // 删除图片
      delImage(index) {
        this.imgurls.splice(index, 1);
      },
      // 选择报销单
      checkedChange(e, content) {
        if (e.target.checked == true) {
          if (content.type == 0) {
            this.tripIds.push({
              id: content.data.id
            });
          } else if (content.type == 1) {
            this.unTripIds.push({
              id: content.data.id
            })
          }
        } else if (e.target.checked == false) {
          if (content.type == 0) {
            for (let index in this.tripIds) {
              if (this.tripIds[index].id == content.data.id) {
                this.tripIds.splice(index, 1);
              }
            }
          } else if (content.type == 1) {
            for (let index in this.unTripIds) {
              if (this.unTripIds[index].id == content.data.id) {
                this.unTripIds.splice(index, 1);
              }
            }
          }
        }
        console.log('选择');
        console.log(this.tripIds);
        console.log(this.unTripIds);
      },
      // 生成报销单
      createReimbursement() {
        if (this.tripIds.length == 0 && this.unTripIds.length == 0) {
          this.$message.error({
            message: '请选择需要报销的消费单',
            showClose: true,
            duration: 2000
          });
        } else {
          this.$axios.post(this.$store.state.baseUrl + '/ClaimFormSave?java', {
            tripIds: this.tripIds,
            unTripIds: this.unTripIds
          }).then((res) => {
            console.log('生成报销单');
            console.log(res);
            this.$message.success({
              message: '报销单生成成功',
              showClose: true,
              duration: 2000
            });
            this.tripIds = [];
            this.unTripIds = [];
            this.handleUnReimbursementList();
            (function smoothscroll() {
              var currentScroll =
                document.documentElement.scrollTop || document.body.scrollTop;
              if (currentScroll > 0) {
                window.requestAnimationFrame(smoothscroll);
                window.scrollTo(0, currentScroll - currentScroll / 5);
              }
            })();
          }).catch((err) => {
            console.log(err);
            this.$message.error({
              message: err.message,
              showClose: true,
              duration: 2000
            });
          })
        }

      },
      // 分页
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.page = val;
        this.handleUnReimbursementList();
        (function smoothscroll() {
          var currentScroll =
            document.documentElement.scrollTop || document.body.scrollTop;
          if (currentScroll > 0) {
            window.requestAnimationFrame(smoothscroll);
            window.scrollTo(0, currentScroll - currentScroll / 5);
          }
        })();
        let selectedIs = document.getElementsByClassName("selBtn");
        for (let i = 0; i < selectedIs.length; i++) {
          selectedIs[i].checked = false;
        }
        console.log("hhhhhhhhh");
        console.log(selectedIs);
      },
      // 千分价格
      price(num) {
        // console.log(num);
        if (num !== null && num !== undefined) {
          let parts = num.toString().split(".");
          parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          return parts.join(".");
        }
      },
    },
  }
</script>
<style lang="scss" scoped>
  .radio-button-style {
    height: 29px;
    line-height: 29px;
    display: flex;

    div {
      margin-top: 2px;

      img {
        width: 25px;
        height: 25px;
        margin-right: 5px;
      }
    }
  }

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

  .add-container {
    padding: 30px;

    .upload-imgs {
      width: 100%;
      margin-bottom: 10px;
      position: relative;
      display: flex;

      .add {
        width: 100px;
        height: 100px;
        position: relative;
        border: 1px solid #ddd;
        border-radius: 5px;
        display: flex;

        .addIcon {
          width: 50px;
          height: 50px;
          position: absolute;
          top: 45%;
          left: 45%;
          z-index: 1;
        }

        .inputUpload {
          position: absolute;
          display: block;
          width: 100px;
          height: 100px;
          opacity: 0;
          cursor: pointer;
          z-index: 999;
        }
      }

      .spanStyle {
        width: 15px;
        height: 15px;
        position: absolute;
        top: 1px;
        right: 1px;
        text-align: center;
        line-height: 0.7;
        background-color: rgb(221, 221, 221);
        color: rgb(255, 255, 255);
        border: 1px solid rgb(221, 221, 221);
        border-radius: 50%;
        z-index: 999;
        cursor: pointer;
      }

      .previewImg {
        display: flex;
        z-index: 1;
      }
    }
  }

  .not-type {
    width: 75%;
    margin: 0 auto;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ddd;
    border-radius: 10px;
  }

  .reimBtn {
    width: 15%;
    position: fixed;
    right: 10%;
    bottom: 40px;
  }

  input[type=checkbox] {
    width: 18px;
    height: 18px;
    cursor: pointer;
    position: relative;
    width: 15px;
    height: 15px;
    font-size: 15px;
  }

  input[type=checkbox]::after {
    position: absolute;
    top: 0;
    background-color: #fff;
    color: #000;
    width: 15px;
    height: 15px;
    display: inline-block;
    visibility: visible;
    padding-left: 0px;
    text-align: center;
    content: ' ';
    border: 1px solid #c8c8c8;
    border-radius: 3px
  }

  input[type=checkbox]:disabled::after {
    content: ' ';
    border: 1px solid #c8c8c8;
    border-radius: 3px;
    background-color: #ddd;
    cursor: not-allowed;
  }

  input[type=checkbox]:checked::after {
    content: "✓";
    font-size: 13px;
    font-weight: bolder;
  }

  td {
    height: 60px;
    margin: 10px 0;
    padding: 20px 0;
    background-color: #f3fbf9;
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
<style lang="scss">
  #un-reim-style {
    .el-radio-button__orig-radio:checked+.el-radio-button__inner {
      color: #000;
      background-color: #d7ebe7;
      border-color: #f1f9f7;
      -webkit-box-shadow: -1px 0 0 0 #f1f9f7;
      box-shadow: -1px 0 0 0 #f1f9f7;
    }

    .el-radio-button__inner {
      width: 122px;
      padding: 10px 15px;
    }
  }
</style>