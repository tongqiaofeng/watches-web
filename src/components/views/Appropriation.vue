<template>
  <div class="appropriation-container" id="approp">
    <!-- 借贷拨款 -->
    <el-tabs type="border-card" v-model="appropriationActiveName" @tab-click="handleAppropriationClick">
      <el-tab-pane label="我的待办事项" name="appropriationBacklog">
        <div slot="label" style="display: flex;justify-content: center;font-size: 15px;">我的待办事项
          <p style="margin-top: -10px;margin-left: 3px;">
            <img v-if="appropUnHandleCircle == 1" src="../../assets/imgs/circle.png"
              style="width: 10px;height: 10px;" />
          </p>
        </div>
        <div v-if="appropriationUnHandleList.length == 0" style="text-align: center;">
          <p>{{appropriationUnHandleMsg}}</p>
        </div>
        <div v-else>
          <Appropriation-un-handle ref="appropUnHandle" :appropriationUnHandleList="appropriationUnHandleList"

            :appropriationUnHandleSelect="appropriationUnHandleSelect" @paySure="paySure" @signPropUn="signPropUn">
          </Appropriation-un-handle>
        </div>
      </el-tab-pane>
      <el-tab-pane label="对方处理中" name="appropriationInhand">
        <div slot="label" style="display: flex;justify-content: center;font-size: 15px;">对方处理中
          <p style="margin-top: -10px;margin-left: 3px;">
            <img v-if="appropInHandleCircle == 1" src="../../assets/imgs/circle.png"
              style="width: 10px;height: 10px;" />
          </p>
        </div>
        <div v-if="appropriationActiveName == 'appropriationInhand'">
          <div v-if="appropriationInHandleList.length == 0" style="text-align: center;">
            <p>{{appropriationInHandleMsg}}</p>
          </div>
          <div v-else>

            <Appropriation-in-handle ref="appropInHandle" :appropriationInHandleList="appropriationInHandleList"
              @signPropIn="signPropIn">
            </Appropriation-in-handle>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="已完成" name="appropriationCompleted">
        <div slot="label" style="display: flex;justify-content: center;font-size: 15px;">已完成
          <p style="margin-top: -10px;margin-left: 3px;">
            <img v-if="appropCompletedCircle == 1" src="../../assets/imgs/circle.png"
              style="width: 10px;height: 10px;" />
          </p>
        </div>
        <div v-if="appropriationActiveName == 'appropriationCompleted'">
          <div v-if="appropriationCompletedList.length == 0" style="text-align: center;">
            <p>{{appropriationCompletedMsg}}</p>
          </div>
          <div v-else>
            <div class="completed-top">
              <p>总共 {{total}} 条记录</p>
              <div>
                <el-tooltip class="item" effect="light" content="筛选" placement="top-end">
                  <img src="../../assets/imgs/filtrate.png" style="cursor: pointer;" @click="appropCompletedFiltrate" />
                </el-tooltip>
                <el-dialog title="筛选记录" :visible.sync="dialogPropFiltrateVisible" center>
                  <div>
                    <el-form label-width="120px">
                      <el-form-item label="关键字：">
                        <el-input v-model="keyword" placeholder="可输入昵称或描述进行搜索" class="input-style"></el-input>
                      </el-form-item>
                      <el-form-item>
                        <el-checkbox-group v-model="flag">
                          <el-checkbox label="支出" name="支出"></el-checkbox>
                          <el-checkbox label="收入" name="收入"></el-checkbox>
                        </el-checkbox-group>
                      </el-form-item>
                      <el-form-item label="开始时间：">
                        <el-date-picker v-model="startTime" type="date"></el-date-picker>
                      </el-form-item>
                      <el-form-item label="结束时间：">
                        <el-date-picker v-model="endTime" type="date"></el-date-picker>
                      </el-form-item>
                    </el-form>
                  </div>
                  <div slot="footer">
                    <el-button @click="dialogPropFiltrateVisible = false">取 消</el-button>
                    <el-button type="primary" @click="appropCompletedFiltrateSure" v-preventClick>确 定</el-button>
                  </div>
                </el-dialog>
              </div>
            </div>
            <div style="text-align: center;" v-show="completedRecordList.length == 0">
              <p>啊哦~暂无符合该条件的记录，请重新选择</p>
            </div>

            <div>
              <Appropriation-completed v-if="completedRecordList.length !== 0" ref="appropCompletedInHandle"
                :completedRecordList="completedRecordList" @signPropCom="signPropCom">
              </Appropriation-completed>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        url: this.$store.state.baseUrl,
        appropriationActiveName: 'appropriationBacklog',
        appropriationUnHandleList: [],
        appropriationUnHandleMsg: '数据加载中...',
        appropriationUnHandleSelect: {
          select: 0
        },
        appropUnHandleCircle: 0,
        appropriationInHandleList: [],
        appropriationInHandleMsg: '数据加载中...',
        appropInHandleCircle: 0,
        appropriationCompletedList: [],
        appropriationCompletedMsg: '数据加载中...',
        appropCompletedCircle: 0,
        dialogPropFiltrateVisible: false,
        total: 0,
        keyword: '',
        flag: ['支出', '收入'],
        startTime: '',
        endTime: '',
        completedRecordList: [],

      }
    },
    created() {
      this.handleCompanyBorrowList();
    },


    methods: {
      signPropUn(val) {
        this.appropUnHandleCircle = val;
      },
      signPropIn(val) {
        this.appropInHandleCircle = val;
      },
      signPropCom(val) {
        this.appropCompletedCircle = val;
      },
      // 获取借贷审核列表
      async handleCompanyBorrowList() {
        this.appropriationUnHandleMsg = '数据加载中...';
        this.appropriationInHandleMsg = '数据加载中...';
        this.appropriationCompletedMsg = '数据加载中...';
        await this.$axios.post(this.url + '/financeBorrowList?java').then(res => {
          console.log('获取借贷拨款列表');
          console.log(res);
          this.appropriationUnHandleList = res.data.unHandleList;
          if (this.appropriationUnHandleList.length == 0) {
            this.appropriationUnHandleMsg = '啊哦~暂无数据'
          } else {
            let a1 = [];
            for (let item of this.appropriationUnHandleList) {
              a1.push(item.id);
            };
            let a2 = JSON.parse(localStorage.getItem('appropUnHandle' + sessionStorage.getItem('userRecordId')));
            // console.log(a1);
            // console.log(a2);
            if (a2 == null || this.appropriationUnHandleList.length == 0) {
              this.appropUnHandleCircle = 1;
            } else {
              if (a1.every(val => a2.includes(val))) {
                this.appropUnHandleCircle = 0;
              } else {
                this.appropUnHandleCircle = 1;
              }
            }
          }

          this.appropriationInHandleList = res.data.inHandleList;
          if (this.appropriationInHandleList.length == 0) {
            this.appropriationInHandleMsg = '啊哦~暂无数据'
          } else {
            let a3 = [];
            for (let item of this.appropriationInHandleList) {
              a3.push(item.id);
            };
            let a4 = JSON.parse(localStorage.getItem('appropInHandle' + sessionStorage.getItem('userRecordId')));
            // console.log(a3);
            // console.log(a4);
            if (a4 == null || this.appropriationInHandleList.length == 0) {
              this.appropInHandleCircle = 1;
            } else {
              if (a3.every(val => a4.includes(val))) {
                this.appropInHandleCircle = 0;
              } else {
                this.appropInHandleCircle = 1;
              }
            }
          }

          this.appropriationCompletedList = res.data.completedList;
          this.total = this.appropriationCompletedList.length;
          if (this.appropriationCompletedList.length == 0) {
            this.appropriationCompletedMsg = '啊哦~暂无数据';
          } else {
            let a5 = [];
            for (let item of this.appropriationCompletedList) {
              a5.push(item.id);
            };
            let a6 = JSON.parse(localStorage.getItem('appropCompleted' + sessionStorage.getItem('userRecordId')));
            // console.log(a5);
            // console.log(a6);
            if (a6 == null || this.appropriationCompletedList.length == 0) {
              this.appropCompletedCircle = 1;
            } else {
              if (a5.every(val => a6.includes(val))) {
                this.appropCompletedCircle = 0;
              } else {
                this.appropCompletedCircle = 1;
              }
            }
          }

        }).catch(err => {
          console.log(err);
        })
      },
      // 筛选记录
      appropCompletedFiltrate() {
        this.dialogPropFiltrateVisible = true;
      },
      // 确定筛选
      appropCompletedFiltrateSure() {
        this.$axios.post(this.url + '/completedFinanceBorrowList?java', {
          keyword: this.keyword,
          flag: this.flag.length > 1 ? 2 : (this.flag[0] == '支出' ? 0 : 1),
          startTime: this.startTime,
          endTime: this.endTime
        }).then(res => {
          console.log('筛选已完成记录');
          console.log(res);

          this.completedRecordList = [];
          this.completedRecordList = res.data;
          this.total = this.completedRecordList.length;
          this.dialogPropFiltrateVisible = false;
          if (this.completedRecordList.length !== 0) {

            this.$nextTick(() => {
              this.$refs.appropCompletedInHandle.page = 1;
              this.$refs.appropCompletedInHandle.getList();
            })
          }
        }).catch(err => {
          console.log(err);
          this.$message.error({
            message: err.data.message,
            showClose: true,
            duration: 2000
          });
          this.dialogPropFiltrateVisible = false;
        })
      },
      // 提交数据成功
      paySure() {
        this.handleCompanyBorrowList().then(() => {
          this.$refs.appropUnHandle.page = 1;
          this.$refs.appropUnHandle.appropUnList = this.appropriationUnHandleList;
          this.$refs.appropUnHandle.getList();
        })
      },
      // tab项切换
      handleAppropriationClick() {
        if (this.appropriationActiveName == 'appropriationBacklog' && this.appropriationUnHandleList.length !== 0) {
          this.$nextTick(() => {
            this.$refs.appropUnHandle.page = 1;
            this.$refs.appropUnHandle.getList();
          })
        } else if (this.appropriationActiveName == 'appropriationInhand' && this.appropriationInHandleList.length !==
          0) {
          this.$nextTick(() => {
            this.$refs.appropInHandle.page = 1;
            this.$refs.appropInHandle.getList();
          })
        } else if (this.appropriationActiveName == 'appropriationCompleted' && this.appropriationCompletedList
          .length !== 0) {
          this.keyword = '';
          this.flag = ['支出', '收入'];
          this.startTime = '';
          this.endTime = '';
          this.completedRecordList = this.appropriationCompletedList;
          this.$nextTick(() => {
            this.$refs.appropCompletedInHandle.page = 1;
            this.$refs.appropCompletedInHandle.getList();
          })
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
  .appropriation-container {
    width: 95%;
    margin: 0 auto;

    .completed-top {
      display: flex;
      justify-content: space-between;

      p {
        margin: 0;
      }
    }
  }
</style>
<style lang="scss">
  #approp {
    .el-tabs--border-card {
      background: transparent;
      border: transparent;
      -webkit-box-shadow: none;
      box-shadow: none;
    }

    .el-tabs--border-card>.el-tabs__header {
      background-color: transparent;
      border-bottom: none;
      margin: 0;
    }

    .el-tabs--border-card>.el-tabs__header .el-tabs__item {
      background-color: #ddebec;
    }

    .el-tabs__item {
      width: 160px;
      height: 48px !important;
      line-height: 48px !important;
      font-size: 16px !important;
      text-align: center;
      border-top-left-radius: 20px;
      border-top-right-radius: 20px;
      color: #000;
    }

    .el-tabs__content {
      background-color: #fff;
    }

    .el-tabs--border-card>.el-tabs__header .el-tabs__item:not(.is-disabled):hover {
      color: #000;
    }

    .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active {
      color: #000;
      background-color: #FFF;
      border-right-color: transparent;
      border-left-color: transparent;
    }


    .el-tabs--border-card>.el-tabs__content {
      padding: 20px 30px;
    }
  }
</style>